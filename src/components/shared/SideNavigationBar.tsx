
'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { portfolioConfig } from '@/data/portfolioConfig';
import ThemeSwitcher from '@/components/shared/ThemeSwitcher';

const navItems = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Academics', href: '#academics', id: 'academics' },
  { name: 'Achievements', href: '#achievements', id: 'achievements' },
  { name: 'Extra-Curriculars', href: '#extracurriculars', id: 'extracurriculars' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const SideNavigationBar = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const observer = useRef<IntersectionObserver | null>(null);

  const handleLinkClick = (id: string, event?: React.MouseEvent<HTMLAnchorElement>) => {
    if (event) event.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observer.current) {
      observer.current.disconnect();
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Check if the intersecting element is the one we want to set active
            // This is a simple check, more complex logic might be needed depending on scroll direction
            if (entry.intersectionRatio > 0.5) { // 50% of the element is visible
                setActiveSection(entry.target.id);
            }
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null, // Observing relative to the viewport
      rootMargin: '0px',
      threshold: [0.1, 0.5, 0.9], // Trigger at different visibility percentages
    });

    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
    sections.forEach((section) => {
      if(section) observer.current?.observe(section);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-background/70 backdrop-blur-lg text-foreground p-6 pt-8 hidden md:flex flex-col space-y-6 z-40 shadow-2xl">
      <Link href="#hero" onClick={(e) => handleLinkClick('hero', e)} className="mb-4 block group">
        <div className="flex flex-col items-center text-center py-2">
          <span className="font-bold font-headline text-2xl text-primary group-hover:text-accent transition-colors">
            {portfolioConfig.name}
          </span>
        </div>
      </Link>
      <nav className="flex flex-col space-y-1 flex-grow justify-center">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => {
              handleLinkClick(item.id, e);
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

    