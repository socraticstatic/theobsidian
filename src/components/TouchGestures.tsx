import React, { useEffect, useState, useRef } from 'react';
import { triggerVibration, vibrationPatterns } from './MobileVibrations';

interface TouchGesturesProps {
  onSwipePattern: (pattern: string) => void;
  onMultiTouch: (touchCount: number) => void;
  onDoubleTap: () => void;
  onTripleTap: () => void;
}

const TouchGestures: React.FC<TouchGesturesProps> = ({
  onSwipePattern,
  onMultiTouch,
  onDoubleTap,
  onTripleTap
}) => {
  const [touchHistory, setTouchHistory] = useState<string[]>([]);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [startTouch, setStartTouch] = useState<{ x: number; y: number } | null>(null);
  const tapTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Handle multi-touch
      if (e.touches.length > 1) {
        onMultiTouch(e.touches.length);
        triggerVibration(vibrationPatterns.mysticalPulse);
        return;
      }

      // Only track single touches for swipe/tap detection
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const target = e.target as HTMLElement;
        
        // Don't track swipes on interactive elements or instructions modal
        if (target.tagName === 'BUTTON' || 
            target.tagName === 'A' || 
            target.closest('button, a, input, select, textarea, .contact-icon, .sigil-shen, .mobile-instructions')) {
          return;
        }
        
        setStartTouch({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      
      if (e.changedTouches.length === 1 && startTouch) {
        const touch = e.changedTouches[0];
        const target = e.target as HTMLElement;
        
        // Don't handle taps on interactive elements or instructions modal
        if (target.tagName === 'BUTTON' || 
            target.tagName === 'A' || 
            target.closest('button, a, input, select, textarea, .contact-icon, .sigil-shen, .mobile-instructions')) {
          setStartTouch(null);
          return;
        }

        const deltaX = touch.clientX - startTouch.x;
        const deltaY = touch.clientY - startTouch.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // If it's a tap (small movement)
        if (distance < 40) {
          // Handle multiple taps
          if (now - lastTapTime < 600) {
            setTapCount(prev => prev + 1);
          } else {
            setTapCount(1);
          }
          setLastTapTime(now);

          if (tapTimeoutRef.current) {
            clearTimeout(tapTimeoutRef.current);
          }

          tapTimeoutRef.current = setTimeout(() => {
            if (tapCount === 2) {
              onDoubleTap();
              triggerVibration(vibrationPatterns.secretReveal);
            } else if (tapCount === 3) {
              onTripleTap();
              triggerVibration(vibrationPatterns.cheatCode);
            }
            setTapCount(0);
          }, 600);
        } else if (distance > 80) {
          // It's a swipe - only if distance is significant
          let direction = '';
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? 'right' : 'left';
          } else {
            direction = deltaY > 0 ? 'down' : 'up';
          }

          setTouchHistory(prev => {
            const newHistory = [...prev, direction].slice(-4); // Keep last 4 swipes
            
            // Check for mystical patterns
            const historyString = newHistory.join('');
            if (historyString.includes('upupdowndown')) {
              onSwipePattern('konami-start');
            } else if (historyString.includes('leftright')) {
              onSwipePattern('hermetic-cross');
            } else if (historyString.includes('updownupdown')) {
              onSwipePattern('temporal-wave');
            } else if (historyString === 'rightleftdownup') {
              onSwipePattern('elemental-spiral');
            }

            return newHistory;
          });

          triggerVibration(vibrationPatterns.tap);
        }
      }

      setStartTouch(null);
    };

    // Use passive listeners to not interfere with scrolling
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, [startTouch, lastTapTime, tapCount, onSwipePattern, onMultiTouch, onDoubleTap, onTripleTap]);

  return null;
};

export default TouchGestures;