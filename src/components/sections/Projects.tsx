import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import { projects } from '../../data/portfolio';

export default function Projects() {
  const { lang } = useLang();
  const tx = t[lang].projects;

  return (
    <section id="projetos" className="py-32 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[300px] opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7c3aed, transparent)' }}
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
          className="text-slate-400 text-lg mb-16"
        >
          {tx.subtitle}
        </motion.p>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Image area */}
              <div className="relative h-56 overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))',
                    }}
                  >
                    <span className="text-6xl opacity-40">💻</span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.mock && (
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(124,58,237,0.4)',
                        border: '1px solid rgba(124,58,237,0.6)',
                        color: '#c4b5fd',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {tx.mock}
                    </span>
                  )}
                </div>

              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description[lang]}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(0,212,255,0.08)',
                        border: '1px solid rgba(0,212,255,0.2)',
                        color: '#67e8f9',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  {project.site && project.site !== '#' ? (
                    <a
                      href={project.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
                        color: '#000',
                        boxShadow: '0 0 15px rgba(0,212,255,0.3)',
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {tx.access}
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold opacity-40 cursor-not-allowed"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
                        color: '#000',
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {tx.access}
                    </span>
                  )}
                  {project.github && project.github !== '#' ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#e2e8f0',
                      }}
                    >
                      <Github className="w-4 h-4" />
                      {tx.github}
                    </a>
                  ) : (
                    <span
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold opacity-40 cursor-not-allowed"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: '#e2e8f0',
                      }}
                    >
                      <Github className="w-4 h-4" />
                      {tx.github}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
