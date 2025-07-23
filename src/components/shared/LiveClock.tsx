
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const LiveClock = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      setTime(now.toLocaleTimeString('en-IN', timeOptions));
      setDate(now.toLocaleDateString('en-IN', dateOptions));
    };

    // Avoid server-side execution for initial render to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      updateClock(); // Set initial time
      const timerId = setInterval(updateClock, 1000); // Update every second

      return () => {
        clearInterval(timerId); // Cleanup interval on component unmount
      };
    }
  }, []);

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 p-3 rounded-lg shadow-2xl",
      "bg-background/70 backdrop-blur-lg",
      "text-foreground text-sm font-mono text-right"
    )}>
      {time ? (
        <>
          <div>{time}</div>
          <div className="text-xs opacity-80">{date}</div>
        </>
      ) : (
        <div className="text-xs opacity-80">Loading time...</div>
      )}
    </div>
  );
};

export default LiveClock;
