
'use client';
import { portfolioConfig } from '@/data/portfolioConfig';
import { Code2, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerRef, isFooterInView] = useScrollAnimation<HTMLElement>({ triggerOnce: false, threshold: 0.05 });

  return (
    <footer
      ref={footerRef}
      className={cn(
        "bg-background border-t border-border/40 py-12", // Changed from bg-secondary/50
        "opacity-0",
        isFooterInView && "animate-fade-in"
      )}
    >
      <div className="container mx-auto px-6 text-center text-foreground/70">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">{portfolioConfig.name}'s Profolio</span>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <Link href={`mailto:${portfolioConfig.contact.email}`} title="Email" className="hover:text-primary transition-all duration-200 ease-out transform hover:scale-110">
            <Mail className="h-6 w-6" />
          </Link>
          <Link href={portfolioConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-primary transition-all duration-200 ease-out transform hover:scale-110">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href={portfolioConfig.contact.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-primary transition-all duration-200 ease-out transform hover:scale-110">
            <Github className="h-6 w-6" />
          </Link>
          {portfolioConfig.contact.instagram && (
            <Link href={portfolioConfig.contact.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:text-primary transition-all duration-200 ease-out transform hover:scale-110">
              <Instagram className="h-6 w-6" />
            </Link>
          )}
        </div>
        <p className="text-sm">
          &copy; {currentYear} {portfolioConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
