
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

    // Ensure we have spans to animate
    const spans = container.querySelectorAll('span');
    if (spans.length === 0) return;

    const timeline = anime.timeline({
      loop: true,
      delay: (_, i) => i * 50,
    });

    timeline.add({
      targets: spans,
      // Property keyframes
      translateY: [
        { value: '-1.75rem', easing: 'easeOutExpo', duration: 600 },
        { value: 0, easing: 'easeOutBounce', duration: 800, delay: 100 }
      ],
      // Property specific parameters
      rotate: {
        value: '1turn',
        duration: 1200,
        easing: 'easeInCubic'
      },
      loopDelay: 1000,
    });
      
    return () => {
      timeline.pause();
      anime.remove(spans);
    };
  }, [text]); // Rerun effect if text prop changes

  return (
    <div
      ref={containerRef}
      className={cn("flex justify-center items-center overflow-hidden", className)}
      style={{ whiteSpace: 'pre' }} // Preserve spaces
    >
      {letters.map((letter, index) => (
        <span key={index} style={{ display: 'inline-block' }}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedName;
