import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills, type Skill } from "@/lib/portfolio-data";
import { Section } from "@/components/ui-kit/Section";

function PlanetOrb({ skill, onSelect }: { skill: Skill; onSelect: (s: Skill | null) => void }) {
  const [hover, setHover] = useState(false);
  const d = 108 * skill.size;

  return (
    <div
      className="relative flex items-center justify-center"
      onPointerEnter={() => {
        setHover(true);
        onSelect(skill);
      }}
      onPointerLeave={() => {
        setHover(false);
        onSelect(null);
      }}
      data-cursor="magnet"
    >
      <motion.button
        className="relative rounded-full focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-halo"
        style={{ width: d, height: d }}
        animate={{
          y: [0, -12, 0],
          scale: hover ? 1.09 : 1,
        }}
        transition={{
          y: { duration: 6 + skill.orbit, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 240, damping: 18 },
        }}
        onFocus={() => onSelect(skill)}
        onBlur={() => onSelect(null)}
        aria-label={`${skill.name}: ${skill.description}`}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 32% 28%, color-mix(in oklab, ${skill.hue} 85%, white) 0%, ${skill.hue} 45%, oklch(0.22 0.05 265) 100%)`,
            boxShadow: `0 0 ${hover ? 60 : 30}px color-mix(in oklab, ${skill.hue} 55%, transparent)`,
            transition: "box-shadow 400ms ease",
          }}
        />
        <motion.span
          className="absolute rounded-full border"
          style={{
            inset: -14,
            borderColor: `color-mix(in oklab, ${skill.hue} 40%, transparent)`,
            rotateX: 70,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12 / skill.speed, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
            style={{ background: skill.hue, boxShadow: `0 0 10px ${skill.hue}` }}
          />
        </motion.span>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-lumen">
          {skill.name}
        </span>
      </motion.button>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<Skill | null>(null);

  return (
    <Section id="skills" eyebrow="02 — Capabilities" title="Skills, in orbit.">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-14 py-6">
          {skills.map((s) => (
            <PlanetOrb key={s.name} skill={s} onSelect={setActive} />
          ))}
        </div>

        <div className="min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active?.name ?? "idle"}
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="glass rounded-3xl p-7"
            >
              {active ? (
                <>
                  <h3 className="text-2xl text-lumen">{active.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-lumen-soft">
                    {active.description}
                  </p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-lumen-soft">Experience</dt>
                      <dd className="text-lumen">{active.experience}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-lumen-soft">Projects</dt>
                      <dd className="text-lumen">{active.projects}</dd>
                    </div>
                  </dl>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {active.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-lumen/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-lumen-soft"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-lumen-soft">
                  Hover a planet to scan it
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
