import React, { useState, useEffect, useRef } from 'react';
import { 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  Zap, 
  RefreshCw, 
  LogIn, 
  Mail, 
  CheckCircle2,
  Github,
  Twitter,
  Linkedin,
  Loader2,
  PlayCircle,
  Eye
} from 'lucide-react';

/** * TYPES & INTERFACES 
 */

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
}

/**
 * CUSTOM STYLES & ANIMATIONS
 */
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    @keyframes float-slow {
      0%, 100% { transform: translate(0px, 0px); }
      33% { transform: translate(30px, -50px); }
      66% { transform: translate(-20px, 20px); }
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes shine {
      0% { left: -100%; }
      20% { left: 100%; }
      100% { left: 100%; }
    }
    @keyframes scanner {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    @keyframes signal {
      0% { left: -100%; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { left: 100%; opacity: 0; }
    }
    @keyframes tilt-3d {
      0%, 100% { transform: perspective(1000px) rotateX(2deg) rotateY(-2deg); }
      50% { transform: perspective(1000px) rotateX(-2deg) rotateY(2deg); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-reverse {
      from { transform: rotate(360deg); }
      to { transform: rotate(0deg); }
    }
    @keyframes active-pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(37, 175, 244, 0.2); }
      50% { box-shadow: 0 0 40px rgba(37, 175, 244, 0.6); }
    }
    
    .reveal-hidden {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .reveal-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Spring Physics Transitions */
    .spring-hover {
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .spring-hover:hover {
      transform: scale(1.05) translateY(-10px);
    }

    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
    .animate-marquee { animation: marquee 25s linear infinite; }
    .animate-scanner { animation: scanner 3s linear infinite; }
    .animate-signal { animation: signal 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
    .animate-tilt-3d { animation: tilt-3d 8s ease-in-out infinite; }
    .animate-spin-slow { animation: spin-slow 12s linear infinite; }
    .animate-spin-reverse { animation: spin-reverse 8s linear infinite; }
    .animate-active-pulse { animation: active-pulse 2s ease-in-out infinite; }

    .shine-effect::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
      transform: skewX(-25deg);
      animation: shine 8s infinite;
    }
  `}} />
);

/**
 * HOOK: Scroll Reveal
 */
const useScrollReveal = () => {
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

const RevealSection: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ 
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

/**
 * COMPONENT: Interactive Circular Reveal Button (Amsterdam Video Style)
 */
const CircularRevealButton: React.FC<{ text: string; size?: number }> = ({ text, size = 100 }) => {
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

/**
 * COMPONENT: Spring Physics Feature Card (Spring Physics Video Style)
 */
const SpringFeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => (
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

const CircularText: React.FC<{ text: string; size?: number; className?: string; color?: string }> = ({ 
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

/**
 * BACKEND INTEGRATION LAYER
 */
const apiKey = "";

const FinTechAPI = {
  async requestDemo(email: string) {
    let retries = 0;
    const maxRetries = 5;

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

/**
 * COMPONENTS
 */

const FloatingBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-float-slow" />
    <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float-slow" style={{ animationDelay: '-5s' }} />
    <div className="absolute top-[40%] right-[30%] w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '-10s' }} />
  </div>
);

const StepItem: React.FC<{ step: Step; isLast: boolean; isActive: boolean }> = ({ step, isLast, isActive }) => (
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

/**
 * MAIN APP COMPONENT
 */
export default function App() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // Animation state for sequential step highlighting
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const cycleTime = 3000; // Duration per step including line pulse
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, cycleTime);
    return () => clearInterval(interval);
  }, []);

  const navItems: NavItem[] = [
    { label: "Products", href: "#" },
    { label: "Solutions", href: "#" },
    { label: "Developers", href: "#" },
    { label: "Pricing", href: "#" },
  ];

  const features: Feature[] = [
    {
      id: "f1",
      title: "Flexible Payment Plans",
      description: "Empower your customers to pay in installments. Layby allows scheduled payments while ensuring you get paid in full.",
      icon: <Calendar className="w-8 h-8" />,
      benefits: ["Custom installment intervals", "Zero interest options"]
    },
    {
      id: "f2",
      title: "Instant Approval",
      description: "MoniFy uses real-time AI credit assessment to approve transactions in under 2 seconds, reducing cart abandonment.",
      icon: <Zap className="w-8 h-8" />,
      benefits: ["99.9% uptime guaranteed", "Global currency support"]
    },
    {
      id: "f3",
      title: "Automated Payments",
      description: "Set and forget. Recurring billing and automated collections handled through our secure, encrypted tokenization vault.",
      icon: <RefreshCw className="w-8 h-8" />,
      benefits: ["Smart retry logic", "Seamless ERP integration"]
    }
  ];

  const steps: Step[] = [
    { id: 1, title: "Customer Inputs", description: "Secure entry of payment details via our encrypted modal.", icon: <LogIn className="w-8 h-8" /> },
    { id: 2, title: "Gateway Forward", description: "Data is tokenized and securely routed to bank servers.", icon: <ArrowRight className="w-8 h-8" /> },
    { id: 3, title: "Authorization", description: "Real-time validation and fraud checks executed.", icon: <ShieldCheck className="w-8 h-8" /> },
    { id: 4, title: "Funds Sent", description: "Settlement completed within 24 hours to your account.", icon: <Wallet className="w-8 h-8" /> },
  ];

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const response = await FinTechAPI.requestDemo(email);
      setFeedback({ type: 'success', message: response.message });
      setEmail("");
    } catch (error) {
      setFeedback({ type: 'error', message: "Something went wrong. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101c22] text-slate-200 font-['Work_Sans'] selection:bg-primary/30 relative overflow-x-hidden">
      <GlobalStyles />
      <FloatingBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#101c22]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 group cursor-pointer relative">
            <div className="relative w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 z-10 transition-transform group-hover:scale-110">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white uppercase leading-none">
                Fin<span className="text-primary">Tech</span>
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-slate-500 font-bold">Solutions</span>
            </div>
            <CircularText 
              text="• SECURE • FAST • RELIABLE • " 
              size={56} 
              className="absolute -left-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              color="#25aff4"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium hover:text-primary transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <RevealSection className="relative z-10">
            {/* Decorative Amsterdam-style element */}
            <div className="absolute -left-12 -top-12 -z-10 pointer-events-none opacity-20">
              <CircularText 
                text="• PAYMENTS REDEFINED • SCALE YOUR BUSINESS • " 
                size={220} 
                color="#25aff4" 
                className="animate-spin-slow"
              />
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>Next-Gen Payment Ecosystem</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-[1.1] relative">
              Payment Gateway <span className="text-primary">Layby</span> & <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 animate-pulse">
                MoniFy
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
              Revolutionize your cash flow with our intelligent installment-based gateway and instant liquidity solutions for modern enterprises.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 max-w-xl">
              <form onSubmit={handleDemoRequest} className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-primary/50 transition-all focus:ring-4 focus:ring-primary/10"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all hover:scale-[1.05] shadow-xl shadow-primary/20 active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><span>Request Demo</span><ArrowRight className="w-5 h-5" /></>}
                </button>
              </form>
              
              {/* Amsterdam Style Circular Reveal Detail */}
              <div className="hidden sm:block">
                <CircularRevealButton text="• WATCH DEMO • EXPLORE FEATURES " size={80} />
              </div>
            </div>

            {feedback && (
              <p className={`mt-4 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {feedback.message}
              </p>
            )}
          </RevealSection>

          <div className="relative group animate-tilt-3d flex items-center justify-center">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10 flex items-center justify-center">
              <CircularText 
                text="• INNOVATE • TRANSACT • GROW • " 
                size={400} 
                color="#ffffff" 
              />
            </div>

            <div className="absolute -inset-4 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-1">
              
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scanner shadow-[0_0_20px_rgba(37,175,244,0.8)]" />
              </div>

              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200" 
                alt="Fintech Interface" 
                className="w-full h-auto grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-white/10 group-hover:translate-y-[-5px] transition-transform">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Security Standard</p>
                      <p className="text-sm font-bold text-white">PCI-DSS Level 1 Compliant</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium">Uptime</p>
                    <p className="text-sm font-bold text-green-400">99.98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid - Implementation of Spring Physics Video Style */}
      <section className="py-32 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6">Core Ecosystem Pillars</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Enterprise-grade features designed to maximize conversion rates and minimize financial friction.
            </p>
          </RevealSection>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <RevealSection key={f.id} className="h-full" delay={`${i * 0.1}s`}>
                <SpringFeatureCard feature={f} index={i} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow - Redesigned with Sequential Animation */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <RevealSection className="text-center mb-24">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6">Seamless Transaction Journey</h2>
            <p className="text-slate-400 text-lg">How our gateway handles every cent with precision and speed.</p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {steps.map((step, idx) => (
              <RevealSection key={step.id}>
                <StepItem 
                  step={step} 
                  isLast={idx === steps.length - 1} 
                  isActive={activeStep === idx}
                />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <section className="py-16 border-y border-white/5 bg-slate-900/20 overflow-hidden">
        <div className="max-w-full">
          <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mb-12">Trusted by Global Leaders</p>
          <div className="relative flex items-center overflow-hidden">
            <div className="flex space-x-16 animate-marquee whitespace-nowrap py-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex space-x-16 items-center">
                  {["QUANTUM", "VERTEX", "NEXUS", "ORBIT", "FLUX", "STARK", "CYBER", "LUMINA"].map(brand => (
                    <span key={brand} className="text-3xl font-black text-white/20 hover:text-primary/50 transition-colors cursor-default select-none tracking-tighter">
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3" />
        <RevealSection className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block relative p-2 mb-8 group">
            <div className="absolute inset-0 animate-spin-slow opacity-30 group-hover:opacity-100 transition-opacity">
               <CircularText text="• JOIN THE REVOLUTION • " size={80} color="#25aff4" />
            </div>
            <div className="relative z-10 p-4 bg-primary/20 rounded-2xl spring-hover">
              <Zap className="w-12 h-12 text-primary animate-bounce" />
            </div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8">Ready to scale your business?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 5,000+ businesses using our gateway to increase revenue and streamline operations. No setup fees, no hidden costs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-primary/30 spring-hover active:scale-95">
              Get Started Now
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all border border-white/10 hover:border-primary/50 spring-hover active:scale-95">
              Talk to Sales
            </button>
          </div>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-8 group cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center spring-hover">
                  <Wallet className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white uppercase tracking-tighter">Fin<span className="text-primary">Tech</span></span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">
                Building the financial infrastructure for the next billion users. Secure, fast, and transparent.
              </p>
              <div className="flex space-x-4">
                {[Twitter, Linkedin, Github].map((Icon, idx) => (
                  <a key={idx} href="#" className="p-2 bg-white/5 rounded-lg hover:text-primary hover:bg-white/10 transition-all spring-hover">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: ["Layby Gateway", "MoniFy Instant", "Enterprise Suite", "API Docs"] },
              { title: "Company", links: ["About Us", "Careers", "Newsroom", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"] }
            ].map(col => (
              <div key={col.title}>
                <h5 className="font-bold text-white mb-8">{col.title}</h5>
                <ul className="space-y-4">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center group">
                        <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all mr-0 group-hover:mr-2" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <p>© 2024 FinTech Solutions Inc. All rights reserved.</p>
            <div className="flex space-x-6">
              {["System Status", "Security Logs", "Network Info"].map(l => (
                <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}