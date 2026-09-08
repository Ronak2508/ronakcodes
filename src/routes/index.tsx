import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { profile } from "@/lib/portfolio-data";
import { setPointer, scrollState } from "@/lib/scroll-store";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useHydrated, useIsCoarsePointer, usePrefersReducedMotion } from "@/hooks/useHydrated";

import BootSequence from "@/components/BootSequence";
import Navbar from "@/components/Navbar";
import ScrollRail from "@/components/ScrollRail";
import SwordCursor from "@/components/SwordCursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const SpaceScene = lazy(() => import("@/components/space/SpaceScene"));

const description =
  "Ronak — AI Engineer, learner and B.Tech CSE (AI & ML) student from Palwal, Haryana. A cinematic, WebGL portfolio of projects, skills and experience.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ronak — AI Engineer & CSE (AI/ML) Student Portfolio" },
      { name: "description", content: description },
      { property: "og:title", content: "Ronak — AI Engineer & CSE (AI/ML) Student Portfolio" },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ronak — AI Engineer Portfolio" },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Ronak",
          jobTitle: "AI Engineer",
          email: `mailto:${profile.email}`,
          telephone: profile.phone,
          url: "/",
          sameAs: [profile.linkedin],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Palwal",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "JECRC University, NCR Campus, Alwar",
          },
        }),
      },
    ],
  }),
});

/** Hero white -> light grey -> blue -> dark blue -> deep space -> galaxy black */
const STOPS = [0, 0.16, 0.34, 0.55, 0.78, 1];
const BACKDROP = [
  "oklch(0.99 0.002 250)",
  "oklch(0.93 0.008 250)",
  "oklch(0.62 0.11 250)",
  "oklch(0.36 0.09 258)",
  "oklch(0.19 0.05 265)",
  "oklch(0.07 0.02 268)",
];

function Index() {
  const hydrated = useHydrated();
  const reduced = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();
  const [booted, setBooted] = useState(false);

  useSmoothScroll(hydrated && !reduced);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const backdrop = useTransform(smooth, STOPS, BACKDROP);
  const sceneOpacity = useTransform(smooth, [0, 0.2, 0.45, 1], [0.18, 0.45, 0.85, 1]);
  const [tone, setTone] = useState<"light" | "dark">("light");

  useMotionValueEvent(smooth, "change", (v) => {
    scrollState.progress = v;
    setTone(v > 0.24 ? "dark" : "light");
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (!hydrated || coarse) return;
    document.documentElement.classList.add("no-cursor");
    return () => document.documentElement.classList.remove("no-cursor");
  }, [hydrated, coarse]);

  return (
    <>
      {hydrated && !reduced && !booted && <BootSequence onDone={() => setBooted(true)} />}

      {/* living backdrop */}
      <motion.div
        className="fixed inset-0 -z-20"
        style={{ backgroundColor: backdrop }}
        aria-hidden="true"
      />
      <motion.div className="fixed inset-0 -z-10" style={{ opacity: sceneOpacity }} aria-hidden="true">
        {hydrated && !reduced && (
          <Suspense fallback={null}>
            <SpaceScene quality={coarse ? 0.5 : 1} />
          </Suspense>
        )}
      </motion.div>
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 110%, color-mix(in oklab, var(--halo-deep) 22%, transparent) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {hydrated && !coarse && <SwordCursor />}

      <Navbar tone={tone} />
      <ScrollRail tone={tone} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
