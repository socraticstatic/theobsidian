// Enhanced Esoteric Utilities with Galactic, Geometric, and Astral Data

// Lunar Phase Calculation with Gray Unicode Symbols
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

// Galactic and Cosmic Coordinates for Today
export const getCosmicCoordinates = (): {
  galactic: string;
  stellar: string;
  cosmic: string;
} => {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Simulate galactic coordinates based on Earth's position
  const galacticLong = ((dayOfYear / 365.25) * 360 + 123.7) % 360;
  const galacticLat = Math.sin((dayOfYear / 365.25) * 2 * Math.PI) * 62.87;
  
  // Local Group movement
  const localGroupVelocity = 627; // km/s towards Leo
  const cosmicTime = Math.floor(now.getTime() / 1000 / 31557600); // Years since Unix epoch
  
  return {
    galactic: `L${galacticLong.toFixed(1)}° B${galacticLat.toFixed(1)}°`,
    stellar: `LSR: ${localGroupVelocity}km/s`,
    cosmic: `T+${cosmicTime} Sol-years`
  };
};

// Geometric Constants and Mathematical Significance for Today's Date
export const getGeometricConstants = (): {
  fibonacci: string;
  goldenRatio: string;
  primeFactor: string;
  piSequence: string;
} => {
  const now = new Date();
  const dateNumber = now.getDate();
  const monthNumber = now.getMonth() + 1;
  const yearShort = now.getFullYear() % 100;
  
  // Fibonacci position for today's date
  const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];
  const fibIndex = (dateNumber + monthNumber) % fibSequence.length;
  
  // Golden ratio related to date
  const phi = 1.618033988749;
  const phiPower = Math.pow(phi, (dateNumber + monthNumber) / 12);
  
  // Prime factorization of today's numerical significance
  const dateSum = dateNumber + monthNumber + yearShort;
  const isPrime = (n: number) => n > 1 && Array.from({length: Math.sqrt(n)}, (_, i) => i + 2).every(d => n % d !== 0);
  
  // Pi sequence starting at today's position
  const piDigits = '31415926535897932384626433832795028841971693993751058209749445923';
  const piIndex = ((dateNumber * monthNumber) % (piDigits.length - 8));
  
  return {
    fibonacci: `F(${fibIndex}) = ${fibSequence[fibIndex]}`,
    goldenRatio: `φ^${((dateNumber + monthNumber) / 12).toFixed(2)} = ${phiPower.toFixed(3)}`,
    primeFactor: isPrime(dateSum) ? `Σ${dateSum} ∈ ℙ` : `Σ${dateSum} ∉ ℙ`,
    piSequence: `π[${piIndex}..] = ${piDigits.slice(piIndex, piIndex + 8)}`
  };
};

// Astral and Astrological Positions for Today
export const getAstralPositions = (): {
  zodiac: string;
  planetary: string;
  constellation: string;
  galacticCenter: string;
} => {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  // Zodiac position (simplified)
  const zodiacSigns = ['♈ Aries', '♉ Taurus', '♊ Gemini', '♋ Cancer', '♌ Leo', '♍ Virgo', 
                      '♎ Libra', '♏ Scorpio', '♐ Sagittarius', '♑ Capricorn', '♒ Aquarius', '♓ Pisces'];
  const zodiacIndex = Math.floor((dayOfYear / 365.25) * 12) % 12;
  
  // Current planetary dominance (simplified calculation)
  const planets = ['☽ Luna', '☿ Mercury', '♀ Venus', '☉ Sol', '♂ Mars', '♃ Jupiter', '♄ Saturn'];
  const planetIndex = (Math.floor(now.getHours() / 3.43) + Math.floor(dayOfYear / 7)) % planets.length;
  
  // Rising constellation
  const constellations = ['Orion', 'Cassiopeia', 'Ursa Major', 'Draco', 'Cygnus', 'Perseus', 'Andromeda', 'Lyra'];
  const constIndex = (dayOfYear + now.getHours()) % constellations.length;
  
  // Galactic center position relative to today
  const galacticAngle = ((dayOfYear / 365.25) * 360 + 266.4) % 360;
  
  return {
    zodiac: `☉ in ${zodiacSigns[zodiacIndex]}`,
    planetary: `${planets[planetIndex]} Dominant`,
    constellation: `${constellations[constIndex]} Rising`,
    galacticCenter: `SGR A* @ ${galacticAngle.toFixed(1)}°`
  };
};

