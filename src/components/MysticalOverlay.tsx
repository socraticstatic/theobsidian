import React from 'react';
import { getLunarPhase, getRunicSequence } from '../utils/esoteric';

const MysticalOverlay: React.FC = () => {
  const lunarData = getLunarPhase();
  const runes = getRunicSequence();

  return (
    <>
      <div className="mystical-overlay">
        {/* Subtle mystical elements */}
      </div>
      
      <div className="lunar-phase" title={`${lunarData.name} - ${lunarData.illumination}% illuminated`}>
        {lunarData.symbol}
      </div>
      
      <div className="rune-sequence">
        {runes.slice(0, 3).map((rune, index) => (
          <span key={index} className="float-mystic" style={{ animationDelay: `${index * 0.5}s` }}>
            {rune}
          </span>
        ))}
      </div>
    </>
  );
};

export default MysticalOverlay;