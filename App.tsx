import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  LineChart, 
  Users, 
  BookOpen, 
  Smartphone, 
  Play,
  CheckCircle2,
  Trophy,
  Target,
  TrendingUp,
  Menu,
  X,
  Route,
  User,
} from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useI18n } from './i18n';

// --- Types ---
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  /** When true, content is visible immediately on viewports < 1024px (avoids blank area before intersection). */
  visibleOnMobile?: boolean;
  /** When true, content is always visible (e.g. for hero above the fold). */
  forceVisible?: boolean;
  /** Entry direction: default 'bottom'. Controls which axis elements slide in from. */
  from?: 'bottom' | 'left' | 'right' | 'top';
}

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  className?: string;
  onClick?: () => void;
  /** When provided, renders as a link (e.g. to in-page sections). */
  href?: string;
}

// --- Reusable UI Components ---

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
      className={`transition-all duration-700 transform ${show ? 'opacity-100 translate-y-0 translate-x-0' : hiddenTransform} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, suffix = '', duration = 1200, decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState<string | number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const raw = progress * value;
      const current =
        decimals > 0
          ? Number(raw.toFixed(decimals))
          : Math.floor(raw);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [hasAnimated, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

// --- Word-by-word animated headline (motion) ---
const WordReveal = ({ text, className = '', baseDelay = 0, accent = false }: { text: string; className?: string; baseDelay?: number; accent?: boolean }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: baseDelay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block mr-[0.25em] ${accent ? 'text-accent-gradient-on-dark' : ''} ${className}`}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
};

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', onClick, href }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg";
  
  const variants = {
    primary: "bg-finomik-gold text-finomik-navy hover:bg-[#E8B84B] hover:shadow-xl hover:-translate-y-0.5 border-0 font-extrabold",
    secondary: "bg-white text-finomik-navy hover:bg-finomik-pale",
    outline: "border-2 border-finomik-light text-finomik-navy hover:bg-accent-gradient hover:text-white hover:border-transparent",
    white: "bg-white text-finomik-navy hover:bg-gray-100"
  };

  const combinedClassName = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={combinedClassName} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={combinedClassName} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

// --- Header ---
const navItems = [
  { key: 'colegios', href: '/colegios' },
  { key: 'bancos', href: '/bancos' },
  { key: 'contact', href: '/contact' },
];

const LANG_OPTIONS: { code: 'en' | 'es' | 'ca'; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
];

