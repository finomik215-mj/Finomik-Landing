"""Panel del blog de Finomik.

Arranque:  python3 admin/servidor.py      (abre http://localhost:8799)

- Lista, crea, edita y elimina artículos (castellano e inglés) en src/blog/posts/*.json.
- Lo eliminado va a src/blog/papelera/ y se puede recuperar.
- Sube imágenes a public/media/blog/.
- "Vista previa" monta la web con los borradores en .vista/ y la enseña en /vista/...
- "Publicar" vuelve a montar la web (public/), crea las imágenes para compartir y, si está
  configurado en admin/config.json, la sube al servidor.

Solo usa la biblioteca estándar de Python. En el servidor irá detrás del login de ops.finomik.com.
"""
import base64, http.server, json, os, re, secrets, shutil, subprocess, sys, unicodedata
from datetime import date
from pathlib import Path
from urllib.parse import urlparse, parse_qs, unquote

R = Path(__file__).resolve().parent.parent
ADMIN = R / "admin"
POSTS = R / "src" / "blog" / "posts"
PAPELERA = R / "src" / "blog" / "papelera"
PUB, VISTA = R / "public", R / ".vista"
CONF = json.loads((ADMIN / "config.json").read_text(encoding="utf-8")) if (ADMIN / "config.json").exists() else {}
PUERTO = int(os.environ.get("PUERTO", CONF.get("puerto", 8799)))
HOST = os.environ.get("HOST", CONF.get("host", "127.0.0.1"))
MAX_IMG = 8 * 1024 * 1024
POSTS.mkdir(parents=True, exist_ok=True); PAPELERA.mkdir(parents=True, exist_ok=True); (PUB / "media" / "blog").mkdir(parents=True, exist_ok=True)


