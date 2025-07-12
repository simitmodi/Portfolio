
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
    if (!svg || !text) return; // Add check for text prop

    // Function to get the current primary color from CSS variables
    const getPrimaryColor = () => {
        // Ensure this runs client-side only
        if (typeof window === 'undefined') return 'hsl(0, 0%, 0%)';
        const style = getComputedStyle(document.documentElement);
        const primaryHsl = style.getPropertyValue('--primary').trim();
        // Convert HSL string to a usable color value for anime.js
        return `hsl(${primaryHsl})`;
    }
    
    // Function to set the colors on the SVG text elements
    const updateColors = () => {
        if (!svg) return;
        const color = getPrimaryColor();
        const textElements = svg.querySelectorAll('.animated-text');
        textElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            if (htmlEl) {
              htmlEl.style.stroke = color;
              // Reset fill for the animation to take over
              htmlEl.style.fill = 'transparent'; 
            }
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
          stroke-dasharray: 1000; /* A large value to cover any path length */
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

    const createAnimation = () => {
        if (animationInstance.current) {
            anime.remove(animationInstance.current.targets);
        }
        
        const color = getPrimaryColor();

        animationInstance.current = anime.timeline({
          loop: true,
          direction: 'alternate',
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
          fill: color, // Animate fill to the primary color
          fillOpacity: [0, 1],
          easing: 'easeInOutSine',
          duration: 800,
        }, '-=800') // Overlap with the end of the drawing animation
        .add({
          // Hold the filled state
          duration: 2000,
        });
    }

    createAnimation();

    // --- Dynamic Color Update Logic ---
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
          if(document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('dark')){
            updateColors();
            // Re-create the animation with the new color
            createAnimation();
          }
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
