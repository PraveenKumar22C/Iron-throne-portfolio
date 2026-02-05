import { ExternalLink, Github, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectLink = {
  label: string;
  href: string;
  type?: "live" | "github";
  icon?: string;
};

type ProjectCardProps = {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  links?: ProjectLink[];
  tone?: "ember" | "ice";
};

export default function ProjectCard({
  title,
  tagline,
  description,
  stack,
  highlights,
  links,
  tone = "ember",
}: ProjectCardProps) {
  // Base + hover gradients per tone
  const toneClasses = {
    base: tone === "ember"
      ? "from-primary/10 via-destructive/5 to-card/20"
      : "from-accent/10 via-card/20 to-card/25",
    hover: tone === "ember"
      ? "from-primary/30 via-destructive/15 to-card/35"
      : "from-accent/25 via-card/35 to-card/40",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/60 bg-card/25 backdrop-blur",
        "shadow-[0_22px_60px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out",
        "hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.65)]",
      )}
    >
      {/* Base gradient (always visible, subtle) */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500 ease-out",
          "bg-gradient-to-br opacity-80",
          toneClasses.base,
        )}
        aria-hidden="true"
      />

      {/* Hover gradient (stronger, appears on hover) */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100",
          "bg-gradient-to-br scale-105 group-hover:scale-100",
          toneClasses.hover,
        )}
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-7 z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="font-display text-[11px] tracking-[0.26em] text-muted-foreground">
                {tagline}
              </span>
            </div>
            <h3 className="mt-4 text-xl sm:text-2xl font-semibold">{title}</h3>
          </div>

          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
            <span className="font-display text-xs tracking-[0.22em] text-muted-foreground">
              v1
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className={cn(
                "inline-flex items-center rounded-full border border-border/60 bg-card/30 px-3 py-1 text-xs font-semibold backdrop-blur-sm",
                "text-foreground/90 transition-colors group-hover:text-foreground",
              )}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-2">
          {highlights.map((h, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-foreground/90">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/80 shadow-[0_0_16px_hsl(var(--primary)/0.25)]" />
              <div className="leading-relaxed">{h}</div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {(links ?? []).map((l) => (
            <a
              key={l.href}
              data-testid={`project-link-${title}-${l.label}`}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
                "border border-border/60 bg-card/35 backdrop-blur-md",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-0.5 hover:bg-card/50 hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(var(--primary),0.15)]",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
              )}
            >
              {l.type === "github" ? (
                <Github className="h-4 w-4 text-primary" />
              ) : (
                <ExternalLink className="h-4 w-4 text-primary" />
              )}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}