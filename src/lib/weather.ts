/**
 * Live weather for the Shango site's theme. Uses Open-Meteo directly for now (free,
 * no API key, real data) since Shango's own backend doesn't have a real weather
 * endpoint yet — its current API is cluster-sync scaffolding only. Swapping to a real
 * Shango-native endpoint later is a one-function change: replace the body of
 * fetchWeather() with a call to Shango's own /api/v1/weather, same return shape.
 */

export type WeatherCondition =
  | 'clear'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm';

export interface LiveWeather {
  condition: WeatherCondition;
  /** 0 (barely) to 1 (heaviest) — drives particle density/intensity */
  intensity: number;
  temperatureC: number;
  isDay: boolean;
}

// WMO weather codes -> our condition buckets (https://open-meteo.com/en/docs, "weathercode")
function mapWmoCode(code: number): WeatherCondition {
  if (code === 0 || code === 1) return 'clear';
  if (code === 2 || code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow';
  if (code >= 95) return 'thunderstorm';
  return 'clear';
}

// Rough normalization against real-world "heavy" thresholds so particle density
// scales meaningfully rather than being on/off.
function computeIntensity(condition: WeatherCondition, precipitationMm: number, snowfallCm: number): number {
  if (condition === 'snow') return Math.min(1, snowfallCm / 2); // 2cm/hr ~= heavy snow
  if (condition === 'rain' || condition === 'thunderstorm' || condition === 'drizzle') {
    return Math.min(1, precipitationMm / 10); // 10mm/hr ~= heavy rain
  }
  if (condition === 'fog') return 0.6;
  if (condition === 'cloudy') return 0.4;
  return 0.15; // clear
}

const FALLBACK_COORDS = { lat: -26.2041, lng: 28.0473 }; // Johannesburg — company HQ region

export async function fetchWeather(lat?: number, lng?: number): Promise<LiveWeather> {
  const { lat: la, lng: lo } = lat != null && lng != null ? { lat, lng } : FALLBACK_COORDS;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${la}&longitude=${lo}&current=temperature_2m,weathercode,is_day,precipitation,snowfall`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`weather_fetch_failed_${res.status}`);
  const data = await res.json();
  const c = data.current;

  const condition = mapWmoCode(c.weathercode);
  return {
    condition,
    intensity: computeIntensity(condition, c.precipitation ?? 0, c.snowfall ?? 0),
    temperatureC: c.temperature_2m,
    isDay: c.is_day === 1,
  };
}
