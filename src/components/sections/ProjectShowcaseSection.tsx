'use client';
import ProjectCard from '@/components/shared/ProjectCard';
import SectionTitle from '@/components/shared/SectionTitle';
import { projectsData } from '@/data/projectsData';

const ProjectShowcaseSection = () => {
  const displayedProjects = projectsData.slice(0, 2);

  return (
    <section id="projects" className="bg-background">
      <div className="container mx-auto">
        <SectionTitle>Featured Projects</SectionTitle>
        {displayedProjects.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
            {displayedProjects.map((project, index) => (
              <div key={project.id} className="w-full max-w-lg">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">
            No projects to display yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectShowcaseSection;
