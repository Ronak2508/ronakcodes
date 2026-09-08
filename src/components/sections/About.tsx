import { motion } from "framer-motion";
import { profile, stats, timeline } from "@/lib/portfolio-data";
import { Reveal, Section } from "@/components/ui-kit/Section";
import { TiltCard } from "@/components/ui-kit/Magnetic";

export default function About() {
  return (
    <Section id="about" tone="light" eyebrow="01 — Identity" title="A student, building in public.">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <TiltCard intensity={4} className="glass-ink rounded-3xl p-7 sm:p-10">
          <div className="space-y-5 text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-2xl border border-ink/10 p-4">
                  <p className="font-display text-2xl text-ink">{s.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </TiltCard>

        <div className="relative space-y-4">
          <span
            className="absolute left-[11px] top-4 bottom-4 w-px"
            style={{ background: "color-mix(in oklab, var(--ink) 14%, transparent)" }}
            aria-hidden="true"
          />
          {timeline.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0, x: 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative pl-9"
            >
              <motion.span
                className="absolute left-0 top-5 h-[22px] w-[22px] rounded-full border border-ink/20 bg-background"
                whileHover={{ scale: 1.2 }}
                aria-hidden="true"
              >
                <span className="absolute inset-[6px] rounded-full bg-primary" />
              </motion.span>
              <div className="glass-ink rounded-2xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                  {t.year}
                </p>
                <h3 className="mt-2 text-xl text-ink">{t.title}</h3>
                <p className="text-sm text-ink-soft">{t.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
