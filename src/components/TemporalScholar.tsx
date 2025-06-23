import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Moon, Calendar, Star, X, User } from 'lucide-react';
import { 
  getLunarPhase, 
  getCosmicCoordinates,
  getGeometricConstants,
  getAstralPositions,
  getUniversalConstants,
  getAncientDates,
  getAlchemicalSymbols,
  getTemporalState,
  getHermeticSymbol,
  getChineseAstrology,
  getVedicAstrology,
  getAztecDaySign,
  getCelticOgham,
  getEgyptianDecan,
  generatePersonalFortune
} from '../utils/esoteric';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'scholar';
  timestamp: Date;
}

interface UserProfile {
  birthDate: Date | null;
  name: string;
  hasSharedBirthdate: boolean;
}

const TemporalScholar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    birthDate: null,
    name: '',
    hasSharedBirthdate: false
  });
  const [showBirthdateInput, setShowBirthdateInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Move lunar to component level so it's accessible in JSX
  const lunar = getLunarPhase();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when first opened
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "Greetings, seeker of temporal mysteries. I am the Obsidian AI, keeper of ancient calendars, celestial calculations, and the wisdom of many traditions. I can guide you through lunar phases, planetary hours, sacred geometry, Chinese astrology, Vedic nakshatras, Aztec day signs, Celtic tree wisdom, Egyptian decans, and the myriad ways civilizations have measured the flow of time through the cosmos. \n\nTo provide you with a personalized reading across multiple mystical traditions, I would need to know your birthdate. Shall we begin with that, or would you prefer to explore general temporal mysteries first?",
        sender: 'scholar',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleBirthdateSubmit = (birthDate: Date, name: string) => {
    setUserProfile({ birthDate, name, hasSharedBirthdate: true });
    setShowBirthdateInput(false);
    
    // Generate comprehensive fortune
    const fortune = generatePersonalFortune(birthDate);
    
    const fortuneMessage: Message = {
      id: Date.now().toString(),
      content: `Welcome, ${name}. Your temporal signature has been revealed:\n\n**PERSONAL COSMIC PROFILE**\n\n${fortune.summary}\n\n**TODAY'S GUIDANCE**\n${fortune.todaysGuidance}\n\n**YOUR MYSTICAL TRADITIONS:**\n\n🐉 **Chinese Astrology**: ${fortune.chinese.element} ${fortune.chinese.animal} (${fortune.chinese.yinYang}) - ${fortune.chinese.personality}. ${fortune.chinese.meaning}.\n\n⭐ **Vedic Nakshatra**: ${fortune.vedic.nakshatra} ruled by ${fortune.vedic.planetaryRuler}. Symbol: ${fortune.vedic.symbol}. Deity: ${fortune.vedic.deity}. Nature: ${fortune.vedic.nature}.\n\n🌅 **Aztec Day Sign**: ${fortune.aztec.number} ${fortune.aztec.daySign} (${fortune.aztec.meaning}). Power: ${fortune.aztec.power}. Direction: ${fortune.aztec.direction}. Color: ${fortune.aztec.color}.\n\n🌳 **Celtic Tree**: ${fortune.celtic.tree} (${fortune.celtic.ogham}) - ${fortune.celtic.meaning}. Season: ${fortune.celtic.season}. Power: ${fortune.celtic.power}. Element: ${fortune.celtic.element}.\n\n𓂀 **Egyptian Decan**: ${fortune.egyptian.decan} - ${fortune.egyptian.meaning}. Deity: ${fortune.egyptian.deity}. Power: ${fortune.egyptian.power}. Star: ${fortune.egyptian.star}.\n\n**LUCKY ELEMENTS**: ${fortune.luckyElements.slice(0, 5).join(', ')}\n\n**GROWTH OPPORTUNITIES**: ${fortune.opportunities[0]}\n\n**WISDOM TO CONSIDER**: ${fortune.challenges[0]}\n\nI can delve deeper into any of these traditions or provide guidance on how they interact with current cosmic conditions. What aspect calls to your spirit?`,
      sender: 'scholar',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, fortuneMessage]);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Get current data for context
    const cosmic = getCosmicCoordinates();
    const geometric = getGeometricConstants();
    const astral = getAstralPositions();
    const universal = getUniversalConstants();
    const ancient = getAncientDates();
    const alchemical = getAlchemicalSymbols();
    const temporal = getTemporalState();
    const hermetic = getHermeticSymbol();

    // Birthdate requests
    if (input.includes('birthdate') || input.includes('birth date') || input.includes('birthday') || input.includes('born') || (input.includes('personal') && input.includes('reading'))) {
      setShowBirthdateInput(true);
      return "I sense your desire for personal insight. Please share your birthdate using the form that will appear, and I shall weave together the wisdom of Chinese astrology, Vedic nakshatras, Aztec day signs, Celtic tree lore, and Egyptian decans to reveal your unique temporal signature.";
    }

    // Personal fortune updates for existing users
    if (userProfile.hasSharedBirthdate && (input.includes('update') || input.includes('today') || input.includes('current'))) {
      const fortune = generatePersonalFortune(userProfile.birthDate!);
      return `${userProfile.name}, here is your current cosmic alignment:\n\n**TODAY'S ENERGIES**: ${fortune.todaysGuidance}\n\nYour ${fortune.chinese.animal} nature resonates with the current ${temporal.planetaryHour} planetary hour. The ${lunar.name} moon (${lunar.illumination}% illuminated) enhances your ${fortune.vedic.nakshatra} nakshatra wisdom. Your Celtic ${fortune.celtic.tree} tree energy harmonizes with today's ${temporal.timePhase} phase.\n\n**IMMEDIATE GUIDANCE**: Focus on ${fortune.opportunities[Math.floor(Math.random() * fortune.opportunities.length)]}\n\n**ELEMENT TO EMBRACE**: ${fortune.luckyElements[Math.floor(Math.random() * fortune.luckyElements.length)]}`;
    }

    // Chinese astrology queries
    if (input.includes('chinese') || input.includes('zodiac animal') || input.includes('element') || input.includes('yin yang')) {
      if (userProfile.hasSharedBirthdate) {
        const chinese = getChineseAstrology(userProfile.birthDate!);
        return `Your Chinese astrological profile reveals you as a ${chinese.element} ${chinese.animal} (${chinese.yinYang} energy). ${chinese.personality}. This ${chinese.element} element resonates with current planetary hour ${temporal.planetaryHour}. Your lucky numbers are ${chinese.luckyNumbers.join(', ')}, and your fortune colors are ${chinese.luckyColors.join(' and ')}. The ${chinese.animal} represents ${chinese.meaning}, which aligns beautifully with today's ${temporal.timePhase} energy.`;
      } else {
        return "Chinese astrology maps personality through 12 animals and 5 elements in 60-year cycles. Each animal embodies specific traits: Rat (wit), Ox (strength), Tiger (courage), Rabbit (grace), Dragon (power), Snake (wisdom), Horse (freedom), Goat (peace), Monkey (cleverness), Rooster (honesty), Dog (loyalty), Pig (generosity). The five elements (Wood, Fire, Earth, Metal, Water) add layers of meaning. Share your birthdate for your personal Chinese astrological reading.";
      }
    }

    // Vedic astrology queries
    if (input.includes('vedic') || input.includes('nakshatra') || input.includes('hindu') || input.includes('sanskrit')) {
      if (userProfile.hasSharedBirthdate) {
        const vedic = getVedicAstrology(userProfile.birthDate!);
        return `Your Vedic nakshatra is ${vedic.nakshatra}, ruled by ${vedic.planetaryRuler} and blessed by the deity ${vedic.deity}. The symbol ${vedic.symbol} represents ${vedic.meaning}. Your nature is ${vedic.nature}. In Vedic tradition, nakshatras are 27 lunar mansions that refine solar astrology with profound psychological and spiritual insights. Your nakshatra influences how you process lunar energy, currently manifesting as ${lunar.name} at ${lunar.illumination}% illumination.`;
      } else {
        return "Vedic astrology uses 27 nakshatras (lunar mansions) spanning 13°20' each, creating a precise psychological and spiritual map. Each nakshatra has a ruling deity, planetary lord, and symbolic meaning. Nakshatras reveal deeper soul patterns than Western sun signs, showing how you respond to lunar cycles, karma, and dharma. The system dates to ancient Rishis who mapped consciousness onto stellar positions. Share your birthdate to discover your nakshatra.";
      }
    }

    // Aztec astrology queries
    if (input.includes('aztec') || input.includes('tonalpohualli') || input.includes('day sign') || input.includes('mesoamerican')) {
      if (userProfile.hasSharedBirthdate) {
        const aztec = getAztecDaySign(userProfile.birthDate!);
        return `Your Aztec day sign is ${aztec.number} ${aztec.daySign} (${aztec.meaning}), carrying the power of ${aztec.power}. Your sacred direction is ${aztec.direction}, resonating with ${aztec.color} energy. The Aztec Tonalpohualli combines 20 day signs with 13 numbers in 260-day cycles. Your ${aztec.daySign} sign connects you to primal forces of nature, enhanced by today's ${temporal.timePhase} phase which amplifies ${aztec.power}.`;
      } else {
        return "Aztec astrology uses the Tonalpohualli - a 260-day sacred calendar combining 20 day signs with 13 numbers. Each day sign represents primal forces: Cipactli (creation), Ehecatl (divine breath), Calli (security), Coatl (transformation), Mazatl (grace), Ollin (movement), Xochitl (beauty), and others. The system connects individuals to natural and cosmic powers, with each sign offering specific guidance and direction. Share your birthdate to discover your sacred day sign.";
      }
    }

    // Celtic astrology queries
    if (input.includes('celtic') || input.includes('druid') || input.includes('tree') || input.includes('ogham')) {
      if (userProfile.hasSharedBirthdate) {
        const celtic = getCelticOgham(userProfile.birthDate!);
        return `Your Celtic tree is ${celtic.tree} (${celtic.ogham}), representing ${celtic.meaning}. This tree governs the ${celtic.season} period and carries the power of ${celtic.power}. Connected to the ${celtic.element} element, your tree wisdom harmonizes with current temporal energies. Celtic Druids saw trees as vertical connectors between earth and sky, with each tree holding specific lessons and energies that shift with seasonal cycles.`;
      } else {
        return "Celtic tree astrology maps 13 trees to lunar months, each with its Ogham script symbol. Birch (new beginnings), Rowan (protection), Ash (connection), Alder (guidance), Willow (intuition), Hawthorn (hope), Oak (strength), Holly (balance), Hazel (wisdom), Vine (prophecy), Ivy (resilience), Reed (harmony), Elder (transition). Trees connect earth-sky energies, teaching seasonal wisdom and elemental balance. Share your birthdate to find your sacred tree.";
      }
    }

    // Egyptian astrology queries
    if (input.includes('egyptian') || input.includes('decan') || input.includes('pharaoh') || input.includes('pyramid')) {
      if (userProfile.hasSharedBirthdate) {
        const egyptian = getEgyptianDecan(userProfile.birthDate!);
        return `Your Egyptian decan is ${egyptian.decan}, watched over by ${egyptian.deity}. This decan represents ${egyptian.meaning} and bestows the power of ${egyptian.power}, connected to the star ${egyptian.star}. Egyptian decans divided the sky into 36 ten-degree segments, each ruled by specific deities. Your decan influences flow through underworld and celestial realms, connecting earthly life to stellar wisdom through ancient Egyptian star-knowledge.`;
      } else {
        return "Egyptian decans divided the ecliptic into 36 ten-degree segments, each ruled by specific deities and stars. This system predates Greek astrology, connecting pharaonic star-wisdom to daily life. Decans influenced temple architecture, mummy bandaging patterns, and royal succession. Each decan carries powers of specific deities - from Khnum (creation) to Sopdet (Isis/Sirius magic). The system maps soul journey through Duat (underworld) and stellar rebirth. Share your birthdate for your decan.";
      }
    }

    // Lunar phase queries
    if (input.includes('moon') || input.includes('lunar') || input.includes('phase')) {
      return `The moon currently displays as ${lunar.symbol} ${lunar.name}, with ${lunar.illumination}% illumination. Lunar phases follow a 29.53-day synodic cycle, calculated from the angular relationship between Sun, Earth, and Moon. Ancient civilizations used lunisolar calendars, tracking both solar years and lunar months. The current phase influences tidal forces, agricultural timing, and mystical practices across cultures. ${userProfile.hasSharedBirthdate ? `For your ${userProfile.name}, this ${lunar.phase} energy enhances your personal cosmic alignment.` : 'Share your birthdate to see how this lunar energy specifically affects your astrological profile.'}`;
    }

    // Calendar system queries
    if (input.includes('calendar') || input.includes('mayan') || input.includes('egyptian') || input.includes('chinese')) {
      return `Fascinating inquiry into calendar systems! Today converts to: ${ancient.mayan} in the Mayan Long Count, ${ancient.egyptian} in the Egyptian calendar, ${ancient.celtic} in the Celtic tree calendar, ${ancient.hebrew} in Hebrew months, and ${ancient.chinese} in the Chinese zodiac. Each system reflects unique astronomical observations - the Maya tracked Venus cycles, Egyptians followed Sirius, and the Chinese combined solar years with lunar months in sophisticated intercalation systems. ${userProfile.hasSharedBirthdate ? `Your birthdate creates a unique intersection across all these calendar systems.` : ''}`;
    }

    // Astronomical/cosmic queries
    if (input.includes('galactic') || input.includes('cosmic') || input.includes('star') || input.includes('constellation')) {
      return `Our cosmic position reveals: ${cosmic.galactic} galactic coordinates, moving at ${cosmic.stellar} relative to the Local Standard of Rest. ${astral.zodiac}, with ${astral.planetary} and ${astral.constellation}. The galactic center lies at ${astral.galacticCenter}. These coordinates shift as Earth orbits the Sun and our solar system travels through the Milky Way at 250 km/s, completing one galactic year every 225-250 million terrestrial years. ${userProfile.hasSharedBirthdate ? `Your birth coordinates create a unique stellar fingerprint across time.` : ''}`;
    }

    // Mathematical/geometric queries  
    if (input.includes('fibonacci') || input.includes('golden') || input.includes('math') || input.includes('geometry') || input.includes('pi')) {
      return `Today's mathematical significance: ${geometric.fibonacci}, ${geometric.goldenRatio}, ${geometric.primeFactor}, and π sequence ${geometric.piSequence}. Sacred geometry appears in natural cycles - the Fibonacci sequence in nautilus shells and flower petals, the golden ratio in planetary orbital resonances, and π in the calculation of celestial mechanics. Ancient architects encoded these constants into temples, aligning earthly structures with cosmic harmonies. ${userProfile.hasSharedBirthdate ? `Your birthdate carries its own mathematical mystical signature.` : ''}`;
    }

    // Planetary hours and temporal states
    if (input.includes('planetary') || input.includes('hour') || input.includes('time') || input.includes('temporal')) {
      return `We exist in the ${temporal.timePhase} phase, specifically the ${temporal.mysticalTime}. The current planetary hour belongs to ${temporal.planetaryHour}, with numerological significance of ${temporal.numerology}. Planetary hours divide day and night into 12 segments each, ruled by the seven classical planets. This system, used by medieval astrologers and alchemists, optimizes timing for different activities based on planetary influences. ${userProfile.hasSharedBirthdate ? `Your personal astrology harmonizes beautifully with this ${temporal.planetaryHour} hour.` : ''}`;
    }

    // Alchemical queries
    if (input.includes('alchemy') || input.includes('metal') || input.includes('element') || input.includes('philosopher')) {
      return `The current alchemical influence manifests as ${alchemical.symbol} ${alchemical.name}, representing ${alchemical.meaning}. Alchemical timing aligns with planetary hours - Mercury governs communication and learning, Venus rules beauty and harmony, Mars oversees action and conflict, Jupiter brings expansion and wisdom, Saturn teaches restriction and discipline, Sol radiates vitality, and Luna flows with intuition and dreams. ${userProfile.hasSharedBirthdate ? `Your personal elemental nature resonates with these alchemical currents.` : ''}`;
    }

    // Hermetic/I-Ching queries
    if (input.includes('hermetic') || input.includes('i-ching') || input.includes('trigram') || input.includes('wisdom')) {
      return `The hermetic principle currently manifests as ${hermetic.symbol} ${hermetic.name}, embodying ${hermetic.meaning}. These trigrams from the I-Ching represent fundamental forces in constant flux. "As above, so below" - the hermetic axiom suggests that temporal patterns in the heavens reflect in earthly cycles. The 64 hexagrams create a temporal oracle, mapping the interplay of yin and yang through time's eternal dance. ${userProfile.hasSharedBirthdate ? `Your birth created specific hermetic patterns that still influence your path.` : ''}`;
    }

    // Universal constants
    if (input.includes('constant') || input.includes('physics') || input.includes('universe') || input.includes('planck')) {
      return `Universal constants reveal today's cosmic significance: ${universal.planck}, light traveling ${universal.lightSpeed}, ${universal.hubble}, and our temporal ratio ${universal.cosmicAge}. These constants define the fabric of spacetime itself. Planck time represents the smallest meaningful temporal unit, while the Hubble constant describes cosmic expansion - time itself stretches as the universe grows, making each moment slightly longer than the last. ${userProfile.hasSharedBirthdate ? `Your birth moment exists within this expanding cosmic framework.` : ''}`;
    }

    // Veil-thin times and mystical timing
    if (input.includes('veil') || input.includes('thin') || input.includes('mystical') || input.includes('magic')) {
      const veilStatus = temporal.isVeilThin ? "remarkably thin" : "stable";
      return `The veil between worlds is currently ${veilStatus}. Veil-thin times occur at liminal moments: dawn, dusk, midnight, 3 AM, and when minutes show 33. These threshold periods, recognized across cultures, represent when ordinary reality becomes permeable to deeper mysteries. Celtic traditions speak of the thin times, while Hindu concepts of sandhya mark twilight's sacred power. ${userProfile.hasSharedBirthdate ? `Your birth time may have occurred during such a mystical threshold.` : ''}`;
    }

    // Default responses for general or unclear queries
    const defaultResponses = [
      `Time flows in spirals, not lines. Each moment contains echoes of past cycles and seeds of future patterns. I can explore lunar cycles, ancient calendars, Chinese astrology, Vedic nakshatras, Aztec day signs, Celtic tree wisdom, Egyptian decans, or mathematical constants that govern celestial motion. ${userProfile.hasSharedBirthdate ? `${userProfile.name}, what aspect of your cosmic nature calls to you?` : 'Share your birthdate for personalized insights, or ask about any temporal tradition.'}`,
      
      `The ancients understood time as sacred geometry in motion. From Stonehenge's solar alignments to Mayan Venus tables, from Chinese elemental cycles to Vedic lunar mansions, each civilization developed sophisticated methods for tracking cosmic rhythms. ${userProfile.hasSharedBirthdate ? `Your birth created a unique intersection of all these traditions.` : 'Which temporal tradition intrigues your curiosity?'}`,
      
      `Consider this: we simultaneously exist in Gregorian year ${new Date().getFullYear()}, ${ancient.mayan}, Islamic year ${new Date().getFullYear() - 579}, and countless other temporal frameworks. Each system reveals different aspects of our cosmic position. ${userProfile.hasSharedBirthdate ? `${userProfile.name}, your birthdate creates a unique signature across all these systems.` : 'What temporal framework would you explore?'}`,
      
      `The hermetic axiom "as above, so below" suggests that celestial timing influences terrestrial events. Planetary hours, lunar phases, stellar positions, Chinese elements, Vedic nakshatras, and Celtic tree energies create an intricate temporal symphony. ${userProfile.hasSharedBirthdate ? `Your personal cosmic theme plays within this grand composition.` : 'Which movement in this cosmic composition would you like to understand?'}`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const scholarResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: 'scholar',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, scholarResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = userProfile.hasSharedBirthdate ? [
    "Update my current cosmic alignment",
    "How do my traditions interact today?",
    "What's my lucky element right now?",
    "Explain my Chinese astrology",
    "Tell me about my nakshatra",
    "What's my Celtic tree wisdom?"
  ] : [
    "What's the current lunar phase?",
    "Tell me about Chinese astrology",
    "Explain Vedic nakshatras", 
    "What are Aztec day signs?",
    "How do Celtic trees work?",
    "Egyptian decan system?"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="temporal-scholar-trigger"
        title="Consult the Obsidian AI"
      >
        <span style={{ fontSize: '1.5rem' }}>𓍶</span>
        <span className="trigger-text">Obsidian AI</span>
      </button>
    );
  }

  return (
    <div className="temporal-scholar-overlay">
      <div className="temporal-scholar-container">
        <div className="scholar-header">
          <div className="scholar-title">
            <span style={{ fontSize: '1.25rem' }}>𓍶</span>
            <span>Obsidian AI</span>
            <div className="scholar-status">
              <Moon className="w-4 h-4" />
              <span>Online • {lunar.symbol}</span>
              {userProfile.hasSharedBirthdate && (
                <div className="user-indicator">
                  <User className="w-3 h-3" />
                  <span>{userProfile.name}</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="scholar-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="scholar-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'scholar-message'}`}
            >
              {message.sender === 'scholar' && (
                <div className="message-avatar">
                  <Star className="w-4 h-4" />
                </div>
              )}
              <div className="message-content">
                <p style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message scholar-message">
              <div className="message-avatar">
                <Star className="w-4 h-4" />
              </div>
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {showBirthdateInput && (
          <div className="birthdate-input-overlay">
            <div className="birthdate-form">
              <h3>Share Your Cosmic Origins</h3>
              <p>To weave together the wisdom of Chinese, Vedic, Aztec, Celtic, and Egyptian traditions, I need your birthdate.</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const birthDate = new Date(formData.get('birthdate') as string);
                const name = (formData.get('name') as string) || 'Seeker';
                handleBirthdateSubmit(birthDate, name);
              }}>
                <div className="form-group">
                  <label htmlFor="name">Name (optional):</label>
                  <input type="text" id="name" name="name" placeholder="How shall I address you?" />
                </div>
                <div className="form-group">
                  <label htmlFor="birthdate">Birthdate:</label>
                  <input type="date" id="birthdate" name="birthdate" required />
                </div>
                <div className="form-buttons">
                  <button type="submit" className="submit-btn">Reveal My Cosmic Profile</button>
                  <button type="button" onClick={() => setShowBirthdateInput(false)} className="cancel-btn">
                    Maybe Later
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {(messages.length <= 1 || !userProfile.hasSharedBirthdate) && !showBirthdateInput && (
          <div className="quick-questions">
            <p className="quick-questions-title">
              {userProfile.hasSharedBirthdate ? "Personal Guidance:" : "Explore Mysteries:"}
            </p>
            <div className="quick-questions-grid">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(question);
                    setTimeout(handleSendMessage, 100);
                  }}
                  className="quick-question-btn"
                >
                  {question}
                </button>
              ))}
            </div>
            {!userProfile.hasSharedBirthdate && (
              <button
                onClick={() => setShowBirthdateInput(true)}
                className="birthdate-prompt-btn"
              >
                🌟 Get Personal Multi-Tradition Reading
              </button>
            )}
          </div>
        )}

        <div className="scholar-input">
          <div className="input-container">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={userProfile.hasSharedBirthdate 
                ? `Ask about your cosmic alignments, ${userProfile.name}...`
                : "Ask about time, calendars, lunar phases, astrology traditions..."}
              className="scholar-textarea"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="send-button"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporalScholar;