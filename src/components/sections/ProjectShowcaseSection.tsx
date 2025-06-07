import ProjectCard from '@/components/shared/ProjectCard';
import SectionTitle from '@/components/shared/SectionTitle';
import ProjectDescriptionImprover from '@/components/tools/ProjectDescriptionImprover';
import { projectsData } from '@/data/projectsData';

const ProjectShowcaseSection = () => {
  return (
    <section id="projects" className="container mx-auto px-6">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <div className="mt-16 md:mt-24">
        <ProjectDescriptionImprover />
      </div>
    </section>
  );
};

export default ProjectShowcaseSection;
