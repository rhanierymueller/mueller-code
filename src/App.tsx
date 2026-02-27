import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(7,7,16,0.95)',
            color: '#f8fafc',
            border: '1px solid rgba(0,212,255,0.2)',
            backdropFilter: 'blur(12px)',
          },
        }}
      />
      <Home />
    </LanguageProvider>
  );
}
