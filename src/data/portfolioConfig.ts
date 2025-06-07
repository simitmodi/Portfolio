import type { Skill } from '@/types';
import { Github, Linkedin, Mail, Briefcase, Code, Palette, Cloud } from 'lucide-react';

export const portfolioConfig = {
  name: "Simit Modi", // Updated name
  jobTitle: "Full-Stack Developer & UI/UX Enthusiast",
  bio: "A passionate and results-driven Full-Stack Developer with a keen eye for UI/UX design. I specialize in crafting elegant, efficient, and user-friendly web applications. With a strong foundation in modern web technologies, I thrive on solving complex problems and continuously seek to expand my skillset. I'm dedicated to building impactful digital experiences that delight users and drive business goals.",
  contact: {
    email: "simit.modi@example.com", // Replace with your email
    linkedin: "https://linkedin.com/in/simitmodi", // Replace with your LinkedIn
    github: "https://github.com/simitmodi", // Replace with your GitHub
  },
  skills: [
    { name: "JavaScript", icon: Code },
    { name: "TypeScript", icon: Code },
    { name: "React", icon: Code },
    { name: "Next.js", icon: Code },
    { name: "Node.js", icon: Code },
    { name: "Java", icon: Code },
    { name: "Python", icon: Code },
    { name: "Tailwind CSS", icon: Palette },
    { name: "Figma", icon: Palette },
    { name: "Firebase", icon: Cloud },
    { name: "REST APIs", icon: Briefcase },
    { name: "GraphQL", icon: Briefcase },
    { name: "Docker", icon: Cloud },
  ] as Skill[],
};
