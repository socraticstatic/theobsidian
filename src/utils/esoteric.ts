// Enhanced Esoteric Utilities with Galactic, Geometric, Astral Data, and Non-Western Astrology

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

// Chinese Astrology System
export const getChineseAstrology = (birthDate?: Date): {
  animal: string;
  element: string;
  yinYang: string;
  meaning: string;
  personality: string;
  luckyNumbers: number[];
  luckyColors: string[];
} => {
  const date = birthDate || new Date();
  const year = date.getFullYear();
  
  const animals = [
    { name: 'Rat', element: 'Water', personality: 'Intelligent, adaptable, charming', meaning: 'Resourcefulness and wit' },
    { name: 'Ox', element: 'Earth', personality: 'Reliable, strong, determined', meaning: 'Stability and hard work' },
    { name: 'Tiger', element: 'Wood', personality: 'Brave, competitive, confident', meaning: 'Courage and leadership' },
    { name: 'Rabbit', element: 'Wood', personality: 'Quiet, elegant, responsible', meaning: 'Grace and diplomacy' },
    { name: 'Dragon', element: 'Earth', personality: 'Energetic, fearless, charismatic', meaning: 'Power and good fortune' },
    { name: 'Snake', element: 'Fire', personality: 'Enigmatic, wise, graceful', meaning: 'Wisdom and intuition' },
    { name: 'Horse', element: 'Fire', personality: 'Animated, active, energetic', meaning: 'Freedom and adventure' },
    { name: 'Goat', element: 'Earth', personality: 'Calm, gentle, sympathetic', meaning: 'Peace and creativity' },
    { name: 'Monkey', element: 'Metal', personality: 'Sharp, smart, curious', meaning: 'Innovation and cleverness' },
    { name: 'Rooster', element: 'Metal', personality: 'Observant, hardworking, courageous', meaning: 'Vigilance and honesty' },
    { name: 'Dog', element: 'Earth', personality: 'Lovely, honest, responsible', meaning: 'Loyalty and protection' },
    { name: 'Pig', element: 'Water', personality: 'Compassionate, generous, diligent', meaning: 'Abundance and honesty' }
  ];
  
  const elements = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];
  const animalIndex = (year - 4) % 12;
  const elementIndex = Math.floor((year - 4) / 2) % 5;
  const yinYang = year % 2 === 0 ? 'Yang' : 'Yin';
  
  const animal = animals[animalIndex];
  const yearElement = elements[elementIndex];
  
  return {
    animal: animal.name,
    element: yearElement,
    yinYang,
    meaning: animal.meaning,
    personality: animal.personality,
    luckyNumbers: [(animalIndex + 1), (animalIndex + 7) % 10, (animalIndex + 3) % 10],
    luckyColors: yearElement === 'Fire' ? ['Red', 'Orange'] : 
                 yearElement === 'Water' ? ['Blue', 'Black'] :
                 yearElement === 'Wood' ? ['Green', 'Brown'] :
                 yearElement === 'Metal' ? ['White', 'Silver'] : ['Yellow', 'Brown']
  };
};

