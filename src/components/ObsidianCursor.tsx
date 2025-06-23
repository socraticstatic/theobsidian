import React, { useEffect, useState } from 'react';

const ObsidianCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (!isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div 
      className="obsidian-cursor"
      style={{
        left: mousePosition.x - 10,
        top: mousePosition.y - 10,
      }}
    />
  );
};

export default ObsidianCursor;