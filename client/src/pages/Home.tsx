import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Crown,
  Snowflake,
  Flame,
  Shield,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  Sparkles,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import CinematicShell from "@/components/CinematicShell";
import StartGate from "@/components/StartGate";
import SceneSection from "@/components/SceneSection";
import Atmosphere from "@/components/Atmosphere";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import Seo from "@/components/Seo";
import { cn } from "@/lib/utils";

function useBgm() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [missingFile, setMissingFile] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.65);

  useEffect(() => {
    const a = new Audio("/audio/bgm.mp3");
    a.loop = true;
    a.volume = volume;
    audioRef.current = a;

    fetch("/audio/bgm.mp3", { method: "HEAD" })
      .then((res) => {
        setMissingFile(!res.ok);
        setReady(true);
      })
      .catch(() => {
        setMissingFile(true);
        setReady(true);
      });

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    return () => {
      a.pause();
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setVolume = (v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  };

  const ensureStarted = async () => {
    if (missingFile) return;
    const a = audioRef.current;
    if (!a) return;
    if (!a.paused) return;

    try {
      await a.play();
    } catch (err) {
      throw err;
    }
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a || missingFile) return;
    
    try {
      if (a.paused) {
        await a.play();
      } else {
        a.pause();
      }
    } catch (err) {
   throw err;
    }
  };

  return { ready, missingFile, playing, volume, setVolume, toggle, ensureStarted };
}

export default function Home() {
  const music = useBgm();
  const [gateOpen, setGateOpen] = useState(true);
  const [started, setStarted] = useState(false);

  const stats = useMemo(
    () => [
      { label: "Role", value: "MERN Stack Developer", icon: Code2 },
      { label: "Base", value: "Hyderabad, India", icon: MapPin },
      { label: "Now", value: "SDE-1 @ Salaah Shots", icon: Briefcase },
      { label: "Focus", value: "Modern UI + Performance", icon: Sparkles },
    ],
    [],
  );

  const skills = useMemo(
    () => [
      {
        group: "Core",
        items: ["JavaScript", "TypeScript", "React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
        tone: "ember" as const,
      },
      {
        group: "Frontend Craft",
        items: ["TailwindCSS", "Responsive UI", "Framer Motion", "Accessibility", "State Management", "React Query"],
        tone: "ice" as const,
      },
      {
        group: "Backend & Dev",
        items: ["JWT/Auth patterns", "Database design", "Mongoose", "PostgreSQL basics", "Git/GitHub", "Deployment"],
        tone: "ember" as const,
      },
    ],
    [],
  );

  const experience = useMemo(
    () => [
      {
        company: "Salaah Shots",
        role: "SDE-1",
        time: "Sep 2025 — Present",
        bullets: [
          "Building production-grade web features with a focus on performance, resilience, and clean UI systems.",
          "Collaborating across product and engineering to ship refined experiences with strong component discipline.",
        ],
      },
      {
        company: "Klariti Learning",
        role: "Junior Software Engineer",
        time: "Dec 2024 — Aug 2025",
        bullets: [
          "Contributed to web modules and internal tooling; focused on predictable UI behavior and maintainable code.",
          "Improved delivery velocity by creating reusable components and consistent patterns across pages.",
        ],
      },
    ],
    [],
  );

  const projects = useMemo(
    () => [
      {
        title: "Advanced Web-Based LMS",
        tagline: "Learning at scale",
        description:
          "A modern Learning Management System designed for structured courses, progress tracking, and admin workflows with a smooth UI layer.",
        stack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
        highlights: [
          "Designed modular pages for learners/admins with consistent navigation patterns.",
          "Emphasized responsiveness and clear content hierarchy for long-form learning flows.",
          "Built with maintainability-first structure: reusable components + predictable state.",
        ],
        links: [
          { label: "Live Demo", href: "https://virtual-deal-room-9ouy.vercel.app/", type: "live" as const },
          { label: "GitHub", href: "https://github.com/PraveenKumar22C/virtual-deal-room", type: "github" as const },
        ],
        tone: "ice" as const,
      },
      {
        title: "Horizon Banking SaaS",
        tagline: "Fintech UX",
        description:
          "A SaaS-style banking dashboard concept focused on clarity: accounts, transactions, and insights with premium UI depth.",
        stack: ["React", "TypeScript", "UI systems", "Charts"],
        highlights: [
          "Information-dense layout with strong spacing rhythm and readability.",
          "Micro-interactions and motion to guide attention without noise.",
          "Designed for extensibility: widgets, filters, and scalable component primitives.",
        ],
        links: [
          { label: "Live Demo", href: "https://horizon-banking-lemon.vercel.app/", type: "live" as const },
          { label: "GitHub", href: "https://github.com/PraveenKumar22C/banking", type: "github" as const },
        ],
        tone: "ember" as const,
      },
      {
        title: "MERN Chat App",
        tagline: "Real-time conversation",
        description:
          "A MERN-based chat app concept built to feel fast—tight layouts, message flows, and modern interaction feedback.",
        stack: ["MongoDB", "Express", "React", "Node.js"],
        highlights: [
          "Streamlined message composer and conversation layout with mobile-first thinking.",
          "UI states for empty/loading/error to keep the experience resilient.",
          "Architecture shaped to support future real-time layers (WebSocket-ready).",
        ],
        links: [
          { label: "Live Demo", href: "https://chat-app-mern-wh3t.onrender.com/", type: "live" as const },
          { label: "GitHub", href: "https://github.com/PraveenKumar22C/Chat-app-mern", type: "github" as const },
        ],
        tone: "ice" as const,
      },
      {
        title: "Touch UI",
        tagline: "Interface experiments",
        description:
          "A set of interaction-driven UI experiments—buttons, panels, and transitions—crafted for a premium tactile feel.",
        stack: ["React", "TailwindCSS", "Framer Motion"],
        highlights: [
          "Focus on hover/press physics and subtle gradients for modern depth.",
          "Composable card + modal patterns for product-like prototypes.",
          "Strong emphasis on visual hierarchy and typography pairing.",
        ],
        links: [
          { label: "Live Demo", href: "https://touch-ui.vercel.app/", type: "live" as const },
          { label: "GitHub", href: "https://github.com/PraveenKumar22C/Touch-UI", type: "github" as const },
        ],
        tone: "ember" as const,
      },
    ],
    [],
  );

  const onStart = async () => {
    setGateOpen(false);
    setStarted(true);
    
    setTimeout(async () => {
      try {
        await music.ensureStarted();
      } catch (err) {
        throw err;
      }
    }, 400);
    
    setTimeout(() => {
      window.scrollTo({ top: 1, behavior: "smooth" });
    }, 120);
  };

  return (
    <>
      <Seo
        title="Praveen Kumar Gangula — Cinematic MERN Portfolio"
        description="A cinematic dark-fantasy portfolio: Kings Landing, The North, Dragons, and The Wall — projects, skills, experience, and contact."
        path="/"
      />

      <CinematicShell
        started={started}
        onStartRequested={() => setGateOpen(true)}
        music={music}
      >
        <StartGate open={gateOpen} onStart={onStart} music={music} />

        <section className="relative">
          <div className="absolute inset-0 -z-10 scene-gradient-kings" aria-hidden="true" />
          <Atmosphere density={18} variant="embers" className="opacity-[0.95]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="pt-10 sm:pt-14 md:pt-18 pb-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
                    Praveen Kumar{" "}
                    <span className="bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent text-glow">
                      Gangula
                    </span>
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                    MERN Stack Developer crafting premium interfaces with cinematic motion, strong component systems,
                    and performance-minded engineering.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <button
                      type="button"
                      data-testid="hero-enter"
                      onClick={() => {
                        setStarted(true);
                        const el = document.getElementById("kings-landing");
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="btn-cinematic text-primary-foreground justify-center"
                    >
                      Enter Kings Landing
                    </button>

                    <button
                      type="button"
                      data-testid="hero-download-resume"
                      onClick={() => window.open("/Praveen-Kumar-Gangula-Resume_1770207293092.pdf", "_blank")}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold",
                        "border border-border/60 bg-card/25 backdrop-blur",
                        "transition-all duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:bg-card/40 hover:border-border",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                      )}
                    >
                      <Download className="h-4 w-4 text-primary" />
                      Resume (PDF)
                    </button>

                    <button
                      type="button"
                      data-testid="hero-toggle-music"
                      onClick={async () => {
                        if (!started) {
                          setStarted(true);
                        }
                        await music.toggle();
                      }}
                      className={cn(
                        "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold",
                        "border border-border/60 bg-card/25 backdrop-blur",
                        "transition-all duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:bg-card/40 hover:border-border",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                      )}
                    >
                      {music.playing ? "Mute BGM" : "Play BGM"}
                    </button>
                  </div>

                  {music.missingFile && (
                    <div className="mt-5 rounded-2xl border border-border/60 bg-card/20 px-4 py-3 text-sm text-muted-foreground">
                      Add <span className="text-foreground font-semibold">bgm.mp3</span> to{" "}
                      <span className="text-foreground font-semibold">client/public/audio/</span> to enable music.
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-panel rounded-[28px] p-6 sm:p-8"
                >
                  <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                    QUICK SIGIL
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {stats.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.label}
                          className="rounded-2xl border border-border/60 bg-card/25 px-4 py-4 transition-all duration-300 hover:bg-card/35"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-display text-[11px] tracking-[0.26em] text-muted-foreground">
                              {s.label}
                            </div>
                            <Icon className="h-4 w-4 text-primary/90" />
                          </div>
                          <div className="mt-2 text-sm sm:text-base font-semibold text-foreground/90">
                            {s.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-2xl border border-border/60 bg-card/20 px-4 py-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-accent" />
                      <span className="text-foreground/90 font-semibold">Scene Navigation</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        data-testid="jump-kings"
                        onClick={() => document.getElementById("kings-landing")?.scrollIntoView({ behavior: "smooth" })}
                        className="rounded-xl border border-border/60 bg-card/25 px-3 py-2 hover:bg-card/40 hover:border-primary/50 transition-all hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                      >
                        Kings Landing
                      </button>
                      <button
                        type="button"
                        data-testid="jump-north"
                        onClick={() => document.getElementById("the-north")?.scrollIntoView({ behavior: "smooth" })}
                        className="rounded-xl border border-border/60 bg-card/25 px-3 py-2 hover:bg-card/40 hover:border-primary/50 transition-all hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                      >
                        The North
                      </button>
                      <button
                        type="button"
                        data-testid="jump-dragons"
                        onClick={() => document.getElementById("dragons")?.scrollIntoView({ behavior: "smooth" })}
                        className="rounded-xl border border-border/60 bg-card/25 px-3 py-2 hover:bg-card/40 hover:border-primary/50 transition-all hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                      >
                        Dragons
                      </button>
                      <button
                        type="button"
                        data-testid="jump-wall"
                        onClick={() => document.getElementById("the-wall")?.scrollIntoView({ behavior: "smooth" })}
                        className="rounded-xl border border-border/60 bg-card/25 px-3 py-2 hover:bg-card/40 hover:border-primary/50 transition-all hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                      >
                        The Wall
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <SceneSection
          id="kings-landing"
          eyebrow="KINGS LANDING"
          title="The Court of Craft"
          subtitle="Who I am, what I value, and how I build: with intent, taste, and clean engineering."
          variant="kings"
          rightAdornment={
            <div className="glass-panel rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-primary" />
                <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                  IDENTITY
                </div>
              </div>
              <div className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                I'm <span className="text-foreground font-semibold">Praveen Kumar Gangula</span>, a MERN Stack
                Developer. I enjoy building UI that feels premium—crisp typography, confident spacing, and motion that
                guides attention like a film cut.
              </div>

              <div className="mt-6 rounded-2xl border border-border/60 bg-card/20 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="font-display text-[11px] tracking-[0.26em] text-muted-foreground">
                    LOCATION
                  </div>
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <div className="mt-2 text-sm font-semibold text-foreground/90">Hyderabad, India</div>
              </div>
            </div>
          }
        >
          <Atmosphere density={14} variant="embers" className="opacity-[0.75]" />
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Premium UI",
                desc: "Not just working screens—interfaces with hierarchy, depth, and delight.",
              },
              {
                icon: Code2,
                title: "Maintainable Systems",
                desc: "Reusable components, consistent patterns, predictable state.",
              },
              {
                icon: Shield,
                title: "Resilient Delivery",
                desc: "Polished loading/error/empty states so the product feels complete.",
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className={cn(
                    "rounded-3xl border border-border/60 bg-card/25 backdrop-blur p-6",
                    "shadow-[0_18px_50px_rgba(0,0,0,0.50)] transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:bg-card/35 hover:border-border",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-border/60 bg-card/30">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl">{c.title}</h3>
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </SceneSection>

        <SceneSection
          id="the-north"
          eyebrow="THE NORTH"
          title="Cold Discipline, Sharp Tools"
          subtitle="The stack I wield—chosen for clarity, speed, and reliability."
          variant="north"
          rightAdornment={
            <div className="glass-panel rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-accent" />
                <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                  SKILLS SUMMARY
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
                I build full-stack web apps with MERN, with a special focus on crisp frontend systems and motion.
              </div>

              <div className="mt-5 grid gap-3">
                {[
                  { k: "Frontend", v: "React, TypeScript, Tailwind" },
                  { k: "Backend", v: "Node, Express, REST APIs" },
                  { k: "Data", v: "MongoDB (+ SQL basics)" },
                ].map((r) => (
                  <div key={r.k} className="rounded-2xl border border-border/60 bg-card/20 px-4 py-3">
                    <div className="text-xs font-semibold text-foreground/90">{r.k}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{r.v}</div>
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <Atmosphere density={16} variant="snow" className="opacity-[0.55]" />
          <div className="grid gap-4 lg:grid-cols-3">
            {skills.map((sg) => (
              <div
                key={sg.group}
                className={cn(
                  "rounded-3xl border border-border/60 bg-card/25 backdrop-blur p-6",
                  "shadow-[0_18px_50px_rgba(0,0,0,0.50)] transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:bg-card/35 hover:border-border",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                    {sg.group}
                  </div>
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      sg.tone === "ember" ? "bg-primary" : "bg-accent",
                      "shadow-[0_0_18px_rgba(255,255,255,0.08)]",
                    )}
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {sg.items.map((i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full border border-border/60 bg-card/20 px-3 py-1 text-xs font-semibold text-foreground/90"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SceneSection>

        <SceneSection
          id="dragons"
          eyebrow="DRAGONS"
          title="Projects with Heat"
          subtitle="Selected builds and concepts—focused on clarity, polish, and scalability."
          variant="dragons"
          rightAdornment={
            <div className="glass-panel rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-destructive" />
                <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                  HIGHLIGHT
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
                My favorite work blends engineering discipline with visual taste: clean grids, thoughtful typography,
                and micro-interactions that feel natural.
              </div>

              <div className="mt-6 rounded-2xl border border-border/60 bg-card/20 px-4 py-3 text-xs text-muted-foreground">
                Want the source? Visit GitHub:{" "}
                <a
                  data-testid="dragons-github-link"
                  className="text-foreground font-semibold link-underline"
                  href="https://github.com/PraveenKumar22C"
                  target="_blank"
                  rel="noreferrer"
                >
                  PraveenKumar22C
                </a>
              </div>
            </div>
          }
        >
          <Atmosphere density={20} variant="embers" className="opacity-[0.95]" />
          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((p) => (
              <ProjectCard
                key={p.title}
                title={p.title}
                tagline={p.tagline}
                description={p.description}
                stack={p.stack}
                highlights={p.highlights}
                tone={p.tone}
                links={p.links}
              />
            ))}
          </div>
        </SceneSection>

        <SceneSection
          id="the-wall"
          eyebrow="THE WALL"
          title="Experience & The Raven Post"
          subtitle="Where I've served—and how to reach me."
          variant="wall"
          rightAdornment={
            <div className="glass-panel rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                  EDUCATION
                </div>
              </div>
              <div className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                B.Tech — Electronics & Communication Engineering (ECE)
              </div>

              <div className="mt-6 rounded-2xl border border-border/60 bg-card/20 px-4 py-3">
                <div className="font-display text-[11px] tracking-[0.26em] text-muted-foreground">
                  STATUS
                </div>
                <div className="mt-2 text-sm font-semibold text-foreground/90">
                  Open to impactful projects & roles
                </div>
              </div>
            </div>
          }
        >
          <Atmosphere density={16} variant="snow" className="opacity-[0.55]" />
          <div className="grid gap-6">
            <div className="grid gap-4 lg:grid-cols-2">
              {experience.map((e) => (
                <div
                  key={e.company}
                  className={cn(
                    "rounded-3xl border border-border/60 bg-card/25 backdrop-blur p-6 sm:p-7",
                    "shadow-[0_18px_50px_rgba(0,0,0,0.50)] transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:bg-card/35 hover:border-border",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                        {e.company}
                      </div>
                      <h3 className="mt-2 text-xl">{e.role}</h3>
                      <div className="mt-1 text-sm text-muted-foreground">{e.time}</div>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-border/60 bg-card/30">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2">
                    {e.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80 shadow-[0_0_16px_hsl(var(--accent)/0.25)]" />
                        <div className="leading-relaxed">{b}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div id="contact" className="scroll-mt-10 sm:scroll-mt-16 lg:scroll-mt-20">
              <ContactForm />
            </div>
          </div>
        </SceneSection>

        <AnimatePresence>
          {!started && !gateOpen && (
            <motion.div
              className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button
                type="button"
                data-testid="start-floating"
                onClick={() => setGateOpen(true)}
                className="btn-cinematic text-primary-foreground"
              >
                Begin (Sound + Scenes)
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </CinematicShell>
    </>
  );
}