import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

interface LangString {
  es: string;
  en: string;
  ca: string;
}

interface PageFooterProps {
  topTitle?: LangString;
  ctaLabel?: LangString;
}

const WaveFooter = () => (
  <svg
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    className="absolute bottom-0 left-0 w-full h-[55%] text-[#0B3064] z-0"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
    />
  </svg>
);

export const PageFooter: React.FC<PageFooterProps> = ({ topTitle, ctaLabel }) => {
  const { lang } = useI18n();
  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';

  const defaultTitle: LangString = {
    es: 'Hacer de la educación financiera la norma, no la excepción.',
    en: 'Making financial education the standard, not an exception.',
    ca: "Fer de l'educació financera la norma, no l'excepció.",
  };

  const defaultCta: LangString = {
    es: 'Solicitar información',
    en: 'Request information',
    ca: 'Sol·licitar informació',
  };

  const title = topTitle ?? defaultTitle;
  const cta = ctaLabel ?? defaultCta;

  return (
    <footer className="overflow-hidden">
      {/* Top zone — wave + tagline + CTA */}
      <div className="bg-[#114076] relative pt-14 pb-36 text-center overflow-hidden">
        <WaveFooter />
        <div className="relative z-10 px-6">
          <p className="text-xl md:text-2xl font-black text-white leading-snug max-w-xl mx-auto mb-6">
            {title[l]}
          </p>
          <Link
            to="/more-info"
            className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-7 py-3.5 rounded-xl text-sm hover:bg-yellow-400 transition-colors"
          >
            {cta[l]}
          </Link>
        </div>
      </div>

      {/* Bottom zone — contact + legal */}
      <div className="bg-[#0B3064] pt-6 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-5 text-xs text-white/50">
            <a
              href="mailto:info@finomik.com?subject=Informaci%C3%B3n%20sobre%20Finomik&body=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Finomik."
              className="hover:text-white transition-colors"
            >
              info@finomik.com
            </a>
            <a href="tel:+34673319335" className="hover:text-white transition-colors">
              +34 673 319 335
            </a>
            <a
              href="https://www.linkedin.com/company/finomik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
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
                {lang === 'ca' ? 'Termes' : lang === 'es' ? 'Términos' : 'Terms'}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
