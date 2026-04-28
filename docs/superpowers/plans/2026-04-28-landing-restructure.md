# Landing Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Añadir páginas `/colegios` y `/bancos` accesibles desde el navbar, mover el dashboard "Para ti" a Colegios, actualizar navbar y reordenar home para evitar secciones consecutivas del mismo tono.

**Architecture:** Dos nuevos componentes de página en `pages/`, el componente `InstitutionBenefits` de `App.tsx` se extrae a `Colegios.tsx`, el navbar se simplifica a Colegios · Bancos · Contacto, y se añade un bloque `SegmentSelector` en la home.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, motion/react, React Router, useI18n hook, WaveShape component, FadeInSection component.

**Spec:** `docs/superpowers/specs/2026-04-28-landing-restructure-design.md`

---

## Mapa de componentes existentes en App.tsx

Para evitar confusión entre el spec y el código real, este es el mapeo de nombres:

| Nombre en el spec | Componente real en App.tsx | Fondo |
|---|---|---|
| Hero | `<Hero />` | `#0B3064` (oscuro) |
| Stats / Problem | `<Problem />` | `bg-slate-50/70` (claro) |
| Mission | `<Mission />` | `bg-slate-100/80` (claro) |
| Features / Process | `<Process />` | `#114076` (oscuro) |
| Platforms | `<Platforms />` | `bg-white` |
| InstitutionBenefits ("Para ti") | `<InstitutionBenefits />` | `#0B3064` (oscuro) → SE ELIMINA DE HOME |
| Why Finomik | `<WhyFinomik />` | `bg-white` |
| SocialProof | `<SocialProof />` | `#f7f9fc` (claro) |

Orden nuevo en `<main>` tras los cambios:
```
Hero(dark) → Problem(light) → Mission(light) → Process(dark) → Platforms(white) → SegmentSelector(dark #114076) → WhyFinomik(white) → SocialProof(light)
```

---

## File Map

| Acción | Archivo | Qué cambia |
|--------|---------|------------|
| Modify | `App.tsx` | navItems, eliminar `<InstitutionBenefits />`, añadir `<SegmentSelector />`, reordenar secciones |
| Modify | `index.tsx` | Añadir rutas `/colegios` y `/bancos` |
| Create | `pages/Colegios.tsx` | Página completa para colegios (hero, programa, IA/ritmo, dashboard, certificados, CTA) |
| Create | `pages/Bancos.tsx` | Página completa para bancos (hero, problema, cómo funciona, beneficios, conceptos, relación, CTA) |

---

## Task 1: Actualizar el navbar en App.tsx

**Files:**
- Modify: `App.tsx` (líneas ~236–400: navItems, desktop nav labels, mobile nav labels)

### Contexto
Los `navItems` actuales son: `mission (#our-mission)`, `solutions (#our-solutions)`, `why (#why-finomik)`.
Deben reemplazarse por: `colegios (/colegios)`, `bancos (/bancos)`, `contact (/contact)`.
Las labels están definidas en tres lugares: el array `navItems` y las ternarias dentro del desktop nav y del mobile nav.

- [ ] **Paso 1: Actualizar el array navItems**

En `App.tsx`, localiza el array `navItems` (~línea 236) y reemplázalo:

```tsx
const navItems = [
  { key: 'colegios', href: '/colegios' },
  { key: 'bancos', href: '/bancos' },
  { key: 'contact', href: '/contact' },
];
```

- [ ] **Paso 2: Actualizar labels en el desktop nav**

Localiza la ternaria de `label` dentro del `.map` del desktop nav (~línea 280). Reemplaza con:

```tsx
const label =
  item.key === 'colegios'
    ? (lang === 'ca' ? 'Col·legis' : lang === 'es' ? 'Colegios' : 'Schools')
    : item.key === 'bancos'
      ? (lang === 'ca' ? 'Bancs' : lang === 'es' ? 'Bancos' : 'Banks')
      : (lang === 'ca' ? 'Contacte' : lang === 'es' ? 'Contacto' : 'Contact');
```

- [ ] **Paso 3: Actualizar labels en el mobile nav**

Localiza las dos ternarias dentro del mobile nav `.map` (~líneas 361–378). Reemplaza ambas con la misma lógica:

```tsx
{item.key === 'colegios'
  ? (lang === 'ca' ? 'Col\u00b7legis' : lang === 'es' ? 'Colegios' : 'Schools')
  : item.key === 'bancos'
    ? (lang === 'ca' ? 'Bancs' : lang === 'es' ? 'Bancos' : 'Banks')
    : (lang === 'ca' ? 'Contacte' : lang === 'es' ? 'Contacto' : 'Contact')}
```

- [ ] **Paso 4: Verificar en el navegador**

Abre `http://localhost:3000`. El navbar debe mostrar: Colegios · Bancos · Contacto + botón "Solicitar información". En mobile (resize a <1024px), el menú hamburguesa debe mostrar los mismos tres links.

- [ ] **Paso 5: Commit**

```bash
git add App.tsx
git commit -m "feat: update navbar — colegios, bancos, contacto"
```

---

## Task 2: Reordenar home — eliminar InstitutionBenefits y añadir SegmentSelector

**Files:**
- Modify: `App.tsx` (secciones del componente App principal + nuevo componente SegmentSelector)

### Contexto
Sección `InstitutionBenefits` (~línea 1449) es el "Para ti" con el dashboard del profesor. Se elimina de la home porque se mueve a Colegios.tsx.

Orden actual en `<main>`:
```
Hero → Problem → Mission → Process → Platforms → InstitutionBenefits → WhyFinomik → SocialProof
```

Fondos: Hero(dark) → Problem(light) → Mission(light) → Process(dark) → Platforms(white) → InstitutionBenefits(dark) → WhyFinomik(white) → SocialProof(light)

Orden nuevo (sin InstitutionBenefits, con SegmentSelector entre Platforms y WhyFinomik):
```
Hero → Problem → Mission → Process → Platforms → SegmentSelector → WhyFinomik → SocialProof
```

