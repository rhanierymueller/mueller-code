import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '#inicio', label: 'Início' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#portfolio', label: 'Portfólio' },
    { href: '#contato', label: 'Contato' },
    { href: import.meta.env.VITE_CALENDAR_URL, label: 'Agende uma reunião', external: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-gray-800 shadow-sm">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#inicio" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo Mueller Code" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold tracking-wide text-white">Mueller Code</span>
        </a>

        <ul className="hidden md:flex space-x-6 text-sm font-medium text-white">
          {links.map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="hover:text-blue-400 transition"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-black/90 border-t border-gray-700 px-6 py-4 space-y-4">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="block text-white text-sm hover:text-blue-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
