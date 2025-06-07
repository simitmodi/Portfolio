
'use client';

import { type RefObject, useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
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
          if (options?.triggerOnce && observerRef.current) {
            observerRef.current.unobserve(element);
          }
        } else {
          if (!options?.triggerOnce) {
            // setIsInView(false); // Optionally reset if it goes out of view and triggerOnce is false
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
  }, [options?.threshold, options?.root, options?.rootMargin, options?.triggerOnce, elementRef]);

  return [elementRef, isInView];
}