// Vedic Astrology - Nakshatras
export const getVedicAstrology = (birthDate?: Date): {
  nakshatra: string;
  deity: string;
  symbol: string;
  meaning: string;
  nature: string;
  planetaryRuler: string;
} => {
  const date = birthDate || new Date();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const nakshatras = [
    { name: 'Ashwini', deity: 'Ashwini Kumaras', symbol: 'Horse\'s head', meaning: 'Born of light', nature: 'Swift healing', ruler: 'Ketu' },
    { name: 'Bharani', deity: 'Yama', symbol: 'Yoni', meaning: 'She who bears', nature: 'Creative force', ruler: 'Venus' },
    { name: 'Krittika', deity: 'Agni', symbol: 'Knife/Razor', meaning: 'The cutter', nature: 'Sharp insight', ruler: 'Sun' },
    { name: 'Rohini', deity: 'Brahma', symbol: 'Cart/Chariot', meaning: 'The red one', nature: 'Growth and beauty', ruler: 'Moon' },
    { name: 'Mrigashira', deity: 'Soma', symbol: 'Deer\'s head', meaning: 'The searching star', nature: 'Gentle seeking', ruler: 'Mars' },
    { name: 'Ardra', deity: 'Rudra', symbol: 'Teardrop', meaning: 'The moist one', nature: 'Transformation', ruler: 'Rahu' },
    { name: 'Punarvasu', deity: 'Aditi', symbol: 'Bow and quiver', meaning: 'Return of the light', nature: 'Renewal', ruler: 'Jupiter' },
    { name: 'Pushya', deity: 'Brihaspati', symbol: 'Flower/Udder', meaning: 'To nourish', nature: 'Providing', ruler: 'Saturn' },
    { name: 'Ashlesha', deity: 'Nagas', symbol: 'Coiled serpent', meaning: 'The embracer', nature: 'Mystical insight', ruler: 'Mercury' },
    { name: 'Magha', deity: 'Pitrs', symbol: 'Royal throne', meaning: 'The mighty one', nature: 'Ancestral power', ruler: 'Ketu' },
    { name: 'Purva Phalguni', deity: 'Bhaga', symbol: 'Front legs of bed', meaning: 'Former reddish one', nature: 'Pleasure and creativity', ruler: 'Venus' },
    { name: 'Uttara Phalguni', deity: 'Aryaman', symbol: 'Back legs of bed', meaning: 'Latter reddish one', nature: 'Partnership', ruler: 'Sun' },
    { name: 'Hasta', deity: 'Savitar', symbol: 'Hand', meaning: 'The hand', nature: 'Skillful manifestation', ruler: 'Moon' },
    { name: 'Chitra', deity: 'Tvashtar', symbol: 'Bright jewel', meaning: 'The brilliant', nature: 'Artistic creation', ruler: 'Mars' },
    { name: 'Swati', deity: 'Vayu', symbol: 'Young shoot blown by wind', meaning: 'Independent', nature: 'Self-going', ruler: 'Rahu' },
    { name: 'Vishakha', deity: 'Indra-Agni', symbol: 'Triumphal archway', meaning: 'The forked branches', nature: 'Determined focus', ruler: 'Jupiter' },
    { name: 'Anuradha', deity: 'Mitra', symbol: 'Lotus flower', meaning: 'Following Radha', nature: 'Devotion and friendship', ruler: 'Saturn' },
    { name: 'Jyeshtha', deity: 'Indra', symbol: 'Circular amulet', meaning: 'The eldest', nature: 'Protective power', ruler: 'Mercury' },
    { name: 'Mula', deity: 'Nirriti', symbol: 'Bundle of roots', meaning: 'The root', nature: 'Investigation of truth', ruler: 'Ketu' },
    { name: 'Purva Ashadha', deity: 'Apas', symbol: 'Elephant tusk', meaning: 'Former invincible one', nature: 'Purification', ruler: 'Venus' },
    { name: 'Uttara Ashadha', deity: 'Vishve Devas', symbol: 'Elephant tusk', meaning: 'Latter invincible one', nature: 'Final victory', ruler: 'Sun' },
    { name: 'Shravana', deity: 'Vishnu', symbol: 'Ear', meaning: 'Hearing', nature: 'Learning and connection', ruler: 'Moon' },
    { name: 'Dhanishta', deity: 'Vasus', symbol: 'Musical drum', meaning: 'The wealthiest', nature: 'Rhythm and prosperity', ruler: 'Mars' },
    { name: 'Shatabhisha', deity: 'Varuna', symbol: 'Empty circle', meaning: 'Hundred healers', nature: 'Mystical healing', ruler: 'Rahu' },
    { name: 'Purva Bhadrapada', deity: 'Aja Ekapada', symbol: 'Front legs of funeral cot', meaning: 'Former blessed feet', nature: 'Spiritual intensity', ruler: 'Jupiter' },
    { name: 'Uttara Bhadrapada', deity: 'Ahir Budhnya', symbol: 'Back legs of funeral cot', meaning: 'Latter blessed feet', nature: 'Deep wisdom', ruler: 'Saturn' },
    { name: 'Revati', deity: 'Pushan', symbol: 'Fish/Pair of fish', meaning: 'The wealthy', nature: 'Safe journey', ruler: 'Mercury' }
  ];
  
  const index = Math.floor((dayOfYear / 365.25) * 27) % 27;
  return nakshatras[index];
};