Fondos: dark → light → light → dark → white → **dark(`#114076`)** → white → light ✅

- [ ] **Paso 1: Crear el componente SegmentSelector**

Añade este componente en `App.tsx` justo antes del componente `WhyFinomik` (~línea 1539):

```tsx
const SegmentSelector = () => {
  const { lang } = useI18n();
  return (
    <section className="bg-[#114076] py-20 md:py-24 relative overflow-hidden">
      <WaveShape
        className="absolute top-0 w-full h-[35%] text-[#0B3064] z-0 transform rotate-180"
        opacity={1}
        mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
      />
      <WaveShape
        className="absolute bottom-0 left-0 w-full h-[35%] text-[#0B3064] z-0"
        opacity={1}
        mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
      />
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl text-center">
        <FadeInSection>
          <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-5">
            {lang === 'ca' ? 'Per a qui és' : lang === 'es' ? '\u00bfPara qui\u00e9n es?' : 'Who is it for?'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            {lang === 'ca'
              ? 'Finomik s\u2019adapta al teu entorn'
              : lang === 'es'
              ? 'Finomik se adapta a tu entorno'
              : 'Finomik adapts to your environment'}
          </h2>
          <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto">
            {lang === 'ca'
              ? 'Tant si ets un centre educatiu com una entitat financera, tenim una soluci\u00f3 pensada per a tu.'
              : lang === 'es'
              ? 'Tanto si eres un centro educativo como una entidad financiera, tenemos una soluci\u00f3n pensada para ti.'
              : 'Whether you\u2019re a school or a financial institution, we have a solution designed for you.'}
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link
              to="/colegios"
              className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl p-8 text-left transition-all duration-200"
            >
              <div className="text-3xl mb-4">🏫</div>
              <h3 className="text-xl font-black text-white mb-2">
                {lang === 'ca' ? 'Per a Col·legis' : lang === 'es' ? 'Para Colegios' : 'For Schools'}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {lang === 'ca'
                  ? 'Programa personalitzat per als teus alumnes. Tu tries els temes, nosaltres creem el cam\u00ed.'
                  : lang === 'es'
                  ? 'Programa personalizado para tus alumnos. T\u00fa eliges los temas, nosotros creamos el camino.'
                  : 'Personalised programme for your students. You choose the topics, we create the path.'}
              </p>
              <span className="inline-flex items-center gap-1 text-[#F5C518] font-bold text-sm group-hover:gap-2 transition-all">
                {lang === 'ca' ? 'Descobreix m\u00e9s' : lang === 'es' ? 'Descubre m\u00e1s' : 'Learn more'}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              to="/bancos"
              className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl p-8 text-left transition-all duration-200"
            >
              <div className="text-3xl mb-4">🏦</div>
              <h3 className="text-xl font-black text-white mb-2">
                {lang === 'ca' ? 'Per a Bancs' : lang === 'es' ? 'Para Bancos' : 'For Banks'}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {lang === 'ca'
                  ? 'Clients m\u00e9s educats, decisions m\u00e9s s\u00f2lides. Finomik integra l\u2019educaci\u00f3 financera al cor de la relaci\u00f3 banc-client.'
                  : lang === 'es'
                  ? 'Clientes mejor educados, decisiones m\u00e1s s\u00f3lidas. Finomik integra la educaci\u00f3n financiera en el centro de la relaci\u00f3n banco-cliente.'
                  : 'Better-educated clients, stronger decisions. Finomik brings financial education to the heart of the bank-client relationship.'}
              </p>
              <span className="inline-flex items-center gap-1 text-[#F5C518] font-bold text-sm group-hover:gap-2 transition-all">
                {lang === 'ca' ? 'Descobreix m\u00e9s' : lang === 'es' ? 'Descubre m\u00e1s' : 'Learn more'}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
```

- [ ] **Paso 2: Actualizar el orden de secciones en el componente App**

Localiza el bloque `<main>` en el componente `App` (~línea 1836). Reemplaza su contenido:

```tsx
<main>
  <Hero />
  <Problem />
  <Mission />
  <Process />
  <Platforms />
  <SegmentSelector />
  <WhyFinomik />
  <SocialProof />
</main>
```

(`InstitutionBenefits` se elimina de aquí — se moverá a Colegios.tsx en Task 3)

- [ ] **Paso 3: Verificar en el navegador**

Navega a `http://localhost:3000`. Debe verse: la sección "¿Para quién es?" con las dos tarjetas de Colegios y Bancos, sin el dashboard del profesor. Comprueba que no hay dos secciones blancas seguidas.

- [ ] **Paso 4: Commit**

```bash
git add App.tsx
git commit -m "feat: add SegmentSelector to home, remove InstitutionBenefits"
```

---

## Task 3: Crear pages/Colegios.tsx

**Files:**
- Create: `pages/Colegios.tsx`

### Contexto
Esta página incluye:
1. Header fijo reutilizando el de la home (importar `Header` de App.tsx — **NOTA:** `Header` no está exportado; la solución más simple es crear un header inline idéntico al de MoreInfo.tsx, con botón Volver y logo)
2. Todas las secciones descritas en el spec
3. El bloque del dashboard del profesor, copiado de `InstitutionBenefits` en `App.tsx` (~líneas 1083–1603)

Para el dashboard, copia el componente `InstitutionBenefitsPanel` (~línea 1083) y su sección contenedora `InstitutionBenefits` (~línea 1449) directamente en el archivo `Colegios.tsx`.

- [ ] **Paso 1: Crear el archivo con estructura base + header**

Crea `pages/Colegios.tsx` con el siguiente esqueleto que incluye el header fijo (idéntico al de `Bancos.tsx`):

```tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, Brain, BookOpen, CheckCircle2, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useI18n } from '../i18n';
// Copiar WaveShape y FadeInSection desde App.tsx al inicio del archivo (ver Paso 2)

export default function Colegios() {
  const { lang } = useI18n();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <SeoHead
        title={l === 'es' ? 'Finomik para Colegios | Educación financiera para jóvenes' : l === 'ca' ? 'Finomik per a Col·legis | Educació financera per a joves' : 'Finomik for Schools | Financial education for young people'}
        description={l === 'es' ? 'Programa de educación financiera personalizado para colegios. Los alumnos desarrollan habilidades financieras reales con IA y seguimiento del profesor.' : 'Personalised financial education programme for schools.'}
        path="/colegios"
        lang={lang}
      />
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#E8EDF5] z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#0B3064] font-semibold hover:text-[#5574A7] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            {l === 'ca' ? 'Inici' : l === 'es' ? 'Inicio' : 'Home'}
          </Link>
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#5574A7]">Finomik</span>
          <Link to="/more-info" className="inline-flex items-center gap-1 bg-[#F5C518] text-[#0B3064] font-extrabold px-4 py-2 rounded-lg text-xs hover:bg-yellow-400 transition-colors">
            {l === 'ca' ? 'Sol\u00b7licitar informaci\u00f3' : l === 'es' ? 'Solicitar informaci\u00f3n' : 'Request info'}
          </Link>
        </div>
      </header>

      <main className="pt-16">
        {/* secciones a continuación */}
      </main>
    </div>
  );
}
```

- [ ] **Paso 2: Copiar WaveShape y FadeInSection**

Al inicio de `pages/Colegios.tsx` (después de los imports), copia los componentes `WaveShape` y `FadeInSection` desde `App.tsx`. Son autocontenidos y no tienen dependencias externas. También copia `AnimatedNumber` si lo necesita el dashboard.

- [ ] **Paso 3: Implementar la sección Hero**

```tsx
{/* HERO */}
<section className="min-h-[70vh] flex items-center bg-[#0B3064] relative overflow-hidden pt-24 pb-20">
  <WaveShape
    className="absolute bottom-0 left-0 w-full h-[35%] text-[#114076] z-0"
    opacity={1}
    mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
  />
  <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
    <FadeInSection forceVisible>
      <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-6">
        {l === 'ca' ? 'Finomik per a Col\u00b7legis' : l === 'es' ? 'Finomik para Colegios' : 'Finomik for Schools'}
      </span>
      <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-6 max-w-3xl">
        {l === 'ca'
          ? "L\u2019educaci\u00f3 financera que els j\u00f2vens necessiten"
          : l === 'es'
          ? 'La educaci\u00f3n financiera que los j\u00f3venes necesitan'
          : 'The financial education young people need'}
      </h1>
      <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
        {l === 'ca'
          ? 'Un programa adaptat a cada centre, dissenyat perqu\u00e8 els teus alumnes desenvolupin habilitats financeres reals des del primer dia.'
          : l === 'es'
          ? 'Un programa adaptado a cada colegio, dise\u00f1ado para que tus alumnos desarrollen habilidades financieras reales desde el primer d\u00eda.'
          : 'A programme adapted to each school, designed so your students develop real financial skills from day one.'}
      </p>
      <Link
        to="/more-info"
        className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-8 py-4 rounded-xl text-base hover:bg-yellow-400 transition-colors"
      >
        {l === 'ca' ? 'Sol\u00b7licitar informaci\u00f3' : l === 'es' ? 'Solicitar informaci\u00f3n' : 'Request information'}
        <ChevronRight className="w-5 h-5" />
      </Link>
    </FadeInSection>
  </div>
</section>
```

- [ ] **Paso 4: Implementar sección "El programa es tuyo"**

```tsx
{/* EL PROGRAMA ES TUYO */}
<section className="py-20 md:py-24 bg-white">
  <div className="container mx-auto px-6 md:px-12 max-w-5xl">
    <FadeInSection>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
            {l === 'ca' ? 'Personalitzaci\u00f3' : l === 'es' ? 'Personalizaci\u00f3n' : 'Customisation'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0B3064] mb-5">
            {l === 'ca' ? 'El programa \u00e9s teu' : l === 'es' ? 'El programa es tuyo' : 'The programme is yours'}
          </h2>
          <p className="text-[#3C4C67] text-lg leading-relaxed mb-8">
            {l === 'ca'
              ? 'Cada centre t\u00e9 necessitats diferents. A Finomik, el colegio escoge los temas en los que quiere formar a sus alumnos y nosotros creamos el programa.'
              : l === 'es'
              ? 'Cada colegio tiene necesidades distintas. En Finomik, el colegio elige los temas en los que quiere formar a sus alumnos y nosotros creamos el programa personalizado.'
              : 'Every school has different needs. At Finomik, the school chooses the topics it wants to teach and we build the personalised programme.'}
          </p>
          <ul className="space-y-4">
            {[
              {
                es: 'T\u00fa eliges los temas financieros que importan a tu comunidad educativa',
                en: 'You choose the financial topics that matter to your school community',
                ca: 'Tu tries els temes financers que importen a la teva comunitat educativa',
              },
              {
                es: 'El programa se adapta al n\u00famero de alumnos y a los tiempos del centro',
                en: 'The programme adapts to your student numbers and school schedule',
                ca: 'El programa s\u2019adapta al nombre d\u2019alumnes i als temps del centre',
              },
              {
                es: 'Contenido progresivo: de conceptos b\u00e1sicos a habilidades aplicadas',
                en: 'Progressive content: from basic concepts to applied skills',
                ca: 'Contingut progressiu: de conceptes b\u00e0sics a habilitats aplicades',
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5C518] flex-shrink-0 mt-0.5" />
                <span className="text-[#3C4C67] leading-relaxed">{item[l]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#f0f5fc] rounded-2xl p-8 border border-[#E8EDF5]">
          <p className="text-xs font-bold tracking-widest uppercase text-[#8F9EB7] mb-5">
            {l === 'ca' ? 'Exemple de programa' : l === 'es' ? 'Ejemplo de programa' : 'Programme example'}
          </p>
          {[
            { icon: '💰', label: { es: 'Presupuesto personal', en: 'Personal budgeting', ca: 'Pressupost personal' } },
            { icon: '🏦', label: { es: 'Ahorro e inversi\u00f3n', en: 'Saving & investing', ca: 'Estalvi i inversi\u00f3' } },
            { icon: '💳', label: { es: 'Deuda y cr\u00e9dito', en: 'Debt & credit', ca: 'Deute i cr\u00e8dit' } },
            { icon: '📊', label: { es: 'Mercados financieros', en: 'Financial markets', ca: 'Mercats financers' } },
            { icon: '🛡️', label: { es: 'Seguros y planificaci\u00f3n', en: 'Insurance & planning', ca: 'Assegurances i planificaci\u00f3' } },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-[#E8EDF5] last:border-0">
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold text-[#0B3064] text-sm">{item.label[l]}</span>
              <CheckCircle2 className="w-4 h-4 text-[#5574A7] ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  </div>
</section>
```

