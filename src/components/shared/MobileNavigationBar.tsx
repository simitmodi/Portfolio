
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Code } from 'lucide-react';
import { portfolioConfig } from '@/data/portfolioConfig';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Academics', href: '#academics' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Extra-Curriculars', href: '#extracurriculars' },
  { name: 'Contact', href: '#contact' },
];

const MobileNavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b border-border/40 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 md:hidden">
      <Link href="/" className="flex items-center group">
        <span className="font-bold font-headline text-xl text-primary group-hover:text-accent transition-colors">
          {portfolioConfig.name}
        </span>
      </Link>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-xs bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col h-full p-4">
                 <Link href="/" className="flex items-center mb-8" onClick={handleLinkClick}>
                    <span className="font-bold font-headline text-2xl text-primary">
                    {portfolioConfig.name}
                    </span>
                </Link>
                <nav className="flex flex-col space-y-4 text-lg">
                {navItems.map((item) => (
                    <SheetClose key={item.name} asChild>
                        <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className="text-foreground/80 hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    </SheetClose>
                ))}
                </nav>
            </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigationBar;
