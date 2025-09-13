
'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import type { AnimeParams } from 'animejs';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  animation?: AnimeParams; // Allow passing anime.js parameters
}

export function useScrollAnimation<T extends HTMLElement>(
  options?: IntersectionObserverOptions
): [RefObject<T>, boolean] {
  const elementRef = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimated = useRef(false); // Ref to track if animation has run

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
          
          // Only animate if it hasn't animated before (when triggerOnce is true)
          if (options?.animation && (!options.triggerOnce || !hasAnimated.current)) {
            anime({
              targets: element,
              ...options.animation,
            });
            if (options.triggerOnce) {
              hasAnimated.current = true; // Mark as animated
              observer.unobserve(element); // Disconnect after animation
            }
          }
        } else {
          if (!options?.triggerOnce) {
            setIsInView(false);
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
    // The dependency array is intentionally kept minimal.
    // We don't want this to re-run on every animation param change if not necessary.
  }, [options?.threshold, options?.root, options?.rootMargin, options?.triggerOnce, options?.animation]);

  return [elementRef, isInView];
}
