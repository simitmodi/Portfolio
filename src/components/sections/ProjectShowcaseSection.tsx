
'use client'; // SectionTitle uses the hook, so this needs to be client
import ProjectCard from '@/components/shared/ProjectCard';
import SectionTitle from '@/components/shared/SectionTitle';
import { projectsData } from '@/data/projectsData';
// ProjectCard will handle its own animation

const ProjectShowcaseSection = () => {
  const displayedProjects = projectsData.slice(0, 2);

  return (
    <section id="projects" className="container mx-auto px-6 bg-background">
      <SectionTitle>Featured Projects</SectionTitle>
      {displayedProjects.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 mb-16 justify-items-center">
          {displayedProjects.map((project, index) => (
            // Each ProjectCard now handles its own animation trigger
            <div key={project.id} className="w-full max-w-lg">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-foreground/70">No projects to display yet.</p>
      )}
    </section>
  );
};

export default ProjectShowcaseSection;

