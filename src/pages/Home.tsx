import { useLang } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StarField from '../components/StarField';
import CustomCursor from '../components/CustomCursor';
import RopeClimber from '../components/RopeClimber';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import TechStack from '../components/sections/TechStack';
import Projects from '../components/sections/Projects';

export default function Home() {
  const { lang } = useLang();

  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: '#070710', fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Global background layers */}
      <StarField />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Rope climber sidebar nav */}
      <RopeClimber lang={lang} />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
      </main>

      <Footer />
    </div>
  );
}
