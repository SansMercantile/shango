import { Zone } from "../types";
import { Globe, Wind } from "lucide-react";

interface CommandMapProps {
  zones: Zone[];
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
  isSeedingActive: boolean;
  isCoolerActive: boolean;
  isLaserPulsing: boolean;
  isSrmActive: boolean;
}

export default function CommandMap({
  zones,
  selectedZoneId,
  onSelectZone,
  isSeedingActive,
  isCoolerActive,
  isLaserPulsing,
  isSrmActive,
}: CommandMapProps) {
  const currentZone = zones.find(z => z.id === selectedZoneId) || zones[0];

  return (
    <div className="bg-[#1e293b] border border-[#06b6d4]/15 shadow-sm flex flex-col h-full rounded-md">
      {/* Map Header Panel */}
      <div className="bg-[#0f172a] border-b border-[#06b6d4]/15 px-5 py-3.5 flex items-center justify-between rounded-t-md">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#06b6d4]" />
          <span className="text-xs font-display font-bold tracking-wider text-[#f8fafc] uppercase">
            Atmospheric Stratos-Scan — Global Interaction Layers
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#94a3b8]">
            <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse" />
            <span>GEO-STATIONARY ORBITER SAT-4</span>
          </div>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="relative flex-grow bg-[#0f172a] min-h-[300px] md:min-h-[420px] overflow-hidden select-none flex items-center justify-center border-b border-[#06b6d4]/15">
        {/* Absolute coordinate readouts in margins */}
        <div className="absolute top-3 left-4 text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider">
          Grid: Mercator Multi-Spectral // Level_0
        </div>
        <div className="absolute bottom-3 right-4 text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider">
          WMO Coordinate: {currentZone.coordinates.lat}, {currentZone.coordinates.lng}
        </div>

        {/* Tactical grid backdrop with warm sand-colored lines */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 pointer-events-none opacity-20">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border-t border-l border-[#06b6d4]/10 text-[8px]" />
          ))}
        </div>

        {/* Main SVG Tactical Visualizing Canvas */}
        <svg className="w-full h-full max-w-4xl max-h-[500px]" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Abstract background world continents (vector outline simulation) colored in slate */}
          <path
            d="M 5,20 Q 15,22 18,30 T 25,35 T 28,45 Q 22,50 15,48 T 10,40 Z M 35,42 Q 45,45 52,50 T 60,65 T 58,80 Q 42,78 40,65 T 32,50 Z M 65,22 Q 72,25 78,35 T 85,55 T 90,65 Q 85,75 80,78 T 70,68 T 68,52 Z M 50,15 Q 55,18 52,24 T 48,22 Z"
            fill="none"
            stroke="#1e293b"
            strokeWidth="0.8"
            strokeDasharray="1,1"
          />

          {/* Connective atmospheric stream paths with custom gold vectors */}
          <path
            d="M 10,25 Q 35,38 50,31 T 78,55 T 95,45"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="0.3"
            strokeDasharray="4,8"
            className="opacity-50"
          />
          <path
            d="M 5,60 Q 30,58 48,50 T 68,72 T 95,85"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="0.2"
            strokeDasharray="2,5"
            className="opacity-30"
          />

          {/* Active Intervention Animations OVER selected marker */}
          {/* 1. Cloud Seeding effect (using cyan elements) */}
          {isSeedingActive && currentZone.problemType === "seeding" && (
            <g transform={`translate(${currentZone.coordinates.x}, ${currentZone.coordinates.y})`}>
              <circle r="7" fill="none" stroke="#06b6d4" strokeWidth="0.4" strokeDasharray="1,1" className="radar-sweep" />
              <circle r="4" fill="#06b6d4" fillOpacity="0.1" />
              <line x1="-2" y1="2" x2="-3" y2="6" stroke="#67e8f9" strokeWidth="0.5" strokeLinecap="round" className="animate-pulse" />
              <line x1="0" y1="1" x2="-1" y2="5" stroke="#06b6d4" strokeWidth="0.5" strokeLinecap="round" className="opacity-70 animate-pulse" />
              <line x1="2" y1="2" x2="1" y2="6" stroke="#67e8f9" strokeWidth="0.5" strokeLinecap="round" className="animate-pulse" />
            </g>
          )}

          {/* 2. Cyclone Cryo Disruption */}
          {isCoolerActive && currentZone.problemType === "mitigation" && (
            <g transform={`translate(${currentZone.coordinates.x}, ${currentZone.coordinates.y})`}>
              <circle r="11" fill="none" stroke="#06b6d4" strokeWidth="0.3" className="radar-sweep" />
              <circle r="8" fill="none" stroke="#67e8f9" strokeWidth="0.5" strokeDasharray="3,1" className="radar-sweep" />
              <circle r="3" fill="#06b6d4" fillOpacity="0.15" />
              <polygon points="0,-4 3,0 0,4 -3,0" fill="#06b6d4" fillOpacity="0.6" className="animate-spin" style={{ transformOrigin: "center" }} />
            </g>
          )}

          {/* 3. Alpine Lightning Suppression */}
          {isLaserPulsing && currentZone.problemType === "lightning" && (
            <g transform={`translate(${currentZone.coordinates.x}, ${currentZone.coordinates.y})`}>
              <circle r="6" fill="none" stroke="#06b6d4" strokeWidth="0.3" strokeDasharray="1,1" />
              <line x1="0" y1="-30" x2="0" y2="0" stroke="#06b6d4" strokeWidth="0.8" strokeLinecap="round" className="animate-pulse" />
              <path d="M 0,0 Q -2,-2 -4,-1 T -6,-3" fill="none" stroke="#67e8f9" strokeWidth="0.4" />
              <path d="M 0,0 Q 2,-2 4,-1 T 6,-2" fill="none" stroke="#67e8f9" strokeWidth="0.4" />
              <circle r="2" fill="#06b6d4" />
            </g>
          )}

          {/* 4. Solar Radiation Management SAI */}
          {isSrmActive && currentZone.problemType === "srm" && (
            <g transform={`translate(${currentZone.coordinates.x}, ${currentZone.coordinates.y})`}>
              <circle r="9px" fill="none" stroke="#67e8f9" strokeWidth="0.3" strokeDasharray="1,2" />
              <path d="M -8,-2 Q 0,-6 8,-2" fill="none" stroke="#06b6d4" strokeWidth="0.8" className="animate-pulse" />
              <circle r="1.5" fill="#06b6d4" />
            </g>
          )}

          {/* Interactive Zone Markers */}
          {zones.map((zone) => {
            const isSelected = zone.id === selectedZoneId;
            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone(zone.id)}
                className="cursor-pointer group"
              >
                {/* Glow ring around marker */}
                <circle
                  cx={zone.coordinates.x}
                  cy={zone.coordinates.y}
                  r={isSelected ? "5" : "3.5"}
                  fill={isSelected ? "rgba(6, 182, 212, 0.15)" : "rgba(30, 41, 59, 0.4)"}
                  stroke={isSelected ? "#67e8f9" : "#06b6d4"}
                  strokeWidth={isSelected ? "1" : "0.5"}
                  className="transition-all duration-300 group-hover:stroke-[#67e8f9] group-hover:scale-110"
                />

                {/* Core dot */}
                <circle
                  cx={zone.coordinates.x}
                  cy={zone.coordinates.y}
                  r={isSelected ? "2" : "1.2"}
                  fill={isSelected ? "#67e8f9" : "#0891b2"}
                />

                {/* Text Label on map */}
                <text
                  x={zone.coordinates.x}
                  y={zone.coordinates.y - (isSelected ? 6 : 4.5)}
                  textAnchor="middle"
                  fill={isSelected ? "#67e8f9" : "#94a3b8"}
                  fontSize={isSelected ? "3" : "2.4"}
                  fontFamily="Syne, sans-serif"
                  fontWeight={isSelected ? "bold" : "normal"}
                  className="transition-all duration-200 uppercase tracking-widest select-none font-bold"
                >
                  {zone.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* HUD Quick Info Panel overlay - Slate Translucent Aesthetic */}
        <div className="absolute top-4 right-4 bg-[#1e293b]/95 border border-[#06b6d4]/15 rounded-md p-3.5 w-60 font-mono text-xs text-[#f8fafc] flex flex-col gap-2.5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-[#06b6d4]/15 pb-1.5">
            <span className="text-[#94a3b8] font-bold tracking-wider text-[10px]">SELECTED CELL</span>
            <span className="text-[#06b6d4] uppercase font-bold text-[10px]">{currentZone.name}</span>
          </div>

          <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 text-[11px]">
            <span className="text-[#94a3b8]">ATM-TEMP:</span>
            <span className="text-right text-[#f8fafc] font-medium">{currentZone.parameters.temperature}°C</span>

            <span className="text-[#94a3b8]">PRESSURE:</span>
            <span className="text-right text-[#f8fafc] font-medium">{currentZone.parameters.pressure} mb</span>

            <span className="text-[#94a3b8]">HUMIDITY:</span>
            <span className="text-right text-[#f8fafc] font-medium">{currentZone.parameters.humidity}%</span>

            <span className="text-[#94a3b8]">WIND FLOW:</span>
            <span className="text-right text-[#f8fafc] font-semibold flex items-center justify-end gap-1">
              <Wind className="w-3 h-3 text-[#06b6d4]" />
              <span>{currentZone.parameters.windSpeed} kts {currentZone.parameters.windDirection}</span>
            </span>

            <span className="text-[#94a3b8]">ALBEDO INDEX:</span>
            <span className="text-right text-[#f8fafc] font-medium">{currentZone.parameters.albedo}</span>
          </div>

          <div className="mt-1.5 flex items-center gap-1.5 px-2 py-1 bg-[#0f172a] text-[10px] text-[#94a3b8] border border-[#06b6d4]/15 rounded-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${isSeedingActive || isCoolerActive || isLaserPulsing || isSrmActive ? "bg-[#06b6d4] animate-ping" : "bg-[#334155]"}`} />
            <span className="font-bold tracking-tight">ENGAGEMENT: {isSeedingActive || isCoolerActive || isLaserPulsing || isSrmActive ? "ACTIVE RESPONSE" : "AWAITING STATE"}</span>
          </div>
        </div>

        {/* Key Index Panel left bottom */}
        <div className="absolute bottom-4 left-4 bg-[#1e293b]/90 border border-[#06b6d4]/15 rounded-md px-3 py-2 font-mono text-[10px] text-[#f8fafc] flex flex-col gap-1.5 backdrop-blur-sm shadow-md max-w-[280px]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#1e293b] border border-[#06b6d4]/20" />
            <span className="font-medium text-[#f8fafc] uppercase text-[9px]">ATMOSPHERIC NODE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#06b6d4]" />
            <span className="font-medium text-[#f8fafc] uppercase text-[9px]">GILDED INTERVENTION SECTOR</span>
          </div>
        </div>
      </div>

      {/* Target Zone Quick Switch Selector (Bottom bar) */}
      <div className="bg-[#0f172a] px-5 py-3 flex flex-col sm:flex-row gap-3 items-center justify-between rounded-b-md border-t border-[#06b6d4]/15">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#94a3b8] uppercase">
          Meteorological Monitored Stations:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              className={`px-3.5 py-1.5 rounded-md font-display text-[11px] font-bold tracking-widest uppercase border transition-all duration-200 ${
                zone.id === selectedZoneId
                  ? "bg-[#06b6d4] border-[#0891b2] text-[#0f172a] shadow-md shadow-[#06b6d4]/15"
                  : "bg-[#1e293b] border-[#06b6d4]/15 text-[#f8fafc] hover:border-[#06b6d4] hover:text-[#06b6d4]"
              }`}
            >
              ◈ {zone.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