def slugify(t):
    t = unicodedata.normalize("NFKD", t or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", t)).strip("-")[:80] or "articulo"


def leer(pid):
    f = POSTS / f"{pid}.json"
    return json.loads(f.read_text(encoding="utf-8")) if f.exists() else None


def todos():
    return [json.loads(f.read_text(encoding="utf-8")) for f in sorted(POSTS.glob("*.json"))]


def resumen(x):
    return {"id": x["id"], "estado": x.get("estado", "borrador"), "fecha": x.get("fecha", ""), "destacado": bool(x.get("destacado")), "imagen": x.get("imagen", ""),
            "titulo_es": x["es"].get("titulo", ""), "titulo_en": x["en"].get("titulo", ""), "categoria": x["es"].get("categoria", "")}


def validar(x, pid):
    """Comprueba lo mínimo y que las direcciones no choquen con otro artículo."""
    errores = []
    for lang in ("es", "en"):
        d = x.setdefault(lang, {})
        d["slug"] = slugify(d.get("slug") or d.get("titulo", ""))
        if x.get("estado") == "publicado":
            for campo, nombre in (("titulo", "título"), ("entradilla", "entradilla"), ("texto", "texto")):
                if not (d.get(campo) or "").strip():
                    errores.append(f"Falta el {nombre} en {'castellano' if lang == 'es' else 'inglés'}.")
    for o in todos():
        if o["id"] == pid: continue
        for lang in ("es", "en"):
            if o[lang]["slug"] == x[lang]["slug"]:
                errores.append(f"La dirección /{'blog' if lang == 'es' else 'en/blog'}/{x[lang]['slug']} ya la usa «{o[lang]['titulo']}».")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", x.get("fecha", "")):
        errores.append("La fecha no es válida.")
    return errores


def ejecutar(cmd, timeout=600):
    p = subprocess.run(cmd, cwd=R, capture_output=True, text=True, timeout=timeout, shell=isinstance(cmd, str))
    return p.returncode, (p.stdout + p.stderr).strip()


def montar(vista=False):
    return ejecutar([sys.executable, str(R / "build.py")] + (["--vista"] if vista else []))


class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, fmt, *a):
        pass

    # ---------- respuestas ----------
    def enviar(self, code, body, ctype="application/json; charset=utf-8"):
        if not isinstance(body, (bytes, bytearray)):
            body = json.dumps(body, ensure_ascii=False).encode() if "json" in ctype else str(body).encode()
        self.send_response(code)
        self.send_header("Content-Type", ctype); self.send_header("Content-Length", str(len(body))); self.send_header("Cache-Control", "no-store")
        self.end_headers(); self.wfile.write(body)

    def archivo(self, f):
        tipos = {".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
                 ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".mp4": "video/mp4", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8"}
        self.enviar(200, f.read_bytes(), tipos.get(f.suffix.lower(), "application/octet-stream"))

    def cuerpo(self):
        n = int(self.headers.get("Content-Length") or 0)
        if n > MAX_IMG * 1.5: raise ValueError("Archivo demasiado grande")
        return json.loads(self.rfile.read(n) or b"{}")

    def estatico(self, base, ruta):
        """Sirve una página con direcciones limpias (como Vercel) dentro de una carpeta."""
        ruta = unquote(ruta).split("?")[0].strip("/")
        if ".." in ruta: return self.enviar(404, "No encontrado", "text/plain")
        for f in ([base / "index.html"] if not ruta else [base / ruta, base / (ruta + ".html"), PUB / ruta]):
            if f.is_file(): return self.archivo(f)
        return self.enviar(404, "No encontrado", "text/plain")

    # ---------- GET ----------
    def do_GET(self):
        u = urlparse(self.path); p = u.path
        if p in ("/", "/index.html"): return self.archivo(ADMIN / "index.html")
        if p == "/api/posts": return self.enviar(200, sorted([resumen(x) for x in todos()], key=lambda r: r["fecha"], reverse=True))
        # "archivo" identifica cada elemento de la papelera (puede haber dos con el mismo id si se borró dos veces)
        if p == "/api/papelera": return self.enviar(200, [dict(resumen(json.loads(f.read_text(encoding="utf-8"))), archivo=f.stem) for f in sorted(PAPELERA.glob("*.json"))])
        if p == "/api/categorias":
            cats = {"es": set(), "en": set()}
            for x in todos():
                for l in cats: cats[l].add(x[l].get("categoria", ""))
            return self.enviar(200, {l: sorted(c for c in v if c) for l, v in cats.items()})
        if p == "/api/config": return self.enviar(200, {"publicar": bool(CONF.get("publicar")), "web": CONF.get("web", "https://finomik.com")})
        m = re.fullmatch(r"/api/posts/([a-z0-9-]+)", p)
        if m:
            x = leer(m.group(1))
            return self.enviar(200, x) if x else self.enviar(404, {"error": "No existe"})
        if p.startswith("/vista"): return self.estatico(VISTA, p[len("/vista"):])
        if p.startswith(("/media/", "/assets/", "/og")) or p in ("/favicon.ico", "/favicon-32.png"): return self.estatico(PUB, p)
        return self.enviar(404, "No encontrado", "text/plain")

    # ---------- POST / PUT / DELETE ----------
    def do_POST(self):
        p = urlparse(self.path).path
        try:
            if p == "/api/posts":  # nuevo artículo (borrador vacío)
                pid = base = f"nuevo-{date.today().isoformat()}"; k = 2
                while (POSTS / f"{pid}.json").exists(): pid = f"{base}-{k}"; k += 1
                x = {"id": pid, "estado": "borrador", "fecha": date.today().isoformat(), "destacado": False, "imagen": "",
                     "es": {"slug": pid, "titulo": "", "categoria": "", "entradilla": "", "texto": "", "dato": "", "dato_texto": "", "fuente": "", "llamada": ""},
                     "en": {"slug": pid + "-en", "titulo": "", "categoria": "", "entradilla": "", "texto": "", "dato": "", "dato_texto": "", "fuente": "", "llamada": ""}}
                (POSTS / f"{pid}.json").write_text(json.dumps(x, ensure_ascii=False, indent=1), encoding="utf-8")
                return self.enviar(200, x)
            if p == "/api/imagen":
                d = self.cuerpo()
                head, _, b64 = d["data"].partition(",")
                ext = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif"}.get(head[5:].split(";")[0])
                if not ext: return self.enviar(400, {"error": "Formato no admitido. Usa JPG, PNG, WebP o GIF."})
                raw = base64.b64decode(b64)
                if len(raw) > MAX_IMG: return self.enviar(400, {"error": "La imagen pesa más de 8 MB."})
                nombre = f"{slugify(Path(d.get('nombre', 'imagen')).stem)[:40]}-{secrets.token_hex(3)}.{ext}"
                (PUB / "media" / "blog" / nombre).write_bytes(raw)
                return self.enviar(200, {"url": f"/media/blog/{nombre}"})
            m = re.fullmatch(r"/api/vista/([a-z0-9-]+)", p)
            if m:
                x = leer(m.group(1))
                if not x: return self.enviar(404, {"error": "No existe"})
                code, log = montar(vista=True)
                if code: return self.enviar(500, {"error": "No se pudo montar la vista previa", "log": log[-1500:]})
                lang = parse_qs(urlparse(self.path).query).get("lang", ["es"])[0]
                slug = x[lang]["slug"]
                return self.enviar(200, {"url": f"/vista/blog/{slug}" if lang == "es" else f"/vista/en/blog/{slug}"})
            if p == "/api/publicar":
                pasos = []
                code, log = montar(); pasos.append(("Montar la web", code, log[-800:]))
                if code: return self.enviar(500, {"ok": False, "pasos": pasos})
                pup = os.path.expanduser(CONF.get("puppeteer", ""))
                if pup and Path(pup).exists():
                    env_cmd = f'PUPPETEER="{pup}" node herramientas/og.js'
                    code, log = ejecutar(env_cmd); pasos.append(("Imágenes para compartir", code, log[-400:]))
                    if not code: code, log = montar(); pasos.append(("Montar con las imágenes nuevas", code, log[-300:]))
                if CONF.get("publicar"):
                    code, log = ejecutar(CONF["publicar"], timeout=900); pasos.append(("Subir al servidor", code, log[-1200:]))
                    return self.enviar(200 if not code else 500, {"ok": not code, "subido": not code, "pasos": pasos})
                return self.enviar(200, {"ok": True, "subido": False, "pasos": pasos})
            m = re.fullmatch(r"/api/papelera/([a-z0-9-]+)/restaurar", p)  # el nombre del archivo en la papelera
            if m:
                f = PAPELERA / f"{m.group(1)}.json"
                if not f.exists(): return self.enviar(404, {"error": "No está en la papelera"})
                pid = json.loads(f.read_text(encoding="utf-8"))["id"]
                if (POSTS / f"{pid}.json").exists(): return self.enviar(409, {"error": "Ya existe un artículo con ese nombre"})
                shutil.move(str(f), POSTS / f"{pid}.json")
                return self.enviar(200, {"ok": True})
            return self.enviar(404, {"error": "No encontrado"})
        except Exception as e:
            return self.enviar(500, {"error": str(e)})

    def do_PUT(self):
        m = re.fullmatch(r"/api/posts/([a-z0-9-]+)", urlparse(self.path).path)
        if not m: return self.enviar(404, {"error": "No encontrado"})
        pid = m.group(1)
        if not (POSTS / f"{pid}.json").exists(): return self.enviar(404, {"error": "No existe"})
        try:
            x = self.cuerpo(); x["id"] = pid
            errores = validar(x, pid)
            if errores: return self.enviar(400, {"error": " ".join(errores), "post": x})
            if x.get("destacado"):  # solo un destacado
                for o in todos():
                    if o["id"] != pid and o.get("destacado"):
                        o["destacado"] = False; (POSTS / f"{o['id']}.json").write_text(json.dumps(o, ensure_ascii=False, indent=1), encoding="utf-8")
            (POSTS / f"{pid}.json").write_text(json.dumps(x, ensure_ascii=False, indent=1), encoding="utf-8")
            return self.enviar(200, x)
        except Exception as e:
            return self.enviar(500, {"error": str(e)})

    def do_DELETE(self):
        m = re.fullmatch(r"/api/posts/([a-z0-9-]+)", urlparse(self.path).path)
        f = POSTS / f"{m.group(1)}.json" if m else None
        if not f or not f.exists(): return self.enviar(404, {"error": "No existe"})
        destino = PAPELERA / f.name
        if destino.exists(): destino = PAPELERA / f"{f.stem}-{secrets.token_hex(2)}.json"
        shutil.move(str(f), destino)
        return self.enviar(200, {"ok": True})


if __name__ == "__main__":
    print(f"Panel del blog en http://localhost:{PUERTO}")
    http.server.ThreadingHTTPServer((HOST, PUERTO), H).serve_forever()
