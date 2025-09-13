'use client';
import SectionTitle from '@/components/shared/SectionTitle';
import BlogCard from '@/components/shared/BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/types';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const BlogSection = () => {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'blog');
        const q = query(
          postsCollection, 
          where('category', '==', 'professional'),
          orderBy('date', 'desc'), 
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const posts: BlogPost[] = querySnapshot.docs.map(doc => {
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
        setLatestPosts(posts);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="bg-background">
      <div className="container mx-auto">
        <SectionTitle>Latest Posts</SectionTitle>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : latestPosts.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
              {latestPosts.map((post, index) => (
                <div key={post.slug} className="w-full max-w-lg">
                  <BlogCard post={post} index={index} />
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
                <Link href="/blog">
                  View All Posts <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-foreground/70">
            No blog posts to display yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
