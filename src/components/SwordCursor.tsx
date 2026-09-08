import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Mode = "default" | "hover" | "magnet";

const TRAIL = 7;

export default function SwordCursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const [mode, setMode] = useState<Mode>("default");
  const [pressed, setPressed] = useState(false);
  const rafRef = useRef(0);

  const sx = useSpring(x, { stiffness: 900, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 40, mass: 0.35 });
  const lagX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.7 });
  const lagY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.7 });

  const angle = useTransform<number, number>([sx, sy, lagX, lagY], ([ax, ay, bx, by]) => {
    const dx = (ax as number) - (bx as number);
    const dy = (ay as number) - (by as number);
    const dist = Math.hypot(dx, dy);
    if (dist < 1.5) return -45;
    return (Math.atan2(dy, dx) * 180) / Math.PI - 90;
  });

  const stretch = useTransform<number, number>([sx, sy, lagX, lagY], ([ax, ay, bx, by]) => {
    const d = Math.hypot((ax as number) - (bx as number), (ay as number) - (by as number));
    return 1 + Math.min(d / 90, 0.9);
  });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      if (el?.closest("[data-cursor='magnet']")) setMode("magnet");
      else if (el?.closest("a, button, [data-cursor='hover']")) setMode("hover");
      else setMode("default");
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      cancelAnimationFrame(rafRef.current);
    };
  }, [x, y]);

  const scale = mode === "magnet" ? 1.5 : mode === "hover" ? 1.28 : 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden="true">
      {/* particle trail */}
      {Array.from({ length: TRAIL }).map((_, i) => (
        <TrailDot key={i} x={x} y={y} index={i} />
      ))}

      {/* halo */}
      <motion.div
        className="absolute left-0 top-0 rounded-full"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%",
          width: 64,
          height: 64,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--halo) 45%, transparent) 0%, transparent 68%)",
          filter: "blur(6px)",
        }}
        animate={{ scale: mode === "default" ? 1 : 1.55, opacity: pressed ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />

      {/* orbiting particles */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ width: 0, height: 0 }}
        >
          {[0, 120, 240].map((deg) => (
            <span
              key={deg}
              className="absolute block rounded-full bg-halo"
              style={{
                width: 3,
                height: 3,
                transform: `rotate(${deg}deg) translateX(${mode === "default" ? 20 : 30}px)`,
                boxShadow: "0 0 8px var(--halo)",
                transition: "transform 300ms cubic-bezier(.2,.8,.2,1)",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* the blade */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: sx, y: sy, rotate: angle, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: pressed ? scale * 0.86 : scale }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
      >
        <motion.svg
          width="30"
          height="46"
          viewBox="0 0 30 46"
          fill="none"
          style={{ scaleY: stretch, filter: "drop-shadow(0 0 8px var(--halo))" }}
        >
          <defs>
            <linearGradient id="blade" x1="15" y1="0" x2="15" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--lumen)" />
              <stop offset="1" stopColor="var(--halo)" />
            </linearGradient>
          </defs>
          <path d="M15 1 L20 12 L20 30 L15 36 L10 30 L10 12 Z" fill="url(#blade)" opacity="0.95" />
          <path d="M15 3 L15 34" stroke="var(--lumen)" strokeWidth="1" opacity="0.85" />
          <rect x="4" y="31" width="22" height="3" rx="1.5" fill="var(--halo)" opacity="0.9" />
          <rect x="13" y="34" width="4" height="9" rx="2" fill="var(--lumen-soft)" opacity="0.8" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

function TrailDot({
  x,
  y,
  index,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  index: number;
}) {
  const stiffness = 200 - index * 20;
  const tx = useSpring(x, { stiffness, damping: 20, mass: 0.6 + index * 0.12 });
  const ty = useSpring(y, { stiffness, damping: 20, mass: 0.6 + index * 0.12 });
  const size = 10 - index;
  return (
    <motion.span
      className="absolute left-0 top-0 rounded-full bg-halo"
      style={{
        x: tx,
        y: ty,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        opacity: 0.42 - index * 0.05,
        filter: `blur(${1 + index * 0.7}px)`,
      }}
    />
  );
}
