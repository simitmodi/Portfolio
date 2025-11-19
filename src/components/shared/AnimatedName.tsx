'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import anime from 'animejs';

interface AnimatedNameProps {
  text: string;
  className?: string;
}

const AnimatedName = ({ text, className }: AnimatedNameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.letter');
    let timeoutId: NodeJS.Timeout;
    let animation: anime.AnimeInstance;

    const runAnimation = () => {
      animation = anime({
        targets: chars,
        translateY: [
          { value: '-2.75rem', easing: 'easeOutExpo', duration: 600 },
          { value: 0, easing: 'easeOutBounce', duration: 800, delay: 100 }
        ],
        rotate: {
          value: ['-1turn', '0turn'],
          duration: 1400,
          easing: 'easeInOutCirc'
        },
        delay: anime.stagger(50),
        loop: false, // Disable built-in loop
        complete: () => {
          // Manually trigger next loop after 6 seconds
          timeoutId = setTimeout(runAnimation, 6000);
        }
      });
    };

    runAnimation();

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (animation) animation.pause();
    };
  }, [text]);

  const letters = text.split('').map((char, index) => (
    <span
      key={index}
      className="letter inline-block origin-bottom"
      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </span>
  ));

  return (
    <div ref={containerRef} className={cn("flex justify-center items-center", className)}>
      {letters}
    </div>
  );
};

export default AnimatedName;
