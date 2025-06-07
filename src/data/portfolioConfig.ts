
import type { Skill } from '@/types';
import { Code, Palette, Database, Cpu } from 'lucide-react'; // Added Cpu for C, Database for DBMS

export const portfolioConfig = {
  name: "Simit Modi",
  jobTitle: "Computer Engineering Student",
  bio: "A Computer Engineering student with foundational knowledge in Java, Data Structures & Algorithms (DSA), Database Management Systems (DBMS), HTML, CSS, and C. I am passionate about building efficient and user-friendly applications and eager to apply my developing skills to real-world projects.",
  contact: {
    email: "simit.modi@example.com", // Replace with your email
    linkedin: "https://www.linkedin.com/in/simitmodi/",
    github: "https://github.com/simitmodi",
  },
  skills: [
    { name: "Java", icon: Code },
    { name: "Data Structures & Algorithms", icon: Code },
    { name: "DBMS", icon: Database },
    { name: "HTML", icon: Code },
    { name: "CSS", icon: Palette },
    { name: "C Programming", icon: Cpu },
  ] as Skill[],
};
