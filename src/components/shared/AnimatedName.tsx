'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNameProps {
  text: string;
  className?: string;
}

// Stripped down version without animation to focus on alignment
const AnimatedName = ({ text, className }: AnimatedNameProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !text) return;

    // Function to get the current primary color from CSS variables
    const getPrimaryColor = () => {
        if (typeof window === 'undefined') return 'hsl(0, 0%, 0%)';
        const style = getComputedStyle(document.documentElement);
        // Fallback to black if the variable is not set
        const primaryHsl = style.getPropertyValue('--primary').trim() || '0 0% 0%';
        return `hsl(${primaryHsl.split(' ').join(',')})`;
    }
    
    // Function to set the colors on the SVG text elements
    const updateColors = () => {
        if (!svg) return;
        const color = getPrimaryColor();
        const textElements = svg.querySelectorAll('.static-text');
        textElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            if (htmlEl) {
              htmlEl.style.fill = color;
            }
        });
    };

    const textParts = text.split(' ');
    const firstName = textParts[0] || '';
    // Add a leading space to the last name to create the visual gap
    const lastName = textParts.length > 1 ? ` ${textParts.slice(1).join(' ')}` : '';

    if (!firstName) {
      console.error("AnimatedName: First name is missing from the text prop.");
      return;
    }

    // Simplified static SVG structure
    svg.innerHTML = `
      <style>
        .static-text {
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
        }
      </style>
      <text class="static-text first-name" x="50%" y="50%" dominant-baseline="central" text-anchor="end">${firstName}</text>
      <text class="static-text last-name" x="50%" y="50%" dominant-baseline="central" text-anchor="start">${lastName}</text>
    `;

    updateColors();

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
      viewBox="0 0 400 100" 
      preserveAspectRatio="xMidYMid meet"
    ></svg>
  );
};

export default AnimatedName;
