import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/lib/portfolio-data";
import { scrollToSection } from "@/hooks/useSmoothScroll";

const CONSTELLATION = [
  [12, 30],
  [24, 18],
  [37, 40],
  [52, 22],
  [66, 46],
  [79, 26],
  [90, 38],
];

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-10 text-lumen sm:px-8">
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-32 w-full opacity-60"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points={CONSTELLATION.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="var(--halo)"
          strokeWidth="0.15"
          opacity="0.6"
        />
        {CONSTELLATION.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="0.55"
            fill="var(--lumen)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.28 }}
          />
        ))}
      </svg>

      <div className="glass relative flex flex-col items-center gap-6 rounded-[28px] px-6 py-10 text-center">
        <h2 className="text-3xl sm:text-4xl">Still just getting started.</h2>
        <p className="max-w-md text-sm text-lumen-soft">
          {profile.tagline} — based in {profile.location}.
        </p>
        <div className="flex items-center gap-3">
          <IconLink href={profile.linkedin} label="LinkedIn">
            <FiLinkedin />
          </IconLink>
          <IconLink href={`mailto:${profile.email}`} label="Email">
            <FiMail />
          </IconLink>
          <IconLink href={profile.github} label="GitHub">
            <FiGithub />
          </IconLink>
        </div>
        <button
          onClick={() => scrollToSection("hero")}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-lumen-soft transition-colors hover:text-lumen"
        >
          Back to orbit ↑
        </button>
      </div>

      <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-lumen-soft">
        © {new Date().getFullYear()} Ronak — Built in deep space
      </p>
    </footer>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer noopener"
      aria-label={label}
      whileHover={{ y: -4, rotate: 8, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 320, damping: 16 }}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-lumen/20 text-lumen transition-colors hover:border-halo hover:text-halo"
    >
      {children}
    </motion.a>
  );
}
