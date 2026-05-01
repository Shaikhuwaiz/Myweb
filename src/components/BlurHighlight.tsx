import React, { useEffect, useState } from "react";

interface BlurHighlightProps {
  text: string;
  highlights?: string[];
}

export default function BlurHighlight({
  text,
  highlights = [],
}: BlurHighlightProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const words = text.split(" ");

  return (
    <p className={`blur-text ${visible ? "visible" : ""}`}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,]/g, "");
        const isHighlight = highlights.includes(clean);

        return (
          <span
            key={i}
            className={isHighlight ? "highlight" : ""}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}
