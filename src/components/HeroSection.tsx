import React from 'react';
import { Circle, Hexagon, Triangle, Star, Minus } from 'lucide-react';

// Egyptian Shen Ring Symbol Component (Eternity/Protection/Completeness)
const EgyptianSymbol = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <div 
    className={className}
    onClick={onClick}
  >
    𓍶
  </div>
);

interface HeroSectionProps {
  showHidden: boolean;
  onSecretClick: (symbol: string) => void;
  deviceOrientation?: number;
  isMobile?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  showHidden, 
  onSecretClick, 
  deviceOrientation = 0,
  isMobile = false 
}) => {
  return (
    <section className="hero-section">
      <div className="obsidian-surface"></div>
      <div className="hero-content">
        <div className="sigil-constellation">
          <div className="primary-sigil">
            <EgyptianSymbol 
              className="sigil-shen" 
              onClick={() => onSecretClick('shen')}
            />
            <Circle className="sigil-ring" />
            <Hexagon className="sigil-outer" />
          </div>
          
          {/* Hidden Sigil Elements */}
          <Triangle 
            className="sigil-secret triangle" 
            onClick={() => onSecretClick('triangle')}
          />
          <Star 
            className="sigil-secret star" 
            onClick={() => onSecretClick('star')}
          />
          <Minus className="sigil-secret line" />
        </div>
        
        <h1 className="obsidian-title carved-text">
          <span className="title-fragment">THE</span>
          <span className="title-fragment">OBSIDIAN</span>
        </h1>
        
        <div className="subtitle-container">
          <p className="obsidian-subtitle carved-text">Invitation Only Agency</p>
          <div className="ancient-script">ⵔⴱⵙⵉⴷⵉⴰⵏ</div>
        </div>
        
        {showHidden && (
          <div className="hidden-revelation">
            <div className="codex-unlock">
              <div className="esoteric-glyph">◊ ⧫ ◉ ⧫ ◊</div>
              <p className="codex-text">INITIATE RECOGNIZED • ACCESS GRANTED</p>
              <div className="ancient-blessing">
                <span className="blessing-rune">ᛟ</span>
                <span className="blessing-text">The void acknowledges your presence</span>
                <span className="blessing-rune">ᛟ</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;