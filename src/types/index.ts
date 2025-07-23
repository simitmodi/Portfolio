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
