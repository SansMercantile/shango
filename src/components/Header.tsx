import { ExternalLink, Compass, Shield, Cpu, User, Radio } from "lucide-react";

interface HeaderProps {
  currentZoneName: string;
  currentPage: string;
  onPageChange: (page: string) => void;
  onExitToPortal: () => void;
}

export default function Header({ currentZoneName, currentPage, onPageChange, onExitToPortal }: HeaderProps) {
  const navItems = [
    { id: "dashboard", label: "Command Center", icon: Cpu },
    { id: "predictive", label: "Dynamic Forecasts", icon: Compass },
    { id: "agents", label: "Agent Directory", icon: Radio },
    { id: "onboarding", label: "System Calibration", icon: Shield },
    { id: "profile", label: "Officer Registry", icon: User }
  ];

  return (
    <header className="border-b border-[#06b6d4]/15 bg-[#1b2537] px-4 py-4 flex flex-col xl:flex-row items-center justify-between gap-5 sticky top-0 z-50 shadow-lg">
      
      {/* 1. BRANDING & STRIKING LIGHTNING Animated Logo */}
      <div className="flex items-center gap-3 w-full xl:w-auto">
        <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#0891b2] to-[#67e8f9] rounded-md text-[#0f172a] shadow-md select-none overflow-hidden group">
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 text-[#0f172a] fill-current lightning-strike"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#67e8f9] rounded-full animate-ping opacity-75" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-lg tracking-wider text-[#f8fafc]">
              SHANGO
            </h1>
            <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded bg-[#06b6d4]/15 text-[#67e8f9] border border-[#06b6d4]/20 uppercase font-bold">
              Atmospheric Core
            </span>
          </div>
          <p className="text-[10px] text-[#94a3b8] font-mono">
            Active Intervention Command Console
          </p>
        </div>
      </div>

      {/* 2. DYNAMIC REAL-TIME NAVIGATION NAVIGATION TABS */}
      <nav className="flex flex-wrap items-center justify-center gap-1 bg-[#0f172a]/70 p-1 border border-[#06b6d4]/10 rounded-lg w-full xl:w-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 ${
                isActive
                  ? "bg-[#06b6d4] text-[#0f172a] shadow-md shadow-[#06b6d4]/10"
                  : "text-[#94a3b8] hover:text-[#f8fafc] hover:bg-slate-800/40"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 3. META METEOROLOGICAL TELEMETRY GRID */}
      <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#94a3b8]">
        <div className="flex flex-col">
          <span className="text-[9px] text-[#94a3b8]/60 uppercase tracking-widest">COMMAND NODE</span>
          <span className="text-[#f8fafc] font-medium">GEO-STRAT-09</span>
        </div>
        <div className="w-px h-6 bg-[#334155]" />
        <div className="flex flex-col">
          <span className="text-[9px] text-[#94a3b8]/60 uppercase tracking-widest">USER CONTACT</span>
          <span className="text-[#06b6d4] font-semibold">mezzoforte@sansmercantile.com</span>
        </div>
        <div className="w-px h-6 bg-[#334155]" />
        <div className="flex flex-col">
          <span className="text-[9px] text-[#94a3b8]/60 uppercase tracking-widest">SECURE GRID</span>
          <span className="text-[#67e8f9] uppercase font-bold">ACTIVE: {currentZoneName}</span>
        </div>
      </div>

      {/* 4. EXTERNAL PORTAL LINK BUTTON */}
      <div className="flex items-center gap-3 w-full xl:w-auto justify-end">
        <button 
          onClick={onExitToPortal}
          className="group flex items-center gap-2 px-4 py-2 bg-[#06b6d4]/10 hover:bg-[#06b6d4]/25 text-[#67e8f9] border border-[#06b6d4]/30 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-md shadow-sm font-display w-full xl:w-auto justify-center cursor-pointer"
        >
          <span>Landing Portal</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#67e8f9] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </header>
  );
}
