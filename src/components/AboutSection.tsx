import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="section about">
      <div className="container">
        <p className="about-text text-carved">
          A consultancy devoted to elegance and balance.
        </p>
        
        <div className="about-details">
          <span>⚹</span>
          <span style={{ margin: '0 1rem' }}>Est. During the Eternal Convergence</span>
          <span>⚹</span>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;