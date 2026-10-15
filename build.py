"""Monta la web de Finomik en public/ a partir de src/.

Uso:  python3 build.py

- src/paginas/{es,en}/<clave>.html   contenido de cada página (solo lo que va dentro de <main>)
- src/paginas/{es,en}/porque.raw.html página "Por qué Finomik" completa (tiene su propio estilo)
- src/blog/posts-{es,en}.json         artículos del blog (el primero es el destacado)
Dentro del contenido, {{url:clave}} se convierte en la dirección de esa página en el mismo idioma.
Genera además: blog y artículos, 404, sitemap.xml, robots.txt, llms.txt y vercel.json.
"""
import hashlib, html, json, re
from datetime import date
from pathlib import Path

R = Path(__file__).resolve().parent
import sys
VISTA = "--vista" in sys.argv  # vista previa del panel del blog: incluye borradores y no toca public/
SRC, OUT = R / "src", (R / ".vista" if "--vista" in sys.argv else R / "public")
PUB = R / "public"
SITE = "https://www.finomik.com"  # dirección principal en Vercel (finomik.com redirige aquí)
LINKEDIN = "https://www.linkedin.com/company/finomik"
# Redes sociales: las que tienen dirección salen en el hero y en el pie (las vacías no se muestran)
REDES = [("LinkedIn", LINKEDIN), ("YouTube", "https://www.youtube.com/@Finomik-app"), ("Instagram", "https://www.instagram.com/finomik.app/"), ("TikTok", "https://www.tiktok.com/@finomikapp"), ("Facebook", "https://www.facebook.com/profile.php?id=61595023097070")]
TELEFONO = "+34 673 319 335"
ICONOS_RED = {
    "LinkedIn": '<path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-8M10.5 13a3 3 0 0 1 6 0v4.5"/><rect x="3" y="3" width="18" height="18" rx="4"/>',
    "YouTube": '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2l5 2.8-5 2.8z"/>',
    "Instagram": '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
    "TikTok": '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.6 2.4 4.4 5 4.6"/>',
    "Facebook": '<path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.4-3.7 3.9v2.2H8.5v3H11V21"/><rect x="3" y="3" width="18" height="18" rx="4"/>',
}


def redes(cls="hero-social"):
    links = "".join(f'<a href="{u}" rel="noopener" target="_blank" aria-label="{n}" title="{n}"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONOS_RED[n]}</svg></a>' for n, u in REDES if u)
    return f'<div class="{cls}">{links}</div>' if links else ""
LANGS = ("es", "en")

# clave -> (dirección en castellano, dirección en inglés)
SLUGS = {
    "index": ("", ""), "alumnos": ("alumnos", "students"), "profesores": ("profesores", "teachers"),
    "programas": ("programas", "programmes"), "porque": ("por-que-finomik", "why-finomik"), "blog": ("blog", "blog"),
    "demo": ("demo", "demo"), "bancos": ("bancos", "banks"), "nosotros": ("sobre-nosotros", "about"),
    "avisolegal": ("aviso-legal", "legal-notice"), "privacidad": ("privacidad", "privacy"), "cookies": ("cookies", "cookies"),
}
FUENTE = {"avisolegal": "aviso-legal"}  # nombre del archivo de contenido cuando no coincide con la clave

META = {
    "index": {"es": ("Finomik · Educación financiera para colegios", "Finomik prepara a tus alumnos para las decisiones de la vida adulta con retos, simulación e IA. Y tú lo ves todo desde tu panel."),
              "en": ("Finomik · Financial education for schools", "Finomik prepares your students for the decisions of adult life with challenges, simulation and AI. And you see it all from your dashboard.")},
    "alumnos": {"es": ("Para alumnos · Finomik", "Así aprenden tus alumnos en Finomik: su camino, píldoras, retos, simulador de inversión, actualidad y avatar. Con Finny, su tutor con IA."),
                "en": ("For students · Finomik", "How your students learn with Finomik: their path, short lessons, challenges, investment simulator, news and avatar. With Finny, their AI tutor.")},
    "profesores": {"es": ("Para profesores · Finomik", "Da tú la clase o deja que Finomik explique. Sigue a cada alumno, decide qué contenido ve tu clase, escribe mensajes y descarga exámenes en Word."),
                   "en": ("For teachers · Finomik", "Teach the class yourself or let Finomik explain. Track every student, decide what your class sees, send messages and download exams in Word.")},
    "programas": {"es": ("Programas · Finomik", "Cuatro programas de educación financiera para Secundaria (Vida adulta, Inversión, Emprendimiento y Economía) que se adaptan a vuestras horas."),
                  "en": ("Programmes · Finomik", "Four financial education programmes for secondary schools (Adult life, Investing, Entrepreneurship and Economics) that fit your timetable.")},
    "porque": {"es": ("Por qué Finomik · Educación financiera para colegios", "Por qué la educación financiera importa en el colegio y en qué se diferencia Finomik de un libro de texto, una charla o una app."),
               "en": ("Why Finomik · Financial education for schools", "Why financial education matters at school, and how Finomik differs from a textbook, a one-off talk or an app.")},
    "blog": {"es": ("Blog de educación financiera · Finomik", "Ideas para el aula, datos sobre educación financiera y novedades de Finomik."),
             "en": ("Financial education blog · Finomik", "Classroom ideas, data on financial education and news from Finomik.")},
    "demo": {"es": ("Pide una demo · Finomik", "Te enseñamos Finomik en 20 minutos con un caso de tu colegio. Sin compromiso."),
             "en": ("Book a demo · Finomik", "We'll show you Finomik in 20 minutes with a case from your school. No commitment.")},
    "bancos": {"es": ("Finomik para entidades financieras", "Finomik integra la educación financiera en la relación entre el banco y sus clientes: clientes mejor educados, decisiones más sólidas."),
               "en": ("Finomik for financial institutions", "Finomik brings financial education into the relationship between a bank and its clients: better-educated clients, stronger decisions.")},
    "nosotros": {"es": ("Sobre nosotros · Finomik", "Finomik es una plataforma de educación financiera para colegios. Enseñamos a decidir."),
                 "en": ("About us · Finomik", "Finomik is a financial education platform for schools. We teach how to decide.")},
    "avisolegal": {"es": ("Aviso legal · Finomik", "Aviso legal y condiciones de uso del sitio web de Finomik."),
                   "en": ("Legal notice · Finomik", "Legal notice and terms of use of the Finomik website.")},
    "privacidad": {"es": ("Política de privacidad · Finomik", "Cómo trata Finomik los datos personales en su sitio web."),
                   "en": ("Privacy policy · Finomik", "How Finomik handles personal data on its website.")},
    "cookies": {"es": ("Política de cookies · Finomik", "finomik.com no usa cookies de análisis ni de publicidad."),
                "en": ("Cookie policy · Finomik", "finomik.com doesn't use analytics or advertising cookies.")},
}