// Aztec Day Signs (Tonalpohualli)
export const getAztecDaySign = (birthDate?: Date): {
  daySign: string;
  number: number;
  meaning: string;
  power: string;
  direction: string;
  color: string;
} => {
  const date = birthDate || new Date();
  const daysSinceEpoch = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  
  const daySigns = [
    { sign: 'Cipactli', meaning: 'Crocodile', power: 'Primal creation', direction: 'East', color: 'Red' },
    { sign: 'Ehecatl', meaning: 'Wind', power: 'Divine breath', direction: 'North', color: 'White' },
    { sign: 'Calli', meaning: 'House', power: 'Shelter and security', direction: 'West', color: 'Blue' },
    { sign: 'Cuetzpalin', meaning: 'Lizard', power: 'Ancient wisdom', direction: 'South', color: 'Yellow' },
    { sign: 'Coatl', meaning: 'Serpent', power: 'Transformation', direction: 'East', color: 'Red' },
    { sign: 'Miquiztli', meaning: 'Death', power: 'Rebirth and renewal', direction: 'North', color: 'White' },
    { sign: 'Mazatl', meaning: 'Deer', power: 'Grace and gentleness', direction: 'West', color: 'Blue' },
    { sign: 'Tochtli', meaning: 'Rabbit', power: 'Fertility and abundance', direction: 'South', color: 'Yellow' },
    { sign: 'Atl', meaning: 'Water', power: 'Life force', direction: 'East', color: 'Red' },
    { sign: 'Itzcuintli', meaning: 'Dog', power: 'Loyalty and guidance', direction: 'North', color: 'White' },
    { sign: 'Ozomatli', meaning: 'Monkey', power: 'Joy and creativity', direction: 'West', color: 'Blue' },
    { sign: 'Malinalli', meaning: 'Grass', power: 'Flexibility', direction: 'South', color: 'Yellow' },
    { sign: 'Acatl', meaning: 'Reed', power: 'Authority', direction: 'East', color: 'Red' },
    { sign: 'Ocelotl', meaning: 'Jaguar', power: 'Night power', direction: 'North', color: 'White' },
    { sign: 'Cuauhtli', meaning: 'Eagle', power: 'Vision from above', direction: 'West', color: 'Blue' },
    { sign: 'Cozcacuauhtli', meaning: 'Vulture', power: 'Purification', direction: 'South', color: 'Yellow' },
    { sign: 'Ollin', meaning: 'Movement', power: 'Dynamic change', direction: 'East', color: 'Red' },
    { sign: 'Tecpatl', meaning: 'Flint', power: 'Cutting truth', direction: 'North', color: 'White' },
    { sign: 'Quiahuitl', meaning: 'Rain', power: 'Emotional cleansing', direction: 'West', color: 'Blue' },
    { sign: 'Xochitl', meaning: 'Flower', power: 'Beauty and art', direction: 'South', color: 'Yellow' }
  ];
  
  const signIndex = daysSinceEpoch % 20;
  const number = (daysSinceEpoch % 13) + 1;
  
  return {
    daySign: daySigns[signIndex].sign,
    number,
    meaning: daySigns[signIndex].meaning,
    power: daySigns[signIndex].power,
    direction: daySigns[signIndex].direction,
    color: daySigns[signIndex].color
  };
};

