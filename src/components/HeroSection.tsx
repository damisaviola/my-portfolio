import { useEffect, useState } from "react";
import { personalInfo } from "../data/content";

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Handler pergerakan mouse ringan
    const handleMouseMove = (e: MouseEvent) => {
      // Skala dari -10 ke 10
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    // Handler scroll paralaks
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      {/* Background Paralaks (Geser Saat Mouse Bergerak / Saat Scroll) */}
      <div 
        className="absolute top-[15%] left-[20%] w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10 mix-blend-screen transition-transform duration-[400ms] ease-out will-change-transform"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2 + scrollY * 0.15}px)` }}
      ></div>
      <div 
        className="absolute bottom-[20%] right-[15%] w-80 h-80 md:w-[30rem] md:h-[30rem] bg-purple-500/20 rounded-full blur-[100px] -z-10 mix-blend-screen transition-transform duration-[400ms] ease-out will-change-transform"
        style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2 + scrollY * -0.1}px)` }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen"></div>

      {/* Floating Badges Khas Gen Z (Terlihat di Mobile & Desktop dengan Efek Paralaks 3D Semu) */}
      <div 
        className="absolute top-[10%] md:top-[25%] left-[5%] md:left-[10%] glass px-4 md:px-6 py-2 md:py-3 rounded-2xl shadow-lg transition-transform duration-[200ms] ease-out z-10 will-change-transform"
        style={{ transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3 + scrollY * 0.25}px) rotate(-8deg)` }}
      >
        <span className="text-xs md:text-sm font-bold">✨ UI/UX Addict</span>
      </div>
      
      <div 
        className="absolute top-[18%] md:top-[20%] right-[5%] md:right-[15%] glass px-4 md:px-5 py-2 md:py-2.5 rounded-[2rem] shadow-lg bg-gradient-to-tr from-white/30 to-white/10 dark:from-black/40 dark:to-black/10 border-white/30 transition-transform duration-[200ms] ease-out z-10 will-change-transform"
        style={{ transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -4 + scrollY * 0.1}px) rotate(12deg)` }}
      >
        <span className="text-xs md:text-sm font-bold">⚛️ React Dev</span>
      </div>
      
      <div 
        className="absolute bottom-[20%] md:bottom-[30%] left-[8%] md:left-[15%] glass px-5 md:px-6 py-2 md:py-2.5 rounded-full shadow-xl border-t-2 border-t-white/30 transition-transform duration-[250ms] ease-out z-10 will-change-transform"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2 + scrollY * 0.3}px) rotate(15deg)` }}
      >
        <span className="text-xs md:text-sm font-bold opacity-90">🎨 Designer</span>
      </div>
      
      <div 
        className="hidden md:flex absolute bottom-[25%] right-[10%] glass px-6 py-3 rounded-2xl shadow-lg transition-transform duration-[300ms] ease-out z-10 will-change-transform"
        style={{ transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3 + scrollY * 0.2}px) rotate(-12deg)` }}
      >
        <span className="text-sm font-bold text-gradient">⚡ Fast Coder</span>
      </div>

      {/* Konten Utama */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10">
        <div className="inline-flex glass px-6 py-2 rounded-full mb-8 text-xs md:text-sm font-bold tracking-widest uppercase border border-white/20 shadow-md">
          👋 Welcome to my universe
        </div>
        
        <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black leading-[1.1] tracking-tighter mb-8 drop-shadow-sm">
          Hey, I'm <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 hover:scale-[1.02] transition-transform inline-block duration-500 cursor-default px-2">
            {personalInfo.name}
          </span>
        </h1>
        
        <p className="text-base md:text-2xl text-muted-foreground flex-1 max-w-2xl mx-auto font-medium mb-12 leading-relaxed">
          Saya meracik antarmuka web yang tak sekadar estetis, melainkan menyajikan pengalaman cepat, lincah, dan penuh energi.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          <a href="#projects" className="bg-foreground text-background px-8 md:px-10 py-3 md:py-4 rounded-full font-bold hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] text-sm md:text-base">
            Eksplorasi Proyek
          </a>
          <a href="#about" className="glass px-8 md:px-10 py-3 md:py-4 rounded-full font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm md:text-base cursor-pointer">
            Kenali Lebih Jauh
          </a>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 md:bottom-10 animate-bounce cursor-default opacity-60 hover:opacity-100 transition-opacity">
        <div className="w-6 h-10 md:w-8 md:h-14 border-[3px] border-foreground/30 dark:border-foreground/40 rounded-full flex justify-center p-1.5 md:p-2">
          <div className="w-1.5 h-2 md:h-3 bg-foreground rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
