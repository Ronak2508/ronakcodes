import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/lib/portfolio-data";
import { Section } from "@/components/ui-kit/Section";
import { TiltCard } from "@/components/ui-kit/Magnetic";

const [featured, ...rest] = projects;

function Chips({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li
          key={t}
          className="rounded-full border border-lumen/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-lumen-soft"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function Links({ github, demo }: { github: string; demo: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={github}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-2 rounded-full border border-lumen/25 px-4 py-2 text-xs text-lumen transition-colors hover:bg-lumen/10"
      >
        <FiGithub /> GitHub
      </a>
      <a
        href={demo}
        className="inline-flex items-center gap-2 rounded-full bg-lumen/90 px-4 py-2 text-xs text-ink transition-transform hover:-translate-y-0.5"
      >
        Live Demo <FiArrowUpRight />
      </a>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="03 — Work" title="Things I've built.">
      <TiltCard intensity={5} className="glass breathe overflow-hidden rounded-[28px]">
        <div className="grid gap-8 p-8 md:grid-cols-[1fr_0.85fr] md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-halo/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-halo">
              Featured
            </span>
            <h3 className="mt-5 text-4xl leading-tight text-lumen sm:text-5xl">{featured.title}</h3>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-lumen-soft">
              {featured.summary}
            </p>
            <Chips tags={featured.tags} />
            <Links github={featured.github} demo={featured.demo} />
          </div>

          <motion.div
            className="relative min-h-[220px] overflow-hidden rounded-2xl border border-lumen/15"
            style={{
              background:
                "radial-gradient(120% 100% at 20% 0%, color-mix(in oklab, var(--halo) 35%, transparent) 0%, transparent 60%), linear-gradient(160deg, oklch(0.22 0.05 265), oklch(0.12 0.03 265))",
            }}
            animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="h-28 w-28 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, var(--lumen) 0%, var(--halo) 45%, transparent 72%)",
                }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.28em] text-lumen-soft">
              {featured.year}
            </p>
          </motion.div>
        </div>
      </TiltCard>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {rest.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <TiltCard className="glass h-full rounded-3xl p-7 transition-shadow hover:shadow-[0_40px_80px_-40px_var(--halo-deep)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lumen-soft">
                {p.year}
              </p>
              <h3 className="mt-3 text-2xl text-lumen">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-lumen-soft">{p.summary}</p>
              <Chips tags={p.tags} />
              <Links github={p.github} demo={p.demo} />
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
