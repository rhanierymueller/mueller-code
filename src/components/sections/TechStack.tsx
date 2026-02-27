import { motion } from 'framer-motion';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import { techStacks } from '../../data/portfolio';
import ThreeScene from '../ThreeScene';

export default function TechStack() {
  const { lang } = useLang();
  const tx = t[lang].stack;

  return (
    <section id="stack" className="py-20 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-4"
          style={{ letterSpacing: '0.2em' }}
        >
          — {tx.title}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-3"
        >
          {tx.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-slate-400 text-lg mb-8"
        >
          {tx.subtitle}
        </motion.p>

        {/* 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-center text-slate-500 text-sm mb-4 tracking-widest uppercase">
            {tx.orbit}
          </p>
          <ThreeScene />
        </motion.div>

        {/* Tech cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {techStacks.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-2xl p-5 overflow-hidden cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${tech.bgColor}, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Logo + name */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    className="w-8 h-8 object-contain"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}
                  />
                  <span
                    className="text-lg font-semibold"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </span>
                </div>

                <p className="text-slate-400 text-sm">
                  {tech.description[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
