'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, Inbox, Edit, LogOut, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AdminDashboardPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-destructive">
        <p className="text-lg mb-4">Error: {error.message}</p>
        <Link href="/login">
          <Button>Return to Login</Button>
        </Link>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary/30 p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline text-primary">Admin Dashboard</CardTitle>
            <CardDescription>What would you like to do?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/new-post" className="block">
              <Button className="w-full" size="lg">
                <Edit className="mr-2 h-5 w-5" />
                Write New Post
              </Button>
            </Link>
            <Link href="/admin/posts" className="block">
              <Button className="w-full" size="lg" variant="secondary">
                <Newspaper className="mr-2 h-5 w-5" />
                Manage Posts
              </Button>
            </Link>
            <Link href="/inbox" className="block">
              <Button className="w-full" size="lg" variant="secondary">
                <Inbox className="mr-2 h-5 w_5" />
                View Messages
              </Button>
            </Link>
            <Button className="w-full mt-4" variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
