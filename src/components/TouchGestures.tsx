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
      if (e.touches.length > 1) {
        onMultiTouch(e.touches.length);
        triggerVibration(vibrationPatterns.mysticalPulse);
      }

      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setStartTouch({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      
      if (e.changedTouches.length === 1 && startTouch) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - startTouch.x;
        const deltaY = touch.clientY - startTouch.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // If it's a tap (small movement)
        if (distance < 30) {
          // Handle multiple taps
          if (now - lastTapTime < 500) {
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
          }, 500);
        } else {
          // It's a swipe
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