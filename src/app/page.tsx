
import HeroSection from '@/components/sections/HeroSection';
import ProjectShowcaseSection from '@/components/sections/ProjectShowcaseSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/shared/Footer';
import SideNavigationBar from '@/components/shared/SideNavigationBar'; // New import

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen"> {/* Changed to flex-row on md */}
      <SideNavigationBar /> {/* Add the new sidebar */}
      <div className="flex-grow flex flex-col md:ml-48 bg-background"> {/* Add margin for sidebar on md and bg-background */}
        {/* Remove old NavigationBar if it was here */}
        <main className="flex-grow">
          <HeroSection />
          <ProjectShowcaseSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

