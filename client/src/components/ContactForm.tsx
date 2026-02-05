import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, Mail, Phone, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { api, type ContactCreateInput } from "@shared/routes";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

const formSchema = api.contact.create.input.extend({
  // ensure trimming-ish behavior with preprocess
  name: z.string().min(2, "Name is too short").max(80),
  subject: z.string().min(3, "Subject is too short").max(120),
  message: z.string().min(10, "Message is too short").max(2000),
  email: z.string().email("Enter a valid email").max(200),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const mutation = useCreateContactMessage();

  const defaults = useMemo<FormValues>(
    () => ({
      name: "",
      email: "",
      subject: "Let's build something epic",
      message: "",
    }),
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaults,
    mode: "onChange",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const payload: ContactCreateInput = values;
      await mutation.mutateAsync(payload);
      toast({
        title: "Message sent",
        description: "Your raven has reached the Wall. I’ll reply soon.",
      });
      form.reset(defaults);
    } catch (e: any) {
      toast({
        title: "Failed to send",
        description: e?.message ?? "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <div className="glass-panel rounded-3xl p-6 sm:p-7">
          <div className="font-display text-xs tracking-[0.26em] text-muted-foreground">
            CONTACT
          </div>
          <h3 className="mt-3 text-2xl">Summon Me</h3>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Whether it’s an ambitious MERN build, a sleek UI system, or a product that needs
            speed and polish—send a message. I’ll respond with a plan, not a promise.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-foreground/90">
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-semibold">+91 9440667351</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground/90">
              <Mail className="h-4 w-4 text-primary" />
              <span className="font-semibold">praveenkumargangula21@gmail.com</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                data-testid="contact-link-linkedin"
                href="https://www.linkedin.com/in/praveengangula"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
                  "border border-border/60 bg-card/25 backdrop-blur",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:bg-card/40 hover:border-border",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                )}
              >
                <Linkedin className="h-4 w-4 text-primary" />
                LinkedIn
              </a>

              <a
                data-testid="contact-link-github"
                href="https://github.com/PraveenKumar22C"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold",
                  "border border-border/60 bg-card/25 backdrop-blur",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:bg-card/40 hover:border-border",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 focus-visible:border-primary/40",
                )}
              >
                <Github className="h-4 w-4 text-primary" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="glass-panel rounded-3xl p-6 sm:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                NAME
              </label>
              <input
                data-testid="contact-name"
                {...form.register("name")}
                placeholder="Your name"
                className={cn(
                  "mt-2 w-full rounded-2xl px-4 py-3",
                  "bg-background/30 border-2 border-border/60",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10",
                  "transition-all duration-200",
                )}
              />
              {form.formState.errors.name?.message && (
                <p className="mt-2 text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-display text-xs tracking-[0.26em] text-muted-foreground">
                EMAIL
              </label>
              <input
                data-testid="contact-email"
                {...form.register("email")}
                placeholder="you@domain.com"
                className={cn(
                  "mt-2 w-full rounded-2xl px-4 py-3",
                  "bg-background/30 border-2 border-border/60",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10",
                  "transition-all duration-200",
                )}
              />
              {form.formState.errors.email?.message && (
                <p className="mt-2 text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="font-display text-xs tracking-[0.26em] text-muted-foreground">
              SUBJECT
            </label>
            <input
              data-testid="contact-subject"
              {...form.register("subject")}
              placeholder="What are we building?"
              className={cn(
                "mt-2 w-full rounded-2xl px-4 py-3",
                "bg-background/30 border-2 border-border/60",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10",
                "transition-all duration-200",
              )}
            />
            {form.formState.errors.subject?.message && (
              <p className="mt-2 text-xs text-destructive">
                {form.formState.errors.subject.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="font-display text-xs tracking-[0.26em] text-muted-foreground">
              MESSAGE
            </label>
            <textarea
              data-testid="contact-message"
              {...form.register("message")}
              placeholder="Tell me your goals, deadlines, and what 'done' looks like..."
              rows={6}
              className={cn(
                "mt-2 w-full rounded-2xl px-4 py-3",
                "bg-background/30 border-2 border-border/60",
                "text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10",
                "transition-all duration-200",
                "resize-y min-h-[160px]",
              )}
            />
            {form.formState.errors.message?.message && (
              <p className="mt-2 text-xs text-destructive">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground">
              By sending, you consent to being contacted back at the email provided.
            </div>

            <button
              data-testid="contact-submit"
              type="submit"
              disabled={!form.formState.isValid || mutation.isPending}
              className={cn(
                "btn-cinematic text-primary-foreground",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
                "min-w-[170px] justify-center",
              )}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Raven
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
