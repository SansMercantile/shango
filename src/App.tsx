import React, { useEffect, useState } from 'react';
import { getDayPhase } from './lib/sun-position';
import { getSkyGradientStops } from './lib/sky-gradient';
import { fetchWeather, LiveWeather } from './lib/weather';
import { WeatherParticles } from './components/WeatherParticles';

const FALLBACK_COORDS = { lat: -26.2041, lng: 28.0473 }; // Johannesburg

const CONDITION_LABEL: Record<LiveWeather['condition'], string> = {
  clear: 'Clear',
  cloudy: 'Cloudy',
  fog: 'Foggy',
  drizzle: 'Drizzling',
  rain: 'Raining',
  snow: 'Snowing',
  thunderstorm: 'Thunderstorm',
};

export default function App() {
  const [coords, setCoords] = useState(FALLBACK_COORDS);
  const [weather, setWeather] = useState<LiveWeather | null>(null);
  const [gradient, setGradient] = useState('linear-gradient(to bottom, #020617, #0a0e27, #0f172a)');

  // Geolocation once on load; falls back silently to Johannesburg (company HQ region)
  // if denied or unavailable — the live theme still works, just not personalized.
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { timeout: 10000, maximumAge: 30 * 60 * 1000 }
    );
  }, []);

  // Real weather, refreshed periodically — Open-Meteo for now (see lib/weather.ts for
  // the note on swapping to Shango's own backend endpoint once it exists).
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetchWeather(coords.lat, coords.lng)
        .then((w) => !cancelled && setWeather(w))
        .catch(() => {}); // keep last-known weather on a transient failure
    };
    load();
    const interval = setInterval(load, 10 * 60 * 1000); // Open-Meteo updates hourly; 10min is plenty
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [coords]);

  // Sky gradient, blended by real sun position + current weather condition, live-updated every minute.
  useEffect(() => {
    const update = () => {
      const { phase } = getDayPhase(new Date(), coords.lat, coords.lng);
      const [top, mid, bottom] = getSkyGradientStops(phase, weather?.condition ?? 'clear');
      setGradient(`linear-gradient(to bottom, ${top}, ${mid}, ${bottom})`);
    };
    update();
    const interval = setInterval(update, 60 * 1000);
    return () => clearInterval(interval);
  }, [coords, weather?.condition]);

  return (
    <div
      className="min-h-screen w-full transition-[background] duration-[3000ms] ease-linear relative overflow-hidden"
      style={{ background: gradient }}
    >
      {weather && <WeatherParticles condition={weather.condition} intensity={weather.intensity} />}

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg tracking-tight">
          SHANGO
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/90 drop-shadow max-w-xl">
          Climate, Weather &amp; Renewables Intelligence
        </p>

        {weather && (
          <div className="mt-10 flex items-center gap-4 backdrop-blur-md bg-black/20 border border-white/20 rounded-full px-6 py-3">
            <span className="text-white font-semibold">{CONDITION_LABEL[weather.condition]}</span>
            <span className="text-white/70">·</span>
            <span className="text-white/90">{Math.round(weather.temperatureC)}°C</span>
          </div>
        )}

        <p className="mt-6 text-sm text-white/60 max-w-md">
          The sky and weather above reflect real, live conditions at your location, right now.
        </p>
      </div>
    </div>
  );
}

