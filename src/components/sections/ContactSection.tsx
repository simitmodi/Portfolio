'use client';
import ContactForm from '@/components/forms/ContactForm';
import SectionTitle from '@/components/shared/SectionTitle';
import { portfolioConfig } from '@/data/portfolioConfig';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

const ContactSection = () => {
  const currentYear = new Date().getFullYear();
  const [leftContentRef] = useScrollAnimation<HTMLDivElement>({
    triggerOnce: false,
    threshold: 0.2,
    animation: {
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    }
  });
  const [connectTitleClickCount, setConnectTitleClickCount] = useState(0);

  const handleConnectTitleClick = () => {
    const newClickCount = connectTitleClickCount + 1;
    setConnectTitleClickCount(newClickCount);

    if (newClickCount >= 7) {
      document.dispatchEvent(new CustomEvent('trigger-cursor-easter-egg'));
      setConnectTitleClickCount(0);
    }
  };

  return (
    <div className="snap-section flex flex-col h-screen">
      <section id="contact" className="bg-background w-full flex flex-col flex-grow justify-center">
        <div className="container mx-auto flex flex-col flex-grow justify-center">
          <SectionTitle>Contact Me</SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div
              ref={leftContentRef}
              className={cn(
                "space-y-8",
                "opacity-0"
              )}
            >
              <h3
                className="text-2xl font-headline font-semibold text-accent cursor-pointer"
                onClick={handleConnectTitleClick}
                title="Psst, try clicking me a few times!"
              >
                Let's Connect!
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate.
                The best way to reach me is via email or the contact form on this page.
              </p>
              <div className="space-y-4">
                <a href={`mailto:${portfolioConfig.contact.email}`} className="inline-block">
                  <Button size="lg" className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
                    <Mail className="mr-2 h-5 w-5" />
                    Send an Email
                  </Button>
                </a>
              </div>

              {/* Footer Content Integrated Here */}
              <div className="pt-6 border-t border-border/40 text-center md:text-left">
                <div className="flex justify-center md:justify-start space-x-6 mb-4">
                  <Link href={`mailto:${portfolioConfig.contact.email}`} title="Email" className="text-foreground/70 hover:text-primary transition-all duration-200 ease-out transform hover:scale-110">
                    <Mail className="h-6 w-6" />
                  </Link>
                  <Link href={portfolioConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-foreground/70 hover:text-primary transition-all duration-200 ease-out transform hover:scale-110">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link href={portfolioConfig.contact.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-foreground/70 hover:text-primary transition-all duration-200 ease-out transform hover:scale-110">
                    <Github className="h-6 w-6" />
                  </Link>
                  {portfolioConfig.contact.instagram && (
                    <Link href={portfolioConfig.contact.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="text-foreground/70 hover:text-primary transition-all duration-200 ease-out transform hover:scale-110">
                      <Instagram className="h-6 w-6" />
                    </Link>
                  )}
                </div>
                <p className="text-sm text-foreground/70">
                  &copy; {currentYear} {portfolioConfig.name}. All rights reserved.
                </p>
              </div>

            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
