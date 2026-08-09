import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, Radio, Cpu, ShieldAlert,
  Sliders, ArrowRight, CheckCircle, RefreshCw, AlertCircle 
} from "lucide-react";

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [pinging, setPinging] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);
  const [simLevel, setSimLevel] = useState(40);
  const [agLevel, setAgLevel] = useState(15);
  const [operatorName, setOperatorName] = useState("Command Officer Alpha");
  const [operatorRank, setOperatorRank] = useState("L4 Atmospheric Custodian");
  const [authCompleted, setAuthCompleted] = useState(false);

  const simulatePing = () => {
    setPinging(true);
    setPingSuccess(false);
    setTimeout(() => {
      setPinging(false);
      setPingSuccess(true);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-[#1e293b] border border-[#06b6d4]/15 rounded-md shadow-lg p-6 flex flex-col gap-6">
      
      {/* Onboarding Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#06b6d4]/15">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#06b6d4] font-bold uppercase block">
            RE-CALIBRATION & INTEGRATION WIZARD
          </span>
          <h2 className="font-display font-black text-xl text-[#f8fafc] tracking-tight mt-1">
            SHANGO Command Flight Commissioning
          </h2>
          <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
            Synchronize your command terminal, review global technologies, and authorize orbital payload controls.
          </p>
        </div>
        
        {/* Step Indicator Progress Bar */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <button
                onClick={() => {
                  if (step < currentStep || (step === 2 && pingSuccess) || (step === 3 && simLevel > 50)) {
                    setCurrentStep(step);
                  }
                }}
                className={`w-8 h-8 rounded-md font-mono text-xs flex items-center justify-center font-bold border transition-all ${
                  currentStep === step
                    ? "bg-[#06b6d4] border-[#0891b2] text-[#0f172a] shadow-md shadow-[#06b6d4]/20"
                    : currentStep > step
                    ? "bg-[#06b6d4]/10 border-[#06b6d4]/30 text-[#06b6d4]"
                    : "bg-[#0f172a] border-slate-700 text-slate-500 cursor-not-allowed"
                }`}
              >
                {step}
              </button>
              {step < 3 && (
                <div className={`w-8 h-0.5 ${currentStep > step ? "bg-[#06b6d4]" : "bg-slate-700"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slide Container with framer motion */}
      <div className="min-h-[280px] bg-[#0f172a]/45 rounded-md p-5 border border-[#06b6d4]/5">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#06b6d4]/10 border border-[#06b6d4]/25 rounded-md text-[#06b6d4]">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-[#f8fafc] uppercase tracking-wide">
                    Terminal Handshake & Satellite Alignment
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    First, verify connection to the Shango Atmospheric Sat-4 and orbital ion guides. This ensures microsecond accuracy on supersonic trigger coordinates.
                  </p>
                </div>
              </div>

              <div className="bg-[#0f172a] border border-[#06b6d4]/10 p-4 rounded-md flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${pingSuccess ? "bg-emerald-400 animate-ping" : pinging ? "bg-amber-400 animate-ping" : "bg-slate-600"}`} />
                  <span className="font-mono text-xs text-[#f8fafc] uppercase tracking-wider font-semibold">
                    {pingSuccess ? "Satellite Link Synchronized" : pinging ? "Broadcasting Ping Signals..." : "System Awaiting Connection Lock"}
                  </span>
                </div>

                <div className="max-w-md text-[11px] text-[#94a3b8] font-mono">
                  {pingSuccess 
                    ? "Sat-4 Orbiter confirmed coordinates: latitude boundaries matching 5 active regional stations with high accuracy telemetry grids."
                    : "Establish multi-spectral connection over secure high-altitude microwave relays before arming solar albedo or storm mitigation grids."
                  }
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={simulatePing}
                    disabled={pinging}
                    className="px-4 py-2 bg-[#06b6d4]/10 hover:bg-[#06b6d4]/20 border border-[#06b6d4]/30 text-[#06b6d4] font-mono text-xs rounded transition-all flex items-center gap-2 uppercase font-bold"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${pinging ? "animate-spin" : ""}`} />
                    {pinging ? "Calibrating Dish Grid..." : pingSuccess ? "Reconnect Uplink" : "Establish Link Lock"}
                  </button>
                </div>
              </div>

              {pingSuccess && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-md text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Success: Dynamic Satellite Array aligned correctly. Latitude and longitude grids locked. Go to Step 2.</span>
                </div>
              )}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#06b6d4]/10 border border-[#06b6d4]/25 rounded-md text-[#06b6d4]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-[#f8fafc] uppercase tracking-wide">
                    Technology & Theoretical Overview
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    Shango harnesses state-of-the-art atmospheric interventions. Practice adjusting silver iodide payload injection and ultrasonic disruption frequencies to align thermal indexes.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Seed Slider */}
                <div className="p-4 bg-[#0f172a] rounded-md border border-[#06b6d4]/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#f8fafc] uppercase tracking-wider font-semibold">Silver Iodide Density</span>
                    <span className="text-[#06b6d4] font-bold">{agLevel} g/km³</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={agLevel}
                    onChange={(e) => setAgLevel(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
                  />
                  <span className="text-[10px] text-[#94a3b8] font-mono leading-relaxed">
                    Target optimal nuclei binding density. High levels create instant condensation columns. Correct levels boost humidity by +25%.
                  </span>
                </div>

                {/* Sonic Frequency */}
                <div className="p-4 bg-[#0f172a] rounded-md border border-[#06b6d4]/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#f8fafc] uppercase tracking-wider font-semibold">Disruption Frequency</span>
                    <span className="text-[#06b6d4] font-bold">{simLevel} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={simLevel}
                    onChange={(e) => setSimLevel(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#06b6d4]"
                  />
                  <span className="text-[10px] text-[#94a3b8] font-mono leading-relaxed">
                    Acoustic resonant sound wave controls. Resonance must target convective cells between 25Hz and 65Hz to safely break condensation cohesion.
                  </span>
                </div>
              </div>

              {simLevel >= 25 && simLevel <= 65 ? (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-md text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive simulation calibrated: Cohesive acoustic dampeners positioned. Terminal ready for high-voltage operational commands.</span>
                </div>
              ) : (
                <div className="p-3 bg-cyan-950/20 border border-cyan-500/10 rounded-md text-[#67e8f9] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#06b6d4] shrink-0" />
                  <span>Calibration Guide: Adjust the disruption frequency slider into the 25Hz - 65Hz resonance band.</span>
                </div>
              )}
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#06b6d4]/10 border border-[#06b6d4]/25 rounded-md text-[#06b6d4]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-[#f8fafc] uppercase tracking-wide">
                    Command Credentials & Authorization
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    Establish your custom operator credentials to sign your interventions onto the immutable meteorological block ledger.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-[#94a3b8] uppercase font-bold">Officer Profile ID Name</label>
                  <input
                    type="text"
                    value={operatorName}
                    onChange={(e) => setOperatorName(e.target.value)}
                    className="bg-[#0f172a] border border-[#06b6d4]/15 rounded-md px-4 py-2 text-xs text-[#f8fafc] tracking-normal focus:outline-none focus:border-[#06b6d4]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-mono text-[#94a3b8] uppercase font-bold">Authorized Military Rank Title</label>
                  <input
                    type="text"
                    value={operatorRank}
                    onChange={(e) => setOperatorRank(e.target.value)}
                    className="bg-[#0f172a] border border-[#06b6d4]/15 rounded-md px-4 py-2 text-xs text-[#f8fafc] tracking-normal focus:outline-none focus:border-[#06b6d4]"
                  />
                </div>
              </div>

              <div className="bg-[#0f172a] p-4 rounded-md border border-[#06b6d4]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="font-mono text-xs text-[#f8fafc] font-bold">
                    RE-ROUTING METEOROLOGICAL BLOCK LEDGER CODES
                  </div>
                  <div className="font-mono text-[10px] text-[#94a3b8]">
                    ID: SHG-{operatorName.toUpperCase().replace(/\s+/g, "-")}-LOCKED-8X
                  </div>
                </div>
                <button
                  onClick={() => setAuthCompleted(true)}
                  className={`px-4 py-2 font-mono text-xs rounded transition-all font-bold uppercase ${
                    authCompleted 
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-not-allowed" 
                      : "bg-[#06b6d4] text-[#0f172a] hover:bg-[#67e8f9] border border-[#0891b2]"
                  }`}
                  disabled={authCompleted}
                >
                  {authCompleted ? "✓ Ledger Signed" : "Authorize Vector Keys"}
                </button>
              </div>

              {authCompleted && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-md text-emerald-300 text-xs flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    Terminal successfully locked! Go to dashboard commands to test full-scale micro-disrupt experiments.
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button controls */}
      <div className="flex items-center justify-between border-t border-[#06b6d4]/15 pt-4">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 font-mono text-xs rounded font-bold uppercase transition-all ${
            currentStep === 1
              ? "text-slate-600 border border-slate-800 cursor-not-allowed bg-[#0f172a]/20"
              : "text-[#06b6d4] border border-[#06b6d4]/30 bg-[#06b6d4]/5 hover:bg-[#06b6d4]/10"
          }`}
        >
          Previous Calibration
        </button>

        <div className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-widest">
          Node Status: <span className="text-[#06b6d4] font-bold">{pingSuccess ? "Synchronized" : "Offline Setup"}</span>
        </div>

        {currentStep < 3 ? (
          <button
            onClick={nextStep}
            disabled={currentStep === 1 && !pingSuccess}
            className={`px-4 py-2 font-mono text-xs rounded font-bold uppercase transition-all flex items-center gap-1.5 ${
              currentStep === 1 && !pingSuccess
                ? "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-[#06b6d4] border border-[#0891b2] text-[#0f172a] hover:bg-[#67e8f9]"
            }`}
          >
            <span>Next Phase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="text-emerald-400 font-mono text-xs font-bold uppercase animate-pulse">
            ✓ COMMISSIONING SECURED
          </div>
        )}
      </div>
    </div>
  );
}
