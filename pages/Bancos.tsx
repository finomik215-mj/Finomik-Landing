import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, BarChart3, Lightbulb, ChevronRight, ArrowRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useI18n } from '../i18n';
import { Navbar } from '../components/Navbar';

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
        description={l === 'es' ? 'Finomik conecta a los bancos con sus clientes a través de la educación financiera.' : 'Finomik connects banks with their clients through financial education.'}
        path="/bancos"
        lang={lang}
      />

      <Navbar />

      {/* ===================== HERO: editorial, centered, bold ===================== */}
      <section className="bg-[#0B3064] pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <WaveShape className="absolute bottom-0 left-0 w-full h-[35%] text-[#114076] z-0" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl text-center">
          <FadeInSection>
            <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-8">
              {l === 'ca' ? 'Finomik per a Bancs' : l === 'es' ? 'Finomik para Bancos' : 'Finomik for Banks'}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[1.0] mb-6 max-w-4xl mx-auto">
              {l === 'ca'
                ? 'Clients millor educats, decisions mes solides'
                : l === 'es'
                ? 'Clientes mejor educados, decisiones mas solidas'
                : 'Better-educated clients, stronger decisions'}
            </h1>
            <p className="text-white/70 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              {l === 'ca'
                ? "Finomik integra l'educacio financera al cor de la relacio banc-client."
                : l === 'es'
                ? 'Finomik integra la educacion financiera en el centro de la relacion banco-cliente.'
                : 'Finomik brings financial education to the heart of the bank-client relationship.'}
            </p>
            <Link
              to="/more-info"
              className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-8 py-4 rounded-xl text-base hover:bg-yellow-400 transition-colors"
            >
              {l === 'ca' ? 'Sol·licitar reunio' : l === 'es' ? 'Solicitar reunion' : 'Request a meeting'}
              <ChevronRight className="w-5 h-5" />
            </Link>

            {/* 3 insight pills */}
            <div className="mt-10 md:mt-14 grid sm:grid-cols-3 gap-3 md:gap-4 text-left">
              {[
                {
                  es: 'Los clientes rechazan productos que no comprenden',
                  en: 'Clients reject products they do not understand',
                  ca: 'Els clients rebutgen productes que no comprenen',
                },
                {
                  es: 'El miedo a lo desconocido paraliza decisiones de inversion',
                  en: 'Fear of the unknown stalls investment decisions',
                  ca: "La por al desconegut paralitza decisions d'inversio",
                },
                {
                  es: 'La relacion banco-cliente se limita a momentos transaccionales',
                  en: 'The bank-client relationship is limited to transactional moments',
                  ca: 'La relacio banc-client es limita a moments transaccionals',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-xl px-5 py-4">
                  <p className="text-white/80 text-sm leading-relaxed font-medium">{item[l]}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== EL PROBLEMA: split comparison card ===================== */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <div className="mb-10 max-w-2xl">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                {l === 'ca' ? 'El repte' : l === 'es' ? 'El reto' : 'The challenge'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B3064] mb-4">
                {l === 'ca'
                  ? "La manca d'educacio financera genera friccio"
                  : l === 'es'
                  ? 'La falta de educacion financiera genera friccion'
                  : 'Lack of financial education creates friction'}
              </h2>
              <p className="text-[#3C4C67] text-lg leading-relaxed">
                {l === 'ca'
                  ? "Molts clients no accedeixen a certs productes bancaris per falta de comprensio, no per falta d'interes. Finomik canvia aixo."
                  : l === 'es'
                  ? 'Muchos clientes no acceden a ciertos productos bancarios por falta de comprension, no por falta de interes. Finomik cambia esto.'
                  : "Many clients don't access certain banking products due to lack of understanding, not lack of interest. Finomik changes this."}
              </p>
            </div>

            {/* Split comparison card */}
            <div className="rounded-2xl overflow-hidden border border-[#E8EDF5] shadow-lg grid md:grid-cols-2">
              {/* LEFT: without Finomik */}
              <div className="bg-slate-50 p-8 border-b md:border-b-0 md:border-r border-[#E8EDF5]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#8F9EB7] mb-5">
                  {l === 'ca' ? 'Sense Finomik' : l === 'es' ? 'Sin Finomik' : 'Without Finomik'}
                </p>
                <ul className="space-y-4">
                  {[
                    { es: 'El cliente no entiende los productos y los rechaza', en: 'The client does not understand the products and rejects them', ca: 'El client no enten els productes i els rebutja' },
                    { es: 'Relacion unicamente transaccional y distante', en: 'Purely transactional and distant relationship', ca: 'Relacio unicament transaccional i distant' },
                    { es: 'Oportunidades de negocio perdidas por friccion', en: 'Business opportunities lost to friction', ca: "Oportunitats de negoci perdudes per friccio" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-slate-300 font-bold text-lg mt-0.5">-</span>
                      <span className="text-[#3C4C67] text-sm leading-relaxed">{item[l]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* RIGHT: with Finomik */}
              <div className="bg-[#0B3064] p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F5C518] mb-5">
                  {l === 'ca' ? 'Amb Finomik' : l === 'es' ? 'Con Finomik' : 'With Finomik'}
                </p>
                <ul className="space-y-4">
                  {[
                    { es: 'El cliente entiende y llega a los productos con criterio', en: 'The client understands and approaches products with confidence', ca: 'El client enten i arriba als productes amb criteri' },
                    { es: 'El banco se convierte en aliado del crecimiento financiero', en: 'The bank becomes an ally in financial growth', ca: 'El banc es converteix en aliat del creixement financer' },
                    { es: 'Mayor conversion y menor friccion en la toma de decisiones', en: 'Better conversion and less friction in decision-making', ca: 'Major conversio i menys friccio en la presa de decisions' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#F5C518] font-bold text-lg mt-0.5">+</span>
                      <span className="text-white/80 text-sm leading-relaxed">{item[l]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== COMO FUNCIONA: vertical timeline ===================== */}
      <section className="bg-[#0B3064] py-14 md:py-24 relative overflow-hidden">
        <WaveShape className="absolute top-0 w-full h-[35%] text-[#114076] z-0 transform rotate-180" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
        <WaveShape className="absolute bottom-0 left-0 w-full h-[35%] text-[#114076] z-0" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-4xl">
          <FadeInSection>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-5">
                {l === 'ca' ? 'Com funciona' : l === 'es' ? 'Como funciona' : 'How it works'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {l === 'ca' ? 'Del desconeixement a la confianca' : l === 'es' ? 'Del desconocimiento a la confianza' : 'From the unknown to confidence'}
              </h2>
            </div>

            {/* Vertical timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-white/20" />

              {[
                {
                  num: '01',
                  title: { es: 'El banco integra Finomik', en: 'The bank integrates Finomik', ca: 'El banc integra Finomik' },
                  desc: { es: 'Finomik se incorpora al ecosistema digital del banco, disponible para los clientes dentro de la plataforma.', en: "Finomik is incorporated into the bank's digital ecosystem, available to clients within the platform.", ca: "Finomik s'incorpora a l'ecosistema digital del banc, disponible per als clients dins la plataforma." },
                },
                {
                  num: '02',
                  title: { es: 'El cliente aprende en contexto', en: 'The client learns in context', ca: 'El client apren en context' },
                  desc: { es: 'Modulos cortos e interactivos sobre conceptos financieros reales: renta fija, diversificacion, gestion del riesgo.', en: 'Short, interactive modules on real financial concepts: fixed income, diversification, risk management.', ca: 'Moduls curts i interactius sobre conceptes financers reals: renda fixa, diversificacio, gestio del risc.' },
                },
                {
                  num: '03',
                  title: { es: 'Los conceptos dejan de dar miedo', en: 'Concepts stop being scary', ca: 'Els conceptes deixen de fer por' },
                  desc: { es: 'Renta fija, renta variable, diversificacion... dejan de ser abstractos. El cliente los entiende en el contexto de sus propias finanzas.', en: "Fixed income, variable income, diversification... stop being abstract. The client understands them in the context of their own finances.", ca: "Renda fixa, renda variable, diversificacio... deixen de ser abstractes. El client els enten en el context de les seves propies finances." },
                },
                {
                  num: '04',
                  title: { es: 'El cliente llega con mas criterio', en: 'The client arrives with greater clarity', ca: 'El client arriba amb mes criteri' },
                  desc: { es: 'Menos miedo, mas confianza. El cliente toma decisiones financieras mejor fundamentadas y con mayor seguridad.', en: 'Less fear, more confidence. The client makes better-informed financial decisions with greater assurance.', ca: 'Menys por, mes confianca. El client pren decisions financeres millor fonamentades i amb mes seguretat.' },
                },
              ].map((step, i, arr) => (
                <div key={i} className={`relative flex gap-6 md:gap-10 ${i < arr.length - 1 ? 'mb-10' : ''}`}>
                  {/* Circle on timeline */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#114076] border-2 border-[#F5C518] flex items-center justify-center">
                      <span className="text-[#F5C518] font-black text-sm md:text-base">{step.num}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-2 pb-8 md:pb-10">
                    <h3 className="font-black text-white text-lg mb-2">{step.title[l]}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.desc[l]}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== BENEFICIOS: 3 large feature cards ===================== */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <div className="mb-12">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                {l === 'ca' ? 'Per al banc' : l === 'es' ? 'Para el banco' : 'For the bank'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B3064]">
                {l === 'ca' ? 'Una relacio que evoluciona' : l === 'es' ? 'Una relacion que evoluciona' : 'A relationship that evolves'}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Users className="w-7 h-7" />,
                  title: { es: 'Mas relevancia y engagement', en: 'More relevance and engagement', ca: 'Mes rellevancia i engagement' },
                  desc: { es: 'El banco deja de estar presente solo en momentos transaccionales y se convierte en parte del dia a dia financiero del cliente.', en: "The bank stops being present only in transactional moments and becomes part of the client's daily financial life.", ca: 'El banc deixa de ser present nomes en moments transaccionals i es converteix en part de la vida financera diaria del client.' },
                },
                {
                  icon: <TrendingUp className="w-7 h-7" />,
                  title: { es: 'Mejor conversion en productos', en: 'Better product conversion', ca: 'Millor conversio en productes' },
                  desc: { es: 'Clientes que entienden el ahorro, la inversion y la planificacion financiera llegan con mas seguridad a las propuestas del banco.', en: "Clients who understand saving, investing and financial planning approach the bank's proposals with greater confidence.", ca: "Clients que entenen l'estalvi, la inversio i la planificacio financera arriben amb mes seguretat a les propostes del banc." },
                },
                {
                  icon: <BarChart3 className="w-7 h-7" />,
                  title: { es: 'Vision del comportamiento financiero', en: 'Financial behaviour insight', ca: 'Visio del comportament financer' },
                  desc: { es: 'El banco gana visibilidad sobre el nivel de comprension y los intereses financieros de sus clientes, lo que permite anticiparse mejor a sus necesidades.', en: "The bank gains visibility into its clients' level of understanding and financial interests, enabling better anticipation of their needs.", ca: "El banc guanya visibilitat sobre el nivell de comprensio i els interessos financers dels seus clients." },
                },
              ].map((item, i) => (
                <div key={i} className="bg-[#f0f5fc] rounded-2xl p-5 md:p-7 border border-[#E8EDF5] flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-[#0B3064] flex items-center justify-center mb-5 text-[#F5C518]">
                    {item.icon}
                  </div>
                  <h3 className="font-black text-[#0B3064] text-lg mb-3">{item.title[l]}</h3>
                  <p className="text-[#3C4C67] text-sm leading-relaxed flex-1">{item.desc[l]}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== CONCEPTOS: grid of concept mini-cards ===================== */}
      <section className="bg-[#114076] py-20 md:py-24 relative overflow-hidden">
        <WaveShape className="absolute top-0 w-full h-[35%] text-[#0B3064] z-0 transform rotate-180" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
        <WaveShape className="absolute bottom-0 left-0 w-full h-[35%] text-[#0B3064] z-0" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-5">
                  {l === 'ca' ? 'Educacio en context' : l === 'es' ? 'Educacion en contexto' : 'Education in context'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
                  {l === 'ca' ? 'Conceptes que deixen de fer por' : l === 'es' ? 'Conceptos que dejan de dar miedo' : 'Concepts that stop being scary'}
                </h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  {l === 'ca'
                    ? "Renda fixa, diversificacio, gestio del risc... deixen de ser idees abstractes. El client arriba amb menys por i mes confianca a l'hora de prendre decisions."
                    : l === 'es'
                    ? 'Renta fija, diversificacion, gestion del riesgo... dejan de ser ideas abstractas. El cliente llega con menos miedo y mayor confianza a la hora de tomar decisiones.'
                    : 'Fixed income, diversification, risk management... stop being abstract ideas. The client arrives with less fear and greater confidence when making decisions.'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: { es: 'Renta fija', en: 'Fixed income', ca: 'Renda fixa' }, desc: { es: 'Rendimiento predecible y estable', en: 'Predictable and stable return', ca: 'Rendiment previsible i estable' } },
                  { label: { es: 'Renta variable', en: 'Variable income', ca: 'Renda variable' }, desc: { es: 'Potencial de crecimiento a largo plazo', en: 'Long-term growth potential', ca: 'Potencial de creixement a llarg termini' } },
                  { label: { es: 'Diversificacion', en: 'Diversification', ca: 'Diversificacio' }, desc: { es: 'Distribuir riesgo entre activos', en: 'Spreading risk across assets', ca: "Distribuir risc entre actius" } },
                  { label: { es: 'Gestion del riesgo', en: 'Risk management', ca: 'Gestio del risc' }, desc: { es: 'Controlar la exposicion a perdidas', en: 'Controlling exposure to losses', ca: "Controlar l'exposicio a perdues" } },
                  { label: { es: 'Ahorro a largo plazo', en: 'Long-term saving', ca: 'Estalvi a llarg termini' }, desc: { es: 'Construir patrimonio con el tiempo', en: 'Building wealth over time', ca: 'Construir patrimoni amb el temps' } },
                  { label: { es: 'Planificacion financiera', en: 'Financial planning', ca: 'Planificacio financera' }, desc: { es: 'Organizar ingresos, gastos y objetivos', en: 'Organising income, expenses and goals', ca: "Organitzar ingressos, despeses i objectius" } },
                ].map((concept, i) => (
                  <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-[#F5C518] flex-shrink-0" />
                      <span className="text-white text-xs font-black">{concept.label[l]}</span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed">{concept.desc[l]}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== CTA FINAL: bold, minimal ===================== */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
          <FadeInSection>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#8F9EB7] mb-4">
              {l === 'ca' ? "L'impacte" : l === 'es' ? 'El impacto' : 'The impact'}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#0B3064] mb-6 leading-tight">
              {l === 'ca'
                ? 'El banc es converteix en un aliat'
                : l === 'es'
                ? 'El banco se convierte en un aliado'
                : 'The bank becomes an ally'}
            </h2>
            <p className="text-[#3C4C67] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {l === 'ca'
                ? "Finomik transforma la relacio de fons. El banc deixa de ser un proveidor de serveis transaccionals i es converteix en una part util de la vida financera de cada usuari."
                : l === 'es'
                ? 'Finomik transforma la relacion de fondo. El banco deja de ser unicamente un proveedor de servicios transaccionales y se convierte en una parte util de la vida financiera de cada usuario.'
                : "Finomik transforms the relationship at its core. The bank stops being solely a provider of transactional services and becomes a useful part of each user's financial life."}
            </p>
            <Link
              to="/more-info"
              className="inline-flex items-center gap-2 bg-[#0B3064] text-white font-extrabold px-7 py-4 rounded-xl text-base hover:bg-[#114076] transition-colors"
            >
              {l === 'ca'
                ? "Parlem de com integrar-ho al teu banc"
                : l === 'es'
                ? 'Hablemos de como integrarlo en tu banco'
                : "Let's talk about integrating it in your bank"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
}
