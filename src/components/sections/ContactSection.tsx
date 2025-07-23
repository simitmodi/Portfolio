'use client';
import ContactForm from '@/components/forms/ContactForm';
import SectionTitle from '@/components/shared/SectionTitle';
import { portfolioConfig } from '@/data/portfolioConfig';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import anime from 'animejs';
import Footer from '@/components/shared/Footer';

const ContactSection = () => {
  const [leftContentRef, isLeftContentInView] = useScrollAnimation<HTMLDivElement>({ 
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
      <section id="contact" className="bg-background flex-grow w-full flex flex-col justify-center">
        <div className="container mx-auto">
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
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactSection;