// Universal Constants with Today's Significance
export const getUniversalConstants = (): {
  planck: string;
  lightSpeed: string;
  hubble: string;
  cosmicAge: string;
} => {
  const now = new Date();
  const secondsToday = Math.floor((now.getTime() % (24 * 60 * 60 * 1000)) / 1000);
  
  // Modified constants showing today's cosmic significance
  const planckConstant = 6.62607015e-34; // J⋅Hz⁻¹
  const lightSpeed = 299792458; // m/s
  const hubbleConstant = 70; // km/s/Mpc
  const universeAge = 13.8e9; // years
  
  // Today's "position" in various cosmic scales
  const planckTime = secondsToday * planckConstant * 1e34;
  const lightDistance = lightSpeed * secondsToday / 1000; // km
  const hubbleRatio = (secondsToday / 86400) * hubbleConstant;
  const ageRatio = (now.getFullYear() / universeAge) * 1e9;
  
  return {
    planck: `ℏt = ${planckTime.toFixed(2)}×10⁻³⁴`,
    lightSpeed: `c⋅t = ${lightDistance.toFixed(0)}km`,
    hubble: `H₀ = ${hubbleRatio.toFixed(2)}km/s/Mpc`,
    cosmicAge: `t/T = ${ageRatio.toFixed(6)}×10⁻⁹`
  };
};

// Ancient Calendar Conversions
export const getAncientDates = (): { mayan: string; egyptian: string; celtic: string; hebrew: string; chinese: string } => {
  const now = new Date();
  const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
  
  // Mayan Long Count (simplified)
  const mayanStart = new Date('2012-12-21').getTime() / (1000 * 60 * 60 * 24);
  const mayanDays = daysSinceEpoch - Math.floor(mayanStart);
  const mayanYear = Math.floor(mayanDays / 365) + 1;
  
  // Egyptian Calendar (simplified)
  const egyptianMonth = ['Thoth', 'Phaophi', 'Athyr', 'Choiak', 'Tybi', 'Mechir', 'Phamenoth', 'Pharmuthi', 'Pachons', 'Payni', 'Epiphi', 'Mesore'][now.getMonth()];
  
  // Celtic Tree Calendar (simplified)
  const celticTrees = ['Birch', 'Rowan', 'Ash', 'Alder', 'Willow', 'Hawthorn', 'Oak', 'Holly', 'Hazel', 'Vine', 'Ivy', 'Reed'];
  const celticTree = celticTrees[now.getMonth()];
  
  // Hebrew Calendar (simplified)
  const hebrewMonths = ['Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar', 'Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul'];
  const hebrewMonth = hebrewMonths[now.getMonth()];
  
  // Chinese Zodiac
  const chineseAnimals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const chineseYear = chineseAnimals[(now.getFullYear() - 4) % 12];
  
  return {
    mayan: `${mayanYear} • Baktun 14`,
    egyptian: `${now.getDate()} ${egyptianMonth}`,
    celtic: `Moon of ${celticTree}`,
    hebrew: `${now.getDate()} ${hebrewMonth}`,
    chinese: `Year of ${chineseYear}`
  };
};

// Expanded Alchemical Symbol Rotation
export const getAlchemicalSymbols = () => {
  const symbols = [
    { name: 'Mercury', symbol: '☿', meaning: 'Spirit & Communication' },
    { name: 'Sulfur', symbol: '🜍', meaning: 'Soul & Desires' },
    { name: 'Salt', symbol: '🜔', meaning: 'Body & Material' },
    { name: 'Gold', symbol: '🜚', meaning: 'Solar Perfection' },
    { name: 'Silver', symbol: '🜛', meaning: 'Lunar Intuition' },
    { name: 'Iron', symbol: '🜨', meaning: 'Martial Strength' },
    { name: 'Antimony', symbol: '🜹', meaning: 'Wild Spirit' },
    { name: 'Tin', symbol: '🜤', meaning: 'Jovial Expansion' },
    { name: 'Lead', symbol: '🜨', meaning: 'Saturnine Wisdom' },
    { name: 'Copper', symbol: '🜛', meaning: 'Venusian Beauty' },
    { name: 'Aqua Regia', symbol: '🜆', meaning: 'Royal Water' },
    { name: 'Philosopher\'s Stone', symbol: '🜊', meaning: 'Perfect Unity' }
  ];
  
  const now = Date.now();
  const cycleLength = 6000; // 6 seconds per symbol for more variety
  const index = Math.floor((now / cycleLength) % symbols.length);
  
  return symbols[index];
};

