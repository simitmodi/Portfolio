
'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { portfolioConfig } from '@/data/portfolioConfig';

const navItems = [
  // Add 'Hero' or 'Home' if you want an explicit link to the top.
  // For now, 'hero' section will be implicitly active at the top.
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

// Define section IDs including 'hero'
const sectionIds = ['hero', ...navItems.map(item => item.id)];

const SideNavigationBar = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleScroll = useCallback(() => {
    let currentSection = 'hero'; // Default to hero
    const scrollThresholdRatio = 0.3; // Section top needs to pass 30% of viewport height from the top

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Check if the top of the section is within the top part of the viewport
        // Adjust threshold to make it active when a good portion is visible
        if (rect.top <= window.innerHeight * scrollThresholdRatio && rect.bottom >= window.innerHeight * scrollThresholdRatio) {
          currentSection = id;
          break;
        }
        // Fallback for sections scrolled past the threshold
        if (rect.top < window.innerHeight * scrollThresholdRatio) {
          currentSection = id;
        }
      }
    }
    // If scrolled to the very top, hero is active
    if (window.scrollY < 50) {
        currentSection = 'hero';
    }

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    // Initial check once components are mounted
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
    setActiveSection(id);
    // Smooth scroll can be handled by CSS scroll-behavior or JS if needed
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-background p-6 pt-16 hidden md:flex flex-col space-y-6 border-r border-border/40 z-40">
      <Link href="#hero" onClick={() => handleLinkClick('hero')} className="mb-6 block group">
        <h2 className="text-2xl font-headline font-bold text-primary group-hover:text-accent transition-colors">{portfolioConfig.name.split(' ')[0]}</h2>
        <p className="text-sm text-foreground/70 group-hover:text-accent/80 transition-colors">{portfolioConfig.jobTitle}</p>
      </Link>
      <nav className="flex flex-col space-y-1">
        {/* Optionally add a "Home/Hero" link if desired */}
        {/* <Link
            href="#hero"
            onClick={() => handleLinkClick('hero')}
            className={cn(
              "group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-accent/10 hover:text-primary transition-all",
              activeSection === 'hero' && "text-primary font-semibold"
            )}
          >
            <span className={cn(
                "block h-px w-6 bg-current transition-all duration-300",
                activeSection === 'hero' ? "w-10 bg-primary" : "w-6 bg-foreground/40 group-hover:w-10 group-hover:bg-primary"
            )}></span>
            <span>Home</span>
        </Link> */}
        {navItems.map((item) => (
          <a // Using <a> for direct hash scrolling, can be <Link> if using Next.js router for this
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault(); // Prevent instant jump
              handleLinkClick(item.id);
            }}
            className={cn(
              "group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-accent/10 hover:text-primary transition-all",
              activeSection === item.id && "text-primary font-semibold"
            )}
          >
            <span className={cn(
                "block h-px w-6 bg-current transition-all duration-300", // Horizontal line instead of dot
                activeSection === item.id ? "w-10 bg-primary" : "w-6 bg-foreground/40 group-hover:w-10 group-hover:bg-primary"
            )}></span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      {/* Social icons could go here */}
      <div className="mt-auto flex flex-col space-y-2">
        {/* Example: GitHub Icon Link */}
        {/* <Link href={portfolioConfig.contact.github} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary">
          <Github size={20} />
        </Link> */}
      </div>
    </aside>
  );
};

export default SideNavigationBar;
