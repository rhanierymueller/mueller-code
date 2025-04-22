// src/pages/MuellerCodeHome.tsx
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Code, Smartphone, Globe } from "lucide-react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { useCallback } from "react";
import serenaImg from "../assets/image/serena.png"; // ajuste o “..” até a pasta
import AuroraBackground from "../components/AuroraBackground";

export default function MuellerCodeHome() {
  // carregar presets do tsparticles
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  /* ---------- Conteúdo das seções ---------- */

  const services = [
    {
      icon: <Globe className="mx-auto w-10 h-10 text-white" />,
      title: "Websites",
      text: "Sites impactantes e responsivos com performance e estilo.",
    },
    {
      icon: <Smartphone className="mx-auto w-10 h-10 text-white" />,
      title: "Apps",
      text: "Aplicativos mobile e web com foco na experiência do usuário.",
    },
    {
      icon: <Code className="mx-auto w-10 h-10 text-white" />,
      title: "Soluções Personalizadas",
      text: "Sistemas sob medida para otimizar o seu negócio.",
    },
  ];

  const projects = [
    {
      title: "Serena AI",
      description: "Chatbot terapêutico com voz e LLM.",
      image: serenaImg,
      live: null,
      site: "https://serena-ai.vercel.app/",
    },
  ];

  return (
    <main className="relative isolate min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Aurora / partículas de fundo */}
      <AuroraBackground />
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 w-full h-full -z-20"
        options={{
          background: { color: { value: "#000000" } },
          fullScreen: { enable: false },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff", distance: 150, opacity: 0.3 },
            move: { enable: true, speed: 0.5, outModes: "bounce" },
            size: { value: { min: 1, max: 3 } },
            number: { value: 80 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
        }}
      />

      {/* ---------- NAVBAR ---------- */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-gray-800 shadow-sm">
  <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
    {/* LOGO + TÍTULO */}
    <a href="#inicio" className="flex items-center space-x-2">
      <img
        src="/logo.png"              // ← arquivo em public/
        alt="Logo Mueller Code"
        className="w-8 h-8 object-contain"  // ajuste tamanho se quiser
      />
      <span className="text-xl font-bold tracking-wide">
        Mueller&nbsp;Code
      </span>
    </a>

    {/* LINKS */}
    <ul className="flex space-x-6 text-sm font-medium">
      <li><a href="#inicio" className="hover:text-blue-400 transition">Início</a></li>
      <li><a href="#sobre" className="hover:text-blue-400 transition">Sobre</a></li>
      <li><a href="#servicos" className="hover:text-blue-400 transition">Serviços</a></li>
      <li><a href="#portfolio" className="hover:text-blue-400 transition">Portfólio</a></li>
      <li><a href="#contato" className="hover:text-blue-400 transition">Contato</a></li>
    </ul>
  </nav>
</header>

      {/* ---------- HERO ---------- */}
      <section id="inicio" className="h-screen flex flex-col items-center justify-center text-center p-6 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ rotate: -1 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
        >
          Mueller Code
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-xl md:text-2xl text-gray-300 max-w-xl"
        >
          Soluções digitais modernas com design de outro nível.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <a href="#contato">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-lg px-6 py-3 rounded-2xl shadow-[0_0_25px_#0ea5e925] transition-transform hover:scale-105">
              Fale conosco
            </Button>
          </a>
        </motion.div>
      </section>

      {/* ---------- SOBRE ---------- */}
      <section id="sobre" className="py-24 px-6 bg-black text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-500">Sobre mim</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-300">
          Sou Rhaniery Mueller, fundador da Mueller Code. Construí essa empresa para trazer soluções
          digitais com impacto real. Nossa missão é transformar ideias em experiências visuais e
          funcionais. Com foco em performance, design e inovação, criamos websites, sistemas e apps
          que realmente fazem a diferença.
        </p>
      </section>

      {/* ---------- SERVIÇOS ---------- */}
      <section id="servicos" className="py-20 px-6 grid gap-12 md:grid-cols-3 bg-[#0e0e0e]/80 backdrop-blur-lg">
        {services.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Card className="bg-[#121212]/60 border border-gray-700 backdrop-blur-md hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              <CardContent className="p-6 space-y-4 text-center">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-400">{item.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* ---------- PORTFÓLIO ---------- */}
     {/* ---------- PORTFÓLIO ---------- */}
<section id="portfolio" className="py-24 px-6 bg-black text-center">
  <h2 className="text-4xl font-bold mb-12 text-blue-500">Projetos Recentes</h2>

  <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    {projects.map((p, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="rounded-3xl overflow-hidden shadow-lg bg-[#0e0e0e]/80 backdrop-blur-md"
      >
        {/* Wrapper da capa (imagem + overlay) */}
        <div className="relative group">
          <img
            src={p.image}
            alt={p.title}
            className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay só para botões */}
          <div className="absolute inset-0 flex items-end justify-center p-6 bg-black/0 group-hover:bg-black/60 transition-colors">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-sm font-medium"
                >
                  Live
                </a>
              )}
              {p.site && (
                <a
                  href={p.site}
                  target="_blank"
                  className="px-3 py-1 rounded-full border border-cyan-400 text-sm font-medium"
                >
                  Acessar Site
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo sempre visível */}
        <div className="p-5 text-left">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{p.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* ---------- CONTATO ---------- */}
      <section id="contato" className="py-24 px-6 bg-black text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-500">Entre em Contato</h2>
        <p className="text-gray-300 mb-8">Vamos conversar sobre seu projeto?</p>

        <form
          action="https://formsubmit.co/SEU_EMAIL_AQUI"
          method="POST"
          className="mx-auto grid gap-6 md:grid-cols-2 md:max-w-2xl text-left"
        >
          <input type="hidden" name="_next" value="https://seusite.com/obrigado" />
          <input type="hidden" name="_captcha" value="false" />

          <div className="md:col-span-1">
            <label className="block mb-1 text-sm font-medium">Nome</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block mb-1 text-sm font-medium">E‑mail</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="voce@email.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Mensagem</label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva seu projeto..."
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white w-full py-3 rounded-xl font-semibold shadow-xl transition-transform hover:-translate-y-1"
            >
              Enviar mensagem
            </button>
          </div>
        </form>
      </section>

      {/* ---------- RODAPÉ ---------- */}
      <footer className="bg-black border-t border-gray-800 py-10 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Mueller Code. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
