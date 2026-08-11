import type { WeatherCondition } from './weather';
import type { DayPhase } from './sun-position';

/**
 * Sky gradient stops, blended by both time-of-day (from sun-position.ts) and current
 * weather condition — e.g. a snowy night looks different from a clear night.
 * Weather conditions with their own strong visual identity (fog, thunderstorm) mostly
 * override the time-of-day palette; clear/cloudy/rain/snow are tinted by it.
 */
const TIME_GRADIENTS: Record<DayPhase, [string, string, string]> = {
  night: ['#020617', '#0a0e27', '#0f172a'],
  dawn: ['#4c1d95', '#c2410c', '#fbbf24'],
  day: ['#0ea5e9', '#38bdf8', '#bae6fd'],
  dusk: ['#7c2d12', '#c2410c', '#4c1d95'],
};

const WEATHER_OVERRIDES: Partial<Record<WeatherCondition, Partial<Record<DayPhase, [string, string, string]>>>> = {
  fog: {
    day: ['#94a3b8', '#cbd5e1', '#e2e8f0'],
    night: ['#1e293b', '#334155', '#475569'],
    dawn: ['#475569', '#94a3b8', '#cbd5e1'],
    dusk: ['#475569', '#94a3b8', '#cbd5e1'],
  },
  thunderstorm: {
    day: ['#1e293b', '#334155', '#475569'],
    night: ['#020617', '#0f172a', '#1e293b'],
    dawn: ['#1e293b', '#334155', '#475569'],
    dusk: ['#1e293b', '#334155', '#475569'],
  },
  snow: {
    day: ['#64748b', '#94a3b8', '#e2e8f0'],
    dawn: ['#475569', '#94a3b8', '#e2e8f0'],
    dusk: ['#475569', '#94a3b8', '#e2e8f0'],
  },
  cloudy: {
    day: ['#475569', '#64748b', '#94a3b8'],
  },
};

export function getSkyGradientStops(phase: DayPhase, condition: WeatherCondition): [string, string, string] {
  return WEATHER_OVERRIDES[condition]?.[phase] ?? TIME_GRADIENTS[phase];
}
