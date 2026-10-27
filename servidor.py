"""Servidor local que se comporta como Vercel: /alumnos sirve alumnos.html, aplica las redirecciones de vercel.json y muestra 404.html."""
import http.server, json, os, re
from pathlib import Path
R = Path(__file__).resolve().parent
PUB = R / "public"
REDIR = json.loads((R / "vercel.json").read_text())["redirects"]

class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=str(PUB), **k)
    def end_headers(self):
        # misma caché que en Vercel (vercel.json): estilos, scripts y fuentes se guardan; imágenes y vídeos una semana; páginas siempre al día
        p = self.path.split("?")[0]
        cc = "public, max-age=31536000, immutable" if p.startswith("/assets/") else "public, max-age=604800" if p.startswith("/media/") else "no-cache"
        self.send_header("Cache-Control", cc); super().end_headers()
    def do_GET(self):
        path, _, q = self.path.partition("?")
        for r in REDIR:
            pat = "^" + re.sub(r":(\w+)", r"(?P<\1>[^/]+)", r["source"]) + "$"
            m = re.match(pat, path)
            if m:
                dest = r["destination"]
                for k, v in m.groupdict().items(): dest = dest.replace(":" + k, v)
                self.send_response(308); self.send_header("Location", dest); self.end_headers(); return
        if path != "/" and path.endswith(".html"):
            self.send_response(308); self.send_header("Location", path[:-5]); self.end_headers(); return
        f = PUB / path.lstrip("/")
        if path != "/" and not f.is_file() and (PUB / (path.strip("/") + ".html")).is_file():
            self.path = "/" + path.strip("/") + ".html" + ("?" + q if q else "")
        elif path != "/" and not f.exists():
            body = (PUB / "404.html").read_bytes()
            self.send_response(404); self.send_header("Content-Type", "text/html; charset=utf-8"); self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body); return
        super().do_GET()

http.server.ThreadingHTTPServer(("", int(os.environ.get("PORT", 8798))), H).serve_forever()
