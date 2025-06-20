import React from 'react';

interface ObsidianCursorProps {
  mousePosition: { x: number; y: number };
}

const ObsidianCursor: React.FC<ObsidianCursorProps> = ({ mousePosition }) => {
  return (
    <div 
      className="obsidian-cursor"
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
      }}
    >
      <div className="cursor-core"></div>
      <div className="cursor-ring"></div>
    </div>
  );
};

export default ObsidianCursor;