
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import SectionTitle from '@/components/shared/SectionTitle';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/types';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'blog');
        const q = query(
          postsCollection, 
          where('category', '==', 'professional'),
          orderBy('date', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedPosts: BlogPost[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            slug: data.slug || doc.id,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
          };
        });
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching all posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map((post) => (
                <Card key={post.slug} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline text-accent hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {format(parseISO(post.date), "MMMM d, yyyy")}
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
          ) : (
            <p className="text-center text-foreground/70 text-lg">
              There are no posts to display yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
