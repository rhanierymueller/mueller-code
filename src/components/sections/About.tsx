import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Globe } from 'lucide-react';
import { useLang } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import profileImg from '../../assets/image/profile.png';

// ⚠️  Atualize esses links com seus perfis reais
const socials = [
  {
    icon: Github,
    href: 'https://github.com/rhanierymueller',
    label: 'GitHub',
    color: '#ffffff',
    bg: 'rgba(255,255,255,0.08)',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/rhanierymueller',
    label: 'LinkedIn',
    color: '#0a66c2',
    bg: 'rgba(10,102,194,0.12)',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/muellercoding?igsh=bW1qem4xbjZnZ3N3&utm_source=qr',
    label: 'Instagram',
    color: '#e1306c',
    bg: 'rgba(225,48,108,0.1)',
  },
  {
    icon: Globe,
    href: 'https://muellercode.com',
    label: 'Website',
    color: '#00d4ff',
    bg: 'rgba(0,212,255,0.08)',
  },
];

export default function About() {
  const { lang } = useLang();
  const tx = t[lang].about;

  return (
    <section id="sobre" className="py-20 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
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

        <div className="flex flex-col md:flex-row items-center gap-14">

          {/* ── Profile image + social links ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'backOut' }}
            viewport={{ once: true }}
            className="relative flex-shrink-0 flex flex-col items-center gap-6"
          >
            {/* Rotating ring */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0%, #00d4ff 30%, transparent 60%, #7c3aed 90%, transparent 100%)',
                  WebkitMask:
                    'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))',
                }}
              />
              <div
                className="relative w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(0,212,255,0.25), 0 0 80px rgba(0,212,255,0.1)' }}
              >
                <img
                  src={profileImg}
                  alt="Rhaniery Mueller"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 70% 20%, rgba(0,212,255,0.1), transparent 60%)',
                  }}
                />
              </div>
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              {socials.map(({ icon: Icon, href, label, color, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="group w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-115"
                  style={{ background: bg, border: `1px solid ${color}25` }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 16px ${color}50`;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}60`;
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${color}25`;
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
                  }}
                >
                  <Icon className="w-5 h-5 transition-colors duration-200" style={{ color }} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Text content ── */}
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Rhaniery{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Mueller
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-slate-300 text-lg leading-relaxed mb-4"
            >
              {tx.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-slate-400 text-base leading-relaxed mb-10"
            >
              {tx.description2}
            </motion.p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {tx.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left"
                >
                  <div
                    className="text-3xl md:text-4xl font-bold mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