- [ ] **Paso 5: Implementar sección "Un camino financiero para cada alumno" (IA + ritmo)**

```tsx
{/* UN CAMINO PARA CADA ALUMNO */}
<section className="py-20 md:py-24 bg-[#114076] relative overflow-hidden">
  <WaveShape
    className="absolute top-0 w-full h-[35%] text-[#114076] z-0 transform rotate-180"
    opacity={1}
    mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
  />
  <WaveShape
    className="absolute bottom-0 left-0 w-full h-[35%] text-[#114076] z-0"
    opacity={1}
    mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
  />
  <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
    <FadeInSection>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-5">
            {l === 'ca' ? 'Intel\u00b7lig\u00e8ncia Artificial' : l === 'es' ? 'Inteligencia Artificial' : 'Artificial Intelligence'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
            {l === 'ca'
              ? 'Un cam\u00ed financer per a cada alumne'
              : l === 'es'
              ? 'Un camino financiero para cada alumno'
              : 'A financial path for every student'}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            {l === 'ca'
              ? 'La IA adapta el ritme i la dificultat de cada m\u00f2dul a l\u2019alumne. Cada un avan\u00e7a al seu ritme, per\u00f2 tots acaben amb el mateix nivell de coneixements i habilitats.'
              : l === 'es'
              ? 'La IA adapta el ritmo y la dificultad de cada m\u00f3dulo al alumno. Cada uno avanza a su ritmo, pero todos acaban con el mismo nivel de conocimientos y habilidades.'
              : 'AI adapts the pace and difficulty of each module to the student. Each one progresses at their own pace, but everyone finishes with the same level of knowledge and skills.'}
          </p>
          <div className="bg-white/10 rounded-xl p-5 border border-white/20">
            <p className="text-[#F5C518] font-bold text-sm mb-2">
              {l === 'ca' ? '\u00d1 Important' : l === 'es' ? '\u00d1 Importante' : '\u00d1 Important'}
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              {l === 'ca'
                ? 'Tots els alumnes, independentment del seu ritme, arriben al mateix nivell de compet\u00e8ncia financera al final del programa.'
                : l === 'es'
                ? 'Todos los alumnos, independientemente de su ritmo, llegan al mismo nivel de competencia financiera al final del programa.'
                : 'All students, regardless of their pace, reach the same level of financial competency by the end of the programme.'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Brain className="w-6 h-6" />, title: { es: 'Personalizaci\u00f3n con IA', en: 'AI personalisation', ca: 'Personalitzaci\u00f3 amb IA' }, desc: { es: 'El algoritmo ajusta el contenido a las fortalezas y debilidades de cada alumno', en: 'The algorithm adjusts content to each student\'s strengths and weaknesses', ca: 'L\u2019algorisme ajusta el contingut als punts forts i febles de cada alumne' } },
            { icon: <TrendingUp className="w-6 h-6" />, title: { es: 'Progreso visible', en: 'Visible progress', ca: 'Progr\u00e9s visible' }, desc: { es: 'Cada alumno ve c\u00f3mo avanza hacia sus objetivos', en: 'Every student sees how they\'re progressing towards their goals', ca: 'Cada alumne veu com avan\u00e7a cap als seus objectius' } },
            { icon: <AlertCircle className="w-6 h-6" />, title: { es: 'Detecci\u00f3n temprana', en: 'Early detection', ca: 'Detecci\u00f3 primerenca' }, desc: { es: 'El sistema identifica alumnos que necesitan m\u00e1s apoyo antes de que se queden atr\u00e1s', en: 'The system identifies students who need more support before they fall behind', ca: 'El sistema identifica alumnes que necessiten m\u00e9s suport abans que s\u2019enrereixin' } },
            { icon: <BookOpen className="w-6 h-6" />, title: { es: 'Mismos resultados', en: 'Same outcomes', ca: 'Mateixos resultats' }, desc: { es: 'Ritmos distintos, mismo destino: todos dominan las habilidades financieras clave', en: 'Different paces, same destination: everyone masters key financial skills', ca: 'Ritmes diferents, mateix dest\u00ed: tots dominen les habilitats financeres clau' } },
          ].map((item, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-5">
              <div className="text-[#F5C518] mb-3">{item.icon}</div>
              <h4 className="font-black text-white text-sm mb-1">{item.title[l]}</h4>
              <p className="text-white/60 text-xs leading-relaxed">{item.desc[l]}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeInSection>
  </div>
</section>
```

- [ ] **Paso 6: Copiar el bloque del dashboard del profesor**

Desde `App.tsx`, copia el componente `InstitutionBenefitsPanel` (líneas ~1083–1447) y la sección `InstitutionBenefits` (líneas ~1449–1537) directamente en `Colegios.tsx`, adaptando:
- El título de la sección: "Tú tienes el control" / "Tu tens el control" / "You're in control"
- El badge "Para ti" → "Para el profesor" / "Per al professor" / "For teachers"
- Mantener toda la simulación del dashboard tal cual está

- [ ] **Paso 7: Implementar sección "Certificados"**

