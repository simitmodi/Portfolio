
'use client';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioConfig } from '@/data/portfolioConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react'; // Default icon

const ExtracurricularSection = () => {
  const [containerRef, isContainerInView] = useScrollAnimation<HTMLDivElement>({ triggerOnce: false, threshold: 0.1 });
  const { extracurricular } = portfolioConfig;

  if (!extracurricular || extracurricular.length === 0) {
    return null; // Don't render section if no activities
  }

  return (
    <section id="extracurriculars" className="bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle>Extra-Curricular Activities</SectionTitle>
        <div
          ref={containerRef}
          className={cn(
            "grid gap-8 md:grid-cols-1 lg:grid-cols-1", // Adjust grid columns
            "opacity-0",
            isContainerInView && "animate-fade-in"
          )}
        >
          {extracurricular.map((activity, index) => {
            const IconComponent = activity.icon || Users;
            return (
            <Card 
              key={index} 
              className="shadow-lg w-full max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300"
              // style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center space-x-4">
                 <IconComponent className="h-8 w-8 text-accent flex-shrink-0" />
                <div>
                  <CardTitle className="text-xl font-headline text-accent">{activity.role}</CardTitle>
                  <p className="text-md text-foreground/80">{activity.organization}</p>
                </div>
              </CardHeader>
              {activity.description && (
                <CardContent>
                  <p className="text-md text-foreground/80 leading-relaxed">
                    {activity.description}
                  </p>
                </CardContent>
              )}
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExtracurricularSection;
