
'use client';

import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { cn } from '@/lib/utils';

interface AnimatedNameProps {
  text: string;
  className?: string;
}

const AnimatedName = ({ text, className }: AnimatedNameProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Split text into two parts for staggering
    const textParts = text.split(' ');
    const firstName = textParts[0];
    const lastName = textParts.slice(1).join(' ');

    // Clear previous animations and content
    svg.innerHTML = `
      <text class="animated-text first-name" x="50%" y="50%" dominant-baseline="central" text-anchor="end" dx="-0.2em">${firstName}</text>
      <text class="animated-text last-name" x="50%" y="50%" dominant-baseline="central" text-anchor="start" dx="0.2em">${lastName}</text>
    `;

    const textElements = svg.querySelectorAll('.animated-text');

    anime.timeline({
      loop: true,
      direction: 'alternate',
    })
    .add({
      targets: textElements,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: (el, i) => i * 250,
    })
    .add({
      targets: textElements,
      fillOpacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 800,
    }, '-=500') // Start fill animation before stroke animation finishes
    .add({
      targets: textElements,
      fillOpacity: [1, 0],
      strokeDashoffset: [0, anime.setDashoffset],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: (el, i) => i * 250 + 2000, // Wait 2 seconds before reversing
    });

  }, [text]);

  return (
    <div className={cn("w-full h-full", className)}>
      <style jsx>{`
        .animated-text {
          stroke: hsl(var(--primary));
          stroke-width: 1;
          stroke-dasharray: 1000; /* A large value */
          stroke-dashoffset: 1000; /* A large value */
          fill: hsl(var(--primary));
          fill-opacity: 0;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
        }
      `}</style>
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid meet"></svg>
    </div>
  );
};

export default AnimatedName;
