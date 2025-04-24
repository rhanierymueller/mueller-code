import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { Code, Smartphone, Globe } from 'lucide-react';
import { Card, CardContent } from '../components/Card';
import { useRef, useState } from 'react';
import serenaImg from '../assets/image/serena.png';
import trocaFacil from '../assets/image/trocafacil.png';
import AuroraBackground from '../components/AuroraBackground';
import { Button } from '../components/Button';
import toast from 'react-hot-toast';
import profileImg from '../assets/image/profile.png';
import Header from '../components/Header';

export default function MuellerCodeHome() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      toast.error('Confirme o captcha antes de enviar.');
      return;
    }

    if (!formRef.current) return;

    setIsSending(true);

    const formData = new FormData(formRef.current);

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${import.meta.env.VITE_FORMSUBMIT_EMAIL}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      if (res.ok) {
        toast.success('Mensagem enviada com sucesso!');
        formRef.current.reset();
      } else {
        toast.error('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Erro inesperado. Verifique sua conexão.');
    } finally {
      setIsSending(false);
    }
  };

  const services = [
    {
      icon: <Globe className="mx-auto w-10 h-10 text-white" />,
      title: 'Websites',
      text: 'Sites impactantes e responsivos com performance e estilo.',
    },
    {
      icon: <Smartphone className="mx-auto w-10 h-10 text-white" />,
      title: 'Apps',
      text: 'Aplicativos mobile e web com foco na experiência do usuário.',
    },
    {
      icon: <Code className="mx-auto w-10 h-10 text-white" />,
      title: 'Soluções Personalizadas',
      text: 'Sistemas sob medida para otimizar o seu negócio.',
    },
  ];

  const projects = [
    {
      title: 'Serena AI',
      description: 'Chatbot terapêutico com voz e LLM.',
      image: serenaImg,
      live: null,
      site: 'https://serena-ai.vercel.app/',
      tech: ['React', 'Node.js', 'TailwindCSS', 'TypeScript', 'Prisma', 'PostgreSQL'],
    },
    {
      title: 'Troca Fácil',
      description: 'Plataforma de troca de produtos e serviços.',
      image: trocaFacil,
      live: null,
      site: null,
      tech: ['React', 'Node.js', 'TailwindCSS', 'PostgreSQL'],
    },
  ];

  return (
    <main className="relative isolate min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <AuroraBackground />
      <Header />
      <section
        id="inicio"
        className="h-screen flex flex-col items-center justify-center text-center p-6 space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ rotate: -1 }}
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
        >
          Mueller Code
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
              Fale conosco
            </Button>
          </a>
        </motion.div>
      </section>
      <section id="sobre" className="py-24 px-6 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10"
        >
          <img
            src={profileImg}
            alt="Rhaniery Mueller"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover flex-shrink-0"
          />
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4 text-blue-500">Sobre mim</h2>
            <p className="text-lg text-gray-300">
              Sou Rhaniery Mueller, fundador da Mueller Code. Construí essa empresa para trazer
              soluções digitais com impacto real. Nossa missão é transformar ideias em experiências
              visuais e funcionais.
            </p>
          </div>
        </motion.div>
      </section>
      <section
        id="servicos"
        className="py-20 px-6 grid gap-12 md:grid-cols-3 bg-[#0e0e0e]/80 backdrop-blur-lg"
      >
        {services.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 1 }}
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
      <section id="portfolio" className="py-24 px-6 bg-black text-center">
        <h2 className="text-4xl font-bold mb-12 text-blue-500">Projetos Recentes</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="rounded-3xl overflow-hidden shadow-lg bg-[#0e0e0e]/80 backdrop-blur-md"
            >
              <div className="relative group">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

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
                        Acessar Site
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5 text-left">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{p.description}</p>
                {p.tech && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-cyan-800/20 text-cyan-400 text-xs px-3 py-1 rounded-full border border-cyan-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contato" className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-500">Entre em Contato</h2>
        <p className="text-gray-300 mb-8">Vamos conversar sobre seu projeto?</p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mx-auto grid gap-6 md:grid-cols-2 md:max-w-2xl text-left"
        >
          <input type="text" name="_honey" className="hidden" />
          <input type="hidden" name="_captcha" value="false" />
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Nome</label>
            <input
              type="text"
              name="first_name"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">Sobrenome</label>
            <input
              type="text"
              name="last_name"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu sobrenome"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Telefone</label>
            <input
              type="tel"
              name="phone"
              pattern="\+?[0-9\s\-()]{10,20}"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(11) 91234-5678"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">E-mail</label>
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
              maxLength={500}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva seu projeto (máx. 500 caracteres)…"
            />
          </div>

          <div className="md:col-span-2 flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              theme="dark"
              onChange={() => setIsVerified(true)}
              onExpired={() => setIsVerified(false)}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSending}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white w-full py-3 rounded-xl font-semibold shadow-xl transition-transform hover:-translate-y-1 disabled:opacity-60"
            >
              {isSending ? 'Enviando…' : 'Enviar mensagem'}
            </button>
          </div>
        </form>
      </section>

      <footer className="bg-black border-t border-gray-800 py-10 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Mueller Code. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
