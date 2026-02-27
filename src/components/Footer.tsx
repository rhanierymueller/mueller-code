import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';
import { Github, Linkedin, Instagram } from 'lucide-react';
import logo from '/logo.png';

export default function Footer() {
  const { lang } = useLang();
  const tx = t[lang].footer;

  const socials = [
    { icon: Github, href: 'https://github.com/rhanierymueller', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/rhanierymueller/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/muellercoding?igsh=bW1qem4xbjZnZ3N3&utm_source=qr', label: 'Instagram' },
  ];

  return (
    <footer
      className="py-12 px-6 relative"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(7,7,16,0.8)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={logo} alt="Mueller Code" className="h-7 w-auto opacity-70" />
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Mueller Code. {tx.rights}
          </p>
        </div>

        {/* Made with */}
        <p className="text-slate-500 text-sm flex items-center gap-1.5">
          {tx.madeWith}{' '}
          <span
            className="font-semibold"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            React
          </span>{' '}
          {tx.by}
        </p>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
