
'use client';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import TypingAnimation from '@/components/shared/TypingAnimation'; // Import TypingAnimation

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => {
  const [ref, isInView] = useScrollAnimation<HTMLHeadingElement>({ triggerOnce: false, threshold: 0.1 });

  return (
    <h2
      ref={ref}
      className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary min-h-[1.2em]", // Added min-h for stability
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        isInView ? (
          <TypingAnimation text={children} speed={75} />
        ) : (
          // Render invisible text to hold space and prevent layout shift
          <span className="opacity-0" aria-hidden="true">
            {children}
          </span>
        )
      ) : (
        // If children is not a string (e.g., complex ReactNode), render as is.
        children
      )}
    </h2>
  );
};

export default SectionTitle;
