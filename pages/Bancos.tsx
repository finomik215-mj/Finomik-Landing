import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, BarChart3, ChevronRight } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { useI18n } from '../i18n';
import { Navbar } from '../components/Navbar';
import { PageFooter } from '../components/PageFooter';

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

  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 400;
      setShowStickyBar(scrolled && !nearBottom);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <section className="bg-[#0B3064] min-h-[92vh] flex flex-col pt-20 md:pt-32 pb-8 md:pb-20 relative overflow-hidden">
        <WaveShape className="absolute bottom-0 left-0 w-full h-[35%] text-[#114076] z-0" opacity={1} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl text-center flex-1 flex flex-col justify-center">
          <FadeInSection>
            <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-8">
              {l === 'ca' ? 'Finomik per a Bancs' : l === 'es' ? 'Finomik para Bancos' : 'Finomik for Banks'}
            </span>
            <h1 className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl font-black text-white md:leading-[1.0] mb-6 max-w-4xl mx-auto">
              {l === 'ca'
                ? 'Clients millor educats, decisions més sòlides'
                : l === 'es'
                ? 'Clientes mejor educados, decisiones más sólidas'
                : 'Better-educated clients, stronger decisions'}
            </h1>
            <p className="text-white/70 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              {l === 'ca'
                ? "Finomik integra l'educació financera al cor de la relació banc-client."
                : l === 'es'
                ? 'Finomik integra la educación financiera en el centro de la relación banco-cliente.'
                : 'Finomik brings financial education to the heart of the bank-client relationship.'}
            </p>
            <Link
              to="/more-info"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-8 py-4 rounded-xl text-base hover:bg-yellow-400 transition-colors"
            >
              {l === 'ca' ? 'Sol·licitar reunió' : l === 'es' ? 'Solicitar reunión' : 'Request a meeting'}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== EL PROBLEMA: split comparison card ===================== */}
      <section className="bg-white py-12 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <div className="mb-10 max-w-2xl">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                {l === 'ca' ? 'El repte' : l === 'es' ? 'El reto' : 'The challenge'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B3064] mb-4">
                {l === 'ca'
                  ? "La manca d'educació financera genera fricció"
                  : l === 'es'
                  ? 'La falta de educación financiera genera fricción'
                  : 'Lack of financial education creates friction'}
              </h2>
              <p className="text-[#3C4C67] text-lg leading-relaxed">
                {l === 'ca'
                  ? "Molts clients no accedeixen a productes bancaris per falta de comprensió, no per falta d'interès. No entenen el producte i el descarten. Finomik canvia això: forma els clients en context, dins la pròpia plataforma del banc, perquè arribin amb criteri i confiança."
                  : l === 'es'
                  ? 'Muchos clientes no acceden a productos bancarios por falta de comprensión, no por falta de interés. No entienden el producto y lo descartan. Finomik cambia esto: forma a los clientes en contexto, dentro de la propia plataforma del banco, para que lleguen con criterio y confianza.'
                  : "Many clients don't access banking products due to lack of understanding, not lack of interest. They don't get the product and walk away. Finomik changes this: it educates clients in context, inside the bank's own platform, so they arrive informed and confident."}
              </p>
            </div>

            {/* Split comparison card */}
            <div className="rounded-2xl overflow-hidden border border-[#E8EDF5] shadow-lg grid md:grid-cols-2">
              {/* LEFT: without Finomik */}
              <div className="bg-slate-50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#E8EDF5]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#8F9EB7] mb-5">
                  {l === 'ca' ? 'Sense Finomik' : l === 'es' ? 'Sin Finomik' : 'Without Finomik'}
                </p>
                <ul className="space-y-4">
                  {[
                    { es: 'El cliente no entiende los productos y los rechaza', en: 'The client does not understand the products and rejects them', ca: 'El client no entén els productes i els rebutja' },
                    { es: 'Relación únicamente transaccional y distante', en: 'Purely transactional and distant relationship', ca: 'Relació únicament transaccional i distant' },
                    { es: 'Oportunidades de negocio perdidas por fricción', en: 'Business opportunities lost to friction', ca: "Oportunitats de negoci perdudes per fricció" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-slate-300 font-bold text-lg mt-0.5">-</span>
                      <span className="text-[#3C4C67] text-sm leading-relaxed">{item[l]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* RIGHT: with Finomik */}
              <div className="bg-[#0B3064] p-6 md:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F5C518] mb-5">
                  {l === 'ca' ? 'Amb Finomik' : l === 'es' ? 'Con Finomik' : 'With Finomik'}
                </p>
                <ul className="space-y-4">
                  {[
                    { es: 'El cliente entiende y llega a los productos con criterio', en: 'The client understands and approaches products with confidence', ca: 'El client entén i arriba als productes amb criteri' },
                    { es: 'El banco se convierte en aliado del crecimiento financiero', en: 'The bank becomes an ally in financial growth', ca: 'El banc es converteix en aliat del creixement financer' },
                    { es: 'Mayor conversión y menor fricción en la toma de decisiones', en: 'Better conversion and less friction in decision-making', ca: 'Major conversió i menys fricció en la presa de decisions' },
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
                {l === 'ca' ? 'Del desconeixement a la confiança' : l === 'es' ? 'Del desconocimiento a la confianza' : 'From the unknown to confidence'}
              </h2>
            </div>

            {/* Vertical timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-7 md:left-10 top-0 bottom-0 w-0.5 bg-white/20" />

              {[
                {
                  num: '01',
                  title: { es: 'El banco integra Finomik', en: 'The bank integrates Finomik', ca: 'El banc integra Finomik' },
                  desc: { es: 'Finomik se incorpora al ecosistema digital del banco, disponible para los clientes dentro de la plataforma que ya usan a diario.', en: "Finomik is incorporated into the bank's digital ecosystem, available to clients within the platform they already use daily.", ca: "Finomik s'incorpora a l'ecosistema digital del banc, disponible per als clients dins la plataforma que ja fan servir cada dia." },
                },
                {
                  num: '02',
                  title: { es: 'El cliente accede a módulos breves en el momento oportuno', en: 'The client accesses short modules at the right moment', ca: 'El client accedeix a mòduls breus en el moment oportú' },
                  desc: { es: 'Experiencias cortas, interactivas y gamificadas que encajan en cualquier momento del día. Sin necesidad de conocimientos previos, al ritmo de cada persona.', en: 'Short, interactive, gamified experiences that fit into any moment of the day. No prior knowledge needed, at each person\'s own pace.', ca: "Experiències curtes, interactives i gamificades que encaixen en qualsevol moment del dia. Sense coneixements previs, al ritme de cadascú." },
                },
                {
                  num: '03',
                  title: { es: 'La oferta del banco empieza a tener sentido', en: 'The bank\'s offer starts to make sense', ca: "L'oferta del banc comença a tenir sentit" },
                  desc: { es: 'El cliente entiende por qué le proponen un producto concreto. Lo que antes parecía complejo encaja con su situación real y deja de generar rechazo.', en: "The client understands why they're being offered a specific product. What once seemed complex fits their real situation and stops generating resistance.", ca: "El client entén per què li proposen un producte concret. El que abans semblava complex encaixa amb la seva situació real i deixa de generar rebuig." },
                },
                {
                  num: '04',
                  title: { es: 'El cliente llega con más criterio', en: 'The client arrives with greater clarity', ca: 'El client arriba amb més criteri' },
                  desc: { es: 'Menos miedo, más confianza. El cliente toma decisiones financieras mejor fundamentadas y con mayor seguridad.', en: 'Less fear, more confidence. The client makes better-informed financial decisions with greater assurance.', ca: 'Menys por, més confiança. El client pren decisions financeres millor fonamentades i amb més seguretat.' },
                },
              ].map((step, i, arr) => (
                <div key={i} className={`relative flex gap-6 md:gap-12 ${i < arr.length - 1 ? 'mb-12' : ''}`}>
                  {/* Circle on timeline */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#114076] border-2 border-[#F5C518] flex items-center justify-center">
                      <span className="text-[#F5C518] font-black text-base md:text-xl">{step.num}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pt-3 pb-8 md:pb-12">
                    <h3 className="font-black text-white text-xl md:text-2xl mb-3">{step.title[l]}</h3>
                    <p className="text-white/65 text-base leading-relaxed">{step.desc[l]}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== BENEFICIOS: 3 large feature cards ===================== */}
      <section className="bg-white py-12 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <div className="mb-12">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                {l === 'ca' ? 'Per al banc' : l === 'es' ? 'Para el banco' : 'For the bank'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B3064]">
                {l === 'ca' ? 'Una relació que evoluciona' : l === 'es' ? 'Una relación que evoluciona' : 'A relationship that evolves'}
              </h2>
            </div>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-6 px-6 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0">
              {[
                {
                  icon: <Users className="w-7 h-7" />,
                  title: { es: 'Más relevancia y engagement', en: 'More relevance and engagement', ca: 'Més rellevància i engagement' },
                  desc: { es: 'El banco deja de estar presente solo en momentos transaccionales y se convierte en parte del día a día financiero del cliente.', en: "The bank stops being present only in transactional moments and becomes part of the client's daily financial life.", ca: 'El banc deixa de ser present només en moments transaccionals i es converteix en part de la vida financera diària del client.' },
                },
                {
                  icon: <TrendingUp className="w-7 h-7" />,
                  title: { es: 'Mejor conversión en productos', en: 'Better product conversion', ca: 'Millor conversió en productes' },
                  desc: { es: 'Clientes que entienden el ahorro, la inversión y la planificación financiera llegan con más seguridad a las propuestas del banco.', en: "Clients who understand saving, investing and financial planning approach the bank's proposals with greater confidence.", ca: "Clients que entenen l'estalvi, la inversió i la planificació financera arriben amb més seguretat a les propostes del banc." },
                },
                {
                  icon: <BarChart3 className="w-7 h-7" />,
                  title: { es: 'Visión del comportamiento financiero', en: 'Financial behaviour insight', ca: 'Visió del comportament financer' },
                  desc: { es: 'El banco gana visibilidad sobre el nivel de comprensión y los intereses financieros de sus clientes, lo que permite anticiparse mejor a sus necesidades.', en: "The bank gains visibility into its clients' level of understanding and financial interests, enabling better anticipation of their needs.", ca: "El banc guanya visibilitat sobre el nivell de comprensió i els interessos financers dels seus clients." },
                },
              ].map((item, i) => (
                <div key={i} className="snap-start flex-shrink-0 w-[85vw] max-w-[320px] md:w-auto md:max-w-none md:flex-shrink bg-[#f0f5fc] rounded-2xl p-5 md:p-7 border border-[#E8EDF5] flex flex-col">
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

      <PageFooter
        topTitle={{
          es: 'El banco se convierte en un aliado',
          en: 'The bank becomes an ally',
          ca: 'El banc es converteix en un aliat',
        }}
        ctaLabel={{
          es: 'Hablemos de cómo integrarlo en tu banco',
          en: "Let's talk about integrating it in your bank",
          ca: 'Parlem de com integrar-ho al teu banc',
        }}
      />

      {/* Sticky mobile CTA */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-[#E8EDF5] px-4 py-3 shadow-lg transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <Link
          to="/more-info"
          className="w-full flex items-center justify-center gap-2 bg-[#0B3064] text-white font-extrabold py-4 rounded-xl text-sm"
        >
          {l === 'ca' ? 'Sol·licitar reunió' : l === 'es' ? 'Solicitar reunión' : 'Request a meeting'}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
