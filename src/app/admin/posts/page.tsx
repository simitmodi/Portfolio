
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import type { BlogPost } from '@/types';

export default function ManagePostsPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { toast } = useToast();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const postsCollection = collection(db, 'blog');
      const q = query(postsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts: BlogPost[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          slug: data.slug || doc.id,
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          content: data.content,
          createdAt: data.createdAt?.toDate().toISOString(),
        };
      });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    setIsDeleting(slug);
    try {
      // This assumes slug is the document ID, which might not be correct.
      // A safer approach is to query for the document with this slug.
      // For now, we stick to the existing logic which seems to be working for deletion.
      const postsCollection = collection(db, 'blog');
      const q = query(postsCollection, where('slug', '==', slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const postDoc = querySnapshot.docs[0];
        await deleteDoc(doc(db, 'blog', postDoc.id));
        toast({
          title: "Post Deleted",
          description: "The blog post has been successfully deleted.",
        });
        fetchPosts(); // Refresh the list
      } else {
         // Fallback for older posts that might use ID as slug
        const docRef = doc(db, "blog", slug);
        await deleteDoc(docRef);
        toast({
          title: "Post Deleted",
          description: "The blog post has been successfully deleted.",
        });
        fetchPosts(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: 'Deletion Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Posts...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }
  
  return (
    <div className="min-h-screen bg-secondary/10 p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/admin">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <Card className="shadow-2xl bg-background/50">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-headline text-primary">Manage Blog Posts</CardTitle>
            <CardDescription>View, edit, or delete your published articles.</CardDescription>
          </CardHeader>
          <CardContent>
            {posts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Date Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.slug}>
                      <TableCell className="font-medium max-w-xs truncate">
                        <Link href={`/blog/${post.slug}`} className="hover:underline" target="_blank" title="View Post">
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{format(parseISO(post.date), "MMMM d, yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Edit Post"
                            onClick={() => router.push(`/admin/posts/edit/${post.slug}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" title="Delete Post" disabled={isDeleting === post.slug}>
                                {isDeleting === post.slug ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the post titled "{post.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(post.slug)} className="bg-destructive hover:bg-destructive/90">
                                  Yes, delete it
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-muted-foreground py-12">You have not published any posts yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
