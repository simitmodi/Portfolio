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

    // Clean up previous animation instance
    if (animationInstance.current) {
      animationInstance.current.pause();
      anime.remove(spans);
    }
    
    // Define the timeline in a variable
    const timeline = anime.timeline({
      loop: false,
      autoplay: false,
      complete: () => {
        // Use a timeout to create a pause before restarting
        setTimeout(() => {
          timeline.play();
        }, 3000);
      },
    });

    // Add animations to the timeline
    timeline.add({
      targets: spans,
      translateY: [
        { value: '-2.75rem', easing: 'easeOutExpo', duration: 600 },
        { value: 0, easing: 'easeOutBounce', duration: 800, delay: 100 },
      ],
      rotate: {
        value: '1turn',
        duration: 1200,
        easing: 'inOutCubic',
      },
      delay: anime.stagger(50),
    });
    
    animationInstance.current = timeline; // Store instance for cleanup
    
    // Start the animation for the first time
    timeline.play();
      
    // Cleanup function
    return () => {
      if (animationInstance.current) {
        animationInstance.current.pause();
      }
      anime.remove(spans);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={cn("flex justify-center items-center overflow-hidden", className)}
      style={{ whiteSpace: 'pre' }}
    >
      {letters.map((letter, index) => (
        <span key={index} style={{ display: 'inline-block' }}>
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedName;
