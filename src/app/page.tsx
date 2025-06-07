import NavigationBar from '@/components/shared/NavigationBar';
import HeroSection from '@/components/sections/HeroSection';
import ProjectShowcaseSection from '@/components/sections/ProjectShowcaseSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/shared/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-grow">
        <HeroSection />
        <ProjectShowcaseSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
