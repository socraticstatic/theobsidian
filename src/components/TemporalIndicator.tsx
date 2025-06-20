import React, { useState, useEffect } from 'react';
import { getTemporalState, getAncientDates } from '../utils/esoteric';

interface TemporalIndicatorProps {
  className?: string;
}

const TemporalIndicator: React.FC<TemporalIndicatorProps> = ({ className = '' }) => {
  const [temporal, setTemporal] = useState(getTemporalState());
  const [ancientDates, setAncientDates] = useState(getAncientDates());
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTemporal(getTemporalState());
      setAncientDates(getAncientDates());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleLongPress = () => {
    setIsRevealed(true);
    setTimeout(() => setIsRevealed(false), 5000);
  };

  return (
    <div 
      className={`temporal-indicator ${temporal.isVeilThin ? 'veil-thin' : ''} ${temporal.isDarkHour ? 'dark-hour' : ''} ${className}`}
      onMouseDown={handleLongPress}
      onTouchStart={handleLongPress}
    >
      <div className="temporal-phase">{temporal.timePhase}</div>
      <div className="mystical-time">{temporal.mysticalTime}</div>
      <div className="planetary-hour">⨀ {temporal.planetaryHour}</div>
      
      {isRevealed && (
        <div className="ancient-dates-revelation">
          <div className="ancient-date mayan">{ancientDates.mayan}</div>
          <div className="ancient-date egyptian">{ancientDates.egyptian}</div>
          <div className="ancient-date celtic">{ancientDates.celtic}</div>
          <div className="ancient-date hebrew">{ancientDates.hebrew}</div>
          <div className="ancient-date chinese">{ancientDates.chinese}</div>
          <div className="numerology">Sacred Number: {temporal.numerology}</div>
        </div>
      )}
    </div>
  );
};

export default TemporalIndicator;