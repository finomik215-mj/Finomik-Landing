import React, { useEffect, useRef, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, ChevronRight, Brain, Target, BookOpen, Users, ShieldCheck, LineChart, Trophy } from 'lucide-react';
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
      className={`transition-all duration-700 transform ${show ? 'opacity-100 translate-y-0 translate-x-0' : hiddenTransform} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- InstitutionBenefitsPanel ---
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

  void activeIndex;

  return (
    <div ref={panelRef} className="relative font-sans">
      <div className="absolute -top-16 -right-10 w-56 h-56 bg-finomik-light/20 blur-3xl opacity-40 pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#5574A7]/15 blur-3xl opacity-40 pointer-events-none animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />

      <div className="relative px-1 py-3 md:p-2 flex flex-col items-center justify-center gap-3 md:gap-5 min-h-0">
        <div className={`relative w-full min-w-0 lg:w-[880px] xl:w-[960px] transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <div className="aspect-[16/10] w-full max-h-[44vh] min-h-[220px] sm:max-h-[48vh] sm:min-h-[260px] lg:max-h-none lg:min-h-0 flex flex-col">
          <div className="flex-1 min-h-0 flex flex-col rounded-2xl lg:rounded-3xl bg-slate-200 shadow-2xl overflow-hidden border border-slate-300/80">
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

            <div className="mt-0.5 mx-1 mb-1 sm:mt-1 sm:mx-2 lg:mt-1.5 lg:mx-5 lg:mb-1 rounded-lg lg:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 relative flex-1 min-h-0 flex flex-col">
              <div className="absolute inset-0 overflow-hidden">
              <div className="lg:hidden relative h-full p-1.5 sm:p-2 flex flex-col gap-1.5 min-h-0 overflow-auto bg-slate-50">
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
                          ? "Itinerari d'educació financera en marxa"
                          : lang === 'es'
                          ? 'Itinerario de educación financiera en marcha'
                          : 'Financial literacy journey in progress'}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 lg:px-3 lg:py-1.5 rounded-full bg-[#1C386E]/10 text-[#1C386E] text-[0.65rem] lg:text-xs font-semibold whitespace-nowrap">
                  {lang === 'ca' ? '78% completat' : lang === 'es' ? '78% completado' : '78% completed'}
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
                        78%
                      </span>
                    </div>
                    <div className="flex-1 space-y-1 lg:space-y-1.5 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#8F9EB7] flex-shrink-0" />
                        <span className="text-[0.55rem] md:text-[0.6rem] lg:text-xs text-slate-600">
                          {lang === 'ca'
                            ? '78% ha completat els seus mòduls assignats.'
                            : lang === 'es'
                            ? '78% completado: han terminado sus módulos asignados.'
                            : '78% have completed their assigned modules.'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#5574A7] flex-shrink-0" />
                        <span className="text-[0.55rem] md:text-[0.6rem] lg:text-xs text-slate-600">
                          {lang === 'ca'
                            ? '15% avança activament pels mòduls.'
                            : lang === 'es'
                            ? '15% avanza activamente en los módulos.'
                            : '15% are actively progressing.'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#3E5374] flex-shrink-0" />
                        <span className="text-[0.55rem] md:text-[0.6rem] lg:text-xs text-slate-600">
                          {lang === 'ca'
                            ? '7% encara no ha començat.'
                            : lang === 'es'
                            ? '7% aún no ha empezado y puede necesitar apoyo.'
                            : "7% haven't started yet."}
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

          {/* Floating notifications desktop */}
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

export default function Colegios() {
  const { lang } = useI18n();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <SeoHead
        title={l === 'es' ? 'Finomik para Colegios | Educación financiera para jóvenes' : l === 'ca' ? 'Finomik per a Col·legis | Educació financera per a joves' : 'Finomik for Schools | Financial education for young people'}
        description={l === 'es' ? 'Programa de educación financiera personalizado para colegios.' : 'Personalised financial education programme for schools.'}
        path="/colegios"
        lang={lang}
      />

      <Navbar />

      {/* ===================== HERO: WHITE, editorial ===================== */}
      <section className="bg-white pt-28 pb-24 md:pb-32 relative overflow-hidden">
        <WaveShape
          className="absolute bottom-0 left-0 w-full h-[30%] text-[#E8EDF5] z-0"
          opacity={1}
          path="M0,80 C360,140 1080,20 1440,80 L1440,160 L0,160 Z"
          mobilePath="M0,100 C480,140 960,60 1440,100 L1440,160 L0,160 Z"
        />
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#0B3064] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-8">
              {l === 'ca' ? 'Finomik per a Col·legis' : l === 'es' ? 'Finomik para Colegios' : 'Finomik for Schools'}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-[#0B3064] leading-[1.05] mb-8 max-w-4xl">
              {l === 'ca' ? "L'educació financera que els joves " : l === 'es' ? 'La educación financiera que los jóvenes ' : 'The financial education young people '}
              <span className="relative inline whitespace-nowrap">
                <span className="relative z-10">{l === 'ca' ? 'necessiten' : l === 'es' ? 'necesitan' : 'need'}</span>
                <span className="absolute left-0 right-0 bottom-0 h-[0.35em] bg-[#F5C518]/60 z-0 rounded-sm" style={{ bottom: '0.05em' }} />
              </span>
            </h1>
            <p className="text-[#3C4C67] text-xl leading-relaxed mb-10 max-w-2xl">
              {l === 'ca'
                ? "Un programa adaptat a cada centre, dissenyat per a resultats reals."
                : l === 'es'
                ? 'Un programa adaptado a cada colegio, diseñado para obtener resultados reales.'
                : 'A programme adapted to each school, designed for real results.'}
            </p>
            <Link
              to="/more-info"
              className="inline-flex items-center gap-2 bg-[#0B3064] text-white font-extrabold px-7 py-3.5 rounded-xl text-sm hover:bg-[#114076] transition-colors"
            >
              {l === 'ca' ? 'Sol·licitar informació' : l === 'es' ? 'Solicitar información' : 'Request information'}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== EL PROGRAMA: dark, bold numbered list ===================== */}
      <section className="bg-[#0B3064] py-20 md:py-24 relative overflow-hidden">
        <WaveShape className="absolute top-0 w-full h-[30%] text-white z-0 transform rotate-180" opacity={0.04} />
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <div className="mb-12">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-4">
                {l === 'ca' ? 'Personalització' : l === 'es' ? 'Personalización' : 'Customisation'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {l === 'ca' ? 'El programa és teu' : l === 'es' ? 'El programa es tuyo' : 'The programme is yours'}
              </h2>
            </div>
          </FadeInSection>

          <div className="divide-y divide-white/10">
            {[
              {
                num: '01',
                icon: <BookOpen className="w-5 h-5 text-[#F5C518]" />,
                title: { es: 'Tú eliges los temas', en: 'You choose the topics', ca: 'Tu tries els temes' },
                desc: { es: 'El colegio selecciona los contenidos financieros que quiere para sus alumnos.', en: 'The school selects the financial content it wants for its students.', ca: "El col·legi selecciona els continguts financers que vol per als seus alumnes." },
              },
              {
                num: '02',
                icon: <Brain className="w-5 h-5 text-[#F5C518]" />,
                title: { es: 'Finomik diseña el programa', en: 'Finomik builds the programme', ca: 'Finomik dissenya el programa' },
                desc: { es: 'Creamos un programa a medida, adaptado al número de alumnos y tiempos del centro.', en: 'We build a bespoke programme, adapted to your student numbers and school schedule.', ca: "Creem un programa a mida, adaptat al nombre d'alumnes i als temps del centre." },
              },
              {
                num: '03',
                icon: <Target className="w-5 h-5 text-[#F5C518]" />,
                title: { es: 'Los alumnos aprenden', en: 'Students learn', ca: 'Els alumnes aprenen' },
                desc: { es: 'Cada alumno avanza a su ritmo con módulos cortos e interactivos, guiados por IA.', en: 'Each student progresses at their own pace through short, interactive AI-guided modules.', ca: "Cada alumne avança al seu ritme amb mòduls curts i interactius, guiats per IA." },
              },
              {
                num: '04',
                icon: <Award className="w-5 h-5 text-[#F5C518]" />,
                title: { es: 'Todos al mismo nivel', en: 'Everyone at the same level', ca: 'Tots al mateix nivell' },
                desc: { es: 'Independientemente del ritmo, todos los alumnos terminan con el mismo nivel de competencia financiera.', en: 'Regardless of pace, all students finish with the same level of financial competency.', ca: "Independentment del ritme, tots els alumnes acaben amb el mateix nivell de competència financera." },
              },
            ].map((step, i) => (
              <FadeInSection key={i} delay={i * 80}>
                <div className="flex items-center gap-6 md:gap-10 py-7">
                  <span className="text-6xl md:text-8xl font-black leading-none select-none flex-shrink-0 w-16 md:w-28 text-right tabular-nums" style={{ color: 'rgba(255,255,255,0.07)' }}>
                    {step.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-black text-white mb-1">{step.title[l]}</h3>
                    <p className="text-white/55 text-sm md:text-base leading-relaxed">{step.desc[l]}</p>
                  </div>
                  <div className="hidden md:flex w-10 h-10 rounded-xl border border-white/20 items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== IA: light, statement + 3 insight cards ===================== */}
      <section className="bg-[#f0f5fc] py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-4">
                {l === 'ca' ? 'Intel·ligència Artificial' : l === 'es' ? 'Inteligencia Artificial' : 'Artificial Intelligence'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B3064]">
                {l === 'ca' ? 'Un camí financer per a cada alumne' : l === 'es' ? 'Un camino financiero para cada alumno' : 'A financial path for every student'}
              </h2>
            </div>
          </FadeInSection>

          {/* Central statement card */}
          <FadeInSection delay={100}>
            <div className="bg-[#0B3064] rounded-3xl p-8 md:p-12 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#114076] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-60" />
              <div className="relative z-10 max-w-3xl">
                <p className="text-2xl md:text-3xl font-black text-white leading-tight mb-5">
                  {l === 'ca'
                    ? '"Cada alumne avança al seu ritme. Tots arriben al mateix nivell."'
                    : l === 'es'
                    ? '"Cada alumno avanza a su ritmo. Todos llegan al mismo nivel."'
                    : '"Each student progresses at their own pace. All reach the same level."'}
                </p>
                <p className="text-white/65 text-base leading-relaxed">
                  {l === 'ca'
                    ? "La IA adapta la dificultat a cada alumne en temps real. Independentment del punt de partida, tots acaben amb el mateix nivell de competència financera."
                    : l === 'es'
                    ? 'La IA adapta la dificultad a cada alumno en tiempo real. Independientemente del punto de partida, todos terminan con el mismo nivel de competencia financiera.'
                    : 'AI adapts the difficulty to each student in real time. Regardless of starting point, all students finish with the same level of financial competency.'}
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* 3 insight cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: <Brain className="w-6 h-6 text-[#0B3064]" />,
                title: { es: 'Ritmo personalizado', en: 'Personalised pace', ca: 'Ritme personalitzat' },
                desc: { es: 'Módulos que se ajustan al nivel y velocidad de cada alumno.', en: "Modules that adjust to each student's level and speed.", ca: "Mòduls que s'adapten al nivell i velocitat de cada alumne." },
              },
              {
                icon: <Target className="w-6 h-6 text-[#0B3064]" />,
                title: { es: 'Mismo destino', en: 'Same destination', ca: 'Mateix destí' },
                desc: { es: 'Todos los caminos llevan al mismo nivel de competencia certificado.', en: 'All paths lead to the same certified competency level.', ca: "Tots els camins porten al mateix nivell de competència certificat." },
              },
              {
                icon: <Users className="w-6 h-6 text-[#0B3064]" />,
                title: { es: 'Sin alumnos perdidos', en: 'No student left behind', ca: 'Cap alumne enrere' },
                desc: { es: 'La IA detecta bloqueos en tiempo real y adapta el contenido para ayudar al alumno.', en: 'AI detects blocks in real time and adapts content to help the student through.', ca: "La IA detecta bloqueigs en temps real i adapta el contingut per ajudar l'alumne." },
              },
            ].map((insight, i) => (
              <FadeInSection key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-[#E8EDF5] shadow-sm h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FB] flex items-center justify-center mb-4">
                    {insight.icon}
                  </div>
                  <h3 className="font-black text-[#0B3064] text-base mb-2">{insight.title[l]}</h3>
                  <p className="text-[#3C4C67] text-sm leading-relaxed">{insight.desc[l]}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DASHBOARD DEL PROFESOR ===================== */}
      <section className="bg-[#114076] py-20 md:py-24 relative">
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
          <FadeInSection>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#F5C518] bg-white/10 px-3 py-1.5 rounded-full mb-4">
                {l === 'ca' ? 'Per al professor' : l === 'es' ? 'Para el profesor' : 'For teachers'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                {l === 'ca' ? 'Tu tens el control' : l === 'es' ? 'Tú tienes el control' : "You're in control"}
              </h2>
              <p className="text-white/65 text-lg max-w-2xl mx-auto">
                {l === 'ca'
                  ? "Segueix el progrés de cada alumne, detecta qui necessita ajuda i actua a temps."
                  : l === 'es'
                  ? 'Sigue el progreso de cada alumno, detecta quién necesita ayuda y actúa a tiempo.'
                  : "Track each student's progress, spot who needs help and act in time."}
              </p>
            </div>
            <InstitutionBenefitsPanel />
          </FadeInSection>
        </div>
      </section>

      {/* ===================== CERTIFICADOS: white, centered ===================== */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <FadeInSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EEF2FB] mb-6">
                <Award className="w-8 h-8 text-[#0B3064]" />
              </div>
              <span className="block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] mb-4">
                {l === 'ca' ? 'Reconeixement' : l === 'es' ? 'Reconocimiento' : 'Recognition'}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0B3064] mb-5">
                {l === 'ca' ? 'Cada alumne acaba amb un certificat' : l === 'es' ? 'Cada alumno termina con un certificado' : 'Every student finishes with a certificate'}
              </h2>
              <p className="text-[#3C4C67] text-lg leading-relaxed max-w-2xl mx-auto">
                {l === 'ca'
                  ? 'En completar el programa, cada alumne rep un certificat que acredita les habilitats financeres adquirides.'
                  : l === 'es'
                  ? 'Al completar el programa, cada alumno recibe un certificado que acredita las habilidades financieras adquiridas.'
                  : 'On completing the programme, every student receives a certificate recognising the financial skills they have acquired.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { es: 'Emitido digitalmente por Finomik', en: 'Issued digitally by Finomik', ca: 'Emès digitalment per Finomik' },
                { es: 'Incluye el nombre del alumno y el nivel alcanzado', en: "Includes the student's name and level reached", ca: "Inclou el nom de l'alumne i el nivell assolit" },
                { es: 'Compartible en LinkedIn y redes sociales', en: 'Shareable on LinkedIn and social networks', ca: 'Compartible a LinkedIn i xarxes socials' },
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#f8fafc] rounded-2xl p-6 border border-[#E8EDF5]">
                  <div className="w-6 h-6 rounded-full bg-[#EEF2FB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0B3064]" />
                  </div>
                  <span className="text-[#3C4C67] text-sm leading-relaxed">{point[l]}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ===================== CTA FINAL: dark ===================== */}
      <section className="bg-[#0B3064] py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
              {l === 'ca' ? 'Porta Finomik al teu centre' : l === 'es' ? 'Lleva Finomik a tu colegio' : 'Bring Finomik to your school'}
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
              {l === 'ca'
                ? "Explica'ns la situació del teu centre i crearem junts el programa que els teus alumnes necessiten."
                : l === 'es'
                ? 'Cuéntanos la situación de tu colegio y crearemos juntos el programa que tus alumnos necesitan.'
                : "Tell us about your school and we'll build the programme your students need together."}
            </p>
            <Link
              to="/more-info"
              className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-8 py-4 rounded-xl text-base hover:bg-yellow-400 transition-colors"
            >
              {l === 'ca' ? 'Sol·licitar informació' : l === 'es' ? 'Solicitar información' : 'Request information'}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </FadeInSection>
        </div>
      </section>

    </div>
  );
}
