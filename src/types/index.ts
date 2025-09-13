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
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  createdAt?: string;
}
