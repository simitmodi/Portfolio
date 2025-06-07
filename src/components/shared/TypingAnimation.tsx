
'use client';

import { useState, useEffect, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  cursorClassName?: string;
}

const TypingAnimation = ({ text, speed = 150, className, cursorClassName, ...props }: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText(''); // Reset if text prop changes
  }, [text]);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      // Start blinking cursor after text is fully typed
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500); // Cursor blink speed
      return () => clearInterval(cursorInterval);
    }
  }, [displayedText, text, speed]);

  return (
    <span className={cn(className)} {...props}>
      {displayedText}
      <span className={cn('animate-blink', cursorClassName, !showCursor && displayedText.length === text.length && 'opacity-0')}>
        |
      </span>
    </span>
  );
};

export default TypingAnimation;
