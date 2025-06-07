import { portfolioConfig } from '@/data/portfolioConfig';
import { Code2, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border/40 py-12">
      <div className="container mx-auto px-6 text-center text-foreground/70">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">{portfolioConfig.name}'s Profolio</span>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <Link href={`mailto:${portfolioConfig.contact.email}`} title="Email" className="hover:text-primary transition-colors">
            <Mail className="h-6 w-6" />
          </Link>
          <Link href={portfolioConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href={portfolioConfig.contact.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {currentYear} {portfolioConfig.name}. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with Next.js, Tailwind CSS, and ShadCN UI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
