
'use client';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import TypingAnimation from '@/components/shared/TypingAnimation';
import { useState, useEffect } from 'react';

interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const SECTION_TITLE_RETYPE_INTERVAL = 7000; // 7 seconds

const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationKey(prevKey => prevKey + 1);
    }, SECTION_TITLE_RETYPE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h2
      className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-center mb-12 md:mb-16 text-primary min-h-[1.2em]", // min-h for stability
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <TypingAnimation key={animationKey} text={children} speed={75} />
      ) : (
        // If children is not a string (e.g., complex ReactNode), render as is.
        children
      )}
    </h2>
  );
};

export default SectionTitle;
