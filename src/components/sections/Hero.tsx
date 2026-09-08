import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiArrowDownRight, FiDownload, FiMail } from "react-icons/fi";
import { profile, roles } from "@/lib/portfolio-data";
import { Magnetic } from "@/components/ui-kit/Magnetic";
import { scrollToSection } from "@/hooks/useSmoothScroll";

function AiCore() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 40);
      my.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="relative mx-auto h-[260px] w-[260px] sm:h-[340px] sm:w-[340px]"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border"
          style={{
            inset: i * 26,
            borderColor: "color-mix(in oklab, var(--halo) 40%, transparent)",
            rotateX: 62 + i * 6,
            rotateZ: i * 30,
          }}
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: 16 + i * 8, repeat: Infinity, ease: "linear" }}
        />
      ))}

      <motion.span
        className="absolute inset-[30%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, var(--lumen) 0%, var(--halo) 38%, var(--halo-deep) 72%, transparent 78%)",
          filter: "blur(0.4px)",
        }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-[18%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--halo) 32%, transparent) 0%, transparent 70%)",
          filter: "blur(18px)",
        }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={`p-${i}`}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-halo"
          style={{ boxShadow: "0 0 8px var(--halo)" }}
          animate={{
            x: [0, Math.cos((i / 10) * Math.PI * 2) * 150],
            y: [0, Math.sin((i / 10) * Math.PI * 2) * 150],
            opacity: [0.9, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            delay: i * 0.32,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <motion.span
        key={roles[i]}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        className="whitespace-nowrap"
      >
        {roles[i]}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-5 pt-28 pb-20 text-ink sm:px-8"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.8 }}
        className="font-mono text-[11px] uppercase tracking-[0.4em] text-ink-soft"
      >
        {profile.location}
      </motion.p>

      <AiCore />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        className="-mt-6 text-center text-[19vw] leading-[0.85] tracking-[-0.04em] sm:text-[13vw] md:text-[11rem]"
      >
        {profile.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.9 }}
        className="mt-5 text-center text-lg text-ink-soft sm:text-xl"
      >
        <RoleRotator />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Magnetic>
          <button
            onClick={() => scrollToSection("projects")}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-lumen transition-shadow hover:shadow-[0_20px_50px_-20px_var(--halo-deep)]"
          >
            View Projects
            <FiArrowDownRight className="transition-transform group-hover:rotate-45" />
          </button>
        </Magnetic>
        <Magnetic>
          <a
            href="/ronak-resume.txt"
            download
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm text-ink transition-colors hover:bg-ink/5"
          >
            <FiDownload /> Download Resume
          </a>
        </Magnetic>
        <Magnetic>
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm text-ink transition-colors hover:bg-ink/5"
          >
            <FiMail /> Contact Me
          </button>
        </Magnetic>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.35em] text-ink-soft"
      >
        Scroll
      </motion.div>
    </section>
  );
}
