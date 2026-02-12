import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
    children: React.ReactNode;
    className?: string;
}

const ScrollRevealText = ({ children, className = "" }: ScrollRevealTextProps) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = container.current;
        if (!el) return;

        // Get text content to split
        const textContent = el.textContent || "";
        const words = textContent.split(' ').filter(w => w.trim() !== "");

        // Reconstruct with spans
        el.innerHTML = words.map(word =>
            `<span class="reveal-word opacity-20 transition-colors duration-300 inline-block mr-[0.25em]">${word}</span>`
        ).join('');

        const spans = el.querySelectorAll('.reveal-word');

        if (spans.length > 0) {
            gsap.to(spans, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "bottom 40%",
                    scrub: 1,
                },
                opacity: 1,
                color: "white",
                stagger: 0.1,
                ease: "none"
            });
        }

    }, [children]);

    return (
        <div ref={container} className={`relative ${className}`}>
            {children}
        </div>
    );
};

export default ScrollRevealText;
