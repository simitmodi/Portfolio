
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
import { cn } from '@/lib/utils';
import { LiveTime, LiveWeather } from './LiveClock';

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
    <div className="fixed top-4 left-0 right-4 z-50 flex flex-col items-end md:hidden">
      {/* Top Row */}
      <div className="flex w-full items-center">
        <div className="flex-grow" />
        <div className="flex items-center gap-2">
            <Link href="/" className="group h-10 flex items-center px-4 rounded-full shadow-lg bg-background/95 backdrop-blur-xl border border-border/40">
              <span className="font-bold font-headline text-xl text-primary group-hover:text-accent transition-colors">
                  {portfolioConfig.name}
              </span>
            </Link>
            <LiveTime />
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-border/40 bg-background/95 backdrop-blur-xl shadow-lg">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 rounded-xl mt-2 border-border/40 bg-background/95 backdrop-blur-xl shadow-lg"
              >
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
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      
      {/* Second Row */}
      <div className="flex">
        <LiveWeather />
      </div>
    </div>
  );
};

export default MobileNavigationBar;
