import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sections } from "@/lib/portfolio-data";
import { scrollToSection } from "@/hooks/useSmoothScroll";

export default function Navbar({ tone }: { tone: "light" | "dark" }) {
  const [active, setActive] = useState<string>("hero");
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.6, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const light = tone === "light";

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-[500] flex justify-center px-4"
    >
      <motion.div
        animate={{ marginTop: shrunk ? 10 : 20, scale: shrunk ? 0.96 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className={`flex w-full max-w-4xl items-center justify-between rounded-full ${
          light ? "glass-ink" : "glass"
        } px-4 py-2 sm:px-5`}
      >
        <button
          onClick={() => scrollToSection("hero")}
          className={`font-mono text-xs tracking-[0.35em] ${light ? "text-ink" : "text-lumen"}`}
          aria-label="Back to top"
        >
          RONAK
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => scrollToSection(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
                    light
                      ? isActive
                        ? "text-ink"
                        : "text-ink-soft hover:text-ink"
                      : isActive
                        ? "text-lumen"
                        : "text-lumen-soft hover:text-lumen"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: light
                          ? "color-mix(in oklab, var(--ink) 8%, transparent)"
                          : "color-mix(in oklab, var(--lumen) 14%, transparent)",
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className={`md:hidden rounded-full px-3 py-1.5 text-xs ${light ? "text-ink" : "text-lumen"}`}
        >
          {open ? "Close" : "Menu"}
        </button>
      </motion.div>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-20 w-[calc(100%-2rem)] rounded-3xl ${
            light ? "glass-ink" : "glass"
          } p-3 md:hidden`}
        >
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => {
                  setOpen(false);
                  scrollToSection(s.id);
                }}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm ${
                  light ? "text-ink" : "text-lumen"
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.nav>
  );
}
