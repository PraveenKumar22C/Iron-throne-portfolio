import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, Search, RefreshCw, Mail, User, AtSign, MessageSquareText } from "lucide-react";
import CinematicShell from "@/components/CinematicShell";
import Seo from "@/components/Seo";
import { useContactMessages } from "@/hooks/use-contact";
import { cn } from "@/lib/utils";

type MusicStub = {
  ready: boolean;
  playing: boolean;
  volume: number;
  setVolume: (v: number) => void;
  toggle: () => void;
  ensureStarted: () => Promise<void>;
  missingFile: boolean;
};

function useNoMusic(): MusicStub {
  return {
     ready: true,
    playing: false,
    volume: 0.65,
    setVolume: () => {},
    toggle: async () => {},        
    ensureStarted: async () => {},
    missingFile: true,
  };
}

export default function ContactInbox() {
  const music = useNoMusic() as any;
  const { data, isLoading, error, refetch, isFetching } = useContactMessages();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const items = data ?? [];
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter((m) => {
      return (
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.subject.toLowerCase().includes(query) ||
        m.message.toLowerCase().includes(query)
      );
    });
  }, [data, q]);

  return (
    <>
      <Seo
        title="Contact Inbox — Praveen Kumar Gangula"
        description="Admin-style inbox view for messages received from the portfolio contact form."
        path="/contact-inbox"
      />

      <CinematicShell music={music} started>
        <section className="relative">
          <div className="absolute inset-0 -z-10 scene-gradient-wall" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 fog" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 grain-overlay opacity-70" aria-hidden="true" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-10 sm:py-14 md:py-18">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/25 px-4 py-2 backdrop-blur">
                      <Inbox className="h-4 w-4 text-primary" />
                      <span className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                        HIDDEN ROUTE
                      </span>
                    </div>
                    <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
                      Contact Inbox
                    </h1>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        data-testid="inbox-search"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search name, email, subject, message…"
                        className={cn(
                          "w-full sm:w-[360px] rounded-2xl pl-10 pr-4 py-3",
                          "bg-background/30 border-2 border-border/60",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10",
                          "transition-all duration-200",
                        )}
                      />
                    </div>

                    <button
                      type="button"
                      data-testid="inbox-refresh"
                      onClick={() => refetch()}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold",
                        "border border-border/60 bg-card/25 backdrop-blur",
                        "transition-all duration-300 ease-out",
                        "hover:-translate-y-0.5 hover:bg-card/40 hover:border-border",
                        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                      )}
                    >
                      <RefreshCw className={cn("h-4 w-4 text-primary", isFetching && "animate-spin")} />
                      Refresh
                    </button>
                  </div>
                </div>

                <div className="glass-panel rounded-3xl p-6 sm:p-7">
                  {isLoading ? (
                    <div className="grid gap-3">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="h-20 rounded-2xl border border-border/60 bg-card/20 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : error ? (
                    <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-4">
                      <div className="font-semibold">Failed to load messages</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {(error as any)?.message ?? "Unknown error"}
                      </div>
                      <button
                        type="button"
                        data-testid="inbox-retry"
                        onClick={() => refetch()}
                        className="mt-4 btn-cinematic text-primary-foreground"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="rounded-2xl border border-border/60 bg-card/20 px-4 py-8 text-center">
                      <MessageSquareText className="mx-auto h-10 w-10 text-muted-foreground" />
                      <div className="mt-3 font-semibold">No messages</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {q.trim()
                          ? "No results match your search."
                          : "When someone uses the contact form, messages will appear here."}
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {filtered
                        .slice()
                        .reverse()
                        .map((m) => (
                          <div
                            key={m.id}
                            className={cn(
                              "rounded-2xl border border-border/60 bg-card/20 p-4 sm:p-5",
                              "transition-all duration-300 ease-out hover:bg-card/30 hover:border-border",
                            )}
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                  <div className="inline-flex items-center gap-2 text-sm font-semibold">
                                    <User className="h-4 w-4 text-primary" />
                                    <span data-testid={`inbox-name-${m.id}`}>{m.name}</span>
                                  </div>
                                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                    <AtSign className="h-4 w-4" />
                                    <span data-testid={`inbox-email-${m.id}`}>{m.email}</span>
                                  </div>
                                </div>

                                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/25 px-3 py-1">
                                  <Mail className="h-3.5 w-3.5 text-accent" />
                                  <span
                                    data-testid={`inbox-subject-${m.id}`}
                                    className="text-xs font-semibold text-foreground/90"
                                  >
                                    {m.subject}
                                  </span>
                                </div>
                              </div>

                              <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                                ID #{m.id}
                              </div>
                            </div>

                            <div
                              data-testid={`inbox-message-${m.id}`}
                              className="mt-4 whitespace-pre-wrap text-sm sm:text-base text-foreground/90 leading-relaxed"
                            >
                              {m.message}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </CinematicShell>
    </>
  );
}
