'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

// Helper to create a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
};

export default function NewPostPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill out all fields to publish the post.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const slug = createSlug(title);
      const postData = {
        title,
        excerpt,
        content, // Storing as simple text, can be converted to HTML on render if needed
        date: new Date().toISOString(),
        slug: slug,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'blog'), postData);
      
      // Update doc with its own ID as slug (optional, but good practice)
      // await updateDoc(docRef, { slug: docRef.id });

      toast({
        title: 'Post Published!',
        description: 'Your new blog post is now live.',
      });
      router.push(`/blog/${slug}`);
    } catch (error) {
      console.error('Error publishing post:', error);
      toast({
        title: 'Publishing Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Editor...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect is handled by useEffect
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/30 p-4 sm:p-6">
      <Card className="w-full max-w-3xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-headline text-primary">Create New Blog Post</CardTitle>
          <CardDescription>Fill out the details below and publish your article.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Your awesome blog post title"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-lg">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short, catchy summary of your post."
                rows={3}
                className="resize-none"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-lg">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your full post here. You can use HTML for formatting."
                rows={12}
                className="resize-y"
                disabled={isSubmitting}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-6">
            <Link href="/admin">
              <Button type="button" variant="outline" disabled={isSubmitting}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Publish Post
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
