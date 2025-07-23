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
  const animationInstance = useRef<anime.AnimeTimelineInstance | null>(null);
  const letters = text.split('');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll('span');
    if (spans.length === 0) return;

    // Clear any previous animation instance
    if (animationInstance.current) {
      animationInstance.current.pause();
      anime.remove(spans);
    }

    const timeline = anime.timeline({
      // Do not loop here, we will handle it manually
      loop: false,
      autoplay: false, // Start manually
      complete: () => {
        // When the animation completes, wait 3 seconds then play again
        setTimeout(() => {
          timeline.play();
        }, 3000);
      }
    });

    timeline.add({
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
    });
    
    // Store the instance and start it
    animationInstance.current = timeline;
    timeline.play();
      
    return () => {
      // Cleanup on component unmount
      if (animationInstance.current) {
        animationInstance.current.pause();
      }
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
