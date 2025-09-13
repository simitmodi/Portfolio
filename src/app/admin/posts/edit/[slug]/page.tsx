
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { BlogPost } from '@/types';

const RichTextEditor = dynamic(() => import('@/components/shared/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="min-h-64 bg-background rounded-md border border-input flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>,
});

export default function EditPostPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && slug) {
      const fetchPost = async () => {
        setIsLoadingPost(true);
        try {
          // In a static export, Firestore queries by slug field are more reliable.
          // Fallback to doc(db, 'blog', slug) might not work as expected if slug is not the doc ID.
          // A more robust solution might require querying the collection.
          // For simplicity, we assume slug is the document ID for editing.
          const postRef = doc(db, 'blog', slug);
          const postSnap = await getDoc(postRef);

          if (postSnap.exists()) {
            const postData = postSnap.data() as BlogPost;
            setPost(postData);
            setTitle(postData.title);
            setExcerpt(postData.excerpt);
            setContent(postData.content);
          } else {
            toast({
              title: 'Post Not Found',
              description: 'The requested blog post does not exist.',
              variant: 'destructive',
            });
            router.push('/admin/posts');
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          toast({
            title: "Error",
            description: "Failed to load post data.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingPost(false);
        }
      };
      fetchPost();
    }
  }, [user, slug, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill out all fields to update the post.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const postRef = doc(db, 'blog', slug);
      const postData = {
        title,
        excerpt,
        content,
        // The original slug and date should likely remain unchanged
        updatedAt: serverTimestamp(),
      };

      await updateDoc(postRef, postData);
      
      toast({
        title: 'Post Updated!',
        description: 'Your blog post has been successfully updated.',
      });
      router.push(`/admin/posts`);
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: 'Update Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading || isLoadingPost) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Post Editor...</p>
      </div>
    );
  }

  if (!user || !post) {
    return null; // Redirects handled by useEffects
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/10 p-4 sm:p-6 backdrop-blur-xl">
      <Card className="w-full max-w-3xl mx-auto shadow-2xl bg-background/50">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-headline text-primary">Edit Blog Post</CardTitle>
          <CardDescription>Make changes to your article and save them.</CardDescription>
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
              {/* Conditional render to avoid SSR issues with editor */}
              {typeof window !== 'undefined' && (
                <RichTextEditor
                  id="content"
                  value={content}
                  onChange={setContent}
                  placeholder="Write your full post here..."
                  className="bg-background"
                  disabled={isSubmitting}
                />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-6">
            <Link href="/admin/posts">
              <Button type="button" variant="outline" disabled={isSubmitting}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
