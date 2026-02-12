import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CoFounder = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cf-animate", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="program" ref={containerRef} className="py-32 bg-[#050505] text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <div className="cf-content">
                        <div className="cf-animate inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-widest uppercase mb-6 text-gray-300">
                            Partnership Program
                        </div>

                        <h2 className="cf-animate text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
                            We Don't Just Build Apps. <br />
                            <span className="text-gray-500">We Build Businesses.</span>
                        </h2>

                        <p className="cf-animate text-xl text-gray-400 mb-10 font-light leading-relaxed">
                            Great ideas deserve world-class execution. Through our Technical Co-Founder Program, we partner with visionary founders to turn concepts into scalable, revenue-generating realities.
                        </p>

                        <div className="space-y-6 border-l border-white/10 pl-8 cf-animate">
                            <div className="cf-item">
                                <h4 className="text-lg font-bold text-white mb-2 flex items-center">
                                    <CheckCircle2 className="w-5 h-5 text-gray-500 mr-3" />
                                    Shared Risk, Shared Success
                                </h4>
                                <p className="text-gray-400 text-sm ml-8">We cover 50% of development costs in exchange for equity, aligning our incentives with your growth.</p>
                            </div>

                            <div className="cf-item">
                                <h4 className="text-lg font-bold text-white mb-2 flex items-center">
                                    <CheckCircle2 className="w-5 h-5 text-gray-500 mr-3" />
                                    End-to-End Technology Stack
                                </h4>
                                <p className="text-gray-400 text-sm ml-8">From cloud infrastructure to mobile interfaces, we handle every line of code so you can focus on the market.</p>
                            </div>

                            <div className="cf-item">
                                <h4 className="text-lg font-bold text-white mb-2 flex items-center">
                                    <CheckCircle2 className="w-5 h-5 text-gray-500 mr-3" />
                                    Strategic Mentorship
                                </h4>
                                <p className="text-gray-400 text-sm ml-8">Gain access to our leadership team's decades of experience in scaling global tech products.</p>
                            </div>
                        </div>

                        <div className="mt-16 cf-animate">
                            <a href="#contact" className="group inline-flex items-center text-lg font-bold border-b-2 border-white pb-2 hover:text-gray-300 hover:border-gray-500 transition-all">
                                Apply to be a Partner <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    <div className="cf-animate hidden lg:block relative">
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                            <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-center z-10">
                                <h3 className="text-2xl font-semibold mb-2">Success Stories</h3>
                                <p className="text-sm text-gray-500 mb-8">Trusted by global innovators.</p>

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
                                        <div className="text-3xl font-bold text-white mb-1">20+</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Startups Funded</div>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-lg backdrop-blur-sm">
                                        <div className="text-3xl font-bold text-white mb-1">$50M+</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Value Created</div>
                                    </div>
                                </div>
                            </div>

                            {/* Abstract Background */}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent skew-y-12 scale-150 origin-top-right opacity-30"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CoFounder;
