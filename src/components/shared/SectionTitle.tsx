
'use client';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => {
  const [ref, isInView] = useScrollAnimation<HTMLHeadingElement>({ triggerOnce: true, threshold: 0.1 });

  return (
    <h2
      ref={ref}
      className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary",
        "opacity-0", // Start hidden
        isInView && "animate-fade-in", // Animate when in view
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