// Celtic Ogham Tree Calendar
export const getCelticOgham = (birthDate?: Date): {
  tree: string;
  ogham: string;
  meaning: string;
  season: string;
  power: string;
  element: string;
} => {
  const date = birthDate || new Date();
  const month = date.getMonth();
  const day = date.getDate();
  
  const treeCalendar = [
    { tree: 'Birch', ogham: 'ᚁ', meaning: 'New beginnings', season: 'Winter Solstice', power: 'Renewal', element: 'Air', start: [11, 24], end: [0, 20] },
    { tree: 'Rowan', ogham: 'ᚂ', meaning: 'Protection', season: 'Imbolc', power: 'Quickening', element: 'Fire', start: [0, 21], end: [1, 17] },
    { tree: 'Ash', ogham: 'ᚃ', meaning: 'Enchantment', season: 'Late Winter', power: 'Connection', element: 'Water', start: [1, 18], end: [2, 17] },
    { tree: 'Alder', ogham: 'ᚄ', meaning: 'Guidance', season: 'Spring Equinox', power: 'Foundation', element: 'Earth', start: [2, 18], end: [3, 14] },
    { tree: 'Willow', ogham: 'ᚅ', meaning: 'Intuition', season: 'Early Spring', power: 'Lunar wisdom', element: 'Water', start: [3, 15], end: [3, 12] },
    { tree: 'Hawthorn', ogham: 'ᚆ', meaning: 'Hope', season: 'Beltane', power: 'Fertility', element: 'Fire', start: [4, 13], end: [5, 9] },
    { tree: 'Oak', ogham: 'ᚇ', meaning: 'Strength', season: 'Summer Solstice', power: 'Endurance', element: 'Earth', start: [5, 10], end: [6, 7] },
    { tree: 'Holly', ogham: 'ᚈ', meaning: 'Balance', season: 'Midsummer', power: 'Protection', element: 'Fire', start: [6, 8], end: [7, 4] },
    { tree: 'Hazel', ogham: 'ᚉ', meaning: 'Wisdom', season: 'Lughnasadh', power: 'Knowledge', element: 'Air', start: [7, 5], end: [8, 1] },
    { tree: 'Vine', ogham: 'ᚊ', meaning: 'Prophecy', season: 'Autumn Equinox', power: 'Inspiration', element: 'Water', start: [8, 2], end: [8, 29] },
    { tree: 'Ivy', ogham: 'ᚋ', meaning: 'Resilience', season: 'Early Autumn', power: 'Determination', element: 'Earth', start: [8, 30], end: [9, 27] },
    { tree: 'Reed', ogham: 'ᚌ', meaning: 'Harmony', season: 'Samhain', power: 'Secrets', element: 'Water', start: [9, 28], end: [10, 24] },
    { tree: 'Elder', ogham: 'ᚍ', meaning: 'Transition', season: 'Winter approach', power: 'Rebirth', element: 'Air', start: [10, 25], end: [11, 23] }
  ];
  
  for (const period of treeCalendar) {
    const [startMonth, startDay] = period.start;
    const [endMonth, endDay] = period.end;
    
    if ((month === startMonth && day >= startDay) || 
        (month === endMonth && day <= endDay) ||
        (startMonth > endMonth && (month > startMonth || month < endMonth))) {
      return {
        tree: period.tree,
        ogham: period.ogham,
        meaning: period.meaning,
        season: period.season,
        power: period.power,
        element: period.element
      };
    }
  }
  
  return treeCalendar[0]; // Default to Birch
};

