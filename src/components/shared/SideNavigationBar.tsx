
'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { portfolioConfig } from '@/data/portfolioConfig';

const navItems = [
  { name: 'Home', href: '#hero', id: 'hero' }, // Added Home
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

// sectionIds will now correctly include 'hero' from the navItems for active state logic
const sectionIds = navItems.map(item => item.id);

const SideNavigationBar = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleScroll = useCallback(() => {
    let currentSection = sectionIds[0]; // Default to the first item (Home/hero)
    const scrollThresholdRatio = 0.3; 

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Check if the section is within the threshold area of the viewport
        if (rect.top <= window.innerHeight * scrollThresholdRatio && rect.bottom >= window.innerHeight * scrollThresholdRatio) {
          currentSection = id;
          break; 
        }
        // If a section's top is above the threshold, it's likely the current or upcoming one
        if (rect.top < window.innerHeight * scrollThresholdRatio) {
          currentSection = id; 
        }
      }
    }
    
    // Explicitly set to 'hero' if very close to the top, to ensure "Home" is active
    if (window.scrollY < 50) {
        currentSection = 'hero';
    }

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    // Initial call to set active section based on current view (e.g. on page load with hash)
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
    // No need to prevent default for internal links handled by smooth scroll
    setActiveSection(id); // Set active state immediately on click
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-background p-6 pt-16 hidden md:flex flex-col space-y-6 z-40">
      <Link href="#hero" onClick={() => handleLinkClick('hero')} className="mb-6 block group">
        <h2 className="text-2xl font-headline font-bold text-primary group-hover:text-accent transition-colors">{portfolioConfig.name.split(' ')[0]}</h2>
        <p className="text-sm text-foreground/70 group-hover:text-accent/80 transition-colors">{portfolioConfig.jobTitle}</p>
      </Link>
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <a // Changed Link to <a> for direct click handling
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor jump
              handleLinkClick(item.id);
            }}
            className={cn(
              "group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-accent/10 hover:text-primary transition-all",
              activeSection === item.id && "text-primary font-semibold"
            )}
          >
            <span className={cn(
                "block h-px w-6 bg-current transition-all duration-300",
                activeSection === item.id ? "w-10 bg-primary" : "w-6 bg-foreground/40 group-hover:w-10 group-hover:bg-primary"
            )}></span>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto flex flex-col space-y-2">
        {/* Social icons or other links can go here */}
      </div>
    </aside>
  );
};

export default SideNavigationBar;