T = {  # textos comunes
    "es": {"nav": [("alumnos", "Alumnos"), ("profesores", "Profesores"), ("programas", "Programas"), ("porque", "Por qué Finomik"), ("blog", "Blog")],
           "demo": "Pide una demo", "home": "Inicio", "menu": "Menú", "close": "Cerrar", "main": "Principal", "other": "English", "logo": "Finomik, inicio",
           "tag": "Educación financiera para colegios.", "cols": [("PLATAFORMA", [("alumnos", "Para alumnos"), ("profesores", "Para profesores"), ("programas", "Programas")]),
               ("POR QUÉ FINOMIK", [("porque", "El problema"), ("porque#diferencia", "La diferencia"), ("porque#faq", "Preguntas frecuentes")]),
               ("RECURSOS", [("blog", "Blog")]),
               ("EMPRESA", [("nosotros", "Sobre nosotros"), ("demo", "Contacto"), ("bancos", "Entidades financieras"), (LINKEDIN, "LinkedIn")])],
           "legal": [("avisolegal", "Aviso legal"), ("privacidad", "Privacidad"), ("cookies", "Cookies")],
           "read": "de lectura", "readmore": "Leer →", "all": "Todas", "back": "← Volver al blog", "source": "Fuente", "keep": "Sigue leyendo", "locale": "es_ES"},
    "en": {"nav": [("alumnos", "Students"), ("profesores", "Teachers"), ("programas", "Programmes"), ("porque", "Why Finomik"), ("blog", "Blog")],
           "demo": "Book a demo", "home": "Home", "menu": "Menu", "close": "Close", "main": "Main", "other": "Español", "logo": "Finomik, home",
           "tag": "Financial education for schools.", "cols": [("PLATFORM", [("alumnos", "For students"), ("profesores", "For teachers"), ("programas", "Programmes")]),
               ("WHY FINOMIK", [("porque", "The problem"), ("porque#diferencia", "The difference"), ("porque#faq", "FAQ")]),
               ("RESOURCES", [("blog", "Blog")]),
               ("COMPANY", [("nosotros", "About us"), ("demo", "Contact"), ("bancos", "Financial institutions"), (LINKEDIN, "LinkedIn")])],
           "legal": [("avisolegal", "Legal notice"), ("privacidad", "Privacy"), ("cookies", "Cookies")],
           "read": "read", "readmore": "Read →", "all": "All", "back": "← Back to the blog", "source": "Source", "keep": "Keep reading", "locale": "en_GB"},
}
MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
esc = lambda s: html.escape(str(s), quote=True)


def url(key, lang):
    """Dirección pública de una página (admite 'clave#ancla')."""
    key, _, frag = key.partition("#")
    slug = SLUGS[key][LANGS.index(lang)]
    u = ("/" + slug if slug else "/") if lang == "es" else ("/en/" + slug if slug else "/en")
    return u + ("#" + frag if frag else "")


def fecha(d, lang):
    y, m, dd = map(int, d.split("-"))
    return f"{dd} de {MESES[m - 1]} de {y}" if lang == "es" else f"{dd} {MONTHS[m - 1]} {y}"


def version(p):
    return hashlib.md5((PUB / p).read_bytes()).hexdigest()[:8]


V_CSS, V_JS = version("assets/site.css"), version("assets/site.js")