```tsx
{/* CERTIFICADOS */}
<section className="py-20 md:py-24 bg-[#114076] relative overflow-hidden">
  <WaveShape
    className="absolute top-0 w-full h-[35%] text-[#0B3064] z-0 transform rotate-180"
    opacity={1}
    mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
  />
  <WaveShape
    className="absolute bottom-0 left-0 w-full h-[35%] text-[#0B3064] z-0"
    opacity={1}
    mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
  />
  <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-3xl text-center">
    <FadeInSection>
      <div className="w-16 h-16 rounded-2xl bg-[#F5C518] flex items-center justify-center mx-auto mb-6">
        <Award className="w-8 h-8 text-[#0B3064]" />
      </div>
      <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
        {l === 'ca'
          ? 'Cada alumne acaba amb un certificat'
          : l === 'es'
          ? 'Cada alumno termina con un certificado'
          : 'Every student finishes with a certificate'}
      </h2>
      <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto">
        {l === 'ca'
          ? 'En completar el programa, cada alumne rep un certificat que acredita les habilitats financeres adquirides. Un reconeixement real del seu treball.'
          : l === 'es'
          ? 'Al completar el programa, cada alumno recibe un certificado que acredita las habilidades financieras adquiridas. Un reconocimiento real de su esfuerzo.'
          : 'On completing the programme, every student receives a certificate recognising the financial skills they have acquired. Real recognition for real work.'}
      </p>
    </FadeInSection>
  </div>
</section>
```

- [ ] **Paso 8: Implementar CTA final**

```tsx
{/* CTA FINAL */}
<section className="py-20 md:py-24 bg-white">
  <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
    <FadeInSection>
      <h2 className="text-3xl md:text-4xl font-black text-[#0B3064] mb-5">
        {l === 'ca'
          ? 'Porta Finomik al teu centre'
          : l === 'es'
          ? 'Lleva Finomik a tu colegio'
          : 'Bring Finomik to your school'}
      </h2>
      <p className="text-[#3C4C67] text-lg leading-relaxed mb-8 max-w-lg mx-auto">
        {l === 'ca'
          ? 'Explica\'ns la situaci\u00f3 del teu centre i crearem junts el programa que els teus alumnes necessiten.'
          : l === 'es'
          ? 'Cu\u00e9ntanos la situaci\u00f3n de tu colegio y crearemos juntos el programa que tus alumnos necesitan.'
          : 'Tell us about your school and we\u2019ll build the programme your students need together.'}
      </p>
      <Link
        to="/more-info"
        className="inline-flex items-center gap-2 bg-[#0B3064] text-white font-extrabold px-8 py-4 rounded-xl text-base hover:bg-[#114076] transition-colors"
      >
        {l === 'ca' ? 'Sol\u00b7licitar informaci\u00f3' : l === 'es' ? 'Solicitar informaci\u00f3n' : 'Request information'}
        <ChevronRight className="w-5 h-5" />
      </Link>
    </FadeInSection>
  </div>
</section>
```

- [ ] **Paso 9: Verificar en el navegador**

Navega a `http://localhost:3000/colegios`. Debe verse: hero oscuro → programa personalizado → sección IA → dashboard del profesor → certificados → CTA. Comprobar en ES, EN, CA.

- [ ] **Paso 10: Commit**

```bash
git add pages/Colegios.tsx
git commit -m "feat: add /colegios page with all sections and teacher dashboard"
```

---

## Task 4: Crear pages/Bancos.tsx

**Files:**
- Create: `pages/Bancos.tsx`

Misma estructura que Colegios.tsx: imports, WaveShape, FadeInSection copiados, scroll-to-top, hook useI18n.

- [ ] **Paso 1: Crear el archivo con hero**

```tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Shield, BarChart3, Lightbulb, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useI18n } from '../i18n';
// Copiar WaveShape y FadeInSection desde App.tsx

export default function Bancos() {
  const { lang } = useI18n();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <SeoHead
        title={l === 'es' ? 'Finomik para Bancos | Educación financiera para clientes bancarios' : l === 'ca' ? 'Finomik per a Bancs | Educació financera per a clients bancaris' : 'Finomik for Banks | Financial education for banking clients'}
        description={l === 'es' ? 'Finomik conecta a los bancos con sus clientes a través de la educación financiera. Clientes más educados, decisiones más sólidas, mayor conversión.' : 'Finomik connects banks with their clients through financial education.'}
        path="/bancos"
        lang={lang}
      />
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#E8EDF5] z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#0B3064] font-semibold hover:text-[#5574A7] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            {l === 'ca' ? 'Inici' : l === 'es' ? 'Inicio' : 'Home'}
          </Link>
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#5574A7]">Finomik</span>
          <Link to="/more-info" className="inline-flex items-center gap-1 bg-[#F5C518] text-[#0B3064] font-extrabold px-4 py-2 rounded-lg text-xs hover:bg-yellow-400 transition-colors">
            {l === 'ca' ? 'Sol\u00b7licitar informaci\u00f3' : l === 'es' ? 'Solicitar informaci\u00f3n' : 'Request info'}
          </Link>
        </div>
      </header>

      <main className="pt-16">
        {/* HERO */}
        <section className="min-h-[70vh] flex items-center bg-[#0B3064] relative overflow-hidden py-24">
          <WaveShape
            className="absolute bottom-0 left-0 w-full h-[35%] text-[#114076] z-0"
            opacity={1}
            mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
          />
          <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection forceVisible>
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-6">
                {l === 'ca' ? 'Finomik per a Bancs' : l === 'es' ? 'Finomik para Bancos' : 'Finomik for Banks'}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-6 max-w-4xl">
                {l === 'ca'
                  ? 'Clients millor educats, decisions financeres m\u00e9s s\u00f2lides'
                  : l === 'es'
                  ? 'Clientes mejor educados, decisiones financieras m\u00e1s s\u00f3lidas'
                  : 'Better-educated clients, stronger financial decisions'}
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">
                {l === 'ca'
                  ? 'Finomik converteix conceptes com renda fixa, renda variable o diversificaci\u00f3 en comprensi\u00f3 real i aplicable, permetent que els clients arribin a les teves solucions amb m\u00e9s criteri i m\u00e9s seguretat en les seves decisions.'
                  : l === 'es'
                  ? 'Finomik convierte conceptos como renta fija, renta variable o diversificaci\u00f3n en entendimiento real y aplicable, permitiendo que los clientes lleguen a tus soluciones con mayor criterio y mayor seguridad en sus decisiones.'
                  : 'Finomik turns concepts such as fixed income, variable income or diversification into real, applicable understanding, allowing clients to approach your solutions with greater clarity and confidence.'}
              </p>
              <Link
                to="/more-info"
                className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-8 py-4 rounded-xl text-base hover:bg-yellow-400 transition-colors"
              >
                {l === 'ca' ? 'Sol\u00b7licitar reuni\u00f3' : l === 'es' ? 'Solicitar reuni\u00f3n' : 'Request a meeting'}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </FadeInSection>
          </div>
        </section>
```

