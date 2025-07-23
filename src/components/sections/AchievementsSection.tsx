
'use client';
import SectionTitle from '@/components/shared/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioConfig } from '@/data/portfolioConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react'; // Default icon
import anime from 'animejs';

const AchievementsSection = () => {
  const [containerRef, isContainerInView] = useScrollAnimation<HTMLDivElement>({ 
    triggerOnce: false, 
    threshold: 0.1,
    animation: {
      targets: '#achievements .achievement-card',
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
      easing: 'easeOutExpo',
      duration: 800
    }
  });
  const { achievements } = portfolioConfig;

  if (!achievements || achievements.length === 0) {
    return null; 
  }

  return (
    <div className="snap-section">
      <section id="achievements" className="bg-background">
        <div className="container mx-auto">
          <SectionTitle>Achievements</SectionTitle>
          <div
            ref={containerRef}
            className={cn(
              "grid gap-8 md:grid-cols-1 lg:grid-cols-1"
            )}
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon || Trophy;
              return (
                <Card 
                  key={index}
                  className="shadow-lg w-full max-w-2xl mx-auto hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out achievement-card opacity-0"
                >
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <IconComponent className="h-8 w-8 text-accent flex-shrink-0" />
                    <div>
                      <CardTitle className="text-xl font-headline text-accent">{achievement.title}</CardTitle>
                    </div>
                  </CardHeader>
                  {achievement.description && (
                    <CardContent>
                      <p className="text-md text-foreground/80 leading-relaxed">
                        {achievement.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AchievementsSection;
