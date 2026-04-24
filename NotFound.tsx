import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useI18n } from './i18n';

export default function NotFound() {
  const { lang } = useI18n();
  return (
    <div className="min-h-screen bg-white text-finomik-navy font-sans">
      <SeoHead title="Page Not Found | Finomik" description="The page you are looking for could not be found." path="/404" noindex />
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="Finomik - Home">
            <img src="/logo-finomik-on-white.png" alt="Finomik" className="h-10 w-auto" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-finomik-navy font-semibold hover:text-finomik-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {lang === 'es' ? 'Volver a inicio' : 'Back to home'}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16 max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-finomik-navy mb-4">
          {lang === 'es' ? 'Página no encontrada' : 'Page not found'}
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          {lang === 'es'
            ? 'La página que buscas no existe. Puedes volver a la página de inicio para continuar.'
            : 'The page you are looking for does not exist. You can return to the homepage to continue.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm bg-accent-gradient text-white hover:opacity-95 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          {lang === 'es' ? 'Volver a inicio' : 'Back to home'}
        </Link>
      </main>
    </div>
  );
}
