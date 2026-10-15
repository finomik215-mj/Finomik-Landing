/* Finomik · home v2 · interacciones */
gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const EN = document.documentElement.lang === 'en';
/** Devuelve el texto en el idioma de la página. */
const tx = (es, en) => (EN ? en : es);
const PC = EN ? '%' : ' %';
const nf = (n, d = 0) => n.toLocaleString(EN ? 'en-US' : 'de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });
/** Carpeta de avatares. */
const AV = '/media/av/';
/** Adónde se envía el formulario de demo. Cuando el CRM tenga su propia dirección de entrada, basta con cambiarla aquí. */
const FORM_ENDPOINT = 'https://formspree.io/f/xpqkvboz';
let lenis;
if (!reduce) { lenis = window.lenis = new Lenis({ lerp: .18, wheelMultiplier: 1.1 }); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
const goTo = (el) => (lenis ? lenis.scrollTo(el, { duration: .9, offset: el.id === 'inicio' ? 0 : -10 }) : el.scrollIntoView({ behavior: 'smooth' }));
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const id = a.getAttribute('href'); if (id.length < 2) return; const el = $(id); if (!el) return; e.preventDefault(); $('#mmenu').classList.remove('open'); goTo(el); }));
/** Observa si un bloque esta en pantalla (para que las demos solo se animen solas cuando se ven). */
const visible = (el, cb) => ScrollTrigger.create({ trigger: el, start: 'top 75%', end: 'bottom 25%', onToggle: (s) => cb(s.isActive) });
function toast(el, html) { el.innerHTML = html; gsap.killTweensOf(el); gsap.fromTo(el, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'back.out(1.6)' }); gsap.to(el, { y: -16, opacity: 0, duration: .4, delay: 2.8 }); }

/* ---------- navegación ---------- */
const nav = $('#nav');
if ($('#film')) { const navBg = () => nav.classList.toggle('solid', scrollY > innerHeight * .85); addEventListener('scroll', navBg, { passive: true }); navBg(); }
else nav.classList.add('solid');
const menu = (open) => { $('#mmenu').classList.toggle('open', open); $('#burger').setAttribute('aria-expanded', open); if (open) $('#mclose').focus(); };
if ($('#burger')) $('#burger').onclick = () => menu(true);
if ($('#mclose')) $('#mclose').onclick = () => menu(false);
addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('#mmenu') && $('#mmenu').classList.contains('open')) menu(false); });
// índice lateral con el capítulo actual
const toc = $('#toc'), tocLinks = toc ? $$('#toc a') : [];
tocLinks.forEach((a, i) => {
  const sec = $(a.getAttribute('href'));
  ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => { if (s.isActive) { tocLinks.forEach((x) => x.classList.toggle('on', x === a)); toc.classList.toggle('on-dark', sec.hasAttribute('data-dark')); } } });
});
if (toc) ScrollTrigger.create({ start: () => innerHeight * .6, end: 'max', onToggle: (s) => toc.classList.toggle('show', s.isActive) });

