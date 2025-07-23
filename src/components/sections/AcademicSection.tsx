
'use client';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioConfig } from '@/data/portfolioConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';

const AcademicSection = () => {
  const [cardRef, isCardInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.2 });
  const { academics } = portfolioConfig;
  const IconComponent = academics.icon || GraduationCap;

  return (
    <div className="snap-section">
      <section id="academics" className="bg-background">
        <div className="container mx-auto">
          <SectionTitle>Academics</SectionTitle>
          <div
            ref={cardRef}
            className={cn(
              "max-w-2xl mx-auto",
              "opacity-0",
              isCardInView && "animate-fade-in"
            )}
          >
            <Card className="shadow-xl w-full">
              <CardHeader className="flex flex-row items-center space-x-4">
                <IconComponent className="h-10 w-10 text-accent" />
                <div>
                  <CardTitle className="text-2xl font-headline text-accent">{academics.degree}</CardTitle>
                  <p className="text-md text-foreground/80">{academics.institution}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-foreground">
                  {academics.duration}
                </p>
                {/* Add more details here if needed, e.g., GPA, relevant coursework */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicSection;

    