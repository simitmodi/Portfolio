'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { portfolioConfig } from '@/data/portfolioConfig';
import { useState } from 'react';

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
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b border-border/40 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 md:hidden">
      <Link href="/" className="flex items-center group">
        <span className="font-bold font-headline text-xl text-primary group-hover:text-accent transition-colors">
          {portfolioConfig.name}
        </span>
      </Link>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-transparent border-none shadow-none">
           <div className="bg-background/95 backdrop-blur-xl rounded-md border border-border/40 p-1">
             <DropdownMenuItem asChild>
               <Link href="/" className="font-bold font-headline text-lg text-primary" onClick={handleLinkClick}>
                  {portfolioConfig.name}
                </Link>
             </DropdownMenuItem>
             <DropdownMenuSeparator />
            {navItems.map((item) => (
              <DropdownMenuItem key={item.name} asChild>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="text-foreground/80 hover:text-primary transition-colors w-full"
                >
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default MobileNavigationBar;
