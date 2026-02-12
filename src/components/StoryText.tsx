import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StoryText = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        // Defined phrases for better readability
        const phrases = [
            "In a world of noise,",
            "we deliver clarity.",
            "By bridging the gap between",
            "complex technology and human connection,",
            "we empower enterprises to not just survive,",
            "but to define the market.",
            "Your growth is our engine;",
            "your vision, our blueprint."
        ];

        // Clear and rebuild with spans preserving structure
        text.innerHTML = phrases.map(phrase => {
            const words = phrase.split(" ").map(word =>
                `<span class="story-word opacity-20 transition-colors duration-500 inline-block mr-[0.2em] md:mr-[0.25em]">${word}</span>`
            ).join("");
            return `<div class="block mb-2 lg:mb-4">${words}</div>`;
        }).join("");

        const words = text.querySelectorAll('.story-word');

        gsap.to(words, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 50%",
                scrub: 1,
            },
            opacity: 1,
            color: "white",
            stagger: 0.05,
            ease: "power2.inOut"
        });

    }, []);

    return (
        <div ref={containerRef} className="max-w-6xl mx-auto py-32 px-6 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="mb-16 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards] flex flex-col items-center">
                <div className="text-xs md:text-sm font-medium tracking-[0.3em] text-white/40 uppercase mb-4 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                    The Vision
                </div>
            </div>

            <div
                ref={textRef}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-center tracking-tighter text-white"
            >
                {/* Text injected via JS */}
            </div>
        </div>
    );
};

export default StoryText;
