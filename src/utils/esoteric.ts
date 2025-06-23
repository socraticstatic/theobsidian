// Simplified Esoteric Utilities - Core Functions Only

export const getLunarPhase = (): { phase: string; symbol: string; name: string; illumination: number } => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Calculate lunar phase using astronomical formula
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  
  const julianDay = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const daysSinceNewMoon = (julianDay - 2451549.5) / 29.53058867;
  const phase = (daysSinceNewMoon - Math.floor(daysSinceNewMoon)) * 29.53058867;
  
  // Calculate illumination percentage
  const illumination = Math.round((1 - Math.cos((phase / 29.53058867) * 2 * Math.PI)) * 50);
  
  if (phase < 1.84566) return { phase: 'new', symbol: '●', name: 'Nova Luna', illumination };
  if (phase < 5.53699) return { phase: 'waxing-crescent', symbol: '◐', name: 'Luna Crescens', illumination };
  if (phase < 9.22831) return { phase: 'first-quarter', symbol: '◑', name: 'Prima Quarta', illumination };
  if (phase < 12.91963) return { phase: 'waxing-gibbous', symbol: '◒', name: 'Luna Gibba', illumination };
  if (phase < 16.61096) return { phase: 'full', symbol: '○', name: 'Luna Plena', illumination };
  if (phase < 20.30228) return { phase: 'waning-gibbous', symbol: '◓', name: 'Luna Minuens', illumination };
  if (phase < 23.99361) return { phase: 'last-quarter', symbol: '◒', name: 'Ultima Quarta', illumination };
  return { phase: 'waning-crescent', symbol: '◑', name: 'Luna Senescens', illumination };
};

export const getRunicSequence = (): string[] => {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'];
  const now = Date.now();
  const cycleLength = 8000; // 8 seconds
  const baseIndex = Math.floor((now / cycleLength) % runes.length);
  
  return [
    runes[baseIndex],
    runes[(baseIndex + 3) % runes.length],
    runes[(baseIndex + 7) % runes.length]
  ];
};