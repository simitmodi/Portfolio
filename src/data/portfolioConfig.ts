
import type { Skill } from '@/types';
import { Code, Palette, Database, Cpu, GraduationCap, Trophy, Users } from 'lucide-react'; // Added icons

export const portfolioConfig = {
  name: "Simit Modi",
  jobTitle: "Computer Engineering Student",
  tagline: "Passionate Computer Engineering student dedicated to crafting efficient, user-centric applications. Ready to leverage skills in Java and DSA to innovate and solve real-world problems.",
  bio: "A Computer Engineering student with foundational knowledge in Java, Data Structures & Algorithms (DSA), Database Management Systems (DBMS), HTML, CSS, and C. I am passionate about building efficient and user-friendly applications and eager to apply my developing skills to real-world projects.",
  contact: {
    email: "simitjmodi@gmail.com",
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
  academics: {
    degree: "Bachelor of Engineering (B.E.) in Computer Engineering",
    institution: "Your University", // Placeholder - please update this
    duration: "2023 - 2027 (Expected)",
    icon: GraduationCap,
  },
  achievements: [
    {
      title: "6th Place - Smart India Hackathon 2024",
      description: "Achieved 6th position nationwide in the Smart India Hackathon 2024 by developing a solution for optimizing fertilizer usage on Indian farms based on farm field data and weather data.",
      icon: Trophy,
    }
    // Add more achievements if needed
  ],
  extracurricular: [
    {
      role: "Public Relations (PR) Head",
      organization: "ISTE (Indian Society for Technical Education) Student Chapter",
      description: "Managed and executed PR strategies, enhancing the chapter's visibility and engagement.",
      icon: Users,
    }
    // Add more extra-curricular activities if needed
  ],
};
