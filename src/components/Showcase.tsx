import { useState, useEffect, useRef } from "react";
import { FiEye, FiExternalLink } from "react-icons/fi";
import "./Showcase.css";
const DURATION = 4000;

const items = [
  {
    title: "OpenClaw Gateway",
    desc: "Terminal-based system with real-time logs.",
    image: "/image.png",
     github: "https://github.com/your-repo",
    live: "https://your-site.com",
  },
  {
    title: "Django API",
    desc: "Scalable backend APIs with auth.",
    image: "/img1.jpg",
    github: "https://github.com/your-repo",
    live: "https://your-site.com",
  },
  {
    title: "Automation Tool",
    desc: "Python scripts to reduce manual work.",
    image: "/img2.jpg",
    github: "https://github.com/your-repo",
    live: "https://your-site.com",
  },
];

export default function Showcase() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(Date.now());

  const goTo = (index: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setActive(index);
      setProgress(0);
      startRef.current = Date.now();
      setFadeIn(true);
    }, 200);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= DURATION) {
        const next = (active + 1) % items.length;
        setFadeIn(false);
        setTimeout(() => {
          setActive(next);
          setProgress(0);
          startRef.current = Date.now();
          setFadeIn(true);
        }, 200);
      }
    }, 16);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const handleClick = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goTo(i);
  };
  useEffect(() => {
  startRef.current = Date.now();
  setProgress(0);
}, []);

  return (
    <section className="showcase-section">
      <h1 className="showcase-title">My Projects</h1>
      <div className="showcase-inner">
        <div className="showcase-left">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
            <button
  key={i}
  className={`showcase-item${isActive ? " showcase-item--active" : ""}`}
  onClick={() => handleClick(i)}
>
  <div className="showcase-progress-track">
    <div
      className="showcase-progress-bar"
      style={{
        height: isActive
          ? `${progress}%`
          : i < active
          ? "100%"
          : "0%",
      }}
    />
  </div>

  <div className="showcase-item-body">
    <h3 className="showcase-item-title">{item.title}</h3>
    <p className="showcase-item-desc">{item.desc}</p>
  </div>

  <div className="showcase-item-actions">
   <a href="#" className="icon-btn" target="_blank">
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.2-3.07-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.17.93-.26 1.93-.39 2.92-.39.99 0 1.99.13 2.92.39 2.22-1.48 3.2-1.17 3.2-1.17.63 1.65.23 2.87.11 3.17.75.8 1.2 1.82 1.2 3.07 0 4.41-2.68 5.39-5.24 5.67.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.8.56A11.51 11.51 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z"/>
    </svg>
  </a>
     <a href={item.github} className="icon-btn" target="_blank">
    <FiEye />
  </a>
 
  </div>
</button>
            );
          })}
   <div className="showcase-more">
    <a
    href="https://github.com/YOUR_USERNAME"
    target="_blank"
    className="more-btn"
  >
    

    More projects on GitHub
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="15"
      height="15"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.2-3.07-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.17.93-.26 1.93-.39 2.92-.39.99 0 1.99.13 2.92.39 2.22-1.48 3.2-1.17 3.2-1.17.63 1.65.23 2.87.11 3.17.75.8 1.2 1.82 1.2 3.07 0 4.41-2.68 5.39-5.24 5.67.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.8.56A11.51 11.51 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z"/>
    </svg>
  </a>
  </div>
</div>
       
        <div className="showcase-right">
          <div className={`showcase-image-wrap${fadeIn ? " showcase-fade-in" : " showcase-fade-out"}`}>
            <img
              src={items[active].image}
              alt={items[active].title}
              className="showcase-image"
            />
            <div className="showcase-image-overlay" />
          </div>
        </div>
      </div>
   
    </section>
    
  );
}
