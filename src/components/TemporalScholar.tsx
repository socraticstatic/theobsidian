import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Clock, Moon, Calendar, Star, X } from 'lucide-react';
import { 
  getLunarPhase, 
  getCosmicCoordinates,
  getGeometricConstants,
  getAstralPositions,
  getUniversalConstants,
  getAncientDates,
  getAlchemicalSymbols,
  getTemporalState,
  getHermeticSymbol
} from '../utils/esoteric';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'scholar';
  timestamp: Date;
}

const TemporalScholar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
        content: "Greetings, seeker of temporal mysteries. I am the Obsidian Scholar, keeper of ancient calendars and celestial calculations. Ask me about lunar phases, planetary hours, sacred geometry, or any of the myriad ways civilizations have measured the flow of time through the cosmos.",
        sender: 'scholar',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Get current data for context - lunar is now defined at component level
    const cosmic = getCosmicCoordinates();
    const geometric = getGeometricConstants();
    const astral = getAstralPositions();
    const universal = getUniversalConstants();
    const ancient = getAncientDates();
    const alchemical = getAlchemicalSymbols();
    const temporal = getTemporalState();
    const hermetic = getHermeticSymbol();

    // Lunar phase queries
    if (input.includes('moon') || input.includes('lunar') || input.includes('phase')) {
      return `The moon currently displays as ${lunar.symbol} ${lunar.name}, with ${lunar.illumination}% illumination. Lunar phases follow a 29.53-day synodic cycle, calculated from the angular relationship between Sun, Earth, and Moon. Ancient civilizations used lunisolar calendars, tracking both solar years and lunar months. The current phase influences tidal forces, agricultural timing, and mystical practices across cultures.`;
    }

    // Calendar system queries
    if (input.includes('calendar') || input.includes('mayan') || input.includes('egyptian') || input.includes('chinese')) {
      return `Fascinating inquiry into calendar systems! Today converts to: ${ancient.mayan} in the Mayan Long Count, ${ancient.egyptian} in the Egyptian calendar, ${ancient.celtic} in the Celtic tree calendar, ${ancient.hebrew} in Hebrew months, and ${ancient.chinese} in the Chinese zodiac. Each system reflects unique astronomical observations - the Maya tracked Venus cycles, Egyptians followed Sirius, and the Chinese combined solar years with lunar months in sophisticated intercalation systems.`;
    }

    // Astronomical/cosmic queries
    if (input.includes('galactic') || input.includes('cosmic') || input.includes('star') || input.includes('constellation')) {
      return `Our cosmic position reveals: ${cosmic.galactic} galactic coordinates, moving at ${cosmic.stellar} relative to the Local Standard of Rest. ${astral.zodiac}, with ${astral.planetary} and ${astral.constellation}. The galactic center lies at ${astral.galacticCenter}. These coordinates shift as Earth orbits the Sun and our solar system travels through the Milky Way at 250 km/s, completing one galactic year every 225-250 million terrestrial years.`;
    }

    // Mathematical/geometric queries  
    if (input.includes('fibonacci') || input.includes('golden') || input.includes('math') || input.includes('geometry') || input.includes('pi')) {
      return `Today's mathematical significance: ${geometric.fibonacci}, ${geometric.goldenRatio}, ${geometric.primeFactor}, and π sequence ${geometric.piSequence}. Sacred geometry appears in natural cycles - the Fibonacci sequence in nautilus shells and flower petals, the golden ratio in planetary orbital resonances, and π in the calculation of celestial mechanics. Ancient architects encoded these constants into temples, aligning earthly structures with cosmic harmonies.`;
    }

    // Planetary hours and temporal states
    if (input.includes('planetary') || input.includes('hour') || input.includes('time') || input.includes('temporal')) {
      return `We exist in the ${temporal.timePhase} phase, specifically the ${temporal.mysticalTime}. The current planetary hour belongs to ${temporal.planetaryHour}, with numerological significance of ${temporal.numerology}. Planetary hours divide day and night into 12 segments each, ruled by the seven classical planets. This system, used by medieval astrologers and alchemists, optimizes timing for different activities based on planetary influences.`;
    }

    // Alchemical queries
    if (input.includes('alchemy') || input.includes('metal') || input.includes('element') || input.includes('philosopher')) {
      return `The current alchemical influence manifests as ${alchemical.symbol} ${alchemical.name}, representing ${alchemical.meaning}. Alchemical timing aligns with planetary hours - Mercury governs communication and learning, Venus rules beauty and harmony, Mars oversees action and conflict, Jupiter brings expansion and wisdom, Saturn teaches restriction and discipline, Sol radiates vitality, and Luna flows with intuition and dreams.`;
    }

    // Hermetic/I-Ching queries
    if (input.includes('hermetic') || input.includes('i-ching') || input.includes('trigram') || input.includes('wisdom')) {
      return `The hermetic principle currently manifests as ${hermetic.symbol} ${hermetic.name}, embodying ${hermetic.meaning}. These trigrams from the I-Ching represent fundamental forces in constant flux. "As above, so below" - the hermetic axiom suggests that temporal patterns in the heavens reflect in earthly cycles. The 64 hexagrams create a temporal oracle, mapping the interplay of yin and yang through time's eternal dance.`;
    }

    // Universal constants
    if (input.includes('constant') || input.includes('physics') || input.includes('universe') || input.includes('planck')) {
      return `Universal constants reveal today's cosmic significance: ${universal.planck}, light traveling ${universal.lightSpeed}, ${universal.hubble}, and our temporal ratio ${universal.cosmicAge}. These constants define the fabric of spacetime itself. Planck time represents the smallest meaningful temporal unit, while the Hubble constant describes cosmic expansion - time itself stretches as the universe grows, making each moment slightly longer than the last.`;
    }

    // Veil-thin times and mystical timing
    if (input.includes('veil') || input.includes('thin') || input.includes('mystical') || input.includes('magic')) {
      const veilStatus = temporal.isVeilThin ? "remarkably thin" : "stable";
      return `The veil between worlds is currently ${veilStatus}. Veil-thin times occur at liminal moments: dawn, dusk, midnight, 3 AM, and when minutes show 33. These threshold periods, recognized across cultures, represent when ordinary reality becomes permeable to deeper mysteries. Celtic traditions speak of the thin times, while Hindu concepts of sandhya mark twilight's sacred power.`;
    }

    // Default responses for general or unclear queries
    const defaultResponses = [
      `Time flows in spirals, not lines. Each moment contains echoes of past cycles and seeds of future patterns. What aspect of temporal mystery calls to you - lunar cycles, ancient calendars, or perhaps the mathematical constants that govern celestial motion?`,
      
      `The ancients understood time as sacred geometry in motion. From Stonehenge's solar alignments to Mayan Venus tables, each civilization developed sophisticated methods for tracking cosmic rhythms. Which temporal tradition intrigues your curiosity?`,
      
      `Consider this: we simultaneously exist in Gregorian year ${new Date().getFullYear()}, ${ancient.mayan}, Islamic year ${new Date().getFullYear() - 579}, and countless other temporal frameworks. Each system reveals different aspects of our cosmic position. What would you explore?`,
      
      `The hermetic axiom "as above, so below" suggests that celestial timing influences terrestrial events. Planetary hours, lunar phases, and stellar positions create an intricate temporal symphony. Which movement in this cosmic composition would you like to understand?`
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

  const quickQuestions = [
    "What's the current lunar phase?",
    "Tell me about planetary hours",
    "How do ancient calendars work?",
    "What are veil-thin times?",
    "Explain sacred geometry in time",
    "Current cosmic coordinates?"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="temporal-scholar-trigger"
        title="Consult the Temporal Scholar"
      >
        <Clock className="w-6 h-6" />
        <span className="trigger-text">Temporal Scholar</span>
      </button>
    );
  }

  return (
    <div className="temporal-scholar-overlay">
      <div className="temporal-scholar-container">
        <div className="scholar-header">
          <div className="scholar-title">
            <Clock className="w-5 h-5" />
            <span>Temporal Scholar</span>
            <div className="scholar-status">
              <Moon className="w-4 h-4" />
              <span>Online • {lunar.symbol}</span>
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
                <p>{message.content}</p>
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

        {messages.length <= 1 && (
          <div className="quick-questions">
            <p className="quick-questions-title">Quick Questions:</p>
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
          )}
        </div>

        <div className="scholar-input">
          <div className="input-container">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about time, calendars, lunar phases, or cosmic cycles..."
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