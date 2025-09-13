
'use client';

import { useState, useEffect } from 'react';
import type { BlogPost } from '@/types';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (post.date) {
      const postDate = parseISO(post.date);
      setFormattedDate(format(postDate, "MMMM d, yyyy"));
    }
  }, [post.date]);

  return (
      <div className="container mx-auto py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg dark:prose-invert max-w-none bg-card p-6 sm:p-8 rounded-lg shadow-xl">
            <header className="mb-8 border-b pb-4">
              <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary">
                {post.title}
              </h1>
              <p className="text-md text-muted-foreground mt-2">
                Posted on {formattedDate || '...'}
              </p>
            </header>
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
  );
}
