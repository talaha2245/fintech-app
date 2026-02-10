export const GlobalStyles = () => (
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