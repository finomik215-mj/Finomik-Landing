// Genera las imágenes para compartir (1200x630): public/og-es.png, public/og-en.png y public/og/<idioma>-<slug>.png
// Uso: node herramientas/og.js   (necesita puppeteer-core; ver GUIA-PUBLICAR.md)
const path = require('path'), fs = require('fs');
const puppeteer = require(process.env.PUPPETEER || 'puppeteer-core');
const R = path.resolve(__dirname, '..'), PUB = path.join(R, 'public'), F = (p) => 'file://' + path.join(PUB, p);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const base = `<style>@font-face{font-family:M;src:url(${F('assets/fonts/montserrat-latin.woff2')}) format('woff2');font-weight:400 900}@font-face{font-family:M;src:url(${F('assets/fonts/montserrat-latin-ext.woff2')}) format('woff2');font-weight:400 900;unicode-range:U+0100-02BA,U+1E00-1EFF}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;font-family:M;background:#0B3064;color:#fff;overflow:hidden;position:relative}
.logo{position:absolute;left:64px;top:56px;height:44px}.bar{position:absolute;left:64px;bottom:56px;display:flex;gap:14px;align-items:center;font-weight:700;font-size:22px;color:rgba(255,255,255,.75)}.bar i{width:44px;height:4px;background:#F5C518;display:block}</style>`;
const general = (lang) => `<!doctype html><html><head><meta charset="utf-8">${base}<style>
.ph{position:absolute;right:0;top:0;width:640px;height:630px;background:url(${F('media/trabajo.jpg')}) 68% center/cover}.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0B3064 0%,rgba(11,48,100,.55) 35%,rgba(11,48,100,.1) 100%)}
h1{position:absolute;left:64px;top:170px;width:700px;font-weight:900;font-size:86px;line-height:.95;letter-spacing:-.045em}h1 em{font-style:normal;color:#F5C518}</style></head><body>
<div class="ph"></div><img class="logo" src="${F('media/logo-blanco.png')}"><h1>${lang === 'es' ? 'Su primer <em>trabajo</em>,<br>sin improvisar.' : 'Their first <em>job</em>,<br>without guessing.'}</h1>
<div class="bar"><i></i>${lang === 'es' ? 'Educación financiera para colegios · finomik.com' : 'Financial education for schools · finomik.com'}</div></body></html>`;
const article = (p, lang) => `<!doctype html><html><head><meta charset="utf-8">${base}<style>
body{background:radial-gradient(circle at 85% 20%,#114076,#0B3064 55%,#061a38)}
.cat{position:absolute;left:64px;top:140px;font-weight:800;font-size:20px;letter-spacing:.12em;text-transform:uppercase;color:#C8D0DD}
h1{position:absolute;left:64px;top:186px;width:${p.stat ? 690 : 1060}px;font-weight:900;font-size:${p.title.length > 80 ? 46 : 54}px;line-height:1.08;letter-spacing:-.03em}
.st{position:absolute;right:64px;top:150px;width:330px;text-align:right}.st b{display:block;font-weight:900;font-size:${(p.stat || '').length > 4 ? 104 : 132}px;line-height:1;letter-spacing:-.05em;color:#F5C518}.st small{display:block;margin-top:14px;font-weight:600;font-size:19px;line-height:1.35;color:rgba(255,255,255,.75)}</style></head><body>
<img class="logo" src="${F('media/logo-blanco.png')}"><p class="cat">${esc(p.cat)}</p><h1>${esc(p.title)}</h1>
${p.stat ? `<div class="st"><b>${esc(p.stat)}</b><small>${esc(p.statLabel)}</small></div>` : ''}<div class="bar"><i></i>${lang === 'es' ? 'Blog de Finomik' : 'Finomik blog'} · finomik.com</div></body></html>`;
(async () => {
  const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-first-run', '--allow-file-access-from-files'] });
  const pg = await b.newPage(); await pg.setViewport({ width: 1200, height: 630 });
  const shot = async (html, out) => { const tmp = path.join(PUB, '_og_tmp.html'); fs.writeFileSync(tmp, html); await pg.goto('file://' + tmp, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready); await pg.screenshot({ path: out }); fs.unlinkSync(tmp); console.log(path.relative(R, out)); };
  fs.mkdirSync(path.join(PUB, 'og'), { recursive: true });
  for (const lang of ['es', 'en']) {
    await shot(general(lang), path.join(PUB, `og-${lang}.png`));
    const dir = path.join(R, 'src/blog/posts');
    for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
      const x = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (x.estado !== 'publicado') continue;
      const d = x[lang], p = { slug: d.slug, title: d.titulo, cat: d.categoria, stat: d.dato, statLabel: d.dato_texto };
      await shot(article(p, lang), path.join(PUB, 'og', `${lang}-${p.slug}.png`));
    }
  }
  await b.close();
})();
