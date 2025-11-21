
'use client';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import AnimatedHeading from '@/components/shared/AnimatedHeading';

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => {
  return (
    <h2
      className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary min-h-[1.2em]",
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <AnimatedHeading text={children} />
      ) : (
        children
      )}
    </h2>
  );
};

export default SectionTitle;

