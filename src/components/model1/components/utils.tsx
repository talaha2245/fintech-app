import { PlayCircle, Eye, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Feature, Step } from "./types";

export const useScrollReveal = () => {
  const [revealed, setRevealed] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      });
    }, { threshold: 0.1 });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { domRef, revealed };
};

export const RevealSection: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ 
  children, 
  className = "", 
  delay = "0s" 
}) => {
  const { domRef, revealed } = useScrollReveal();
  return (
    <div 
      ref={domRef} 
      className={`reveal-hidden ${revealed ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: revealed ? delay : '0s' }}
    >
      {children}
    </div>
  );
};


export const CircularRevealButton: React.FC<{ text: string; size?: number }> = ({ text, size = 100 }) => {
  const characters = text.split("");
  const degreeIncrement = 360 / characters.length;

  return (
    <div className="relative flex items-center justify-center group cursor-pointer" style={{ width: size + 40, height: size + 40 }}>
      {/* Outer Rotating Text */}
      <div className="absolute inset-0 flex items-center justify-center animate-spin-slow group-hover:animate-spin-reverse transition-all duration-700">
        {characters.map((char, i) => (
          <span
            key={i}
            className="absolute font-bold uppercase text-[9px] tracking-tighter text-primary/60 group-hover:text-primary transition-colors"
            style={{
              transform: `rotate(${i * degreeIncrement}deg) translateY(-${size / 2}px)`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      
      {/* Center Circle with Icon and Spring Reveal */}
      <div className="relative z-10 w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center spring-hover overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
        <PlayCircle className="w-6 h-6 text-primary group-hover:scale-125 transition-transform duration-500" />
        
        {/* The "See More" secondary reveal layer */}
        <div className="absolute inset-0 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-primary text-white">
          <Eye className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};


export const SpringFeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => (
  <div 
    className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/[0.08] spring-hover overflow-hidden shine-effect cursor-default"
    style={{ transitionDelay: `${index * 50}ms` }}
  >
    {/* Background Pattern Accent */}
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-700" />
    
    <div className="relative z-10">
      <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
      <p className="text-slate-400 leading-relaxed mb-6">
        {feature.description}
      </p>
      <ul className="space-y-3">
        {feature.benefits.map((benefit, idx) => (
          <li 
            key={idx} 
            className="flex items-center space-x-2 text-sm text-slate-300 translate-x-0 group-hover:translate-x-1 transition-transform"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Bottom Accent Line */}
    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700" />
  </div>
);

export const CircularText: React.FC<{ text: string; size?: number; className?: string; color?: string }> = ({ 
  text, 
  size = 120, 
  className = "",
  color = "currentColor"
}) => {
  const characters = text.split("");
  const degreeIncrement = 360 / characters.length;

  return (
    <div 
      className={`relative flex items-center justify-center animate-spin-slow ${className}`} 
      style={{ width: size, height: size }}
    >
      {characters.map((char, i) => (
        <span
          key={i}
          className="absolute font-bold uppercase text-[10px] tracking-tighter"
          style={{
            transform: `rotate(${i * degreeIncrement}deg) translateY(-${size / 2}px)`,
            color: color
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};


export const apiKey = "";

export const FinTechAPI = {
  async requestDemo(email: string) {
    let retries = 0;
    const maxRetries = 5;
    console.log(email)
    while (retries <= maxRetries) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true, message: "Demo request sent successfully!" };
      } catch (error) {
        if (retries === maxRetries) throw error;
        const delay = Math.pow(2, retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        retries++;
      }
    }
  }
};


export const FloatingBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-float-slow" />
    <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float-slow" style={{ animationDelay: '-5s' }} />
    <div className="absolute top-[40%] right-[30%] w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '-10s' }} />
  </div>
);

export const StepItem: React.FC<{ step: Step; isLast: boolean; isActive: boolean }> = ({ step, isLast, isActive }) => (
  <div className={`flex flex-col items-center text-center relative z-10 group cursor-default transition-all duration-500 ${isActive ? 'scale-110' : 'opacity-60 grayscale-[0.5]'}`}>
    <div className={`w-20 h-20 rounded-full bg-slate-900 border-2 flex items-center justify-center mb-6 transition-all duration-500 ${isActive ? 'border-primary animate-active-pulse bg-primary/5' : 'border-primary/20 bg-slate-950'}`}>
      <div className={`transition-all duration-500 ${isActive ? 'text-primary scale-110' : 'text-slate-500'}`}>
        {step.icon}
      </div>
    </div>
    <h4 className={`text-lg font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-white' : 'text-slate-500'}`}>
      {step.title}
    </h4>
    <p className={`text-sm max-w-[200px] transition-colors duration-500 ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
      {step.description}
    </p>
    
    {!isLast && (
      <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-white/5 -z-10 overflow-hidden">
        {/* Sequential Wave/Signal Animation */}
        {isActive && (
          <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent absolute inset-0 animate-signal shadow-[0_0_15px_rgba(37,175,244,0.5)]" />
        )}
      </div>
    )}
  </div>
);