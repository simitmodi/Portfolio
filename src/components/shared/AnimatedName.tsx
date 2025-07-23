
'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface AnimatedNameProps {
  text: string;
  className?: string;
}

const AnimatedName = ({ text, className }: AnimatedNameProps) => {
  const textRef = useRef<SVGTextElement>(null);
  const letters = text.split('');

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    // Ensure we have tspans to animate
    const tspans = textElement.querySelectorAll('tspan');
    if (tspans.length === 0) return;

    // Get primary color from CSS variables for the animation
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const primaryHSL = `hsl(${primaryColor.split(' ').join(',')})`;

    const timeline = anime.timeline({
      loop: true,
      direction: 'alternate',
      duration: 3000,
    });

    timeline
      .add({
        targets: tspans,
        color: [
          { value: primaryHSL, duration: 100 },
        ],
        opacity: [
          { value: 0, duration: 100, delay: anime.stagger(25) },
          { value: 1, duration: 500, delay: anime.stagger(25) },
        ],
        easing: 'easeOutSine',
      })
      .add({
        targets: tspans,
        opacity: [
          { value: 1, duration: 500 },
          { value: 0, duration: 1000, delay: anime.stagger(25) },
        ],
        delay: 2000, // Hold the visible text for 2 seconds before fading out
        easing: 'easeInSine',
      });
      
    return () => {
      timeline.pause();
    };
  }, [letters.join('')]); // Rerun effect if text prop changes

  return (
    <svg
      className={cn("w-full h-full", className)}
      viewBox="0 0 400 100" 
      preserveAspectRatio="xMidYMid meet"
    >
       <style>
        {`
          .animated-name {
            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
          }
        `}
      </style>
      <text
        ref={textRef}
        className="animated-name"
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="hsl(var(--primary))"
      >
        {letters.map((letter, index) => (
          <tspan key={index} style={{ opacity: 0 }}>
            {letter === ' ' ? '\u00A0' : letter}
          </tspan>
        ))}
      </text>
    </svg>
  );
};

export default AnimatedName;
