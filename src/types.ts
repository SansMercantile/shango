export type InterventionType = "seeding" | "mitigation" | "lightning" | "srm";

export interface Zone {
  id: string;
  name: string;
  region: string;
  coordinates: { x: number; y: number; lat: string; lng: string };
  problemType: InterventionType;
  title: string;
  description: string;
  parameters: {
    temperature: number;      // in °C
    pressure: number;         // in millibars (mb)
    humidity: number;         // percentage (%)
    albedo: number;           // albedo coefficient (0.0 - 1.0)
    windSpeed: number;        // in knots (kts)
    windDirection: string;    // Cardinal directions
    electrostaticLoad: number;// percentage (%)
    visibility: number;       // in kilometers (km)
  };
  interventionLog: string[];
}

export interface OperationState {
  seedingRate: number;        // grams/km3
  seedingAltitude: number;    // FL altitude feet
  isSeedingActive: boolean;
  
  coolingIntensity: number;   // 0-100%
  sonicFrequency: number;     // Hz
  isCoolerActive: boolean;
  
  fieldTension: number;       // MV/m
  isIonizerActive: boolean;
  isLaserPulsing: boolean;
  
  aerosolConcentration: number;// units
  targetAlbedo: number;       // index
  isSrmActive: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}
