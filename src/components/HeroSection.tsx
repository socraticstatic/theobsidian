import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="section hero">
      <div className="container">
        <div className="hero-sigil pulse-glow">
          𓍶
        </div>
        
        <h1 className="hero-title text-carved fade-in">
          The Obsidian
        </h1>
        
        <p className="hero-subtitle slide-up">
          Invitation Only Design Agency
        </p>
        
        <div className="text-muted" style={{ fontSize: 'var(--text-sm)', letterSpacing: '0.2em' }}>
          ⵔⴱⵙⵉⴷⵉⴰⵏ
        </div>
      </div>
    </section>
  );
};

export default HeroSection;