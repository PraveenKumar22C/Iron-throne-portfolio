import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SceneSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  variant: "kings" | "north" | "dragons" | "wall";
  children: ReactNode;
  rightAdornment?: ReactNode;
};

const variantClass: Record<SceneSectionProps["variant"], string> = {
  kings: "scene-gradient-kings",
  north: "scene-gradient-north",
  dragons: "scene-gradient-dragons",
  wall: "scene-gradient-wall",
};

export default function SceneSection({
  id,
  eyebrow,
  title,
  subtitle,
  variant,
  children,
  rightAdornment,
}: SceneSectionProps) {
  return (
    <section id={id} className="relative">
      <div className={cn("absolute inset-0 -z-10", variantClass[variant])} aria-hidden="true" />
      <div className="absolute inset-0 -z-10 fog" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 grain-overlay opacity-70" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-14 sm:py-18 md:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/25 px-4 py-2 backdrop-blur">
                <span className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                  {eyebrow}
                </span>
              </div>

              <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
                {title}
              </h2>

              {subtitle && (
                <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </motion.div>

            {rightAdornment && (
              <motion.div
                initial={{ y: 18, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="lg:w-[380px]"
              >
                {rightAdornment}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
