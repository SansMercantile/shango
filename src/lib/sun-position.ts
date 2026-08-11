/**
 * Real-time solar position calculations — sunrise/sunset times and the current sun
 * altitude for a given lat/long, computed client-side with zero external API calls.
 * Formulas follow the widely-used, well-tested SunCalc approach
 * (https://aa.quae.nl/en/reken/zonpositie.html), reimplemented here directly so the
 * Nexus site has no new runtime dependency for something this self-contained.
 */

const RAD = Math.PI / 180;
const DAY_MS = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;

function toJulian(date: Date): number {
  return date.getTime() / DAY_MS - 0.5 + J1970;
}

function toDays(date: Date): number {
  return toJulian(date) - J2000;
}

// Obliquity of the Earth's axis
const OBLIQUITY_OF_EARTH = 23.4397 * RAD;

function rightAscension(l: number, b: number): number {
  return Math.atan2(
    Math.sin(l) * Math.cos(OBLIQUITY_OF_EARTH) - Math.tan(b) * Math.sin(OBLIQUITY_OF_EARTH),
    Math.cos(l)
  );
}

function declination(l: number, b: number): number {
  return Math.asin(
    Math.sin(b) * Math.cos(OBLIQUITY_OF_EARTH) + Math.cos(b) * Math.sin(OBLIQUITY_OF_EARTH) * Math.sin(l)
  );
}

function solarMeanAnomaly(d: number): number {
  return RAD * (357.5291 + 0.98560028 * d);
}

function eclipticLongitude(M: number): number {
  const C = RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)); // equation of center
  const P = RAD * 102.9372; // perihelion of the Earth
  return M + C + P + Math.PI;
}

function sunCoords(d: number): { dec: number; ra: number } {
  const M = solarMeanAnomaly(d);
  const L = eclipticLongitude(M);
  return { dec: declination(L, 0), ra: rightAscension(L, 0) };
}

function siderealTime(d: number, lw: number): number {
  return RAD * (280.16 + 360.9856235 * d) - lw;
}

function azimuth(H: number, phi: number, dec: number): number {
  return Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
}

function altitude(H: number, phi: number, dec: number): number {
  return Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
}

export interface SunPosition {
  /** Radians above (+) or below (-) the horizon */
  altitude: number;
  /** Radians, sun azimuth (from south, clockwise) */
  azimuth: number;
}

/** Current sun altitude/azimuth for a given date and location. */
export function getSunPosition(date: Date, lat: number, lng: number): SunPosition {
  const lw = RAD * -lng;
  const phi = RAD * lat;
  const d = toDays(date);
  const c = sunCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  return { azimuth: azimuth(H, phi, c.dec), altitude: altitude(H, phi, c.dec) };
}

const J0 = 0.0009;

function julianCycle(d: number, lw: number): number {
  return Math.round(d - J0 - lw / (2 * Math.PI));
}

function approxTransit(Ht: number, lw: number, n: number): number {
  return J0 + (Ht + lw) / (2 * Math.PI) + n;
}

function solarTransitJ(ds: number, M: number, L: number): number {
  return J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
}

function hourAngle(h: number, phi: number, d: number): number {
  return Math.acos((Math.sin(h) - Math.sin(phi) * Math.sin(d)) / (Math.cos(phi) * Math.cos(d)));
}

function getSetJ(h: number, lw: number, phi: number, dec: number, n: number, M: number, L: number): number {
  const w = hourAngle(h, phi, dec);
  const a = approxTransit(w, lw, n);
  return solarTransitJ(a, M, L);
}

function fromJulian(j: number): Date {
  return new Date((j + 0.5 - J1970) * DAY_MS);
}

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  /** Civil dawn/dusk — sun 6° below horizon; used for a softer twilight transition */
  dawn: Date;
  dusk: Date;
  nadir: Date;
}

const DAWN_DUSK_ANGLE = -6;

/** Sunrise/sunset/dawn/dusk/solar-noon for a given date and location. */
export function getSunTimes(date: Date, lat: number, lng: number): SunTimes {
  const lw = RAD * -lng;
  const phi = RAD * lat;
  const d = toDays(date);
  const n = julianCycle(d, lw);
  const ds = approxTransit(0, lw, n);
  const M = solarMeanAnomaly(ds);
  const L = eclipticLongitude(M);
  const dec = declination(L, 0);
  const Jnoon = solarTransitJ(ds, M, L);

  const sunriseAngle = RAD * -0.833;
  const Jset = getSetJ(sunriseAngle, lw, phi, dec, n, M, L);
  const Jrise = Jnoon - (Jset - Jnoon);

  const dawnDuskAngle = RAD * DAWN_DUSK_ANGLE;
  const JsetDusk = getSetJ(dawnDuskAngle, lw, phi, dec, n, M, L);
  const JriseDawn = Jnoon - (JsetDusk - Jnoon);

  return {
    solarNoon: fromJulian(Jnoon),
    nadir: fromJulian(Jnoon - 0.5),
    sunrise: fromJulian(Jrise),
    sunset: fromJulian(Jset),
    dawn: fromJulian(JriseDawn),
    dusk: fromJulian(JsetDusk),
  };
}

export type DayPhase = 'night' | 'dawn' | 'day' | 'dusk';

/** Which broad phase of the day it currently is, and how far through it (0-1) — used
 *  to blend the background gradient smoothly rather than snapping between phases. */
export function getDayPhase(date: Date, lat: number, lng: number): { phase: DayPhase; progress: number } {
  const times = getSunTimes(date, lat, lng);
  const t = date.getTime();

  if (t >= times.dawn.getTime() && t < times.sunrise.getTime()) {
    return { phase: 'dawn', progress: (t - times.dawn.getTime()) / (times.sunrise.getTime() - times.dawn.getTime()) };
  }
  if (t >= times.sunrise.getTime() && t < times.dusk.getTime()) {
    // "day" spans sunrise through dusk; treat sunset->dusk as the tail end of day fading out
    const dayLength = times.dusk.getTime() - times.sunrise.getTime();
    return { phase: 'day', progress: (t - times.sunrise.getTime()) / dayLength };
  }
  if (t >= times.dusk.getTime() && t < times.dusk.getTime() + (times.sunrise.getTime() - times.dawn.getTime())) {
    const duskLength = times.sunrise.getTime() - times.dawn.getTime(); // mirror dawn's length
    return { phase: 'dusk', progress: (t - times.dusk.getTime()) / duskLength };
  }
  return { phase: 'night', progress: 0.5 };
}
