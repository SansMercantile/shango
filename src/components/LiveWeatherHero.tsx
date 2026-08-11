import React, { useEffect, useState } from 'react';
import { getDayPhase } from '../lib/sun-position';
import { getSkyGradientStops } from '../lib/sky-gradient';
import { fetchWeather, LiveWeather } from '../lib/weather';
import { WeatherParticles } from './WeatherParticles';

const FALLBACK_COORDS = { lat: -26.2041, lng: 28.0473 }; // Johannesburg

/**
 * The genuinely live part of the landing page — real weather and real sun position
 * for the visitor's location, rendered as the hero section's actual background
 * (not decorative canvas lines). This is what makes Shango's own site "live the
 * weather it sells," same concept as the Nexus site's system-theme sky, but always-on
 * here since weather IS this site's subject, not an optional theme.
 */
export function LiveWeatherHero({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState(FALLBACK_COORDS);
  const [weather, setWeather] = useState<LiveWeather | null>(null);
  const [gradient, setGradient] = useState('linear-gradient(to bottom, #020617, #0a0e27, #0f172a)');

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
      { timeout: 10000, maximumAge: 30 * 60 * 1000 }
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetchWeather(coords.lat, coords.lng).then((w) => !cancelled && setWeather(w)).catch(() => {});
    };
    load();
    const interval = setInterval(load, 10 * 60 * 1000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [coords]);

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
    <div className="relative" style={{ background: gradient, transition: 'background 3s linear' }}>
      {weather && <WeatherParticles condition={weather.condition} intensity={weather.intensity} />}
      {children}
    </div>
  );
}
