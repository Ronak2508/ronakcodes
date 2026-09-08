import { useEffect, useRef } from "react";
import gsap from "gsap";
import { scrollState } from "@/lib/scroll-store";

export default function ScrollRail({ tone }: { tone: "light" | "dark" }) {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      const p = scrollState.progress
        ? scrollState.progress
        : window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      gsap.to(bar.current, { scaleY: p, duration: 0.6, ease: "power3.out", overwrite: true });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-4 top-1/2 z-[400] hidden h-40 w-px -translate-y-1/2 lg:block"
      style={{
        background:
          tone === "light"
            ? "color-mix(in oklab, var(--ink) 14%, transparent)"
            : "color-mix(in oklab, var(--lumen) 18%, transparent)",
      }}
      aria-hidden="true"
    >
      <span
        ref={bar}
        className="block h-full w-full origin-top bg-halo"
        style={{ transform: "scaleY(0)", boxShadow: "0 0 12px var(--halo)" }}
      />
    </div>
  );
}
