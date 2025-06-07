import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { portfolioConfig } from '@/data/portfolioConfig';
import { ArrowDown, Download } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-xl border-4 border-primary animate-fade-in">
            <Image 
              src="https://placehold.co/200x200.png" // Replace with your actual image URL
              alt={portfolioConfig.name} 
              data-ai-hint="professional portrait"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {portfolioConfig.name}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {portfolioConfig.jobTitle}
          </p>
          <div className="space-x-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" asChild>
              <Link href="#projects">
                View Projects <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/resume.pdf" download="resume.pdf"> {/* Replace with actual resume link */}
                Download CV <Download className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
