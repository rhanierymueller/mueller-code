import avyliaImg from '../assets/image/avylia.png';
import versoguard from '../assets/image/versoguard.png';
import trocaFacil from '../assets/image/trocafacil.png';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const techStacks = [
  {
    name: 'React',
    iconUrl: `${DEVICON}/react/react-original.svg`,
    color: '#61dafb',
    bgColor: 'rgba(97, 218, 251, 0.1)',
    level: 95,
    description: { pt: 'Interfaces dinâmicas e performáticas', en: 'Dynamic and performant interfaces' },
  },
  {
    name: 'React Native',
    iconUrl: `${DEVICON}/react/react-original.svg`,
    color: '#7dd3fc',
    bgColor: 'rgba(125, 211, 252, 0.08)',
    level: 85,
    description: { pt: 'Apps mobile para iOS e Android', en: 'Mobile apps for iOS and Android' },
  },
  {
    name: 'Node.js',
    iconUrl: `${DEVICON}/nodejs/nodejs-original.svg`,
    color: '#68a063',
    bgColor: 'rgba(104, 160, 99, 0.1)',
    level: 90,
    description: { pt: 'APIs robustas e escaláveis', en: 'Robust and scalable APIs' },
  },
  {
    name: 'C#',
    iconUrl: `${DEVICON}/csharp/csharp-original.svg`,
    color: '#9b59b6',
    bgColor: 'rgba(155, 89, 182, 0.1)',
    level: 75,
    description: { pt: 'Sistemas enterprise com .NET', en: 'Enterprise systems with .NET' },
  },
  {
    name: 'PostgreSQL',
    iconUrl: `${DEVICON}/postgresql/postgresql-original.svg`,
    color: '#336791',
    bgColor: 'rgba(51, 103, 145, 0.1)',
    level: 85,
    description: { pt: 'Banco de dados relacional avançado', en: 'Advanced relational database' },
  },
  {
    name: 'Angular',
    iconUrl: `${DEVICON}/angularjs/angularjs-original.svg`,
    color: '#dd0031',
    bgColor: 'rgba(221, 0, 49, 0.1)',
    level: 70,
    description: { pt: 'Apps corporativos estruturados', en: 'Structured corporate apps' },
  },
];

export const projects = [
  {
    id: 'avylia',
    title: 'Avylia AI',
    description: {
      pt: 'Chatbot terapêutico com voz e LLM. Plataforma de saúde mental com IA conversacional avançada.',
      en: 'Therapeutic chatbot with voice and LLM. Mental health platform with advanced conversational AI.',
    },
    image: avyliaImg,
    site: 'https://www.avylia.com/',
    tech: ['React', 'Node.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
    mock: false,
  },
  {
    id: 'trocafacil',
    title: 'Troca Fácil',
    description: {
      pt: 'Plataforma de troca de produtos e serviços entre usuários. Marketplace peer-to-peer com sistema de avaliações.',
      en: 'Platform for exchanging products and services between users. Peer-to-peer marketplace with rating system.',
    },
    image: trocaFacil,
    site: null,
    tech: ['React', 'Node.js', 'TailwindCSS', 'PostgreSQL'],
    mock: false,
  },
  {
    id: 'versoguard',
    title: 'Verso Guard',
    description: {
      pt: 'API de KYC brasileira com prova de vida, comparação facial e validação de documentos. Integre em minutos.',
      en: 'Brazilian KYC API with liveness detection, facial comparison and document validation. Integrate in minutes.',
    },
    image: versoguard,
    site: 'https://versoguard.com',
    tech: ['Python', 'AWS', ' React-Native'],
    mock: true,
  },
];
