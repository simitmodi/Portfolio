'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface AnimatedNameProps {
  text: string;
  className?: string;
}

const AnimatedName = ({ text, className }: AnimatedNameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = text.split('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const spans = container.querySelectorAll('span');
    if (spans.length === 0) return;

    // A simple, reliable animation loop
    anime({
      targets: spans,
      translateY: [
        { value: '-2.75rem', easing: 'easeOutExpo', duration: 600 },
        { value: 0, easing: 'easeOutBounce', duration: 800, delay: 100 }
      ],
      rotate: {
        value: '1turn',
        duration: 1200,
        easing: 'inOutCubic'
      },
      delay: anime.stagger(50),
      loop: true,
      loopDelay: 3000, // 3-second delay between loops
      easing: 'inOutCirc',
    });

    // Cleanup function
    return () => {
      anime.remove(spans);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={cn("flex justify-center items-center overflow-hidden", className)}
      style={{ whiteSpace: 'pre' }} // Preserve spaces
    >
      {letters.map((letter, index) => (
        <span key={index} style={{ display: 'inline-block' }}>
          {/* Use non-breaking space for spaces to ensure they are rendered */}
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedName;
