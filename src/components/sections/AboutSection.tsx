
'use client';
import { portfolioConfig } from '@/data/portfolioConfig';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import anime from 'animejs';

const AboutSection = () => {
  const [cardRef, isCardInView] = useScrollAnimation<HTMLDivElement>({ 
    triggerOnce: false, 
    threshold: 0.2,
    animation: {
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    }
  });

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto">
        <SectionTitle>About Me</SectionTitle>
        <div
          ref={cardRef}
          className={cn(
            "max-w-3xl mx-auto",
            "opacity-0"
          )}
        >
          <Card className="shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out">
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
    </section>
  );
};

export default AboutSection;

    