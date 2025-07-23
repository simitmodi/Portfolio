'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNameProps {
  text: string;
  className?: string;
}

const AnimatedName = ({ text, className }: AnimatedNameProps) => {
  // Function to get the current primary color from CSS variables
  const getPrimaryColor = () => {
    if (typeof window === 'undefined') return 'hsl(0, 0%, 0%)'; // Fallback for SSR
    const style = getComputedStyle(document.documentElement);
    const primaryHsl = style.getPropertyValue('--primary').trim() || '0 0% 0%';
    return `hsl(${primaryHsl.split(' ').join(',')})`;
  };

  return (
    <svg
      className={cn("w-full h-full", className)}
      viewBox="0 0 400 100" 
      preserveAspectRatio="xMidYMid meet"
    >
      <style>
        {`
          .static-name {
            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
            fill: hsl(var(--primary));
          }
        `}
      </style>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="static-name"
      >
        {text}
      </text>
    </svg>
  );
};

export default AnimatedName;
