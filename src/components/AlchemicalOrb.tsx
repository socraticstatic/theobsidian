import React, { useState, useEffect } from 'react';
import { getAlchemicalSymbols } from '../utils/esoteric';

interface AlchemicalOrbProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

const AlchemicalOrb: React.FC<AlchemicalOrbProps> = ({ position, className = '' }) => {
  const [alchemical, setAlchemical] = useState(getAlchemicalSymbols());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlchemical(getAlchemicalSymbols());
    }, 1000); // Update every second for smooth transitions

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`alchemical-orb ${position} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="alchemical-symbol">{alchemical.symbol}</div>
      {isHovered && (
        <div className="alchemical-tooltip">
          <div className="alchemical-name">{alchemical.name}</div>
          <div className="alchemical-meaning">{alchemical.meaning}</div>
        </div>
      )}
    </div>
  );
};

export default AlchemicalOrb;