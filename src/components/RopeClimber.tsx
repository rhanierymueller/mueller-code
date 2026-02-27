import { useEffect, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const sections = [
  { id: 'inicio',   label: { pt: 'Início',   en: 'Home'     } },
  { id: 'sobre',    label: { pt: 'Sobre',     en: 'About'    } },
  { id: 'stack',    label: { pt: 'Stack',     en: 'Stack'    } },
  { id: 'projetos', label: { pt: 'Projetos',  en: 'Projects' } },
];

/**
 * Astronaut with organic, curved body:
 *  - Torso: bezier path (wide shoulders → tapered waist → rounded hips)
 *  - Arms:  quadratic bezier curves (not straight lines)
 *  - Legs:  tapered filled paths with real volume
 *  - phase = scrollY * 0.08 → limbs animate with scroll direction
 */
function ClimbingAstronaut({ phase }: { phase: number }) {
  const s = Math.sin(phase);
  const c = Math.cos(phase);

  // Hands grip rope (x=22) at alternating heights
  const leftHandY  = 25 - 10 * s;  // ~15 to ~35
  const rightHandY = 25 + 10 * s;  // ~15 to ~35 (opposite)

  // Legs swing offset by 90° from arms
  const legSwing = c * 5;

  return (
    <svg
      width="48"
      height="72"
      viewBox="0 0 48 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter:
          'drop-shadow(0 0 8px rgba(0,212,255,0.8)) drop-shadow(0 0 2px rgba(0,212,255,1))',
        overflow: 'visible',
      }}
    >
      {/* ── HELMET ─────────────────────────────────── */}
      {/* Outer helmet — slightly oval */}
      <ellipse cx="24" cy="13" rx="11" ry="11.5"
        fill="rgba(14,165,233,0.09)" stroke="#00d4ff" strokeWidth="1.6" />
      {/* Inner ring */}
      <ellipse cx="24" cy="13" rx="8.5" ry="9"
        fill="none" stroke="rgba(0,212,255,0.18)" strokeWidth="0.7" />
      {/* Visor (golden tint) */}
      <path d="M 16 10 Q 16 5 24 5 Q 32 5 32 10 L 32 16 Q 32 20 24 20 Q 16 20 16 16 Z"
        fill="rgba(234,179,8,0.16)" stroke="rgba(234,179,8,0.65)" strokeWidth="1" />
      {/* Visor glare */}
      <path d="M 17.5 8.5 Q 20 6.5 25.5 7.5"
        stroke="rgba(255,255,255,0.5)" strokeWidth="0.9" strokeLinecap="round" />
      {/* Helmet side bolts */}
      <circle cx="13" cy="13" r="1.4" fill="rgba(0,212,255,0.4)" stroke="#00d4ff" strokeWidth="0.7" />
      <circle cx="35" cy="13" r="1.4" fill="rgba(0,212,255,0.4)" stroke="#00d4ff" strokeWidth="0.7" />

      {/* ── NECK RING ──────────────────────────────── */}
      <rect x="20" y="23.5" width="8" height="4" rx="2"
        fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="1.2" />

      {/* ── TORSO (organic path: wide shoulders → waist → hips) ────── */}
      {/*
          Control points create the spacesuit silhouette:
          - shoulder line curves up gently at center
          - sides curve inward at waist (~y=37)
          - hips curve back out at bottom (~y=46)
      */}
      <path
        d="M 12 28
           Q 24 23.5 36 28
           Q 37.5 37 34 46
           Q 24 50 14 46
           Q 10.5 37 12 28 Z"
        fill="rgba(14,165,233,0.07)"
        stroke="#00d4ff"
        strokeWidth="1.5"
      />
      {/* Chest panel */}
      <rect x="19" y="29" width="10" height="10" rx="3"
        fill="rgba(0,212,255,0.05)" stroke="rgba(0,212,255,0.3)" strokeWidth="0.8" />
      {/* Control buttons */}
      <circle cx="22"   cy="32"  r="1.1" fill="#00d4ff" opacity="0.9" />
      <circle cx="26"   cy="32"  r="1.1" fill="#7c3aed" opacity="0.9" />
      <circle cx="24"   cy="35.5" r="0.9" fill="#00d4ff" opacity="0.55" />
      {/* Center suit seam */}
      <line x1="24" y1="27" x2="24" y2="46"
        stroke="rgba(0,212,255,0.15)" strokeWidth="0.8" />

      {/* ── LEFT ARM — curved bezier from shoulder to rope ─────────── */}
      <path
        d={`M 14 31 Q 8 ${(31 + leftHandY) / 2} 24 ${leftHandY}`}
        stroke="#00d4ff" strokeWidth="2.4" strokeLinecap="round" fill="none"
      />
      {/* Left glove */}
      <circle cx="24" cy={leftHandY} r="3.2"
        fill="rgba(0,212,255,0.2)" stroke="#00d4ff" strokeWidth="1.4" />
      <circle cx="24" cy={leftHandY} r="1.2" fill="#00d4ff" opacity="0.8" />

      {/* ── RIGHT ARM — curved bezier, opposite phase ───────────────── */}
      <path
        d={`M 34 31 Q 40 ${(31 + rightHandY) / 2} 24 ${rightHandY}`}
        stroke="#00d4ff" strokeWidth="2.4" strokeLinecap="round" fill="none"
      />
      {/* Right glove */}
      <circle cx="24" cy={rightHandY} r="3.2"
        fill="rgba(0,212,255,0.2)" stroke="#00d4ff" strokeWidth="1.4" />
      <circle cx="24" cy={rightHandY} r="1.2" fill="#00d4ff" opacity="0.8" />

      {/* ── WAIST RING ─────────────────────────────── */}
      <path d="M 14 46 Q 24 50 34 46"
        stroke="#00d4ff" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* ── LEFT LEG — tapered filled path ─────────── */}
      <path
        d={`
          M ${16 - legSwing * 0.4} 47
          Q ${15 - legSwing * 0.7} 53 ${14 - legSwing} 60
          L  ${18 - legSwing} 60
          Q ${19 - legSwing * 0.7} 53 ${20 - legSwing * 0.4} 47
          Z
        `}
        fill="rgba(14,165,233,0.09)"
        stroke="#00d4ff"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* Left boot */}
      <ellipse cx={16 - legSwing} cy="62" rx="5.5" ry="2.8"
        fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.1" />
      {/* Boot sole line */}
      <path d={`M ${10.5 - legSwing} 63 Q ${16 - legSwing} 65 ${21.5 - legSwing} 63`}
        stroke="rgba(0,212,255,0.4)" strokeWidth="0.7" fill="none" />

      {/* ── RIGHT LEG — opposite swing ──────────────── */}
      <path
        d={`
          M ${28 + legSwing * 0.4} 47
          Q ${29 + legSwing * 0.7} 53 ${30 + legSwing} 60
          L  ${34 + legSwing} 60
          Q ${33 + legSwing * 0.7} 53 ${32 + legSwing * 0.4} 47
          Z
        `}
        fill="rgba(14,165,233,0.09)"
        stroke="#00d4ff"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* Right boot */}
      <ellipse cx={32 + legSwing} cy="62" rx="5.5" ry="2.8"
        fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1.1" />
      {/* Boot sole line */}
      <path d={`M ${26.5 + legSwing} 63 Q ${32 + legSwing} 65 ${37.5 + legSwing} 63`}
        stroke="rgba(0,212,255,0.4)" strokeWidth="0.7" fill="none" />
    </svg>
  );
}

