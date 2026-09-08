export const profile = {
  name: "RONAK",
  tagline: "AI Engineer · Learner · Student",
  email: "R.ronak252008@gmail.com",
  phone: "9034954397",
  location: "Palwal, Haryana, India",
  linkedin: "https://linkedin.com/in/ronak-b62b47434",
  github: "https://github.com/",
  bio: [
    "Hey, myself Ronak. I'm from Palwal, Haryana.",
    "I'm pursuing a Bachelor of Technology in Computer Science & Engineering with a specialization in Artificial Intelligence & Machine Learning.",
    "I like taking things apart until I understand them — models, systems, ideas. Right now I'm building the fundamentals that serious engineering is made of.",
  ],
} as const;

export const roles = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
] as const;

export const stats = [
  { value: "2026", label: "Journey begins" },
  { value: "AI & ML", label: "Specialization" },
  { value: "B.Tech", label: "CSE Program" },
  { value: "∞", label: "Curiosity" },
] as const;

export const timeline = [
  {
    year: "2026 — 2030",
    title: "B.Tech CSE (AI & ML)",
    org: "JECRC University, NCR Campus, Alwar",
    body: "Four-year engineering program specializing in artificial intelligence and machine learning.",
  },
  {
    year: "2026",
    title: "Foundations",
    org: "Self-directed study",
    body: "Building core computer science fundamentals — programming, logic, data structures and how machines learn.",
  },
  {
    year: "Palwal, Haryana",
    title: "Where it started",
    org: "Home base",
    body: "A small town, a laptop, and a habit of asking why things work the way they do.",
  },
] as const;

export type Skill = {
  name: string;
  size: number;
  orbit: number;
  speed: number;
  hue: string;
  description: string;
  experience: string;
  projects: string;
  stack: string[];
};

export const skills: Skill[] = [
  {
    name: "Quick Learning",
    size: 1.15,
    orbit: 0,
    speed: 1,
    hue: "oklch(0.74 0.14 232)",
    description: "Picks up new tools, languages and concepts fast and applies them without hand-holding.",
    experience: "Everyday practice",
    projects: "Applied across coursework",
    stack: ["Research", "Docs", "Practice"],
  },
  {
    name: "Active Listening",
    size: 0.95,
    orbit: 1,
    speed: 0.8,
    hue: "oklch(0.7 0.13 265)",
    description: "Understands a problem fully before writing a single line — good listening beats fast typing.",
    experience: "Team & classroom",
    projects: "Group work, peer review",
    stack: ["Communication", "Empathy"],
  },
  {
    name: "CS Fundamentals",
    size: 1.05,
    orbit: 2,
    speed: 0.9,
    hue: "oklch(0.78 0.12 210)",
    description: "Solid grounding in how computers actually work — logic, memory, and structured problem solving.",
    experience: "Ongoing at JECRC",
    projects: "Academic labs",
    stack: ["Programming", "Logic", "OS Basics"],
  },
  {
    name: "AI & ML",
    size: 1.25,
    orbit: 3,
    speed: 0.7,
    hue: "oklch(0.68 0.16 285)",
    description: "Specialization track — learning how models learn, from linear regression to neural networks.",
    experience: "In progress",
    projects: "Coursework & experiments",
    stack: ["Python", "Math", "Models"],
  },
  {
    name: "Problem Solving",
    size: 1,
    orbit: 4,
    speed: 1.1,
    hue: "oklch(0.8 0.11 195)",
    description: "Breaking large, vague problems into small solvable pieces — the actual job of an engineer.",
    experience: "Daily",
    projects: "Practice sets",
    stack: ["Algorithms", "Debugging"],
  },
];

export const projects = [
  {
    title: "Neural Playground",
    year: "2026",
    summary:
      "A visual sandbox for watching a small neural network learn in real time — weights, gradients and loss curves rendered as they update.",
    tags: ["Python", "NumPy", "Visualization"],
    github: "https://github.com/",
    demo: "#",
  },
  {
    title: "Study OS",
    year: "2026",
    summary:
      "A personal study operating system: notes, spaced repetition and progress tracking built around how I actually learn.",
    tags: ["TypeScript", "React", "Local-first"],
    github: "https://github.com/",
    demo: "#",
  },
  {
    title: "Signal",
    year: "2026",
    summary:
      "A minimal terminal companion that summarizes long technical documents into the three things you actually need.",
    tags: ["Python", "NLP", "CLI"],
    github: "https://github.com/",
    demo: "#",
  },
  {
    title: "Orbit Portfolio",
    year: "2026",
    summary:
      "This site — a WebGL-driven personal universe built with Three.js, GSAP and smooth scroll physics.",
    tags: ["Three.js", "GSAP", "Tailwind"],
    github: "https://github.com/",
    demo: "#",
  },
] as const;

export const experience = [
  {
    period: "2026 — Present",
    role: "Computer Science Undergraduate",
    org: "JECRC University, NCR Campus",
    body: "Studying AI & ML fundamentals while building side projects to turn theory into working software.",
  },
  {
    period: "2026",
    role: "Independent Builder",
    org: "Self-directed",
    body: "Learning by shipping — small tools, experiments and prototypes, each one harder than the last.",
  },
  {
    period: "Open",
    role: "Seeking first internship",
    org: "Available 2027 onward",
    body: "Fresher, and honest about it. Bringing curiosity, speed of learning and a real work ethic.",
  },
] as const;

export const certifications = [
  { title: "Foundations of Python", issuer: "Self-paced", year: "2026" },
  { title: "Intro to Machine Learning", issuer: "Coursework", year: "2026" },
  { title: "Data Structures Basics", issuer: "Coursework", year: "2026" },
  { title: "Web Development Essentials", issuer: "Self-paced", year: "2026" },
] as const;

export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
] as const;
