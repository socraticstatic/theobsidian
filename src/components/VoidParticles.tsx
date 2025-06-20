import React from 'react';

interface VoidParticlesProps {
  isMobile?: boolean;
}

const VoidParticles: React.FC<VoidParticlesProps> = ({ isMobile = false }) => {
  const particleCount = isMobile ? 3 : 5; // Fewer particles on mobile for performance

  return (
    <div className={`void-particles ${isMobile ? 'mobile-particles' : ''}`}>
      {Array.from({ length: particleCount }, (_, i) => (
        <div key={i} className="particle"></div>
      ))}
    </div>
  );
};

export default VoidParticles;