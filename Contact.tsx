import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useI18n } from './i18n';
import { buildMailto } from './components/PageFooter';

export default function Contact() {
  const { lang } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';

  const t = {
    title:    { es: 'Contacto', en: 'Contact', ca: 'Contacte' },
    back:     { es: 'Volver', en: 'Back', ca: 'Tornar' },
    subtitle: {
      es: 'Estamos aqu\u00ed para ayudarte. Escr\u00edbenos o ll\u00e1manos y te responderemos lo antes posible.',
      en: "We\u2019re here to help. Write or call us and we\u2019ll get back to you as soon as possible.",
      ca: 'Som aqu\u00ed per ajudar-te. Escriu-nos o truca\u2019ns i et respondrem el m\u00e9s aviat possible.',
    },
    emailGeneral:  { es: 'General', en: 'General', ca: 'General' },
    emailSchools:  { es: 'Para Colegios', en: 'For Schools', ca: 'Per a Col\u00b7legis' },
    emailBanks:    { es: 'Para Bancos', en: 'For Banks', ca: 'Per a Bancs' },
    phoneLabel: { es: 'Tel\u00e9fono', en: 'Phone', ca: 'Tel\u00e8fon' },
    locationLabel: { es: 'Ubicaci\u00f3n', en: 'Location', ca: 'Ubicaci\u00f3' },
    location: { es: 'Barcelona, Espa\u00f1a', en: 'Barcelona, Spain', ca: 'Barcelona, Espanya' },
    linkedinLabel: { es: 'LinkedIn', en: 'LinkedIn', ca: 'LinkedIn' },
    cta:      { es: 'Solicitar informaci\u00f3n', en: 'Request information', ca: 'Sol\u00b7licitar informaci\u00f3' },
    ctaSub:   {
      es: '\u00bfPrefieres contarnos tu caso? Rellena el formulario y te contactamos.',
      en: 'Prefer to share your case? Fill in the form and we\u2019ll reach out.',
      ca: 'Prefereixes explicar-nos el teu cas? Omple el formulari i et contactem.',
    },
  };

  const tx = (k: keyof typeof t) => (t[k] as Record<string, string>)[l];

  return (
    <div className="min-h-screen bg-[#f0f5fc] font-sans overflow-x-hidden">
      <SeoHead
        title={`${tx('title')} | Finomik`}
        description={tx('subtitle')}
        path="/contact"
        lang={lang}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#E8EDF5] z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#0B3064] font-semibold hover:text-[#5574A7] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {tx('back')}
          </Link>
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#5574A7]">
            Finomik
          </span>
        </div>
      </header>

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">

          <h1 className="text-4xl md:text-5xl font-black text-[#0B3064] mb-4">
            {tx('title')}
          </h1>
          <p className="text-[#3C4C67] text-lg leading-relaxed mb-12 max-w-xl">
            {tx('subtitle')}
          </p>

          {/* Contact cards — all rows */}
          <div className="flex flex-col gap-3 mb-12">

            {/* Email rows */}
            {([
              { variant: 'hello',   label: tx('emailGeneral'), value: 'hello@finomik.com',   href: buildMailto('hello', lang),   icon: <Mail className="w-4 h-4 text-[#F5C518]" />,     clickable: true  },
              { variant: 'schools', label: tx('emailSchools'), value: 'schools@finomik.com', href: buildMailto('schools', lang), icon: <Mail className="w-4 h-4 text-[#F5C518]" />,     clickable: true  },
              { variant: 'banks',   label: tx('emailBanks'),   value: 'banks@finomik.com',   href: buildMailto('banks', lang),   icon: <Mail className="w-4 h-4 text-[#F5C518]" />,     clickable: true  },
              { variant: 'phone',   label: tx('phoneLabel'),   value: '+34 673 319 335',      href: 'tel:+34673319335',           icon: <Phone className="w-4 h-4 text-[#F5C518]" />,    clickable: true  },
              { variant: 'loc',     label: tx('locationLabel'),value: tx('location'),          href: null,                         icon: <MapPin className="w-4 h-4 text-[#F5C518]" />,   clickable: false },
              { variant: 'li',      label: 'LinkedIn',         value: 'Finomik',               href: 'https://www.linkedin.com/company/finomik', icon: <Linkedin className="w-4 h-4 text-[#F5C518]" />, clickable: true, external: true },
            ] as const).map(({ variant, label, value, href, icon, clickable, external }: any) => {
              const inner = (
                <>
                  <div className="w-9 h-9 rounded-xl bg-[#0B3064] flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <p className="text-xs font-bold text-[#8F9EB7] uppercase tracking-widest w-32 flex-shrink-0">{label}</p>
                  <p className="text-[#0B3064] font-extrabold text-sm group-hover:text-[#5574A7] transition-colors">
                    {value}
                  </p>
                </>
              );
              const base = "bg-white rounded-2xl border border-[#E8EDF5] shadow-sm px-5 py-4 flex items-center gap-4 transition-all";
              if (!clickable || !href) {
                return <div key={variant} className={base}>{inner}</div>;
              }
              return (
                <a
                  key={variant}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${base} group hover:shadow-md hover:border-[#5574A7]`}
                >
                  {inner}
                </a>
              );
            })}
          </div>

          {/* CTA to request form */}
          <div className="bg-[#0B3064] rounded-2xl p-8 text-center">
            <p className="text-white font-black text-xl mb-2">{tx('cta')}</p>
            <p className="text-white/60 text-sm mb-6">{tx('ctaSub')}</p>
            <Link
              to="/more-info"
              className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-7 py-3 rounded-xl text-sm hover:bg-yellow-400 transition-colors"
            >
              {tx('cta')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