const Header = () => {
  const { lang, setLang } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-3'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center min-h-[52px] md:min-h-[64px]">
        <a
          href="#top"
          className="flex items-center shrink-0"
          aria-label={lang === 'ca' ? 'Finomik - Anar amunt' : lang === 'es' ? 'Finomik - Ir arriba' : 'Finomik - Go to top'}
        >
          <img
            src={isScrolled ? '/logo-finomik-on-white.png' : '/logo-finomik-on-blue.png'}
            alt="Finomik - Financial Education"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </a>

        {/* Desktop nav: una sola fila, sin saltos de línea en CA/ES */}
        <nav className="hidden lg:flex items-center flex-nowrap gap-5 xl:gap-7 shrink-0">
          {navItems.map((item) => {
            const label =
              item.key === 'colegios'
                ? (lang === 'ca' ? 'Col·legis' : lang === 'es' ? 'Colegios' : 'Schools')
                : item.key === 'bancos'
                  ? (lang === 'ca' ? 'Bancs' : lang === 'es' ? 'Bancos' : 'Banks')
                  : (lang === 'ca' ? 'Contacte' : lang === 'es' ? 'Contacto' : 'Contact');

            if (item.href.startsWith('/')) {
              return (
              <Link
                  key={item.key}
                to={item.href}
                className={`text-sm font-semibold transition-colors whitespace-nowrap ${isScrolled ? 'text-gray-600 hover:text-finomik-navy' : 'text-gray-200 hover:text-white'}`}
              >
                  {label}
              </Link>
              );
            }
            return (
              <a
                key={item.key}
                href={item.href}
                className={`text-sm font-semibold transition-colors whitespace-nowrap ${isScrolled ? 'text-gray-600 hover:text-finomik-navy' : 'text-gray-200 hover:text-white'}`}
              >
                {label}
              </a>
            );
          })}
          <Button
            href="/more-info"
            variant={isScrolled ? 'primary' : 'white'}
            className="py-2 px-5 text-xs whitespace-nowrap shrink-0 ml-4"
          >
            {lang === 'ca' ? 'Sol·licitar informació' : lang === 'es' ? 'Solicitar información' : 'Request info'}
          </Button>
          <div className={`ml-6 flex items-center gap-0.5 rounded-full border overflow-hidden shrink-0 ${isScrolled ? 'border-finomik-light' : 'border-white/60'}`}>
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => setLang(opt.code)}
                className={`text-xs font-semibold px-2.5 py-1 min-w-[2rem] transition-colors ${
                  lang === opt.code
                    ? isScrolled ? 'bg-finomik-light text-white' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-finomik-navy hover:bg-finomik-pale' : 'text-white/80 hover:bg-white/10'
                }`}
                aria-label={opt.code === 'en' ? 'English' : opt.code === 'es' ? 'Español' : 'Català'}
                aria-pressed={lang === opt.code}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile/tablet hamburger (hasta lg) */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finomik-light focus:ring-offset-transparent"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-finomik-navy' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-finomik-navy' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile/tablet menu panel */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#114076]/95 backdrop-blur-md border-t border-white/10 shadow-lg">
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-3">
            {navItems.map((item) =>
              item.href.startsWith('/') ? (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={closeMenu}
                  className="text-sm font-semibold text-white hover:text-blue-200 transition-colors py-2 block"
                >
                  {item.key === 'colegios'
                    ? (lang === 'ca' ? 'Col·legis' : lang === 'es' ? 'Colegios' : 'Schools')
                    : item.key === 'bancos'
                      ? (lang === 'ca' ? 'Bancs' : lang === 'es' ? 'Bancos' : 'Banks')
                      : (lang === 'ca' ? 'Contacte' : lang === 'es' ? 'Contacto' : 'Contact')}
                </Link>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-sm font-semibold text-white hover:text-blue-200 transition-colors py-2 block"
                >
                  {item.key === 'colegios'
                    ? (lang === 'ca' ? 'Col·legis' : lang === 'es' ? 'Colegios' : 'Schools')
                    : item.key === 'bancos'
                      ? (lang === 'ca' ? 'Bancs' : lang === 'es' ? 'Bancos' : 'Banks')
                      : (lang === 'ca' ? 'Contacte' : lang === 'es' ? 'Contacto' : 'Contact')}
                </a>
              )
            )}
            <Button href="/more-info" variant="white" className="mt-2 justify-center" onClick={closeMenu}>
              {lang === 'ca' ? 'Més informació' : lang === 'es' ? 'Más información' : 'More info'}
            </Button>
            <div className="mt-3 flex gap-2 flex-wrap justify-center">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => { setLang(opt.code); closeMenu(); }}
                  className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${
                    lang === opt.code ? 'border-white bg-white/20 text-white' : 'border-white/70 text-white hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Hero skill card that cycles through financial concepts ---
const HeroSkillCard = ({ lang }: { lang: string }) => {
  const concepts = lang === 'ca'
    ? ['Bàsics del pressupost', 'Interès compost', 'Diversificació del risc', "Estalvi d'emergència", 'Gestió del deute', 'Planificació financera']
    : lang === 'es'
    ? ['Conceptos de presupuesto', 'Interés compuesto', 'Diversificación del riesgo', 'Ahorro de emergencia', 'Gestión de la deuda', 'Planificación financiera']
    : ['Budgeting Basics', 'Compound Interest', 'Risk Diversification', 'Emergency Savings', 'Debt Management', 'Financial Planning'];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % concepts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [concepts.length]);

  return (
    <div className="absolute top-[30%] right-[10%] animate-float-card min-w-[230px]" style={{ perspective: '800px' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-5 rounded-xl shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-finomik-light/15 rounded-lg flex-shrink-0">
              <CheckCircle2 className="text-finomik-light w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                {lang === 'ca' ? 'Competència assolida' : lang === 'es' ? 'Habilidad adquirida' : 'Skill Acquired'}
              </p>
              <p className="text-finomik-navy font-bold text-sm leading-snug">
                {concepts[index]}
              </p>
            </div>
          </div>
          <div className="flex gap-1 mt-3 justify-end items-center">
            {concepts.map((_, i) => (
              <motion.div
                key={i}
                style={{ display: 'none' }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Hero Section ---
const Hero = () => {
  const { lang } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  return (
    <section
      ref={sectionRef}
      className="relative min-h-0 md:min-h-screen flex items-center overflow-hidden pt-24 pb-8 md:pt-36 md:pb-0"
      style={{ background: 'linear-gradient(180deg, #114076 0%, #114076 55%, #0B3064 100%)' }}
    >
      {/* Background wave – en móvil un poco más arriba (15%), en desktop al fondo */}
      <WaveShape className="absolute bottom-0 w-full h-[30%] md:h-[55%] text-[#5574A7] z-0" opacity={0.4} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center min-w-0">
        <div className="space-y-4 md:space-y-8 max-w-2xl min-w-0">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-5 md:mb-10 break-words">
            <WordReveal
              text={lang === 'ca' ? 'El teu futur financer' : lang === 'es' ? 'Tu futuro financiero' : 'Your financial future'}
              baseDelay={0.1}
            />
            {' '}
            <WordReveal
              text={lang === 'ca' ? 'comen\u00e7a aqu\u00ed.' : lang === 'es' ? 'empieza aqu\u00ed.' : 'starts here.'}
              baseDelay={0.42}
              accent
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-2xl font-semibold text-slate-100 leading-relaxed mb-3 md:mb-6 max-w-lg"
          >
            {lang === 'ca'
              ? 'Plataforma gamificada per aprendre competències financeres amb experiències curtes i interactives.'
              : lang === 'es'
              ? 'Plataforma gamificada para desarrollar tus competencias financieras con experiencias cortas e interactivas.'
              : 'A gamified platform to build financial skills through short, interactive experiences.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 pt-2 pb-6 md:gap-4 md:pt-4 md:pb-14"
          >
            <Button href="/more-info" variant="primary" className="justify-center">
              {lang === 'ca' ? 'Sol·licitar informació' : lang === 'es' ? 'Solicitar información' : 'Request info'}
            </Button>
            <Button href="#our-solutions" variant="white" className="justify-center border border-white/30">
              {lang === 'ca' ? 'Veure solucions' : lang === 'es' ? 'Ver soluciones' : 'Discover solutions'}
            </Button>
          </motion.div>
        </div>

        {/* Hero Visual - Mac / Laptop mockup with parallax */}
        <div className="relative hidden lg:block h-[600px] w-full">
          <motion.div style={{ y: visualY }} className="absolute inset-0">
           <FadeInSection delay={500} forceVisible className="absolute inset-0 flex items-center justify-center">
              {/* Mac / Laptop */}
              <div className="relative transform rotate-[-3deg]">
                 {/* Screen */}
                 <div className="relative w-[520px] rounded-t-xl overflow-hidden border-[6px] border-[#2d2d2d] border-b-0 bg-[#1a2c55] shadow-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}>
                    {/* Notch / camera */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-24 h-5 bg-[#1a2c55] rounded-b-lg border-b border-x border-[#2d2d2d]" />
                    {/* Top Bar */}
                    <div className="h-12 w-full bg-[#152342] flex items-center justify-between px-6 pt-2 border-b border-white/5">
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#4a4a4a]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#4a4a4a]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#4a4a4a]"></div>
                       </div>
                       <div className="w-8 h-8 rounded-full bg-finomik-light/20 flex items-center justify-center">
                          <Users className="w-4 h-4 text-finomik-light" />
                       </div>
                    </div>
                    {/* Screen content */}
                    <div className="p-6 space-y-4 bg-gradient-to-b from-[#1a2c55] to-[#0A1E42] min-h-[320px]">
                       <div className="w-full h-28 bg-gradient-to-r from-finomik-mid to-finomik-navy rounded-xl p-4 flex flex-col justify-between shadow-lg">
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                              <LineChart className="text-white w-4 h-4" />
                          </div>
                          <div className="space-y-2">
                             <div className="h-2 w-12 bg-white/30 rounded"></div>
                             <div className="h-5 w-28 bg-white rounded"></div>
                          </div>
                       </div>
                       <div className="grid grid-cols-3 gap-3">
                          {[1,2,3].map(i => (
                              <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-finomik-light/20 flex items-center justify-center text-finomik-light font-bold text-sm">{i}</div>
                                  <div className="flex-1 space-y-1">
                                      <div className="w-16 h-1.5 bg-white/20 rounded"></div>
                                      <div className="w-full h-1 bg-white/10 rounded"></div>
                                  </div>
                              </div>
                          ))}
                       </div>
                    </div>
                 </div>
                 {/* Base / keyboard */}
                 <div className="h-3 w-[560px] -ml-5 rounded-b-lg bg-gradient-to-b from-[#3d3d3d] to-[#1f1f1f] border-[6px] border-[#2d2d2d] border-t-2" />
                 <div className="h-2 w-[480px] mx-auto rounded-b-md bg-[#1a1a1a]" />
              </div>

               {/* Floating Card — cycles through financial concepts */}
              <HeroSkillCard lang={lang} />
           </FadeInSection>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Problem Section ---
const problemStats = [
  {
    slug: 'adultos-sin-conocimientos-financieros-basicos-mundo',
    labelCa: ['Adults sense', 'coneixements bàsics'],
    labelEs: ['Adultos sin', 'conocimientos básicos'],
    labelEn: ['Adults without', 'basics'],
    value: 3.5,
    suffix: 'B+',
    decimals: 1,
    subCa: 'Persones adultes arreu del món',
    subEs: 'Personas adultas en el mundo',
    subEn: 'adults worldwide',
  },
  {
    slug: 'alumnado-sin-educacion-financiera-basica-espana',
    labelCa: ['Persones sense', 'educació financera bàsica'],
    labelEs: ['Personas sin', 'educación financiera básica'],
    labelEn: ['People without', 'basic financial ed.'],
    value: 20,
    suffix: '%',
    decimals: 0,
    subCa: '1 de cada 5 falla tasques senzilles',
    subEs: '1 de cada 5 falla tareas sencillas',
    subEn: '1 in 5 fail simple tasks',
  },
  {
    slug: 'adultos-sin-colchon-emergencia-ahorro',
    labelCa: ['Sense coixí', "d'emergència"],
    labelEs: ['Sin colchón', 'de emergencia'],
    labelEn: ['No emergency', 'buffer'],
    value: 50,
    suffix: '%',
    decimals: 0,
    subCa: 'La meitat no pot cobrir imprevistos',
    subEs: 'La mitad no puede cubrir imprevistos',
    subEn: "half can't cover surprises",
  },
];

const Problem = () => {
  const { lang } = useI18n();
  return (
    <section className="pt-24 pb-12 md:py-24 bg-slate-50/70 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-finomik-light font-bold tracking-wider text-sm uppercase mb-2 md:mb-3">
              {lang === 'ca' ? 'El repte que abordem' : lang === 'es' ? 'El reto que abordamos' : "The Challenge We're Solving"}
            </h3>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-finomik-navy leading-tight mb-8 break-words px-1">
              {lang === 'ca'
                ? "L'educació financera continua sent baixa arreu del món. La majoria de persones no aprèn mai a gestionar els seus diners."
                : lang === 'es'
                ? 'La educación financiera sigue siendo baja en todo el mundo. La mayoría de personas nunca aprende a gestionar su dinero.'
                : 'Financial literacy remains low worldwide. Most people never learn how to manage money.'}
            </h2>
            <div
              className="w-20 h-1 mx-auto rounded-full mb-8"
              style={{ background: 'linear-gradient(90deg, transparent, #5574A7 20%, #0B3064 80%, transparent)' }}
            />
            <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
              {lang === 'ca'
                ? 'Aquesta manca els acompanya en la vida adulta i afecta decisions econòmiques reals sense la preparació adequada.'
                : lang === 'es'
                ? 'Esta carencia les acompaña en la vida adulta y afecta a decisiones económicas reales sin la preparación adecuada.'
                : 'This gap follows them into adulthood, affecting real financial decisions without proper preparation.'}
            </p>
            <div className="mt-10 grid gap-4 sm:gap-6 sm:grid-cols-3 text-center items-stretch">
              {problemStats.map((item, i) => {
                const label = lang === 'ca' ? item.labelCa : lang === 'es' ? item.labelEs : item.labelEn;
                const sub = lang === 'ca' ? item.subCa : lang === 'es' ? item.subEs : item.subEn;
                return (
                  <Link
                    key={i}
                    to={`/articulo/${item.slug}`}
                    className="group bg-white/90 rounded-2xl shadow-sm px-4 py-5 border border-slate-200 border-t-4 border-t-[#0B3064] flex flex-col items-center justify-between h-full hover:shadow-md hover:border-t-[#5574A7] transition-all duration-200"
                  >
                    <span className="text-xs font-extrabold tracking-[0.06em] text-finomik-light mb-2 leading-snug">
                      {label[0]}<br />{label[1]}
                    </span>
                    <span className="text-4xl font-extrabold text-finomik-navy">
                      <AnimatedNumber value={item.value} suffix={item.suffix} decimals={item.decimals} />
                    </span>
                    <span className="mt-2 text-[0.7rem] text-slate-600 leading-snug">{sub}</span>
                    <span className="mt-2 text-[0.65rem] text-[#5574A7] font-semibold">
                      {lang === 'ca' ? 'Llegir m\u00e9s \u2192' : lang === 'es' ? 'Leer m\u00e1s \u2192' : 'Read more \u2192'}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

// --- Mission Section ---
const Mission = () => {
  const { lang } = useI18n();
  const cards = [
    {
      title: lang === 'ca' ? 'Contingut accessible' : lang === 'es' ? 'Contenido accesible' : 'Accessible Content',
      desc:
        lang === 'ca'
          ? 'Conceptes financers complexos desglossats en mòduls simples i assumibles.'
          : lang === 'es'
          ? 'Conceptos financieros complejos desglosados en módulos simples y asumibles.'
          : 'Complex financial concepts broken down into simple, digestible modules.',
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      title: lang === 'ca' ? 'Disseny gamificat' : lang === 'es' ? 'Diseño gamificado' : 'Gamified Design',
      desc:
        lang === 'ca'
          ? 'Mecàniques atractives que fomenten la repetició sense resultar trivials.'
          : lang === 'es'
          ? 'Mecánicas atractivas que fomentan la repetición sin resultar triviales.'
          : 'Engaging mechanics that encourage repetition without feeling trivial.',
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: lang === 'ca' ? 'Al teu ritme' : lang === 'es' ? 'A tu ritmo' : 'Your Path',
      desc:
        lang === 'ca'
          ? 'Recorreguts d\'aprenentatge adaptatius que s\'ajusten als objectius i ritme de cada persona.'
          : lang === 'es'
          ? 'Recorridos de aprendizaje adaptativos que se ajustan a los objetivos y ritmo de cada persona.'
          : "Adaptive learning journeys that match the user's specific goals and pace.",
      icon: <LineChart className="w-6 h-6" />,
    },
    {
      title: lang === 'ca' ? 'Hàbits diaris' : lang === 'es' ? 'Hábitos diarios' : 'Daily Habits',
      desc:
        lang === 'ca'
          ? 'Dissenyat per a la interacció diària i constant, no per a cursos intensius puntuals.'
          : lang === 'es'
          ? 'Diseñado para la interacción diaria y constante, no para cursos intensivos puntuales.'
          : 'Built for consistent, daily interaction rather than one-off crash courses.',
      icon: <ShieldCheck className="w-6 h-6" />,
    },
  ];
  const cardCount = cards.length;
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cardCount);
    }, 3000);
    return () => clearInterval(id);
  }, [cardCount]);

  return (
    <section
      id="our-mission"
      className="pt-24 pb-16 md:pt-28 md:pb-24 bg-slate-100/80 relative scroll-mt-32 md:scroll-mt-40 border-t border-slate-300 shadow-[inset_0_4px_12px_-4px_rgba(0,0,0,0.06)]"
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* En tablet misma estructura que móvil: columna (texto arriba, tarjetas abajo); desde lg fila */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 md:gap-16">
          <div className="lg:w-5/12 xl:w-[45%] space-y-3 md:space-y-6 text-center lg:text-left">
            <FadeInSection>
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-finomik-light mb-4">
                {lang === 'ca' ? 'La nostra missió' : lang === 'es' ? 'Nuestra misión' : 'Our mission'}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-finomik-navy leading-tight mb-3 md:mb-6">
                {lang === 'ca'
                  ? 'Tecnologia d\'educació financera de nova generació per a tothom.'
                  : lang === 'es'
                  ? 'Tecnología de educación financiera de nueva generación para todos.'
                  : 'Next-gen financial literacy technology for everyone.'}
              </h2>
              <p className="text-sm md:text-lg text-gray-600 font-medium max-w-xl md:max-w-2xl mx-auto lg:mx-0 leading-snug md:leading-relaxed">
                {lang === 'ca'
                  ? 'Finomik és la plataforma interactiva d\'educació financera que fa que les competències econòmiques essencials siguin accessibles, atractives i mesurables: no només teoria en un llibre.'
                  : lang === 'es'
                  ? 'Finomik es la plataforma interactiva de educación financiera que hace que las competencias económicas esenciales sean accesibles, atractivas y medibles: no solo teoría en un libro.'
                  : 'Finomik is the interactive financial education platform that makes essential money skills accessible, engaging, and measurable: not textbook.'}
              </p>
            </FadeInSection>
          </div>
          <div className="lg:w-7/12 xl:w-[55%] grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[280px_280px] gap-3 md:gap-5 lg:gap-8 lg:items-stretch mt-6 lg:mt-0">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`h-full min-h-0 flex flex-col transition-all duration-700 lg:duration-500 ease-out ${
                  i === activeCardIndex
                    ? 'scale-100 opacity-100 translate-y-0'
                    : 'scale-[0.96] opacity-70 translate-y-1 lg:scale-100 lg:opacity-100 lg:translate-y-0'
                }`}
                style={{ position: 'relative', zIndex: i === activeCardIndex ? 20 : 5 + i }}
              >
                <FadeInSection delay={i * 100} className="h-full min-h-0 flex flex-col">
                <div
                  className={`py-4 px-3 md:p-5 lg:p-8 lg:h-[280px] lg:min-h-[280px] lg:max-h-[280px] rounded-xl md:rounded-2xl shadow-sm border transition-all duration-300 group h-full max-w-sm mx-auto md:max-w-none flex flex-col overflow-hidden ${
                    i === activeCardIndex
                      ? 'bg-[#0B3064] border-[#0B3064] text-white shadow-xl'
                      : 'bg-white border-gray-100 text-finomik-navy hover:shadow-lg'
                  }`}
                >
                  {/* Icon beside title on all viewports to keep cards shorter */}
                  <div className="flex flex-col flex-1 min-h-0">
                    <div className="flex items-center lg:items-start gap-3 mb-2 lg:mb-4 flex-shrink-0">
                  <div
                        className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                      i === activeCardIndex ? 'bg-white/15 text-white' : 'bg-finomik-pale text-finomik-mid'
                    }`}
                  >
                    {card.icon}
                  </div>
                  <h4
                        className={`text-sm md:text-lg lg:text-xl font-extrabold leading-snug lg:leading-normal ${
                      i === activeCardIndex ? 'text-white' : 'text-finomik-navy'
                    }`}
                  >
                    {card.title}
                  </h4>
                    </div>
                  <p
                      className={`text-[11px] md:text-sm lg:text-base leading-snug md:leading-relaxed lg:leading-relaxed flex-1 min-h-0 ${
                      i === activeCardIndex ? 'text-blue-100/90' : 'text-gray-600'
                    }`}
                  >
                    {card.desc}
                  </p>
                  </div>
                </div>
              </FadeInSection>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Process Section ---
const Process = () => {
  const { lang } = useI18n();
  const steps = [
    {
      num: '01',
      title: lang === 'ca' ? 'Comprèn el concepte' : lang === 'es' ? 'Comprende el concepto' : 'Learn the Concept',
      desc: lang === 'ca' ? 'Explicacions clares, sense argot.' : lang === 'es' ? 'Explicaciones claras, sin jerga.' : 'Clear explanations without jargon.',
    },
    {
      num: '02',
      title: lang === 'ca' ? 'Aplica de seguida' : lang === 'es' ? 'Aplica de inmediato' : 'Apply Immediately',
      desc: lang === 'ca' ? 'Escenaris financers de la vida real.' : lang === 'es' ? 'Escenarios financieros de la vida real.' : 'Real-life financial scenarios.',
    },
    {
      num: '03',
      title: lang === 'ca' ? 'Rep feedback' : lang === 'es' ? 'Recibe feedback' : 'Receive Feedback',
      desc: lang === 'ca' ? "Comprèn el 'per què' de cada decisió." : lang === 'es' ? "Comprende el 'por qué' de cada decisión." : "Understand the 'why' behind decisions.",
    },
    {
      num: '04',
      title: lang === 'ca' ? 'Reforça hàbits' : lang === 'es' ? 'Refuerza hábitos' : 'Reinforce Habits',
      desc: lang === 'ca' ? 'Construeix hàbits, no memorització puntual.' : lang === 'es' ? 'Construye hábitos, no memorización puntual.' : 'Building habits, not cramming.',
    },
  ];

  return (
    <section className="py-32 bg-[#114076] text-white relative overflow-hidden">
      <WaveShape className="absolute top-0 w-full h-[35%] text-[#5574A7] z-0 transform rotate-180" opacity={0.4} mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <FadeInSection className="text-center mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 px-2">
            {lang === 'ca'
              ? 'Com Finomik desenvolupa habilitats reals, pas a pas'
              : lang === 'es'
              ? 'Cómo Finomik desarrolla habilidades reales, paso a paso'
              : 'How Finomik builds real skills, step by step'}
          </h2>
          <div className="w-20 h-1 bg-white mx-auto rounded-full"></div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeInSection key={i} delay={i * 150} className="relative">
              <div className="space-y-4 pt-6">
                <span className="text-6xl font-black text-white/10 absolute -top-8 -left-4 select-none">{step.num}</span>
                <div className="relative z-10 mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/85 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Piled Cards (Solutions: Student Experience) ---
// Solid blue tonalities, straight. Auto-advances every 4s. Cards nearly full of text.
const PiledCards = () => {
  const { lang } = useI18n();
  const [topIndex, setTopIndex] = useState(0);
  const cards = [
    {
      title: lang === 'ca' ? 'El repte d\'avui' : lang === 'es' ? 'El reto de hoy' : "Today's challenge",
      desc: lang === 'ca' ? 'Estalvia 50 € aquesta setmana.' : lang === 'es' ? 'Ahorra 50 € esta semana.' : 'Save €50 this week.',
      body:
        lang === 'ca'
          ? 'Reptes diaris breus mantenen les persones aprenents connectades i posen en pràctica les seves habilitats financeres. Cada repte està dissenyat per ser assolible i vinculat a decisions reals, de manera que el progrés es senti tangible i motivador.'
          : lang === 'es'
          ? 'Retos diarios breves mantienen a las personas aprendientes conectadas y ponen en práctica sus habilidades financieras. Cada reto está diseñado para ser alcanzable y vinculado a decisiones reales, de forma que el progreso se sienta tangible y motivador.'
          : 'Short daily challenges keep learners engaged and put financial skills into practice. Each challenge is designed to be achievable and linked to real-life decisions, so progress feels concrete and motivating.',
      icon: <Target className="w-12 h-12 text-white" />,
      bg: "bg-[#114076]",
      border: "border-[#0B3064]",
    },
    {
      title: lang === 'ca' ? 'El meu progrés' : lang === 'es' ? 'Mi progreso' : 'My progress',
      desc: lang === 'ca' ? 'Segueix el teu recorregut.' : lang === 'es' ? 'Sigue tu recorrido.' : 'Track your journey.',
      body:
        lang === 'ca'
          ? 'Veus el teu progrés per mòduls i temes d\'un cop d\'ull. Lliçons completades, puntuacions i temps invertit es reuneixen en un sol lloc, ajudant a mantenir el rumb i guanyar confiança.'
          : lang === 'es'
          ? 'Ves tu progreso por módulos y temas de un vistazo. Lecciones completadas, puntuaciones y tiempo invertido se reúnen en un único lugar, ayudando a mantener el rumbo y a ganar confianza.'
          : 'Learners see their progress across modules and topics at a glance. Completed lessons, scores, and time spent are gathered in one place, helping them stay on track and build confidence as they advance.',
      icon: <TrendingUp className="w-12 h-12 text-white" />,
      bg: "bg-[#3E5374]",
      border: "border-[#3C4C67]",
    },
    {
      title: lang === 'ca' ? 'Classificació' : lang === 'es' ? 'Clasificación' : 'Leaderboard',
      desc: lang === 'ca' ? 'Competència amistosa.' : lang === 'es' ? 'Competición amistosa.' : 'Friendly competition.',
      body:
        lang === 'ca'
          ? 'Les classificacions afegeixen un toc competitiu lleu i fomenten la constància. Veure com van les altres persones pot activar la motivació sense pressió i reforça el sentit de comunitat al voltant de l\'aprenentatge.'
          : lang === 'es'
          ? 'Los rankings añaden un toque competitivo ligero y fomentan la constancia. Ver cómo van las demás personas puede activar la motivación sin presión y refuerza el sentido de comunidad alrededor del aprendizaje.'
          : 'Class or group rankings add a light competitive edge and encourage consistency. Seeing how others are doing can spark motivation without pressure, and supports a sense of community around learning.',
      icon: <Trophy className="w-12 h-12 text-white" />,
      bg: "bg-[#0B3064]",
      border: "border-[#114076]",
    },
    {
      title: lang === 'ca' ? 'Ratxa' : lang === 'es' ? 'Racha' : 'Streak',
      desc: lang === 'ca' ? 'Construeix l\'hàbit.' : lang === 'es' ? 'Construye el hábito.' : 'Build the habit.',
      body:
        lang === 'ca'
          ? 'Les ratxes premien l\'ús regular i ajuden a convertir l\'aprenentatge en un hàbit. Un simple comptador de dies consecutius anima a tornar sovint i completar almenys una petita activitat cada dia.'
          : lang === 'es'
          ? 'Las rachas premian el uso regular y ayudan a convertir el aprendizaje en un hábito. Un simple contador de días consecutivos anima a volver a menudo y completar al menos una pequeña actividad cada día.'
          : 'Streaks reward regular use and help turn learning into a habit. A simple count of consecutive days encourages learners to come back often and complete at least a small activity each day.',
      icon: <LineChart className="w-12 h-12 text-white" />,
      bg: "bg-[#3C4C67]",
      border: "border-[#5574A7]",
    },
  ];
  const n = cards.length;

  useEffect(() => {
    const id = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % n);
    }, 4000);
    return () => clearInterval(id);
  }, [n]);

  return (
    <div className="relative rounded-3xl overflow-visible w-full max-w-full min-w-0 h-[540px] min-h-[540px] lg:h-full lg:min-h-[520px] flex items-center justify-center font-sans">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-[#0B3064] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg">
        {lang === 'ca' ? 'Així funciona' : lang === 'es' ? 'Así funciona' : 'How it works'}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pt-20 sm:pt-28 pb-10 sm:pb-8 px-1 sm:px-4">
        {cards.map((card, i) => {
          const stackPos = (i - topIndex + n) % n;
          const isTop = stackPos === 0;
          const z = 10 - stackPos;
          const y = stackPos * 12;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setTopIndex((prev) => (prev + 1) % n)}
              className={`absolute left-3 right-3 top-20 bottom-12 sm:left-4 sm:right-4 sm:top-24 sm:bottom-6 rounded-3xl sm:rounded-[1.75rem] shadow-none border ${card.bg} ${card.border} p-4 px-5 sm:p-8 md:p-10 transition-all duration-300 ease-out cursor-pointer hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#0A1E42] flex flex-col items-center justify-center max-w-full overflow-auto min-w-0`}
              style={{
                zIndex: z,
                transform: `translateY(${y}px)`,
                opacity: isTop ? 1 : 0.92 - stackPos * 0.08,
              }}
            >
              <div className="w-full max-w-xl mx-auto flex flex-col gap-3 sm:gap-5 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#114076] flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-extrabold text-xl md:text-2xl tracking-tight leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-white/90 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] mt-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <p className="text-white/85 text-sm md:text-base leading-relaxed">
                  {card.body}
                </p>
                <p className="inline-flex items-center gap-2 text-[11px] md:text-xs text-white/80 font-semibold uppercase tracking-[0.18em]">
                  <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                  {lang === 'ca' ? 'Toca per veure el següent' : lang === 'es' ? 'Toca para ver el siguiente' : 'Tap to see next'}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};


// --- Platforms Section (Videos) ---
const Platforms = () => {
  const { lang } = useI18n();
  return (
    <section className="bg-white py-0">
      
      {/* Solutions Section */}
      <div
        id="our-solutions"
        className="pt-10 pb-12 md:py-24 border-b border-gray-100 scroll-mt-32 md:scroll-mt-40"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1 flex flex-col min-h-[540px] lg:min-h-[520px] w-full">
              {/* Mobile: no FadeInSection so cards are always visible; desktop: fade in */}
              <div className="flex-1 w-full lg:hidden" style={{ minHeight: 540 }}>
                <PiledCards />
              </div>
              <FadeInSection delay={200} className="hidden lg:block flex-1 min-h-[520px] h-full w-full">
                <PiledCards />
              </FadeInSection>
            </div>
            <div className="lg:w-1/2 space-y-6 order-1 lg:order-2">
              <FadeInSection>
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="text-finomik-light w-6 h-6" />
                  <span className="text-finomik-navy font-bold tracking-widest uppercase text-sm">
                    {lang === 'ca' ? 'Les nostres solucions' : lang === 'es' ? 'Nuestras soluciones' : 'Our solutions'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-finomik-navy mb-8 break-words">
                  {lang === 'ca' ? 'Aprèn jugant.' : lang === 'es' ? 'Aprende jugando.' : 'Learn by playing.'} <br />
                  {lang === 'ca' ? 'Domina practicant.' : lang === 'es' ? 'Domina practicando.' : 'Master by doing.'}
                </h2>
                <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                  {lang === 'ca'
                    ? 'La nostra plataforma d\'educació financera gamificada et permet aprendre de manera flexible, amb contingut adaptat al teu ritme i als teus objectius personals.'
                    : lang === 'es'
                    ? 'Nuestra plataforma de educación financiera gamificada te permite aprender de forma flexible, con contenido adaptado a tu ritmo y a tus objetivos personales.'
                    : 'Our gamified financial education platform lets you learn flexibly, with content adapted to your pace and personal goals.'}
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    lang === 'ca' ? 'Situacions financeres de la vida real' : lang === 'es' ? 'Situaciones financieras de la vida real' : 'Real-life financial situations',
                    lang === 'ca'
                      ? 'Contingut adaptat als teus objectius personals'
                      : lang === 'es'
                      ? 'Contenido adaptado a tus objetivos personales'
                      : 'Content tailored to your personal goals',
                    lang === 'ca'
                      ? 'Construcció d\'hàbits a llarg termini'
                      : lang === 'es'
                      ? 'Construcción de hábitos a largo plazo'
                      : 'Long-term habit building',
                    lang === 'ca' ? 'Reptes en comunitat' : lang === 'es' ? 'Retos en comunidad' : 'Community challenges',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-5 rounded-full bg-[#E5E9EC] flex items-center justify-center flex-shrink-0">
                        <ArrowRight className="w-3 h-3 text-[#2B5375]" />
                      </div>
                      <span className="text-base leading-relaxed text-finomik-navy font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeInSection>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

// --- Institution Benefits Section ---
const InstitutionBenefitsPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const { lang } = useI18n();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !inView) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div
      ref={panelRef}
      className="relative font-sans"
    >
      <div className="absolute -top-16 -right-10 w-56 h-56 bg-finomik-light/20 blur-3xl opacity-40 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#5574A7]/15 blur-3xl opacity-40 pointer-events-none animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

      <div className="relative px-1 py-3 md:p-2 flex flex-col items-center justify-center gap-3 md:gap-5 min-h-0">
        {/* Mac-style laptop mockup – en móvil más grande (min height para ocupar más pantalla) */}
        <div
          className={`relative w-full min-w-0 lg:w-[880px] xl:w-[960px] transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* En móvil: altura algo mayor para que el contenido simplificado respire; desktop 16:10 */}
          <div className="aspect-[16/10] w-full max-h-[44vh] min-h-[220px] sm:max-h-[48vh] sm:min-h-[260px] lg:max-h-none lg:min-h-0 flex flex-col">
          {/* Mac body – gris tipo Apple (plateado) */}
          <div className="flex-1 min-h-0 flex flex-col rounded-2xl lg:rounded-3xl bg-slate-200 shadow-2xl overflow-hidden border border-slate-300/80">
            {/* Top bezel – estilo Apple, mismo gris */}
            <div className="h-3.5 sm:h-5 lg:h-10 w-full flex-shrink-0 bg-slate-200 flex items-center justify-between px-1.5 sm:px-3 lg:px-6 border-b border-slate-300/90">
              <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#febc2e]" />
                <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 text-[0.5rem] sm:text-[0.65rem] lg:text-xs text-slate-600 font-semibold">
                <span className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-slate-300/80 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-[#1C386E]" />
                </span>
                <span className="hidden sm:inline">
                  {lang === 'ca' ? 'El teu tauler' : lang === 'es' ? 'Tu panel' : 'Your dashboard'}
                  <span className="lg:hidden"> · {lang === 'ca' ? 'Mostra' : lang === 'es' ? 'Muestra' : 'Sample'}</span>
                </span>
              </div>
            </div>

            {/* Screen area – dashboard en blanco/gris con toques azul oscuro */}
            <div className="mt-0.5 mx-1 mb-1 sm:mt-1 sm:mx-2 lg:mt-1.5 lg:mx-5 lg:mb-1 rounded-lg lg:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 relative flex-1 min-h-0 flex flex-col">
              <div className="absolute inset-0 overflow-hidden">
              {/* Mobile: más contenido, componentes más compactos */}
              <div className="lg:hidden relative h-full p-1.5 sm:p-2 flex flex-col gap-1.5 min-h-0 overflow-auto bg-slate-50">
                {/* Hero compacto */}
                <div className="w-full rounded-md bg-white border border-slate-200 shadow-sm p-1.5 sm:p-2 flex flex-col gap-0.5 flex-shrink-0">
                  <div className="flex items-center justify-between gap-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#1C386E]/10 flex items-center justify-center flex-shrink-0">
                        <LineChart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#1C386E]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.55rem] sm:text-[0.6rem] text-slate-500 font-bold uppercase tracking-wider truncate">
                          {lang === 'ca' ? 'Resum' : lang === 'es' ? 'Resumen' : 'Snapshot'}
                        </p>
                        <p className="text-[0.6rem] sm:text-[0.65rem] text-[#1C386E] font-bold leading-tight truncate">
                          {lang === 'ca' ? 'Itinerari en marxa' : lang === 'es' ? 'Itinerario en marcha' : 'Journey in progress'}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#C8D0DD] text-[#0B3064] font-bold text-[0.55rem] sm:text-[0.6rem] whitespace-nowrap flex-shrink-0 border border-[#8F9EB7]/80">
                      62%
                    </span>
                  </div>
                  <div className="mt-0.5 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                    <div className="h-full w-3/5 rounded-full bg-[#1C386E]" />
                  </div>
                </div>
                {/* 3 tiles compactos */}
                <div className="grid grid-cols-3 gap-1 flex-shrink-0">
                  {[
                    { label: lang === 'ca' ? 'Mòduls' : lang === 'es' ? 'Módulos' : 'Modules', value: '6' },
                    { label: lang === 'ca' ? 'Usuaris' : lang === 'es' ? 'Usuarios' : 'Users', value: '48' },
                    { label: lang === 'ca' ? 'Setmanes' : lang === 'es' ? 'Semanas' : 'Weeks', value: '4' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-md bg-white border border-slate-200 px-1.5 py-1 text-center shadow-sm">
                      <p className="text-[0.7rem] sm:text-[0.8rem] font-extrabold text-[#1C386E] leading-tight">{item.value}</p>
                      <p className="text-[0.5rem] sm:text-[0.55rem] font-bold text-slate-600 truncate">{item.label}</p>
                    </div>
                  ))}
                </div>
                {/* Bar chart + Doughnut en 2 columnas – móvil: título separado, barras un poco más cortas */}
                <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0 min-w-0">
                  <div className="rounded-md bg-white border border-slate-200 pl-1.5 pr-1.5 pt-1 pb-1 flex flex-col min-h-0 shadow-sm">
                    <span className="text-[0.5rem] sm:text-[0.55rem] font-bold uppercase tracking-wide text-[#1C386E] leading-tight flex-shrink-0 block mb-1.5">
                      {lang === 'ca' ? 'Per mòdul' : lang === 'es' ? 'Por módulo' : 'By module'}
                    </span>
                    <div className="flex-1 flex items-end justify-around gap-1 min-h-[3rem] pb-px pt-2">
                      {[65, 88, 100, 75, 90, 82].map((h, i) => (
                        <div key={i} className="flex flex-col items-center justify-end gap-0 flex-1 min-w-0 h-full">
                          <div
                            className="w-full min-w-[8px] max-w-[18px] sm:max-w-[22px] bg-[#1C386E] rounded-t flex-shrink-0"
                            style={{ height: `${(h / 100) * 78}%`, minHeight: '6px' }}
                          />
                          <span className="text-[0.45rem] sm:text-[0.5rem] font-semibold text-slate-600 truncate w-full text-center flex-shrink-0 mt-0.5">M{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md bg-white border border-slate-200 p-1.5 flex flex-col min-h-0 shadow-sm">
                    <span className="text-[0.5rem] sm:text-[0.55rem] font-bold uppercase tracking-wide text-[#1C386E] leading-tight flex-shrink-0 text-center">
                      {lang === 'ca' ? 'Progrés' : lang === 'es' ? 'Progreso' : 'Progress'}
                    </span>
                    <div className="flex-1 flex items-center justify-center gap-1.5 min-h-0 min-w-0">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundImage: 'conic-gradient(#1C386E 0deg 150deg, #2B5375 150deg 240deg, #3b6b8f 240deg 360deg)' }}
                        />
                        <div className="absolute inset-[24%] rounded-full bg-slate-50 border border-slate-200" />
                      </div>
                      <div className="flex flex-col justify-center flex-shrink-0 min-w-0">
                        <span className="text-[0.75rem] sm:text-[0.85rem] font-bold text-[#1C386E] leading-tight">62%</span>
                        <span className="text-[0.5rem] sm:text-[0.55rem] font-semibold text-slate-600 leading-tight">
                          {lang === 'ca' ? 'completat' : lang === 'es' ? 'completado' : 'completed'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: full dashboard */}
              <div className="hidden lg:flex h-full flex-col p-2 sm:p-2.5 lg:px-4 lg:pt-4 lg:pb-2 bg-slate-50">
              <div className="w-full rounded-xl bg-white border border-slate-200 shadow-sm p-2 sm:p-2.5 md:p-3 lg:p-4 flex flex-col gap-1 sm:gap-1.5 lg:gap-2 flex-shrink-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-lg bg-[#1C386E]/10 flex items-center justify-center">
                      <LineChart className="w-4 h-4 lg:w-5 lg:h-5 text-[#1C386E]" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] md:text-[0.7rem] lg:text-xs text-slate-500 font-semibold uppercase tracking-[0.16em]">
                        {lang === 'ca' ? 'Resum del programa' : lang === 'es' ? 'Resumen del programa' : 'Program snapshot'}
                      </p>
                      <p className="text-xs md:text-sm lg:text-base text-[#1C386E] font-semibold">
                        {lang === 'ca'
                          ? 'Itinerari d\'educació financera en marxa'
                          : lang === 'es'
                          ? 'Itinerario de educación financiera en marcha'
                          : 'Financial literacy journey in progress'}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 lg:px-3 lg:py-1.5 rounded-full bg-[#1C386E]/10 text-[#1C386E] text-[0.65rem] lg:text-xs font-semibold whitespace-nowrap">
                  {lang === 'ca' ? 'XX % completat' : lang === 'es' ? '62 % completado' : '62% completion'}
                  </span>
                </div>
                <div className="mt-1.5 lg:mt-2 h-1 lg:h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full w-3/5 rounded-full bg-[#1C386E]" />
                </div>
              </div>

              <div className="mt-1 sm:mt-2 lg:mt-3 grid grid-cols-3 gap-1.5 md:gap-2 lg:gap-3 flex-shrink-0">
                {[
                  { label: lang === 'ca' ? 'Mòduls actius' : lang === 'es' ? 'Módulos activos' : 'Modules live', value: '6' },
                  { label: lang === 'ca' ? 'Usuaris actius' : lang === 'es' ? 'Usuarios activos' : 'Active users', value: '48' },
                  { label: lang === 'ca' ? 'Setmanes en marxa' : lang === 'es' ? 'Semanas en marcha' : 'Weeks running', value: '4' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-2 md:p-2.5 lg:p-3 rounded-lg lg:rounded-xl bg-white border border-slate-200 flex flex-col gap-0.5 shadow-sm"
                  >
                    <p className="text-base md:text-lg lg:text-xl text-[#1C386E] font-extrabold leading-tight">
                      {item.value}
                    </p>
                    <p className="text-[0.65rem] md:text-[0.7rem] lg:text-sm text-slate-600 font-bold tracking-[0.08em]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-1 sm:mt-2 lg:mt-3 grid grid-cols-2 gap-1.5 md:gap-2 lg:gap-3 text-[0.6rem] md:text-[0.65rem] lg:text-xs min-h-0 flex-1 lg:items-stretch">
                <div className="rounded-lg lg:rounded-xl bg-white border border-slate-200 p-2 md:p-2.5 lg:p-3 flex flex-col gap-1 lg:gap-1.5 min-h-0 flex-1 shadow-sm">
                  <span className="font-semibold uppercase tracking-[0.16em] text-[#1C386E] flex-shrink-0">
                    {lang === 'ca'
                      ? 'Mitjana de finalització per mòdul'
                      : lang === 'es'
                      ? 'Media de finalización por módulo'
                      : 'Average completion by module'}
                  </span>
                  <div className="mt-0.5 flex gap-1.5 flex-1 min-h-0 h-14 sm:h-20 md:h-24 lg:min-h-[8rem]">
                    <div className="flex flex-col justify-between text-[0.5rem] md:text-[0.55rem] lg:text-xs text-slate-400 pr-1">
                      {[100, 80, 60, 40, 20, 0].map((tick) => (
                        <span key={tick}>{tick}%</span>
                      ))}
                    </div>
                    <div className="relative flex-1 h-full flex flex-col">
                      <div className="relative flex-1 flex items-end gap-5 md:gap-6 lg:gap-7">
                        <div className="absolute inset-x-0 bottom-0 h-px bg-slate-200" />
                        {(isDesktop
                          ? [65, 88, 100, 75, 90, 82]
                          : [65, 88, 100, 75]
                        ).map((h, idx) => (
                          <div key={idx} className="flex-1 flex items-end justify-center min-h-0">
                            <div
                              className="w-4 md:w-5 lg:w-7 bg-[#1C386E] rounded-t-full"
                              style={{ height: `${Math.round((h / 100) * (isDesktop ? 130 : 52))}px`, minHeight: '10px' }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-1 lg:mt-2 flex items-center justify-between px-0.5 gap-2">
                        {(isDesktop ? ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'] : ['M1', 'M2', 'M3', 'M4']).map((label) => (
                          <span key={label} className="flex-1 text-center text-[0.55rem] md:text-[0.6rem] lg:text-xs text-slate-600 font-semibold">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg lg:rounded-xl bg-white border border-slate-200 p-2 md:p-2.5 lg:p-3 flex flex-col gap-1 lg:gap-1.5 min-h-0 flex-1 shadow-sm">
                  <span className="font-semibold uppercase tracking-[0.16em] text-[#1C386E] flex-shrink-0">
                    {lang === 'ca' ? 'El teu progrés' : lang === 'es' ? 'Tu progreso' : 'Your progress'}
                  </span>
                  <div className="mt-0.5 flex items-center gap-2 lg:gap-3 flex-1 min-h-0 lg:justify-center">
                    {/* Doughnut chart using blue conic gradient */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-32 lg:h-32 flex-shrink-0">
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundImage:
                            'conic-gradient(#1C386E 0deg 150deg, #2B5375 150deg 240deg, #3b6b8f 240deg 360deg)',
                        }}
                      />
                      <div className="absolute inset-[24%] rounded-full bg-slate-50 border border-slate-200" />
                      <span className="absolute inset-0 flex items-center justify-center text-[0.65rem] md:text-[0.8rem] lg:text-lg font-semibold text-[#1C386E]">
                        62%
                      </span>
                    </div>
                    <div className="flex-1 space-y-1 lg:space-y-1.5 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#8F9EB7] flex-shrink-0" />
                        <span className="text-[0.55rem] md:text-[0.6rem] lg:text-xs text-slate-600">
                          {lang === 'ca'
                            ? "62% ha completat els seus mòduls assignats."
                            : lang === 'es'
                            ? 'Completa tus módulos para alcanzar tu objetivo personal.'
                            : '62% have completed their assigned modules.'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#5574A7] flex-shrink-0" />
                        <span className="text-[0.55rem] md:text-[0.6rem] lg:text-xs text-slate-600">
                          {lang === 'ca'
                            ? '27% avança activament pels mòduls.'
                            : lang === 'es'
                            ? 'XX % está avanzando activamente en los módulos.'
                            : '27% are actively progressing.'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#3E5374] flex-shrink-0" />
                        <span className="text-[0.55rem] md:text-[0.6rem] lg:text-xs text-slate-600">
                          {lang === 'ca'
                            ? '11% encara no ha començat.'
                            : lang === 'es'
                            ? 'XX % aún no ha empezado y puede necesitar apoyo.'
                            : '11% have not yet started.'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
            </div>
          </div>

          </div>

          {/* Notificaciones móvil – ocultas en viewports muy pequeños para no restar foco al frame */}
          <div className="hidden sm:flex lg:hidden absolute left-0 top-[18%] -translate-x-[58%] z-30 w-[32%] max-w-[62px]">
            <div className="bg-white rounded shadow-md border border-slate-200/80 px-1.5 py-1 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#1C386E] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[0.5rem] font-semibold uppercase text-slate-500 leading-tight">{lang === 'ca' ? 'Activitat' : lang === 'es' ? 'Actividad' : 'Activity'}</p>
                <p className="text-[0.55rem] font-bold text-slate-800 leading-tight break-words line-clamp-2">{lang === 'ca' ? 'La Laura ha completat el M3' : lang === 'es' ? 'Laura completó M3' : 'Laura done M3'}</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex lg:hidden absolute right-0 top-[42%] translate-x-[48%] z-30 w-[32%] max-w-[60px]">
            <div className="bg-white rounded shadow-md border border-slate-200/80 px-1.5 py-1 flex items-center gap-1">
              <Trophy className="w-2.5 h-2.5 text-[#1C386E] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[0.5rem] font-semibold uppercase text-slate-500 leading-tight">{lang === 'ca' ? 'Objectiu' : lang === 'es' ? 'Objetivo' : 'Goal'}</p>
                <p className="text-[0.55rem] font-bold text-slate-800 leading-tight break-words line-clamp-2">{lang === 'ca' ? 'Meta assolida' : lang === 'es' ? 'Meta alcanzada' : 'Goal reached'}</p>
              </div>
            </div>
          </div>

          {/* Floating notifications – half in / half out of screen (desktop only) */}
          <div className="hidden lg:block absolute left-0 top-[5%] -translate-x-[52%] z-20 w-[72%] max-w-[165px] sm:max-w-[180px]">
            <div className="bg-white rounded-lg shadow-md border border-[#1a2f52]/40 px-2.5 py-2 flex items-start gap-2">
              <div className="w-5 h-5 rounded-md bg-[#1C386E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-[#1C386E]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.55rem] font-semibold uppercase tracking-wide text-gray-500 leading-tight whitespace-nowrap truncate">
                  {lang === 'ca' ? 'La teva activitat' : lang === 'es' ? 'Tu actividad' : 'Your activity'}
                </p>
                <p className="text-[0.6rem] sm:text-[0.65rem] font-semibold text-gray-800 mt-0.5 leading-tight line-clamp-2">
                  {lang === 'ca' ? 'La Laura ha completat el Mòdul 3' : lang === 'es' ? 'Laura completó el Módulo 3' : 'Laura completed Module 3'}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute right-0 top-[22%] translate-x-[52%] z-20 w-[65%] max-w-[120px] sm:max-w-[130px]">
            <div className="bg-white rounded-lg shadow-md border border-[#1a2f52]/40 p-2 flex items-start gap-1.5">
              <div className="w-5 h-5 rounded-md bg-[#1C386E]/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-3 h-3 text-[#1C386E]" />
              </div>
              <div className="min-w-0">
                <p className="text-[0.55rem] font-semibold uppercase tracking-wide text-gray-500 leading-tight">
                  {lang === 'ca' ? 'El teu objectiu' : lang === 'es' ? 'Tu objetivo' : 'Your goal'}
                </p>
                <p className="text-[0.6rem] sm:text-[0.65rem] font-semibold text-gray-800 mt-0.5 leading-tight">
                  {lang === 'ca' ? 'Meta setmanal assolida' : lang === 'es' ? 'Meta semanal alcanzada' : 'Weekly goal reached'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstitutionBenefits = () => {
  const { lang } = useI18n();
  const bullets = [
    lang === 'ca'
      ? 'Aprèn en mòduls curts adaptats al teu nivell. Sense coneixements previs necessaris.'
      : lang === 'es'
      ? 'Aprende en módulos cortos adaptados a tu nivel. Sin conocimientos previos necesarios.'
      : 'Learn in short modules adapted to your level. No prior knowledge needed.',
    lang === 'ca'
      ? 'Coneixement que transforma el teu dia a dia: pressupost, estalvi, deute i inversió.'
      : lang === 'es'
      ? 'Conocimiento que transforma tu día a día: presupuesto, ahorro, deuda e inversión.'
      : 'Knowledge that transforms your daily decisions: budgeting, saving, debt and investing.',
    lang === 'ca'
      ? 'Segueix el teu progrés i mantén la motivació amb rachas i assoliments desblocables.'
      : lang === 'es'
      ? 'Sigue tu progreso y mantén la motivación con rachas y logros desbloqueables.'
      : 'Track your progress and stay motivated with streaks and unlockable achievements.',
    lang === 'ca'
      ? 'Disponible des del mòbil, l\'ordinador o la tauleta. Aprèn on siguis.'
      : lang === 'es'
      ? 'Disponible desde el móvil, el ordenador o la tablet. Aprende donde estés.'
      : 'Available on mobile, desktop or tablet. Learn wherever you are.',
  ];

  return (
    <section
      id="institutions"
      className="relative pt-6 pb-12 md:py-24 bg-[#0B3064] scroll-mt-32 md:scroll-mt-40 overflow-hidden"
    >
      <WaveShape
        className="absolute bottom-0 left-0 w-full h-[35%] text-[#5574A7] z-0"
        opacity={0.4}
        mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
            <ShieldCheck className="text-blue-200 w-4 h-4" />
            <span className="text-blue-100 font-bold tracking-[0.18em] uppercase text-[0.7rem]">
              {lang === 'ca' ? 'Per a tu' : lang === 'es' ? 'Para ti' : 'For you'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            {lang === 'ca'
              ? 'Educació financera dissenyada per a la teva vida real.'
              : lang === 'es'
              ? 'Educación financiera diseñada para tu vida real.'
              : 'Financial education designed for your real life.'}
          </h2>
          <p className="text-base sm:text-lg text-blue-100/90 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
            {lang === 'ca'
              ? 'No és teoria en un llibre. És pràctica que transforma com gestiones els teus diners.'
              : lang === 'es'
              ? 'No es teoría en un libro. Es práctica que transforma cómo gestionas tu dinero.'
              : "It's not textbook theory. It's practice that transforms how you manage money."}
          </p>
        </div>

        <ul className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10 md:mb-12">
          {bullets.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
              <span className="text-base leading-relaxed text-blue-50 font-semibold">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-center mb-10 md:mb-12">
          <Button href="/more-info" variant="primary">
            {lang === 'ca' ? 'Descobreix Finomik' : lang === 'es' ? 'Descubre Finomik' : 'Discover Finomik'}
          </Button>
        </div>

        <FadeInSection delay={150}>
          <div className="flex justify-center overflow-visible px-1 sm:px-0 md:-mx-4 lg:-mx-6">
            <InstitutionBenefitsPanel />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

// --- Segment Selector ---
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
            {lang === 'ca' ? 'Per a qui és' : lang === 'es' ? '¿Para quién es?' : 'Who is it for?'}
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
              ? 'Tant si ets un centre educatiu com una entitat financera, tenim una solució pensada per a tu.'
              : lang === 'es'
              ? 'Tanto si eres un centro educativo como una entidad financiera, tenemos una solución pensada para ti.'
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
                  ? 'Programa personalitzat per als teus alumnes. Tu tries els temes, nosaltres creem el camí.'
                  : lang === 'es'
                  ? 'Programa personalizado para tus alumnos. Tú eliges los temas, nosotros creamos el camino.'
                  : 'Personalised programme for your students. You choose the topics, we create the path.'}
              </p>
              <span className="inline-flex items-center gap-1 text-[#F5C518] font-bold text-sm group-hover:gap-2 transition-all">
                {lang === 'ca' ? 'Descobreix més' : lang === 'es' ? 'Descubre más' : 'Learn more'}
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
                  ? 'Clients més educats, decisions més sòlides. Finomik integra l\u2019educació financera al cor de la relació banc-client.'
                  : lang === 'es'
                  ? 'Clientes mejor educados, decisiones más sólidas. Finomik integra la educación financiera en el centro de la relación banco-cliente.'
                  : 'Better-educated clients, stronger decisions. Finomik brings financial education to the heart of the bank-client relationship.'}
              </p>
              <span className="inline-flex items-center gap-1 text-[#F5C518] font-bold text-sm group-hover:gap-2 transition-all">
                {lang === 'ca' ? 'Descobreix més' : lang === 'es' ? 'Descubre más' : 'Learn more'}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

// --- Por qué Finomik (unified, minimalist) ---
const WhyFinomik = () => {
  const { lang } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const items = [
    {
      icon: <Route className="w-5 h-5" />,
      title: lang === 'ca' ? 'Experiència guiada' : lang === 'es' ? 'Experiencia guiada' : 'Guided experience',
      body: lang === 'ca'
        ? 'Itineraris que eliminen la incertesa. Avances amb confiança, sense teoria desorganitzada ni exercicis desconnectats.'
        : lang === 'es'
        ? 'Itinerarios que eliminan la incertidumbre. Avanzas con confianza, sin teoría suelta ni ejercicios desconectados.'
        : 'Paths that remove the guesswork. Move forward with confidence—no loose theory, no disconnected exercises.',
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: lang === 'ca' ? 'Habilitats per a la vida real' : lang === 'es' ? 'Habilidades para la vida real' : 'Real-life skills',
      body: lang === 'ca'
        ? 'No només teoria: escenaris, reptes i feedback que preparen per a decisions de debò. El que aprens, ho apliques de seguida.'
        : lang === 'es'
        ? 'No solo teoría: escenarios, retos y feedback que preparan para decisiones reales. Lo que aprendes, lo aplicas de inmediato.'
        : 'Not just theory—scenarios, challenges and feedback for real decisions. What you learn, you use right away.',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: lang === 'ca' ? 'Al teu ritme' : lang === 'es' ? 'A tu ritmo' : 'At your own pace',
      body: lang === 'ca'
        ? 'Aprèn quan vulguis i des d\'on vulguis. El teu progrés es guarda i pots continuar en qualsevol moment, sense perdre el fil.'
        : lang === 'es'
        ? 'Aprende cuando quieras y desde donde quieras. Tu progreso se guarda y puedes continuar en cualquier momento, sin perder el hilo.'
        : 'Learn whenever and wherever you want. Your progress is saved so you can pick up right where you left off.',
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      title: lang === 'ca' ? 'Progrés visible' : lang === 'es' ? 'Progreso visible' : 'Visible progress',
      body: lang === 'ca'
        ? 'L\'aprenentatge gamificat triplica la retenció. Veu com avances per temes i celebra cada assoliment aconseguit.'
        : lang === 'es'
        ? 'El aprendizaje gamificado triplica la retención. Ve cómo avanzas por temas y celebra cada logro conseguido.'
        : 'Gamified learning triples retention. See your progress by topic and celebrate every milestone.',
    },
    {
      icon: <User className="w-5 h-5" />,
      title: lang === 'ca' ? 'Adaptat a cada persona' : lang === 'es' ? 'Adaptado a cada persona' : 'Personalised',
      body: lang === 'ca'
        ? 'Dificultat i ritme ajustables. Una plataforma per a qui comença i per a qui ja té base financera.'
        : lang === 'es'
        ? 'Dificultad y ritmo ajustables. Una plataforma para quien empieza y para quien ya tiene base financiera.'
        : 'Adjustable difficulty and pace. One platform for beginners and those with financial foundations alike.',
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: lang === 'ca' ? 'Sense argot financer' : lang === 'es' ? 'Sin jerga financiera' : 'No financial jargon',
      body: lang === 'ca'
        ? 'Explicacions clares, exemples propers, tasques aplicables de seguida. Menys tecnicismes, més comprensió i confiança.'
        : lang === 'es'
        ? 'Explicaciones claras, ejemplos cercanos, tareas aplicables de inmediato. Menos tecnicismos, más comprensión y confianza.'
        : 'Clear explanations, relatable examples, tasks you can apply straight away. Less jargon, more confidence.',
    },
  ];

  return (
    <section
      id="why-finomik"
      ref={sectionRef}
      className="py-20 md:py-28 bg-white relative scroll-mt-32 md:scroll-mt-40"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#5574A7] mb-3 block">
              {lang === 'ca' ? 'Per a tu' : lang === 'es' ? 'Para ti' : 'For you'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B3064] leading-tight">
              {lang === 'ca' ? 'Per què Finomik' : lang === 'es' ? 'Por qué Finomik' : 'Why Finomik'}
            </h2>
          </div>
          <p className="text-[#5574A7] text-sm md:text-base max-w-xs md:text-right leading-relaxed hidden md:block">
            {lang === 'ca'
              ? 'Sis raons per les quals Finomik transforma com gestiones els teus diners.'
              : lang === 'es'
              ? 'Seis razones por las que Finomik transforma cómo gestionas tu dinero.'
              : 'Six reasons Finomik transforms how you manage your money.'}
          </p>
        </motion.div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E8EDF5]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 md:p-9 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-[#0B3064] flex items-center justify-center">
                  <span className="text-[#F5C518]">{item.icon}</span>
                </div>
                <span className="text-[0.65rem] font-black text-[#C8D0DD] tracking-[0.2em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-[#0B3064] text-base mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[#3C4C67] text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};




// --- Social Proof Section ---
const SocialProof = () => {
  const { lang } = useI18n();
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      number: '77%',
      label:
        lang === 'ca'
          ? "dels adults creuen que l'educació financera és essencial per a la vida adulta"
          : lang === 'es'
          ? 'de adultos creen que la educación financiera es esencial para la vida adulta'
          : 'of adults say financial literacy is essential for adult life',
      source: 'OCDE / PISA, 2023',
      slug: 'educacion-financiera-colegios-ocde-pisa-2023',
    },
    {
      icon: <Users className="w-6 h-6" />,
      number: '33%',
      label:
        lang === 'ca'
          ? "dels adults del món és financerament competent"
          : lang === 'es'
          ? 'de los adultos en el mundo es financieramente competente'
          : 'of adults worldwide are financially literate',
      source: 'S&P Global FinLit Survey, 2015',
      slug: 'alfabetizacion-financiera-adultos-mundo-sp-global',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      number: '3x',
      label:
        lang === 'ca'
          ? "més retenció amb aprenentatge gamificat respecte als formats tradicionals"
          : lang === 'es'
          ? 'más retención con aprendizaje gamificado frente a formatos tradicionales'
          : 'higher retention with gamified learning vs traditional formats',
      source: 'Journal of Education Technology, 2021',
      slug: 'aprendizaje-gamificado-retencion-educacion-financiera',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <FadeInSection className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-finomik-light mb-3">
            {lang === 'ca' ? 'Per què ara' : lang === 'es' ? 'Por qué ahora' : 'Why now'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-finomik-navy leading-tight max-w-2xl mx-auto">
            {lang === 'ca'
              ? "L'educació financera és una prioritat creixent arreu del món."
              : lang === 'es'
              ? 'La educación financiera es una prioridad creciente en todo el mundo.'
              : 'Financial literacy is a growing priority across the world.'}
          </h2>
        </FadeInSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <FadeInSection key={i} delay={i * 120} visibleOnMobile>
              <Link
                to={`/articulo/${stat.slug}`}
                className="group block bg-[#f7f9fc] rounded-2xl p-7 border border-[#E8EDF5] hover:border-[#5574A7] hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-finomik-light">{stat.icon}</span>
                </div>
                <p className="text-4xl font-black text-finomik-navy mb-2">{stat.number}</p>
                <p className="text-sm text-[#3C4C67] leading-snug mb-3">{stat.label}</p>
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#8F9EB7]">{stat.source}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-[#5574A7] opacity-0 group-hover:opacity-100 transition-opacity">
                  {lang === 'ca' ? 'Llegir article →' : lang === 'es' ? 'Leer artículo →' : 'Read article →'}
                </span>
              </Link>
            </FadeInSection>
          ))}
        </div>
        <FadeInSection className="text-center">
          <Button href="/more-info" variant="primary">
            {lang === 'ca' ? 'Descobreix Finomik' : lang === 'es' ? 'Descubre Finomik' : 'Discover Finomik'}
          </Button>
        </FadeInSection>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = useI18n();
  return (
    <footer className="overflow-hidden">
      {/* Top zone — #114076 with tagline + CTA */}
      <div className="bg-[#114076] relative pt-16 pb-40 text-center overflow-hidden">
        <WaveShape
          className="absolute bottom-0 left-0 w-full h-[55%] text-[#0B3064] z-0"
          opacity={1}
          mobilePath="M0,80 C480,110 960,50 1440,80 L1440,160 L0,160 Z"
        />
        <div className="relative z-10">
          <p className="text-2xl md:text-3xl font-black text-white leading-snug max-w-xl mx-auto mb-8">
            {lang === 'ca'
              ? "Fer de l\u2019educaci\u00f3 financera la norma, no l\u2019excepci\u00f3."
              : lang === 'es'
              ? 'Hacer de la educaci\u00f3n financiera la norma, no la excepci\u00f3n.'
              : 'Making financial education the standard, not an exception.'}
          </p>
          <Link
            to="/more-info"
            className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-7 py-3.5 rounded-xl text-sm hover:bg-yellow-400 transition-colors"
          >
            {lang === 'ca' ? 'Sol\u00b7licitar informaci\u00f3' : lang === 'es' ? 'Solicitar informaci\u00f3n' : 'Request information'}
          </Link>
        </div>
      </div>

      {/* Bottom zone — #0B3064 */}
      <div className="bg-[#0B3064] pt-6 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          {/* Contact info row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-5 text-xs text-white/50">
            <a href="mailto:info@finomik.com" className="hover:text-white transition-colors">info@finomik.com</a>
            <a href="tel:+34673319335" className="hover:text-white transition-colors">+34 673 319 335</a>
            <a href="https://www.linkedin.com/company/finomik" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          {/* Legal row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 border-t border-white/10 pt-5">
            <span>© {new Date().getFullYear()} Finomik. Financial Education.</span>
            <nav className="flex gap-5">
              <Link to="/contact" className="hover:text-white transition-colors">
                {lang === 'ca' ? 'Contacte' : lang === 'es' ? 'Contacto' : 'Contact'}
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                {lang === 'ca' ? 'Privadesa' : lang === 'es' ? 'Privacidad' : 'Privacy'}
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                {lang === 'ca' ? 'Termes' : lang === 'es' ? 'T\u00e9rminos' : 'Terms'}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const { lang } = useI18n();

  const titles = {
    es: 'Finomik – Educación financiera gamificada',
    en: 'Finomik – Gamified Financial Literacy Platform',
    ca: 'Finomik – Educació financera gamificada',
  };

  const descriptions = {
    es: 'Finomik es la plataforma gamificada de educación financiera. Aprende a gestionar tu dinero con módulos interactivos, gamificación y seguimiento de tu progreso.',
    en: 'Finomik is the gamified financial literacy platform. Learn to manage your money with interactive modules, gamification, and progress tracking.',
    ca: "Finomik és la plataforma gamificada d'educació financera. Aprèn a gestionar els teus diners amb mòduls interactius, gamificació i seguiment del teu progrés.",
  };

  const currentTitle = titles[lang] ?? titles.es;
  const currentDescription = descriptions[lang] ?? descriptions.es;

  return (
    <div id="top" className="min-h-screen font-sans overflow-x-hidden">
      <SeoHead title={currentTitle} description={currentDescription} path="/" lang={lang} />
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;