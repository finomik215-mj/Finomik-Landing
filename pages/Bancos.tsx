import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, BarChart3, Lightbulb, ChevronRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useI18n } from '../i18n';

// --- Types ---
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  visibleOnMobile?: boolean;
  forceVisible?: boolean;
  from?: 'bottom' | 'left' | 'right' | 'top';
}

// --- WaveShape ---
const WaveShape = ({ className, opacity = 0.1, path, mobilePath }: { className?: string, opacity?: number, path?: string, mobilePath?: string }) => {
  const desktopPath = path ?? "M0,105 C200,185 750,-35 1440,90 L1440,160 L0,160 Z";
  const flatPath = mobilePath ?? desktopPath;
  return (
    <div className={`absolute pointer-events-none overflow-hidden ${className}`}>
      <svg className="w-full h-full md:hidden" viewBox="0 0 1440 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fillOpacity={opacity} d={flatPath} />
      </svg>
      <svg className="w-full h-full hidden md:block" viewBox="0 0 1440 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fillOpacity={opacity} d={desktopPath} />
      </svg>
    </div>
  );
};

// --- FadeInSection ---
const FadeInSection: React.FC<SectionProps> = ({ children, className = "", id, delay = 0, visibleOnMobile = false, forceVisible = false, from = 'bottom' }) => {
  const [isVisible, setIsVisible] = useState(forceVisible);
  const [isBelowLg, setIsBelowLg] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsBelowLg(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (forceVisible) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setIsVisible(true);
      });
    }, { threshold: 0.1 });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, [forceVisible]);

  const show = forceVisible || isVisible || (visibleOnMobile && isBelowLg);

  const hiddenTransform = {
    bottom: 'opacity-0 translate-y-10',
    top:    'opacity-0 -translate-y-10',
    left:   'opacity-0 -translate-x-10',
    right:  'opacity-0 translate-x-10',
  }[from];

  return (
    <div
      id={id}
      ref={domRef}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-700 transform ${show ? 'opacity-100 translate-y-0 translate-x-0' : hiddenTransform} ${className}`}
    >
      {children}
    </div>
  );
};

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
            {l === 'ca' ? 'Sol·licitar informació' : l === 'es' ? 'Solicitar información' : 'Request info'}
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
            <FadeInSection>
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-6">
                {l === 'ca' ? 'Finomik per a Bancs' : l === 'es' ? 'Finomik para Bancos' : 'Finomik for Banks'}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-6 max-w-4xl">
                {l === 'ca'
                  ? 'Clients millor educats, decisions financeres més sòlides'
                  : l === 'es'
                  ? 'Clientes mejor educados, decisiones financieras más sólidas'
                  : 'Better-educated clients, stronger financial decisions'}
              </h1>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">
                {l === 'ca'
                  ? "Finomik converteix conceptes com renda fixa, renda variable o diversificació en comprensió real i aplicable, permetent que els clients arribin a les teves solucions amb més criteri i més seguretat en les seves decisions."
                  : l === 'es'
                  ? 'Finomik convierte conceptos como renta fija, renta variable o diversificación en entendimiento real y aplicable, permitiendo que los clientes lleguen a tus soluciones con mayor criterio y mayor seguridad en sus decisiones.'
                  : 'Finomik turns concepts such as fixed income, variable income or diversification into real, applicable understanding, allowing clients to approach your solutions with greater clarity and confidence.'}
              </p>
              <Link
                to="/more-info"
                className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-8 py-4 rounded-xl text-base hover:bg-yellow-400 transition-colors"
              >
                {l === 'ca' ? 'Sol·licitar reunió' : l === 'es' ? 'Solicitar reunión' : 'Request a meeting'}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </FadeInSection>
          </div>
        </section>

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
                      ? "La manca d'educació financera genera fricció"
                      : l === 'es'
                      ? 'La falta de educación financiera genera fricción'
                      : 'Lack of financial education creates friction'}
                  </h2>
                  <p className="text-[#3C4C67] text-lg leading-relaxed mb-6">
                    {l === 'ca'
                      ? "Molts clients no tenen els coneixements financers suficients per accedir amb seguretat a certs productes del banc. Aquesta manca de comprensió genera inseguretat, rebuig i oportunitats perdudes."
                      : l === 'es'
                      ? 'Muchos clientes no tienen los conocimientos financieros suficientes para acceder con seguridad a ciertos productos del banco. Esta falta de comprensión genera inseguridad, rechazo y oportunidades perdidas.'
                      : 'Many clients lack the financial knowledge to confidently access certain banking products. This gap in understanding creates insecurity, rejection and missed opportunities.'}
                  </p>
                  <p className="text-[#3C4C67] text-lg leading-relaxed">
                    {l === 'ca'
                      ? "Finomik ho canvia: educa el client dins del propi ecosistema del banc, de manera que arriba a les decisions amb més claredat i més confiança."
                      : l === 'es'
                      ? 'Finomik lo cambia: educa al cliente dentro del propio ecosistema del banco, de manera que llega a las decisiones con más claridad y más confianza.'
                      : "Finomik changes this: it educates the client within the bank's own ecosystem, so they arrive at decisions with greater clarity and confidence."}
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      label: { es: 'Sin educación financiera', en: 'Without financial education', ca: 'Sense educació financera' },
                      items: {
                        es: ['Productos complejos generan rechazo', 'Decisiones basadas en miedo, no en criterio', 'Relación transaccional y distante'],
                        en: ['Complex products trigger rejection', 'Decisions driven by fear, not judgement', 'Transactional and distant relationship'],
                        ca: ['Productes complexos generen rebuig', 'Decisions basades en la por, no en el criteri', 'Relació transaccional i distant'],
                      },
                      negative: true,
                    },
                    {
                      label: { es: 'Con Finomik', en: 'With Finomik', ca: 'Amb Finomik' },
                      items: {
                        es: ['El cliente entiende los productos que le ofrecen', 'Decisiones más seguras y mejor fundamentadas', 'El banco como aliado, no solo como proveedor'],
                        en: ["The client understands the products on offer", 'Safer, better-grounded decisions', 'The bank as an ally, not just a provider'],
                        ca: ["El client entén els productes que se li ofereixen", 'Decisions més segures i ben fonamentades', 'El banc com a aliat, no només com a proveïdor'],
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

        {/* CÓMO FUNCIONA */}
        <section className="py-20 md:py-24 bg-[#0B3064] relative overflow-hidden">
          <WaveShape className="absolute top-0 w-full h-[35%] text-[#114076] z-0 transform rotate-180" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
          <WaveShape className="absolute bottom-0 left-0 w-full h-[35%] text-[#114076] z-0" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
          <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-5">
                  {l === 'ca' ? 'Com funciona' : l === 'es' ? 'Cómo funciona' : 'How it works'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white">
                  {l === 'ca' ? 'Del desconeixement a la confiança' : l === 'es' ? 'Del desconocimiento a la confianza' : 'From the unknown to confidence'}
                </h2>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { num: '01', title: { es: 'Integración', en: 'Integration', ca: 'Integració' }, desc: { es: 'El banco integra Finomik en su ecosistema digital', en: 'The bank integrates Finomik into its digital ecosystem', ca: 'El banc integra Finomik al seu ecosistema digital' } },
                  { num: '02', title: { es: 'Aprendizaje', en: 'Learning', ca: 'Aprenentatge' }, desc: { es: 'El cliente aprende conceptos financieros en módulos cortos e interactivos', en: 'The client learns financial concepts through short, interactive modules', ca: 'El client aprèn conceptes financers en mòduls curts i interactius' } },
                  { num: '03', title: { es: 'Comprensión', en: 'Understanding', ca: 'Comprensió' }, desc: { es: 'Renta fija, diversificación, riesgo… dejan de ser abstractos y se entienden en contexto', en: 'Fixed income, diversification, risk… stop being abstract and are understood in context', ca: "Renda fixa, diversificació, risc… deixen de ser abstractes i s'entenen en context" } },
                  { num: '04', title: { es: 'Decisión', en: 'Decision', ca: 'Decisió' }, desc: { es: "El cliente llega a las propuestas del banco con más criterio, menos miedo y mayor seguridad", en: "The client approaches the bank's proposals with greater clarity, less fear and more confidence", ca: "El client arriba a les propostes del banc amb més criteri, menys por i més seguretat" } },
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

        {/* BENEFICIOS PARA EL BANCO */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                  {l === 'ca' ? 'Per al banc' : l === 'es' ? 'Para el banco' : 'For the bank'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0B3064]">
                  {l === 'ca' ? 'Una relació que evoluciona' : l === 'es' ? 'Una relación que evoluciona' : 'A relationship that evolves'}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: { es: 'Más relevancia y engagement', en: 'More relevance and engagement', ca: 'Més rellevància i engagement' },
                    desc: { es: 'El banco deja de estar presente solo en momentos transaccionales y se convierte en parte del día a día financiero del cliente.', en: "The bank stops being present only in transactional moments and becomes part of the client's daily financial life.", ca: 'El banc deixa de ser present només en moments transaccionals i es converteix en part de la vida financera diària del client.' },
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    title: { es: 'Mejor conversión en productos', en: 'Better product conversion', ca: 'Millor conversió en productes' },
                    desc: { es: 'Clientes que entienden el ahorro, la inversión y la planificación financiera llegan con más seguridad a las propuestas del banco y toman decisiones con menos fricción.', en: "Clients who understand saving, investing and financial planning approach the bank's proposals with greater confidence and make decisions with less friction.", ca: "Clients que entenen l'estalvi, la inversió i la planificació financera arriben amb més seguretat a les propostes del banc." },
                  },
                  {
                    icon: <BarChart3 className="w-6 h-6" />,
                    title: { es: 'Visión del comportamiento financiero', en: 'Financial behaviour insight', ca: 'Visió del comportament financer' },
                    desc: { es: 'El banco gana visibilidad sobre el nivel de comprensión y los intereses financieros de sus clientes, lo que permite anticiparse mejor a sus necesidades.', en: "The bank gains visibility into its clients' level of understanding and financial interests, enabling better anticipation of their needs.", ca: "El banc guanya visibilitat sobre el nivell de comprensió i els interessos financers dels seus clients." },
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

        {/* CONCEPTOS QUE DEJAN DE DAR MIEDO */}
        <section className="py-20 md:py-24 bg-[#114076] relative overflow-hidden">
          <WaveShape className="absolute top-0 w-full h-[35%] text-[#0B3064] z-0 transform rotate-180" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
          <WaveShape className="absolute bottom-0 left-0 w-full h-[35%] text-[#0B3064] z-0" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
          <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
            <FadeInSection>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-5">
                    {l === 'ca' ? 'Educació en context' : l === 'es' ? 'Educación en contexto' : 'Education in context'}
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
                      ? "Renda fixa, renda variable, diversificació, gestió del risc… deixen de ser idees abstractes i s'entenen en context. El client arriba amb menys por i més confiança a l'hora de prendre decisions."
                      : l === 'es'
                      ? 'Renta fija, renta variable, diversificación, gestión del riesgo… dejan de ser ideas abstractas y se entienden en contexto. El cliente llega con menos miedo y mayor confianza a la hora de tomar decisiones.'
                      : 'Fixed income, variable income, diversification, risk management… stop being abstract ideas and are understood in context. The client arrives with less fear and greater confidence when making decisions.'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { es: 'Renta fija', en: 'Fixed income', ca: 'Renda fixa' },
                    { es: 'Renta variable', en: 'Variable income', ca: 'Renda variable' },
                    { es: 'Diversificación', en: 'Diversification', ca: 'Diversificació' },
                    { es: 'Gestión del riesgo', en: 'Risk management', ca: 'Gestió del risc' },
                    { es: 'Ahorro a largo plazo', en: 'Long-term saving', ca: 'Estalvi a llarg termini' },
                    { es: 'Planificación financiera', en: 'Financial planning', ca: 'Planificació financera' },
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

        {/* LA RELACIÓN BANCO-CLIENTE CAMBIA + CTA FINAL */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
            <FadeInSection>
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                {l === 'ca' ? "L'impacte" : l === 'es' ? 'El impacto' : 'The impact'}
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
                  ? "Finomik transforma la relació de fons. El banc deixa de ser només un proveïdor de serveis transaccionals i es converteix en una part útil del procés d'entendre, organitzar i millorar la vida financera de cada usuari. La confiança es construeix a través de la utilitat real."
                  : l === 'es'
                  ? 'Finomik transforma la relación de fondo. El banco deja de ser únicamente un proveedor de servicios transaccionales y se convierte en una parte útil del proceso de entender, organizar y mejorar la vida financiera de cada usuario. La confianza se construye a través de la utilidad real, no solo de operaciones.'
                  : "Finomik transforms the relationship at its core. The bank stops being solely a provider of transactional services and becomes a useful part of the process of understanding, organising and improving each user's financial life. Trust is built through real utility, not just transactions."}
              </p>
              <Link
                to="/more-info"
                className="inline-flex items-center gap-2 bg-[#0B3064] text-white font-extrabold px-8 py-4 rounded-xl text-base hover:bg-[#114076] transition-colors"
              >
                {l === 'ca'
                  ? "Parlem de com integrar-ho al teu banc"
                  : l === 'es'
                  ? 'Hablemos de cómo integrarlo en tu banco'
                  : "Let's talk about integrating it in your bank"}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </FadeInSection>
          </div>
        </section>

      </main>
    </div>
  );
}
