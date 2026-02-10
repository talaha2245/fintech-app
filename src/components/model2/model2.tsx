import React, { useState, useEffect, useRef, type ReactNode, type ReactElement } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue
} from 'framer-motion';
import { 
  Bot, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Truck, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  Menu,
  Cpu,
  Database,
  BarChart3
} from 'lucide-react';

// --- Types & Interfaces ---

interface CircularTextProps {
  text: string;
  radius?: number;
  speed?: number;
  reverse?: boolean;
}

interface MagneticSpotlightCardProps {
  children: ReactNode;
  className?: string;
}

interface JourneyItem {
  step: string;
  title: string;
  icon: ReactElement;
  desc: string;
}

interface VerticalItem {
  title: string;
  icon: ReactElement;
  desc: string;
}

// --- Components ---

const CircularText: React.FC<CircularTextProps> = ({ 
  text, 
  radius = 50, 
  speed = 15, 
  reverse = false 
}) => {
  const characters = text.split("");
  const degreeStep = 360 / characters.length;

  return (
    <motion.div 
      className="relative flex items-center justify-center pointer-events-none"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {characters.map((char, i) => (
        <span
          key={i}
          className="absolute font-bold text-[9px] uppercase tracking-widest text-cyan-500/30"
          style={{
            transform: `rotate(${i * degreeStep}deg) translateY(-${radius}px)`
          }}
        >
          {char}
        </span>
      ))}
    </motion.div>
  );
};

