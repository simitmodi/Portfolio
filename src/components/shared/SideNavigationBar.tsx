
'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { portfolioConfig } from '@/data/portfolioConfig';
import ThemeSwitcher from '@/components/shared/ThemeSwitcher'; // New import

const navItems = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const sectionIds = navItems.map(item => item.id);

const SideNavigationBar = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleScroll = useCallback(() => {
    let currentSection = sectionIds[0]; 
    const scrollThresholdRatio = 0.3; 

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Check if the middle of the element is within the middle 40% of the viewport height
        const viewportMiddleTop = window.innerHeight * (0.5 - scrollThresholdRatio / 2);
        const viewportMiddleBottom = window.innerHeight * (0.5 + scrollThresholdRatio / 2);

        if (rect.top <= viewportMiddleBottom && rect.bottom >= viewportMiddleTop) {
          currentSection = id;
          break; 
        }
        // Fallback if no section is perfectly in the middle, take the topmost visible one
        if (rect.top < window.innerHeight && rect.bottom > 0 && rect.top < (document.getElementById(currentSection)?.getBoundingClientRect().top || Infinity)) {
             currentSection = id;
        }
      }
    }
    
    // Ensure "Home" is active if scrolled to the very top
    if (window.scrollY < 50) { // A small threshold for the top
        currentSection = 'hero';
    }

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    const timer = setTimeout(handleScroll, 100); 

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const handleLinkClick = (id: string) => {
    // setActiveSection(id); // Setting active section is now handled by scroll listener primarily
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-sidebar text-sidebar-foreground p-6 pt-16 hidden md:flex flex-col space-y-6 z-40 shadow-md">
      <Link href="#hero" onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }} className="mb-6 block group">
        <h2 className="text-2xl font-headline font-bold text-primary group-hover:text-accent transition-colors">{portfolioConfig.name.split(' ')[0]}</h2>
        <p className="text-sm text-foreground/70 group-hover:text-accent/80 transition-colors">{portfolioConfig.jobTitle}</p>
      </Link>
      <nav className="flex flex-col space-y-1 flex-grow">
        {navItems.map((item) => (
          <a 
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault(); 
              handleLinkClick(item.id);
            }}
            className={cn(
              "group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-200 ease-out",
              activeSection === item.id && "text-primary font-semibold"
            )}
          >
            <span className={cn(
                "block h-px bg-current transition-all duration-300 ease-out",
                activeSection === item.id ? "w-10 bg-primary" : "w-6 bg-foreground/40 group-hover:w-10 group-hover:bg-primary"
            )}></span>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto"> 
        <ThemeSwitcher />
      </div>
    </aside>
  );
};

export default SideNavigationBar;
