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
    if (!svg || !text) return;

    // Function to get the current primary color from CSS variables
    const getPrimaryColor = () => {
      if (typeof window === 'undefined') return 'hsl(0, 0%, 0%)';
      const style = getComputedStyle(document.documentElement);
      const primaryHsl = style.getPropertyValue('--primary').trim() || '0 0% 0%';
      return `hsl(${primaryHsl.split(' ').join(',')})`;
    };
    
    const getForegroundColor = () => {
        if (typeof window === 'undefined') return 'hsl(0, 0%, 100%)';
        const style = getComputedStyle(document.documentElement);
        const foregroundHsl = style.getPropertyValue('--foreground').trim() || '0 0% 100%';
        return `hsl(${foregroundHsl.split(' ').join(',')})`;
    }

    const updateColors = () => {
      if (!svg) return;
      const primaryColor = getPrimaryColor();
      const foregroundColor = getForegroundColor();
      const textElements = svg.querySelectorAll('.letter');
      textElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl) {
          htmlEl.style.fill = primaryColor;
          htmlEl.style.stroke = foregroundColor;
        }
      });
    };
    
    // Create text elements for animation
    const textElements = text.split('').map((letter) => {
      // Use non-breaking space for spaces to ensure they are rendered and have width
      return `<tspan class="letter">${letter === ' ' ? '\u00A0' : letter}</tspan>`;
    }).join('');
    
    // Set up the SVG structure
    svg.innerHTML = `
      <style>
        .letter {
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          stroke-width: 1;
          fill-opacity: 0;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
      </style>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="animated-text">
        ${textElements}
      </text>
    `;

    updateColors();

    // Create the animation timeline
    anime.timeline({
      loop: false,
      direction: 'normal',
    }).add({
      targets: '.animated-text .letter',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 700,
      delay: anime.stagger(100)
    }).add({
      targets: '.animated-text .letter',
      fillOpacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 500,
    }, '-=300'); // Start this animation 300ms before the previous one ends


    // Watch for theme changes to update colors
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
          updateColors();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [text]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full", className)}
      viewBox="0 0 400 100" // Adjust viewBox as needed
      preserveAspectRatio="xMidYMid meet"
    ></svg>
  );
};

export default AnimatedName;
