import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Volume2,
  VolumeX,
  Swords,
  ScrollText,
  Sparkles,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CinematicShellProps = {
  children: ReactNode;
  onStartRequested?: () => void;
  started?: boolean;
  music: {
    ready: boolean;
    playing: boolean;
    volume: number;
    setVolume: (v: number) => void;
    toggle: () => Promise<void>;
    ensureStarted: () => Promise<void>;
    missingFile: boolean;
  };
};

export default function CinematicShell({
  children,
  music,
  started,
  onStartRequested,
}: CinematicShellProps) {
  const [location] = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => setNavOpen(false), [location]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastScroll.current;
      lastScroll.current = y;
      if (Math.abs(delta) > 14) setNavOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(() => {
 const items = [];

  if (location !== "/") {
    items.push({ label: "The Realm", href: "/", icon: Sparkles });
  }

  if (location !== "/contact-inbox") {
    items.push({ label: "Inbox", href: "/contact-inbox", icon: Inbox });
  }

  return items;
}, [location]);

  const handleMusicToggle = async () => {
    if (!started) {
      onStartRequested?.();
      return;
    }
    await music.toggle();
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain-overlay">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-[0.70] scene-gradient-kings" />
      </div>

      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "mt-4 mb-3 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl",
              "shadow-[0_24px_60px_rgba(0,0,0,0.55)]",
            )}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-border/60 bg-gradient-to-br from-primary/20 to-accent/10 shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
                  <Swords className="h-5 w-5 text-primary" />
                </div>
                <div className="leading-tight">
                  <div className="font-display text-sm tracking-[0.22em] text-muted-foreground">
                    PRAVEEN KUMAR GANGULA
                  </div>
                  <div className="font-display text-base md:text-lg text-foreground">
                    Cinematic Portfolio
                  </div>
                </div>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                {navItems.map((it) => {
                  const Icon = it.icon;
                  return (
                    <Link
                      key={it.href}
                      href={it.href}
                      data-testid={`nav-link-${it.href}`}
                      className={cn(
                        "group relative inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
                        "border border-border/60 bg-card/30 backdrop-blur",
                        "transition-all duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:border-border hover:bg-card/45",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                      )}
                    >
                      <Icon className="h-4 w-4 text-primary/90 group-hover:text-primary transition-colors" />
                      <span className="link-underline">{it.label}</span>
                    </Link>
                  );
                })}

                <div className="mx-1 h-7 w-px bg-border/70" />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      data-testid="music-toggle"
                      onClick={handleMusicToggle}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
                        "border border-border/60 bg-card/30 backdrop-blur",
                        "transition-all duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:border-border hover:bg-card/45",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                      )}
                    >
                      {music.playing ? (
                        <Volume2 className="h-4 w-4 text-primary" />
                      ) : (
                        <VolumeX className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="hidden lg:inline">BGM</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="glass-panel border-border/60">
                    <div className="max-w-[240px]">
                      <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                        SOUND
                      </div>
                      <div className="mt-1 text-sm">
                        {music.missingFile
                          ? "Missing bgm.mp3 — add file to enable."
                          : "Toggle ambience"}
                      </div>
                      <div className="mt-3">
                        <Slider
                          data-testid="music-volume"
                          value={[Math.round(music.volume * 100)]}
                          onValueChange={(v) =>
                            music.setVolume((v?.[0] ?? 65) / 100)
                          }
                          min={0}
                          max={100}
                          step={1}
                        />
                        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                          <span>0%</span>
                          <span>{Math.round(music.volume * 100)}%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Link
                  href="/#contact"
                  data-testid="nav-contact-jump"
                  onClick={(e) => {
                    if (location === "/") {
                      e.preventDefault();
                      const element = document.getElementById("contact");
                      if (element) {
                        const headerOffset = 80;
                        const elementPosition =
                          element.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition + window.scrollY - headerOffset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }
                  }}
                  className={cn(
                    "btn-cinematic text-primary-foreground",
                    "px-5 py-2.5",
                  )}
                >
                  <ScrollText className="h-4 w-4" />
                  Summon Me
                </Link>
              </div>

              <button
                type="button"
                data-testid="nav-mobile-toggle"
                onClick={() => setNavOpen((s) => !s)}
                className={cn(
                  "md:hidden inline-flex items-center justify-center rounded-2xl p-3",
                  "border border-border/60 bg-card/30 backdrop-blur",
                  "transition-all duration-300 ease-out",
                  "hover:bg-card/45 hover:border-border",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                )}
              >
                <span className="font-display text-xs tracking-[0.22em]">
                  {navOpen ? "CLOSE" : "MENU"}
                </span>
              </button>
            </div>

            <AnimatePresence initial={false}>
              {navOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <div className="grid gap-2">
                      {navItems.map((it) => {
                        const Icon = it.icon;
                        return (
                          <Link
                            key={it.href}
                            href={it.href}
                            data-testid={`nav-link-mobile-${it.href}`}
                            className={cn(
                              "group flex items-center justify-between rounded-2xl px-4 py-3",
                              "border border-border/60 bg-card/30 backdrop-blur",
                              "transition-all duration-300 ease-out",
                              "hover:bg-card/45 hover:border-border",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4 text-primary/90 group-hover:text-primary transition-colors" />
                              <span className="font-semibold">{it.label}</span>
                            </div>
                            <span className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                              ENTER
                            </span>
                          </Link>
                        );
                      })}

                      <button
                        type="button"
                        data-testid="music-toggle-mobile"
                        onClick={handleMusicToggle}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3",
                          "border border-border/60 bg-card/30 backdrop-blur",
                          "transition-all duration-300 ease-out",
                          "hover:bg-card/45 hover:border-border",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {music.playing ? (
                            <Volume2 className="h-4 w-4 text-primary" />
                          ) : (
                            <VolumeX className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-semibold">
                            Background Music
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(music.volume * 100)}%
                        </span>
                      </button>

                      <div className="rounded-2xl border border-border/60 bg-card/20 px-4 py-3">
                        <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                          VOLUME
                        </div>
                        <div className="mt-3">
                          <Slider
                            data-testid="music-volume-mobile"
                            value={[Math.round(music.volume * 100)]}
                            onValueChange={(v) =>
                              music.setVolume((v?.[0] ?? 65) / 100)
                            }
                            min={0}
                            max={100}
                            step={1}
                          />
                        </div>
                        {music.missingFile && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            Add{" "}
                            <span className="font-semibold text-foreground">
                              bgm.mp3
                            </span>{" "}
                            to{" "}
                            <span className="font-semibold text-foreground">
                              client/public/audio/
                            </span>
                            .
                          </div>
                        )}
                      </div>

                      <Link
                        href="/#contact"
                        data-testid="nav-contact-jump-mobile"
                        onClick={(e) => {
                          if (location === "/") {
                            e.preventDefault();
                            const element = document.getElementById("contact");
                            if (element) {
                              const headerOffset = 80;
                              const elementPosition =
                                element.getBoundingClientRect().top;
                              const offsetPosition =
                                elementPosition + window.scrollY - headerOffset;

                              window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth",
                              });
                            }
                          }
                        }}
                        className={cn(
                          "btn-cinematic text-primary-foreground w-full justify-center",
                        )}
                      >
                        <ScrollText className="h-4 w-4" />
                        Summon Me
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="pb-10 pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/60 bg-card/30 backdrop-blur-xl p-6 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-display text-sm tracking-[0.22em] text-muted-foreground">
                  CREDITS
                </div>
                <div className="mt-1 text-sm md:text-base text-foreground/90">
                  Built with React • Tailwind • TanStack Query • Wouter • Framer
                  Motion
                </div>
              </div>
              <button
                type="button"
                data-testid="scroll-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold",
                  "border border-border/60 bg-card/30 backdrop-blur",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:bg-card/45 hover:border-border",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                )}
              >
                Return to the Gate
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}