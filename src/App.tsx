import { useState } from "react";
import { Zone, OperationState, InterventionType } from "./types";
import { INITIAL_ZONES } from "./data";
import Header from "./components/Header";
import CommandMap from "./components/CommandMap";
import InterventionPanel from "./components/InterventionPanel";
import AIAdvisor from "./components/AIAdvisor";
import OnboardingWizard from "./components/OnboardingWizard";
import PredictiveEngine from "./components/PredictiveEngine";
import OperatorProfile from "./components/OperatorProfile";
import AgentDirectory from "./components/AgentDirectory";
import LandingPage from "./components/LandingPage";
import { CloudRain, Wind, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isAppLaunched, setIsAppLaunched] = useState<boolean>(false);
  const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);
  const [selectedZoneId, setSelectedZoneId] = useState<string>("zone-a");
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  
  // Custom interactive tracking states
  const [operationState, setOperationState] = useState<OperationState>({
    seedingRate: 25,
    seedingAltitude: 240, // Flight Level 240
    isSeedingActive: false,
    
    coolingIntensity: 50,
    sonicFrequency: 30, // 30Hz resonance
    isCoolerActive: false,
    
    fieldTension: 3.5, // 3.5 MV/m
    isIonizerActive: false,
    isLaserPulsing: false,
    
    aerosolConcentration: 4.5,
    targetAlbedo: 0.35,
    isSrmActive: false,
  });

  // Action success banner tracking
  const [successBanner, setSuccessBanner] = useState<{
    show: boolean;
    title: string;
    description: string;
    badgeColor: string;
  } | null>(null);

  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  const handleUpdateOperationState = (newState: Partial<OperationState>) => {
    setOperationState((prev) => ({ ...prev, ...newState }));
  };

  const handleExecuteAction = (type: InterventionType) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let updatedLogLine = "";
    let bannerTitle = "";
    let bannerDesc = "";
    let bannerColor = "emerald";

    setZones((prevZones) =>
      prevZones.map((z) => {
        if (z.id !== selectedZoneId) return z;

        const updatedParams = { ...z.parameters };

        if (type === "seeding") {
          handleUpdateOperationState({ isSeedingActive: true });
          updatedParams.humidity = Math.min(updatedParams.humidity + 18, 95);
          updatedParams.temperature = Math.max(updatedParams.temperature - 1.8, 16);
          updatedParams.visibility = Math.min(updatedParams.visibility + 4, 20);
          
          updatedLogLine = `${timeStr} UTC: Uncrewed Seeding Vectors dispatched. Silver Iodide dispersing at ${operationState.seedingRate} g/km³ density at FL ${operationState.seedingAltitude}00. Precipitation boost of +22% estimated.`;
          bannerTitle = `CLOUD SEEDING ACTIVATED`;
          bannerDesc = `Meteorological flight units successfully dispersed core nuclei. Local parameters adjusted.`;
          bannerColor = "emerald";
        } 
        else if (type === "mitigation") {
          handleUpdateOperationState({ isCoolerActive: true });
          updatedParams.windSpeed = Math.max(updatedParams.windSpeed - 47, 50);
          updatedParams.pressure = Math.min(updatedParams.pressure + 24, 1000);
          updatedParams.temperature = Math.max(updatedParams.temperature - 2.5, 20);
          
          updatedLogLine = `${timeStr} UTC: Thermoelectric ocean absorbers running at ${operationState.coolingIntensity}%. Sonic generator transmitting cohesive resonance at ${operationState.sonicFrequency} Hz. Wind velocity decayed.`;
          bannerTitle = `STORM MITIGATION DEPLOYED`;
          bannerDesc = `Thermo-cooling arrays and deep sonic wave generators deployed. Typhoon threat downgraded.`;
          bannerColor = "cyan";
        } 
        else if (type === "lightning") {
          handleUpdateOperationState({ isLaserPulsing: true, isIonizerActive: true });
          updatedParams.electrostaticLoad = 4.0;
          updatedParams.visibility = Math.min(updatedParams.visibility + 3, 12);
          
          updatedLogLine = `${timeStr} UTC: Field Ionizers active at ${operationState.fieldTension} MV/m tension boundaries. Ultraviolet guide lasers initiated. Safe ground-grid discharge complete.`;
          bannerTitle = `ELECTROSTATIC DISCHARGE COMPLETE`;
          bannerDesc = `UV laser guide paths directed potential alpine voltage safely into earth grids.`;
          bannerColor = "indigo";
        } 
        else if (type === "srm") {
          handleUpdateOperationState({ isSrmActive: true });
          updatedParams.albedo = Math.min(updatedParams.albedo + 0.11, 0.45);
          updatedParams.temperature = Math.max(updatedParams.temperature - 2.6, 20);
          
          updatedLogLine = `${timeStr} UTC: Stratospheric Aerosol Injection (SAI) rate calculated at ${operationState.aerosolConcentration} megatons/yr. Target albedo factor enhanced. Irradiance reflected.`;
          bannerTitle = `ALBEDO PROTECTION LAYER DEPLOYED`;
          bannerDesc = `Reflective aerosol shields established. Albedo index enhanced to protect localized coordinates from heat absorption.`;
          bannerColor = "amber";
        }

        return {
          ...z,
          parameters: updatedParams,
          interventionLog: [updatedLogLine, ...z.interventionLog],
        };
      })
    );

    setSuccessBanner({
      show: true,
      title: bannerTitle,
      description: bannerDesc,
      badgeColor: bannerColor,
    });

    // Automatically hide success alert card
    setTimeout(() => {
      setSuccessBanner(null);
    }, 6000);
  };

  const handleResetZone = () => {
    setOperationState({
      seedingRate: 25,
      seedingAltitude: 240,
      isSeedingActive: false,
      coolingIntensity: 50,
      sonicFrequency: 30,
      isCoolerActive: false,
      fieldTension: 3.5,
      isIonizerActive: false,
      isLaserPulsing: false,
      aerosolConcentration: 4.5,
      targetAlbedo: 0.35,
      isSrmActive: false,
    });

    setZones(INITIAL_ZONES);
    setSuccessBanner(null);
  };

  if (!isAppLaunched) {
    return <LandingPage onLaunchApp={() => setIsAppLaunched(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] flex flex-col font-sans selection:bg-[#06b6d4] selection:text-[#0f172a]">
      
      {/* SHANGO Dynamic Connected Header with Page State Control */}
      <Header 
        currentZoneName={activeZone.name} 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onExitToPortal={() => setIsAppLaunched(false)}
      />

      {/* Main Container */}
      <main className="flex-grow p-4 lg:p-6 max-w-[1700px] w-full mx-auto flex flex-col gap-6">
        
        {/* Urgent Action Success Banner Alerts Card */}
        <AnimatePresence>
          {successBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative p-5 rounded-md border flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#1e293b] border-[#06b6d4]/20 shadow-xl shadow-[#06b6d4]/5 transition-all duration-300"
            >
              <div className={`p-2.5 rounded-md ${
                successBanner.badgeColor === "emerald" 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : successBanner.badgeColor === "cyan"
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : successBanner.badgeColor === "indigo"
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}>
                {successBanner.badgeColor === "emerald" ? (
                  <CloudRain className="w-5 h-5 text-emerald-400" />
                ) : successBanner.badgeColor === "cyan" ? (
                  <Wind className="w-5 h-5 text-cyan-400" />
                ) : successBanner.badgeColor === "indigo" ? (
                  <Zap className="w-5 h-5 text-indigo-400" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                )}
              </div>
              
              <div className="flex-grow">
                <span className="text-[9px] font-mono tracking-widest text-[#06b6d4] block uppercase font-bold">COMMIT CONFIRMED</span>
                <h4 className="font-display font-bold text-sm text-[#f8fafc] uppercase tracking-wider">
                  {successBanner.title}
                </h4>
                <p className="text-xs text-[#94a3b8] mt-1">
                  {successBanner.description}
                </p>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSuccessBanner(null)}
                className="absolute top-4 right-4 text-[#94a3b8] hover:text-[#f8fafc] transition-colors text-xs font-mono font-bold uppercase tracking-wider bg-[#0f172a] px-2.5 py-1 border border-[#06b6d4]/15 rounded-md cursor-pointer"
              >
                [Dismiss]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Route View Switching */}
        <AnimatePresence mode="wait">
          {currentPage === "dashboard" && (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex flex-col gap-6"
            >
              {/* Global Bento Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* LEFT: Climate Map View */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
                  <div className="flex-grow h-full">
                    <CommandMap 
                      zones={zones} 
                      selectedZoneId={selectedZoneId}
                      onSelectZone={setSelectedZoneId}
                      isSeedingActive={operationState.isSeedingActive}
                      isCoolerActive={operationState.isCoolerActive}
                      isLaserPulsing={operationState.isLaserPulsing}
                      isSrmActive={operationState.isSrmActive}
                    />
                  </div>
                </div>

                {/* RIGHT: Active Mission Engineering Controls */}
                <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
                  <div className="h-full">
                    <InterventionPanel 
                      selectedZone={activeZone}
                      operationState={operationState}
                      onUpdateState={handleUpdateOperationState}
                      onExecuteAction={handleExecuteAction}
                      onResetZone={handleResetZone}
                    />
                  </div>
                </div>

              </div>

              {/* BOTTOM FULL-WIDTH MODULE: Embedded AI Advisory Assistant */}
              <div className="grid grid-cols-1 gap-6">
                <AIAdvisor 
                  selectedZone={activeZone}
                  operationState={operationState}
                />
              </div>
            </motion.div>
          )}

          {currentPage === "predictive" && (
            <motion.div
              key="predictive-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <PredictiveEngine />
            </motion.div>
          )}

          {currentPage === "agents" && (
            <motion.div
              key="agents-directory-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <AgentDirectory />
            </motion.div>
          )}

          {currentPage === "onboarding" && (
            <motion.div
              key="onboarding-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <OnboardingWizard />
            </motion.div>
          )}

          {currentPage === "profile" && (
            <motion.div
              key="profile-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <OperatorProfile />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer Branding Navigation */}
      <footer className="border-t border-[#06b6d4]/15 bg-[#0f172a] py-6 px-6 mt-auto">
        <div className="max-w-[1700px] mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#94a3b8]">
          <div>
            <span className="font-bold">SYSTEM STATE — ACTIVE RESPONSIVE MAP INTEGRATED</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://shango.sansmercantile.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#67e8f9] text-[#06b6d4] transition-all font-bold uppercase tracking-wider hover:underline"
            >
              Shango Portal
            </a>
            <span>•</span>
            <span className="uppercase font-bold">SHANGO WEATHER CO. © 2026. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
