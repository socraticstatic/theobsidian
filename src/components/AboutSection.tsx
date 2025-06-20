import React from 'react';
import { Circle } from 'lucide-react';

interface AboutSectionProps {
  scrollY: number;
  onLongPress: () => void;
  isMobile?: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollY, onLongPress, isMobile = false }) => {
  return (
    <section className="about-section">
      <div className="stone-texture"></div>
      <div 
        className="about-content"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          opacity: Math.max(0.3, 1 - (scrollY - 400) / 600)
        }}
      >
        <div className="about-inscription">
          <p className="about-text carved-deep">
            A consultancy devoted to elegant systems and silent influence.
          </p>
          <div className="inscription-details">
            <span className="detail-rune">⚹</span>
            <span className="detail-text">Est. Anno Domini Unknown</span>
            <span className="detail-rune">⚹</span>
          </div>
        </div>
        
        <div className="about-accent">
          <div className="accent-line"></div>
          <Circle className="accent-dot" />
          <div className="accent-line"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;