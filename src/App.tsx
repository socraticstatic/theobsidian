import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import EsotericOverlay from './components/EsotericOverlay';
import VoidParticles from './components/VoidParticles';
import ObsidianCursor from './components/ObsidianCursor';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showHidden, setShowHidden] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [secretSequence, setSecretSequence] = useState<string[]>([]);
  const [isHexagonSpinning, setIsHexagonSpinning] = useState(false);
  const [cheatCodeActive, setCheatCodeActive] = useState('');
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Click and hold to reveal esoteric elements
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Ignore clicks on interactive elements
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a, input, select, textarea')) {
        return;
      }
      setIsHolding(true);
    };

    const handleMouseUp = () => {
      setIsHolding(false);
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Ignore touches on interactive elements
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a, input, select, textarea')) {
        return;
      }
      setIsHolding(true);
    };

    const handleTouchEnd = () => {
      setIsHolding(false);
    };

    // Add event listeners to document for global coverage
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    // Also handle when mouse leaves the window
    document.addEventListener('mouseleave', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  // Enhanced keyboard cheat codes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key.toLowerCase()];
      if (newSequence.length > 12) newSequence.shift();
      setKeySequence(newSequence);

      const sequenceString = newSequence.join('');

      // Gaming cheat codes
      if (sequenceString.includes('iddqd')) {
        // Doom God Mode reference
        setCheatCodeActive('god-mode');
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => {
          document.body.style.filter = '';
          setCheatCodeActive('');
        }, 5000);
      }

      if (sequenceString.includes('idkfa')) {
        // Doom All Weapons reference
        setCheatCodeActive('all-weapons');
        const elements = document.querySelectorAll('.alchemical-orb, .sacred-geometry');
        elements.forEach(el => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'scale(2) rotate(720deg)';
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '';
            (el as HTMLElement).style.transform = '';
          }, 3000);
        });
      }

      if (sequenceString.includes('konami') || sequenceString.includes('↑↑↓↓←→←→ba')) {
        // Konami Code
        setCheatCodeActive('konami');
        document.body.style.background = 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)';
        setTimeout(() => {
          document.body.style.background = '';
          setCheatCodeActive('');
        }, 4000);
      }

      if (sequenceString.includes('rosebud')) {
        // SimCity money cheat reference
        setCheatCodeActive('rosebud');
        const symbols = ['💰', '💎', '👑', '🏆'];
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const symbol = document.createElement('div');
            symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            symbol.style.position = 'fixed';
            symbol.style.left = Math.random() * window.innerWidth + 'px';
            symbol.style.top = Math.random() * window.innerHeight + 'px';
            symbol.style.fontSize = '2rem';
            symbol.style.zIndex = '9999';
            symbol.style.pointerEvents = 'none';
            symbol.style.animation = 'fade-out 3s ease-out forwards';
            document.body.appendChild(symbol);
            setTimeout(() => symbol.remove(), 3000);
          }, i * 100);
        }
      }

      if (sequenceString.includes('noclip')) {
        // FPS no-clip mode
        setCheatCodeActive('noclip');
        document.body.style.transform = 'rotateX(15deg) rotateY(5deg)';
        document.body.style.transformStyle = 'preserve-3d';
        setTimeout(() => {
          document.body.style.transform = '';
          document.body.style.transformStyle = '';
          setCheatCodeActive('');
        }, 4000);
      }

      if (sequenceString.includes('matrix')) {
        // Matrix effect
        setCheatCodeActive('matrix');
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            const char = document.createElement('div');
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.position = 'fixed';
            char.style.left = Math.random() * window.innerWidth + 'px';
            char.style.top = '0px';
            char.style.color = '#00ff00';
            char.style.fontSize = '1.5rem';
            char.style.zIndex = '9999';
            char.style.pointerEvents = 'none';
            char.style.animation = 'matrix-fall 4s linear forwards';
            document.body.appendChild(char);
            setTimeout(() => char.remove(), 4000);
          }, i * 50);
        }
      }

      // Original esoteric codes
      if (sequenceString.includes('obsidian')) {
        document.body.style.background = 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)';
        setTimeout(() => {
          document.body.style.background = '';
        }, 3000);
      }

      if (sequenceString.includes('tempus')) {
        const elements = document.querySelectorAll('.temporal-indicator, .lunar-phase, .alchemical-orb');
        elements.forEach(el => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'scale(1.3)';
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '';
            (el as HTMLElement).style.transform = '';
          }, 2000);
        });
      }

      if (sequenceString.includes('hermes')) {
        const elements = document.querySelectorAll('.hermetic-symbol, .rune-sequence');
        elements.forEach(el => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.color = '#ffd700';
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '';
            (el as HTMLElement).style.color = '';
          }, 3000);
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  const handleLongPress = () => {
    setShowHidden(true);
    setTimeout(() => setShowHidden(false), 3000);
  };

  const handleSecretClick = (symbol: string) => {
    const newSequence = [...secretSequence, symbol];
    setSecretSequence(newSequence);
    
    if (newSequence.join('') === 'shen-triangle-star') {
      setShowHidden(true);
      setTimeout(() => {
        setShowHidden(false);
        setSecretSequence([]);
      }, 5000);
    }
    
    if (newSequence.length > 3) {
      setSecretSequence([]);
    }
  };

  const handleHexagonMouseDown = () => {
    setIsHexagonSpinning(true);
  };

  const handleHexagonMouseUp = () => {
    setIsHexagonSpinning(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsHexagonSpinning(false);
    };

    const handleGlobalTouchEnd = () => {
      setIsHexagonSpinning(false);
    };

    if (isHexagonSpinning) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isHexagonSpinning]);

  return (
    <div className={`obsidian-app ${isHolding ? 'reveal-esoteric' : ''}`}>
      {/* CODEX:OBSIDIAN-GRIMOIRE */}
      {/* SIGIL:SHEN-ETERNAL */}
      {/* INITIATE:VOID-WALKER */}
      
      {/* Enhanced Esoteric Overlay */}
      <EsotericOverlay cheatCodeActive={cheatCodeActive} />

      {/* Hero Section */}
      <HeroSection 
        showHidden={showHidden}
        onSecretClick={handleSecretClick}
      />

      {/* About Section */}
      <AboutSection 
        scrollY={scrollY}
        onLongPress={handleLongPress}
      />

      {/* Contact Section */}
      <ContactSection 
        isHexagonSpinning={isHexagonSpinning}
        onHexagonMouseDown={handleHexagonMouseDown}
      />

      {/* Interactive Cursor */}
      <ObsidianCursor mousePosition={mousePosition} />
      
      {/* Ambient Particles */}
      <VoidParticles />
    </div>
  );
}

export default App;