import ContactForm from '@/components/forms/ContactForm';
import SectionTitle from '@/components/shared/SectionTitle';
import { portfolioConfig } from '@/data/portfolioConfig';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle>Contact Me</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 animate-slide-in-left">
            <h3 className="text-2xl font-headline font-semibold text-primary">Let's Connect!</h3>
            <p className="text-foreground/80 leading-relaxed">
              I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate. 
              Feel free to reach out through the form or connect with me on social media.
            </p>
            <div className="space-y-4">
              <a href={`mailto:${portfolioConfig.contact.email}`} className="flex items-center space-x-3 group">
                <Button variant="outline" size="icon" className="rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Mail className="h-5 w-5" />
                </Button>
                <span className="text-foreground/90 group-hover:text-accent transition-colors">{portfolioConfig.contact.email}</span>
              </a>
              <Link href={portfolioConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                 <Button variant="outline" size="icon" className="rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                   <Linkedin className="h-5 w-5" />
                 </Button>
                <span className="text-foreground/90 group-hover:text-accent transition-colors">LinkedIn Profile</span>
              </Link>
              <Link href={portfolioConfig.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                <Button variant="outline" size="icon" className="rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Github className="h-5 w-5" />
                </Button>
                <span className="text-foreground/90 group-hover:text-accent transition-colors">GitHub Profile</span>
              </Link>
            </div>
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
