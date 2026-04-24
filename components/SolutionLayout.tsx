import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../i18n';

interface SolutionLayoutProps {
  children: ReactNode;
}

const solutionNavItems = [
  { key: 'schools', to: '/solutions/schools' },
  { key: 'universities', to: '/solutions/universities' },
  { key: 'platform', to: '/solutions/platform' },
  { key: 'technology', to: '/solutions/technology' },
];

export function SolutionLayout({ children }: SolutionLayoutProps) {
  const { lang, toggleLang } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-finomik-navy font-sans overflow-x-hidden">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 md:px-12 py-3 flex justify-between items-center min-h-[52px]">
          <Link
            to="/"
            className="flex items-center gap-2 text-finomik-navy font-semibold hover:text-finomik-light transition-colors shrink-0"
          >
            <img src="/logo-finomik-on-white.png" alt="Finomik" className="h-8 w-auto max-h-8" />
          </Link>
          <nav className="hidden md:flex items-center gap-5">
            {solutionNavItems.map((item) => {
              const label =
                item.key === 'schools'
                  ? (lang === 'es' ? 'Instituciones educativas' : 'Educational institutions')
                  : item.key === 'universities'
                    ? (lang === 'es' ? 'Universidades' : 'Universities')
                    : item.key === 'platform'
                      ? (lang === 'es' ? 'Plataforma' : 'Platform')
                      : (lang === 'es' ? 'Tecnología' : 'Technology');
              return (
                <Link key={item.to} to={item.to} className="text-sm font-medium text-gray-600 hover:text-finomik-navy">
                  {label}
                </Link>
              );
            })}
            <Link
              to="/more-info"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-bold text-sm bg-accent-gradient text-white hover:opacity-95 transition-colors"
            >
              {lang === 'es' ? 'Solicitar información' : 'Request info'}
            </Link>
            <button
              type="button"
              onClick={toggleLang}
              className="ml-3 text-xs font-semibold px-3 py-1 rounded-full border border-finomik-light text-finomik-navy hover:bg-finomik-pale/40 transition-colors"
              aria-label={lang === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'}
            >
              {lang === 'es' ? 'ES' : 'EN'}
            </button>
          </nav>
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-finomik-navy focus:outline-none focus:ring-2 focus:ring-finomik-light focus:ring-offset-2"
            aria-label={isMenuOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-gray-50/95 backdrop-blur-sm">
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
              {solutionNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm font-medium text-finomik-navy py-3 px-2 rounded-lg hover:bg-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.key === 'schools'
                    ? (lang === 'es' ? 'Instituciones educativas' : 'Educational institutions')
                    : item.key === 'universities'
                      ? (lang === 'es' ? 'Universidades' : 'Universities')
                      : item.key === 'platform'
                        ? (lang === 'es' ? 'Plataforma' : 'Platform')
                        : (lang === 'es' ? 'Tecnología' : 'Technology')}
                </Link>
              ))}
              <Link
                to="/more-info"
                className="inline-flex items-center justify-center px-5 py-3 mt-2 rounded-lg font-bold text-sm bg-accent-gradient text-white hover:opacity-95 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {lang === 'es' ? 'Solicitar información' : 'Request info'}
              </Link>
              <button
                type="button"
                onClick={() => {
                  toggleLang();
                  setIsMenuOpen(false);
                }}
                className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-full border border-finomik-light text-xs font-semibold text-finomik-navy"
              >
                {lang === 'es' ? 'Ver en inglés' : 'Ver en español'}
              </button>
            </nav>
          </div>
        )}
      </header>
      <main className="min-w-0">{children}</main>
      <footer className="bg-finomik-navy text-white py-8 mt-16">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/logo-finomik-on-blue.png" alt="Finomik" className="h-8 md:h-10 w-auto max-w-full" />
          </Link>
          <div className="text-blue-200/80 text-sm max-w-full break-words">
            &copy; {new Date().getFullYear()} Finomik.{' '}
            {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <Link to="/privacy" className="text-sm text-blue-200 hover:text-white">
              {lang === 'es' ? 'Privacidad' : 'Privacy'}
            </Link>
            <Link to="/terms" className="text-sm text-blue-200 hover:text-white">
              {lang === 'es' ? 'Términos' : 'Terms'}
            </Link>
            <Link to="/more-info" className="text-sm text-blue-200 hover:text-white">
              {lang === 'es' ? 'Contacto' : 'Contact'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
