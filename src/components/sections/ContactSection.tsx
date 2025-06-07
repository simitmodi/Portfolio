
'use client';
import ContactForm from '@/components/forms/ContactForm';
import SectionTitle from '@/components/shared/SectionTitle';
import { portfolioConfig } from '@/data/portfolioConfig';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ContactSection = () => {
  const [leftContentRef, isLeftContentInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.2 });
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
    <section id="contact" className="bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle>Contact Me</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div
            ref={leftContentRef}
            className={cn(
              "space-y-8",
              "opacity-0",
              isLeftContentInView && "animate-slide-in-left"
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
              <p className="text-sm text-muted-foreground">
                You can also find my LinkedIn and GitHub profiles in the footer.
              </p>
            </div>
          </div>
          <div className="animate-slide-in-right-placeholder">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
