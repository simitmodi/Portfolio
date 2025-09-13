
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import anime from 'animejs';
import { format, parseISO } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const [cardRef] = useScrollAnimation<HTMLDivElement>({
    triggerOnce: false,
    threshold: 0.15,
    animation: {
      translateY: [50, 0],
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(150, { start: index * 100 }),
      easing: 'easeOutExpo',
    },
  });

  return (
    <Dialog>
      <Card
        ref={cardRef}
        className={cn(
          "flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out",
          "opacity-0" // Start hidden, animation will show it
        )}
      >
        <CardHeader>
          <CardTitle className="text-xl font-headline mb-1 text-accent">{post.title}</CardTitle>
          <CardDescription>{format(parseISO(post.date), "MMMM d, yyyy")}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-foreground/80 line-clamp-4">{post.excerpt}</p>
        </CardContent>
        <CardFooter>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent className="sm:max-w-3xl h-[90vh] flex flex-col bg-background/20 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-primary">{post.title}</DialogTitle>
          <p className="text-sm text-muted-foreground">{format(parseISO(post.date), "MMMM d, yyyy")}</p>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-6 -mr-6">
          <div 
            className="prose dark:prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BlogCard;
