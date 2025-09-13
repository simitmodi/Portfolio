export interface Project {
  id: string;
  title: string;
  description: string;
  projectUrl?: string;
  githubUrl?: string;
  tags: string[];
}

export interface Skill {
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface BlogPost {
  id?: string; // Made optional as it's not always present
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  category: 'professional' | 'personal';
  createdAt?: string;
}
