import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, MessageSquare, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useI18n } from './i18n';

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-[#C8D0DD] bg-white text-[#0B3064] placeholder:text-[#8F9EB7] focus:border-[#5574A7] focus:ring-2 focus:ring-[#5574A7]/20 outline-none transition-all text-sm min-h-[48px]';

const selectCls =
  'w-full px-4 pr-10 py-3 rounded-xl border border-[#C8D0DD] bg-white text-[#0B3064] focus:border-[#5574A7] focus:ring-2 focus:ring-[#5574A7]/20 outline-none transition-all text-sm min-h-[48px] appearance-none cursor-pointer';

const Field = ({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-semibold text-[#0B3064]">
      {label}{required && <span className="text-[#5574A7] ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const SelectWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {children}
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8F9EB7] pointer-events-none" />
  </div>
);

export default function MoreInfo() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 3;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [fields, setFields] = useState({
    name: '', email: '', phone: '',
    orgType: '', size: '',
    org: '', role: '', interest: '', message: '', source: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const set = (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFields(f => ({ ...f, [key]: e.target.value }));

  const handleBack = () => window.history.length > 1 ? navigate(-1) : navigate('/');

  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';

  const t = {
    back:         { es: 'Volver',             en: 'Back',               ca: 'Tornar' },
    title:        { es: 'Solicitar información', en: 'Request information', ca: 'Sol·licitar informació' },
    badge:        { es: 'Equipo Finomik',      en: 'Finomik team',       ca: 'Equip Finomik' },
    hero:         { es: '¿Cómo podemos ayudarte?', en: 'How can we help you?', ca: 'Com podem ajudar-te?' },
    heroSub:      {
      es: 'Revisamos cada solicitud personalmente. Cuanta más información nos des, mejor podremos ayudarte.',
      en: 'We review every request personally. The more context you share, the better we can help.',
      ca: 'Revisem cada sol·licitud personalment. Com més context ens donis, millor podrem ajudar-te.',
    },
    trust2:       { es: 'Tu información es confidencial y nunca se comparte', en: 'Your data is confidential and never shared', ca: 'La teva informació és confidencial i mai es comparteix' },
    trust3:       { es: 'Sin ningún compromiso. Solo una primera conversación para conocernos.', en: 'Absolutely no commitment. Just a first conversation to get to know each other.', ca: 'Sense cap compromís. Només una primera conversa per conèixer-nos.' },
    step1Title:   { es: 'Datos de contacto', en: 'Contact details', ca: 'Dades de contacte' },
    step2Title:   { es: 'Tu organización',   en: 'Your organisation', ca: 'La teva organització' },
    step3Title:   { es: 'Qué necesitas',     en: 'What you need',     ca: 'Què necessites' },
    fName:        { es: 'Nombre completo',    en: 'Full name',          ca: 'Nom complet' },
    fEmail:       { es: 'Correo electrónico', en: 'Email address',      ca: 'Correu electrònic' },
    fPhone:       { es: 'Teléfono (opcional)', en: 'Phone (optional)',   ca: 'Telèfon (opcional)' },
    fOrgType:     { es: 'Tipo de perfil',     en: 'Profile type',       ca: 'Tipus de perfil' },
    fSize:        { es: 'Usuarios potenciales (opcional)', en: 'Potential users (optional)', ca: 'Usuaris potencials (opcional)' },
    fOrg:         { es: 'Empresa u organización (opcional)', en: 'Company or organisation (optional)', ca: 'Empresa o organització (opcional)' },
    fRole:        { es: 'Tu cargo (opcional)', en: 'Your role (optional)', ca: 'El teu càrrec (opcional)' },
    fInterest:    { es: '¿Qué buscas?',      en: 'What are you looking for?', ca: 'Què estàs buscant?' },
    fSource:      { es: '¿Cómo nos conociste? (opcional)', en: 'How did you hear about us? (optional)', ca: 'Com ens has conegut? (opcional)' },
    fMessage:     { es: 'Algo más que quieras contarnos (opcional)', en: 'Anything else you want to share (optional)', ca: 'Alguna cosa més que ens vulguis explicar (opcional)' },
    msgPh:        {
      es: 'Contexto, objetivos o cualquier detalle relevante.',
      en: 'Context, goals, or any relevant detail.',
      ca: 'Context, objectius o qualsevol detall rellevant.',
    },
    next:         { es: 'Continuar',          en: 'Continue',           ca: 'Continuar' },
    prev:         { es: 'Atrás',              en: 'Back',               ca: 'Enrere' },
    submit:       { es: 'Enviar solicitud',   en: 'Send request',       ca: 'Enviar sol·licitud' },
    successTitle: { es: '¡Solicitud recibida!', en: 'Request received!', ca: 'Sol·licitud rebuda!' },
    successBody:  {
      es: 'Gracias por contactar con nosotros. Te responderemos en un máximo de 48 horas laborables con los próximos pasos.',
      en: "Thanks for reaching out. We'll get back to you within 48 business hours with next steps.",
      ca: 'Gràcies per contactar-nos. Et respondrem en un màxim de 48 hores laborables amb els propers passos.',
    },
    backHome:     { es: 'Volver al inicio',   en: 'Back to home',       ca: "Tornar a l'inici" },
    phName:       { es: 'Ana García',         en: 'Jane Smith',         ca: 'Anna Garcia' },
    phEmail:      { es: 'ana@empresa.com',    en: 'jane@company.com',   ca: 'anna@empresa.cat' },
    phOrg:        { es: 'Nombre de tu empresa', en: 'Your company name', ca: 'Nom de la teva empresa' },
    phPhone:      { es: '+34 600 000 000',    en: '+34 600 000 000',    ca: '+34 600 000 000' },
    sel:          { es: 'Selecciona...',       en: 'Select...',          ca: 'Selecciona...' },
    orgTypeOptions: {
      es: ['Particular / Individual', 'Banco o entidad financiera', 'Fintech o startup financiera', 'Aseguradora', 'Empresa de formación', 'Consultora', 'Escuela o universidad', 'Otro'],
      en: ['Individual / Personal', 'Bank or financial institution', 'Fintech or financial startup', 'Insurance company', 'Training provider', 'Consultancy', 'School or university', 'Other'],
      ca: ['Particular / Individual', 'Banc o entitat financera', 'Fintech o startup financera', 'Asseguradora', 'Empresa de formació', 'Consultora', 'Escola o universitat', 'Altre'],
    },
    sizeOptions: {
      es: ['Menos de 100 usuarios', '100–500 usuarios', '500–2.000 usuarios', '2.000–10.000 usuarios', 'Más de 10.000 usuarios'],
      en: ['Fewer than 100 users', '100–500 users', '500–2,000 users', '2,000–10,000 users', 'More than 10,000 users'],
      ca: ['Menys de 100 usuaris', '100–500 usuaris', '500–2.000 usuaris', '2.000–10.000 usuaris', 'Més de 10.000 usuaris'],
    },
    interestOptions: {
      es: ['Demo de la plataforma', 'Información sobre precios', 'Piloto con un grupo reducido', 'Colaboración o partnership', 'Otro'],
      en: ['Platform demo', 'Pricing information', 'Pilot with a small group', 'Partnership or collaboration', 'Other'],
      ca: ['Demo de la plataforma', 'Informació sobre preus', 'Pilot amb un grup reduït', 'Col·laboració o partnership', 'Altre'],
    },
    sourceOptions: {
      es: ['LinkedIn', 'Google / Búsqueda', 'Recomendación de alguien', 'Evento o conferencia', 'Prensa o media', 'Otro'],
      en: ['LinkedIn', 'Google / Search', 'Someone recommended us', 'Event or conference', 'Press or media', 'Other'],
      ca: ['LinkedIn', 'Google / Cerca', "Recomanació d'algú", 'Esdeveniment o conferència', 'Premsa o media', 'Altre'],
    },
  };

  const tx  = (k: keyof typeof t) => (t[k] as Record<string, string>)[l];
  const txA = (k: keyof typeof t) => (t[k] as Record<string, string[]>)[l];

  const stepTitles = [tx('step1Title'), tx('step2Title'), tx('step3Title')];

  const canProceedStep1 = fields.name.trim() !== '' && fields.email.trim() !== '';
  const canProceedStep2 = fields.orgType !== '';

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch('https://formspree.io/f/xpqkvboz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          '01_Nombre':              fields.name,
          '02_Email':               fields.email,
          '03_Teléfono':            fields.phone || '—',
          '04_Tipo de perfil':      fields.orgType,
          '05_Organización':        fields.org || '—',
          '06_Cargo':               fields.role || '—',
          '07_Usuarios potenciales': fields.size || '—',
          '08_Qué busca':           fields.interest,
          '09_Mensaje':             fields.message || '—',
          '10_Cómo nos conoció':    fields.source || '—',
          _language:                lang,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f5fc] font-sans overflow-x-hidden">
      <SeoHead
        title={`${tx('title')} | Finomik`}
        description={tx('heroSub')}
        path="/more-info"
        lang={lang}
        noindex
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#E8EDF5] z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button onClick={handleBack} className="flex items-center gap-2 text-[#0B3064] font-semibold hover:text-[#5574A7] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            {tx('back')}
          </button>
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#5574A7]">Finomik</span>
        </div>
      </header>

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start pt-8 md:pt-12">

            {/* Left panel */}
            <div className="lg:sticky lg:top-28">
              <span className="inline-block text-xs font-bold tracking-[0.18em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full mb-5">
                {tx('badge')}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-[#0B3064] leading-tight mb-4">
                {tx('hero')}
              </h1>
              <p className="text-[#3C4C67] leading-relaxed text-base mb-8">
                {tx('heroSub')}
              </p>
              <div className="space-y-4 mb-8">
                {([['trust2', Lock], ['trust3', MessageSquare]] as const).map(([key, Icon], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0B3064] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#F5C518]" />
                    </div>
                    <p className="text-sm text-[#3C4C67] leading-relaxed font-medium">{tx(key)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#C8D0DD] pt-6">
                <p className="text-xs text-[#8F9EB7] font-semibold uppercase tracking-wider mb-1">Finomik</p>
                <p className="text-xs text-[#8F9EB7] leading-relaxed">
                  {l === 'es' ? 'Educación financiera gamificada. Hacemos que el dinero sea algo que todo el mundo entiende.'
                  : l === 'ca' ? "Educació financera gamificada. Fem que els diners siguin alguna cosa que tothom entén."
                  : 'Gamified financial education. Making money something everyone understands.'}
                </p>
              </div>
            </div>

            {/* Right — form card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EDF5] overflow-hidden">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-14 px-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B3064] flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-7 h-7 text-[#F5C518]" />
                  </div>
                  <h2 className="text-2xl font-black text-[#0B3064] mb-3">{tx('successTitle')}</h2>
                  <p className="text-[#3C4C67] leading-relaxed max-w-sm mb-8">{tx('successBody')}</p>
                  <button onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 bg-[#0B3064] text-white font-extrabold px-6 py-3 rounded-xl text-sm hover:bg-[#114076] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    {tx('backHome')}
                  </button>
                </div>
              ) : (
                <>
                  {/* Step indicator */}
                  <div className="bg-[#f7f9fc] border-b border-[#E8EDF5] px-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                        <React.Fragment key={i}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                            i + 1 < step ? 'bg-[#0B3064] text-white' :
                            i + 1 === step ? 'bg-[#F5C518] text-[#0B3064]' :
                            'bg-[#E8EDF5] text-[#8F9EB7]'
                          }`}>
                            {i + 1 < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                          </div>
                          {i < TOTAL_STEPS - 1 && (
                            <div className={`flex-1 h-0.5 rounded-full transition-all ${i + 1 < step ? 'bg-[#0B3064]' : 'bg-[#E8EDF5]'}`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-[#8F9EB7] uppercase tracking-wider">
                      {l === 'es' ? `Paso ${step} de ${TOTAL_STEPS}` : l === 'ca' ? `Pas ${step} de ${TOTAL_STEPS}` : `Step ${step} of ${TOTAL_STEPS}`}
                      {' · '}
                      <span className="text-[#0B3064]">{stepTitles[step - 1]}</span>
                    </p>
                  </div>

                  <form onSubmit={handleNext} className="p-6 md:p-8 space-y-5">
                    {/* Step 1: Contact */}
                    {step === 1 && (
                      <>
                        <Field label={tx('fName')} required>
                          <input type="text" required value={fields.name} onChange={set('name')}
                            className={inputCls} placeholder={tx('phName')} />
                        </Field>
                        <Field label={tx('fEmail')} required>
                          <input type="email" required value={fields.email} onChange={set('email')}
                            className={inputCls} placeholder={tx('phEmail')} />
                        </Field>
                        <Field label={tx('fPhone')}>
                          <input type="tel" value={fields.phone} onChange={set('phone')}
                            className={inputCls} placeholder={tx('phPhone')} />
                        </Field>
                      </>
                    )}

                    {/* Step 2: Organisation */}
                    {step === 2 && (
                      <>
                        <Field label={tx('fOrgType')} required>
                          <SelectWrapper>
                            <select required value={fields.orgType} onChange={set('orgType')} className={selectCls}>
                              <option value="">{tx('sel')}</option>
                              {txA('orgTypeOptions').map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </SelectWrapper>
                        </Field>
                        <Field label={tx('fOrg')}>
                          <input type="text" value={fields.org} onChange={set('org')}
                            className={inputCls} placeholder={tx('phOrg')} />
                        </Field>
                        <div className="grid sm:grid-cols-2 gap-4 items-end">
                          <Field label={tx('fRole')}>
                            <input type="text" value={fields.role} onChange={set('role')}
                              className={inputCls}
                              placeholder={l === 'es' ? 'Ej: Director de innovación' : l === 'ca' ? "Ex: Director d'innovació" : 'e.g. Innovation Director'} />
                          </Field>
                          <Field label={tx('fSize')}>
                            <SelectWrapper>
                              <select value={fields.size} onChange={set('size')} className={selectCls}>
                                <option value="">{tx('sel')}</option>
                                {txA('sizeOptions').map(o => <option key={o} value={o}>{o}</option>)}
                              </select>
                            </SelectWrapper>
                          </Field>
                        </div>
                      </>
                    )}

                    {/* Step 3: Interest + message */}
                    {step === 3 && (
                      <>
                        <Field label={tx('fInterest')} required>
                          <SelectWrapper>
                            <select required value={fields.interest} onChange={set('interest')} className={selectCls}>
                              <option value="">{tx('sel')}</option>
                              {txA('interestOptions').map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </SelectWrapper>
                        </Field>
                        <Field label={tx('fMessage')}>
                          <textarea value={fields.message} onChange={set('message')} rows={3}
                            className={`${inputCls} min-h-[90px] resize-none`}
                            placeholder={tx('msgPh')} />
                        </Field>
                        <Field label={tx('fSource')}>
                          <SelectWrapper>
                            <select value={fields.source} onChange={set('source')} className={selectCls}>
                              <option value="">{tx('sel')}</option>
                              {txA('sourceOptions').map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </SelectWrapper>
                        </Field>
                        <p className="text-xs text-[#8F9EB7] flex items-center gap-1.5">
                          <Lock className="w-3 h-3 flex-shrink-0" />
                          {l === 'es' ? 'Tus datos se tratan conforme a nuestra política de privacidad y nunca se ceden a terceros.'
                          : l === 'ca' ? 'Les teves dades es tracten conforme a la nostra política de privacitat i mai es cedeixen a tercers.'
                          : 'Your data is handled in line with our privacy policy and never passed to third parties.'}
                        </p>
                      </>
                    )}

                    {/* Error message */}
                    {submitError && (
                      <p className="text-sm text-red-500 font-medium text-center bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                        {l === 'es' ? 'Ha habido un error al enviar. Por favor, inténtalo de nuevo o escríbenos a hello@finomik.com'
                        : l === 'ca' ? "Hi ha hagut un error en enviar. Si us plau, torna-ho a intentar o escriu-nos a hello@finomik.com"
                        : 'There was an error sending. Please try again or email us at hello@finomik.com'}
                      </p>
                    )}

                    {/* Navigation */}
                    <div className={`flex gap-3 pt-1 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                      {step > 1 && (
                        <button type="button" onClick={() => setStep(s => s - 1)}
                          disabled={isSubmitting}
                          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[#C8D0DD] text-[#0B3064] font-semibold text-sm hover:bg-[#f0f5fc] transition-colors disabled:opacity-40">
                          <ArrowLeft className="w-4 h-4" />
                          {tx('prev')}
                        </button>
                      )}
                      <button type="submit"
                        disabled={isSubmitting || (step === 1 ? !canProceedStep1 : step === 2 ? !canProceedStep2 : false)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B3064] text-white font-extrabold text-sm hover:bg-[#114076] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        {isSubmitting
                          ? (l === 'es' ? 'Enviando...' : l === 'ca' ? 'Enviant...' : 'Sending...')
                          : step === TOTAL_STEPS ? tx('submit') : tx('next')}
                        {!isSubmitting && step < TOTAL_STEPS && <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
