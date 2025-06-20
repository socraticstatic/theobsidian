import React from 'react';

// Mystical vibration patterns
export const vibrationPatterns = {
  tap: [10],
  longPress: [50, 30, 50],
  secretReveal: [100, 50, 100, 50, 200],
  cheatCode: [200, 100, 200, 100, 400],
  shake: [300, 100, 300],
  orientationChange: [150, 50, 150],
  error: [500],
  success: [100, 50, 100, 50, 100],
  mysticalPulse: [200, 100, 300, 100, 200, 100, 400],
  ancientAwakening: [500, 200, 500, 200, 1000]
};

export const triggerVibration = (pattern: number[] = [10]) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

const MobileVibrations: React.FC = () => {
  return null; // This is a utility component
};

export default MobileVibrations;