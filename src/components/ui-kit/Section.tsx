import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Section({
  id,
  eyebrow,
  title,
  children,
  tone = "dark",
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const text = tone === "light" ? "text-ink" : "text-lumen";
  const sub = tone === "light" ? "text-ink-soft" : "text-lumen-soft";
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 md:py-32 ${text} ${className}`}
    >
      {(eyebrow || title) && (
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12 md:mb-16"
        >
          {eyebrow && (
            <p className={`font-mono text-[11px] uppercase tracking-[0.35em] ${sub}`}>{eyebrow}</p>
          )}
          {title && <h2 className="mt-4 text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{title}</h2>}
        </motion.header>
      )}
      {children}
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
