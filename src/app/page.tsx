
import HeroSection from '@/components/sections/HeroSection';
import ProjectShowcaseSection from '@/components/sections/ProjectShowcaseSection';
import AboutSection from '@/components/sections/AboutSection';
import AcademicSection from '@/components/sections/AcademicSection'; // New import
import AchievementsSection from '@/components/sections/AchievementsSection'; // New import
import ExtracurricularSection from '@/components/sections/ExtracurricularSection'; // New import
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/shared/Footer';
import SideNavigationBar from '@/components/shared/SideNavigationBar';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideNavigationBar />
      <div className="flex-grow flex flex-col md:ml-48 bg-background">
        <main className="flex-grow">
          <HeroSection />
          <ProjectShowcaseSection />
          <AboutSection />
          <AcademicSection />
          <AchievementsSection />
          <ExtracurricularSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
