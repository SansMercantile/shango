import { useState } from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend 
} from "recharts";
import { 
  ShieldAlert, Sparkles, AlertTriangle, 
  TrendingUp, Compass, Cpu, Gauge, Zap, CloudLightning 
} from "lucide-react";

interface ForecastFlashpoint {
  id: string;
  region: string;
  timeframe: string;
  threatType: "convective" | "drought" | "typhoon" | "thermal";
  severity: "Critical" | "Elevated" | "Moderate";
  probability: number; // percentage
  leadingIndicators: { name: string; value: string }[];
  suggestedAction: string;
}

export default function PredictiveEngine() {
  const [forecastHorizon, setForecastHorizon] = useState<"12h" | "24h" | "48h">("24h");
  const [isCalculating, setIsCalculating] = useState(false);
  const [simulatedEpoch, setSimulatedEpoch] = useState(1);

  // Simulated metrics over chosen timeline
  const forecastData = [
    { hour: "02:00", tempAnomaly: 1.2, pressureDrop: 12, lightningRisk: 22, aerosolDivergence: 1.4 },
    { hour: "04:00", tempAnomaly: 1.8, pressureDrop: 18, lightningRisk: 35, aerosolDivergence: 1.8 },
    { hour: "06:00", tempAnomaly: 2.1, pressureDrop: 24, lightningRisk: 58, aerosolDivergence: 2.5 },
    { hour: "08:00", tempAnomaly: 3.4, pressureDrop: 32, lightningRisk: 84, aerosolDivergence: 3.8 },
    { hour: "10:00", tempAnomaly: 2.9, pressureDrop: 28, lightningRisk: 79, aerosolDivergence: 3.2 },
    { hour: "12:00", tempAnomaly: 2.2, pressureDrop: 19, lightningRisk: 42, aerosolDivergence: 2.4 },
    { hour: "14:00", tempAnomaly: 1.5, pressureDrop: 11, lightningRisk: 28, aerosolDivergence: 1.6 },
  ];

  const thermalIndexData = [
    { zone: "Great Plains", standardReflection: 0.22, optimalAlbedo: 0.38 },
    { zone: "Mariana Basin", standardReflection: 0.12, optimalAlbedo: 0.18 },
    { zone: "Singapore Strait", standardReflection: 0.18, optimalAlbedo: 0.28 },
    { zone: "Saharan Corridor", standardReflection: 0.31, optimalAlbedo: 0.45 },
    { zone: "Valais Valley", standardReflection: 0.25, optimalAlbedo: 0.35 },
  ];

  const initialFlashpoints: ForecastFlashpoint[] = [
    {
      id: "FP-109",
      region: "Valais Valley alpine perimeter",
      timeframe: "+6.5 Hours",
      threatType: "convective",
      severity: "Critical",
      probability: 94,
      leadingIndicators: [
        { name: "Ground Charge Voltage", value: "3.2 MV/m" },
        { name: "Dewpoint Congestion Index", value: "88%" },
        { name: "Satellite Thermal Contrast Score", value: "0.82" }
      ],
      suggestedAction: "Dispatch laser ionization guide lines to drain charge; utilize acoustic suppressor rings to prevent convective clustering."
    },
    {
      id: "FP-110",
      region: "Mariana Basin thermal axis",
      timeframe: "+12.0 Hours",
      threatType: "typhoon",
      severity: "Critical",
      probability: 88,
      leadingIndicators: [
        { name: "Central pressure fall velocity", value: "3.4mb/hour" },
        { name: "Convective sea surface thermal enthalpy", value: "29.8°C" },
        { name: "Vorticity escalation indicator", value: "High" }
      ],
      suggestedAction: "Power up Concentric Thermoelectric marine absorbers to 85%; align sonic disruptors to degrade cyclonic wind cohesion."
    },
    {
      id: "FP-111",
      region: "Great Plains Central corridor",
      timeframe: "+18.5 Hours",
      threatType: "drought",
      severity: "Elevated",
      probability: 72,
      leadingIndicators: [
        { name: "Local condensation level", value: "FL 280" },
        { name: "Relative planetary boundary saturation", value: "14%" },
        { name: "Dust particle vector blockage", value: "31%" }
      ],
      suggestedAction: "Deploy high-altitude uncrewed flights equipped with silver iodide micro-condensation agents to stimulate precipitation columns."
    },
    {
      id: "FP-112",
      region: "Saharan Corridor East",
      timeframe: "+24.0 Hours",
      threatType: "thermal",
      severity: "Moderate",
      probability: 68,
      leadingIndicators: [
        { name: "Solar radiation absorbance score", value: "0.68" },
        { name: "Planetary albedo default decay", value: "-0.04" },
        { name: "Convective heat pocket boundary", value: "48.2°C" }
      ],
      suggestedAction: "Position Stratospheric Aerosol Injection (SAI) units to disperse protective sulfur shields and escalate albedo values."
    }
  ];

  const [flashpoints, setFlashpoints] = useState<ForecastFlashpoint[]>(initialFlashpoints);

  const triggerDiagnosticModel = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setSimulatedEpoch(prev => prev + 1);
      // Shuffle / modify some values slightly to show active recalculation output
      setFlashpoints(prev => 
        prev.map(fp => ({
          ...fp,
          probability: Math.min(100, Math.max(40, fp.probability + Math.round((Math.random() - 0.5) * 8))),
          leadingIndicators: fp.leadingIndicators.map(i => {
            if (i.name.includes("Voltage") || i.name.includes("pressure")) {
              const num = parseFloat(i.value) || 0;
              const unit = i.value.replace(/[0-9.]/g, "");
              const newVal = (num + (Math.random() - 0.5) * (num * 0.1)).toFixed(2);
              return { ...i, value: `${newVal}${unit}` };
            }
            return i;
          })
        }))
      );
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Diagnostics Controls HUD */}
      <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center text-[#06b6d4] animate-pulse">
              <CloudLightning className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#06b6d4] font-bold uppercase block">
                Atmospheric Prediction Core
              </span>
              <h2 className="font-display font-black text-lg text-[#f8fafc] tracking-wider uppercase">
                SHANGO GLOBAL DYNAMIC THREAT RADAR
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex bg-[#0f172a] rounded-md p-1 border border-[#06b6d4]/10">
              {(["12h", "24h", "48h"] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setForecastHorizon(h)}
                  className={`px-3 py-1 font-mono text-[11px] font-bold rounded-sm transition-all ${
                    forecastHorizon === h
                      ? "bg-[#06b6d4] text-[#0f172a]"
                      : "text-[#94a3b8] hover:text-[#f8fafc]"
                  }`}
                >
                  {h.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={triggerDiagnosticModel}
              disabled={isCalculating}
              className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider rounded-md border transition-all flex items-center gap-2 ${
                isCalculating
                  ? "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed"
                  : "bg-[#06b6d4] border-[#0891b2] text-[#0f172a] hover:bg-[#67e8f9]"
              }`}
            >
              <Cpu className={`w-3.5 h-3.5 ${isCalculating ? "animate-spin" : ""}`} />
              {isCalculating ? "Analyzing Grids..." : "Run Neural Diagnostics"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Panel grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Anomalies & Forecast Charts (Takes 7 cols) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
          
          {/* Chart 1: Electrostatic & Thermal Anomalies Trend */}
          <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md p-5 shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#06b6d4]/10 pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#06b6d4]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f8fafc]">
                  Electrostatic Accumulation & Latent Presure Drop Index
                </span>
              </div>
              <span className="text-[9px] font-mono p-1 bg-[#06b6d4]/10 rounded text-[#06b6d4]">
                METEO-NEURAL-SIM V4
              </span>
            </div>

            <div className="h-[230px] w-full mt-2 font-mono text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="hour" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1e293b", borderColor: "rgba(6, 182, 212, 0.3)", borderRadius: "6px" }}
                    labelStyle={{ color: "#06b6d4", fontWeight: "bold" }}
                  />
                  <Line type="monotone" dataKey="lightningRisk" stroke="#67e8f9" strokeWidth={2} name="Convective Lightning Risk (%)" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="pressureDrop" stroke="#f43f5e" strokeWidth={1.5} name="Atm-Pressure Drop Index (mb)" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Albedo Reflection Factors per Zone */}
          <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md p-5 shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#06b6d4]/10 pb-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#06b6d4]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#f8fafc]">
                  Solar Thermal Albedo: standard vs. optimal target index
                </span>
              </div>
            </div>

            <div className="h-[210px] w-full mt-1 font-mono text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={thermalIndexData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="zone" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", borderColor: "rgba(6, 182, 212, 0.3)", borderRadius: "6px" }}
                    labelStyle={{ color: "#06b6d4", fontWeight: "bold" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "10px", marginTop: "10px" }} />
                  <Bar dataKey="standardReflection" fill="#1e293b" stroke="#06b6d4" strokeWidth={1} name="Standard Reflected Albedo" />
                  <Bar dataKey="optimalAlbedo" fill="rgba(6, 182, 212, 0.2)" stroke="#67e8f9" strokeWidth={1.5} name="Optimal Intervention Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Threat Assessment Ledger (Takes 5 cols) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md p-5 shadow-md h-full flex flex-col gap-4">
            
            <div className="flex items-center justify-between border-b border-[#06b6d4]/15 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#06b6d4]" />
                <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#f8fafc]">
                  METEO FORECAST ANOMALY LEDGER
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#94a3b8]">
                EPOCH #{simulatedEpoch}
              </span>
            </div>

            <div className="flex-grow space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {flashpoints.map((fp) => (
                <div 
                  key={fp.id} 
                  className={`p-4 rounded-md border flex flex-col gap-2.5 transition-all bg-[#0f172a]/40 ${
                    fp.severity === "Critical" 
                      ? "border-red-500/20 hover:border-red-500/40" 
                      : "border-amber-500/10 hover:border-amber-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${fp.severity === "Critical" ? "bg-red-500 animate-pulse" : "bg-amber-500 animate-pulse"}`} />
                      <span className="font-mono text-[10px] text-[#06b6d4] font-bold">{fp.id}</span>
                      <span className="text-[10px] font-mono text-[#94a3b8]">{fp.timeframe}</span>
                    </div>

                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      fp.severity === "Critical" 
                        ? "bg-red-950/40 text-red-400 border border-red-500/20" 
                        : "bg-amber-950/20 text-amber-400 border border-amber-500/20"
                    }`}>
                      {fp.severity} Threat
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-xs text-[#f8fafc] uppercase tracking-wide">
                      {fp.region}
                    </h4>
                  </div>

                  {/* Meter Level Indicators */}
                  <div className="grid grid-cols-1 gap-1.5 p-2 bg-[#0d1527] rounded-md border border-[#06b6d4]/5">
                    <div className="flex justify-between text-[9px] font-mono text-[#94a3b8]">
                      <span>Leading Indicators & Signals:</span>
                      <span className="text-[#06b6d4] font-bold">{fp.probability}% match confidence score</span>
                    </div>
                    
                    <div className="space-y-1">
                      {fp.leadingIndicators.map((ind, idx) => (
                        <div key={idx} className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-500">{ind.name}:</span>
                          <span className="text-[#f8fafc] font-semibold">{ind.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] font-mono leading-relaxed text-[#94a3b8] border-l border-[#06b6d4]/30 pl-2">
                    {fp.suggestedAction}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-md text-[10px] font-mono text-[#94a3b8] leading-relaxed">
              <span className="text-[#06b6d4] font-bold uppercase block mb-1">Theoretical Model Logic:</span>
              Algorithms resolve latent convective values directly matching NCAR storm simulation matrices, triggering active defensive responses automatically at coordinate intersection bounds.
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
