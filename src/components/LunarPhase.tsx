import React, { useState, useEffect } from 'react';
import { getLunarPhase } from '../utils/esoteric';

interface LunarPhaseProps {
  className?: string;
}

const LunarPhase: React.FC<LunarPhaseProps> = ({ className = '' }) => {
  const [lunarData, setLunarData] = useState(getLunarPhase());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLunarData(getLunarPhase());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`lunar-phase ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="lunar-symbol">{lunarData.symbol}</div>
      {isHovered && (
        <div className="lunar-tooltip">
          <div className="lunar-name">{lunarData.name}</div>
          <div className="lunar-phase-text">{lunarData.phase.replace('-', ' ')}</div>
          <div className="lunar-illumination">{lunarData.illumination}% illuminated</div>
        </div>
      )}
    </div>
  );
};

export default LunarPhase;