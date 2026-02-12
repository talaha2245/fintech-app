import React, { useEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



interface ScrollStackItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const ScrollStackItem = forwardRef<HTMLDivElement, ScrollStackItemProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={`w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br backdrop-blur-xl ${className}`}
                {...props}
            >
                {children}
            </div>
        );
    }
);

interface ScrollStackProps {
    children: React.ReactNode;
    className?: string; // Allow passing custom classes to the container
}

const ScrollStack = ({ children, className = "" }: ScrollStackProps) => {
    const container = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);


            cards.forEach((card) => {
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top top+=100", // Start sticking slightly below top
                        end: "bottom top",
                        endTrigger: container.current,
                        pin: true,
                        pinSpacing: false, // Stack on top of each other without spacing
                        scrub: true,
                    },
                    ease: "none"
                });
            });
        }, container);

        return () => ctx.revert();
    }, [children]); // Re-run when children change

    return (
        <div ref={container} className={`relative w-full max-w-5xl mx-auto py-20 px-4 ${className}`}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    // @ts-ignore - we know we are passing ref safely here
                    return React.cloneElement(child, { ref: (el: HTMLDivElement | null) => { cardsRef.current[index] = el; } });
                }
                return child;
            })}
        </div>
    );
};

export default ScrollStack;
