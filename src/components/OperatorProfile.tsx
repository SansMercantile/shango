import { useState } from "react";
import { 
  User, Shield, ShieldCheck, MapPin, 
  Radio, Award, Settings, Layers, Flame, RefreshCw 
} from "lucide-react";

interface TrackedStat {
  label: string;
  count: number;
  unit: string;
  colorClass: string;
}

export default function OperatorProfile() {
  const [handle, setHandle] = useState("mezzoforte@sansmercantile.com");
  const [officerName, setOfficerName] = useState("Command Officer Alpha");
  const [bio, setBio] = useState("Sovereign Atmospheric Custodian commanding high-altitude geo-engineering grids over severe weather anomalies.");
  const [securityClearance, setSecurityClearance] = useState("Atmospheric Level IX Authorized");
  const [stationId, setStationId] = useState("GEO-STRAT-09");
  const [calibrationProgress, setCalibrationProgress] = useState(89);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const [avatarIndex, setAvatarIndex] = useState(0);
  const avatarVisuals = [
    { glyph: "⚡", style: "from-cyan-500 to-blue-600 text-slate-900 border-cyan-400" },
    { glyph: "🌀", style: "from-teal-500 to-indigo-600 text-slate-900 border-teal-400" },
    { glyph: "☀️", style: "from-amber-400 to-orange-500 text-slate-900 border-amber-300" },
    { glyph: "☄️", style: "from-purple-500 to-pink-600 text-slate-900 border-purple-400" }
  ];

  const statCounters: TrackedStat[] = [
    { label: "Silver Iodide Runs", count: 48, unit: "Flights", colorClass: "text-[#06b6d4]" },
    { label: "Storm Dampening Triggers", count: 19, unit: "Sonic Pulses", colorClass: "text-[#67e8f9]" },
    { label: "Alpine Laser Discharges", count: 34, unit: "Ground Locks", colorClass: "text-indigo-400" },
    { label: "Albedo Radiation Shieldings", count: 12, unit: "Aerosol Layers", colorClass: "text-amber-400" }
  ];

  const handleRecalibrateAntenna = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrationProgress(94 + Math.round(Math.random() * 5));
    }, 1800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* Left Column: Officer Credentials and Profile Configuration (Takes 5 cols) */}
      <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
        <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md p-6 shadow-lg flex flex-col gap-5 h-full">
          
          <div className="flex items-center gap-2 border-b border-[#06b6d4]/10 pb-3">
            <User className="w-4 h-4 text-[#06b6d4]" />
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#f8fafc]">
              OFFICER CREDENTIAL REGISTRY
            </h3>
          </div>

          <div className="flex items-center gap-4 bg-[#0f172a]/60 p-4 rounded-md border border-[#06b6d4]/5">
            {/* Clickable Animated Avatar selection */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarVisuals[avatarIndex].style} flex items-center justify-center text-2xl font-black shadow-md border-2 animate-pulse cursor-pointer transition-transform hover:scale-105`}
                onClick={() => setAvatarIndex((avatarIndex + 1) % avatarVisuals.length)}
                title="Tap to change avatar glyph"
              >
                {avatarVisuals[avatarIndex].glyph}
              </div>
              <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">TAP GLYPH</span>
            </div>

            <div className="overflow-hidden">
              <span className="text-[10px] font-mono p-1 bg-[#06b6d4]/15 rounded text-[#06b6d4] font-bold uppercase tracking-widest">
                {securityClearance}
              </span>
              <h4 className="font-display font-black text-base text-[#f8fafc] tracking-tight mt-1 truncate">
                {officerName}
              </h4>
              <p className="text-[11px] font-mono text-[#94a3b8] truncate">
                {handle}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-[#94a3b8] uppercase font-bold">Officer Handle</label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="bg-[#0f172a] border border-[#06b6d4]/15 rounded-md px-3.5 py-2 text-xs text-[#f8fafc] focus:outline-none focus:border-[#06b6d4]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-[#94a3b8] uppercase font-bold">Contact Email / Communication Node</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="bg-[#0f172a] border border-[#06b6d4]/15 rounded-md px-3.5 py-2 text-xs text-[#f8fafc] focus:outline-none focus:border-[#06b6d4]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono text-[#94a3b8] uppercase font-bold">Operational Biography & Scope</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="bg-[#0f172a] border border-[#06b6d4]/15 rounded-md px-3.5 py-2 text-xs text-[#f8fafc] focus:outline-none focus:border-[#06b6d4] resize-none leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-[#0f172a] p-3 rounded-md border border-red-500/10 text-[10px] font-mono text-slate-500 leading-relaxed flex gap-2">
            <Shield className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>Unauthorized modifications to grid control authority will automatically alert global councils. Handle safety clearances inside appropriate localized regions only.</span>
          </div>

        </div>
      </div>

      {/* Right Column: Historical Stats & Satellite Antenna Calibration Gauge (Takes 7 cols) */}
      <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
        
        {/* Statistics Grid */}
        <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md p-6 shadow-lg flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-[#06b6d4]/10 pb-3">
            <Award className="w-4.5 h-4.5 text-[#06b6d4]" />
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#f8fafc]">
              CLIMATE DISRUPTION EXPERIMENT SCORES
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCounters.map((stat, idx) => (
              <div key={idx} className="bg-[#0f172a] p-4 rounded-md border border-[#06b6d4]/5 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-[#f8fafc] tracking-tight">{stat.count}</span>
                <span className={`text-[9px] font-mono uppercase tracking-wider h-7 flex items-center justify-center font-bold text-slate-400`}>
                  {stat.label}
                </span>
                <span className="text-[8px] font-mono text-slate-500 uppercase mt-1">{stat.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Satellite Signal Antenna Settings Card */}
        <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md p-6 shadow-md flex-grow flex flex-col gap-4 justify-between">
          <div className="flex items-center justify-between border-b border-[#06b6d4]/10 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4.5 h-4.5 text-[#06b6d4] animate-pulse" />
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#f8fafc]">
                SATELLITE MICROWAVE RELAY CALIBRATION
              </h3>
            </div>
            
            <span className="font-mono text-[10px] text-[#06b6d4] font-bold">
              {stationId} LINK STATUS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-slate-400">Orbital Signal Strength</span>
                <span className="text-[#06b6d4] font-bold">{calibrationProgress}% Accurate</span>
              </div>

              {/* Graphical Progress Bar */}
              <div className="w-full bg-[#0f172a] h-3 rounded-full overflow-hidden border border-[#06b6d4]/15">
                <div 
                  className="bg-gradient-to-r from-[#0891b2] to-[#67e8f9] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${calibrationProgress}%` }}
                />
              </div>

              <div className="text-[10px] font-mono text-[#94a3b8] leading-relaxed">
                Realign the focal dish periodically to bypass high-altitude cloud structures. Locked signals prevent micro-burst coordination drift.
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-3.5 bg-[#0f172a] border border-[#06b6d4]/10 rounded-md gap-3">
              <div className="text-[10px] font-mono text-slate-400 text-center">
                Last Handshake: <span className="text-[#f8fafc] font-bold">JUST NOW</span>
              </div>

              <button
                onClick={handleRecalibrateAntenna}
                disabled={isCalibrating}
                className={`w-full py-2 font-mono text-xs font-bold uppercase tracking-wider rounded border transition-all flex items-center justify-center gap-2 ${
                  isCalibrating
                    ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
                    : "bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 border-[#06b6d4]/30 text-[#06b6d4]"
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCalibrating ? "animate-spin" : ""}`} />
                {isCalibrating ? "Aligning satellite dish..." : "Recalibrate Array focal dish"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2 border-t border-slate-800 pt-3.5">
            <div className="font-mono text-[10px] text-slate-500">
              STATION LONGITUDE: <span className="text-[#f8fafc] font-bold">145.334° E</span>
            </div>
            <div className="font-mono text-[10px] text-slate-500 text-right">
              STATION LATITUDE: <span className="text-[#f8fafc] font-bold">14.198° N</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
