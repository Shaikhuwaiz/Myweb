import React, { useEffect, useState } from 'react';
import './staggered-text.css';

interface StaggeredTextProps {
  text: string;
  delay?: number;
  className?: string;
  animationDuration?: number;
}

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  delay = 0.08,
  className = '',
  animationDuration = 0.8,
}) => {
  const letters = text.split('');

  return (
    <div className={`staggered-text ${className}`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="staggered-letter"
          style={{
            animationDelay: `${index * delay}s`,
            '--animation-duration': `${animationDuration}s`,
          } as React.CSSProperties & { '--animation-duration': string }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default StaggeredText;
