
'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, Inbox, Edit, LogOut, Newspaper, BookText, User, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import type { BlogPost } from '@/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


interface Stats {
  totalPosts: number;
  professionalPosts: number;
  personalPosts: number;
  messages: number;
}

type FilterType = 'all' | 'professional' | 'personal';

export default function AdminDashboardPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setIsDataLoading(true);
        try {
          const postsCollection = collection(db, 'blog');
          const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
          const postsSnapshot = await getDocs(postsQuery);
          
          let professionalCount = 0;
          let personalCount = 0;
          const fetchedPosts: BlogPost[] = postsSnapshot.docs.map(doc => {
            const data = doc.data() as BlogPost;
            const category = data.category || 'professional';
            
            if (category === 'professional') {
              professionalCount++;
            } else {
              personalCount++;
            }
            return {
              ...data,
              category,
              slug: data.slug || doc.id,
              date: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
            };
          });

          const contactsSnapshot = await getDocs(collection(db, 'contacts'));

          setStats({
            totalPosts: fetchedPosts.length,
            professionalPosts: professionalCount,
            personalPosts: personalCount,
            messages: contactsSnapshot.size,
          });

          setAllPosts(fetchedPosts);
          setFilteredPosts(fetchedPosts); // Initially show all posts

        } catch (err) {
          console.error("Failed to fetch dashboard data:", err);
        } finally {
          setIsDataLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(allPosts.filter(post => post.category === activeFilter));
    }
  }, [activeFilter, allPosts]);


  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  if (loading || isDataLoading) {
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
      <div className="min-h-screen bg-secondary/10 p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary font-headline">Welcome, Simit!</h1>
              <p className="text-muted-foreground">Here's your personal space overview.</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </header>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <BookText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalPosts ?? 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Professional Posts</CardTitle>
                <Newspaper className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.professionalPosts ?? 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Personal Posts</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.personalPosts ?? 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.messages ?? 0}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-4">
               <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start" size="lg">
                    <Link href="/admin/new-post"><Edit className="mr-2 h-5 w-5" /> Write New Post</Link>
                  </Button>
                  <Button asChild className="w-full justify-start" size="lg" variant="secondary">
                     <Link href="/admin/posts"><Newspaper className="mr-2 h-5 w-5" /> Manage All Posts</Link>
                  </Button>
                  <Button asChild className="w-full justify-start" size="lg" variant="secondary">
                    <Link href="/inbox"><Inbox className="mr-2 h-5 w_5" /> View Inbox</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Posts</CardTitle>
                  <CardDescription>View, filter, and manage all your posts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as FilterType)}>
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="professional">Professional</TabsTrigger>
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                    </TabsList>
                    <TabsContent value={activeFilter}>
                      {filteredPosts.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead className="hidden md:table-cell">Date</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredPosts.map((post) => (
                              <TableRow key={post.slug}>
                                <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                                <TableCell>
                                  <Badge variant={post.category === 'personal' ? 'secondary' : 'default'}>
                                    {(post.category || 'professional').charAt(0).toUpperCase() + (post.category || 'professional').slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{format(new Date(post.date), "MMMM d, yyyy")}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/posts/edit?slug=${post.slug}`)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                         <p className="text-center text-muted-foreground py-12">
                          No {activeFilter !== 'all' ? activeFilter : ''} posts found.
                         </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