ORG = {"@type": "Organization", "@id": SITE + "/#org", "name": "Finomik", "url": SITE + "/", "logo": SITE + "/icon-512.png", "email": "hello@finomik.com", "telephone": "+34673319335", "sameAs": [u for _, u in REDES if u], "legalName": "EduFin Tech, S.L.", "taxID": "B26790485",
       "address": {"@type": "PostalAddress", "streetAddress": "Passeig de Sant Gervasi, 10, 4.º 3.ª", "postalCode": "08022", "addressLocality": "Barcelona", "addressCountry": "ES"},
       "description": "Plataforma gamificada de educación financiera para colegios de Secundaria."}
WEBSITE = {"@type": "WebSite", "@id": SITE + "/#web", "url": SITE + "/", "name": "Finomik", "inLanguage": ["es", "en"], "publisher": {"@id": SITE + "/#org"}}
APP = {"@type": "SoftwareApplication", "name": "Finomik", "applicationCategory": "EducationalApplication", "operatingSystem": "Web", "url": SITE + "/", "publisher": {"@id": SITE + "/#org"},
       "description": "Plataforma de educación financiera para colegios: retos, simulador de inversión, tutor con IA y panel del profesor."}


def faq_ld(body):
    qs = re.findall(r"<summary>(.*?)</summary>\s*<p>(.*?)</p>", body, re.S)
    if not qs: return None
    strip = lambda s: re.sub(r"<[^>]+>", "", s).strip()
    return {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": strip(q), "acceptedAnswer": {"@type": "Answer", "text": strip(a)}} for q, a in qs]}


def head(lang, title, desc, path, alt, extra_ld=(), og_type="website", extra="", og_img=None):
    """<head> común: SEO, idiomas, compartir, iconos, datos estructurados y analítica sin cookies."""
    es_u, en_u = (path, alt) if lang == "es" else (alt, path)
    graph = [ORG, WEBSITE] + [x for x in extra_ld if x]
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{SITE}{path}">
<link rel="alternate" hreflang="es" href="{SITE}{es_u}"><link rel="alternate" hreflang="en" href="{SITE}{en_u}"><link rel="alternate" hreflang="x-default" href="{SITE}{es_u}">
<meta property="og:type" content="{og_type}"><meta property="og:site_name" content="Finomik"><meta property="og:locale" content="{T[lang]['locale']}">
<meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}"><meta property="og:url" content="{SITE}{path}">
<meta property="og:image" content="{SITE}{og_img or f"/og-{lang}.jpg"}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="{'Blog de Finomik' if lang == 'es' else 'Finomik blog'}" href="{'/rss.xml' if lang == 'es' else '/en/rss.xml'}">
<meta name="theme-color" content="#0B3064">
<link rel="preload" href="/assets/fonts/montserrat-latin.woff2" as="font" type="font/woff2" crossorigin>
{extra}<script type="application/ld+json">{json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False)}</script>
<script>window.va = window.va || function () {{ (window.vaq = window.vaq || []).push(arguments); }};</script>
<script defer src="/_vercel/insights/script.js"></script>
<script type="speculationrules">{{"prerender": [{{"where": {{"and": [{{"href_matches": "/*"}}, {{"not": {{"href_matches": "/admin*"}}}}]}}, "eagerness": "moderate"}}]}}</script>
</head>"""


def nav(lang, cur, other_url, hide_demo=False):
    t = T[lang]
    items = "".join(f'<li><a href="{url(k, lang)}"{" class=cur" if k == cur else ""}>{n}</a></li>' for k, n in t["nav"])
    ot = "en" if lang == "es" else "es"
    langs = (f'<a class="on" href="#" aria-current="true">ES</a><a href="{other_url}" hreflang="en">EN</a>' if lang == "es"
             else f'<a href="{other_url}" hreflang="es">ES</a><a class="on" href="#" aria-current="true">EN</a>')
    mm = "".join(f'<li><a href="{url(k, lang)}">{n}</a></li>' for k, n in [("index", t["home"])] + t["nav"])
    skip = "Saltar al contenido" if lang == "es" else "Skip to content"
    demo_btn = "" if hide_demo else f'<a class="btn btn-gold" href="{url('demo', lang)}">{t['demo']}</a>'
    return f"""<body>
<a class="skip" href="#main">{skip}</a>
<nav class="nav" id="nav" aria-label="{t['main']}">
  <a href="{url('index', lang)}" aria-label="{t['logo']}"><img class="lw" src="/media/logo-blanco.png" alt="Finomik" width="95" height="30"><img class="lb" src="/media/logo-azul.png" alt="Finomik" width="95" height="30"></a>
  <ul>{items}</ul>
  <div class="right"><div class="langs">{langs}</div>{demo_btn}<button class="burger" id="burger" aria-label="{t['menu']}" aria-expanded="false" aria-controls="mmenu">☰</button></div>
