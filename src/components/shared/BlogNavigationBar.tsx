
'use client';

import Link from 'next/link';
import { portfolioConfig } from '@/data/portfolioConfig';
import { Button } from '@/components/ui/button';
import { Newspaper, Home } from 'lucide-react';
import MobileThemeSwitcher from './MobileThemeSwitcher';

const BlogNavigationBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-auto flex items-center group">
          <span className="font-bold font-headline text-xl text-primary group-hover:text-accent transition-colors">
            {portfolioConfig.name}
          </span>
        </Link>
        <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
                <Link href="/" title="Return to Home">
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/blog" title="All Posts">
                    <Newspaper className="h-5 w-5" />
                    <span className="sr-only">All Posts</span>
                </Link>
            </Button>
            <div className="block md:hidden">
              <MobileThemeSwitcher />
            </div>
        </nav>
      </div>
    </header>
  );
};

export default BlogNavigationBar;
