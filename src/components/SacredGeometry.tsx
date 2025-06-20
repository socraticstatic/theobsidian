import React, { useState, useEffect } from 'react';
import { getSacredGeometry } from '../utils/esoteric';

interface SacredGeometryProps {
  className?: string;
}

const SacredGeometry: React.FC<SacredGeometryProps> = ({ className = '' }) => {
  const [geometry, setGeometry] = useState(getSacredGeometry());

  useEffect(() => {
    const interval = setInterval(() => {
      setGeometry(getSacredGeometry());
    }, 100); // Smooth rotation updates

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`sacred-geometry ${className}`}>
      <div 
        className="geometry-pattern"
        style={{ transform: `rotate(${geometry.rotation}deg)` }}
      >
        {geometry.pattern}
      </div>
    </div>
  );
};

export default SacredGeometry;