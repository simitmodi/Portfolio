
import HeroSection from '@/components/sections/HeroSection';
import ProjectShowcaseSection from '@/components/sections/ProjectShowcaseSection';
import AboutSection from '@/components/sections/AboutSection';
import AcademicSection from '@/components/sections/AcademicSection'; // New import
import AchievementsSection from '@/components/sections/AchievementsSection'; // New import
import ExtracurricularSection from '@/components/sections/ExtracurricularSection'; // New import
import ContactSection from '@/components/sections/ContactSection';
import SideNavigationBar from '@/components/shared/SideNavigationBar';
import MobileNavigationBar from '@/components/shared/MobileNavigationBar';
import MobileThemeSwitcher from '@/components/shared/MobileThemeSwitcher';
import { LiveTime, LiveWeather } from '@/components/shared/LiveClock';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideNavigationBar />
      <MobileNavigationBar />
      <MobileThemeSwitcher />

      {/* Desktop-only Live Clock in top right */}
      <div className="hidden md:flex fixed top-4 right-4 z-50 items-center gap-2">
        <LiveWeather />
        <LiveTime />
      </div>

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
      </div>
    </div>
  );
}
