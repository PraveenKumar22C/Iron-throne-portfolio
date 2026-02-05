import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type AtmosphereProps = {
  className?: string;
  density?: number; // number of particles
  variant?: "embers" | "snow";
};

export default function Atmosphere({ className, density = 22, variant = "embers" }: AtmosphereProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 6;
      const duration = 4.5 + Math.random() * 5.5;
      const scale = 0.7 + Math.random() * 1.3;
      const opacity = 0.25 + Math.random() * 0.5;
      const size = variant === "snow" ? 2 + Math.random() * 3.5 : 4 + Math.random() * 4;
      const blur = variant === "snow" ? 0 : Math.random() * 0.4;

      return { i, left, delay, duration, scale, opacity, size, blur };
    });
  }, [density, variant]);

  // Parallax drift based on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      el.style.transform = `translate3d(0, ${Math.min(48, y * 0.04)}px, 0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {particles.map((p) => (
        <span
          key={p.i}
          className={cn(
            "absolute bottom-[-20px]",
            variant === "snow"
              ? "rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.18)]"
              : "ember",
          )}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.scale})`,
            filter: variant === "snow" ? `blur(${blur}px)` : undefined,
          }}
        />
      ))}
      <div className="absolute inset-0 fog" />
    </div>
  );
}
