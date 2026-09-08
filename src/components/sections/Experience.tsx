import { motion } from "framer-motion";
import { experience } from "@/lib/portfolio-data";
import { Section } from "@/components/ui-kit/Section";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="04 — Trajectory" title="Where I am on the map.">
      <div className="relative">
        <span
          className="absolute left-3 top-2 bottom-2 w-px md:left-1/2"
          style={{ background: "color-mix(in oklab, var(--lumen) 18%, transparent)" }}
          aria-hidden="true"
        />
        <ol className="space-y-8">
          {experience.map((e, i) => (
            <motion.li
              key={e.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className={`relative pl-10 md:w-1/2 md:pl-0 ${
                i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
              }`}
            >
              <motion.span
                className="absolute left-0 top-6 h-[14px] w-[14px] rounded-full bg-halo md:left-auto"
                style={{
                  boxShadow: "0 0 18px var(--halo)",
                  ...(i % 2 ? { left: -7 } : { right: -7 }),
                }}
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.4 }}
                aria-hidden="true"
              />
              <div className="glass rounded-3xl p-6 sm:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lumen-soft">
                  {e.period}
                </p>
                <h3 className="mt-2 text-2xl text-lumen">{e.role}</h3>
                <p className="text-sm text-halo">{e.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-lumen-soft">{e.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
