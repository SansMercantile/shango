import React, { useEffect, useRef } from 'react';
import type { WeatherCondition } from '../lib/weather';

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  drift: number;
}

interface Props {
  condition: WeatherCondition;
  /** 0-1, real measured intensity — controls particle count and speed */
  intensity: number;
}

/**
 * Canvas-based weather particles. Density and speed both scale with real intensity
 * (from Open-Meteo precipitation/snowfall) rather than being a fixed look per
 * condition — light snow should visibly differ from heavy snow, etc.
 */
export function WeatherParticles({ condition, intensity }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lightningRef = useRef({ flashUntil: 0, nextStrike: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isPrecip = condition === 'rain' || condition === 'snow' || condition === 'drizzle' || condition === 'thunderstorm';
    const count = isPrecip ? Math.round(40 + intensity * 260) : 0;
    const isSnow = condition === 'snow';

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: (isSnow ? 0.5 + Math.random() * 1.5 : 4 + Math.random() * 6) * (0.5 + intensity),
      size: isSnow ? 1.5 + Math.random() * 2.5 : 1 + Math.random(),
      drift: isSnow ? (Math.random() - 0.5) * 0.6 : (Math.random() - 0.5) * 0.2,
    }));

    lightningRef.current = { flashUntil: 0, nextStrike: performance.now() + 3000 + Math.random() * 4000 };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fog: a soft translucent overlay whose opacity tracks intensity, no discrete particles
      if (condition === 'fog') {
        ctx.fillStyle = `rgba(220, 220, 230, ${0.15 + intensity * 0.35})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Precipitation particles (rain/snow/drizzle, and rain during a thunderstorm)
      for (const p of particlesRef.current) {
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (isSnow) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
        } else {
          ctx.strokeStyle = 'rgba(180, 200, 255, 0.5)';
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.drift * 4, p.y - p.speed * 2.2);
          ctx.stroke();
        }
      }

      // Lightning: occasional full-screen flash, only during thunderstorm, frequency
      // loosely tied to intensity (heavier storms strike more often).
      if (condition === 'thunderstorm') {
        const l = lightningRef.current;
        if (now >= l.nextStrike) {
          l.flashUntil = now + 120;
          l.nextStrike = now + (2000 + Math.random() * 5000) / (0.3 + intensity);
        }
        if (now < l.flashUntil) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.35 * (l.flashUntil - now) / 120})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [condition, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}

