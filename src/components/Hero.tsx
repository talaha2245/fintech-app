import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import StoryText from './StoryText';
import LightRays from './LightRays';

const Hero = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(contentRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
        );
    }, []);

    return (
        <div ref={heroRef} className="relative w-full bg-transparent">
            <div className="fixed inset-0 z-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={0.5}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    className="custom-rays"
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
                {/* Stronger Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 pointer-events-none"></div>
            </div>

            {/* SCREEN 1: Identity & Emotional Hook */}
            <div ref={contentRef} className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Main Identity */}
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-12 text-white drop-shadow-2xl">
                    Biz<span className="text-gray-500">mobia</span>
                </h1>

                {/* High Value Emotional Storytelling - Hover Reveal */}
                <div
                    className="group max-w-5xl mx-auto mb-12 relative"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                    }}
                >
                    <div className="relative text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] cursor-default select-none py-4 md:py-8">
                        {/* Invisible Copy for Sizing */}
                        <div className="invisible text-transparent">
                            We don’t just build  <br /> We craft trusted businesses that connect people and accelerate ideas.
                        </div>

                        {/* Dimmed Base Text - Perfectly aligned */}
                        <div className="text-white/[0.1] absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div>We don’t just build  <br /> We craft trusted businesses that connect people and accelerate ideas.</div>
                        </div>

                        {/* Gradient Highlight Text - Masked */}
                        <div
                            className="absolute inset-0 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 pointer-events-none"
                            style={{
                                maskImage: `radial-gradient(circle 600px at var(--x) var(--y), black 0%, transparent 50%)`,
                                WebkitMaskImage: `radial-gradient(circle 600px at var(--x) var(--y), black 0%, transparent 50%)`,
                            }}
                        >
                            <div>We don’t just build  <br /> We craft trusted businesses that connect people and accelerate ideas.</div>
                        </div>
                    </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-8 mt-4 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
                    <a href="#services" className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                        <span className="relative z-10">Explore Our Impact</span>
                        <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full"></div>
                    </a>
                    <a href="#program" className="px-10 py-5 border border-white/30 text-white rounded-full font-bold text-lg transition-all hover:bg-white/10 hover:border-white/60">
                        Become a Partner
                    </a>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 animate-bounce">
                    <span className="text-[10px] uppercase tracking-[0.2em] mb-2 text-white font-bold">Scroll to Discover</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </div>

            {/* SCREEN 2: The "Why" (StoryText) */}
            <div className="relative z-10 w-full min-h-[80vh] flex items-center justify-center bg-transparent backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-6">
                    <StoryText />
                </div>
            </div>

        </div>
    );
};

export default Hero;
