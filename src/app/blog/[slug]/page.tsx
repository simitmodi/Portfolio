
'use client';

import { blogData } from '@/data/blogData';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-between items-center gap-4">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Posts
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
          <article className="prose prose-lg dark:prose-invert max-w-none bg-card p-6 sm:p-8 rounded-lg shadow-xl">
            <header className="mb-8 border-b pb-4">
              <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary">
                {post.title}
              </h1>
              <p className="text-md text-muted-foreground mt-2">
                Posted on {format(new Date(post.date), "MMMM d, yyyy")}
              </p>
            </header>
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
