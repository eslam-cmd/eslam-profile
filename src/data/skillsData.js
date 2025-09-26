import Image from "next/image";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaBootstrap,
  FaGithub,
  FaNodeJs,
  FaPaw,
} from "react-icons/fa";
import { SiReact, SiExpo, SiPrisma, SiDocker } from "react-icons/si";
import {
  SiTailwindcss,
  SiMui,
  SiAxios,
  SiTypescript,
  SiExpress,
  SiPostgresql,
  SiPostman,
  SiNextdotjs,
  SiJavascript,
  SiSupabase,
} from "react-icons/si";
import { MdOutlineDashboardCustomize } from "react-icons/md";

export const cards = [
  { id: 1, title: "HTML", icon: <FaHtml5 size={40} color="#e34c26" /> },
  { id: 2, title: "CSS", icon: <FaCss3Alt size={40} color="#264de4" /> },
  {
    id: 9,
    title: "JavaScript",
    icon: <SiJavascript size={40} color="#f7df1e" />,
  },
  {
    id: 14,
    title: "TypeScript",
    icon: <SiTypescript size={40} color="#3178c6" />,
  },
  { id: 6, title: "React", icon: <FaReact size={40} color="#61DBFB" /> },
  { id: 13, title: "Next.js", icon: <SiNextdotjs size={40} color="#fff" /> },
  {
    id: 20,
    title: "React Native",
    icon: <SiReact size={40} color="#61DBFB" />,
  },
  { id: 21, title: "Expo", icon: <SiExpo size={40} color="#000020" /> },
  { id: 10, title: "MUI", icon: <SiMui size={40} color="#007fff" /> },
  {
    id: 4,
    title: "Bootstrap",
    icon: <FaBootstrap size={40} color="#7952b3" />,
  },
  {
    id: 3,
    title: "Tailwind",
    icon: <SiTailwindcss size={40} color="#38bdf8" />,
  },
  { id: 15, title: "Node.js", icon: <FaNodeJs size={40} color="#68a063" /> },
  { id: 16, title: "Express", icon: <SiExpress size={40} color="#ccc" /> },
  {
    id: 18,
    title: "Supabase",
    icon: <SiSupabase size={40} color="#2b7fc4ff" />,
  },
  {
    id: 17,
    title: "PostgreSQL",
    icon: <SiPostgresql size={40} color="#336791" />,
  },
  { id: 12, title: "Axios", icon: <SiAxios size={40} color="#5a29e4" /> },
  { id: 11, title: "GitHub", icon: <FaGithub size={40} color="#ccc" /> },
  { id: 19, title: "Postman", icon: <SiPostman size={40} color="#ff6c37" /> },
  { id: 22, title: "Zustand", icon: <FaPaw size={40} color="#a0522d" /> },
  {
    id: 23,
    title: "shadcn/ui",
    icon: <MdOutlineDashboardCustomize size={40} color="#9333ea" />,
  },
  { id: 24, title: "Prisma", icon: <SiPrisma size={40} color="#2D3748" /> },
  { id: 25, title: "Docker", icon: <SiDocker size={40} color="#2496ED" /> },
];
