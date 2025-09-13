
'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Inbox as InboxIcon, LogOut, Mail, ArrowLeft } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';


interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesCollection = collection(db, 'contacts');
        const q = query(messagesCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedMessages = querySnapshot.docs.map(doc => {
          const data = doc.data();
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
        if (fetchedMessages.length > 0) {
          setSelectedMessage(fetchedMessages[0]);
        }
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
    <div className="min-h-screen bg-secondary/10 text-foreground flex flex-col backdrop-blur-xl">
      <header className="flex h-16 items-center justify-between border-b bg-background/50 px-4 md:px-6 sticky top-0 z-10">
        <div className='flex items-center gap-3'>
          <Link href="/admin" className="mr-2">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <InboxIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-primary">Inbox</h1>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>
      
      <div className="flex-1 grid md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
        {/* Message List Sidebar */}
        <div className="border-r bg-background/30">
            <div className="p-4">
                <h2 className="text-xl font-semibold">Messages ({messages.length})</h2>
            </div>
            <Separator />
            {isLoading ? (
                 <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
            ) : messages.length === 0 ? (
                <div className="text-center text-foreground/70 p-6">Your inbox is empty.</div>
            ) : (
                <ScrollArea className="h-[calc(100vh-5rem)]">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            className={cn(
                                "cursor-pointer border-b p-4 transition-colors",
                                selectedMessage?.id === msg.id 
                                    ? "bg-primary/20" 
                                    : "hover:bg-secondary/50"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-semibold text-primary text-md truncate">{msg.name}</span>
                                <span className="text-xs text-foreground/60 flex-shrink-0 ml-2">
                                    {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-sm text-foreground/70 truncate">{msg.email}</p>
                        </div>
                    ))}
                </ScrollArea>
            )}
        </div>

        {/* Message Detail View */}
        <div className="flex flex-col bg-background/10">
          {isLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : selectedMessage ? (
            <>
              <div className="p-4 md:p-6 border-b bg-background/20">
                <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">{getInitials(selectedMessage.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h2 className="text-xl lg:text-2xl font-semibold">{selectedMessage.name}</h2>
                        <p className="text-sm text-foreground/70">{selectedMessage.email}</p>
                    </div>
                    <div className="text-right text-xs text-foreground/60">
                        <div>{format(selectedMessage.createdAt, "PP")}</div>
                        <div>{format(selectedMessage.createdAt, "p")}</div>
                    </div>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-4 md:p-6 whitespace-pre-wrap text-md leading-relaxed">
                  {selectedMessage.message}
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center text-foreground/70 p-8">
              <Mail className="h-16 w-16 mb-4" />
              <h2 className="text-2xl font-semibold">Select a message</h2>
              <p>Choose a message from the list to view its content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
