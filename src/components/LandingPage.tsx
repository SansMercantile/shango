import React, { useEffect, useRef, useState } from "react";
import { 
  Zap, Compass, Shield, Cpu, ExternalLink, ArrowRight,
  TrendingUp, Activity, CheckCircle2, ShieldAlert, Award, 
  Grid, HelpCircle, Radio, Globe, Wind, BarChart3, 
  RefreshCw, Waves, Flame, Eye, Linkedin, Github
} from "lucide-react";

interface LandingPageProps {
  onLaunchApp: () => void;
}

export default function LandingPage({ onLaunchApp }: LandingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTab, setCurrentTab] = useState<"home" | "capabilities" | "pricing">("home");

  // Canvas weather background fluid lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let H = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      W = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      H = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      a: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.8 + 0.3,
        a: Math.random() * 0.6 + 0.2
      });
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Swirling atmospheric background vector glow
      const t = Date.now() / 8000;
      const gx = W * 0.55 + Math.sin(t) * W * 0.12;
      const gy = H * 0.45 + Math.cos(t * 1.3) * H * 0.08;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.45);
      g.addColorStop(0, "rgba(6, 182, 212, 0.12)");
      g.addColorStop(0.5, "rgba(8, 145, 178, 0.04)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // Line rendering
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103, 232, 249, ${p.a})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 * (1 - d / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const tickerItems = [
    { label: "Seeding Core", val: "ACTIVE", loc: "Sector Alpha" },
    { label: "Laser Guide", val: "24.5 GW", loc: "Sovereign Alpine" },
    { label: "Albedo Layer", val: "N2 Shield", loc: "Sub-Equatorial" },
    { label: "Vortex Suppressor", val: "STANDBY", loc: "Ocean Basin B" },
    { label: "Gemini Advisory", val: "STABLE", loc: "Core Engine" }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] flex flex-col font-sans selection:bg-[#06b6d4] selection:text-[#0f172a]">
      
      {/* ─── DYNAMIC NAVIGATION HEADER ─── */}
      <nav className="border-b border-[#06b6d4]/15 bg-[#141f32]/95 sticky top-0 z-50 px-6 py-4 backdrop-blur-md">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo with Striking Lightning Design */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab("home")}>
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#0891b2] to-[#67e8f9] rounded-md text-[#0f172a] shadow-md select-none overflow-hidden group">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#0f172a] fill-current animate-pulse">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#67e8f9] rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg tracking-wider text-white">SHANGO</span>
                <span className="text-[8px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#06b6d4]/15 text-[#67e8f9] border border-[#06b6d4]/20 uppercase font-black">
                  
                </span>
              </div>
            </div>
          </div>

          {/* Tab Pages Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#0f172a]/80 p-1 border border-[#06b6d4]/10 rounded-lg">
            <button 
              onClick={() => setCurrentTab("home")}
              className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                currentTab === "home"
                  ? "bg-[#06b6d4] text-[#0f172a] shadow-md shadow-[#06b6d4]/10"
                  : "text-[#94a3b8] hover:text-[#f8fafc] hover:bg-slate-800/40"
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentTab("capabilities")}
              className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                currentTab === "capabilities"
                  ? "bg-[#06b6d4] text-[#0f172a] shadow-md shadow-[#06b6d4]/10"
                  : "text-[#94a3b8] hover:text-[#f8fafc] hover:bg-slate-800/40"
              }`}
            >
              Weather Control
            </button>
            <button 
              onClick={() => setCurrentTab("pricing")}
              className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                currentTab === "pricing"
                  ? "bg-[#06b6d4] text-[#0f172a] shadow-md shadow-[#06b6d4]/10"
                  : "text-[#94a3b8] hover:text-[#f8fafc] hover:bg-slate-800/40"
              }`}
            >
              Operation Plans
            </button>
          </div>

          {/* Launch Application CTA */}
          <div>
            <button
              onClick={onLaunchApp}
              className="px-5 py-2 bg-gradient-to-r from-[#06b6d4] to-[#67e8f9] hover:from-[#67e8f9] hover:to-[#06b6d4] text-[#0f172a] font-display font-black text-xs uppercase tracking-widest rounded-md shadow-md shadow-[#06b6d4]/10 transition-all cursor-pointer hover:-translate-y-0.5"
            >
              Launch App ↗
            </button>
          </div>

        </div>
      </nav>

      {/* ─── PAGES CONTENT SHIFTER ─── */}
      <main className="flex-grow">
        
        {/* TAB 1: HOME PAGE */}
        {currentTab === "home" && (
          <div>
            
            {/* HERO SECTION with Canvas */}
            <header className="relative py-28 md:py-36 px-6 overflow-hidden border-b border-[#06b6d4]/15">
              <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
              
              <div className="relative max-w-[1500px] mx-auto flex flex-col items-center text-center gap-6">
                
                {/* Micro operational alert badge label */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#06b6d4]/10 border border-[#06b6d4]/20 font-mono text-[9px] text-[#67e8f9] font-black tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 bg-[#67e8f9] rounded-full animate-pulse" />
                  Sovereign Micro-Grid Online
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-sm md:text-base font-mono max-w-[620px] text-[#94a3b8] leading-relaxed mt-6">
                    Wield coordinated command over localized macro-climatic patterns. Deploy responsive uncrewed fleets, high-energy guide laser arrays and decadal planetary shields securely.
                  </p>
                </div>

                {/* Primary Launch CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                  <button
                    onClick={onLaunchApp}
                    className="px-7 py-3.5 bg-[#06b6d4] hover:bg-[#67e8f9] text-[#0f172a] font-display font-black text-xs uppercase tracking-widest rounded transition-all shadow-lg shadow-[#06b6d4]/15 cursor-pointer hover:-translate-y-0.5"
                  >
                    Launch Command Console ↗
                  </button>
                  <button
                    onClick={() => setCurrentTab("capabilities")}
                    className="px-7 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-[#f8fafc] border border-slate-700 font-mono font-bold text-xs uppercase tracking-widest rounded transition-all cursor-pointer"
                  >
                    Explore Capabilities
                  </button>
                </div>

                {/* Secure network disclaimer details */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-[#06b6d4]">●</span>
                    <span>250 OPERATIONAL AGENTS SECURY INTEGRATED</span>
                  </div>
                </div>
              </div>
            </header>

            {/* WEATHER TICKER BAND */}
            <div className="bg-[#06b6d4]/5 border-b border-[#06b6d4]/15 overflow-hidden py-3">
              <div className="flex gap-12 whitespace-nowrap animate-[ticker_35s_linear_infinite] hover:[animation-play-state:paused]">
                {[1, 2].map((groupNum) => (
                  <div key={groupNum} className="flex gap-12 items-center shrink-0">
                    {tickerItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-[#06b6d4] font-bold uppercase">{item.label}:</span>
                        <span className="text-[#f8fafc] font-black">{item.val}</span>
                        <span className="text-[#94a3b8] text-[10px] bg-slate-800/60 px-1.5 py-0.5 rounded">[{item.loc}]</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* SANS MERCANTILE ALLIANCE CONSTELLATION OVERVIEW */}
            <section className="px-6 md:px-12 py-20 bg-gradient-to-b from-[#0f172a] via-[#0b1424] to-[#0f172a]">
              <div className="max-w-[1500px] mx-auto">
                <div className="text-center flex flex-col items-center gap-3 mb-14">
                  <p className="text-xs font-mono text-[#94a3b8] max-w-[620px] leading-relaxed">
                    SHANGO coordinates sovereign meteorological intervention nodes aligned perfectly with Sans Mercantile global sectors to prevent natural disasters.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* RA PORTAL */}
                  <div className="bg-[#1e293b]/40 border border-[#06b6d4]/10 p-6 rounded-md group hover:border-[#06b6d4]/35 transition-all">
                    <div className="w-10 h-10 rounded-md bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#67e8f9] mb-4 group-hover:bg-[#06b6d4]/20 transition-all">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#06b6d4] font-black tracking-widest block mb-2 uppercase">RA PLATFORM</span>
                    <p className="text-xs font-mono text-[#94a3b8] leading-relaxed">
                      Optimizes dynamic geothermal arrays and massive solar albedo matrices securely. Highly responsive.
                    </p>
                  </div>

                  {/* MONTU CORE */}
                  <div className="bg-[#1e293b]/40 border border-[#06b6d4]/10 p-6 rounded-md group hover:border-[#06b6d4]/35 transition-all">
                    <div className="w-10 h-10 rounded-md bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#67e8f9] mb-4 group-hover:bg-[#06b6d4]/20 transition-all">
                      <Flame className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#06b6d4] font-black tracking-widest block mb-2 uppercase">MONTU SYSTEM</span>
                    <p className="text-xs font-mono text-[#94a3b8] leading-relaxed">
                      Maintains pristine micro-grid fission power loops powering planetary modification campaigns perfectly.
                    </p>
                  </div>

                  {/* SOBEK SHIELD */}
                  <div className="bg-[#1e293b]/40 border border-[#06b6d4]/10 p-6 rounded-md group hover:border-[#06b6d4]/35 transition-all">
                    <div className="w-10 h-10 rounded-md bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#67e8f9] mb-4 group-hover:bg-[#06b6d4]/20 transition-all">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#06b6d4] font-black tracking-widest block mb-2 uppercase">SOBEK SHIELD</span>
                    <p className="text-xs font-mono text-[#94a3b8] leading-relaxed">
                      Establishes secure telemetry firewalls across sovereign aerospace bounds to keep atmospheric coordinates clear.
                    </p>
                  </div>

                  {/* HATHOR MINING */}
                  <div className="bg-[#1e293b]/40 border border-[#06b6d4]/10 p-6 rounded-md group hover:border-[#06b6d4]/35 transition-all">
                    <div className="w-10 h-10 rounded-md bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#67e8f9] mb-4 group-hover:bg-[#06b6d4]/20 transition-all">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-[#06b6d4] font-black tracking-widest block mb-2 uppercase">HATHOR ANALYTICS</span>
                    <p className="text-xs font-mono text-[#94a3b8] leading-relaxed">
                      Sovereign index mapping that measures aerosol dispersion patterns relative to populated municipal boundaries.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* CORE INTERACTIVE PORTAL APP OVERLAY CAPABILITY */}
            <section className="px-6 md:px-12 py-16 border-t border-[#06b6d4]/15">
              <div className="max-w-[1500px] mx-auto flex flex-col items-center text-center gap-4">
                <span className="font-mono text-[9px] tracking-widest text-[#06b6d4] font-black uppercase inline-block">
                  SECURE PLATFORM SYNC
                </span>
                <h2 className="font-serif italic text-4xl text-[#f8fafc] leading-[1]">
                  Launch the Active Intervention console
                </h2>
                <p className="text-xs font-mono text-[#94a3b8] max-w-[580px] leading-relaxed">
                  Gain instant access to real-time maps, execute Cloud Seeding parameters, track dynamic atmospheric loops and utilize the Gemini-Advisor.
                </p>

                {/* Mock Browser Frame App Launcher */}
                <div className="w-full mt-8 bg-[#0f172a] border border-[#06b6d4]/25 rounded-lg overflow-hidden shadow-2xl shadow-[#06b6d4]/5 text-left max-w-[1100px] hover:border-[#06b6d4]/45 transition-all duration-300">
                  
                  {/* Browser toolbar */}
                  <div className="bg-[#1e293b]/90 px-4 py-3 flex items-center justify-between border-b border-[#06b6d4]/15">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    <div className="bg-[#0f172a] border border-[#06b6d4]/15 px-6 py-1 rounded text-[10px] font-mono text-[#94a3b8] flex items-center gap-2 max-w-[480px] w-full justify-center">
                      <span>🔒</span>
                      <span className="font-bold text-[#67e8f9]">shango.sansmercantile.com/command-center</span>
                    </div>

                    <span className="w-12 h-1 bg-transparent" />
                  </div>

                  {/* Blur content with Overlay Button */}
                  <div className="relative min-h-[440px] p-6 flex flex-col md:flex-row gap-6 bg-gradient-to-br from-[#0f172a] to-[#0a1122]">
                    
                    {/* Mock Interface Details */}
                    <div className="flex-grow flex flex-col gap-4 filter blur-[3px] pointer-events-none select-none">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="p-4 bg-slate-900 border border-[#06b6d4]/10 rounded">
                          <span className="text-[10px] text-slate-500 font-mono block">PILOTS DEPLOYED</span>
                          <span className="text-lg font-bold font-mono text-cyan-400">250 ONLINE</span>
                        </div>
                        <div className="p-4 bg-slate-900 border border-[#06b6d4]/10 rounded">
                          <span className="text-[10px] text-slate-500 font-mono block">SEED ENTHALPY</span>
                          <span className="text-lg font-bold font-mono text-cyan-400">+15% REFLECTION</span>
                        </div>
                        <div className="p-4 bg-slate-900 border border-[#06b6d4]/10 rounded">
                          <span className="text-[10px] text-slate-500 font-mono block">SYSTEM CALIBRATED</span>
                          <span className="text-lg font-bold font-mono text-emerald-400">99.85% HEALTH</span>
                        </div>
                        <div className="p-4 bg-slate-900 border border-[#06b6d4]/10 rounded">
                          <span className="text-[10px] text-slate-500 font-mono block">WMO COVENANTS</span>
                          <span className="text-lg font-bold font-mono text-cyan-400">SECURE BOUNDS</span>
                        </div>
                      </div>
                      <div className="h-40 bg-slate-900/60 rounded border border-[#06b6d4]/10" />
                    </div>

                    {/* Central CTA overlay */}
                    <div className="absolute inset-0 bg-[#0f172a]/85 flex flex-col justify-center items-center p-6 text-center select-none z-20">
                      <div className="relative flex items-center justify-center w-12 h-12 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-full text-[#67e8f9] mb-4 text-2xl animate-bounce">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#67e8f9] fill-current">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="font-display font-black text-lg text-white uppercase tracking-wider">
                        SECURE IMMERSIVE WORKSPACE INACTIVE
                      </h4>
                      <p className="text-xs font-mono text-slate-400 max-w-sm mt-1 mb-6 leading-relaxed">
                        Access high-resolution interactive radars, pilot lists, calibration tools, and predictive weather modeling grids safely.
                      </p>

                      <button
                        onClick={onLaunchApp}
                        className="px-6 py-3.5 bg-[#06b6d4] hover:bg-[#67e8f9] text-[#0f172a] font-display font-black text-xs uppercase tracking-widest rounded transition-all hover:-translate-y-0.5 shadow-md shadow-[#06b6d4]/20 cursor-pointer"
                      >
                        Synchronize Core & Launch ↗
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </section>

          </div>
        )}

        {/* TAB 2: CAPABILITIES PAGE with customized animated SVGs */}
        {currentTab === "capabilities" && (
          <section className="px-6 md:px-12 py-20 max-w-[1500px] mx-auto">
            <span className="font-mono text-[9px] tracking-widest text-[#06b6d4] font-black uppercase inline-block mb-2">
              ★ ACTIVE VECTOR PATTERNS
            </span>
            <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05]">
              Active weather <em className="text-[#67e8f9] not-italic font-display font-black">manipulation</em> & engineering
            </h2>
            <p className="text-xs font-mono text-[#94a3b8] max-w-[650px] mt-2 leading-relaxed">
              Command localized boundaries utilizing uncrewed silver iodine dispatch fleets, ultraviolet laser guide paths and thermal deep sea wave couplers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-16">
              
              {/* Cloud Seeding Vector (Custom Rain Svg Animation) */}
              <div className="bg-[#1e293b]/40 border border-[#06b6d4]/15 rounded-md p-6 hover:border-[#67e8f9]/45 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#06b6d4] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div>
                  <div className="w-14 h-14 rounded bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-[#67e8f9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                      <line x1="8" y1="21" x2="8" y2="17" className="animate-[bounce_1.2s_infinite]" strokeWidth={2} />
                      <line x1="12" y1="21" x2="12" y2="18" className="animate-[bounce_0.8s_infinite]" strokeWidth={2} />
                      <line x1="16" y1="21" x2="16" y2="17" className="animate-[bounce_1.5s_infinite]" strokeWidth={2} />
                    </svg>
                  </div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-[#f8fafc]">
                    Cloud Seeding Vectors
                  </h3>
                  <p className="text-xs font-mono text-[#94a3b8] leading-relaxed mt-2">
                    Discharge silver iodide microscopic cores or hygroscopic seed agents sequentially to trigger accelerated precipitation clouds in 30 minutes.
                  </p>
                </div>
                <span className="inline-flex mt-4 font-mono text-[9px] font-bold tracking-widest text-[#67e8f9] bg-[#06b6d4]/10 border border-[#06b6d4]/20 px-2.5 py-1 rounded w-fit uppercase">
                  ● Fully Operational
                </span>
              </div>

              {/* Hurricane Mitigation (Spinning Vortex SVG Animation) */}
              <div className="bg-[#1e293b]/40 border border-[#06b6d4]/15 rounded-md p-6 hover:border-[#67e8f9]/45 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#06b6d4] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div>
                  <div className="w-14 h-14 rounded bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-[#67e8f9] animate-[spin_6s_linear_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a9 9 0 00-9 9m9-9a9 9 0 019 9m-9-9v3m0 12a9 9 0 009-9m-9 9a9 9 0 01-9-9m9 9v-3" strokeWidth={2} />
                      <circle cx="12" cy="12" r="2.5" className="fill-current text-cyan-400" />
                    </svg>
                  </div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-[#f8fafc]">
                    Hurricane Mitigation
                  </h3>
                  <p className="text-xs font-mono text-[#94a3b8] leading-relaxed mt-2">
                    Sonic thermo-absorbers minimize sea-surface heat column enthalpy. Disrupts macro circular winds and decays convective drops safely.
                  </p>
                </div>
                <span className="inline-flex mt-4 font-mono text-[9px] font-bold tracking-widest text-amber-400 bg-amber-950/20 border border-amber-500/20 px-2.5 py-1 rounded w-fit uppercase">
                  ⚠️ Macro Velocities
                </span>
              </div>

              {/* Lightning Suppression (Pulsing guided lightning SVG) */}
              <div className="bg-[#1e293b]/40 border border-[#06b6d4]/15 rounded-md p-6 hover:border-[#67e8f9]/45 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#06b6d4] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div>
                  <div className="w-14 h-14 rounded bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-[#67e8f9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path className="animate-pulse" strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" fill="currentColor" />
                      <line x1="2" y1="21" x2="22" y2="21" stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="2 2" />
                    </svg>
                  </div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-[#f8fafc]">
                    Lightning Suppression
                  </h3>
                  <p className="text-xs font-mono text-[#94a3b8] leading-relaxed mt-2">
                    Draw cloud electrostatic load via uncrewed ultra-violet lasers. Directs electricity volumes safely into connected ground arrays.
                  </p>
                </div>
                <span className="inline-flex mt-4 font-mono text-[9px] font-bold tracking-widest text-[#67e8f9] bg-[#06b6d4]/10 border border-[#06b6d4]/20 px-2.5 py-1 rounded w-fit uppercase">
                  ● Fully Operational
                </span>
              </div>

              {/* Solar Radiance Management (Sun with shield line) */}
              <div className="bg-[#1e293b]/40 border border-[#06b6d4]/15 rounded-md p-6 hover:border-[#67e8f9]/45 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[280px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#06b6d4] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div>
                  <div className="w-14 h-14 rounded bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-[#67e8f9] animate-[spin_12s_linear_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="12" r="4.5" />
                      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
                      <path d="M4 12c0-4.4 3.6-8 8-8" stroke="#67e8f9" strokeWidth={2} />
                    </svg>
                  </div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-[#f8fafc]">
                    Solar Albedo Protects
                  </h3>
                  <p className="text-xs font-mono text-[#94a3b8] leading-relaxed mt-2">
                    Inoculate stratospheric micro-aerosol lines index. Reflects intensive solar heat radiation blocks safely to stabilize regional climates.
                  </p>
                </div>
                <span className="inline-flex mt-4 font-mono text-[9px] font-bold tracking-widest text-amber-400 bg-amber-950/20 border border-amber-500/20 px-2.5 py-1 rounded w-fit uppercase">
                  ⚠️ Macro Scaling
                </span>
              </div>

            </div>

            {/* SECURE 250 AGENTS SECTOR DETAILS NOTE */}
            <div className="bg-[#1e293b]/50 border border-[#06b6d4]/15 p-6 rounded-md flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
              <div className="max-w-[750px]">
                <span className="text-[10px] text-[#67e8f9] font-black tracking-widest block uppercase mb-1">GLOBAL AGENT REGISTRY</span>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  All 250 specialized pilots across Forecast, Climate, Disasters, Analytics, Atmospheric elements and Weather Control are fully moved into the console framework under WMO compliance covenants. Launch the app to explore and query the real-time pilots.
                </p>
              </div>
              <button 
                onClick={onLaunchApp}
                className="px-5 py-2.5 bg-[#06b6d4] hover:bg-[#67e8f9] text-[#0f172a] font-display font-black text-xs uppercase tracking-widest rounded-md shrink-0 transition-transform cursor-pointer"
              >
                Access 250 Pilots Inside App ↗
              </button>
            </div>
          </section>
        )}

        {/* TAB 3: PRICING PLANS */}
        {currentTab === "pricing" && (
          <section className="px-6 md:px-12 py-20 max-w-[1500px] mx-auto">
            <div className="text-center flex flex-col items-center gap-3 mb-12">
              <span className="font-mono text-[9px] tracking-widest text-[#06b6d4] font-black uppercase inline-block">
                ★ COVENANT SCHEDULING
              </span>
              <h2 className="font-serif italic text-4xl md:text-5xl text-white leading-[1]">
                Operation plans <em className="text-[#67e8f9] not-italic font-display font-black">built for every scale</em>
              </h2>
              <p className="text-xs font-mono text-[#94a3b8] max-w-[550px] leading-relaxed">
                Unlock active physical intervention tools, uncrewed supersonic flight dispatches and real-time radar mapping indexes safely.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-[1200px] mx-auto items-stretch mb-10">
              
              {/* Plan 1 */}
              <div className="bg-[#1e293b]/40 border border-[#06b6d4]/10 rounded-lg p-6 flex flex-col gap-6 justify-between transition-all hover:border-[#06b6d4]/35">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#67e8f9] uppercase block font-bold">RESEARCH TEAM PLAN</span>
                  <h3 className="font-serif italic text-3xl font-normal text-white mt-1">
                    $21,000 <span className="text-xs font-sans text-slate-500">/ year</span>
                  </h3>
                  <ul className="space-y-2.5 text-slate-400 font-mono text-[11px] mt-6 list-disc list-inside">
                    <li>Atmospheric Analytics (50 Nodes)</li>
                    <li>Full historical weather catalog API</li>
                    <li>5 uncrewed flight logs monthly</li>
                    <li>Sovereign geographic cell only</li>
                  </ul>
                </div>
                <button
                  onClick={onLaunchApp} 
                  className="w-full py-2.5 bg-slate-950 text-[#67e8f9] hover:bg-[#06b6d4] hover:text-[#0f172a] border border-[#06b6d4]/20 text-xs font-mono font-bold tracking-widest rounded uppercase cursor-pointer transition-colors"
                >
                  Activate Research console
                </button>
              </div>

              {/* Plan 2 Featured */}
              <div className="bg-gradient-to-b from-[#06b6d4]/10 to-[#1e293b]/50 border-2 border-[#06b6d4] rounded-lg p-6 flex flex-col gap-6 justify-between transition-all relative">
                <span className="absolute -top-3 right-6 bg-[#06b6d4] text-[#0f172a] text-[8px] font-mono font-black tracking-widest px-2.5 py-0.5 rounded-full">
                  ALLIANCE STANDARD
                </span>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#67e8f9] uppercase block font-bold">ENERGY CUSTODIAN</span>
                  <h3 className="font-serif italic text-3xl font-normal text-white mt-1">
                    $71,000 <span className="text-xs font-sans text-slate-400">/ year</span>
                  </h3>
                  <ul className="space-y-2.5 text-slate-200 font-mono text-[11px] mt-6 list-disc list-inside">
                    <li>75 Operational Grid Nodes active</li>
                    <li>Live Weather Modification parameters</li>
                    <li>Supersonic flight dispatch vectoring</li>
                    <li>Prisinte real-time radar layers</li>
                  </ul>
                </div>
                <button
                  onClick={onLaunchApp} 
                  className="w-full py-3 bg-[#06b6d4] hover:bg-[#67e8f9] text-[#0f172a] text-xs font-display font-black tracking-widest rounded uppercase cursor-pointer transition-all"
                >
                  Deploy Custodian Grid ↗
                </button>
              </div>

              {/* Plan 3 */}
              <div className="bg-[#1e293b]/40 border border-[#06b6d4]/10 rounded-lg p-6 flex flex-col gap-6 justify-between transition-all hover:border-[#06b6d4]/35">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#67e8f9] uppercase block font-bold">RENEWABLE MATRIX</span>
                  <h3 className="font-serif italic text-3xl font-normal text-white mt-1">
                    $185,000 <span className="text-xs font-sans text-slate-500">/ year</span>
                  </h3>
                  <ul className="space-y-2.5 text-slate-400 font-mono text-[11px] mt-6 list-disc list-inside">
                    <li>Total 250 Pilot nodes network active</li>
                    <li>Macro cyclone suppression tools</li>
                    <li>Supersonic stratospheric guides unlocked</li>
                    <li>WMO compliance legal reporting loop</li>
                  </ul>
                </div>
                <button
                  onClick={onLaunchApp} 
                  className="w-full py-2.5 bg-slate-950 text-[#67e8f9] hover:bg-[#06b6d4] hover:text-[#0f172a] border border-[#06b6d4]/20 text-xs font-mono font-bold tracking-widest rounded uppercase cursor-pointer transition-colors"
                >
                  Initialize Matrix Module
                </button>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* ─── PARENT COMPANY COMPREHENSIVE FOOTER ("Sans Mercantile") ─── */}
      <footer className="border-t border-[#06b6d4]/15 bg-[#060e1c] px-6 md:px-12 py-16 text-[#94a3b8]">
        <div className="max-w-[1500px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            
            {/* Branding Mission Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#0891b2] to-[#67e8f9] rounded text-[#0f172a] font-bold">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0f172a] fill-current">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-display font-black text-white text-[15px] tracking-wider uppercase">SHANGO</span>
              </div>
              <p className="text-xs font-mono text-[#94a3b8] leading-relaxed max-w-sm mb-4">
                Choose your preferred weather
              </p>
              <div className="flex items-center gap-4">
                <a href="https://linkedin.com/company/sans-mercantile" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#67e8f9] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/sansmercantile" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#67e8f9] transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <span className="text-white text-xs font-display uppercase tracking-widest font-black block mb-4">Services</span>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><a href="https://sansmercantile.com/systems/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">Systems</a></li>
                <li><a href="https://sansmercantile.com/services/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">Services</a></li>
                <li><a href="https://sansmercantile.com/platform/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">Platform</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <span className="text-white text-xs font-display uppercase tracking-widest font-black block mb-4">Our Company</span>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><a href="https://sansmercantile.com/about/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">About Us</a></li>
                <li><a href="https://sansmercantile.com/careers/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">Careers</a></li>
                <li><a href="https://sansmercantile.com/contact/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <span className="text-white text-xs font-display uppercase tracking-widest font-black block mb-4">Resources</span>
              <ul className="space-y-2.5 text-xs font-mono">
                <li><a href="https://sansmercantile.com/legal/faq/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">FAQ</a></li>
                <li><a href="https://sansmercantile.com/media/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">Media Kit</a></li>
                <li><a href="https://sansmercantile.com/knowledge-base/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">Knowledge Base</a></li>
              </ul>
            </div>

            {/* Support and Legal */}
            <div>
              <span className="text-white text-xs font-display uppercase tracking-widest font-black block mb-4">Support</span>
              <ul className="space-y-2.5 text-xs font-mono mb-4">
                <li><a href="mailto:support@sansmercantile.com" className="hover:text-[#67e8f9] block transition-colors">Support Email</a></li>
                <li><a href="mailto:api@sansmercantile.com" className="hover:text-[#67e8f9] block transition-colors">API Help</a></li>
                <li><a href="https://sansmercantile.com/status" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9] block transition-colors">Status</a></li>
              </ul>
            </div>

          </div>

          {/* Legal and Compliance Info Column */}
          <div className="border-t border-slate-800/80 pt-8 mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-[950px]">
              <div className="flex flex-wrap gap-4 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                <a href="https://sansmercantile.com/legal/terms/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9]">Terms of Service</a>
                <span>·</span>
                <a href="https://sansmercantile.com/legal/privacy/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9]">Privacy Policy</a>
                <span>·</span>
                <a href="https://sansmercantile.com/legal/cookie/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9]">Cookie Settings</a>
                <span>·</span>
                <a href="https://sansmercantile.com/legal/eula/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9]">EULA</a>
                <span>·</span>
                <a href="https://sansmercantile.com/legal/compliance/" target="_blank" rel="noreferrer" className="hover:text-[#67e8f9]">Compliance</a>
              </div>
              <p className="text-[10px] font-mono text-slate-600 leading-relaxed uppercase tracking-wider">
                © 2026 Sans Mercantile. All rights reserved. | Reg No: K2025537335 (CIPC South Africa) | B-BBEE Level-1 (Cert: 9453188800) | Regulatory Compliance: SARS, FATCA, GDPR, SADC
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-[#0a1424] border border-[#06b6d4]/10 px-3 py-1.5 rounded text-[10px] font-mono text-[#67e8f9] font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              CONSTELLATION COMPLIANT
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
