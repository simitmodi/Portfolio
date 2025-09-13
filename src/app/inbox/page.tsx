
'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Inbox from '@/components/shared/Inbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InboxPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user is authenticated, redirect to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Your Inbox...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-destructive">
        <p className="text-lg mb-4">Error: {error.message}</p>
        <Link href="/login">
            <Button>Go to Login</Button>
        </Link>
      </div>
    );
  }

  if (user) {
    return <Inbox />;
  }

  // This is a fallback, but useEffect should handle the redirect.
  return null;
}
