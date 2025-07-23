
'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import type { AnimationParams } from 'animejs';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  animation?: AnimationParams; // Allow passing anime.js parameters
}

export function useScrollAnimation<T extends HTMLElement>(
  options?: IntersectionObserverOptions
): [RefObject<T>, boolean] {
  const elementRef = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          
          // Trigger anime.js animation if provided
          if (options?.animation) {
            anime({
              targets: element,
              ...options.animation,
            });
          }

          if (options?.triggerOnce && observerRef.current) {
            observerRef.current.unobserve(element);
          }
        } else {
          if (!options?.triggerOnce) {
            setIsInView(false); // Enable resetting isInView if triggerOnce is false
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
      }
    );

    observer.observe(element);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [options, elementRef]);

  return [elementRef, isInView];
}
