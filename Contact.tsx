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

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-5 mb-12">

            {/* Three email cards — full width row */}
            <div className="sm:col-span-2 flex flex-col gap-3">
              {([
                { variant: 'hello',   label: tx('emailGeneral'), address: 'hello@finomik.com' },
                { variant: 'schools', label: tx('emailSchools'), address: 'schools@finomik.com' },
                { variant: 'banks',   label: tx('emailBanks'),   address: 'banks@finomik.com' },
              ] as const).map(({ variant, label, address }) => (
                <a
                  key={variant}
                  href={buildMailto(variant, lang)}
                  className="bg-white rounded-2xl border border-[#E8EDF5] shadow-sm px-5 py-4 flex items-center gap-4 hover:shadow-md hover:border-[#5574A7] transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0B3064] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#F5C518]" />
                  </div>
                  <p className="text-xs font-bold text-[#8F9EB7] uppercase tracking-widest w-28 flex-shrink-0">{label}</p>
                  <p className="text-[#0B3064] font-extrabold text-sm group-hover:text-[#5574A7] transition-colors">
                    {address}
                  </p>
                </a>
              ))}
            </div>

            {/* Phone + Location + LinkedIn — one row on desktop */}
            <div className="sm:col-span-2 grid sm:grid-cols-3 gap-4">
              <a
                href="tel:+34673319335"
                className="bg-white rounded-2xl border border-[#E8EDF5] shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:border-[#5574A7] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B3064] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#F5C518]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#8F9EB7] uppercase tracking-widest mb-1">
                    {tx('phoneLabel')}
                  </p>
                  <p className="text-[#0B3064] font-extrabold group-hover:text-[#5574A7] transition-colors whitespace-nowrap">
                    +34 673 319 335
                  </p>
                </div>
              </a>

              <div className="bg-white rounded-2xl border border-[#E8EDF5] shadow-sm p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B3064] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#F5C518]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#8F9EB7] uppercase tracking-widest mb-1">
                    {tx('locationLabel')}
                  </p>
                  <p className="text-[#0B3064] font-extrabold">
                    {tx('location')}
                  </p>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/company/finomik"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-[#E8EDF5] shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:border-[#5574A7] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B3064] flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-[#F5C518]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#8F9EB7] uppercase tracking-widest mb-1">
                    {tx('linkedinLabel')}
                  </p>
                  <p className="text-[#0B3064] font-extrabold group-hover:text-[#5574A7] transition-colors">
                    Finomik
                  </p>
                </div>
              </a>
            </div>
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
