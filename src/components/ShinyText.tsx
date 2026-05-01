import React, { useEffect, useRef } from 'react';
import './shiny-text.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  disabled = false, 
  speed = 5,
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !elementRef.current) return;

    const element = elementRef.current;
    const shineStyle = element.style;
    let x = 0;

    const animate = () => {
      x = (x + speed) % 200;
      shineStyle.backgroundPosition = `${x}% center`;
      requestAnimationFrame(animate);
    };

    animate();
  }, [disabled, speed]);

  return (
    <div
      ref={elementRef}
      className={`shiny-text ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