</nav>
<div class="mmenu" id="mmenu" role="dialog" aria-label="{t['menu']}"><div class="mm-top"><img class="mm-logo" src="/media/logo-azul.png" alt="Finomik" width="95" height="30"><button class="x" id="mclose" aria-label="{t['close']}">✕</button></div><ul>{mm}</ul><div class="mm-foot"><a class="btn btn-gold" href="{url('demo', lang)}">{t['demo']}</a><a class="mm-lang" href="{other_url}" hreflang="{ot}">{t['other']}</a></div></div>"""


def footer(lang):
    t = T[lang]
    link = lambda k, n: f'<a href="{k}" rel="noopener" target="_blank">{n}</a>' if k.startswith("http") else f'<a href="{url(k, lang)}">{n}</a>'
    cols = "".join(f"<div><p class=\"fh\">{h}</p>{''.join(link(k, n) for k, n in ls)}</div>" for h, ls in t["cols"])
    legal = "".join(f'<a href="{url(k, lang)}">{n}</a>' for k, n in t["legal"])
    return f"""<footer>
  <div class="fcols">
    <div><img src="/media/logo-blanco.png" alt="Finomik" width="95" height="30"><p>{t['tag']}</p><p style="margin-top:10px"><a href="mailto:hello@finomik.com">hello@finomik.com</a><br><a href="tel:+34673319335">{TELEFONO}</a></p>{redes("foot-social")}</div>
    {cols}
  </div>
  <p class="bigword" id="bigword">FINOMIK</p>
  <div class="fine"><span>© {date.today().year} Finomik</span><span class="fl">{legal}</span></div>