// Egyptian Decans
export const getEgyptianDecan = (birthDate?: Date): {
  decan: string;
  deity: string;
  meaning: string;
  power: string;
  star: string;
} => {
  const date = birthDate || new Date();
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const decans = [
    { decan: 'Khnum', deity: 'Ram-headed creator', meaning: 'The source', power: 'Creation', star: 'Aries' },
    { decan: 'Hor-khenti-khai', deity: 'Falcon of the east', meaning: 'Divine sight', power: 'Vision', star: 'Aldebaran' },
    { decan: 'Khenty-min', deity: 'Leading bull', meaning: 'Strength', power: 'Fertility', star: 'Orion' },
    { decan: 'Khentet-min', deity: 'Bull\'s thigh', meaning: 'Endurance', power: 'Persistence', star: 'Sirius' },
    { decan: 'Sah', deity: 'Orion', meaning: 'The soul of Osiris', power: 'Resurrection', star: 'Canopus' },
    { decan: 'Sopdet', deity: 'Sirius/Isis', meaning: 'The pointed one', power: 'Magic', star: 'Procyon' },
    { decan: 'Khery-khepd-khentet', deity: 'Under the stars', meaning: 'Hidden wisdom', power: 'Mystery', star: 'Castor' },
    { decan: 'Khery-khepd-khent', deity: 'Under Khent', meaning: 'Protection', power: 'Guidance', star: 'Pollux' },
    { decan: 'Khentet-hor', deity: 'Forehead of Horus', meaning: 'Divine intellect', power: 'Wisdom', star: 'Regulus' },
    { decan: 'Khent-hor', deity: 'Face of Horus', meaning: 'Solar power', power: 'Authority', star: 'Spica' },
    { decan: 'Djat', deity: 'The serpent', meaning: 'Transformation', power: 'Change', star: 'Arcturus' },
    { decan: 'Sis', deity: 'She of the sistrum', meaning: 'Harmony', power: 'Music', star: 'Antares' },
    { decan: 'Sopdu', deity: 'Sharp one', meaning: 'Precision', power: 'Focus', star: 'Shaula' },
    { decan: 'Khnum-kheti', deity: 'Ram of the field', meaning: 'Abundance', power: 'Harvest', star: 'Vega' },
    { decan: 'Tpy-a-khenty', deity: 'First of the east', meaning: 'Leadership', power: 'Initiative', star: 'Altair' },
    { decan: 'Khenty-khety', deity: 'Leading the north', meaning: 'Direction', power: 'Navigation', star: 'Deneb' },
    { decan: 'Khentet-heret', deity: 'Above the lower', meaning: 'Ascension', power: 'Rising', star: 'Fomalhaut' },
    { decan: 'Tem-akhyt', deity: 'Completeness', meaning: 'Fulfillment', power: 'Achievement', star: 'Capella' },
    { decan: 'Wep-ronpet', deity: 'Opener of the year', meaning: 'New beginnings', power: 'Renewal', star: 'Betelgeuse' },
    { decan: 'Knmet', deity: 'The black one', meaning: 'Hidden knowledge', power: 'Secrets', star: 'Rigel' },
    { decan: 'Tepy-a-semed', deity: 'First of the band', meaning: 'Unity', power: 'Connection', star: 'Bellatrix' },
    { decan: 'Semed', deity: 'The band', meaning: 'Community', power: 'Cooperation', star: 'Mintaka' },
    { decan: 'Seret', deity: 'The sow', meaning: 'Nurturing', power: 'Care', star: 'Alnilam' },
    { decan: 'Sawy-seret', deity: 'Guards of sow', meaning: 'Protection', power: 'Defense', star: 'Alnitak' },
    { decan: 'Khery-khepd-seret', deity: 'Under the sow', meaning: 'Foundation', power: 'Support', star: 'Saiph' },
    { decan: 'Tepy-a-djat', deity: 'First of the serpent', meaning: 'Primal wisdom', power: 'Ancient knowledge', star: 'Adhara' },
    { decan: 'Djat', deity: 'The serpent', meaning: 'Kundalini', power: 'Awakening', star: 'Wezen' },
    { decan: 'Sab-djat', deity: 'Star of the serpent', meaning: 'Cosmic serpent', power: 'Universal energy', star: 'Aludra' },
    { decan: 'Iry-djat', deity: 'Guardian of serpent', meaning: 'Sacred keeper', power: 'Preservation', star: 'Mirzam' },
    { decan: 'Khnum', deity: 'The ram', meaning: 'Creative force', power: 'Manifestation', star: 'Murzim' },
    { decan: 'An-ary', deity: 'Baboon', meaning: 'Sacred scribe', power: 'Record keeping', star: 'Muliphein' },
    { decan: 'Khenty-iry', deity: 'Leader of makers', meaning: 'Craftsmanship', power: 'Skill', star: 'Naos' },
    { decan: 'Sawy-khenty', deity: 'Guards of the leader', meaning: 'Loyalty', power: 'Service', star: 'Furud' },
    { decan: 'Khery-khepd-khenty', deity: 'Under the leader', meaning: 'Apprenticeship', power: 'Learning', star: 'Gomeisa' },
    { decan: 'Tpy-a-nwy', deity: 'First of waters', meaning: 'Source of life', power: 'Vitality', star: 'Tejat Prior' },
    { decan: 'Nwy', deity: 'Waters', meaning: 'Emotional flow', power: 'Intuition', star: 'Tejat Posterior' }
  ];
  
  const index = Math.floor((dayOfYear / 365.25) * 36) % 36;
  return decans[index];
};

