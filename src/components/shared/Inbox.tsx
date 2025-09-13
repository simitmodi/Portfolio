
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Inbox as InboxIcon, LogOut } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollection = collection(db, 'contacts');
        const q = query(messagesCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Convert Firestore Timestamp to JS Date
          const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            message: data.message,
            createdAt: createdAt,
          };
        });
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className='flex items-center gap-3'>
            <InboxIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-headline font-bold text-primary">Inbox</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle>Received Messages</CardTitle>
            <CardDescription>
              {isLoading ? 'Loading messages...' : `You have ${messages.length} messages.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : messages.length === 0 ? (
              <p className="text-center text-foreground/70 py-10">Your inbox is empty.</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {messages.map((msg) => (
                  <AccordionItem key={msg.id} value={msg.id}>
                    <AccordionTrigger>
                      <div className="flex justify-between w-full pr-4">
                        <div className="flex items-center gap-4">
                          <span className="font-semibold text-primary">{msg.name}</span>
                          <span className="text-sm text-foreground/70 truncate hidden sm:inline">{msg.email}</span>
                        </div>
                        <span className="text-sm text-foreground/70 text-right">
                          {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                      <p className="whitespace-pre-wrap">{msg.message}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
