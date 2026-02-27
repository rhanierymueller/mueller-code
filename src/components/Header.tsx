import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';
import type { Lang } from '../context/LanguageContext';

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
];

function LangDropdown({ isMobile = false }: { isMobile?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === lang)!;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 px-3 py-1.5 rounded-lg"
        style={{
          color: '#00d4ff',
          border: '1px solid rgba(0,212,255,0.3)',
          background: open ? 'rgba(0,212,255,0.1)' : 'rgba(0,212,255,0.05)',
        }}
      >
        <span>{current.flag}</span>
        <span className={isMobile ? '' : 'hidden sm:inline'}>{current.code.toUpperCase()}</span>
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 rounded-xl overflow-hidden z-50"
            style={{
              background: 'rgba(10,10,20,0.96)',
              border: '1px solid rgba(0,212,255,0.15)',
              backdropFilter: 'blur(20px)',
              minWidth: 140,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150"
                style={{
                  color: lang === l.code ? '#00d4ff' : '#94a3b8',
                  background: lang === l.code ? 'rgba(0,212,255,0.08)' : 'transparent',
                  borderLeft: lang === l.code ? '2px solid #00d4ff' : '2px solid transparent',
                }}
              >
                <span className="text-base">{l.flag}</span>
                <span>{l.label}</span>
                {lang === l.code && (
                  <span className="ml-auto text-cyan-400 text-xs">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const { lang } = useLang();
  const tx = t[lang].nav;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: tx.home,     id: 'inicio'   },
    { label: tx.about,    id: 'sobre'    },
    { label: tx.stack,    id: 'stack'    },
    { label: tx.projects, id: 'projetos' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background:    scrolled ? 'rgba(7,7,16,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)'       : 'none',
        borderBottom:  scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Nome em texto */}
        <button
          onClick={() => scrollTo('inicio')}
          className="text-sm font-bold tracking-widest uppercase shrink-0"
          style={{
            background: 'linear-gradient(135deg, #ffffff, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.15em',
          }}
        >
          Mueller Code
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Right — lang dropdown + meeting */}
        <div className="hidden md:flex items-center gap-4">
          <LangDropdown />
          <a
            href={import.meta.env.VITE_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)', color: '#000' }}
          >
            {tx.meeting}
          </a>
        </div>

        {/* Mobile — lang dropdown + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LangDropdown isMobile />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(7,7,16,0.95)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-slate-300 hover:text-white py-2 border-b border-white/5 text-base font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={import.meta.env.VITE_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm font-semibold py-3 rounded-xl mt-2"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)', color: '#000' }}
                onClick={() => setIsOpen(false)}
              >
                {tx.meeting}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
