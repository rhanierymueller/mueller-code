import { createContext, useContext, useState, useEffect } from 'react';

export type Lang = 'pt' | 'en';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'pt',
  setLang: () => {},
  toggle: () => {},
});

function detectBrowserLang(): Lang {
  const langs = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const l of langs) {
    if (l.toLowerCase().startsWith('pt')) return 'pt';
    if (l.toLowerCase().startsWith('en')) return 'en';
  }
  return 'pt'; // fallback
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'pt') return stored as Lang;
    return detectBrowserLang();
  });

  const setLang = (l: Lang) => setLangState(l);
  const toggle  = () => setLangState(prev => (prev === 'pt' ? 'en' : 'pt'));

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
