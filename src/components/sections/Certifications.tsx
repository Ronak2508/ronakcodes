import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { certifications } from "@/lib/portfolio-data";
import { Section } from "@/components/ui-kit/Section";
import { TiltCard } from "@/components/ui-kit/Magnetic";

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="05 — Credentials" title="Certifications.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 36, rotateX: -8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <TiltCard className="glass group h-full rounded-3xl p-6">
              <motion.span
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-lumen/20 text-halo"
                whileHover={{ rotate: 180 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
              >
                <FiAward />
              </motion.span>
              <h3 className="mt-5 text-lg leading-snug text-lumen">{c.title}</h3>
              <p className="mt-2 text-sm text-lumen-soft">{c.issuer}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-lumen-soft">
                {c.year}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
