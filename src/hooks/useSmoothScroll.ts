import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState } from "@/lib/scroll-store";

let lenisInstance: Lenis | null = null;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -10, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onScroll = ({ progress, velocity }: { progress: number; velocity: number }) => {
      scrollState.progress = progress;
      scrollState.velocity = velocity;
    };
    lenis.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}
