import { AnimatePresence, motion } from "framer-motion";
import { Crown, Flame, Snowflake, Volume2, Github, Linkedin, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type StartGateProps = {
  open: boolean;
  onStart: () => void;
  music: {
    playing: boolean;
    missingFile: boolean;
    volume: number;
    setVolume: (v: number) => void;
    toggle: () => void;
  };
};

export default function StartGate({ open, onStart, music }: StartGateProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="absolute inset-0 scene-gradient-dragons" />
          <div className="absolute inset-0 grain-overlay opacity-80" />
          <div className="absolute inset-0 fog" />

          <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "w-full rounded-[28px] border border-border/60 bg-card/25 backdrop-blur-xl",
                "shadow-[0_34px_90px_rgba(0,0,0,0.75)]",
                "p-6 sm:p-8 md:p-12",
              )}
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/30 px-4 py-2">
                      <span className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                        ENTER THE WORLD
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://github.com/PraveenKumar22C"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-card/25 backdrop-blur transition-all hover:bg-card/40 hover:-translate-y-1 hover:border-primary/50"
                        title="GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href="https://linkedin.com/in/praveengangula"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-card/25 backdrop-blur transition-all hover:bg-card/40 hover:-translate-y-1 hover:border-primary/50"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4 text-[#0077b5]" />
                      </a>
                    </div>
                  </div>

                  <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl leading-[1.03] text-foreground">
                    Praveen Kumar <br />
                    <span className="text-glow bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
                      Gangula
                    </span>
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                    Scroll through four scenes—Kings Landing, The North, Dragons, and The Wall—each revealing an
                    event of my craft as a{" "}
                    <span className="text-foreground/90 font-semibold">MERN Stack Developer</span>.
                  </p>

                  <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-border/60 bg-card/25 px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-primary" />
                        <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                          KINGS LANDING
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-foreground/90">About & identity</div>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-card/25 px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Snowflake className="h-4 w-4 text-accent" />
                        <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                          THE NORTH
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-foreground/90">Skills & tools</div>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-card/25 px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-destructive" />
                        <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                          DRAGONS
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-foreground/90">Projects & impact</div>
                    </div>
                  </div>
                </div>

                <div className="md:w-[360px]">
                  <div className="glass-panel rounded-3xl p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-display text-xs tracking-[0.22em] text-muted-foreground">
                        SOUNDTRACK
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <Volume2 className="h-4 w-4 text-primary" />
                        <span>{Math.round(music.volume * 100)}%</span>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Browser policy forbids autoplay. Choose your volume, then start.
                    </p>

                    <div className="mt-4">
                      <Slider
                        data-testid="gate-volume"
                        value={[Math.round(music.volume * 100)]}
                        onValueChange={(v) => music.setVolume((v?.[0] ?? 65) / 100)}
                        min={0}
                        max={100}
                        step={1}
                      />
                    </div>

                    {music.missingFile && (
                      <div className="mt-4 rounded-2xl border border-border/60 bg-card/30 px-4 py-3 text-sm text-muted-foreground">
                        <div className="font-semibold text-foreground">Missing bgm.mp3</div>
                        <div className="mt-1">
                          Add your file to{" "}
                          <span className="font-semibold text-foreground">client/public/audio/bgm.mp3</span>.
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      data-testid="gate-start"
                      onClick={onStart}
                      className={cn(
                        "mt-5 w-full btn-cinematic",
                        "py-3.5",
                      )}
                    >
                      <Play className="mr-2 h-4 w-4 fill-current" />
                      Begin the Journey
                    </button>

                    <button
                      type="button"
                      data-testid="gate-skip-scroll"
                      onClick={() => {
                        onStart();
                        setTimeout(() => {
                          const el = document.getElementById("kings-landing");
                          el?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 250);
                      }}
                      className={cn(
                        "mt-3 w-full inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold",
                        "border border-border/60 bg-card/25 backdrop-blur",
                        "transition-all duration-300 ease-out",
                        "hover:bg-card/40 hover:border-border hover:-translate-y-0.5",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                      )}
                    >
                      Start & Take Me to Kings Landing
                    </button>
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground">
                    Tip: Use <span className="text-foreground font-semibold">smooth scroll</span> and let each scene
                    reveal itself like a chapter.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
