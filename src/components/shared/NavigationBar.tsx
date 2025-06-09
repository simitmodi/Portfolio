
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { portfolioConfig } from '@/data/portfolioConfig';
// Code2 icon is removed as it's replaced by the 'S' logo.

const NavigationBar = () => {
  const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-auto flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary text-primary-foreground text-2xl font-bold font-headline hover:bg-accent transition-colors">
            S
          </div>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2 ml-6">
          <Button asChild variant="outline" size="sm">
            <Link href={portfolioConfig.contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Button>
          <Button asChild size="sm">
             <Link href="#contact">
              Hire Me
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
