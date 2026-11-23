import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Download, FileText, X } from "lucide-react";
import { IDENTITY, RESUME } from "../data/profile";
import { GithubIcon, cx } from "./ui";

type Variant = "red" | "outline";

const VARIANTS: Record<Variant, string> = {
  red: "bg-flame text-ink hover:bg-paper hover:text-ink",
  outline: "border border-paper/20 text-paper hover:border-flame hover:text-flame",
};

const BASE =
  "group inline-flex items-center justify-between gap-6 rounded-full px-5 py-3.5 text-[0.68rem] uppercase tracking-[0.14em] transition-colors";

type ResumeButtonProps = {
  variant?: Variant;
  className?: string;
  label?: string;
  withMeta?: boolean;
};

export default function ResumeButton({
  variant = "red",
  className,
  label = "Download résumé",
  withMeta = false,
}: ResumeButtonProps) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const doneTimer = useRef<number | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  useEffect(() => () => window.clearTimeout(doneTimer.current), []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  // Dialog behaviour: lock scroll, focus the close button, close on Escape, restore scroll on exit.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const onDownload = () => {
    setDone(true);
    window.clearTimeout(doneTimer.current);
    doneTimer.current = window.setTimeout(() => setDone(false), 2600);
  };

  const content = (
    <>
      <span className="flex items-center gap-2.5">
        {done ? <Check className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
        <span>{done ? "Downloading résumé" : label}</span>
      </span>
      <span className="flex items-center gap-2">
        {withMeta && (
          <span className="rounded-full bg-current/10 px-2 py-0.5 text-[0.42rem] tracking-[0.12em]">PDF</span>
        )}
        <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
      </span>
    </>
  );

  return (
    <>
      {IDENTITY.resumeReady ? (
        <a
          href={IDENTITY.resumeUrl}
          download={RESUME.filename}
          onClick={onDownload}
          className={cx(BASE, VARIANTS[variant], className)}
        >
          {content}
        </a>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className={cx(BASE, VARIANTS[variant], className)}
        >
          {content}
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[95] grid place-items-center bg-ink/85 p-4 backdrop-blur-md"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-paper/15 bg-ink-soft p-6 text-paper"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-paper/15 text-paper-mute transition-colors hover:border-flame hover:text-flame"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-flame/15 text-flame">
              <FileText className="h-5 w-5" />
            </span>
            <p className="mono mt-5 text-[0.5rem] text-paper-mute">Résumé / PDF</p>
            <h3 id={titleId} className="mt-2 font-display text-3xl leading-none">
              In the works.
            </h3>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-paper-dim">
              The PDF isn&apos;t available to download right now. Ask me for the latest copy and I&apos;ll send it over.
            </p>
            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-paper px-4 py-3.5 text-ink transition-colors hover:bg-flame hover:text-ink"
            >
              <span className="flex items-center gap-2 text-[0.78rem] font-medium">
                <GithubIcon className="h-4 w-4" /> Request via GitHub
              </span>
              <span className="mono text-[0.48rem]">{IDENTITY.handle}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
