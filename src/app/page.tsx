
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
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideNavigationBar />
      <MobileNavigationBar />
      <MobileThemeSwitcher />

      {/* Desktop-only Live Clock in top right - Combined Pill */}
      <div className="hidden md:flex fixed top-4 right-4 z-50 items-center rounded-full border border-border/40 bg-background/5 backdrop-blur-xl shadow-ultimate overflow-hidden">
        <LiveWeather />
        <Separator orientation="vertical" className="h-10 my-auto bg-border/40" />
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