const coins = { v: 1240, el: $('#coinsA'), add(n) { if (!this.el) { this.v += n; return; } const o = { v: this.v }; this.v += n; gsap.to(o, { v: this.v, duration: .9, ease: 'power2.out', onUpdate: () => (this.el.textContent = nf(Math.round(o.v))) }); gsap.fromTo(this.el.parentNode, { scale: 1.15 }, { scale: 1, duration: .6, ease: 'back.out(3)' }); } };
function makeTour({ steps, screens, side, counter, prev, next, titles, onShow, root, auto = 7000 }) {
  // en móvil cada pantalla tiene su altura: sin avance automático para que la página no salte
  let cur = -1, autoOn = !matchMedia('(max-width:700px)').matches, t;
  function show(i, user) {
    if (user) autoOn = false;
    i = (i + screens.length) % screens.length;
    if (i === cur) return; const p = cur; cur = i;
    steps.forEach((b, k) => b.classList.toggle('on', k === i));
    screens.forEach((sc, k) => sc.classList.toggle('on', k === i));
    side && side.forEach((a, k) => a.classList.toggle('on', k === i));
    if (counter) counter.textContent = `${i + 1} / ${screens.length}`;
    if (titles) titles.el.textContent = titles.list[i];
    if (p >= 0) gsap.to(screens[p], { autoAlpha: 0, y: -12, duration: .22, ease: 'power2.in' });
    gsap.fromTo(screens[i], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .45, ease: 'expo.out', delay: p >= 0 ? .12 : 0 });
    gsap.fromTo($$('.card, .pill, .unit, .opt, .shop button, .metrics .card', screens[i]), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: 'expo.out', stagger: .03, delay: p >= 0 ? .18 : .05 });
    steps.forEach((b) => { const bar = $('.bar', b); if (bar) { gsap.killTweensOf(bar); gsap.set(bar, { scaleY: 0 }); } });
    const bar = $('.bar', steps[i]); if (bar && autoOn) gsap.fromTo(bar, { scaleY: 0 }, { scaleY: 1, duration: auto / 1000, ease: 'none' });
    onShow && onShow(i);
    if (user && p >= 0 && matchMedia('(max-width:700px)').matches) { const top = root.getBoundingClientRect().top; if (top < 0 || top > innerHeight * .5) { const y = scrollY + top - 84; lenis ? lenis.scrollTo(y, { duration: .8 }) : scrollTo({ top: y, behavior: 'smooth' }); } }
    clearTimeout(t); if (autoOn && inView) t = setTimeout(() => show(cur + 1), auto);
  }
  let inView = false;
  visible(root, (on) => { inView = on; clearTimeout(t); if (on && autoOn) t = setTimeout(() => show(cur + 1), auto); });
  steps.forEach((b, k) => b.addEventListener('click', () => show(k, true)));
  side && side.forEach((a, k) => a.addEventListener('click', () => show(k, true)));
  prev && (prev.onclick = () => show(cur - 1, true)); next && (next.onclick = () => show(cur + 1, true));
  root.addEventListener('pointerdown', () => { autoOn = false; clearTimeout(t); steps.forEach((b) => { const bar = $('.bar', b); bar && gsap.killTweensOf(bar); }); });
  gsap.set(screens, { autoAlpha: 0 });
  show(0);
  return { show };
}
if ($('#film')) {
/* ---------- 1 · inicio ---------- */
(() => {
  const scenes = $$('#film .scene'), words = $$('#rot > span'), chaps = $$('.chap');
  const DUR = 2; let cur = 0, timer;
  gsap.set(words, { yPercent: 150 }); gsap.set(words[0], { yPercent: 0 });
  const kb = (el) => { const d = Math.random() > .5 ? 1 : -1; gsap.fromTo(el, { scale: 1.16, xPercent: 2.5 * d }, { scale: 1.02, xPercent: -2.5 * d, duration: DUR + 1.4, ease: 'none' }); };
  function go(i) {
    if (i === cur) return; const p = cur; cur = i;
    gsap.to(scenes[p], { opacity: 0, duration: 1.1 }); gsap.fromTo(scenes[i], { opacity: 0 }, { opacity: 1, duration: 1.1 }); kb(scenes[i]);
    gsap.to(words[p], { yPercent: -150, duration: .8, ease: 'expo.inOut' }); gsap.fromTo(words[i], { yPercent: 150 }, { yPercent: 0, duration: .8, ease: 'expo.inOut', delay: .08 });
    prog();
  }
  function prog() {
    chaps.forEach((c, k) => { c.classList.toggle('on', k === cur); const b = $('i', c); gsap.killTweensOf(b); gsap.set(b, { scaleX: k < cur ? 1 : 0 }); });
    if (chaps[cur]) gsap.fromTo($('i', chaps[cur]), { scaleX: 0 }, { scaleX: 1, duration: DUR, ease: 'none' });
    clearTimeout(timer); timer = setTimeout(() => heroOn && go((cur + 1) % scenes.length), DUR * 1000);
  }
  // las fotos solo rotan mientras la portada se ve: al bajar, la página deja de mover imágenes enormes por detrás
  let heroOn = true;
  ScrollTrigger.create({ trigger: '#inicio', start: 'top bottom', end: 'bottom top', onToggle: (s) => { heroOn = s.isActive; if (heroOn) prog(); } });
  chaps.forEach((c, k) => c.addEventListener('click', () => go(k)));
  kb(scenes[0]); prog();
  gsap.timeline().from('#film', { clipPath: 'inset(18% 22% 18% 22% round 32px)', duration: 1.1, ease: 'expo.inOut' }).from('.hero-copy > *', { y: 40, opacity: 0, duration: .7, ease: 'power3.out', stagger: .06 }, .5);
  const mx = scenes.map((s) => gsap.quickTo(s, 'x', { duration: .9, ease: 'power3.out' })), my = scenes.map((s) => gsap.quickTo(s, 'y', { duration: .9, ease: 'power3.out' }));
  addEventListener('pointermove', (e) => { if (scrollY > innerHeight) return; const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; mx.forEach((f) => f(-x * 30)); my.forEach((f) => f(-y * 18)); }, { passive: true });
  gsap.timeline({ scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: .6 } }).to('#film', { clipPath: 'inset(6% 2% 22% 2% round 36px)', ease: 'none' }, 0).to('.hero-copy', { y: -140, opacity: 0, ease: 'none' }, 0);
})();

}
if ($('#guessR')) {
/* ---------- 2 · la primera nómina ---------- */
(() => {
  const r = $('#guessR'), v = $('#guessV');
  r.oninput = () => (v.textContent = nf(+r.value));
  $('#reveal').onclick = () => {
    $('#slipLock').style.display = 'none'; $('#slipBody').style.display = '';
    const rows = $$('#slipBody .row'), diff = +r.value - 1245.3;
    gsap.fromTo(rows, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5, ease: 'expo.out', stagger: .35 });
    const g = nf(+r.value);
    const msg = Math.abs(diff) <= 40 ? tx(`¡Casi exacto! Dijiste ${g}. Pocos lo aciertan.`, `Almost spot on! You said ${g}. Very few get it right.`) : diff > 0 ? tx(`Dijiste ${g}: son ${nf(diff)} menos de lo que esperabas. Cada mes.`, `You said ${g}: that's ${nf(diff)} less than you expected. Every month.`) : tx(`Dijiste ${g}: fuiste prudente, cobra ${nf(-diff)} más.`, `You said ${g}: you were cautious, the take-home is ${nf(-diff)} more.`);
    const vd = $('#verdict'); vd.textContent = msg;
    gsap.fromTo(vd, { opacity: 0 }, { opacity: 1, delay: 1.5, duration: .5 });
    gsap.fromTo('#slip', { rotate: -1.5 }, { rotate: 0, duration: .8, ease: 'elastic.out(1,.4)' });
  };
  $$('#whys .chip').forEach((b) => b.addEventListener('click', () => {
    $$('#whys .chip').forEach((x) => x.classList.toggle('on', x === b));
    const a = $('#whyAns'); gsap.to(a, { opacity: 0, y: -6, duration: .2, onComplete: () => { a.innerHTML = b.dataset.a; gsap.to(a, { opacity: 1, y: 0, duration: .4 }); } });
  }));
})();

}
if ($('#devA')) {
const tourA = makeTour({
  root: $('#devA'), steps: $$('#stepsA button'), screens: $$('#devA .screen'), side: $$('#devA .side .sl'), counter: $('#cntA'), prev: $('#prevA'), next: $('#nextA'),
  titles: { el: $('#topA'), list: tx(['Tu camino financiero', 'Lección', 'Reto', 'Simulador de inversión', 'Eduario', 'Tu perfil'], ['Your financial path', 'Lesson', 'Challenge', 'Investment simulator', 'Eduario', 'Your profile']) },
  onShow: (i) => {
    const lv = $('#lesVid'); if (i !== 1 && lv && !lv.paused) { lv.pause(); $('#playBtn').classList.remove('hide'); }
    if (i === 0) gsap.fromTo('#pathA .stop', { scale: .5, opacity: 0 }, { scale: 1, opacity: 1, duration: .4, ease: 'back.out(2.2)', stagger: .07, delay: .15 });
  },
});
// camino
$('#curNode').onclick = () => tourA.show(1, true);
$('#goLesson').onclick = () => tourA.show(1, true);
// lección: índice a la izquierda, contenido grande a la derecha
let lesCur = 0;
const lesSeen = new Set([0]);
const KINDS = tx(['VÍDEO', 'LECTURA', 'INFOGRAFÍA'], ['VIDEO', 'READING', 'INFOGRAPHIC']);
function lesPaint() {
  $$('#lesList .li').forEach((b, k) => { b.classList.toggle('cur', k === lesCur); b.classList.toggle('done', lesSeen.has(k) && k !== lesCur); if (lesSeen.has(k) && k !== lesCur) $('i', b).textContent = '✓'; else if (k === 3) $('i', b).innerHTML = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6.5 7 .9-5.1 4.8 1.3 7L12 17.8 5.8 21.2l1.3-7L2 9.4l7-.9z"/></svg>'; else $('i', b).textContent = k + 1; });
  const pct = Math.round((lesSeen.size / 4) * 100);
  $('#lesBar').style.width = pct + '%'; $('#lesPct').textContent = tx(`${pct} % completado`, `${pct}% complete`);
  $('#lesKind').textContent = KINDS[lesCur] || tx('RETO', 'CHALLENGE');
  $$('.lv').forEach((v, k) => v.classList.toggle('on', k === lesCur));
  const v = $$('.lv')[lesCur]; if (v) gsap.fromTo(v, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5, ease: 'expo.out' });
  if (lesCur === 1) gsap.fromTo('#split3 span', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: .8, ease: 'expo.out', stagger: .15 });
  if (lesCur === 2) gsap.fromTo('#hbars i', { width: 0 }, { width: (i, el) => el.style.getPropertyValue('--w'), duration: 1, ease: 'expo.out', stagger: .08 });
  $('#lesPrev').disabled = lesCur === 0;
}
function lesGo(k) { if (typeof pauseVid === 'function') pauseVid(); if (k === 3) { lesSeen.add(3); tourA.show(2, true); return; } lesCur = Math.max(0, Math.min(2, k)); lesSeen.add(lesCur); lesPaint(); }
$$('#lesList .li').forEach((b) => b.addEventListener('click', () => lesGo(+b.dataset.v)));
$('#lesNext').onclick = () => lesGo(lesCur + 1);
$('#lesPrev').onclick = () => lesGo(lesCur - 1);
const ICON_VOL = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg>', ICON_MUTE = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>';
const lesVid = $('#lesVid');
function playVideo() { lesVid.muted = false; lesVid.play().catch(() => { lesVid.muted = true; lesVid.play(); }); $('#playBtn').classList.add('hide'); $('#vidMute').innerHTML = lesVid.muted ? ICON_MUTE : ICON_VOL; }
$('#playBtn').onclick = playVideo;
lesVid.onclick = () => (lesVid.paused ? playVideo() : (lesVid.pause(), $('#playBtn').classList.remove('hide')));
lesVid.ontimeupdate = () => { if (lesVid.duration) $('#vidProg').style.width = (lesVid.currentTime / lesVid.duration) * 100 + '%'; };
lesVid.onended = () => { $('#playBtn').classList.remove('hide'); lesSeen.add(0); lesPaint(); };
$('#vidMute').onclick = () => { lesVid.muted = !lesVid.muted; $('#vidMute').innerHTML = lesVid.muted ? ICON_MUTE : ICON_VOL; };
const pauseVid = () => { if (!lesVid.paused) { lesVid.pause(); $('#playBtn').classList.remove('hide'); } };
$('#salR').oninput = (e) => { const v = +e.target.value; $('#salV').textContent = nf(v); [[.5, '#a1'], [.3, '#a2'], [.2, '#a3']].forEach(([f, id]) => ($(id).textContent = nf(Math.round(v * f)))); };
$('#notesBtn').onclick = () => $('#notes').classList.add('open');
$('#notesClose').onclick = () => $('#notes').classList.remove('open');
lesPaint();
// retos
let quizDone = false;
$$('#optsA .opt').forEach((o) => o.addEventListener('click', () => {
  const ok = o.dataset.ok === '1';
  $$('#optsA .opt').forEach((x) => x.classList.remove('ok', 'ko')); o.classList.add(ok ? 'ok' : 'ko');
  $('#fbA').textContent = o.dataset.f;
  if (ok && !quizDone) { quizDone = true; coins.add(50); toast($('#toastA'), tx('✓ ¡Correcto! Has ganado <b>+50 monedas</b>', '✓ Correct! You earned <b>+50 coins</b>')); }
  if (!ok) gsap.fromTo(o, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1,.3)' });
}));
// simulador: pestañas Mercado / Mi cartera
const ASSETS = [
  { n: tx('Índice S&P 500', 'S&P 500 index'), t: tx('Fondo indexado', 'Index fund'), p: 512, c: 6.5, col: '#0B3064', r: 3, s: [40, 44, 42, 50, 48, 56, 60, 58, 66, 70, 74, 72, 78] },
  { n: 'Apple', t: tx('Acción', 'Stock'), p: 186, c: -5.6, col: '#5574A7', r: 4, s: [70, 66, 72, 64, 60, 62, 55, 58, 52, 50, 48, 51, 47] },
  { n: 'Coca-Cola', t: tx('Acción', 'Stock'), p: 62, c: 3.1, col: '#8F9EB7', r: 2, s: [40, 42, 41, 45, 44, 48, 47, 50, 49, 52, 53, 52, 54] },
  { n: tx('Oro', 'Gold'), t: tx('Materia prima', 'Commodity'), p: 2380, c: 9.2, col: '#F5C518', r: 3, s: [30, 34, 36, 35, 42, 46, 45, 52, 58, 60, 66, 64, 70] },
  { n: tx('Bono a 10 años', '10-year bond'), t: tx('Renta fija', 'Fixed income'), p: 100, c: 1.2, col: '#1c8a52', r: 1, s: [50, 50, 51, 51, 51, 52, 52, 52, 53, 53, 53, 54, 54] },
];
let selA = 0, amt = 100, range = 1; const port = {};
const mk = $('#mk');
ASSETS.forEach((a, i) => { const b = document.createElement('button'); b.innerHTML = `<span><b>${a.n}</b><small>${a.t}</small></span><span class="mkr"><em>${nf(a.p)}</em><span class="${a.c >= 0 ? 'up' : 'dn'}">${a.c >= 0 ? '+' : ''}${nf(a.c, 1)}%</span></span>`; b.onclick = () => selectAsset(i); mk.append(b); });
const series = (a) => (range === 0 ? a.s.slice(-5) : range === 1 ? a.s : [...a.s.map((v) => v * .8 + 4), ...a.s]);
function chartPath(s) { const W = 300, H = 110, step = W / (s.length - 1), max = Math.max(...s) + 4, min = Math.min(...s) - 4; const pts = s.map((v, i) => [i * step, H - ((v - min) / (max - min)) * (H - 8) - 4]); const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' '); return { d, area: d + ` L ${W} ${H} L 0 ${H} Z` }; }
function drawChart() {
  const a = ASSETS[selA], { d, area } = chartPath(series(a));
  $('#chLine').setAttribute('d', d); $('#chArea').setAttribute('d', area);
  const L = $('#chLine').getTotalLength(); gsap.fromTo('#chLine', { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: .9, ease: 'power2.out' });
  gsap.fromTo('#chArea', { opacity: 0 }, { opacity: 1, duration: .7, delay: .3 });
}
function selectAsset(i) {
  selA = i; const a = ASSETS[i];
  $$('#mk button').forEach((b, k) => b.classList.toggle('on', k === i));
  $('#chName').textContent = a.n; $('#chType').textContent = a.t;
  $('#chPrice').textContent = nf(a.p);
  const c = $('#chChg'); c.textContent = `${a.c >= 0 ? '+' : ''}${nf(a.c, 1)}${PC}`; c.className = 'pill-chg ' + (a.c >= 0 ? 'up' : 'dn');
  drawChart();
}
$$('#rng button').forEach((b, i) => b.addEventListener('click', () => { range = i; $$('#rng button').forEach((x) => x.classList.toggle('on', x === b)); drawChart(); }));
$$('#amts button').forEach((b) => b.addEventListener('click', () => { amt = +b.dataset.a; $$('#amts button').forEach((x) => x.classList.toggle('on', x === b)); }));
const simTab = (t) => { $$('#simTabs button').forEach((b) => b.classList.toggle('on', b.dataset.t === t)); $$('.simx-pane').forEach((p) => p.classList.toggle('on', p.dataset.p === t)); const p = $(`.simx-pane[data-p="${t}"]`); gsap.fromTo(p.children, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: .5, ease: 'expo.out', stagger: .06 }); if (t === 'c') drawDonut(); };
$$('#simTabs button').forEach((b) => b.addEventListener('click', () => simTab(b.dataset.t)));
const paintCash = () => ($('#cashS').textContent = nf(coins.v));
$('#buy').onclick = () => {
  if (coins.v < amt) { toast($('#toastS'), tx('No tienes monedas suficientes', 'You don\'t have enough coins')); return; }
  port[selA] = (port[selA] || 0) + amt; coins.add(-amt); paintCash();
  const n = Object.keys(port).length; $('#portN').textContent = n; gsap.fromTo('#portN', { scale: 1.6 }, { scale: 1, duration: .6, ease: 'back.out(3)' });
  toast($('#toastS'), tx(`Has invertido <b>${amt} monedas</b> en ${ASSETS[selA].n}`, `You invested <b>${amt} coins</b> in ${ASSETS[selA].n}`) + ` · <u style="cursor:pointer" onclick="document.querySelector('#simTabs [data-t=c]').click()">${tx('ver mi cartera', 'see my portfolio')}</u>`);
};
function drawDonut() {
  const svg = $('#donut'); $$('circle.seg', svg).forEach((c) => c.remove());
  const ent = Object.entries(port), tot = ent.reduce((s, [, v]) => s + v, 0);
  $('#invTot').textContent = nf(tot);
  if (!tot) return;
  let acc = 0; const C = 2 * Math.PI * 15.9, leg = $('#legend'); leg.innerHTML = '';
  ent.forEach(([k, v]) => {
    const a = ASSETS[k], f = v / tot, c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    Object.entries({ cx: 21, cy: 21, r: 15.9, fill: 'none', stroke: a.col, 'stroke-width': 5, 'stroke-dasharray': `${f * C} ${C}`, 'stroke-dashoffset': -acc * C, transform: 'rotate(-90 21 21)', class: 'seg' }).forEach(([x, y]) => c.setAttribute(x, y));
    svg.append(c); acc += f;
    leg.insertAdjacentHTML('beforeend', `<div><i style="background:${a.col}"></i><span>${a.n}</span><b>${nf(f * 100)}${PC}</b><em>${nf(v)}</em></div>`);
  });
  gsap.from($$('circle.seg', svg), { opacity: 0, duration: .5, stagger: .1 });
  const n = ent.length, maxF = Math.max(...ent.map(([, v]) => v)) / tot, risk = ent.reduce((s, [k, v]) => s + ASSETS[k].r * v, 0) / tot;
  const cm = [];
  cm.push(n === 1 ? ['warn', tx('Cartera muy concentrada', 'Very concentrated portfolio'), tx('Todo está en un solo activo: si cae, cae todo.', 'Everything is in one asset: if it falls, everything falls.')] : maxF > .6 ? ['warn', tx('Poca diversificación', 'Low diversification'), tx('Un activo pesa más del 60 %.', 'One asset makes up more than 60%.')] : ['ok', tx('Buena diversificación', 'Well diversified'), tx('Has repartido el riesgo entre varios activos.', 'You have spread the risk across several assets.')]);
  const best = ent.map(([k]) => ASSETS[k]).sort((x, y) => y.c - x.c)[0];
  cm.push(['info', tx('Tu mejor activo', 'Your best asset'), `${best.n} (${best.c >= 0 ? '+' : ''}${nf(best.c, 1)}${PC}). ` + tx('Si pesa mucho, su evolución marcará tu resultado.', 'If it weighs a lot, it will drive your result.')]);
  const gain = ent.reduce((t, [k, v]) => t + v * ASSETS[k].c / 100, 0);
  cm.push([gain >= 0 ? 'ok' : 'warn', tx(`${gain >= 0 ? 'Ganas' : 'Pierdes'} ${nf(Math.abs(gain), 1)} monedas`, `You ${gain >= 0 ? 'gain' : 'lose'} ${nf(Math.abs(gain), 1)} coins`), tx(`Es lo que ${gain >= 0 ? 'ha subido' : 'ha bajado'} tu cartera según los precios de hoy. Recuerda: lo que sube también puede bajar.`, `That is how much your portfolio has ${gain >= 0 ? 'gone up' : 'gone down'} at today's prices. Remember: what goes up can also come down.`)]);
  $('#comments').innerHTML = cm.map(([t, h, p]) => `<div class="cm ${t}"><b>${h}</b>${p}</div>`).join('');
  gsap.from('#comments .cm', { x: 20, opacity: 0, duration: .5, stagger: .1 });
  gsap.to('#riskMark', { left: `${((risk - 1) / 3) * 100}%`, duration: 1, ease: 'expo.out' });
}
selectAsset(0); paintCash();
// eduario
const EDU = [
  { tag: 'Mercados', kpi: 'Oro · +9 % este año', h: 'El oro vuelve a subir por la preocupación sobre la economía', bars: [30, 42, 38, 55, 62, 74, 88],
    t: ['Cuando la gente tiene miedo a que la economía vaya mal, compra oro porque suele guardar su valor. Por eso su precio sube.', 'El oro se considera un activo refugio: ante la incertidumbre aumenta su demanda y, con ella, su precio. Este año acumula una subida cercana al 9 %.', 'La demanda de oro como cobertura frente a la incertidumbre macroeconómica y a una posible relajación monetaria impulsa su cotización, con compras récord de bancos centrales.'],
    m: 'Si tienes ahorros, nadie te obliga a comprar oro. Pero entender por qué sube te ayuda a no dejarte llevar por las prisas.' },
  { tag: 'Economía', kpi: 'Tipos de interés · sin cambios', h: 'Los bancos centrales mantienen los tipos de interés', bars: [60, 58, 57, 57, 56, 56, 56],
    t: ['El "precio del dinero" no cambia este mes: pedir un préstamo cuesta lo mismo que antes.', 'Los bancos centrales dejan los tipos estables: préstamos e hipotecas mantienen su coste y las cuentas de ahorro, su rentabilidad.', 'Con la inflación aún por encima del objetivo, los bancos centrales prefieren no relajar la política monetaria todavía; el mercado espera bajadas el próximo año.'],
    m: 'Si piensas pedir un préstamo para estudiar o comprar algo grande, el interés que pagarás depende de estas decisiones.' },
  { tag: 'Ahorro', kpi: '6 de cada 10 jóvenes', h: 'Cada vez más jóvenes ahorran con un objetivo concreto', bars: [22, 28, 31, 40, 44, 52, 60],
    t: ['Muchos jóvenes ahorran para algo concreto: un viaje, un celular o sus estudios. Tener un objetivo ayuda a no rendirse.', 'Una encuesta muestra que 6 de cada 10 jóvenes ahorran con una meta. Los que la tienen ahorran más y durante más tiempo.', 'Los estudios de comportamiento muestran que fijar metas concretas y medibles aumenta la constancia del ahorro frente al ahorro "residual".'],
    m: 'Ponle nombre a tu ahorro. "Para el viaje de fin de curso" funciona mejor que "por si acaso".' },
];
const EDU_EN = [
  { tag: 'Markets', kpi: 'Gold · +9% this year', h: 'Gold rises again on worries about the economy', bars: [30, 42, 38, 55, 62, 74, 88],
    t: ['When people are afraid the economy will go badly, they buy gold because it usually keeps its value. That is why its price goes up.', 'Gold is seen as a safe-haven asset: when uncertainty grows, demand rises and so does its price. This year it is up almost 9%.', 'Demand for gold as a hedge against macroeconomic uncertainty and possible monetary easing is lifting its price, with record purchases by central banks.'],
    m: 'If you have savings, nobody makes you buy gold. But understanding why it rises helps you avoid rushed decisions.' },
  { tag: 'Economy', kpi: 'Interest rates · unchanged', h: 'Central banks keep interest rates on hold', bars: [60, 58, 57, 57, 56, 56, 56],
    t: ['The "price of money" does not change this month: borrowing costs the same as before.', 'Central banks keep rates stable: loans and mortgages cost the same, and savings accounts pay the same.', 'With inflation still above target, central banks prefer not to ease monetary policy yet; markets expect cuts next year.'],
    m: 'If you plan to borrow to study or to buy something big, the interest you pay depends on these decisions.' },
  { tag: 'Saving', kpi: '6 in 10 young people', h: 'More and more young people save with a clear goal', bars: [22, 28, 31, 40, 44, 52, 60],
    t: ['Many young people save for something specific: a trip, a phone or their studies. Having a goal helps them keep going.', 'A survey shows that 6 in 10 young people save with a goal. Those who have one save more, and for longer.', 'Behavioural research shows that setting concrete, measurable goals makes saving more consistent than "leftover" saving.'],
    m: 'Give your savings a name. "For the end-of-year trip" works better than "just in case".' },
];
if (EN) EDU.splice(0, EDU.length, ...EDU_EN);
let eduI = 0, eduL = 0;
function eduPaint(anim) {
  const n = EDU[eduI];
  $('#eduTag').textContent = n.tag; $('#eduKpi').textContent = n.kpi; $('#eduH').textContent = n.h; $('#newsT').textContent = n.t[eduL]; $('#eduMean').textContent = n.m;
  $('#eduDate').textContent = tx(['Hoy', 'Ayer', 'Hace 3 días'], ['Today', 'Yesterday', '3 days ago'])[eduI] + tx(' · 2 min de lectura', ' · 2 min read');
  $$('#eduBars i').forEach((b, k) => gsap.to(b, { height: n.bars[k] + '%', duration: .9, ease: 'expo.out', delay: k * .05 }));
  $('#eduList').innerHTML = EDU.map((x, k) => `<button class="eli${k === eduI ? ' on' : ''}" data-k="${k}"><span>${x.tag}</span>${x.h}</button>`).join('');
  $$('#eduList .eli').forEach((b) => b.addEventListener('click', () => { eduI = +b.dataset.k; eduPaint(true); }));
  if (anim) gsap.fromTo('.edu-main > *', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5, stagger: .05 });
}
$$('#lvlSw button').forEach((b, i) => b.addEventListener('click', () => { eduL = i; $$('#lvlSw button').forEach((x) => x.classList.toggle('on', x === b)); gsap.to('#newsT', { opacity: 0, duration: .2, onComplete: () => { $('#newsT').textContent = EDU[eduI].t[i]; gsap.to('#newsT', { opacity: 1, duration: .4 }); } }); }));
eduPaint();
let qdDone = false;
$$('.qd-o button').forEach((b) => b.addEventListener('click', () => { const ok = b.dataset.ok === '1'; $$('.qd-o button').forEach((x) => x.classList.remove('ok', 'ko')); b.classList.add(ok ? 'ok' : 'ko'); $('#qdF').textContent = ok ? tx('Bien: el oro suele subir cuando hay miedo, y las acciones a menudo bajan.', 'Right: gold usually rises when people are afraid, and stocks often fall.') : tx('No necesariamente: cuando hay miedo, el oro sube y muchas acciones bajan.', 'Not necessarily: when people are afraid, gold rises and many stocks fall.'); if (ok && !qdDone) { qdDone = true; coins.add(10); paintCash(); } }));
// avatar
$$('#shop button').forEach((b) => b.addEventListener('click', () => {
  const p = +b.dataset.p;
  if (!b.classList.contains('own')) {
    if (coins.v < p) { toast($('#toastAv'), tx('Te faltan monedas: completa más retos', 'Not enough coins: complete more challenges')); return; }
    coins.add(-p); paintCash(); b.classList.add('own'); $('small', b).textContent = tx('Tuya', 'Yours'); toast($('#toastAv'), tx(`¡Comprada! <b>${b.childNodes[1].textContent.trim()}</b> es tuya para siempre`, `Bought! <b>${b.childNodes[1].textContent.trim()}</b> is yours forever`));
  }
  $$('#shop button').forEach((x) => x.classList.toggle('on', x === b));
  const img = $('#avImg');
  gsap.to(img, { scale: .6, rotation: -12, opacity: 0, duration: .25, onComplete: () => { img.src = `${AV}${b.dataset.img}.webp?v=2`; gsap.fromTo(img, { scale: .6, rotation: 12, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: .7, ease: 'back.out(2)' }); } });
}));
}
if ($('#finnySw')) {
/* ---------- 4 · Finny ---------- */
(() => {
  const A = {
    infl: ['Que las cosas cuestan más con el tiempo. Si un sándwich costaba 4 y ahora cuesta 4,20, con el mismo dinero compras menos.', 'Es la subida general de precios. Si la inflación es del 3 % y tu sueldo sube un 1 %, en realidad eres un poco más pobre que el año pasado.', 'Es el aumento sostenido del nivel general de precios, que reduce el poder adquisitivo. Se mide con el IPC y los bancos centrales la combaten subiendo los tipos de interés.'],
    div: ['Porque si a esa empresa le va mal, lo pierdes casi todo de golpe. Repartir es como no llevar todos los huevos en la misma cesta.', 'Si inviertes en varias empresas y sectores, una caída pesa menos. A eso se le llama diversificar: menos sustos, mismo objetivo.', 'Concentrar en un solo activo maximiza el riesgo específico. Diversificar entre activos poco correlacionados reduce la volatilidad de la cartera sin renunciar a la rentabilidad esperada.'],
    ret: ['Es una parte de tu sueldo que la empresa guarda para pagar impuestos por ti. Por eso cobras menos de lo que pone en el contrato.', 'Son los impuestos que la empresa adelanta al Estado cada mes. Dependen de lo que ganas y de tu situación, y se ajustan en la declaración anual.', 'Es un pago anticipado del impuesto sobre la renta que la empresa retiene sobre el salario, según la cuantía y las circunstancias personales; se regulariza en la declaración anual.'],
  };
  const A_EN = {
    infl: ['That things cost more over time. If a sandwich cost 4 and now costs 4.20, the same money buys you less.', 'It is the general rise in prices. If inflation is 3% and your salary goes up 1%, you are actually a bit poorer than last year.', 'It is the sustained increase in the general price level, which reduces purchasing power. It is measured with the consumer price index, and central banks fight it by raising interest rates.'],
    div: ['Because if that company does badly, you lose almost everything at once. Spreading it out is like not putting all your eggs in one basket.', 'If you invest in several companies and sectors, a fall hurts less. That is called diversifying: fewer scares, same goal.', 'Concentrating on a single asset maximises specific risk. Diversifying across weakly correlated assets lowers portfolio volatility without giving up expected return.'],
    ret: ['It is part of your salary that the company keeps to pay taxes for you. That is why you take home less than your contract says.', 'It is the tax the company pays to the government in advance each month. It depends on what you earn and your situation, and it is adjusted in your yearly tax return.', 'It is an advance payment of income tax that the employer withholds from wages, based on the amount and personal circumstances; it is settled in the annual return.'],
  };
  if (EN) Object.assign(A, A_EN);
  let lvl = 0;
  const msgs = $('#msgs');
  $$('#finnyLvl button').forEach((b, i) => b.addEventListener('click', () => { lvl = i; $$('#finnyLvl button').forEach((x) => x.classList.toggle('on', x === b)); }));
  $$('#pillsAi .chip').forEach((b) => b.addEventListener('click', () => {
    const me = document.createElement('div'); me.className = 'b me'; me.textContent = b.textContent; msgs.append(me);
    const ai = document.createElement('div'); ai.className = 'b ai typing'; msgs.append(ai);
    while (msgs.children.length > 4) msgs.firstChild.remove();
    gsap.from(me, { y: 20, opacity: 0, duration: .45, ease: 'expo.out' });
    const w = A[b.dataset.k][lvl].split(' '); let k = 0;
    const iv = setInterval(() => { ai.textContent += (k ? ' ' : '') + w[k++]; if (k >= w.length) { clearInterval(iv); ai.classList.remove('typing'); } }, 45);
  }));
  $('#finnySw').onclick = (e) => { const t = e.currentTarget; t.classList.toggle('off'); const off = t.classList.contains('off'); $('b', t).textContent = off ? tx('Finny desactivado en esta clase', 'Finny is off for this class') : tx('Finny activado en esta clase', 'Finny is on for this class'); $('#offcover').classList.toggle('on', off); };
})();

}
if ($('#devT')) {
/* ---------- 5 · profesor ---------- */
const STUD = [['Lucía', 'astronauta', 92, '18 / 20', tx('Hoy', 'Today'), tx('Nada, va genial', 'Nothing, doing great')], ['Marc', 'economista', 74, '14 / 20', tx('Hoy', 'Today'), tx('Impuestos', 'Taxes')], ['Aina', 'chica-basket', 61, '12 / 20', tx('Ayer', 'Yesterday'), tx('Regla 50/30/20', '50/30/20 rule')], ['Pablo', 'ceo', 18, '3 / 20', tx('Hace 6 días', '6 days ago'), tx('2 lecciones sin entrar', '2 lessons not opened')], ['Nora', 'moneda-base', 83, '16 / 20', tx('Hoy', 'Today'), tx('Presupuesto', 'Budgeting')], ['Hugo', 'astronauta', 39, '8 / 20', tx('Hace 2 días', '2 days ago'), tx('Interés compuesto', 'Compound interest')]];
let fichaN = '';
STUD.forEach((s) => {
  const r = document.createElement('div'); r.className = 'st'; r.tabIndex = 0;
  r.innerHTML = `<img src="${AV}${s[1]}.webp?v=2" alt=""><span>${s[0]}</span><span class="tr"><i class="${s[2] < 40 ? 'warn' : ''}" style="width:${s[2]}%"></i></span><span class="pc">${s[2]}${PC}</span>`;
  const open = () => { $$('.st').forEach((x) => x.classList.remove('sel')); r.classList.add('sel'); fichaN = s[0]; $('#fImg').src = `${AV}${s[1]}.webp?v=2`; $('#fName').textContent = s[0]; $('#fPct').textContent = s[2] + PC; $('#fOk').textContent = s[3]; $('#fLast').textContent = s[4]; $('#fHard').textContent = s[5]; $('#ficha').classList.add('open'); };
  r.onclick = open; r.onkeydown = (e) => e.key === 'Enter' && open(); $('#studs').append(r);
});
$('#fichaX').onclick = () => { $('#ficha').classList.remove('open'); $$('.st').forEach((x) => x.classList.remove('sel')); };
$('#skipL').onclick = () => toast($('#toastT'), tx(`Lección saltada para <b>${fichaN}</b>. Seguirá con la siguiente.`, `Lesson skipped for <b>${fichaN}</b>. They will move on to the next one.`));
$$('#devT .tg[data-k]').forEach((t) => t.addEventListener('click', () => { t.classList.toggle('off'); $(`.pv[data-k="${t.dataset.k}"]`).classList.toggle('hide', t.classList.contains('off')); }));
$('#solTg').classList.add('off');
$('#solTg').onclick = () => $('#solTg').classList.toggle('off');
const countQ = () => { const n = $$('#cks .ck.on').reduce((s, c) => s + +c.dataset.n, 0); const o = { v: +$('#qN').textContent }; gsap.to(o, { v: n, duration: .5, onUpdate: () => ($('#qN').textContent = Math.round(o.v)) }); };
$$('#cks .ck').forEach((c) => c.addEventListener('click', () => { c.classList.toggle('on'); countQ(); }));
$('#dl').onclick = () => { if (+$('#qN').textContent === 0) { toast($('#toastE'), tx('Elige al menos un módulo', 'Choose at least one module')); return; } gsap.fromTo('#docEl i', { scaleX: 0 }, { scaleX: 1, duration: .3, stagger: .12, ease: 'power2.out' }); gsap.fromTo('#docEl', { y: 10 }, { y: 0, duration: .6, ease: 'back.out(2)' }); setTimeout(() => toast($('#toastE'), tx(`<b>Examen_Presupuesto.docx</b> listo · ${$('#qN').textContent} preguntas${$('#solTg').classList.contains('off') ? '' : ' + soluciones'}`, `<b>Budgeting_Exam.docx</b> ready · ${$('#qN').textContent} questions${$('#solTg').classList.contains('off') ? '' : ' + answers'}`)), 900); };
let typed = false;
function typeMsg() {
  if (typed) return; typed = true;
  const subj = tx('Reto de la semana: tu primer presupuesto', 'Challenge of the week: your first budget'), body = tx('Hola a todos. Esta semana cada uno hará su primer presupuesto con la regla 50/30/20. El viernes lo comentamos en clase. ¡Ánimo!', 'Hi everyone. This week you will each make your first budget with the 50/30/20 rule. We will discuss it in class on Friday. Good luck!');
  let i = 0, j = 0;
  const a = setInterval(() => { $('#mSubj').textContent = subj.slice(0, ++i); if (i >= subj.length) { clearInterval(a); const b = setInterval(() => { $('#mBody').textContent = body.slice(0, ++j); if (j >= body.length) clearInterval(b); }, 18); } }, 28);
}
$('#mSend').onclick = () => {
  const s = $('#mSubj').textContent || tx('Mensaje a la clase', 'Message to the class');
  const it = document.createElement('div'); it.innerHTML = `${s}<small>${tx('Ahora · 25 alumnos', 'Now · 25 students')}</small>`; $('#sent').prepend(it);
  gsap.from(it, { x: -40, opacity: 0, duration: .6, ease: 'expo.out' });
  toast($('#toastM'), tx('Enviado a <b>Clase 4B</b> · 25 alumnos lo verán en su buzón', 'Sent to <b>Class 4B</b> · 25 students will see it in their inbox'));
  $('#mSubj').textContent = ''; $('#mBody').textContent = ''; typed = false; setTimeout(typeMsg, 2500);
};
const TABCOPY = tx(['<b>Seguimiento.</b> Quién avanza, quién se atasca y dónde. Pulsa un alumno para ver su ficha.', '<b>Intervención.</b> Tú decides qué ve tu clase. Apaga un interruptor y mira cómo cambia lo que verá el alumno.', '<b>Mensajes.</b> Escribe a toda la clase en un momento. Lo verán en su buzón.', '<b>Exámenes.</b> Elige módulos y descarga un examen en Word, con soluciones si quieres.'], ['<b>Tracking.</b> Who is moving ahead, who is stuck and where. Click a student to see their profile.', '<b>Control.</b> You decide what your class sees. Switch something off and watch how the student view changes.', '<b>Messages.</b> Write to the whole class in seconds. They will see it in their inbox.', '<b>Exams.</b> Pick modules and download an exam in Word, with answers if you want.']);
const tabs = $$('#tabsT button');
const tourT = makeTour({
  root: $('#devT'), steps: tabs, screens: $$('#devT .screen'), side: $$('#devT .side .sl'), auto: 8000,
  onShow: (i) => {
    $('#tabCopy').innerHTML = TABCOPY[i];
    if (i === 0) $$('#devT .cnt').forEach((c) => { const o = { v: 0 }; gsap.to(o, { v: +c.dataset.v, duration: 1.4, ease: 'expo.out', delay: .3, onUpdate: () => (c.textContent = Math.round(o.v)) }); });
    if (i === 0) gsap.fromTo('#studs .tr i', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.2, ease: 'expo.out', stagger: .06, delay: .3 });
    if (i === 2) setTimeout(typeMsg, 600);
  },
});
tabs.forEach((b, k) => b.addEventListener('click', () => tourT.show(k, true)));

}
if ($('#presets')) {
/* ---------- 6 · tu colegio ---------- */
(() => {
  const MODS = { vida: [tx('Vida adulta', 'Adult life'), '#0B3064', '#fff'], inv: [tx('Inversión', 'Investing'), '#5574A7', '#fff'], emp: [tx('Emprendimiento', 'Entrepreneurship'), '#F5C518', '#0B3064'], eco: [tx('Economía', 'Economics'), '#C8D0DD', '#0B3064'] };
  const st = { stage: 'eso', h: 2, mods: ['vida', 'inv', 'emp'] };
  const box = $('#cMods');
  Object.entries(MODS).forEach(([k, m]) => { const b = document.createElement('button'); b.className = 'mod'; b.dataset.k = k; b.innerHTML = `<i style="background:${m[1]}"></i>${m[0]}`; b.onclick = () => { if (b.classList.contains('lock')) return; st.mods = st.mods.includes(k) ? st.mods.filter((x) => x !== k) : [...st.mods, k]; if (!st.mods.length) st.mods = [k]; clearPreset(); build(); }; box.append(b); });
  const clearPreset = () => $$('#presets .preset').forEach((p) => p.classList.remove('on'));
  function sync() {
      $$('#cHours .chip').forEach((b) => b.classList.toggle('on', +b.dataset.v === st.h));
    if (!st.mods.length) st.mods = ['vida'];
    $$('#cMods .mod').forEach((b) => { const lock = false; b.classList.toggle('lock', lock); b.classList.toggle('off', !st.mods.includes(b.dataset.k)); b.title = lock ? 'Solo para los últimos cursos' : ''; });
  }
  function build() {
    sync();
    const w = $('#weeks'); w.innerHTML = '';
    for (let i = 1; i <= 12; i++) w.insertAdjacentHTML('beforeend', `<div class="wk">${tx('S', 'W')}${i}</div>`);
    const total = 12 * st.h, per = Math.floor(total / st.mods.length), seq = [];
    st.mods.forEach((m, i) => { const n = i === st.mods.length - 1 ? total - per * (st.mods.length - 1) : per; for (let k = 0; k < n; k++) seq.push(m); });
    const slots = [];
    for (let r = 0; r < st.h; r++) for (let c = 0; c < 12; c++) { const s = document.createElement('div'); s.className = 'slot'; s.innerHTML = '<i></i>'; w.append(s); slots.push({ s, c, r }); }
    const ord = slots.sort((a, b) => a.c - b.c || a.r - b.r);
    ord.forEach((o, k) => { const m = MODS[seq[k]], i = o.s.firstChild; i.style.background = m[1]; i.style.color = m[2]; if (k === 0 || seq[k - 1] !== seq[k]) i.textContent = m[0]; });
    gsap.to(ord.map((o) => o.s.firstChild), { scale: 1, opacity: 1, duration: .45, ease: 'back.out(2)', stagger: reduce ? 0 : .035 });
    $('#calS').textContent = tx(`${total} sesiones · ${st.mods.length} programa${st.mods.length > 1 ? 's' : ''}`, `${total} sessions · ${st.mods.length} programme${st.mods.length > 1 ? 's' : ''}`);
  }
  $$('#presets .preset').forEach((p) => p.addEventListener('click', () => { $$('#presets .preset').forEach((x) => x.classList.toggle('on', x === p)); st.h = +p.dataset.h; st.mods = p.dataset.m.split(','); build(); }));
  $$('#cHours .chip').forEach((b) => b.addEventListener('click', () => { st.h = +b.dataset.v; clearPreset(); build(); }));
  sync();
  ScrollTrigger.create({ trigger: '#colegio', start: 'top 60%', once: true, onEnter: build });
})();

}
if ($('#pillars')) {
/* ---------- 7 · confianza ---------- */
$$('#pillars .pillar').forEach((p) => p.addEventListener('click', () => p.classList.toggle('flip')));
gsap.from('#pillars .pillar', { y: 60, opacity: 0, duration: 1, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: '#pillars', start: 'top 85%' } });
ScrollTrigger.create({ trigger: '#pillars', start: 'top 60%', once: true, onEnter: () => { const p = $$('#pillars .pillar')[0]; setTimeout(() => p.classList.add('flip'), 600); setTimeout(() => p.classList.remove('flip'), 2600); } });

}
if ($('#tl')) {
/* ---------- 8 · empezar ---------- */
(() => {
  const st = $$('#tl .tstep'); let i = -1, t, auto = true;
  function go(k) { i = k; st.forEach((s, j) => { s.classList.toggle('on', j === k); s.classList.toggle('done', j < k); }); gsap.to('#tlLine', { scaleX: (k + .5) / st.length, duration: .8, ease: 'expo.out' }); }
  st.forEach((s, k) => s.addEventListener('click', () => { auto = false; clearInterval(t); go(k); }));
  visible($('#tl'), (on) => { clearInterval(t); if (on && auto) { if (i < 0) go(0); t = setInterval(() => go((i + 1) % st.length), 2600); } });
})();

}
if ($('#convo')) {
/* ---------- 9 · hablemos ---------- */
(() => {
  const steps = $$('#convo .cv-step'), bars = $$('#convo .stepbar i'), next = $('#cvNext'), back = $('#cvBack'); let s = 0;
  function go(k) { s = k; steps.forEach((x, j) => (x.hidden = j !== k)); bars.forEach((b, j) => b.classList.toggle('on', j <= Math.min(k, 2))); back.hidden = k === 0 || k === 3; next.hidden = k === 0 || k === 3; next.textContent = k === 2 ? tx('Enviar', 'Send') : tx('Continuar →', 'Continue →'); gsap.from(steps[k], { y: 16, opacity: 0, duration: .5, ease: 'expo.out' }); const inp = $('input', steps[k]); inp && setTimeout(() => inp.focus({ preventScroll: true }), 50); }
  $$('#convo .opts2 .chip').forEach((c) => c.addEventListener('click', () => { $$('#convo .opts2 .chip').forEach((x) => x.classList.toggle('on', x === c)); setTimeout(() => go(1), 250); }));
  /** Envía la solicitud (papel, colegio y email) y, si todo va bien, muestra el "¡Hecho!". */
  async function send() {
    const err = $('#cvErr'); if (err) err.hidden = true;
    next.disabled = true; next.textContent = tx('Enviando…', 'Sending…');
    const colegio = $('#cvSchool').value.trim(), rol = ($('#convo .opts2 .chip.on') || {}).textContent || '';
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ rol, colegio, email: $('#cvMail').value.trim(), idioma: EN ? 'en' : 'es', pagina: location.pathname, _subject: `Nueva solicitud de demo · ${colegio}` }) });
      if (!r.ok) throw new Error(r.status);
      go(3);
    } catch (e) { if (err) err.hidden = false; next.textContent = tx('Enviar', 'Send'); }
    next.disabled = false;
  }
  next.onclick = () => { const inp = $('input', steps[s]); if (inp && !inp.value.trim()) { gsap.fromTo(inp, { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1,.3)' }); inp.focus(); return; } if (s === 2) { if (!$('#cvMail').checkValidity()) { gsap.fromTo('#cvMail', { x: -8 }, { x: 0, duration: .5, ease: 'elastic.out(1,.3)' }); return; } send(); return; } go(s + 1); };
  back.onclick = () => go(s - 1);
  $$('#convo input').forEach((i) => i.addEventListener('keydown', (e) => e.key === 'Enter' && next.click()));
  $('#closeBg') && gsap.fromTo('#closeBg', { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#hablemos', start: 'top bottom', end: 'bottom top', scrub: true } });
})();

}
/* ---------- entradas y pie ---------- */
// Entradas cortas y tempranas: el contenido aparece en cuanto asoma, sin esperar. Durante la entrada se apagan
// las transiciones CSS del elemento, que si no frenan la animación (efecto "a cámara lenta").
const reveal = (targets, trigger, opts = {}) => gsap.from(targets, { y: 24, opacity: 0, duration: .6, ease: 'power3.out', ...opts,
  onStart: () => gsap.utils.toArray(targets).forEach((el) => (el.style.transition = 'none')),
  onComplete: () => gsap.utils.toArray(targets).forEach((el) => { el.style.transition = ''; gsap.set(el, { clearProps: 'transform' }); }),
  scrollTrigger: { trigger, start: 'top 95%', once: true } });
$$('section .h2, section .lead').forEach((el) => reveal(el, el));
['.payslip-game > *', '.tour > *', '.finny > *', '#devT', '.prog-ui > *', '.tstep', '.faq details', '.door', '.trust > div', '.prog-cards > *'].filter((sel) => $(sel)).forEach((sel) => reveal(sel, $(sel), { stagger: .05 }));
if ($('#bigword')) gsap.to('#bigword', { backgroundSize: '100% 100%', ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top 80%', end: 'bottom bottom', scrub: true } });


/* ---------- home: las tres puertas (cómo funciona) ---------- */
if ($('#doors')) {
  const doors = $$('#doors .door'); let cur = 0, auto = true, t;
  const loops = [
    () => gsap.timeline({ repeat: -1, repeatDelay: 1.2 }).add(() => $$('#mq .o').forEach((o) => o.classList.remove('ok'))).set('#mq .plus50', { opacity: 0, y: 0 }).to({}, { duration: 1 }).add(() => $('#mq .o:nth-of-type(2)').classList.add('ok')).fromTo('#mq .plus50', { opacity: 0, y: 6 }, { opacity: 1, y: -4, duration: .5, ease: 'back.out(3)' }).to({}, { duration: 1.6 }),
    () => gsap.timeline({ repeat: -1, repeatDelay: 1.2 }).fromTo('#ml .t i', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.out', stagger: .12 }).fromTo('#ml .al', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5 }, '+=.3').to({}, { duration: 1.8 }).to('#ml .al', { opacity: 0, duration: .3 }),
    () => { const cells = $$('#mc i'), cols = ['#0B3064', '#5574A7', '#F5C518']; return gsap.timeline({ repeat: -1, repeatDelay: 1 }).set(cells, { background: '#F4F6FA' }).to(cells, { background: (i) => cols[Math.floor((i % 12) / 4)], duration: .2, stagger: { each: .04, grid: [2, 12], axis: 'x' } }).to({}, { duration: 1.6 }); },
  ];
  const tl = [];
  function open(i, user) {
    if (user) { auto = false; clearInterval(t); }
    cur = i; doors.forEach((d, k) => d.classList.toggle('on', k === i));
    tl.forEach((x) => x && x.pause()); tl[i] = tl[i] || loops[i](); tl[i].restart();
  }
  doors.forEach((d, k) => { d.addEventListener('mouseenter', () => open(k, true)); d.addEventListener('click', (e) => { if (!d.classList.contains('on')) { e.preventDefault(); open(k, true); } }); d.addEventListener('focus', () => open(k, true)); });
  open(0);
  const movil = matchMedia('(max-width:960px)').matches;
  if (movil) loops.forEach((l, i) => (tl[i] = l()));
  // las mini-animaciones solo se mueven mientras se ven (fuera de pantalla gastan batería y CPU)
  visible($('#doors'), (on) => { clearInterval(t); if (on && auto) t = setInterval(() => open((cur + 1) % 3), 5200); tl.forEach((x, k) => x && (on && (movil || k === cur) ? x.play() : x.pause())); });
}


/* ---------- profesor: sistema híbrido ---------- */
if ($('#hy')) {
  const MODOS = [
    { who: 'Tú explicas en clase', board: 'El presupuesto, explicado a tu manera', tag: 'Vista del alumno', live: 'Tú ves los resultados de cada alumno al momento', off: ['t', 'v', 'f'],
      list: ['Das la clase como siempre, a tu manera', 'Ocultas teoría y vídeos con un clic', 'Tus alumnos hacen los retos en clase', 'Ves quién acierta y quién se atasca al momento'] },
    { who: 'Cada alumno a su ritmo', board: 'Finomik explica con píldoras de 3 minutos', tag: 'Vista del alumno', live: 'Tú sigues el progreso de toda la clase desde tu panel', off: [],
      list: ['La plataforma explica con vídeos, lecturas e infografías', 'Finny resuelve sus dudas a su nivel', 'Ideal para deberes, sustituciones o grupos que avanzan solos', 'Tú sigues su progreso y recibes alertas'] },
  ];
  const MODOS_EN = [
    { who: 'You teach in class', board: 'Budgeting, explained your way', tag: 'Student view', live: 'You see every student\'s results instantly', off: ['t', 'v', 'f'],
      list: ['You teach the class as always, your way', 'Hide theory and videos with one click', 'Your students do the challenges in class', 'See who gets it right and who gets stuck, instantly'] },
    { who: 'Each student at their own pace', board: 'Finomik explains with 3-minute lessons', tag: 'Student view', live: 'You follow the whole class\'s progress from your dashboard', off: [],
      list: ['The platform explains with videos, readings and infographics', 'Finny answers their questions at their level', 'Ideal for homework, cover lessons or groups that move ahead on their own', 'You follow their progress and get alerts'] },
  ];
  if (EN) MODOS.splice(0, 2, ...MODOS_EN);
  let m = -1, auto = true, t;
  function setM(i) {
    m = i; const M = MODOS[i];
    $$('.hy-mode').forEach((b, k) => b.classList.toggle('on', k === i));
    $('#hy').dataset.m = i;
    $('#hyWho').textContent = M.who; $('#hyBoardT').textContent = M.board; $('#hyLiveT').textContent = M.live;
    $$('.hy-b').forEach((b) => b.classList.toggle('off', M.off.includes(b.dataset.k)));
    $('#hyList').innerHTML = M.list.map((x) => `<li>${x}</li>`).join('');
    gsap.fromTo('#hyList li', { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: .5, ease: 'expo.out', stagger: .07 });
    gsap.fromTo('.hy-board', { y: -10, opacity: .4 }, { y: 0, opacity: 1, duration: .6, ease: 'expo.out' });
    gsap.fromTo('.hy-b:not(.off)', { scale: .97 }, { scale: 1, duration: .5, ease: 'back.out(2)', stagger: .05 });
  }
  $$('.hy-mode').forEach((b, k) => b.addEventListener('click', () => { auto = false; clearInterval(t); setM(k); }));
  setM(0);
  visible($('#hy'), (on) => { clearInterval(t); if (on && auto) t = setInterval(() => setM(1 - m), 4200); });
}

/* ---------- blog: filtros por categoría (las entradas ya vienen en la página) ---------- */
if ($('#blogFilters')) {
  const chips = $$('#blogFilters .chip'), posts = $$('#blogGrid .post');
  chips.forEach((c) => c.addEventListener('click', () => {
    chips.forEach((x) => x.classList.toggle('on', x === c));
    const vis = posts.filter((p) => { const ok = !c.dataset.c || p.dataset.c === c.dataset.c; p.hidden = !ok; return ok; });
    gsap.fromTo(vis, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'expo.out', stagger: .06 });
  }));
}