interface RopeClimberProps {
  lang: 'pt' | 'en';
}

export default function RopeClimber({ lang }: RopeClimberProps) {
  const { progress, scrollY } = useScrollProgress();
  const [activeSection, setActiveSection] = useState('inicio');
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const climbPhase = scrollY * 0.08;

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => e.isIntersecting && setActiveSection(id)),
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const ROPE_TOP    = 48;
  const ROPE_BOTTOM = viewportHeight - 48;
  const ROPE_LENGTH = ROPE_BOTTOM - ROPE_TOP;
  const charY = ROPE_TOP + progress * (ROPE_LENGTH - 72) - 12;

  return (
    <div
      className="fixed right-6 top-0 h-screen z-50 hidden lg:flex flex-col items-center pointer-events-none select-none"
      style={{ width: 56 }}
    >
      {/* Rope line */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: ROPE_TOP,
          bottom: 48,
          width: 2,
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(0,212,255,0.15) 8%, rgba(0,212,255,0.4) 40%, rgba(0,212,255,0.4) 60%, rgba(0,212,255,0.15) 92%, transparent 100%)',
        }}
      />

      {/* Section dots */}
      {sections.map((section, i) => {
        const dotY = ROPE_TOP + (i / (sections.length - 1)) * (ROPE_LENGTH - 72);
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-auto group flex items-center"
            style={{ top: dotY - 5, zIndex: 53 }}
            title={section.label[lang]}
          >
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: isActive ? '#00d4ff' : 'rgba(0,212,255,0.18)',
                boxShadow: isActive
                  ? '0 0 8px #00d4ff, 0 0 18px rgba(0,212,255,0.5)'
                  : 'none',
                transform: isActive ? 'scale(1.4)' : 'scale(1)',
                border: isActive ? 'none' : '1px solid rgba(0,212,255,0.3)',
              }}
            />
            <span
              className="absolute right-full mr-3 text-xs font-semibold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
              style={{
                textShadow: '0 0 10px rgba(0,212,255,0.8)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {section.label[lang]}
            </span>
          </button>
        );
      })}

      {/* Astronaut */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: charY, zIndex: 54, transform: 'translateX(-50%)' }}
      >
        <ClimbingAstronaut phase={climbPhase} />
      </div>
    </div>
  );
}
