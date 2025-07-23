
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { portfolioConfig } from '@/data/portfolioConfig';
import { ArrowDown, Download } from 'lucide-react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import AnimatedName from '@/components/shared/AnimatedName';

const HeroSection = () => {
  const [imageRef, isImageInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.2 });
  const [jobTitleRef, isJobTitleInView] = useScrollAnimation<HTMLParagraphElement>({ triggerOnce: false, threshold: 0.2 });
  const [taglineRef, isTaglineInView] = useScrollAnimation<HTMLParagraphElement>({ triggerOnce: false, threshold: 0.2, rootMargin: '-50px 0px 0px 0px' });
  const [buttonsRef, isButtonsInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.2 });


  return (
    <div className="snap-section">
      <section id="hero" className="bg-background">
        <div className="container mx-auto text-center">
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
                src="/profile.png" 
                alt={portfolioConfig.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h1
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-primary mb-4 h-20 sm:h-24 md:h-28" // Set a fixed height
              )}
            >
               <AnimatedName text={portfolioConfig.name} />
            </h1>
            <p
              ref={jobTitleRef}
              className={cn(
                "text-xl md:text-2xl text-foreground/80 mb-6",
                "opacity-0",
                isJobTitleInView && "animate-fade-in"
              )}
            >
              {portfolioConfig.jobTitle}
            </p>
            <p
              ref={taglineRef}
              className={cn(
                "text-md md:text-lg text-foreground/70 mb-8 max-w-2xl mx-auto",
                "opacity-0",
                isTaglineInView && "animate-fade-in"
              )}
              style={{ animationDelay: isTaglineInView ? '0.2s' : '0s' }}
            >
              {portfolioConfig.tagline}
            </p>
            <div
              ref={buttonsRef}
              className={cn(
                "flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center items-center mt-8",
                "opacity-0",
                isButtonsInView && "animate-fade-in"
              )}
              style={{ animationDelay: isButtonsInView ? '0.4s' : '0s' }}
            >
              <Button size="lg" asChild className="w-full max-w-xs sm:w-auto transition-transform duration-200 ease-out hover:-translate-y-0.5">
                <Link href="#projects">
                  View Projects <ArrowDown className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full max-w-xs sm:w-auto transition-transform duration-200 ease-out hover:-translate-y-0.5">
                <a href="https://1drv.ms/w/c/edcf171ff47652aa/EapSdvQfF88ggO2PCgAAAAABFWPewLA9-Cctwp-2KCuCqQ?e=99wL1N" target="_blank" rel="noopener noreferrer">
                  Download CV <Download className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;

    