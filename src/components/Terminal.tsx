import { useEffect, useState, useRef } from "react";

interface Segment {
  text: string;
  className?: string;
}

interface Line {
  parts: Segment[];
}

const lines: Line[] = [
  {
    parts: [
      { text: "🦞 OpenClaw 2026.4.21 ", className: "orange" },
      { text: "(f788c88) — Welcome to the command line: where dreams compile and confidence segfaults.", className: "blue" }
    ]
  },

{
  parts: [{ text: "│", className: "dim" }]
},
{
  parts: [{ text: "⯁", className: "diamond" }]
},

  {
    parts: [
      { text: "19:02:01 ", className: "dim" },
      { text: "[gateway] ", className: "blue" },
      { text: "loading configuration…", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:01 ", className: "dim" },
      { text: "[gateway] ", className: "blue" },
      { text: "resolving authentication…", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:01 ", className: "dim" },
      { text: "[gateway] ", className: "blue" },
      { text: "starting...", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[gateway] ", className: "blue" },
      { text: "starting HTTP server...", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[canvas] ", className: "purple" },
      { text: "host mounted at http://127.0.0.1:18789/__openclaw__/canvas/", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[health-monitor] ", className: "tag-green" },
      { text: "started (interval: 300s, startup-grace: 60s, channel-connect-grace: 120s)", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[gateway] ", className: "blue" },
      { text: "agent model: openai/gpt-5.4", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[gateway] ", className: "blue" },
      { text: "ready (5 plugins: acpx, browser, device-pair, phone-control, talk-voice; 13.0s)", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[gateway] ", className: "blue" },
      { text: "log file:", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[heartbeat] ", className: "pink" },
      { text: "started", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[gateway] ", className: "blue" },
      { text: "starting channels and sidecars...", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:14 ", className: "dim" },
      { text: "[plugins] ", className: "pink" },
      { text: "embedded acpx runtime backend registered", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:15 ", className: "dim" },
      { text: "[browser/server] ", className: "purple" },
      { text: "Browser control listening on http://127.0.0.1:18791/ (auth=token)", className: "blue" }
    ]
  },

  {
    parts: [
      { text: "19:02:17 ", className: "dim" },
      { text: "[plugins] ", className: "pink" },
      { text: "embedded acpx runtime backend ready", className: "blue" }
    ]
  }
];
export default function Terminal() {
  const [index, setIndex] = useState(0);

 useEffect(() => {
  let i = 0;

  const interval = setInterval(() => {
    setIndex((prev) => {
      if (prev >= lines.length) {
        clearInterval(interval);   
        return prev;
      }
      return prev + 1;
    });
  }, 500);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  if (contentRef.current) {
    contentRef.current.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
}, [index]);
const contentRef = useRef<HTMLDivElement | null>(null);

  const visible = lines.slice(0, index);

  return (
   <div className="terminal">
    <div className="terminal-bar">
      <span className="dot red"></span>
      <span className="dot yellow"></span>
      <span className="dot green"></span>
    </div>

    <div className="terminal-content" ref={contentRef}>
      {visible.map((line, i) => (
        <p key={i}>
          {line.parts.map((part, j) => (
            <span key={j} className={part.className}>
              {part.text}
            </span>
          ))}
        </p>
      ))}
    </div>
  </div>
  );
}