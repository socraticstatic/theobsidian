import React, { useEffect, useState } from 'react';
import LunarPhase from './LunarPhase';
import AlchemicalOrb from './AlchemicalOrb';
import TemporalIndicator from './TemporalIndicator';
import SacredGeometry from './SacredGeometry';
import { 
  getRunicSequence, 
  getHermeticSymbol, 
  getCosmicCoordinates, 
  getGeometricConstants, 
  getAstralPositions, 
  getUniversalConstants 
} from '../utils/esoteric';

interface EsotericOverlayProps {
  cheatCodeActive: string;
}

const EsotericOverlay: React.FC<EsotericOverlayProps> = ({ cheatCodeActive }) => {
  const [runicSequence, setRunicSequence] = useState(getRunicSequence());
  const [hermeticSymbol, setHermeticSymbol] = useState(getHermeticSymbol());
  const [cosmicCoords, setCosmicCoords] = useState(getCosmicCoordinates());
  const [geometricConsts, setGeometricConsts] = useState(getGeometricConstants());
  const [astralPos, setAstralPos] = useState(getAstralPositions());
  const [universalConsts, setUniversalConsts] = useState(getUniversalConstants());

  // Update all esoteric elements
  useEffect(() => {
    const interval = setInterval(() => {
      setRunicSequence(getRunicSequence());
      setHermeticSymbol(getHermeticSymbol());
      setCosmicCoords(getCosmicCoordinates());
      setGeometricConsts(getGeometricConstants());
      setAstralPos(getAstralPositions());
      setUniversalConsts(getUniversalConstants());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="esoteric-overlay">
      <div className="rune-sequence">
        {runicSequence.map((rune, index) => (
          <span key={index} className="rune">{rune}</span>
        ))}
      </div>
      
      {/* Hermetic Symbol */}
      <div className="hermetic-symbol" title={`${hermeticSymbol.name}: ${hermeticSymbol.meaning}`}>
        {hermeticSymbol.symbol}
      </div>
      
      {/* Cosmic Coordinates - Galactic Position */}
      <div className="cosmic-coordinates" title="Current Galactic Position">
        <div className="galactic-coords">{cosmicCoords.galactic}</div>
        <div className="stellar-position">{cosmicCoords.stellar}</div>
        <div className="cosmic-time">{cosmicCoords.cosmic}</div>
      </div>
      
      {/* Geometric Constants - Mathematical Significance */}
      <div className="geometric-constants" title="Today's Mathematical Significance">
        <div className="fibonacci-today">{geometricConsts.fibonacci}</div>
        <div className="golden-ratio-date">{geometricConsts.goldenRatio}</div>
        <div className="prime-factorization">{geometricConsts.primeFactor}</div>
        <div className="pi-sequence">{geometricConsts.piSequence}</div>
      </div>
      
      {/* Astral Positions - Current Sky */}
      <div className="astral-positions" title="Current Celestial Positions">
        <div className="zodiac-current">{astralPos.zodiac}</div>
        <div className="planetary-alignment">{astralPos.planetary}</div>
        <div className="constellation-rising">{astralPos.constellation}</div>
        <div className="galactic-center">{astralPos.galacticCenter}</div>
      </div>
      
      {/* Universal Constants - Cosmic Significance */}
      <div className="universal-constants" title="Universal Constants Today">
        <div className="planck-today">{universalConsts.planck}</div>
        <div className="light-speed-date">{universalConsts.lightSpeed}</div>
        <div className="hubble-constant">{universalConsts.hubble}</div>
        <div className="cosmic-age">{universalConsts.cosmicAge}</div>
      </div>
      
      {/* Cheat Code Indicator */}
      {cheatCodeActive && (
        <div className="cheat-code-indicator">
          <div className="cheat-text">CHEAT ACTIVATED: {cheatCodeActive.toUpperCase()}</div>
        </div>
      )}
      
      {/* Lunar Phase Indicator */}
      <LunarPhase className="lunar-indicator" />
      
      {/* Temporal Mysteries */}
      <TemporalIndicator className="temporal-mystery" />
      
      {/* Alchemical Orbs */}
      <AlchemicalOrb position="top-left" />
      <AlchemicalOrb position="top-right" />
      <AlchemicalOrb position="bottom-left" />
      <AlchemicalOrb position="bottom-right" />
      
      {/* Sacred Geometry Background */}
      <SacredGeometry className="sacred-bg-1" />
      <SacredGeometry className="sacred-bg-2" />
      <SacredGeometry className="sacred-bg-3" />
      <SacredGeometry className="sacred-bg-4" />
      <SacredGeometry className="sacred-bg-5" />
    </div>
  );
};

export default EsotericOverlay;