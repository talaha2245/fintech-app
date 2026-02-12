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

        // Split text into words but preserve spaces properly
        const content = "In a world of noise, we deliver clarity. By bridging the gap between complex technology and human connection, we empower enterprises to not just survive, but to define the market. Your growth is our engine; your vision, our blueprint.";

        // Clear and rebuild with spans
        text.innerHTML = content.split(" ").map(word =>
            `<span class="story-word opacity-20 transition-colors duration-500 inline-block mr-2">${word}</span>`
        ).join("");

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
        <div ref={containerRef} className="max-w-5xl mx-auto py-24 px-6 text-center">
            <div className="mb-12 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
                <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-blue-500 uppercase mb-4">Our Philosophy</h2>
                <div className="w-[1px] h-8 bg-blue-500/50 mx-auto"></div>
            </div>

            <p
                ref={textRef}
                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-600"
            >
                In a world of noise, we deliver clarity.
            </p>
        </div>
    );
};

export default StoryText;
