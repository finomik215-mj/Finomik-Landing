import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Lock, MessageSquare, CheckCircle2, ChevronDown } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useI18n } from './i18n';

const Field = ({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-semibold text-[#0B3064]">
      {label}
      {required && <span className="text-[#5574A7] ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-[#C8D0DD] bg-white text-[#0B3064] placeholder:text-[#8F9EB7] focus:border-[#5574A7] focus:ring-2 focus:ring-[#5574A7]/20 outline-none transition-all text-sm min-h-[46px]';

const selectCls =
  'w-full px-4 py-3 rounded-xl border border-[#C8D0DD] bg-white text-[#0B3064] focus:border-[#5574A7] focus:ring-2 focus:ring-[#5574A7]/20 outline-none transition-all text-sm min-h-[46px] appearance-none cursor-pointer';

const SelectWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {children}
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8F9EB7] pointer-events-none" />
  </div>
);

export default function MoreInfo() {
  const { lang } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [fields, setFields] = useState({
    name: '',
    email: '',
    org: '',
    role: '',
    orgType: '',
    size: '',
    interest: '',
    phone: '',
    message: '',
    source: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const t = {
    back: { es: 'Volver', en: 'Back', ca: 'Tornar' },
    title: { es: 'Solicitar información', en: 'Request information', ca: "Sol·licitar informació" },
    badge: { es: 'Equipo Finomik', en: 'Finomik team', ca: "Equip Finomik" },
    hero: { es: 'Cuéntanos sobre ti y tu proyecto', en: 'Tell us about you and your project', ca: 'Explica\'ns sobre tu i el teu projecte' },
    heroSub: {
      es: 'Revisamos cada solicitud personalmente. Cuanta más información nos des, mejor podremos ayudarte.',
      en: 'We review every request personally. The more context you share, the better we can help.',
      ca: 'Revisem cada sol·licitud personalment. Com més context ens donis, millor podrem ajudar-te.',
    },
    trust1: { es: 'Respondemos en 24–48 h laborables', en: 'We reply within 24–48 business hours', ca: 'Responem en 24–48 h laborables' },
    trust2: { es: 'Tu información es confidencial y nunca se comparte', en: 'Your data is confidential and never shared', ca: 'La teva informació és confidencial i mai es comparteix' },
    trust3: { es: 'Sin compromiso. Una conversación, no una demo de ventas', en: 'No commitment. A conversation, not a sales pitch', ca: 'Sense compromís. Una conversa, no una demo de vendes' },
    fName: { es: 'Nombre completo', en: 'Full name', ca: 'Nom complet' },
    fEmail: { es: 'Correo electrónico', en: 'Email address', ca: 'Correu electrònic' },
    fOrg: { es: 'Empresa u organización (opcional)', en: 'Company or organisation (optional)', ca: 'Empresa o organització (opcional)' },
    fRole: { es: 'Tu cargo (opcional)', en: 'Your role (optional)', ca: 'El teu c\u00e0rrec (opcional)' },
    fOrgType: { es: 'Tipo de perfil', en: 'Profile type', ca: 'Tipus de perfil' },
    fSize: { es: 'Usuarios potenciales (opcional)', en: 'Potential users (optional)', ca: 'Usuaris potencials (opcional)' },
    fInterest: { es: '¿Qué buscas?', en: 'What are you looking for?', ca: 'Què estàs buscant?' },
    fPhone: { es: 'Teléfono (opcional)', en: 'Phone (optional)', ca: 'Telèfon (opcional)' },
    fSource: { es: '¿Cómo nos conociste? (opcional)', en: 'How did you hear about us? (optional)', ca: 'Com ens has conegut? (opcional)' },
    fMessage: { es: 'Contexto adicional (opcional)', en: 'Additional context (optional)', ca: 'Context addicional (opcional)' },
    msgPlaceholder: {
      es: 'Cuéntanos el contexto de tu proyecto, los objetivos que tienes o cualquier detalle que consideres relevante.',
      en: 'Share some context about your project, your goals, or any detail you think is relevant.',
      ca: "Comparteix el context del teu projecte, els teus objectius o qualsevol detall que consideris rellevant.",
    },
    submit: { es: 'Enviar solicitud', en: 'Send request', ca: "Enviar sol·licitud" },
    required: { es: 'Campos obligatorios', en: 'Required fields', ca: 'Camps obligatoris' },
    successTitle: { es: '¡Solicitud recibida!', en: 'Request received!', ca: 'Sol·licitud rebuda!' },
    successBody: {
      es: 'Gracias por contactar con nosotros. Te responderemos en un máximo de 48 horas laborables con los próximos pasos.',
      en: "Thanks for reaching out. We'll get back to you within 48 business hours with next steps.",
      ca: "Gràcies per contactar-nos. Et respondrem en un màxim de 48 hores laborables amb els propers passos.",
    },
    backHome: { es: 'Volver al inicio', en: 'Back to home', ca: 'Tornar a l\'inici' },
    phName: { es: 'Ana García', en: 'Jane Smith', ca: 'Anna Garcia' },
    phEmail: { es: 'ana@empresa.com', en: 'jane@company.com', ca: 'anna@empresa.cat' },
    phOrg: { es: 'Nombre de tu empresa', en: 'Your company name', ca: 'Nom de la teva empresa' },
    phPhone: { es: '+34 600 000 000', en: '+44 7700 000000', ca: '+34 600 000 000' },
    selectDefault: { es: 'Selecciona una opción', en: 'Select an option', ca: 'Selecciona una opció' },
    roleOptions: {
      es: ['Director / CEO', 'Responsable de formación', 'Responsable de producto', 'Responsable de innovación', 'Consultor / Asesor', 'Otro'],
      en: ['Director / CEO', 'Head of Learning & Development', 'Product Manager', 'Innovation Lead', 'Consultant / Advisor', 'Other'],
      ca: ['Director / CEO', 'Responsable de formació', 'Responsable de producte', 'Responsable d\'innovació', 'Consultor / Assessor', 'Altre'],
    },
    orgTypeOptions: {
      es: ['Particular / Individual', 'Banco o entidad financiera', 'Fintech o startup financiera', 'Aseguradora', 'Empresa de formación', 'Consultora', 'Escuela o universidad', 'Otro'],
      en: ['Individual / Personal', 'Bank or financial institution', 'Fintech or financial startup', 'Insurance company', 'Training provider', 'Consultancy', 'School or university', 'Other'],
      ca: ['Particular / Individual', 'Banc o entitat financera', 'Fintech o startup financera', 'Asseguradora', 'Empresa de formaci\u00f3', 'Consultora', 'Escola o universitat', 'Altre'],
    },
    sizeOptions: {
      es: ['Menos de 100 usuarios', '100–500 usuarios', '500–2.000 usuarios', '2.000–10.000 usuarios', 'Más de 10.000 usuarios'],
      en: ['Fewer than 100 users', '100–500 users', '500–2,000 users', '2,000–10,000 users', 'More than 10,000 users'],
      ca: ['Menys de 100 usuaris', '100–500 usuaris', '500–2.000 usuaris', '2.000–10.000 usuaris', 'Més de 10.000 usuaris'],
    },
    interestOptions: {
      es: ['Demo de la plataforma', 'Información sobre precios', 'Piloto con un grupo reducido', 'Colaboración o partnership', 'Solo quiero saber más'],
      en: ['Platform demo', 'Pricing information', 'Pilot with a small group', 'Partnership or collaboration', 'Just want to learn more'],
      ca: ['Demo de la plataforma', 'Informació sobre preus', 'Pilot amb un grup reduït', 'Col·laboració o partnership', 'Només vull saber-ne més'],
    },
    sourceOptions: {
      es: ['LinkedIn', 'Google / Búsqueda', 'Recomendación de alguien', 'Evento o conferencia', 'Prensa o media', 'Otro'],
      en: ['LinkedIn', 'Google / Search', 'Someone recommended us', 'Event or conference', 'Press or media', 'Other'],
      ca: ['LinkedIn', 'Google / Cerca', 'Recomanació d\'algú', 'Esdeveniment o conferència', 'Premsa o media', 'Altre'],
    },
  };

  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';
  const tx = (k: keyof typeof t) => (t[k] as Record<string, string>)[l];
  const txArr = (k: keyof typeof t) => (t[k] as Record<string, string[]>)[l];

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
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#0B3064] font-semibold hover:text-[#5574A7] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {tx('back')}
          </button>
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#5574A7]">
            Finomik
          </span>
        </div>
      </header>

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start pt-8 md:pt-12">

            {/* Left — info panel */}
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

              {/* Trust signals */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: Lock, text: tx('trust2') },
                  { icon: MessageSquare, text: tx('trust3') },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0B3064] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#F5C518]" />
                    </div>
                    <p className="text-sm text-[#3C4C67] leading-relaxed font-medium">{text}</p>
                  </div>
                ))}
              </div>

              {/* Finomik brand mark */}
              <div className="border-t border-[#C8D0DD] pt-6">
                <p className="text-xs text-[#8F9EB7] font-semibold uppercase tracking-wider mb-1">Finomik</p>
                <p className="text-xs text-[#8F9EB7] leading-relaxed">
                  {l === 'es'
                    ? 'Educación financiera gamificada. Hacemos que el dinero sea algo que todo el mundo entiende.'
                    : l === 'ca'
                    ? "Educació financera gamificada. Fem que els diners siguin alguna cosa que tothom entén."
                    : 'Gamified financial education. Making money something everyone understands.'}
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8EDF5] p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B3064] flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-7 h-7 text-[#F5C518]" />
                  </div>
                  <h2 className="text-2xl font-black text-[#0B3064] mb-3">{tx('successTitle')}</h2>
                  <p className="text-[#3C4C67] leading-relaxed max-w-sm mb-8">{tx('successBody')}</p>
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2 bg-[#0B3064] text-white font-extrabold px-6 py-3 rounded-xl text-sm hover:bg-[#114076] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {tx('backHome')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-lg font-extrabold text-[#0B3064] mb-0.5">{tx('title')}</h2>
                    <p className="text-xs text-[#8F9EB7]">
                      <span className="text-[#5574A7]">*</span> {tx('required')}
                    </p>
                  </div>

                  {/* Row 1: name + email */}
                  <div className="grid sm:grid-cols-2 gap-4 items-end">
                    <Field label={tx('fName')} required>
                      <input type="text" required value={fields.name} onChange={set('name')}
                        className={inputCls} placeholder={tx('phName')} />
                    </Field>
                    <Field label={tx('fEmail')} required>
                      <input type="email" required value={fields.email} onChange={set('email')}
                        className={inputCls} placeholder={tx('phEmail')} />
                    </Field>
                  </div>

                  {/* Row 2: org + role */}
                  <div className="grid sm:grid-cols-2 gap-4 items-end">
                    <Field label={tx('fOrg')}>
                      <input type="text" value={fields.org} onChange={set('org')}
                        className={inputCls} placeholder={tx('phOrg')} />
                    </Field>
                    <Field label={tx('fRole')}>
                      <SelectWrapper>
                        <select value={fields.role} onChange={set('role')} className={selectCls}>
                          <option value="">{tx('selectDefault')}</option>
                          {txArr('roleOptions').map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </SelectWrapper>
                    </Field>
                  </div>

                  {/* Row 3: org type + size */}
                  <div className="grid sm:grid-cols-2 gap-4 items-end">
                    <Field label={tx('fOrgType')}>
                      <SelectWrapper>
                        <select value={fields.orgType} onChange={set('orgType')} className={selectCls}>
                          <option value="">{tx('selectDefault')}</option>
                          {txArr('orgTypeOptions').map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </SelectWrapper>
                    </Field>
                    <Field label={tx('fSize')}>
                      <SelectWrapper>
                        <select value={fields.size} onChange={set('size')} className={selectCls}>
                          <option value="">{tx('selectDefault')}</option>
                          {txArr('sizeOptions').map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </SelectWrapper>
                    </Field>
                  </div>

                  {/* Interest */}
                  <Field label={tx('fInterest')} required>
                    <SelectWrapper>
                      <select required value={fields.interest} onChange={set('interest')} className={selectCls}>
                        <option value="">{tx('selectDefault')}</option>
                        {txArr('interestOptions').map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </SelectWrapper>
                  </Field>

                  {/* Row: phone + source */}
                  <div className="grid sm:grid-cols-2 gap-4 items-end">
                    <Field label={tx('fPhone')}>
                      <input type="tel" value={fields.phone} onChange={set('phone')}
                        className={inputCls} placeholder={tx('phPhone')} />
                    </Field>
                    <Field label={tx('fSource')}>
                      <SelectWrapper>
                        <select value={fields.source} onChange={set('source')} className={selectCls}>
                          <option value="">{tx('selectDefault')}</option>
                          {txArr('sourceOptions').map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </SelectWrapper>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label={tx('fMessage')}>
                    <textarea value={fields.message} onChange={set('message')} rows={4}
                      className={`${inputCls} min-h-[100px] resize-y`}
                      placeholder={tx('msgPlaceholder')} />
                  </Field>

                  {/* Privacy note */}
                  <p className="text-xs text-[#8F9EB7] flex items-center gap-1.5">
                    <Lock className="w-3 h-3 flex-shrink-0" />
                    {l === 'es'
                      ? 'Tus datos se tratan conforme a nuestra política de privacidad y nunca se ceden a terceros.'
                      : l === 'ca'
                      ? 'Les teves dades es tracten conforme a la nostra política de privacitat i mai es cedeixen a tercers.'
                      : 'Your data is handled in line with our privacy policy and never passed to third parties.'}
                  </p>

                  <button type="submit"
                    className="w-full bg-[#0B3064] text-white font-extrabold py-3.5 rounded-xl text-sm hover:bg-[#114076] transition-colors shadow-sm">
                    {tx('submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
