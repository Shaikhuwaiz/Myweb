import { useState, useEffect, useRef } from "react";

const DURATION = 4000;

const items = [
  {
    title: "OpenClaw Gateway",
    desc: "Terminal-based system with real-time logs.",
    image: "/image.png",
  },
  {
    title: "Django API",
    desc: "Scalable backend APIs with auth.",
    image: "/img1.jpg",
  },
  {
    title: "Automation Tool",
    desc: "Python scripts to reduce manual work.",
    image: "/img2.jpg",
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

  return (
    <section className="showcase-section">
      <div className="showcase-inner">
        {/* Left panel */}
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
                    style={{ height: isActive ? `${progress}%` : i < active ? "100%" : "0%" }}
                  />
                </div>
                <div className="showcase-item-body">
                  <h3 className="showcase-item-title">{item.title}</h3>
                  <p className="showcase-item-desc">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right panel */}
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