- [ ] **Paso 2: Implementar sección "El problema"**

```tsx
        {/* EL PROBLEMA */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                    {l === 'ca' ? 'El repte' : l === 'es' ? 'El reto' : 'The challenge'}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-[#0B3064] mb-5">
                    {l === 'ca'
                      ? 'La manca d\u2019educaci\u00f3 financera genera fricci\u00f3'
                      : l === 'es'
                      ? 'La falta de educaci\u00f3n financiera genera fricci\u00f3n'
                      : 'Lack of financial education creates friction'}
                  </h2>
                  <p className="text-[#3C4C67] text-lg leading-relaxed mb-6">
                    {l === 'ca'
                      ? 'Molts clients no tenen els coneixements financers suficients per accedir amb seguretat a certs productes del banc. Aquesta manca de comprensi\u00f3 genera inseguretat, rebuig i oportunitats perdudes.'
                      : l === 'es'
                      ? 'Muchos clientes no tienen los conocimientos financieros suficientes para acceder con seguridad a ciertos productos del banco. Esta falta de comprensi\u00f3n genera inseguridad, rechazo y oportunidades perdidas.'
                      : 'Many clients lack the financial knowledge to confidently access certain banking products. This gap in understanding creates insecurity, rejection and missed opportunities.'}
                  </p>
                  <p className="text-[#3C4C67] text-lg leading-relaxed">
                    {l === 'ca'
                      ? 'Finomik ho canvia: educa el client dins del propi ecosistema del banc, de manera que arriba a les decisions amb m\u00e9s claredat i m\u00e9s confian\u00e7a.'
                      : l === 'es'
                      ? 'Finomik lo cambia: educa al cliente dentro del propio ecosistema del banco, de manera que llega a las decisiones con m\u00e1s claridad y m\u00e1s confianza.'
                      : 'Finomik changes this: it educates the client within the bank\'s own ecosystem, so they arrive at decisions with greater clarity and confidence.'}
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      label: { es: 'Sin educaci\u00f3n financiera', en: 'Without financial education', ca: 'Sense educaci\u00f3 financera' },
                      items: {
                        es: ['Productos complejos generan rechazo', 'Decisiones basadas en miedo, no en criterio', 'Relaci\u00f3n transaccional y distante'],
                        en: ['Complex products trigger rejection', 'Decisions driven by fear, not judgement', 'Transactional and distant relationship'],
                        ca: ['Productes complexos generen rebuig', 'Decisions basades en la por, no en el criteri', 'Relaci\u00f3 transaccional i distant'],
                      },
                      negative: true,
                    },
                    {
                      label: { es: 'Con Finomik', en: 'With Finomik', ca: 'Amb Finomik' },
                      items: {
                        es: ['El cliente entiende los productos que le ofrecen', 'Decisions m\u00e1s seguras y mejor fundamentadas', 'El banco como aliado, no solo como proveedor'],
                        en: ['The client understands the products on offer', 'Safer, better-grounded decisions', 'The bank as an ally, not just a provider'],
                        ca: ['El client ent\u00e9n els productes que se li ofereixen', 'Decisions m\u00e9s segures i ben fonamentades', 'El banc com a aliat, no nom\u00e9s com a prov\u00e8idor'],
                      },
                      negative: false,
                    },
                  ].map((block, i) => (
                    <div key={i} className={`rounded-xl p-5 ${block.negative ? 'bg-slate-50 border border-slate-200' : 'bg-[#EEF2FB] border border-[#C8D0DD]'}`}>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${block.negative ? 'text-[#8F9EB7]' : 'text-[#5574A7]'}`}>
                        {block.label[l]}
                      </p>
                      <ul className="space-y-2">
                        {block.items[l].map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#3C4C67]">
                            <span className={block.negative ? 'text-slate-400' : 'text-[#5574A7]'}>{block.negative ? '✕' : '✓'}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
```

- [ ] **Paso 3: Implementar sección "Cómo funciona"**

```tsx
        {/* CÓMO FUNCIONA */}
        <section className="py-20 md:py-24 bg-[#0B3064] relative overflow-hidden">
          <WaveShape className="absolute top-0 w-full h-[35%] text-[#114076] z-0 transform rotate-180" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
          <WaveShape className="absolute bottom-0 left-0 w-full h-[35%] text-[#114076] z-0" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
          <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-5">
                  {l === 'ca' ? 'Com funciona' : l === 'es' ? 'C\u00f3mo funciona' : 'How it works'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  {l === 'ca' ? 'Del desconeixement a la confian\u00e7a' : l === 'es' ? 'Del desconocimiento a la confianza' : 'From the unknown to confidence'}
                </h2>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { num: '01', title: { es: 'Integraci\u00f3n', en: 'Integration', ca: 'Integraci\u00f3' }, desc: { es: 'El banco integra Finomik en su ecosistema digital', en: 'The bank integrates Finomik into its digital ecosystem', ca: 'El banc integra Finomik al seu ecosistema digital' } },
                  { num: '02', title: { es: 'Aprendizaje', en: 'Learning', ca: 'Aprenentatge' }, desc: { es: 'El cliente aprende conceptos financieros en m\u00f3dulos cortos e interactivos', en: 'The client learns financial concepts through short, interactive modules', ca: 'El client aprèn conceptes financers en m\u00f2duls curts i interactius' } },
                  { num: '03', title: { es: 'Comprensi\u00f3n', en: 'Understanding', ca: 'Comprensi\u00f3' }, desc: { es: 'Renta fija, diversificaci\u00f3n, riesgo\u2026 dejan de ser abstractos y se entienden en contexto', en: 'Fixed income, diversification, risk\u2026 stop being abstract and are understood in context', ca: 'Renda fixa, diversificaci\u00f3, risc\u2026 deixen de ser abstractes i s\u2019entenen en context' } },
                  { num: '04', title: { es: 'Decisi\u00f3n', en: 'Decision', ca: 'Decisi\u00f3' }, desc: { es: 'El cliente llega a las propuestas del banco con m\u00e1s criterio, menos miedo y mayor seguridad', en: 'The client approaches the bank\'s proposals with greater clarity, less fear and more confidence', ca: 'El client arriba a les propostes del banc amb m\u00e9s criteri, menys por i m\u00e9s seguretat' } },
                ].map((step, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-6">
                    <p className="text-[#F5C518] font-black text-3xl mb-3">{step.num}</p>
                    <h4 className="font-black text-white text-base mb-2">{step.title[l]}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{step.desc[l]}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>
```

- [ ] **Paso 4: Implementar sección "Beneficios para el banco"**

```tsx
        {/* BENEFICIOS */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                  {l === 'ca' ? 'Per al banc' : l === 'es' ? 'Para el banco' : 'For the bank'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0B3064]">
                  {l === 'ca' ? 'Una relaci\u00f3 que evoluciona' : l === 'es' ? 'Una relaci\u00f3n que evoluciona' : 'A relationship that evolves'}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: { es: 'M\u00e1s relevancia y engagement', en: 'More relevance and engagement', ca: 'M\u00e9s relev\u00e0ncia i engagement' },
                    desc: { es: 'El banco deja de estar presente solo en momentos transaccionales y se convierte en parte del d\u00eda a d\u00eda financiero del cliente.', en: 'The bank stops being present only in transactional moments and becomes part of the client\'s daily financial life.', ca: 'El banc deixa d\u2019estar present nom\u00e9s en moments transaccionals i es converteix en part de la vida financera di\u00e0ria del client.' },
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: { es: 'Mejor conversi\u00f3n en productos', en: 'Better product conversion', ca: 'Millor conversi\u00f3 en productes' },
                    desc: { es: 'Clientes que entienden el ahorro, la inversi\u00f3n y la planificaci\u00f3n financiera llegan con m\u00e1s seguridad a las propuestas del banco y toman decisiones con menos fricci\u00f3n.', en: 'Clients who understand saving, investing and financial planning approach the bank\'s proposals with greater confidence and make decisions with less friction.', ca: 'Clients que entenen l\u2019estalvi, la inversi\u00f3 i la planificaci\u00f3 financera arriben amb m\u00e9s seguretat a les propostes del banc.' },
                  },
                  {
                    icon: <BarChart3 className="w-6 h-6" />,
                    title: { es: 'Visi\u00f3n del comportamiento financiero', en: 'Financial behaviour insight', ca: 'Visi\u00f3 del comportament financer' },
                    desc: { es: 'El banco gana visibilidad sobre el nivel de comprensi\u00f3n y los intereses financieros de sus clientes, lo que permite anticiparse mejor a sus necesidades.', en: 'The bank gains visibility into its clients\' level of understanding and financial interests, enabling better anticipation of their needs.', ca: 'El banc guanya visibilitat sobre el nivell de comprensi\u00f3 i els interessos financers dels seus clients.' },
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-[#f0f5fc] rounded-2xl p-7 border border-[#E8EDF5]">
                    <div className="w-10 h-10 rounded-xl bg-[#0B3064] flex items-center justify-center mb-4 text-[#F5C518]">
                      {item.icon}
                    </div>
                    <h3 className="font-black text-[#0B3064] text-lg mb-3">{item.title[l]}</h3>
                    <p className="text-[#3C4C67] text-sm leading-relaxed">{item.desc[l]}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>
```

- [ ] **Paso 5: Implementar sección "Conceptos que dejan de dar miedo"**

```tsx
        {/* CONCEPTOS */}
        <section className="py-20 md:py-24 bg-[#114076] relative overflow-hidden">
          <WaveShape className="absolute top-0 w-full h-[35%] text-[#0B3064] z-0 transform rotate-180" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
          <WaveShape className="absolute bottom-0 left-0 w-full h-[35%] text-[#0B3064] z-0" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
          <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-5">
                    {l === 'ca' ? 'Educaci\u00f3 en context' : l === 'es' ? 'Educaci\u00f3n en contexto' : 'Education in context'}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
                    {l === 'ca'
                      ? 'Conceptes que deixen de fer por'
                      : l === 'es'
                      ? 'Conceptos que dejan de dar miedo'
                      : 'Concepts that stop being scary'}
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-6">
                    {l === 'ca'
                      ? 'Renda fixa, renda variable, diversificaci\u00f3, gesti\u00f3 del risc\u2026 deixen de ser idees abstractes i s\u2019entenen en context. El client arriba amb menys por i m\u00e9s confian\u00e7a a l\u2019hora de prendre decisions.'
                      : l === 'es'
                      ? 'Renta fija, renta variable, diversificaci\u00f3n, gesti\u00f3n del riesgo\u2026 dejan de ser ideas abstractas y se entienden en contexto. El cliente llega con menos miedo y mayor confianza a la hora de tomar decisiones.'
                      : 'Fixed income, variable income, diversification, risk management\u2026 stop being abstract ideas and are understood in context. The client arrives with less fear and greater confidence when making decisions.'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { es: 'Renta fija', en: 'Fixed income', ca: 'Renda fixa' },
                    { es: 'Renta variable', en: 'Variable income', ca: 'Renda variable' },
                    { es: 'Diversificaci\u00f3n', en: 'Diversification', ca: 'Diversificaci\u00f3' },
                    { es: 'Gesti\u00f3n del riesgo', en: 'Risk management', ca: 'Gesti\u00f3 del risc' },
                    { es: 'Ahorro a largo plazo', en: 'Long-term saving', ca: 'Estalvi a llarg termini' },
                    { es: 'Planificaci\u00f3n financiera', en: 'Financial planning', ca: 'Planificaci\u00f3 financera' },
                  ].map((concept, i) => (
                    <div key={i} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[#F5C518] flex-shrink-0" />
                      <span className="text-white text-sm font-semibold">{concept[l]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>
```

- [ ] **Paso 6: Implementar sección "La relación banco-cliente cambia" + CTA final**

```tsx
        {/* RELACIÓN */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
            <FadeInSection>
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                {l === 'ca' ? 'L\u2019imp\u00e0cte' : l === 'es' ? 'El impacto' : 'The impact'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B3064] mb-5">
                {l === 'ca'
                  ? 'El banc es converteix en un aliat'
                  : l === 'es'
                  ? 'El banco se convierte en un aliado'
                  : 'The bank becomes an ally'}
              </h2>
              <p className="text-[#3C4C67] text-lg leading-relaxed mb-10">
                {l === 'ca'
                  ? 'Finomik transforma la relaci\u00f3 de fons. El banc deixa de ser nom\u00e9s un prov\u00e8idor de serveis transaccionals i es converteix en una part \u00fatil del proc\u00e9s d\u2019ent\u00e8ndre, organitzar i millorar la vida financera de cada usuari. La confian\u00e7a es construeix a trav\u00e9s de la utilitat real.'
                  : l === 'es'
                  ? 'Finomik transforma la relaci\u00f3n de fondo. El banco deja de ser \u00fanicamente un proveedor de servicios transaccionales y se convierte en una parte \u00fatil del proceso de entender, organizar y mejorar la vida financiera de cada usuario. La confianza se construye a trav\u00e9s de la utilidad real, no solo de operaciones.'
                  : 'Finomik transforms the relationship at its core. The bank stops being solely a provider of transactional services and becomes a useful part of the process of understanding, organising and improving each user\'s financial life. Trust is built through real utility, not just transactions.'}
              </p>
              <Link
                to="/more-info"
                className="inline-flex items-center gap-2 bg-[#0B3064] text-white font-extrabold px-8 py-4 rounded-xl text-base hover:bg-[#114076] transition-colors"
              >
                {l === 'ca'
                  ? 'Parlem de com integrar-ho al teu banc'
                  : l === 'es'
                  ? 'Hablemos de c\u00f3mo integrarlo en tu banco'
                  : 'Let\'s talk about integrating it in your bank'}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </FadeInSection>
          </div>
        </section>
      </main>
    </div>
  );
}
```

- [ ] **Paso 7: Verificar en el navegador**

Navega a `http://localhost:3000/bancos`. Comprobar todas las secciones y las 3 lenguas (ES, EN, CA).

- [ ] **Paso 8: Commit**

```bash
git add pages/Bancos.tsx
git commit -m "feat: add /bancos page with full content"
```

---

## Task 5: Registrar rutas en index.tsx

**Files:**
- Modify: `index.tsx`

- [ ] **Paso 1: Añadir imports**

```tsx
import Colegios from './pages/Colegios';
import Bancos from './pages/Bancos';
```

- [ ] **Paso 2: Añadir rutas**

```tsx
<Route path="/colegios" element={<Colegios />} />
<Route path="/bancos" element={<Bancos />} />
```

Añadirlas antes de `<Route path="*" element={<NotFound />} />`.

- [ ] **Paso 3: Verificar navegación completa**

- Desde la home, clic en "Colegios" en navbar → lleva a `/colegios` ✓
- Desde la home, clic en "Bancos" en navbar → lleva a `/bancos` ✓
- Desde las tarjetas del SegmentSelector → navegación correcta ✓
- Botón "Volver" en cada página lleva a `/` ✓
- Links a `/more-info` funcionan ✓

- [ ] **Paso 4: Commit final**

```bash
git add index.tsx
git commit -m "feat: register /colegios and /bancos routes"
```

---

## Task 6: Push a GitHub

- [ ] **Paso 1: Push**

```bash
cd "/Users/miquelferrer/Desktop/Trabajo/Finomik/Finomik Landing"
GH_TOKEN=$(gh auth token --hostname github.com --user finomik215-mj)
git remote set-url origin https://finomik215-mj:${GH_TOKEN}@github.com/finomik215-mj/Finomik-Landing.git
git push origin main
git remote set-url origin https://github.com/finomik215-mj/Finomik-Landing.git
```

---

## Notas para el implementador

- **WaveShape y FadeInSection** no están exportados en App.tsx. Cópialos literalmente al inicio de cada archivo nuevo de página, después de los imports. Son autocontenidos.
- **InstitutionBenefitsPanel y InstitutionBenefits** están en App.tsx líneas ~1083–1537. Cópialos a Colegios.tsx y adapta solo los textos del badge/título de sección.
- **AnimatedNumber** también debe copiarse si lo usa el dashboard.
- **No inventar datos ni métricas** en ninguna sección.
- **i18n completo** (es/en/ca) en todos los textos. Usar unicode escapes para caracteres especiales.
- **Mantener coherencia visual**: mismas clases de Tailwind, mismos colores de brand.
- **WaveShape**: no pasar la prop `path` (usa el path por defecto del hero). Sí puedes pasar `mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"` para el comportamiento móvil correcto. Ejemplo correcto: `<WaveShape className="..." opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />`.
- **Alternancia de fondos** en Colegios.tsx: hero(dark `#0B3064`) → programa(white) → IA/ritmo(dark `#114076`) → dashboard(white/azul suave) → certificados(dark `#114076`) → CTA(white). Nunca dos secciones del mismo tono seguidas.
