
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number; 
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [cardRef, isCardInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.15 });

  return (
    <Card
      ref={cardRef}
      className={cn(
        "flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out", 
        "opacity-0",
        isCardInView && "animate-fade-in" 
      )}
    >
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            data-ai-hint={project.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-2xl font-headline mb-2 text-accent">{project.title}</CardTitle>
        <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex space-x-2 w-full">
          {project.projectUrl && (
            <Button asChild variant="outline" className="flex-1 transition-transform duration-200 ease-out hover:-translate-y-0.5">
              <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> View Live
              </Link>
            </Button>
          )}
          {project.githubUrl && (
             <Button asChild variant="default" className="flex-1 transition-transform duration-200 ease-out hover:-translate-y-0.5">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Source Code
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
