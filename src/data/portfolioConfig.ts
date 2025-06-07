
import type { Skill } from '@/types';
import { Code, Palette, Database, Cpu, GraduationCap, Trophy, Users } from 'lucide-react'; // Added icons

export const portfolioConfig = {
  name: "Simit Modi",
  jobTitle: "Computer Engineering Student",
  bio: "A Computer Engineering student with foundational knowledge in Java, Data Structures & Algorithms (DSA), Database Management Systems (DBMS), HTML, CSS, and C. I am passionate about building efficient and user-friendly applications and eager to apply my developing skills to real-world projects.",
  contact: {
    email: "simit.modi@example.com",
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
      title: "6th Place - Smart India Hackathon",
      description: "Achieved 6th position nationwide in the Smart India Hackathon 20XX, developing a solution for [briefly mention problem statement if you want].", // Add year and details
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
