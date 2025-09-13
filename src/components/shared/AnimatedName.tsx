
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import anime from 'animejs';

interface AnimatedNameProps {
  text: string;
  className?: string;
}

const AnimatedName = ({ text, className }: AnimatedNameProps) => {
  const [titleRef] = useScrollAnimation<HTMLHeadingElement>({ 
    triggerOnce: false, 
    threshold: 0.1,
    animation: {
      targets: '.letter',
      opacity: [0,1],
      translateY: [40,0],
      translateZ: 0,
      scale: [0.8, 1],
      delay: anime.stagger(40, {start: 300}),
      easing: 'easeOutExpo',
    }
  });

  const letters = text.split('').map((char, index) => (
    <span 
      key={index}
      className="letter inline-block opacity-0"
      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </span>
  ));

  return (
    <div ref={titleRef} className={cn("flex justify-center items-center", className)}>
      {letters}
    </div>
  );
};

export default AnimatedName;
