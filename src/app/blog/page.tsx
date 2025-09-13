
'use client';

import Link from 'next/link';
import { blogData } from '@/data/blogData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home } from 'lucide-react';
import { format } from 'date-fns';
import SectionTitle from '@/components/shared/SectionTitle';

export default function BlogListPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-16 sm:py-20 md:py-24">
        <SectionTitle>My Blog</SectionTitle>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link href="/" className="inline-block">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>
          <div className="space-y-12">
            {blogData.map((post) => (
              <Card key={post.slug} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline text-accent hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="px-0">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
