import React, { useState } from "react";
import { 
  Radio, Globe, ShieldAlert, Wind, BarChart3, Zap, 
  RefreshCw, Waves, Flame, Eye, Search, Grid, Activity, 
  CheckCircle2, AlertTriangle, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Full 250 agent list mapped by sector domain
export const DOMAINS_DATA: Record<string, { label: string; description: string; icon: any; color: string; agents: string[]; isNew?: boolean }> = {
  forecast: {
    label: "Forecast Range",
    description: "Multi-horizon atmospheric forecasting modeling across macro and local cells.",
    icon: Radio,
    color: "cyan",
    agents: [
      "storm_forecast_agent", "wind_pattern_agent", "temperature_model_agent", 
      "precipitation_agent", "regional_outlook_agent", "hurricane_trajectory_agent", 
      "tornado_prediction_agent", "snowfall_forecast_agent", "fog_prediction_agent", 
      "hail_forecast_agent", "ice_storm_agent", "monsoon_forecast_agent", 
      "drought_forecast_agent", "seasonal_outlook_agent", "ensemble_model_agent", 
      "mesoscale_convective_agent", "atmospheric_river_agent", "jet_stream_analysis_agent", 
      "radar_interpretation_agent", "satellite_forecast_agent", "probabilistic_forecast_agent", 
      "nowcasting_agent", "marine_forecast_agent", "aviation_forecast_agent", "wildfire_weather_agent"
    ]
  },
  climate: {
    label: "Climate Scale",
    description: "Decadal trends, albedo loops, and localized heatwave monitoring parameters.",
    icon: Globe,
    color: "teal",
    agents: [
      "climate_trend_agent", "drought_risk_agent", "heatwave_watch_agent", 
      "climate_impact_agent", "long_range_projection_agent", "carbon_cycle_agent", 
      "arctic_monitoring_agent", "sea_level_rise_agent", "permafrost_agent", 
      "ocean_heat_content_agent", "albedo_feedback_agent", "el_nino_agent", 
      "la_nina_agent", "climate_tipping_point_agent", "global_temperature_agent", 
      "paleoclimate_agent", "climate_attribution_agent", "urban_heat_island_agent", 
      "deforestation_impact_agent", "glacier_retreat_agent", "climate_model_bias_agent", 
      "extreme_event_frequency_agent", "regional_climate_agent", "climate_scenario_agent", "climate_justice_agent"
    ]
  },
  disasters: {
    label: "Disaster Alerting",
    description: "Early-warning alerts and response vectors for catastrophic atmospheric events.",
    icon: ShieldAlert,
    color: "red",
    agents: [
      "disaster_alert_agent", "flood_warning_agent", "cyclone_watch_agent", 
      "lightning_risk_agent", "response_coordination_agent", "earthquake_weather_agent", 
      "tsunami_weather_agent", "landslide_risk_agent", "storm_surge_agent", 
      "volcanic_ash_agent", "dust_storm_agent", "blizzard_watch_agent", 
      "avalanche_risk_agent", "debris_flow_agent", "extreme_heat_response_agent", 
      "cold_snap_response_agent", "multi_hazard_agent", "early_warning_agent", 
      "evacuation_routing_agent", "damage_assessment_agent", "search_rescue_weather_agent", 
      "post_disaster_forecast_agent", "infrastructure_impact_agent", "community_alert_agent", "recovery_planning_agent"
    ]
  },
  atmosphere: {
    label: "Atmosphere Elements",
    description: "Tracks boundary layers, ozone density, and stratospheric chemical composition.",
    icon: Wind,
    color: "indigo",
    agents: [
      "atmospheric_pressure_agent", "air_quality_agent", "humidity_agent", 
      "upper_air_agent", "radiation_balance_agent", "boundary_layer_agent", 
      "stratospheric_ozone_agent", "aerosol_agent", "cloud_formation_agent", 
      "convection_agent", "tropopause_agent", "wind_shear_agent", 
      "turbulence_agent", "atmospheric_composition_agent", "greenhouse_gas_agent", 
      "particulate_matter_agent", "ion_layer_agent", "magnetosphere_weather_agent", 
      "solar_wind_agent", "cosmic_ray_agent", "atmospheric_electric_agent", 
      "infrasound_agent", "stratospheric_warming_agent", "polar_vortex_agent", "atmospheric_wave_agent"
    ]
  },
  analytics: {
    label: "Analytics Hub",
    description: "Statistical downscaling, ML bias-correction, and telemetry fusion pipelines.",
    icon: BarChart3,
    color: "purple",
    agents: [
      "weather_data_fusion_agent", "model_accuracy_agent", "forecast_explainer_agent", 
      "anomaly_analytics_agent", "decision_support_agent", "statistical_downscaling_agent", 
      "bias_correction_agent", "data_assimilation_agent", "uncertainty_quantification_agent", 
      "sensitivity_analysis_agent", "pattern_recognition_agent", "machine_learning_forecast_agent", 
      "neutral_weather_agent", "ensemble_postprocess_agent", "verification_agent", 
      "skill_score_agent", "climatology_baseline_agent", "teleconnection_agent", 
      "natural_language_report_agent", "visualization_agent", "api_analytics_agent", 
      "user_feedback_agent", "model_comparison_agent", "real_time_qa_agent", "data_pipeline_agent"
    ]
  },
  manipulation: {
    label: "Weather Control",
    description: "Tactical intervention nodes commanding seeding, laser guides and SRM veils.",
    icon: Zap,
    color: "cyan",
    agents: [
      "cloud_seeding_agent", "precipitation_enhancement_agent", "fog_dispersal_agent", 
      "hail_suppression_agent", "hurricane_mitigation_agent", "drought_intervention_agent", 
      "rainfall_induction_agent", "atmospheric_ionization_agent", "temperature_modulation_agent", 
      "wind_pattern_modification_agent", "lightning_suppression_agent", "snow_generation_agent", 
      "microclimate_engineering_agent", "urban_cooling_agent", "frost_prevention_agent", 
      "storm_dissipation_agent", "weather_window_creation_agent", "aerosol_injection_agent", 
      "solar_radiation_management_agent", "localized_rainfall_agent", "atmospheric_heating_agent", 
      "condensation_nuclei_agent", "jet_stream_steering_agent", "frontal_system_control_agent", "quantum_weather_agent"
    ],
    isNew: true
  },
  renewable: {
    label: "Renewable Grids",
    description: "Solar irradiance curves and offshore turbine efficiency alignment parameters.",
    icon: RefreshCw,
    color: "emerald",
    agents: [
      "wind_optimizer_agent", "geothermal_manager_agent", "ocean_energy_agent", 
      "hybrid_system_agent", "emergent_research_agent", "solar_irradiance_agent", 
      "wind_farm_layout_agent", "turbine_health_agent", "power_curve_agent", 
      "curtailment_agent", "battery_storage_agent", "grid_injection_agent", 
      "ppa_optimization_agent", "renewable_forecast_agent", "capacity_factor_agent", 
      "wake_effect_agent", "offshore_wind_agent", "tidal_current_agent", 
      "wave_energy_agent", "osmotic_energy_agent", "hydrogen_production_agent", 
      "demand_response_agent", "microgrid_agent", "virtual_power_plant_agent", "energy_market_agent"
    ]
  },
  oceanic: {
    label: "Ocean Systems",
    description: "Buoy node matrices tracking sea-surface warmth and deep thermoclines.",
    icon: Waves,
    color: "blue",
    agents: [
      "sea_surface_temperature_agent", "ocean_current_agent", "salinity_agent", 
      "thermocline_agent", "upwelling_agent", "marine_heatwave_agent", 
      "coral_bleaching_agent", "cyclogenesis_ocean_agent", "deep_ocean_agent", 
      "ocean_acidification_agent", "phytoplankton_agent", "fishery_weather_agent", 
      "shipping_route_agent", "port_weather_agent", "coastal_erosion_agent", 
      "ocean_forecast_agent", "buoy_network_agent", "argo_float_agent", 
      "ocean_model_agent", "mixed_layer_agent"
    ]
  },
  geothermal: {
    label: "Geothermal Reservoirs",
    description: "Subsurface seismic monitoring and thermal-well expansion vectors.",
    icon: Flame,
    color: "orange",
    agents: [
      "geothermal_reservoir_agent", "heat_flux_agent", "seismic_monitoring_agent", 
      "hydrothermal_agent", "magma_chamber_agent", "groundwater_thermal_agent", 
      "geothermal_drilling_agent", "binary_cycle_agent", "enhanced_geothermal_agent", 
      "geothermal_mapping_agent", "subsurface_temperature_agent", "geothermal_chemistry_agent", 
      "scaling_prevention_agent", "corrosion_agent", "geothermal_efficiency_agent", 
      "volcano_weather_agent", "geothermal_forecast_agent", "resource_assessment_agent", 
      "geothermal_grid_agent", "direct_use_agent"
    ]
  },
  monitoring: {
    label: "Station Networks",
    description: "Telemetry integration loops from IoT feeds, LiDAR and satellite imagery.",
    icon: Eye,
    color: "indigo",
    agents: [
      "station_network_agent", "satellite_imagery_agent", "radar_network_agent", 
      "lidar_agent", "radiosonde_agent", "drone_weather_agent", "iot_sensor_agent", 
      "crowdsourced_obs_agent", "data_quality_control_agent", "gap_filling_agent", 
      "reanalysis_agent", "climate_archive_agent", "environmental_compliance_agent", 
      "air_quality_monitoring_agent", "water_quality_agent", "biodiversity_weather_agent", 
      "agriculture_monitoring_agent", "urban_monitoring_agent", "infrastructure_monitor_agent", 
      "health_weather_agent", "pollen_agent", "uv_index_agent", "space_weather_monitor_agent", 
      "global_coverage_agent", "monitoring_dashboard_agent"
    ]
  }
};

export default function AgentDirectory() {
  const [selectedDomain, setSelectedDomain] = useState<string>("manipulation");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeDomainInfo = DOMAINS_DATA[selectedDomain] || DOMAINS_DATA.manipulation;
  const ActiveIcon = activeDomainInfo.icon;

  // Search filter across all domains or active domain
  const searchResults = Object.entries(DOMAINS_DATA).flatMap(([key, domain]) => {
    return domain.agents.map(a => ({
      name: a,
      domainKey: key,
      domainLabel: domain.label,
      description: `Active ${domain.label.toLowerCase()} sub-agent. Fully synchronized with core grid.`
    }));
  }).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.domainLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      {/* LEFT SECTION: 10 SATELLITE SECTORS AND GENERAL DIRECTORY STATUS */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        
        {/* Sector Database Header Stats */}
        <div className="bg-[#1e293b]/60 border border-[#06b6d4]/15 rounded-md p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-[#06b6d4] animate-pulse" />
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#f8fafc]">
              PILOT CLOUD REGISTRY
            </h3>
          </div>
          <p className="text-xs font-mono text-[#94a3b8] leading-relaxed mb-4">
            Manage, verify and command the total array of 250 specialized meteorologist agents calibrated for Sans Alliance systems.
          </p>
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="bg-[#0f172a] p-3 rounded border border-[#06b6d4]/10">
              <span className="text-slate-500 text-[10px] block font-bold">TOTAL AGENTS</span>
              <span className="text-xl font-bold text-[#67e8f9]">250 ONLINE</span>
            </div>
            <div className="bg-[#0f172a] p-3 rounded border border-[#06b6d4]/10">
              <span className="text-slate-500 text-[10px] block font-bold">GRID UPTIME</span>
              <span className="text-xl font-bold text-emerald-400">99.85%</span>
            </div>
          </div>
        </div>

        {/* Dynamic List Search */}
        <div className="bg-[#1e293b]/60 border border-[#06b6d4]/15 rounded-md p-4">
          <div className="relative mb-3">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </span>
            <input
              type="text"
              placeholder="Search 250 meteorologist sub-agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0f172a] border border-[#06b6d4]/15 focus:border-[#06b6d4] rounded text-xs font-mono text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-[#06b6d4]/10 pb-2 mb-2">
            <span>ATMOSPHERIC SECTORS</span>
            <span>AGENTS</span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-1">
            {Object.entries(DOMAINS_DATA).map(([key, dom]) => {
              const IconComp = dom.icon;
              const isSelected = selectedDomain === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedDomain(key);
                    setSearchQuery(""); // Clear search when switching tabs
                  }}
                  className={`flex items-center justify-between p-2.5 rounded border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#06b6d4]/10 border-[#06b6d4] text-[#67e8f9] shadow-inner"
                      : "bg-[#0f172a]/40 border-[#06b6d4]/10 text-slate-400 hover:border-[#06b6d4]/25 hover:text-[#f8fafc]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${isSelected ? "text-[#67e8f9]" : "text-slate-500"}`} />
                    <span className="text-[11px] font-mono tracking-wider uppercase font-bold">{dom.label}</span>
                    {dom.isNew && (
                      <span className="text-[7px] bg-[#f97316] text-[#0f172a] px-1 rounded font-bold uppercase tracking-wider">NEW</span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#1e293b] px-1.5 py-0.5 rounded text-white border border-[#2e3e57]">
                    {dom.agents.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* RIGHT SECTION: ACTIVE PILOT SECTOR DIRECTORY LIST */}
      <div className="lg:col-span-8">
        <div className="bg-[#1e293b]/60 border border-[#06b6d4]/15 rounded-md p-6 flex flex-col gap-5 h-full min-h-[500px]">
          
          {searchQuery ? (
            // Search Results Mode
            <>
              <div className="flex items-center justify-between border-b border-[#06b6d4]/15 pb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#67e8f9]" />
                  <h3 className="font-display font-black text-xs uppercase tracking-widest text-white">
                    SEARCH RESULTS FOR "{searchQuery.toUpperCase()}"
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-[#06b6d4]/10 text-[#67e8f9] px-2 py-0.5 rounded font-black border border-[#06b6d4]/20 uppercase">
                  {searchResults.length} NODES FOUND
                </span>
              </div>

              <div className="flex-grow max-h-[440px] overflow-y-auto pr-1">
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {searchResults.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-[#0f172a] border border-[#06b6d4]/10 hover:border-[#06b6d4]/25 rounded-md transition-all flex flex-col gap-1 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-mono text-xs font-bold font-mono tracking-wide">
                            {item.name.replace(/_/g, " ")}
                          </span>
                          <span className="text-[8px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded tracking-widest uppercase">
                            {item.domainLabel}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-500 font-mono gap-2">
                    <AlertTriangle className="w-8 h-8 text-[#f97316] animate-bounce" />
                    <span className="text-xs">NO SPECIALIZED SUB-AGENTS FOUND IN REGISTER</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Standard Sector Directory Mode
            <>
              <div className="flex items-center justify-between border-b border-[#06b6d4]/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center">
                    <ActiveIcon className="w-5 h-5 text-[#67e8f9] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xs uppercase tracking-widest text-[#f8fafc]">
                      {activeDomainInfo.label.toUpperCase()} SECTOR AGENTS
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {activeDomainInfo.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  ONLINE
                </div>
              </div>

              <div className="flex-grow max-h-[400px] overflow-y-auto pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {activeDomainInfo.agents.map((agent, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-[#0f172a] border border-[#06b6d4]/10 hover:border-[#67e8f9]/40 hover:-translate-y-0.5 transition-all rounded-md flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]/30 flex items-center justify-center font-bold text-[7px] text-[#67e8f9]">
                          •
                        </div>
                        <span className="text-white font-mono text-[11px] font-bold tracking-wide">
                          {agent.replace(/_/g, " ")}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 block">
                        ID: SHN26-{idx + 101} · COMPLIANT
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#0f172a] border border-[#06b6d4]/10 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="text-[#94a3b8] leading-relaxed">
                  <span className="text-white font-bold">WMO GEOPROTOCOL:</span> All {activeDomainInfo.agents.length} telemetry loops in sector {selectedDomain.toUpperCase()} comply with allied regulatory covenants.
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="px-2.5 py-1 bg-slate-800 text-[#94a3b8] border border-slate-700 rounded text-[10px] font-bold">SYSTEMS READY</span>
                </div>
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  );
}
