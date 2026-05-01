import React from 'react';
import { SiPython, SiDjango, SiPostgresql, SiJupyter, SiNextdotjs } from 'react-icons/si';
import './logo-loop.css';

interface LogoItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface LogoLoopProps {
  speed?: number;
  className?: string;
}

const defaultLogos: LogoItem[] = [
  { name: 'Python', icon: <SiPython />, color: '#3776ab' },
  { name: 'Django', icon: <SiDjango />, color: '#092E20' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
  { name: 'Jupyter', icon: <SiJupyter />, color: '#F37726' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
];

export const LogoLoop: React.FC<LogoLoopProps> = ({ 
  speed = 30,
  className = ''
}) => {
  return (
    <div className={`logo-loop ${className}`}>
      <div 
        className="logo-loop-track" 
        style={{
          animation: `scroll ${speed}s linear infinite`
        }}
      >
        {[...defaultLogos, ...defaultLogos, ...defaultLogos  ].map((logo, index) => (
          <div key={index} className="logo-item">
            <div className="logo-icon" style={{ color: logo.color }}>
              {logo.icon}
            </div>
            <span>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
