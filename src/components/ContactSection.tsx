import React from 'react';
import { Hexagon } from 'lucide-react';

interface ContactSectionProps {
  isHexagonSpinning: boolean;
  onHexagonMouseDown: () => void;
  isMobile?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ 
  isHexagonSpinning, 
  onHexagonMouseDown,
  isMobile = false
}) => {
  return (
    <section className="contact-section">
      <div className="void-shimmer"></div>
      <div className="contact-content">
        <div className="contact-inscription">
          <p className="contact-text carved-text">
            To inquire within, transmit coordinates to{' '}
            <span className="contact-email">obsidian@conscious-shell.com</span>
          </p>
          <div className="contact-warning">
            <span className="warning-glyph">⚠</span>
            <span className="warning-text">Unsolicited transmissions will be consumed by the void</span>
            <span className="warning-glyph">⚠</span>
          </div>
        </div>
        
        <div className="contact-sigil">
          <Hexagon 
            className={`contact-icon ${isHexagonSpinning ? 'spinning' : ''}`}
            onMouseDown={onHexagonMouseDown}
            onTouchStart={onHexagonMouseDown}
          />
          <div className="sigil-reflection"></div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;