import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import EsotericOverlay from './components/EsotericOverlay';
import VoidParticles from './components/VoidParticles';
import ObsidianCursor from './components/ObsidianCursor';
import DeviceAwareness from './components/DeviceAwareness';
import TouchGestures from './components/TouchGestures';
import { triggerVibration, vibrationPatterns } from './components/MobileVibrations';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showHidden, setShowHidden] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [secretSequence, setSecretSequence] = useState<string[]>([]);
  const [isHexagonSpinning, setIsHexagonSpinning] = useState(false);
  const [cheatCodeActive, setCheatCodeActive] = useState('');
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [isHolding, setIsHolding] = useState(false);
  
  // Mobile-specific states
  const [deviceOrientation, setDeviceOrientation] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [motionIntensity, setMotionIntensity] = useState(0);
  const [touchPattern, setTouchPattern] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [holdTimeout, setHoldTimeout] = useState<NodeJS.Timeout | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        window.innerWidth <= 768
      );
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // Improved hold-to-reveal system
  useEffect(() => {
    let startTime = 0;
    let isCurrentlyHolding = false;

    const handleStart = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Don't trigger on interactive elements
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.tagName === 'INPUT' ||
          target.closest('button, a, input, select, textarea, .contact-icon, .sigil-shen, .alchemical-orb, .lunar-phase, .temporal-indicator')) {
        return;
      }

      // Prevent default to avoid conflicts
      e.preventDefault();
      
      startTime = Date.now();
      isCurrentlyHolding = true;

      // Clear any existing timeout
      if (holdTimeout) {
        clearTimeout(holdTimeout);
      }

      // Set a timeout for hold detection (500ms)
      const timeout = setTimeout(() => {
        if (isCurrentlyHolding) {
          setIsHolding(true);
          setShowHidden(true);
          if (isMobile) {
            triggerVibration(vibrationPatterns.longPress);
          }
        }
      }, 500);

      setHoldTimeout(timeout);
    };

    const handleEnd = () => {
      isCurrentlyHolding = false;
      
      if (holdTimeout) {
        clearTimeout(holdTimeout);
        setHoldTimeout(null);
      }

      // Only hide if we were actually showing
      if (isHolding) {
        setTimeout(() => {
          setIsHolding(false);
          setShowHidden(false);
        }, 200); // Small delay for better UX
      }
    };

    const handleMove = (e: TouchEvent) => {
      // If user moves finger too much, cancel hold
      if (isCurrentlyHolding && e.touches.length > 0) {
        const touch = e.touches[0];
        const moveDistance = Math.abs(touch.clientX - (e.target as any).startX) + 
                           Math.abs(touch.clientY - (e.target as any).startY);
        
        if (moveDistance > 30) { // 30px threshold
          isCurrentlyHolding = false;
          if (holdTimeout) {
            clearTimeout(holdTimeout);
            setHoldTimeout(null);
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Store initial position for move detection
        const touch = e.touches[0];
        (e.target as any).startX = touch.clientX;
        (e.target as any).startY = touch.clientY;
      }
      handleStart(e);
    };

    if (isMobile) {
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchend', handleEnd, { passive: true });
      document.addEventListener('touchcancel', handleEnd, { passive: true });
      document.addEventListener('touchmove', handleMove, { passive: true });
    } else {
      document.addEventListener('mousedown', handleStart);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('mouseleave', handleEnd);
    }

    return () => {
      if (holdTimeout) {
        clearTimeout(holdTimeout);
      }

      if (isMobile) {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleEnd);
        document.removeEventListener('touchcancel', handleEnd);
        document.removeEventListener('touchmove', handleMove);
      } else {
        document.removeEventListener('mousedown', handleStart);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('mouseleave', handleEnd);
      }
    };
  }, [isMobile, holdTimeout, isHolding]);

  // Device motion handlers
  const handleOrientationChange = (orientation: number) => {
    setDeviceOrientation(orientation);
    if (isMobile) {
      triggerVibration(vibrationPatterns.orientationChange);
    }
  };

  const handleMotion = (data: { acceleration: { x: number; y: number; z: number } }) => {
    const intensity = Math.abs(data.acceleration.x) + Math.abs(data.acceleration.y) + Math.abs(data.acceleration.z);
    setMotionIntensity(intensity);
  };

  const handleShake = () => {
    setIsShaking(true);
    setShowHidden(true);
    if (isMobile) {
      triggerVibration(vibrationPatterns.shake);
    }
    
    // Trigger a mystical effect
    setCheatCodeActive('device-shake');
    
    setTimeout(() => {
      setIsShaking(false);
      setShowHidden(false);
      setCheatCodeActive('');
    }, 3000);
  };

  // Touch gesture handlers
  const handleSwipePattern = (pattern: string) => {
    setTouchPattern(pattern);
    if (isMobile) {
      triggerVibration(vibrationPatterns.mysticalPulse);
    }

    // Activate different effects based on swipe patterns
    switch (pattern) {
      case 'konami-start':
        setCheatCodeActive('konami-touch');
        setShowHidden(true);
        break;
      case 'hermetic-cross':
        setCheatCodeActive('hermetic-touch');
        break;
      case 'temporal-wave':
        setCheatCodeActive('temporal-touch');
        break;
      case 'elemental-spiral':
        setCheatCodeActive('elemental-touch');
        setShowHidden(true);
        break;
    }

    setTimeout(() => {
      setTouchPattern('');
      setCheatCodeActive('');
      setShowHidden(false);
    }, 4000);
  };

  const handleMultiTouch = (touchCount: number) => {
    if (touchCount >= 3) {
      setShowHidden(true);
      setCheatCodeActive('multi-touch');
      if (isMobile) {
        triggerVibration(vibrationPatterns.ancientAwakening);
      }
      
      setTimeout(() => {
        setShowHidden(false);
        setCheatCodeActive('');
      }, 5000);
    }
  };

  const handleDoubleTap = () => {
    setShowHidden(true);
    if (isMobile) {
      triggerVibration(vibrationPatterns.secretReveal);
    }
    setTimeout(() => setShowHidden(false), 2000);
  };

  const handleTripleTap = () => {
    setCheatCodeActive('triple-tap');
    setShowHidden(true);
    if (isMobile) {
      triggerVibration(vibrationPatterns.cheatCode);
    }
    setTimeout(() => {
      setCheatCodeActive('');
      setShowHidden(false);
    }, 4000);
  };

  // Enhanced keyboard cheat codes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key.toLowerCase()];
      if (newSequence.length > 12) newSequence.shift();
      setKeySequence(newSequence);

      const sequenceString = newSequence.join('');

      // Gaming cheat codes
      if (sequenceString.includes('iddqd')) {
        setCheatCodeActive('god-mode');
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => {
          document.body.style.filter = '';
          setCheatCodeActive('');
        }, 5000);
      }

      if (sequenceString.includes('idkfa')) {
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
        setCheatCodeActive('konami');
        document.body.style.background = 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)';
        setTimeout(() => {
          document.body.style.background = '';
          setCheatCodeActive('');
        }, 4000);
      }

      if (sequenceString.includes('rosebud')) {
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
    if (isMobile) {
      triggerVibration(vibrationPatterns.secretReveal);
    }
    setTimeout(() => setShowHidden(false), 3000);
  };

  const handleSecretClick = (symbol: string) => {
    const newSequence = [...secretSequence, symbol];
    setSecretSequence(newSequence);
    
    if (isMobile) {
      triggerVibration(vibrationPatterns.tap);
    }
    
    if (newSequence.join('') === 'shen-triangle-star') {
      setShowHidden(true);
      if (isMobile) {
        triggerVibration(vibrationPatterns.ancientAwakening);
      }
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
    if (isMobile) {
      triggerVibration(vibrationPatterns.mysticalPulse);
    }
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
    <div className={`obsidian-app ${isHolding ? 'reveal-esoteric' : ''} ${isShaking ? 'device-shaking' : ''} ${isMobile ? 'mobile-experience' : ''}`}
         style={{
           '--device-orientation': `${deviceOrientation}deg`,
           '--motion-intensity': motionIntensity,
         } as React.CSSProperties}>
      
      {/* Device Awareness for Mobile */}
      {isMobile && (
        <>
          <DeviceAwareness
            onOrientationChange={handleOrientationChange}
            onMotion={handleMotion}
            onShake={handleShake}
          />
          <TouchGestures
            onSwipePattern={handleSwipePattern}
            onMultiTouch={handleMultiTouch}
            onDoubleTap={handleDoubleTap}
            onTripleTap={handleTripleTap}
          />
        </>
      )}

      {/* Enhanced Esoteric Overlay */}
      <EsotericOverlay 
        cheatCodeActive={cheatCodeActive} 
        deviceOrientation={deviceOrientation}
        motionIntensity={motionIntensity}
        touchPattern={touchPattern}
        isMobile={isMobile}
      />

      {/* Hero Section */}
      <HeroSection 
        showHidden={showHidden}
        onSecretClick={handleSecretClick}
        deviceOrientation={deviceOrientation}
        isMobile={isMobile}
      />

      {/* About Section */}
      <AboutSection 
        scrollY={scrollY}
        onLongPress={handleLongPress}
        isMobile={isMobile}
      />

      {/* Contact Section */}
      <ContactSection 
        isHexagonSpinning={isHexagonSpinning}
        onHexagonMouseDown={handleHexagonMouseDown}
        isMobile={isMobile}
      />

      {/* Interactive Cursor (Desktop only) */}
      {!isMobile && <ObsidianCursor mousePosition={mousePosition} />}
      
      {/* Ambient Particles */}
      <VoidParticles isMobile={isMobile} />
      
      {/* Mobile Instructions Overlay */}
      {isMobile && (
        <div className="mobile-instructions">
          <div className="instruction-item">📱 Hold anywhere to reveal mysteries</div>
          <div className="instruction-item">📳 Shake device to awaken the void</div>
          <div className="instruction-item">👆 Triple tap for ancient secrets</div>
          <div className="instruction-item">🤏 Multi-touch for mystical powers</div>
        </div>
      )}
    </div>
  );
}

export default App;