import { Link } from "wouter";
import { Ghost, ArrowLeft } from "lucide-react";
import Seo from "@/components/Seo";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 — Lost Beyond The Wall"
        description="This page is not in the realm."
      />
      <div className="min-h-screen scene-gradient-north fog grain-overlay">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "w-full max-w-2xl rounded-[28px] border border-border/60 bg-card/25 backdrop-blur-xl p-7 sm:p-10",
              "shadow-[0_34px_90px_rgba(0,0,0,0.75)]",
            )}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/25 px-4 py-2">
              <Ghost className="h-4 w-4 text-accent" />
              <span className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                NOT FOUND
              </span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
              Lost Beyond The Wall
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              The path you seek does not exist in this realm.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                data-testid="notfound-home"
                className="btn-cinematic text-primary-foreground justify-center"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to the Gate
              </Link>

              <button
                type="button"
                data-testid="notfound-back"
                onClick={() => window.history.back()}
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold",
                  "border border-border/60 bg-card/25 backdrop-blur",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:bg-card/40 hover:border-border",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                )}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
