'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import anime from 'animejs';



interface AnimatedHeadingProps {
    text: string;
    className?: string;
}

const AnimatedHeading = ({ text, className }: AnimatedHeadingProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const words = containerRef.current.querySelectorAll('.word');
        const chars = containerRef.current.querySelectorAll('.char');

        const timeline = anime.timeline({
            loop: true,
            defaults: { ease: 'easeInOutCubic', duration: 650 } // Changed to easeInOutCubic for smoother React render
        });

        timeline
            .add({
                targets: words,
                y: (el: HTMLElement, i: number) => {
                    // Simulate line parity with word index parity for now
                    return i % 2 ? ['100%', '0%'] : ['-100%', '0%'];
                },
                delay: anime.stagger(125)
            })
            .add({
                targets: chars,
                y: (el: HTMLElement) => {
                    const parentWord = el.closest('.word') as HTMLElement;
                    const wordIndex = Array.from(words).indexOf(parentWord);
                    return wordIndex % 2 ? '100%' : '-100%';
                },
                delay: anime.stagger(10, { from: 'center' }) // Changed to center for interesting effect
            }, '+=1500'); // Add delay before sliding out

        return () => {
            timeline.pause();
        };
    }, [text]);

    // Split text into words, then words into chars
    const wordElements = text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="word inline-block overflow-hidden align-bottom mx-1 relative">
            {word.split('').map((char, charIndex) => (
                <span key={charIndex} className="char inline-block relative">
                    {char}
                </span>
            ))}
        </span>
    ));

    return (
        <span ref={containerRef} className={cn("font-bold overflow-hidden inline-block", className)}>
            {wordElements}
        </span>
    );
};

export default AnimatedHeading;
