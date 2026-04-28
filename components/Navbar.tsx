import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../i18n';

const NAV_ITEMS = [
  { key: 'colegios', href: '/colegios' },
  { key: 'bancos', href: '/bancos' },
  { key: 'contact', href: '/contact' },
] as const;

const LANG_OPTIONS: { code: 'en' | 'es' | 'ca'; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
];

export const Navbar: React.FC = () => {
  const { lang, setLang } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const getLabel = (key: string) => {
    if (key === 'colegios') return lang === 'ca' ? 'Per als Col·legis' : lang === 'es' ? 'Para Colegios' : 'For Schools';
    if (key === 'bancos') return lang === 'ca' ? 'Per als Bancs' : lang === 'es' ? 'Para Bancos' : 'For Banks';
    return lang === 'ca' ? 'Contacte' : lang === 'es' ? 'Contacto' : 'Contact';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-3'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center min-h-[52px] md:min-h-[64px]">
        <Link
          to="/"
          className="flex items-center shrink-0"
          aria-label="Finomik - Home"
        >
          <img
            src={isScrolled ? '/logo-finomik-on-white.png' : '/logo-finomik-on-blue.png'}
            alt="Finomik"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center flex-nowrap gap-5 xl:gap-7 shrink-0">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`text-sm font-semibold transition-colors whitespace-nowrap ${isScrolled ? 'text-gray-600 hover:text-[#0B3064]' : 'text-gray-200 hover:text-white'}`}
            >
              {getLabel(item.key)}
            </Link>
          ))}
          <Link
            to="/more-info"
            className={`ml-4 inline-flex items-center justify-center px-5 py-2 rounded-lg font-bold text-xs tracking-wide transition-all whitespace-nowrap shrink-0 ${isScrolled ? 'bg-[#F5C518] text-[#0B3064] hover:bg-yellow-400' : 'bg-white text-[#0B3064] hover:bg-gray-100'}`}
          >
            {lang === 'ca' ? 'Sol·licitar informació' : lang === 'es' ? 'Solicitar información' : 'Request info'}
          </Link>
          <div className={`ml-6 flex items-center gap-0.5 rounded-full border overflow-hidden shrink-0 ${isScrolled ? 'border-[#C8D0DD]' : 'border-white/60'}`}>
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => setLang(opt.code)}
                className={`text-xs font-semibold px-2.5 py-1 min-w-[2rem] transition-colors ${
                  lang === opt.code
                    ? isScrolled ? 'bg-[#5574A7] text-white' : 'bg-white/20 text-white'
                    : isScrolled ? 'text-[#0B3064] hover:bg-[#f0f5fc]' : 'text-white/80 hover:bg-white/10'
                }`}
                aria-label={opt.code === 'en' ? 'English' : opt.code === 'es' ? 'Español' : 'Català'}
                aria-pressed={lang === opt.code}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-md"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-[#0B3064]' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-[#0B3064]' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#114076]/95 backdrop-blur-md border-t border-white/10 shadow-lg">
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                onClick={closeMenu}
                className="text-sm font-semibold text-white hover:text-blue-200 transition-colors py-2 block"
              >
                {getLabel(item.key)}
              </Link>
            ))}
            <Link
              to="/more-info"
              onClick={closeMenu}
              className="mt-2 inline-flex items-center justify-center px-8 py-3 rounded-lg font-bold text-sm bg-white text-[#0B3064] hover:bg-gray-100 transition-colors"
            >
              {lang === 'ca' ? 'Sol·licitar informació' : lang === 'es' ? 'Solicitar información' : 'Request info'}
            </Link>
            <div className="mt-3 flex gap-2 flex-wrap">
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

export default Navbar;
