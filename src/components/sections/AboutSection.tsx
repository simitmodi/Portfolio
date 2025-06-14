
'use client';
import Image from 'next/image';
import { portfolioConfig } from '@/data/portfolioConfig';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const AboutSection = () => {
  const [imageContainerRef, isImageInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.2 });
  const [cardRef, isCardInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.2 });

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto">
        <SectionTitle>About Me</SectionTitle>
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div
            ref={imageContainerRef}
            className={cn(
              "md:col-span-2",
              "opacity-0",
              isImageInView && "animate-slide-in-left"
            )}
          >
            <div className="relative aspect-square max-w-md mx-auto md:max-w-none rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/about-me.png"
                alt="Simit Modi - About Me"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                data-ai-hint="person professional"
              />
            </div>
          </div>
          <div
            ref={cardRef}
            className={cn(
              "md:col-span-3",
              "opacity-0",
              isCardInView && "animate-slide-in-right"
            )}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-headline text-primary">{portfolioConfig.name}</CardTitle>
                <p className="text-lg text-accent">{portfolioConfig.jobTitle}</p>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-6 text-justify leading-relaxed">
                  {portfolioConfig.bio}
                </p>
                <h3 className="text-xl font-semibold font-headline mb-4 text-accent">My Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {portfolioConfig.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="default" 
                      className="px-4 py-2 text-sm shadow-md hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 ease-out"
                    >
                      {skill.icon && <skill.icon className="mr-2 h-4 w-4" />}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
