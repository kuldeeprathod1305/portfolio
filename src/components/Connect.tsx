import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, MessageSquare, Send, Trash2, User } from "lucide-react";
import { CONNECT, IDENTITY } from "../data/profile";
import { GithubIcon, Reveal, SectionLabel, cx, useIstTime } from "./ui";
import ResumeButton from "./ResumeButton";

type Note = { id: string; name: string; role: string; message: string; date: number };
type FieldErrors = { name?: string; note?: string };
type TimerKey = "sent" | "copied" | "confirm" | "copyFailed";

const STORAGE_KEY = "kr-guestbook-v1";
const MAX_NOTES = 40;

function isNote(value: unknown): value is Note {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.name === "string" &&
    typeof v.role === "string" &&
    typeof v.message === "string" &&
    typeof v.date === "number"
  );
}

/** Reads saved notes, ignoring anything malformed so a bad value can never break the page. */
function readNotes(): Note[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isNote).slice(0, MAX_NOTES) : [];
  } catch {
    return [];
  }
}

function formatDate(value: number) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function Connect() {
  const time = useIstTime();
  const [notes, setNotes] = useState<Note[]>(readNotes);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const noteRef = useRef<HTMLTextAreaElement | null>(null);
  const timers = useRef<Record<TimerKey, number | undefined>>({
    sent: undefined,
    copied: undefined,
    confirm: undefined,
    copyFailed: undefined,
  });

  const schedule = (key: TimerKey, fn: () => void, ms: number) => {
    window.clearTimeout(timers.current[key]);
    timers.current[key] = window.setTimeout(fn, ms);
  };

  useEffect(() => {
    const t = timers.current;
    return () => {
      window.clearTimeout(t.sent);
      window.clearTimeout(t.copied);
      window.clearTimeout(t.confirm);
      window.clearTimeout(t.copyFailed);
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Storage can be unavailable (private mode, quota). Notes still work for this visit.
    }
  }, [notes]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    const next: FieldErrors = {};
    if (cleanName.length < 2) next.name = "Add your name (at least 2 characters).";
    if (cleanMessage.length < 4) next.note = "Write a slightly longer note (at least 4 characters).";
    setErrors(next);
    if (next.name) {
      nameRef.current?.focus();
      return;
    }
    if (next.note) {
      noteRef.current?.focus();
      return;
    }

    const note: Note = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: cleanName.slice(0, 40),
      role: role.trim().slice(0, 40),
      message: cleanMessage.slice(0, 320),
      date: Date.now(),
    };
    setNotes((prev) => [note, ...prev].slice(0, MAX_NOTES));
    setName("");
    setRole("");
    setMessage("");
    setSent(true);
    schedule("sent", () => setSent(false), 3000);
  };

  // Two-step confirmation so a stray click cannot wipe the guestbook.
  const requestClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      schedule("confirm", () => setConfirmClear(false), 4000);
      return;
    }
    window.clearTimeout(timers.current.confirm);
    setConfirmClear(false);
    setNotes([]);
  };

  const copyEmail = async () => {
    if (!IDENTITY.email) return;
    try {
      await navigator.clipboard.writeText(IDENTITY.email);
      setCopied(true);
      setCopyFailed(false);
      schedule("copied", () => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
      schedule("copyFailed", () => setCopyFailed(false), 3000);
    }
  };

  return (
    <section id="connect" className="relative overflow-hidden border-t border-line py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 opacity-30" />
        <div className="absolute -bottom-40 left-1/4 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,61,0,0.18),transparent_65%)] blur-3xl" />
      </div>

      <div className="wrap relative">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          {/* contact */}
          <div>
            <Reveal>
              <SectionLabel index="04" label="Connect" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-display text-[clamp(2.9rem,7vw,5.6rem)]">
                {CONNECT.headline}
                <span className="text-flame">.</span>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-paper-dim">{CONNECT.lede}</p>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-4 font-editorial text-[1.35rem] leading-snug text-paper">
                Tell me the problem. I&apos;ll show up curious.
              </p>
            </Reveal>

            <Reveal delay={200} className="mt-6 flex flex-wrap items-center gap-2.5">
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-5 rounded-full bg-paper px-5 py-3.5 text-[0.66rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-flame hover:text-ink"
              >
                <span className="flex items-center gap-2">
                  <Send aria-hidden="true" className="h-3.5 w-3.5" /> Message on GitHub
                </span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <ResumeButton variant="outline" label="Download résumé" className="!px-5 !py-3.5 !text-[0.52rem]" />
            </Reveal>

            <Reveal delay={240} className="mt-6 overflow-hidden rounded-2xl border border-line bg-ink-soft">
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-4 border-b border-line px-4 py-3.5 transition-colors hover:bg-paper/[0.04]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-ink text-paper">
                  <GithubIcon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mono block text-[0.4rem] text-paper-mute">Best route</span>
                  <span className="mt-1 block truncate text-[0.82rem] text-paper">{IDENTITY.handle}</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-paper-mute transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame" />
              </a>

              <div className="flex items-center gap-4 border-b border-line px-4 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-ink text-paper-mute">
                  <User aria-hidden="true" className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="mono text-[0.4rem] text-paper-mute">Email</p>
                  {IDENTITY.email ? (
                    <a
                      href={`mailto:${IDENTITY.email}`}
                      className="mt-1 block truncate text-[0.82rem] text-paper underline decoration-flame/60 underline-offset-4 transition-colors hover:text-flame"
                    >
                      {IDENTITY.email}
                    </a>
                  ) : (
                    <p className="mt-1 truncate text-[0.82rem] text-paper">Available on request</p>
                  )}
                </div>
                {IDENTITY.email ? (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="mono inline-flex shrink-0 items-center gap-1.5 rounded-full border border-paper/15 px-2.5 py-1.5 text-[0.38rem] text-paper-mute transition-colors hover:border-flame hover:text-flame"
                  >
                    {copied ? <Check aria-hidden="true" className="h-2.5 w-2.5 text-tick" /> : <Copy aria-hidden="true" className="h-2.5 w-2.5" />}
                    {copied ? "Copied" : copyFailed ? "Select to copy" : "Copy email"}
                  </button>
                ) : (
                  <a
                    href={IDENTITY.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono inline-flex shrink-0 items-center gap-1 text-[0.38rem] text-paper-mute transition-colors hover:text-flame"
                  >
                    Request
                    <ArrowUpRight aria-hidden="true" className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-2 divide-x divide-line">
                <div className="px-4 py-3.5">
                  <p className="mono text-[0.4rem] text-paper-mute">Local time</p>
                  <p className="mt-1 font-display text-2xl leading-none tabular-nums text-paper" aria-live="off">
                    {time}
                  </p>
                  <p className="mono mt-1 text-[0.38rem] text-paper/50">IST · Gujarat</p>
                </div>
                <div className="px-4 py-3.5">
                  <p className="mono text-[0.4rem] text-paper-mute">Looking for</p>
                  <p className="mt-1 text-[0.76rem] leading-snug text-paper">Internships · junior Python / backend</p>
                  <p className="mono mt-1 flex items-center gap-1.5 text-[0.38rem] text-tick">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-tick" /> available
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <p className="mono mt-3 flex items-center gap-2 text-[0.42rem] text-paper/55">
                <Check aria-hidden="true" className="h-3 w-3 text-tick" /> Open to internships, junior roles, open-source and feedback.
              </p>
            </Reveal>
          </div>

          {/* guestbook: a local, browser-only demo */}
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl border border-line bg-ink-soft">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-5">
                <h3 className="mono flex items-center gap-2 text-[0.5rem] text-paper">
                  <MessageSquare aria-hidden="true" className="h-3.5 w-3.5 text-flame" /> {CONNECT.guestbookTitle}
                </h3>
                <div className="flex items-center gap-2">
                  {notes.length > 0 && (
                    <button
                      type="button"
                      onClick={requestClear}
                      className={cx(
                        "mono inline-flex items-center gap-1 text-[0.36rem] transition-colors",
                        confirmClear ? "text-flame" : "text-paper/55 hover:text-flame",
                      )}
                    >
                      <Trash2 aria-hidden="true" className="h-2.5 w-2.5" />
                      {confirmClear ? "confirm clear" : "clear all"}
                    </button>
                  )}
                  <span className="mono rounded-full border border-paper/15 px-2.5 py-1 text-[0.4rem] text-paper-mute">
                    {notes.length.toString().padStart(2, "0")} {notes.length === 1 ? "note" : "notes"}
                  </span>
                </div>
              </div>

              <form onSubmit={submit} noValidate className="border-b border-line p-4 sm:p-5">
                <p className="text-[0.8rem] leading-relaxed text-paper-dim">{CONNECT.guestbookNote}</p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div>
                    <label htmlFor="gb-name" className="mono mb-1.5 block text-[0.4rem] text-paper-mute">
                      Name <span aria-hidden="true" className="text-flame">*</span>
                    </label>
                    <input
                      id="gb-name"
                      ref={nameRef}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      maxLength={40}
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "gb-name-error" : undefined}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-[0.82rem] text-paper outline-none transition-colors placeholder:text-paper/50 focus:border-flame/60"
                    />
                    {errors.name && (
                      <p id="gb-name-error" role="alert" className="mono mt-1.5 text-[0.4rem] text-flame">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="gb-role" className="mono mb-1.5 block text-[0.4rem] text-paper-mute">
                      Context (optional)
                    </label>
                    <input
                      id="gb-role"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      maxLength={40}
                      autoComplete="off"
                      placeholder="Recruiter, friend, fellow dev…"
                      className="w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-[0.82rem] text-paper outline-none transition-colors placeholder:text-paper/50 focus:border-flame/60"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label htmlFor="gb-note" className="mono mb-1.5 block text-[0.4rem] text-paper-mute">
                    Note <span aria-hidden="true" className="text-flame">*</span>
                  </label>
                  <textarea
                    id="gb-note"
                    ref={noteRef}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={320}
                    rows={3}
                    required
                    aria-required="true"
                    aria-invalid={errors.note ? "true" : undefined}
                    aria-describedby={cx("gb-count", errors.note && "gb-note-error")}
                    placeholder="What did you think of the portfolio? Any feedback?"
                    className="w-full resize-y rounded-lg border border-line bg-ink px-3 py-2.5 text-[0.82rem] leading-relaxed text-paper outline-none transition-colors placeholder:text-paper/50 focus:border-flame/60"
                  />
                  {errors.note && (
                    <p id="gb-note-error" role="alert" className="mono mt-1.5 text-[0.4rem] text-flame">
                      {errors.note}
                    </p>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span id="gb-count" className="mono text-[0.38rem] text-paper/50">
                      {message.length} / 320
                    </span>
                    <span role="status" aria-live="polite" className="mono flex items-center gap-1.5 text-[0.38rem] text-tick">
                      {sent && (
                        <>
                          <Check aria-hidden="true" className="h-2.5 w-2.5" /> Note posted
                        </>
                      )}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className={cx(
                      "group inline-flex items-center gap-3 rounded-full px-4 py-2.5 mono text-[0.46rem] transition-colors",
                      sent ? "bg-tick text-ink" : "bg-flame text-ink hover:bg-paper",
                    )}
                  >
                    {sent ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Send aria-hidden="true" className="h-3.5 w-3.5" />}
                    {sent ? "Posted" : "Post a note"}
                  </button>
                </div>
              </form>

              <div className="max-h-[360px] overflow-y-auto">
                {notes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 px-5 py-10 text-center">
                    <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-dashed border-paper/20 text-paper/50">
                      <MessageSquare className="h-4 w-4" />
                    </span>
                    <p className="text-[0.84rem] text-paper">No notes yet.</p>
                    <p className="max-w-[16rem] text-[0.72rem] leading-relaxed text-paper/55">
                      Be the first to leave a comment. Feedback on the projects or the site is genuinely useful.
                    </p>
                  </div>
                ) : (
                  <ul aria-label="Guestbook notes">
                    {notes.map((note) => (
                      <li key={note.id} className="group border-b border-line px-4 py-3.5 last:border-0 sm:px-5">
                        <div className="flex items-start gap-3">
                          <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-ink font-display text-sm text-flame">
                            {note.name.slice(0, 1).toUpperCase()}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                              <span className="text-[0.8rem] font-medium text-paper">{note.name}</span>
                              {note.role && (
                                <span className="mono rounded-full border border-line px-1.5 py-0.5 text-[0.34rem] text-paper/55">
                                  {note.role}
                                </span>
                              )}
                              <time dateTime={new Date(note.date).toISOString()} className="mono ml-auto text-[0.36rem] text-paper/50">
                                {formatDate(note.date)}
                              </time>
                            </div>
                            <p className="mt-1.5 whitespace-pre-wrap break-words text-[0.8rem] leading-relaxed text-paper-dim">
                              {note.message}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setNotes((prev) => prev.filter((item) => item.id !== note.id))}
                            aria-label={`Delete note from ${note.name}`}
                            className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-transparent text-paper/50 transition-colors hover:border-flame/40 hover:text-flame"
                          >
                            <Trash2 aria-hidden="true" className="h-3 w-3" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-line px-4 py-2.5">
                <p className="mono text-[0.36rem] leading-relaxed text-paper/50">
                  Local demo guestbook. Notes stay in this browser only. Reloading keeps them, but other devices won&apos;t see them.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
