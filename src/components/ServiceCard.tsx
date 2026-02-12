import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
    productName: string;
    productImage: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ productName, productImage, description }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;

        if (!card || !image) return;

        // Hover animation
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(image, { scale: 1.05, duration: 0.5, ease: "power2.out" })
            .to(card, { borderColor: "rgba(255,255,255,0.3)", duration: 0.3 }, 0);

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());

        // Scroll animation entry
        gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }
        );

        return () => {
            card.removeEventListener('mouseenter', () => hoverTl.play());
            card.removeEventListener('mouseleave', () => hoverTl.reverse());
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="w-full max-w-4xl mx-auto my-12 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300 group h-[550px] md:h-[600px] flex flex-col md:flex-row"
        >
            {/* Image Section */}
            <div className="w-full md:w-2/5 h-[40%] md:h-full relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10 shrink-0">
                <div className="absolute inset-0 transition-transform duration-700">
                    <img
                        ref={imageRef}
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-contain p-8"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-3/5 h-[60%] md:h-full p-6 md:p-12 flex flex-col justify-center relative overflow-y-auto">
                {/* Decorative number or tag */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 text-white/5 text-4xl md:text-6xl font-black select-none pointer-events-none">
                    01
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-none group-hover:text-gray-200 transition-colors">
                    {productName}
                </h3>

                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-10 max-w-xl">
                    {description}
                </p>

                <div className="mt-auto">
                    <button className="flex items-center gap-2 md:gap-3 text-white font-medium group/btn text-sm md:text-base">
                        <span className="border-b border-white pb-1">Explore Solution</span>
                        <span className="p-1.5 md:p-2 bg-white text-black rounded-full transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300">
                            <ArrowUpRight size={16} />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
