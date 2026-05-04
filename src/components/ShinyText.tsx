import "./ShinyText.css";

interface ShinyTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: "left" | "right";
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = "",
}: ShinyTextProps) {
  const style = {
    "--shiny-color": color,
    "--shine-color": shineColor,
    "--spread": `${spread}px`,
    "--speed": `${speed}s`,
    "--delay": `${delay}s`,
    "--play-dir": direction === "left" ? "normal" : "reverse",
    "--timing": yoyo ? "ease-in-out" : "linear",
    "--iter": yoyo ? "infinite" : "infinite",
    "--anim-dir": yoyo ? "alternate" : "normal",
  } as React.CSSProperties;

  return (
    <span
      className={[
        "shiny-text",
        disabled ? "shiny-text--off" : "",
        pauseOnHover ? "shiny-text--pause-hover" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {text}
    </span>
  );
}
