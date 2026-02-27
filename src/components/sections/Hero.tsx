import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang].hero;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const letters = 'RHANIERY MUELLER'.split('');

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0ea5e9, #7c3aed)' }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00d4ff, #0ea5e9)' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-5xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-cyan-400 text-lg md:text-xl font-medium tracking-widest uppercase"
          style={{ letterSpacing: '0.2em' }}
        >
          {tx.greeting}
        </motion.p>

        {/* Name with stagger */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-2" aria-label="Mueller Code">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.05,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className={`text-5xl md:text-8xl font-bold tracking-tight ${
                letter === ' ' ? 'w-4 md:w-8' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-300 h-8 flex items-center"
        >
          <TypeAnimation
            sequence={tx.roles}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-cyan-300 font-medium"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <button
            onClick={() => scrollTo('projetos')}
            className="group relative px-8 py-3.5 rounded-xl text-base font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
              boxShadow: '0 0 30px rgba(0,212,255,0.3)',
            }}
          >
            <span className="relative z-10 text-white">{tx.cta1}</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button
            onClick={() => scrollTo('contato')}
            className="group px-8 py-3.5 rounded-xl text-base font-semibold border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'rgba(0,212,255,0.5)',
              color: '#00d4ff',
              background: 'rgba(0,212,255,0.05)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 20px rgba(0,212,255,0.2)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#00d4ff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,212,255,0.5)';
            }}
          >
            {tx.cta2}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs tracking-widest uppercase opacity-60">{tx.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
