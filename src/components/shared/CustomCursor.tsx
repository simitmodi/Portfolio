
'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);

  useEffect(() => {
    const dot = cursorDotRef.current;

    if (!dot) return;

    dot.style.opacity = '1';

    const onMouseMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onMouseOverInteractive = () => {
      dot.classList.add('cursor-dot-interactive');
    };
    const onMouseOutInteractive = () => {
      dot.classList.remove('cursor-dot-interactive');
    };

    const onInputMouseOverOrFocus = () => {
      dot.style.opacity = '0';
    };

    const onInputMouseOutOrBlur = () => {
      dot.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input[type="submit"], input[type="button"], [data-interactive], .cursor-pointer'
    );
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', onMouseOverInteractive);
      el.addEventListener('mouseout', onMouseOutInteractive);
    });

    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="search"], input[type="tel"], input[type="url"], textarea, [contenteditable="true"]');
    textInputs.forEach(el => {
      el.addEventListener('mouseover', onInputMouseOverOrFocus);
      el.addEventListener('mouseout', onInputMouseOutOrBlur);
      el.addEventListener('focus', onInputMouseOverOrFocus);
      el.addEventListener('blur', onInputMouseOutOrBlur);
    });

    // Easter egg event listener
    const handleTriggerEasterEgg = () => {
      setIsEasterEggActive(true);
      setTimeout(() => {
        setIsEasterEggActive(false);
      }, 1000); // Duration of the easter egg effect + small buffer
    };

    document.addEventListener('trigger-cursor-easter-egg', handleTriggerEasterEgg);


    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', onMouseOverInteractive);
        el.removeEventListener('mouseout', onMouseOutInteractive);
      });
      textInputs.forEach(el => {
        el.removeEventListener('mouseover', onInputMouseOverOrFocus);
        el.removeEventListener('mouseout', onInputMouseOutOrBlur);
        el.removeEventListener('focus', onInputMouseOverOrFocus);
        el.removeEventListener('blur', onInputMouseOutOrBlur);
      });
      document.removeEventListener('trigger-cursor-easter-egg', handleTriggerEasterEgg);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className={cn(
          "cursor-dot",
          isEasterEggActive && "cursor-dot-easter-egg"
        )}
      ></div>
    </>
  );
};

export default CustomCursor;
