'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNameProps {
  text: string;
  className?: string;
}

const AnimatedName = ({ text, className }: AnimatedNameProps) => {
  // Simple static implementation to prevent crashes.
  return (
    <div className={cn("flex justify-center items-center", className)}>
      {text}
    </div>
  );
};

export default AnimatedName;
