import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DIAGNOSTICS = [
  "Initializing neural core",
  "Calibrating star charts",
  "Spooling particle field",
  "Aligning nebula shaders",
  "Engaging ion engines",
  "Systems nominal",
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2600;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 480);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const step = Math.min(DIAGNOSTICS.length - 1, Math.floor((progress / 100) * DIAGNOSTICS.length));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: "oklch(0.09 0.02 265)" }}
          exit={{ opacity: 0, filter: "blur(14px)", scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
          role="status"
          aria-live="polite"
          aria-label={`Loading ${progress} percent`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex h-40 w-40 items-center justify-center"
          >
            <motion.span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "color-mix(in oklab, var(--halo) 45%, transparent)" }}
              animate={{ rotate: 360, scale: [1, 1.06, 1] }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.span
              className="absolute inset-5 rounded-full border border-dashed"
              style={{ borderColor: "color-mix(in oklab, var(--lumen) 30%, transparent)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="absolute inset-12 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--lumen) 0%, var(--halo) 45%, transparent 72%)",
              }}
              animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative font-mono text-sm tracking-[0.3em] text-lumen">RK</span>
          </motion.div>

          <div className="mt-12 w-[min(78vw,420px)]">
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-lumen-soft">
              <span>{DIAGNOSTICS[step]}</span>
              <span className="text-lumen">{progress}%</span>
            </div>
            <div className="mt-3 h-px w-full overflow-hidden bg-lumen/15">
              <motion.div
                className="h-full bg-halo"
                style={{ width: `${progress}%`, boxShadow: "0 0 14px var(--halo)" }}
              />
            </div>
            <div className="mt-4 grid grid-cols-6 gap-1">
              {DIAGNOSTICS.map((d, i) => (
                <span
                  key={d}
                  className="h-[3px] rounded-full transition-colors duration-500"
                  style={{
                    background:
                      i <= step
                        ? "var(--halo)"
                        : "color-mix(in oklab, var(--lumen) 14%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
