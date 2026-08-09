import { useState, useEffect } from "react";
import { Zone, OperationState, InterventionType } from "../types";
import { 
  CloudRain, 
  Wind, 
  Zap, 
  Sun, 
  CheckCircle, 
  Sliders, 
  RefreshCw
} from "lucide-react";

interface InterventionPanelProps {
  selectedZone: Zone;
  operationState: OperationState;
  onUpdateState: (newState: Partial<OperationState>) => void;
  onExecuteAction: (actionType: InterventionType) => void;
  onResetZone: () => void;
}

export default function InterventionPanel({
  selectedZone,
  operationState,
  onUpdateState,
  onExecuteAction,
  onResetZone,
}: InterventionPanelProps) {
  // Temporary loading state to simulate engineering engagement
  const [isEngaging, setIsEngaging] = useState(false);
  const [engagementLog, setEngagementLog] = useState<string | null>(null);

  // Clear engagement alerts when changing zones
  useEffect(() => {
    setIsEngaging(false);
    setEngagementLog(null);
  }, [selectedZone.id]);

  const handleExecute = () => {
    setIsEngaging(true);
    setEngagementLog("Calibrating atmospheric relays... Aligning telemetry vectors...");
    
    setTimeout(() => {
      setEngagementLog("Initiating high-frequency field systems...");
    }, 1200);

    setTimeout(() => {
      setIsEngaging(false);
      setEngagementLog(null);
      onExecuteAction(selectedZone.problemType);
    }, 2500);
  };

  return (
    <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md shadow-sm flex flex-col h-full">
      {/* Panel Header */}
      <div className="bg-[#0f172a] border-b border-[#06b6d4]/15 px-5 py-4 flex items-center justify-between rounded-t-md">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#06b6d4]" />
          <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#f8fafc]">
            Atmospheric Intervention Core
          </h2>
        </div>
        <button
          onClick={onResetZone}
          className="text-[11px] font-mono text-[#06b6d4] hover:text-[#67e8f9] flex items-center gap-1 transition-all uppercase font-mono font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* Selected Action Details Card Banner */}
      <div className="bg-[#0f172a]/40 p-5 border-b border-[#06b6d4]/15">
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#06b6d4] uppercase">
            Active Operation: {selectedZone.id.replace("-", "_").toUpperCase()}
          </span>
          <h3 className="font-display font-bold text-base text-[#f8fafc]">
            {selectedZone.title}
          </h3>
          <p className="text-xs text-[#94a3b8] font-sans leading-relaxed mt-0.5">
            {selectedZone.description}
          </p>
        </div>
      </div>

      {/* Render Dynamic Form Controls Based on Problem Type */}
      <div className="p-5 flex-grow flex flex-col gap-6 bg-[#1e293b]">

        {/* 1. CLOUD SEEDING PARAMETERS */}
        {selectedZone.problemType === "seeding" && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-[#f8fafc] text-xs font-mono border-b border-[#06b6d4]/15 pb-1 font-bold">
              <CloudRain className="w-4 h-4 text-[#06b6d4]" />
              <span>CLOUD CONDENSATION NUCLEI AGENTS</span>
            </div>

            {/* Slider 1: Silver Iodide Dosage */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#f8fafc]">
                <span className="font-medium">SILVER IODIDE (AgI) INJECTION DOSAGE</span>
                <span className="text-[#06b6d4] font-bold">{operationState.seedingRate} g/km³</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={operationState.seedingRate}
                onChange={(e) => onUpdateState({ seedingRate: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-[#0f172a] rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
              />
              <span className="text-[10px] text-[#94a3b8] font-mono">
                Adjust grain diameter index to target humidity zones between 55% - 85%.
              </span>
            </div>

            {/* Slider 2: Launch Vector Altitude FL */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#f8fafc]">
                <span className="font-medium">VECTOR FLIGHT ALTITUDE GRID</span>
                <span className="text-[#06b6d4] font-bold">FL {operationState.seedingAltitude}00 ({operationState.seedingAltitude * 100} ft)</span>
              </div>
              <input
                type="range"
                min="120"
                max="350"
                step="10"
                value={operationState.seedingAltitude}
                onChange={(e) => onUpdateState({ seedingAltitude: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-[#0f172a] rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
              />
              <span className="text-[10px] text-[#94a3b8] font-mono">
                Altitude should match maximum relative dewpoint layers.
              </span>
            </div>
          </div>
        )}

        {/* 2. CYCLONE PRESSURE MITIGATION */}
        {selectedZone.problemType === "mitigation" && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-[#f8fafc] text-xs font-mono border-b border-[#06b6d4]/15 pb-1 font-bold">
              <Wind className="w-4 h-4 text-[#06b6d4]" />
              <span>CONCENTRIC PRESSURE WAVE DISRUPTION</span>
            </div>

            {/* Slider 1: Thermal Cooling power */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#f8fafc]">
                <span className="font-medium">CRYOGENIC HEAT-ABSORPTION COEFFICIENT</span>
                <span className="text-[#06b6d4] font-bold">{operationState.coolingIntensity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={operationState.coolingIntensity}
                onChange={(e) => onUpdateState({ coolingIntensity: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-[#0f172a] rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
              />
              <span className="text-[10px] text-[#94a3b8] font-mono">
                Direct cooling reduces latent ocean thermals supplying kinetic energy of typhoon core.
              </span>
            </div>

            {/* Slider 2: Sonic Disruption */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#f8fafc]">
                <span className="font-medium">ULTRASONIC DISRUPTIVE VIBRATIONS</span>
                <span className="text-[#06b6d4] font-bold">{operationState.sonicFrequency} Hz</span>
              </div>
              <input
                type="range"
                min="12"
                max="75"
                step="1"
                value={operationState.sonicFrequency}
                onChange={(e) => onUpdateState({ sonicFrequency: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-[#0f172a] rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
              />
              <span className="text-[10px] text-[#94a3b8] font-mono">
                Resonant frequencies weaken the cohesion of severe convective bands.
              </span>
            </div>
          </div>
        )}

        {/* 3. LIGHTNING FIELD SUPPRESSION */}
        {selectedZone.problemType === "lightning" && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-[#f8fafc] text-xs font-mono border-b border-[#06b6d4]/15 pb-1 font-bold">
              <Zap className="w-4 h-4 text-[#06b6d4]" />
              <span>ELECTROSTATIC FIELD GROUND DISCHARGE</span>
            </div>

            {/* Slider 1: Electric Field Tension Grid */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#f8fafc]">
                <span className="font-medium">FIELD IONIZATION GROUND VOLTAGE GRID</span>
                <span className="text-[#06b6d4] font-bold">{operationState.fieldTension} MV/m</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={operationState.fieldTension}
                onChange={(e) => onUpdateState({ fieldTension: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-[#0f172a] rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
              />
              <span className="text-[10px] text-[#94a3b8] font-mono">
                Ion field arrays trigger safe controlled discharges before dangerous natural pathways build up.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="bg-[#0f172a] p-3 rounded-md border border-[#06b6d4]/15 text-[11px] font-mono text-[#f8fafc] flex flex-col gap-1">
                <span className="text-[#94a3b8] font-bold text-[9px] uppercase">Laser Channeling</span>
                <span className="font-medium text-[#67e8f9]">UV Ionization Activated</span>
              </div>
              <div className="bg-[#0f172a] p-3 rounded-md border border-[#06b6d4]/15 text-[11px] font-mono text-[#f8fafc] flex flex-col gap-1">
                <span className="text-[#94a3b8] font-bold text-[9px] uppercase">Alpine Suppression</span>
                <span className="font-medium text-[#67e8f9]">Acoustic Shield Aligned</span>
              </div>
            </div>
          </div>
        )}

        {/* 4. SOLAR RADIATION MANAGEMENT */}
        {selectedZone.problemType === "srm" && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-[#f8fafc] text-xs font-mono border-b border-[#06b6d4]/15 pb-1 font-bold">
              <Sun className="w-4 h-4 text-[#06b6d4]" />
              <span>ALBEDO ENHANCEMENT MANAGEMENT</span>
            </div>

            {/* Slider 1: Sulfate Aerosol Concentration */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#f8fafc]">
                <span className="font-medium">STRATOSPHERIC DISPERSAL UNIT RATE</span>
                <span className="text-[#06b6d4] font-bold">{operationState.aerosolConcentration} megatons/yr</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15.0"
                step="0.5"
                value={operationState.aerosolConcentration}
                onChange={(e) => onUpdateState({ aerosolConcentration: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-[#0f172a] rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
              />
              <span className="text-[10px] text-[#94a3b8] font-mono">
                Sulfate density directly correlates with solar light deflection indexes.
              </span>
            </div>

            {/* Slider 2: Target Albedo index */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#f8fafc]">
                <span className="font-medium">TARGET REFLECTION COEFFICIENT (ALBEDO)</span>
                <span className="text-[#06b6d4] font-bold">{operationState.targetAlbedo} index</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="0.45"
                step="0.01"
                value={operationState.targetAlbedo}
                onChange={(e) => onUpdateState({ targetAlbedo: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-[#0f172a] rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
              />
            </div>
          </div>
        )}

        {/* Main Action Execute Panel Trigger Button */}
        <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-[#06b6d4]/15">
          {/* Engineering engagement indicator logs */}
          {isEngaging && (
            <div className="bg-[#0f172a] p-3 rounded-md border border-[#06b6d4]/15 text-[11px] font-mono text-[#f8fafc] text-center animate-pulse flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#06b6d4] rounded-full animate-ping" />
              <span>{engagementLog}</span>
            </div>
          )}

          <button
            onClick={handleExecute}
            disabled={isEngaging}
            style={{ cursor: isEngaging ? "not-allowed" : "pointer" }}
            className={`w-full py-3.5 px-6 rounded-md font-display font-bold text-xs uppercase tracking-widest text-[#0f172a] transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${
              isEngaging
                ? "bg-[#334155] text-[#94a3b8] cursor-not-allowed"
                : "bg-[#06b6d4] hover:bg-[#67e8f9]"
            }`}
          >
            {isEngaging ? (
              <span>CALIBRATING ARRAYS...</span>
            ) : (
              <span>EXECUTE SHANGO INTERVENTION</span>
            )}
          </button>
        </div>

      </div>

      {/* Intervention Log History Footer Card */}
      <div className="bg-[#0f172a] border-t border-[#06b6d4]/15 p-4 rounded-b-md">
        <div className="flex items-center gap-1.5 mb-2">
          <CheckCircle className="w-3.5 h-3.5 text-[#06b6d4]" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f8fafc]">
            Meteorological Ledger Logs
          </span>
        </div>
        <div className="flex flex-col gap-1.5 max-h-24 overflow-y-auto">
          {selectedZone.interventionLog.map((log, idx) => (
            <div key={idx} className="font-mono text-[10px] leading-relaxed text-[#94a3b8] border-l border-[#06b6d4] pl-2.5">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
