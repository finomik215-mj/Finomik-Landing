import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'en' | 'es' | 'ca';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'es';
    const stored = window.localStorage.getItem('finomik-lang');
    return stored === 'es' || stored === 'en' || stored === 'ca' ? stored : 'es';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('finomik-lang', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'en' ? 'es' : prev === 'es' ? 'ca' : 'en'));
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}

