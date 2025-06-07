
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { portfolioConfig } from '@/data/portfolioConfig';
import { ArrowDown, Download } from 'lucide-react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import TypingAnimation from '@/components/shared/TypingAnimation';

const HeroSection = () => {
  const [imageRef, isImageInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.2 });
  const [jobTitleRef, isJobTitleInView] = useScrollAnimation<HTMLParagraphElement>({ triggerOnce: false, threshold: 0.2 });
  const [taglineRef, isTaglineInView] = useScrollAnimation<HTMLParagraphElement>({ triggerOnce: false, threshold: 0.2, rootMargin: '-50px 0px 0px 0px' }); // Adjusted rootMargin
  const [buttonsRef, isButtonsInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.2 });


  return (
    <section id="hero" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div
            ref={imageRef}
            className={cn(
              "relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden shadow-xl border-4 border-primary",
              "opacity-0",
              isImageInView && "animate-fade-in"
            )}
          >
            <Image
              src="https://placehold.co/200x200.png"
              alt={portfolioConfig.name}
              data-ai-hint="professional portrait"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary mb-4 min-h-[1.2em] sm:min-h-[1.5em] md:min-h-[1.5em]"
            )}
          >
            <TypingAnimation text={portfolioConfig.name} speed={100} />
          </h1>
          <p
            ref={jobTitleRef}
            className={cn(
              "text-xl md:text-2xl text-foreground/80 mb-6", // Reduced bottom margin
              "opacity-0",
              isJobTitleInView && "animate-fade-in"
            )}
          >
            {portfolioConfig.jobTitle}
          </p>
          <p
            ref={taglineRef}
            className={cn(
              "text-md md:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto", // Added max-width and mx-auto
              "opacity-0",
              isTaglineInView && "animate-fade-in"
            )}
            style={{ animationDelay: isTaglineInView ? '0.2s' : '0s' }} // Slight delay for tagline
          >
            {portfolioConfig.tagline}
          </p>
          <div
            ref={buttonsRef}
            className={cn(
              "space-x-4",
              "opacity-0",
              isButtonsInView && "animate-fade-in"
            )}
            style={{ animationDelay: isButtonsInView ? '0.4s' : '0s' }} // Slight delay for buttons
          >
            <Button size="lg" asChild className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
              <Link href="#projects">
                View Projects <ArrowDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
              <a href="/resume.pdf" download="resume.pdf">
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
