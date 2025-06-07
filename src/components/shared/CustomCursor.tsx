
'use client';

import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const aura = cursorAuraRef.current;

    if (!dot || !aura) return;

    // Make cursors visible once mounted and ready
    dot.style.opacity = '1';
    aura.style.opacity = '1';

    const onMouseMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      aura.style.left = `${e.clientX}px`;
      aura.style.top = `${e.clientY}px`;
    };

    const onMouseOverInteractive = () => {
      dot.classList.add('cursor-dot-interactive');
      aura.classList.add('cursor-aura-interactive');
    };
    const onMouseOutInteractive = () => {
      dot.classList.remove('cursor-dot-interactive');
      aura.classList.remove('cursor-aura-interactive');
    };

    const onInputMouseOverOrFocus = () => {
      dot.style.opacity = '0';
      aura.style.opacity = '0';
    };

    const onInputMouseOutOrBlur = () => {
      dot.style.opacity = '1';
      aura.style.opacity = '1';
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
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      <div ref={cursorAuraRef} className="cursor-aura"></div>
    </>
  );
};

export default CustomCursor;