// Enhanced Time-based Revelations
export const getTemporalState = (): { 
  isVeilThin: boolean; 
  isDarkHour: boolean; 
  mysticalTime: string;
  timePhase: string;
  planetaryHour: string;
  numerology: number;
} => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  // Enhanced veil calculations
  const isVeilThin = hour === 3 || hour === 0 || (hour >= 5 && hour <= 7) || (hour >= 17 && hour <= 19) || minute === 33;
  const isDarkHour = hour >= 22 || hour <= 5;
  
  // Planetary Hours (simplified)
  const planets = ['Saturn', 'Jupiter', 'Mars', 'Sol', 'Venus', 'Mercury', 'Luna'];
  const planetaryHour = planets[hour % 7];
  
  // Numerological significance
  const numerology = (hour + minute) % 9 + 1;
  
  // Enhanced mystical time names
  const mysticalHours = [
    'Hour of the Void', 'Hour of Silent Whispers', 'Hour of Hidden Paths', 'Hour of the Thin Veil',
    'Hour of First Light', 'Hour of Awakening', 'Hour of Golden Dawn', 'Hour of Solar Ascent',
    'Hour of Manifestation', 'Hour of Creative Fire', 'Hour of Perfect Balance', 'Hour of Higher Wisdom',
    'Hour of Truth Unveiled', 'Hour of Mental Clarity', 'Hour of Equilibrium', 'Hour of Sacred Harmony',
    'Hour of Transformation', 'Hour of Violet Twilight', 'Hour of Ancient Mysteries', 'Hour of Lucid Dreams',
    'Hour of Soul Reflection', 'Hour of Deep Contemplation', 'Hour of Profound Silence', 'Hour of Return to Source'
  ];
  
  const timePhases = ['Void', 'Shadow', 'Twilight', 'Dawn', 'Day', 'Dusk'];
  let phaseIndex = 0;
  if (hour >= 0 && hour < 4) phaseIndex = 0; // Void
  else if (hour >= 4 && hour < 6) phaseIndex = 1; // Shadow  
  else if (hour >= 6 && hour < 8) phaseIndex = 3; // Dawn
  else if (hour >= 8 && hour < 17) phaseIndex = 4; // Day
  else if (hour >= 17 && hour < 20) phaseIndex = 5; // Dusk
  else phaseIndex = 2; // Twilight
  
  return {
    isVeilThin,
    isDarkHour,
    mysticalTime: mysticalHours[hour],
    timePhase: timePhases[phaseIndex],
    planetaryHour,
    numerology
  };
};

// Sacred Geometry Patterns - Expanded
export const getSacredGeometry = (): { pattern: string; rotation: number } => {
  const patterns = ['⬡', '◊', '△', '▽', '○', '☆', '✧', '⬢', '◈', '⧫', '◉', '⬟', '⬠', '⟐', '⬢'];
  const now = Date.now();
  const cycleLength = 15000; // 15 seconds per pattern
  const index = Math.floor((now / cycleLength) % patterns.length);
  const rotation = (now / 80) % 360; // Slightly faster rotation
  
  return {
    pattern: patterns[index],
    rotation
  };
};

// Runic Sequence Generator
export const getRunicSequence = (): string[] => {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];
  const now = Date.now();
  const cycleLength = 8000; // 8 seconds
  const baseIndex = Math.floor((now / cycleLength) % runes.length);
  
  return [
    runes[baseIndex],
    runes[(baseIndex + 7) % runes.length],
    runes[(baseIndex + 13) % runes.length],
    runes[(baseIndex + 19) % runes.length]
  ];
};

// Hermetic Symbols
export const getHermeticSymbol = (): { symbol: string; name: string; meaning: string } => {
  const hermetic = [
    { symbol: '☰', name: 'Heaven', meaning: 'Creative Force' },
    { symbol: '☷', name: 'Earth', meaning: 'Receptive Power' },
    { symbol: '☳', name: 'Thunder', meaning: 'Arousing Energy' },
    { symbol: '☵', name: 'Water', meaning: 'Abysmal Depth' },
    { symbol: '☶', name: 'Mountain', meaning: 'Keeping Still' },
    { symbol: '☴', name: 'Wind', meaning: 'Gentle Penetration' },
    { symbol: '☲', name: 'Fire', meaning: 'Clinging Light' },
    { symbol: '☱', name: 'Lake', meaning: 'Joyous Expression' }
  ];
  
  const now = Date.now();
  const index = Math.floor((now / 10000) % hermetic.length);
  return hermetic[index];
};