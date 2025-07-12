
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
  const animationInstance = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Function to get the current primary color from CSS variables
    const getPrimaryColor = () => {
        // Ensure this runs client-side only
        if (typeof window === 'undefined') return 'hsl(0, 0%, 0%)';
        return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    }
    
    // Function to set the colors on the SVG text elements
    const updateColors = () => {
        if (!svg) return;
        const color = `hsl(${getPrimaryColor()})`;
        const textElements = svg.querySelectorAll('.animated-text');
        textElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.stroke = color;
            htmlEl.style.fill = color;
        });
    };
    
    // Clear previous content and animation
    if (animationInstance.current) {
      anime.remove(animationInstance.current.targets);
    }
    svg.innerHTML = ''; 

    // Split text and create SVG text elements
    const textParts = text.split(' ');
    const firstName = textParts[0] || '';
    const lastName = textParts.slice(1).join(' ') || '';

    svg.innerHTML = `
      <style>
        .animated-text {
          stroke-width: 1;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          fill-opacity: 0;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
        }
      </style>
      <text class="animated-text first-name" x="50%" y="50%" dominant-baseline="central" text-anchor="end" dx="-0.2em">${firstName}</text>
      <text class="animated-text last-name" x="50%" y="50%" dominant-baseline="central" text-anchor="start" dx="0.2em">${lastName}</text>
    `;

    const textElements = svg.querySelectorAll('.animated-text');

    // Set initial colors
    updateColors();

    // Start the animation
    animationInstance.current = anime.timeline({
      loop: true,
      direction: 'alternate',
      duration: 4000, // Total duration for one way
    })
    .add({
      targets: textElements,
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: anime.stagger(250),
    })
    .add({
      targets: textElements,
      fillOpacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 800,
    }, '-=500') // Overlap with the end of the drawing animation
    .add({
      // Hold with the filled text for a bit
      duration: 2000,
    });

    // --- Dynamic Color Update Logic ---
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateColors();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    // Cleanup function
    return () => {
      observer.disconnect();
      if (animationInstance.current) {
        anime.remove(animationInstance.current.targets);
      }
    };
  }, [text]);

  return (
    <div className={cn("w-full h-full", className)}>
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid meet"></svg>
    </div>
  );
};

export default AnimatedName;
