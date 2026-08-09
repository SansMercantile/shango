import { Zone } from "./types";

export const INITIAL_ZONES: Zone[] = [
  {
    id: "zone-a",
    name: "Great Plains",
    region: "North American Agricultural Belt",
    coordinates: { x: 30, y: 35, lat: "39.5° N", lng: "-98.3° W" },
    problemType: "seeding",
    title: "Cumulus Convective Cloud Seeding Ops",
    description: "Severe vegetative drought. High high-altitude humidity but insufficient condensation nuclei to trigger local precipitation.",
    parameters: {
      temperature: 34.2,
      pressure: 1011.5,
      humidity: 58.0,
      albedo: 0.22,
      windSpeed: 14,
      windDirection: "SW",
      electrostaticLoad: 12.0,
      visibility: 16.0
    },
    interventionLog: [
      "08:00 UTC: High moisture column detected.",
      "10:15 UTC: Seeding drones prepared at base.",
      "Active state pending deployment."
    ]
  },
  {
    id: "zone-b",
    name: "Mariana Basin",
    region: "Pacific Typhoon Alley",
    coordinates: { x: 78, y: 55, lat: "14.2° N", lng: "145.3° E" },
    problemType: "mitigation",
    title: "Active Cyclone Pressure Mitigation",
    description: "Forming typhoon 'MALAS' carrying peak winds of 135 kts. Central core pressure is dropping sharply, feeding on thermal ocean layers.",
    parameters: {
      temperature: 28.5,
      pressure: 938.0,
      humidity: 95.0,
      albedo: 0.12,
      windSpeed: 135,
      windDirection: "WNW",
      electrostaticLoad: 78.0,
      visibility: 1.5
    },
    interventionLog: [
      "12:44 UTC: Pressure drops below 940mb.",
      "14:10 UTC: Deep cryogenic cooling vectors designated.",
      "Sonic wave generators aligned."
    ]
  },
  {
    id: "zone-c",
    name: "Singapore Strait",
    region: "Malacca Shipping Access Grid",
    coordinates: { x: 68, y: 72, lat: "1.2° N", lng: "103.8° E" },
    problemType: "seeding", // Warm-fog condensation (using temperature modulation / fog dispersal)
    title: "Thermal Evaporation & Fog Dispersal",
    description: "Advection fog density critical. Horizontal visibility is restricted below 400m, delaying global transit tankers.",
    parameters: {
      temperature: 26.1,
      pressure: 1009.2,
      humidity: 99.0,
      albedo: 0.18,
      windSpeed: 3,
      windDirection: "Calm",
      electrostaticLoad: 5.0,
      visibility: 0.3
    },
    interventionLog: [
      "Visibility indices dropped below safety lines.",
      "Dispersal fan rows preheated to 45°C."
    ]
  },
  {
    id: "zone-d",
    name: "Saharan Corridor",
    region: "Albedo Deflection Belt",
    coordinates: { x: 48, y: 50, lat: "22.0° N", lng: "11.5° E" },
    problemType: "srm",
    title: "Solar Radiation Albedo Enhancement",
    description: "High thermal absorption corridor. Deployment target for Stratospheric Aerosol Injection (SAI) to reflect solar irradiance.",
    parameters: {
      temperature: 46.8,
      pressure: 1006.4,
      humidity: 8.0,
      albedo: 0.31,
      windSpeed: 22,
      windDirection: "ENE",
      electrostaticLoad: 28.0,
      visibility: 25.0
    },
    interventionLog: [
      "Coordinates checked for stratospheric jet stream alignment.",
      "Aerosol canisters loaded with reflectants."
    ]
  },
  {
    id: "zone-e",
    name: "Valais Valley",
    region: "Swiss Alpine Vineyard Reserves",
    coordinates: { x: 50, y: 31, lat: "46.2° N", lng: "7.4° E" },
    problemType: "lightning",
    title: "Hail Suppression & Ground Charge Grounding",
    description: "Over-convective cells generating high electrical potential (+190 kV/m). Imminent lightning bursts and crop-shattering hail forming.",
    parameters: {
      temperature: 17.5,
      pressure: 1005.0,
      humidity: 85.0,
      albedo: 0.25,
      windSpeed: 19,
      windDirection: "N",
      electrostaticLoad: 92.0,
      visibility: 8.0
    },
    interventionLog: [
      "Alpine field potential monitors indicate intense positive charging.",
      "Laser guides configured for discharge ionization channel."
    ]
  }
];