// Generate Comprehensive Personal Fortune
export const generatePersonalFortune = (birthDate: Date): {
  chinese: ReturnType<typeof getChineseAstrology>;
  vedic: ReturnType<typeof getVedicAstrology>;
  aztec: ReturnType<typeof getAztecDaySign>;
  celtic: ReturnType<typeof getCelticOgham>;
  egyptian: ReturnType<typeof getEgyptianDecan>;
  summary: string;
  todaysGuidance: string;
  luckyElements: string[];
  challenges: string[];
  opportunities: string[];
} => {
  const chinese = getChineseAstrology(birthDate);
  const vedic = getVedicAstrology(birthDate);
  const aztec = getAztecDaySign(birthDate);
  const celtic = getCelticOgham(birthDate);
  const egyptian = getEgyptianDecan(birthDate);
  const lunar = getLunarPhase();
  const temporal = getTemporalState();
  
  // Generate a comprehensive summary
  const summary = `You are a ${chinese.element} ${chinese.animal} (${chinese.yinYang}), born under the Vedic nakshatra ${vedic.nakshatra} ruled by ${vedic.planetaryRuler}. Your Aztec day sign is ${aztec.number} ${aztec.daySign}, carrying the power of ${aztec.power}. The Celtic ${celtic.tree} tree (${celtic.ogham}) governs your spirit with ${celtic.power}, while the Egyptian decan ${egyptian.decan} bestows ${egyptian.power} through the star ${egyptian.star}.`;
  
  // Today's specific guidance
  const todaysGuidance = `With the moon in ${lunar.name} phase (${lunar.illumination}% illuminated) and the current ${temporal.timePhase} energy, your ${chinese.animal} nature aligns with ${vedic.nature}. The ${celtic.element} element of your Celtic tree supports ${aztec.direction} direction energy from your Aztec sign. Egyptian ${egyptian.deity} watches over you today.`;
  
  // Lucky elements combination
  const luckyElements = [
    ...chinese.luckyColors,
    chinese.element,
    aztec.color,
    celtic.element,
    vedic.symbol,
    `Number ${aztec.number}`,
    ...chinese.luckyNumbers.map(n => `Number ${n}`)
  ];
  
  // Challenges based on systems
  const challenges = [
    `${chinese.animal} tendency toward impatience may clash with ${vedic.nature}`,
    `${celtic.tree} energy requires grounding during ${temporal.timePhase} times`,
    `${aztec.daySign} power needs careful direction toward ${aztec.direction}`,
    `Egyptian ${egyptian.power} must be balanced with lunar ${lunar.phase} energy`
  ];
  
  // Opportunities
  const opportunities = [
    `${chinese.element} ${chinese.animal} charm opens doors when combined with ${vedic.meaning}`,
    `${celtic.power} from ${celtic.tree} tree enhances ${aztec.power}`,
    `${egyptian.meaning} through ${egyptian.star} supports ${vedic.deity} blessings`,
    `Current ${temporal.mysticalTime} favors ${chinese.personality} expression`
  ];
  
  return {
    chinese,
    vedic,
    aztec,
    celtic,
    egyptian,
    summary,
    todaysGuidance,
    luckyElements,
    challenges,
    opportunities
  };
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