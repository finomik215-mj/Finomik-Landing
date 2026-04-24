import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from './i18n';

function ErrorFallback() {
  const { lang } = useI18n();
  const title = lang === 'es' ? 'Algo ha ido mal' : 'Something went wrong';
  const description =
    lang === 'es'
      ? 'Ha ocurrido un error inesperado. Puedes intentar recargar la página o volver al inicio.'
      : 'An unexpected error occurred. You can try reloading the page or going back to the homepage.';
  const reloadLabel = lang === 'es' ? 'Recargar' : 'Reload';
  const backLabel = lang === 'es' ? 'Volver al inicio' : 'Back to home';
  const logoAriaLabel = lang === 'es' ? 'Finomik - Volver al inicio' : 'Finomik - Go to home';

  return (
    <div className="min-h-screen bg-white text-finomik-navy font-sans flex flex-col items-center justify-center px-6">
      <div className="mb-8">
        <Link to="/" aria-label={logoAriaLabel}>
          <img
            src="/logo-finomik-on-white.png"
            alt="Finomik - Financial Education"
            className="h-20 w-auto mx-auto"
          />
        </Link>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-finomik-navy mb-4 text-center">
        {title}
      </h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-sm bg-accent-gradient text-white hover:opacity-95 transition-colors"
        >
          {reloadLabel}
        </button>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-sm border-2 border-finomik-light text-finomik-navy hover:bg-accent-gradient hover:text-white hover:border-transparent transition-colors"
        >
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