</footer>"""


SCRIPTS = f"""<script src="/assets/vendor/gsap.min.js"></script>
<script src="/assets/vendor/ScrollTrigger.min.js"></script>
<script src="/assets/vendor/lenis.min.js"></script>
<script src="/assets/site.js?v={V_JS}"></script>
</body>
</html>
"""
CSS = f'<link rel="stylesheet" href="/assets/site.css?v={V_CSS}">\n'


def fill(s, lang):
    s = s.replace("{{redes}}", redes())
    return re.sub(r"\{\{url:([a-z]+(?:#[a-z-]+)?)\}\}", lambda m: url(m.group(1), lang), s)


def write(path, text):
    """'/' -> index.html, '/alumnos' -> alumnos.html, '/en/blog/x' -> en/blog/x.html (Vercel quita el .html)."""
    p = path.strip("/")
    f = OUT / (p + ".html" if p else "index.html")
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(text, encoding="utf-8")
    return f


SITEMAP = []  # (ruta_es, ruta_en, fecha)


def page(key, lang, body, title=None, desc=None, ld=(), path=None, alt=None, og_type="website", og_img=None):
    title, desc = title or META[key][lang][0], desc or META[key][lang][1]
    path, alt = path or url(key, lang), alt or url(key, "en" if lang == "es" else "es")
    cur = key if key in dict(T[lang]["nav"]) else ("blog" if key == "articulo" else None)
    pre = ('<link rel="preload" as="image" href="/media/piso-1920.webp?v=1" imagesrcset="/media/piso-1920.webp?v=1 1x, /media/piso.webp?v=1 2x" media="(min-width:701px)" fetchpriority="high">'
           '<link rel="preload" as="image" href="/media/piso-m.webp?v=1" media="(max-width:700px)" fetchpriority="high">\n') if key == "index" else ""
    doc = head(lang, title, desc, path, alt, ld, og_type, pre + CSS, og_img) + "\n" + nav(lang, cur, alt, key == "demo") + '\n<main id="main">\n' + body + "\n</main>\n" + footer(lang) + "\n" + SCRIPTS
    write(path, doc)


# ---------- páginas normales ----------
for key in ["index", "alumnos", "profesores", "programas", "demo", "bancos", "nosotros", "avisolegal", "privacidad", "cookies"]:
    for lang in LANGS:
        body = fill((SRC / "paginas" / lang / f"{FUENTE.get(key, key)}.html").read_text(encoding="utf-8"), lang)
        ld = [APP] if key == "index" else [faq_ld(body)] if key == "demo" else []
        page(key, lang, body, ld=ld)
    SITEMAP.append((url(key, "es"), url(key, "en")))

# ---------- Por qué Finomik (página con estilo propio) ----------
for lang in LANGS:
    s = (SRC / "paginas" / lang / "porque.raw.html").read_text(encoding="utf-8")
    style = re.search(r"<style>.*?</style>", s, re.S).group(0).replace("</style>", """  .pq-foot { background:var(--navy); color:rgba(255,255,255,.7); padding:28px clamp(16px,4vw,48px); display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; font:600 13px Montserrat, sans-serif; border-top:1px solid rgba(255,255,255,.1); }
  .pq-burger { display:none; width:40px; height:40px; border-radius:50%; border:0; background:var(--navy); color:#fff; font-size:19px; cursor:pointer; }
  .pq-menu { position:fixed; inset:0; z-index:90; background:#fff; color:var(--navy); padding:24px; clip-path:inset(0 0 100% 0); transition:clip-path .6s cubic-bezier(.16,1,.3,1); }
  .pq-menu.open { clip-path:inset(0); }
  .pq-menu ul { list-style:none; margin-top:60px; display:grid; gap:14px; } .pq-menu a { font-weight:900; font-size:28px; letter-spacing:-.03em; }
  .pq-lang { position:absolute; left:24px; right:24px; bottom:28px; text-align:center; font-weight:800; font-size:15px !important; color:#5574A7; }
  .pq-x { position:absolute; top:18px; right:18px; width:44px; height:44px; border-radius:50%; border:0; background:var(--paper); font-size:18px; cursor:pointer; color:var(--navy); }
  @media (max-width:900px) {
    .pq-burger { display:grid; place-items:center; } .lng { display:none; }
    .nav { padding:12px 14px; } .nav img { height:26px; } .nav .btn { padding:10px 15px; font-size:13.5px; } .nav-r { gap:8px; }
    #field { position:absolute; inset:0; z-index:1; } .headline { z-index:20; }
    .headline .h-noise { text-shadow:0 6px 30px rgba(6,26,56,.7); }
    .noise { font-size:12px; padding:9px 12px; border-radius:12px; } .noise small { font-size:9px; } .noise.big { font-size:15px; padding:10px 14px; }
    .kick { top:16vh; padding:0 20px; font-size:11px; } .hint { width:calc(100% - 40px); font-size:11px; z-index:22; }
    .next, .sec, .blue { padding-left:18px; padding-right:18px; } .blue { padding-top:76px; padding-bottom:76px; }
    .stat .n { font-size:clamp(3.6rem,17vw,5rem); }
    .cmp { padding:8px 10px 10px; border-radius:22px; overflow:visible; margin-top:32px; }
    .cmp .r { min-width:0; grid-template-columns:minmax(0,1.45fr) repeat(4,minmax(0,1fr)); }
    .cmp span { padding:16px 4px; font-size:13px; line-height:1.3; } .cmp span:first-child { font-size:13px; line-height:1.35; padding:16px 10px 16px 12px; }
    .cmp .h span { padding-top:14px; padding-bottom:14px; }
    .cmp .h span { font-size:10.5px; line-height:1.2; } .cmp .h .f { font-size:11px; } .cmp .f { font-size:15px; }
    .faq summary { font-size:17px; padding:20px 46px 20px 0; } .faq p { font-size:15.5px; padding-right:0; }
  }
  .pq-foot a { color:#fff; } .pq-foot a:hover { text-decoration:underline; } .pq-foot nav { display:flex; gap:18px; flex-wrap:wrap; }
</style>""")
    body = s[s.index("<body>") + 6: s.index('<script src="https://cdnjs')]
    inline = re.search(r"<script>\s*gsap\.registerPlugin.*?</script>", s, re.S).group(0)
    body = re.sub(r'<p class="tag">.*?</p>\s*', "", body, flags=re.S)
    names = {"index": "index", "alumnos": "alumnos", "profesores": "profesores", "programas": "programas", "blog": "blog", "demo": "demo", "por-que-finomik": "porque"}
    other = "en" if lang == "es" else "es"
    body = re.sub(r'href="(?:\.\./)*(?:sitio/)?(?:en/)?([a-z-]+)\.html(#[a-z-]+)?"( hreflang="(es|en)")?',
                  lambda m: f'href="{url(names[m.group(1)] + (m.group(2) or ""), m.group(4) or lang)}"{m.group(3) or ""}', body)
    body = body.replace('src="../../media/', 'src="/media/').replace('src="media/', 'src="/media/')
    t = T[lang]
    # menú para móvil (esta página no usa site.css)
    mm = "".join(f'<li><a href="{url(k, lang)}">{n}</a></li>' for k, n in [("index", t["home"])] + t["nav"] + [("demo", t["demo"])])
    body = re.sub(r'(<a class="btn btn-gold"[^>]*>[^<]*</a></div>\s*</nav>)', lambda m: m.group(1).replace('</a></div>', f'</a><button class="pq-burger" id="pqBurger" aria-label="{t["menu"]}">☰</button></div>', 1)
                  + f'\n<div class="pq-menu" id="pqMenu" role="dialog" aria-label="{t["menu"]}"><img src="/media/logo-azul.png" alt="Finomik" width="88" height="28" style="height:28px;width:auto"><button class="pq-x" id="pqClose" aria-label="{t["close"]}">✕</button><ul>{mm}</ul><a class="pq-lang" href="{url("porque", other)}" hreflang="{other}">{t["other"]}</a></div>', body, count=1)
    legal = "".join(f'<a href="{url(k, lang)}">{n}</a>' for k, n in [("index", t["home"]), ("nosotros", dict(t["cols"][3][1])["nosotros"]), ("blog", "Blog")] + t["legal"])
    body = body.rstrip() + "\n" + footer(lang).replace("<footer>", '<footer class="site-foot">', 1) + "\n"
    doc = head(lang, *META["porque"][lang], url("porque", lang), url("porque", other), [faq_ld(body)], extra='<link rel="stylesheet" href="/assets/fonts/montserrat.css">\n<link rel="stylesheet" href="/assets/footer.css">\n' + style + "\n") + "\n<body>" + body
    menu_js = "<script>(() => { const m = document.getElementById('pqMenu'); document.getElementById('pqBurger').onclick = () => m.classList.add('open'); document.getElementById('pqClose').onclick = () => m.classList.remove('open'); gsap.to('#bigword', { backgroundSize: '100% 100%', ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top 80%', end: 'bottom bottom', scrub: true } }); })();</script>"
    doc += SCRIPTS.split('<script src="/assets/site.js')[0] + inline + "\n" + menu_js + "\n</body>\n</html>\n"
    write(url("porque", lang), doc)
SITEMAP.append((url("porque", "es"), url("porque", "en")))

# ---------- blog ----------
def md_html(t):
    """Texto sencillo del panel -> HTML. Bloques separados por una línea en blanco:
    '## Título', '### Subtítulo', líneas con '- ' (lista), '![texto](imagen)' (imagen) o párrafo.
    Dentro de un párrafo: **negrita** y [texto](enlace)."""
    def inline(x):
        x = esc(x)
        x = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", x)
        return re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", lambda m: f'<a href="{m.group(2)}"' + (' rel="noopener" target="_blank"' if m.group(2).startswith("http") else "") + f">{m.group(1)}</a>", x)
    out = []
    for blk in re.split(r"\n\s*\n", (t or "").strip()):
        blk = blk.strip()
        if not blk: continue
        img = re.fullmatch(r"!\[([^\]]*)\]\(([^)\s]+)\)", blk)
        lines = blk.splitlines()
        if blk.startswith("### "): out.append(f"<h3>{inline(blk[4:])}</h3>")
        elif blk.startswith("## "): out.append(f"<h2>{inline(blk[3:])}</h2>")
        elif img: out.append(f'<figure><img src="{esc(img.group(2))}" alt="{esc(img.group(1))}" loading="lazy">' + (f"<figcaption>{esc(img.group(1))}</figcaption>" if img.group(1) else "") + "</figure>")
        elif all(l.strip().startswith("- ") for l in lines): out.append("<ul>" + "".join(f"<li>{inline(l.strip()[2:])}</li>" for l in lines) + "</ul>")
        else: out.append("<p>" + "<br>".join(inline(l) for l in lines) + "</p>")
    return "".join(out)


def cargar_posts():
    """Lee src/blog/posts/*.json y devuelve, por idioma, la lista de artículos (más reciente primero)."""
    raw = [json.loads(f.read_text(encoding="utf-8")) for f in sorted((SRC / "blog" / "posts").glob("*.json"))]
    raw = [x for x in raw if x.get("estado") == "publicado" or (VISTA and x.get("estado") == "borrador")]
    raw.sort(key=lambda x: (not x.get("destacado"), x["fecha"]), reverse=False)
    raw = sorted(raw, key=lambda x: x["fecha"], reverse=True)
    raw.sort(key=lambda x: not x.get("destacado"))
    res = {}
    for lang in LANGS:
        o = "en" if lang == "es" else "es"
        lst = []
        for x in raw:
            d = x[lang]
            palabras = len(re.findall(r"\w+", d.get("entradilla", "") + " " + d.get("texto", "")))
            lst.append({"id": x["id"], "slug": d["slug"], "other": x[o]["slug"], "date": x["fecha"], "cat": d.get("categoria", ""), "title": d["titulo"],
                        "intro": d.get("entradilla", ""), "html": md_html(d.get("texto", "")), "stat": d.get("dato") or None, "statLabel": d.get("dato_texto", ""),
                        "source": d.get("fuente", ""), "cta": d.get("llamada", ""), "img": x.get("imagen", ""), "read": f"{max(1, round(palabras / 200))} min",
                        "draft": x.get("estado") == "borrador"})
        res[lang] = lst
    return res


POSTS = cargar_posts()
# Fuera las páginas de artículos de la vez anterior: así un artículo borrado o vuelto a borrador desaparece de la web
for d in (OUT / "blog", OUT / "en" / "blog"):
    for f in d.glob("*.html"): f.unlink()
purl = lambda p, lang: url("blog", lang) + "/" + p["slug"]
other_slug = lambda p, lang: p["other"]


def card(p, lang):
    t = T[lang]
    stat = f'<span class="pstat">{esc(p["stat"])}</span>' if p.get("stat") else ""
    intro = p["intro"] if len(p["intro"]) <= 160 else p["intro"][: p["intro"].rfind(" ", 0, 160)] + "…"
    thumb = f'<img class="post-thumb" src="{esc(p["img"])}" alt="" loading="lazy">' if p.get("img") else ""
    return (f'<a class="post" href="{purl(p, lang)}" data-c="{esc(p["cat"])}">{thumb}<div class="post-top"><span class="pcat">{esc(p["cat"])}</span>{stat}</div>'
            f'<h3>{esc(p["title"])}</h3><p>{esc(intro)}</p><span class="pmeta">{fecha(p["date"], lang)} · {esc(p["read"])} {t["read"]}</span></a>')


HEADS = {"es": '<header class="phead"><div class="wrap"><p class="eyebrow"><i></i>Blog</p><h1>Ideas, datos y <em>novedades</em>.</h1><p class="lead">Lo que aprendemos sobre educación financiera en el aula, y lo nuevo de Finomik.</p></div></header>',
         "en": '<header class="phead"><div class="wrap"><p class="eyebrow"><i></i>Blog</p><h1>Ideas, data and <em>news</em>.</h1><p class="lead">What we learn about financial education in the classroom, and what\'s new at Finomik.</p></div></header>'}
CTA = {"es": "Pide una demo", "en": "Book a demo"}
for lang in LANGS:
    t, P = T[lang], POSTS[lang]
    f = P[0]
    intro = f["intro"] if len(f["intro"]) <= 220 else f["intro"][: f["intro"].rfind(" ", 0, 220)] + "…"
    art = f'<b>{esc(f["stat"])}</b><small>{esc(f["statLabel"])}</small>' if f.get("stat") else '<img src="/media/logo-blanco.png" alt="">'
    feat = (f'<a class="feat" href="{purl(f, lang)}"><div><span class="pcat">{esc(f["cat"])}</span><h2>{esc(f["title"])}</h2><p>{esc(intro)}</p>'
            f'<span class="pmeta">{fecha(f["date"], lang)} · {esc(f["read"])} {t["read"]}</span><span class="more" style="color:#fff">{t["readmore"]}</span></div><div class="feat-art" aria-hidden="true">{art}</div></a>')
    cats = list(dict.fromkeys(p["cat"] for p in P[1:]))
    chips = f'<button class="chip on" data-c="">{t["all"]}</button>' + "".join(f'<button class="chip" data-c="{esc(c)}">{esc(c)}</button>' for c in cats)
    body = HEADS[lang] + f'\n<section class="sec" style="padding-top:0"><div class="wrap"><div id="blogFeat">{feat}</div><div class="filters" id="blogFilters">{chips}</div><div class="posts" id="blogGrid">{"".join(card(p, lang) for p in P[1:])}</div></div></section>'
    page("blog", lang, body, ld=[{"@type": "Blog", "name": "Blog de Finomik" if lang == "es" else "Finomik blog", "url": SITE + url("blog", lang), "publisher": {"@id": SITE + "/#org"}}])
    for p in P:
        secs = p["html"]
        portada = f'<img class="post-img" src="{esc(p["img"])}" alt="">' if p.get("img") else ""
        borrador = '<p class="draft-tag">BORRADOR · vista previa</p>' if p.get("draft") else ""
        stat = (f'<div class="statbox"><b>{esc(p["stat"])}</b><span>{esc(p["statLabel"])}</span><small>{t["source"]}: {esc(p["source"])}</small></div>' if p.get("stat") else "")
        cta = f'<div class="post-cta"><p>{esc(p["cta"])}</p><a class="btn btn-gold" href="{url("demo", lang)}">{CTA[lang]}</a></div>' if p.get("cta") else ""
        rel = [x for x in P if x["slug"] != p["slug"]][:3]
        body = (f'<article class="post-wrap" id="post">{borrador}<a class="back" href="{url("blog", lang)}">{t["back"]}</a>'
                f'<p class="pmeta" style="margin-top:28px"><span class="pcat">{esc(p["cat"])}</span> <time datetime="{p["date"]}">{fecha(p["date"], lang)}</time> · {esc(p["read"])} {t["read"]}</p>'
                f'<h1>{esc(p["title"])}</h1>{portada}{stat}<p class="intro">{esc(p["intro"])}</p>{secs}{cta}</article>\n'
                f'<section class="sec"><div class="wrap"><p class="eyebrow"><i></i>{t["keep"]}</p><div class="posts" id="related" style="margin-top:22px">{"".join(card(x, lang) for x in rel)}</div></div></section>')
        ld = {"@type": "BlogPosting", "headline": p["title"], "description": p["intro"], "datePublished": p["date"], "inLanguage": lang, "image": SITE + (f"/og/{lang}-{p['slug']}.jpg" if (PUB / "og" / f"{lang}-{p['slug']}.jpg").exists() else f"/og-{lang}.jpg"),
              "author": {"@id": SITE + "/#org"}, "publisher": {"@id": SITE + "/#org"}, "mainEntityOfPage": SITE + purl(p, lang)}
        alt = url("blog", "en" if lang == "es" else "es") + "/" + other_slug(p, lang)
        page("articulo", lang, body, title=f'{p["title"]} · Finomik', desc=p["intro"][:155], ld=[ld], path=purl(p, lang), alt=alt, og_type="article", og_img=(f"/og/{lang}-{p['slug']}.jpg" if (PUB / "og" / f"{lang}-{p['slug']}.jpg").exists() else None))
SITEMAP.append((url("blog", "es"), url("blog", "en")))
for p in POSTS["es"]:
    SITEMAP.append((purl(p, "es"), url("blog", "en") + "/" + p["other"]))

# ---------- 404 ----------
body404 = """<header class="phead"><div class="wrap"><p class="eyebrow"><i></i>Error 404</p><h1>Esta página <em>no existe</em>.</h1><p class="lead">Puede que la dirección haya cambiado. This page doesn't exist.</p><div class="ctas" style="margin-top:28px"><a class="btn btn-gold" href="/">Ir al inicio</a> <a class="btn" href="/en" style="border:2px solid var(--navy)">Go to home (EN)</a></div></div></header>"""
doc = head("es", "Página no encontrada · Finomik", "Esta página no existe.", "/404", "/404", extra=CSS + '<meta name="robots" content="noindex">\n') + "\n" + nav("es", None, "/en") + "\n<main>\n" + body404 + "\n</main>\n" + footer("es") + "\n" + SCRIPTS
(OUT / "404.html").write_text(doc, encoding="utf-8")

# ---------- sitemap, robots, llms.txt ----------
hoy = date.today().isoformat()
xs = []
for es_u, en_u in SITEMAP:
    for u in (es_u, en_u):
        xs.append(f'<url><loc>{SITE}{u}</loc><lastmod>{hoy}</lastmod><xhtml:link rel="alternate" hreflang="es" href="{SITE}{es_u}"/><xhtml:link rel="alternate" hreflang="en" href="{SITE}{en_u}"/></url>')
(OUT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + "\n".join(xs) + "\n</urlset>\n", encoding="utf-8")
# ---------- RSS del blog (para lectores de noticias y agregadores) ----------
from email.utils import format_datetime
from datetime import datetime, timezone
for lang in LANGS:
    items = "".join(f"""<item><title>{esc(p["title"])}</title><link>{SITE}{purl(p, lang)}</link><guid>{SITE}{purl(p, lang)}</guid>"""
                    f"""<pubDate>{format_datetime(datetime.fromisoformat(p["date"]).replace(hour=9, tzinfo=timezone.utc))}</pubDate><category>{esc(p["cat"])}</category><description>{esc(p["intro"])}</description></item>"""
                    for p in POSTS[lang] if not p.get("draft"))
    nombre = "Blog de Finomik" if lang == "es" else "Finomik blog"
    rss = (f'<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>{nombre}</title><link>{SITE}{url("blog", lang)}</link>'
           f'<atom:link href="{SITE}{"/rss.xml" if lang == "es" else "/en/rss.xml"}" rel="self" type="application/rss+xml"/><description>{esc(META["blog"][lang][1])}</description><language>{lang}</language>{items}</channel></rss>\n')
    (OUT / ("rss.xml" if lang == "es" else "en/rss.xml")).write_text(rss, encoding="utf-8")
# manifiesto: nombre e icono si alguien guarda la web en la pantalla de inicio del móvil
(OUT / "site.webmanifest").write_text(json.dumps({"name": "Finomik", "short_name": "Finomik", "description": META["index"]["es"][1], "start_url": "/", "display": "browser",
    "background_color": "#ffffff", "theme_color": "#0B3064", "icons": [{"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"}, {"src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png"}]}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
(OUT / ".well-known").mkdir(exist_ok=True)
(OUT / ".well-known" / "security.txt").write_text(f"Contact: mailto:hello@finomik.com\nExpires: {date.today().year + 1}-12-31T23:00:00.000Z\nPreferred-Languages: es, en\nCanonical: {SITE}/.well-known/security.txt\n", encoding="utf-8")
(OUT / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
llms = [f"# Finomik\n\n> Finomik es una plataforma gamificada de educación financiera para colegios de Secundaria. Los alumnos aprenden decidiendo (retos, simulador de inversión con monedas virtuales, noticias explicadas a su nivel y Finny, un tutor con IA que solo habla de educación financiera). El profesor puede dar la clase o dejar que la plataforma explique, y sigue el progreso de cada alumno desde su panel. Datos guardados en la Unión Europea (Alemania), sin publicidad. Disponible en español e inglés. Contacto: hello@finomik.com\n",
        "## Páginas principales (español)\n"] + [f"- [{META[k]['es'][0]}]({SITE}{url(k, 'es')}): {META[k]['es'][1]}" for k in ["index", "alumnos", "profesores", "programas", "porque", "demo", "bancos", "nosotros"]] + \
       ["\n## Main pages (English)\n"] + [f"- [{META[k]['en'][0]}]({SITE}{url(k, 'en')}): {META[k]['en'][1]}" for k in ["index", "alumnos", "profesores", "programas", "porque", "demo"]] + \
       ["\n## Blog\n"] + [f"- [{p['title']}]({SITE}{purl(p, 'es')})" for p in POSTS["es"]] + [f"- [{p['title']}]({SITE}{purl(p, 'en')})" for p in POSTS["en"]]
(OUT / "llms.txt").write_text("\n".join(llms) + "\n", encoding="utf-8")

# ---------- vercel.json (direcciones limpias y redirecciones de la web anterior) ----------
# (el artículo de PISA perdió el "-espana" de su dirección: va antes de la regla general de /articulo/)
redir = [("/articulo/alumnado-sin-educacion-financiera-basica-espana", "/blog/alumnado-sin-educacion-financiera-basica"),
         ("/privacy", "/privacidad"), ("/terms", "/aviso-legal"), ("/more-info", "/demo"), ("/contact", "/demo"), ("/colegios", "/"),
         ("/solutions/schools", "/"), ("/solutions/universities", "/"), ("/solutions/platform", "/alumnos"), ("/solutions/technology", "/por-que-finomik"),
         ("/articulo/:slug", "/blog/:slug"), ("/index", "/"), ("/en/index", "/en")]
# La web llega ya montada en public/: Vercel no instala ni monta nada (el proyecto de Vercel venía configurado para la web antigua de React/Vite)
vercel = {"framework": None, "installCommand": "echo sin dependencias", "buildCommand": "echo web ya montada en public", "outputDirectory": "public",
          "cleanUrls": True, "trailingSlash": False,
          "redirects": [{"source": a, "destination": b, "permanent": True} for a, b in redir],
          "headers": [{"source": "/(.*)", "headers": [{"key": "X-Content-Type-Options", "value": "nosniff"}, {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"},
                                                    {"key": "X-Frame-Options", "value": "SAMEORIGIN"}, {"key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()"}]},
                      {"source": "/assets/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}]},
                      {"source": "/media/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=604800"}]}]}
if not VISTA: (R / "vercel.json").write_text(json.dumps(vercel, indent=2) + "\n", encoding="utf-8")
print("ok ·", len(list(OUT.rglob("*.html"))), "páginas")
