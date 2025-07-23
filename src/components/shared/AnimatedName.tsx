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
    if (!svg || !text) return;

    // Function to get the current primary color from CSS variables
    const getPrimaryColor = () => {
        if (typeof window === 'undefined') return 'hsl(0, 0%, 0%)';
        const style = getComputedStyle(document.documentElement);
        const primaryHsl = style.getPropertyValue('--primary').trim();
        // Convert space-separated HSL from CSS variable to comma-separated HSL for anime.js
        return `hsl(${primaryHsl.split(' ').join(',')})`;
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
              htmlEl.style.fill = 'transparent'; 
            }
        });
    };
    
    if (animationInstance.current) {
      anime.remove(animationInstance.current.targets);
    }
    svg.innerHTML = ''; 

    const textParts = text.split(' ');
    const firstName = textParts[0] || '';
    // Add a leading space to the last name to create the visual gap
    const lastName = textParts.length > 1 ? ` ${textParts.slice(1).join(' ')}` : '';

    if (!firstName) {
      console.error("AnimatedName: First name is missing from the text prop.");
      return;
    }

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
      <text class="animated-text first-name" x="50%" y="50%" dominant-baseline="central" text-anchor="end">${firstName}</text>
      <text class="animated-text last-name" x="50%" y="50%" dominant-baseline="central" text-anchor="start">${lastName}</text>
    `;

    const textElements = svg.querySelectorAll('.animated-text');
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
          fill: color, 
          fillOpacity: [0, 1],
          easing: 'easeInOutSine',
          duration: 800,
        }, '-=800')
        .add({
          duration: 2000,
        });
    }

    createAnimation();

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
          if(document.documentElement.classList.contains('dark') || !document.documentElement.classList.contains('dark')){
            updateColors();
            createAnimation();
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
      if (animationInstance.current) {
        anime.remove(animationInstance.current.targets);
      }
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
