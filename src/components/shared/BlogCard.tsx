
'use client';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import anime from 'animejs';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

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
    <Card
      ref={cardRef}
      className={cn(
        "flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out",
        "opacity-0" // Start hidden, animation will show it
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl font-headline mb-1 text-accent">{post.title}</CardTitle>
        <CardDescription>{format(new Date(post.date), "MMMM d, yyyy")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80 line-clamp-4">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="px-0 transition-transform duration-200 ease-out hover:translate-x-1">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