const MagneticSpotlightCard: React.FC<MagneticSpotlightCardProps> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX);
    y.set(mouseY);

    const rotateXValue = (event.clientY - centerY) / 25;
    const rotateYValue = (event.clientX - centerX) / -25;
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  // Combined motion value for the radial gradient background
  const background = useTransform(
    [x, y],
    ([lx, ly]: number[]) => `radial-gradient(400px circle at ${lx}px ${ly}px, rgba(14, 165, 233, 0.15), transparent 80%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl p-8 transition-all hover:border-cyan-500/30 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
};

const TransformationJourney: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const journeySteps: JourneyItem[] = [
    { step: "01", title: "Structural Audit", icon: <Database />, desc: "Evaluating data flow integrity and architectural debt." },
    { step: "02", title: "Cloud Strategy", icon: <Cpu />, desc: "Deploying high-availability infrastructure for global scale." },
    { step: "03", title: "Real-time Deploy", icon: <BarChart3 />, desc: "Full-stack integration with autonomous optimization." }
  ];

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-[#030712]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white"
          >
            Engineering Excellence
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A systematic journey from fragmented systems to unified digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Laser Path SVG */}
          <div className="absolute top-1/2 left-0 w-full h-1 hidden md:block -translate-y-1/2 overflow-visible">
            <svg width="100%" height="100" viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
              <path 
                d="M 0 50 Q 250 20, 500 50 T 1000 50" 
                stroke="rgba(14, 165, 233, 0.05)" 
                strokeWidth="2" 
              />
              <motion.path 
                d="M 0 50 Q 250 20, 500 50 T 1000 50" 
                stroke="url(#laserGradient)" 
                strokeWidth="3" 
                style={{ pathLength }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="laserGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {journeySteps.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 text-center"
            >
              <div className="w-24 h-24 bg-slate-900/60 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5 text-cyan-400 shadow-2xl backdrop-blur-md group hover:border-cyan-500/50 transition-colors">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-3xl blur-xl group-hover:bg-cyan-500/20 transition-all" />
                {React.cloneElement(item.icon as ReactElement)}
              </div>
              <span className="text-indigo-400 font-black text-xs mb-3 block tracking-[0.3em]">{item.step}</span>
              <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const verticalServices: VerticalItem[] = [
    { title: "FinTech Core", icon: <ShieldCheck />, desc: "Blockchain-grade security for high-frequency financial transactions." },
    { title: "VAS Hub", icon: <Layers />, desc: "Micro-service architecture for global content distribution networks." },
    { title: "Smart Logic", icon: <Globe />, desc: "IoT-enabled ticketing systems for world-class venue management." },
    { title: "Logistics", icon: <Truck />, desc: "AI-driven fulfillment pipelines with zero-touch automation." }
  ];

  return (
    <div className="bg-[#020617] text-slate-300 selection:bg-cyan-500/30 selection:text-white overflow-x-hidden font-sans min-h-screen">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 h-16' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all shadow-lg shadow-cyan-500/20">
              <Bot className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">BIZMOBIA</span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {['Products', 'Solutions', 'Journey', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
              </a>
            ))}
            <button className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-cyan-400 transition-all">
              Launch Console
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 text-white">
            <Menu />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_60%)] blur-3xl" />
        </div>

        <motion.div 
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
          whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full"
        >
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-3 py-1.5 px-4 rounded-full bg-slate-900/80 border border-white/5 text-[10px] font-black tracking-[0.4em] text-cyan-400 mb-10 shadow-xl"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SYSTEM ARCHITECTURE v4.0</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-10 tracking-tighter text-white">
              Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Enterprise</span> <br />
              Core
            </h1>
            
            <p className="text-lg text-slate-400 mb-14 max-w-lg leading-relaxed font-medium">
              We design and deploy mission-critical infrastructure for global fintech and logistics providers. Performance at the edge, security at the core.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button className="bg-cyan-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center group">
                Review Solutions 
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all text-white">
                Architecture Docs
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute -top-16 -right-16 z-20">
              <CircularText text="• SECURE • SCALABLE • AUTONOMOUS " radius={70} speed={20} />
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832" 
                alt="Digital Core" 
                className="relative z-10 w-full max-w-lg rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 transition-transform hover:scale-[1.02] duration-700"
              />
              
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-8 bg-[#0f172a]/90 border border-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl z-20"
              >
                <div className="text-cyan-400 font-black text-4xl mb-1 tracking-tighter">100ms</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Global Latency</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Verticals Section */}
      <section id="solutions" className="py-32 relative bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center">
            <h2 className="text-5xl font-black tracking-tighter text-white mb-6">Industrial Verticals</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Purpose-built platforms for high-stakes digital operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {verticalServices.map((service, i) => (
              <MagneticSpotlightCard key={i}>
                <div className="w-14 h-14 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-8 text-indigo-400 border border-white/5 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-all duration-500">
                  {React.cloneElement(service.icon as ReactElement)}
                </div>
                <h3 className="text-xl font-black mb-4 text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium mb-8">
                  {service.desc}
                </p>
                <div className="flex items-center text-cyan-400 font-black text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-all cursor-pointer">
                  Documentation <ChevronRight size={14} className="ml-2" />
                </div>
              </MagneticSpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Journey SVG Animation */}
      <div id="journey">
        <TransformationJourney />
      </div>

      {/* Feature Deep Dive */}
      <section id="products" className="py-48 space-y-64 overflow-hidden bg-[#020617]">
        {/* MoniFy */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=2800" 
                  alt="MoniFy interface" 
                  className="w-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>
            </motion.div>
            <div className="lg:w-1/2">
              <span className="text-cyan-400 font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">Product Spotlight</span>
              <h2 className="text-5xl font-black mb-10 text-white tracking-tighter leading-tight">MoniFy: The <span className="text-indigo-400">Zero-Trust</span> Payment Layer</h2>
              <p className="text-lg text-slate-500 mb-12 leading-relaxed font-medium">
                Engineered for global liquidity. MoniFy provides institutional-grade transaction processing with sub-second finality.
              </p>
              <ul className="space-y-6 mb-16">
                {[
                  "Biometric Transaction Signing",
                  "Multi-node Distributed Ledger",
                  "Programmable Smart Settlements",
                  "Quantum-resistant Encryption"
                ].map((text, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <CheckCircle2 size={18} className="text-cyan-400" />
                    <span className="text-sm font-black text-slate-300 uppercase tracking-widest">{text}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all">
                Explore Protocol
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="py-32 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900/40 rounded-[3rem] border border-white/5 p-8 lg:p-20 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid lg:grid-cols-2 gap-24 relative z-10">
              <div>
                <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">Architect Your Future.</h2>
                <p className="text-slate-400 text-lg mb-12">
                  Connect with our systems engineers to discuss custom implementation roadmaps.
                </p>
                <div className="space-y-12">
                  <div className="flex items-center space-x-6 group">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Secure Comms</div>
                      <div className="text-xl font-bold text-white">partnerships@bizmobia.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 group">
                    <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Global Node</div>
                      <div className="text-xl font-bold text-white">DIFC Innovation Hub, UAE</div>
                    </div>
                  </div>
                </div>
              </div>

              <form className="space-y-8 bg-black/20 p-8 rounded-3xl border border-white/5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Corporate Identity</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-white transition-all placeholder:text-slate-700" placeholder="Organization Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact Vector</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-white transition-all placeholder:text-slate-700" placeholder="email@enterprise.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Infrastructure Brief</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:ring-1 focus:ring-cyan-400 focus:outline-none text-white transition-all placeholder:text-slate-700" rows={4} placeholder="Briefly describe your requirements..."></textarea>
                </div>
                <button className="w-full bg-white text-black font-black py-6 rounded-2xl hover:bg-cyan-400 hover:scale-[1.02] transition-all uppercase tracking-[0.3em] text-xs shadow-2xl shadow-white/5">
                  Establish Connection
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-2 mb-8 opacity-50 grayscale">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black">
              <Bot size={18} />
            </div>
            <span className="text-lg font-black text-white tracking-tighter">BIZMOBIA</span>
          </div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
            © 2024 Bizmobia Digital Solutions • Distributed Systems Engineering
          </p>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[#020617] p-6 flex flex-col items-center justify-center space-y-8">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 text-white">
            <ChevronRight size={32} className="rotate-180" />
          </button>
          {['Products', 'Solutions', 'Journey', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-widest text-white"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}