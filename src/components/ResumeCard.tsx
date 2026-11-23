import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, Copy, Download, FileText, GraduationCap } from "lucide-react";
import heroImg from "../assets/hero.jpg";
import { IDENTITY, RESUME } from "../data/profile";
import { PROJECTS } from "../data/projects";
import { cx } from "./ui";

type Tab = (typeof RESUME.tabs)[number];

const TABS: readonly Tab[] = RESUME.tabs;
const FEATURED = PROJECTS.slice(0, 3);
const PANEL_ID = "resume-panel";

const tabId = (tab: Tab) => `resume-tab-${tab.toLowerCase().replace(/[^a-z]+/g, "-")}`;

export default function ResumeCard() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [copied, setCopied] = useState<"email" | "link" | null>(null);
  const [notice, setNotice] = useState("");
  const resetTimer = useRef<number | undefined>(undefined);
  const tabRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const flash = (kind: "email" | "link", message: string) => {
    setCopied(kind);
    setNotice(message);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      setCopied(null);
      setNotice("");
    }, 2000);
  };

  const copy = async (kind: "email" | "link", value: string, message: string) => {
    try {
      await navigator.clipboard.writeText(value);
      flash(kind, message);
    } catch {
      // Clipboard can be blocked (insecure context, permissions). Say so instead of failing silently.
      setCopied(null);
      setNotice("Copy blocked. Select the text to copy it.");
    }
  };

  // WAI-ARIA tabs pattern: arrow keys, Home and End move between tabs.
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    if (next === -1) return;
    event.preventDefault();
    const target = TABS[next];
    setTab(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2.5 translate-x-1.5 translate-y-2 rounded-2xl border border-paper/10"
      />
      <div className="relative overflow-hidden rounded-2xl border border-paper/15 bg-ink-soft shadow-[0_40px_90px_-35px_rgba(0,0,0,0.95)]">
        {/* header strip */}
        <div className="relative h-[96px] overflow-hidden sm:h-[104px]">
          <img src={heroImg} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-75" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-soft via-ink/25 to-ink/20" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3.5">
            <span className="mono text-[0.42rem] text-paper/80">Résumé · preview</span>
            <span className="mono flex items-center gap-1.5 rounded-full border border-tick/35 bg-ink/70 px-2 py-0.5 text-[0.38rem] text-tick backdrop-blur">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-tick" /> ready
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5">
            <p className="font-editorial text-[1.3rem] leading-none text-paper">{RESUME.title}</p>
            <span className="mono text-[0.36rem] text-paper/60">{RESUME.meta}</span>
          </div>
        </div>

        {/* tabs */}
        <div
          role="tablist"
          aria-label="Résumé preview sections"
          className="flex items-center gap-1 border-y border-line bg-ink px-2.5 py-1.5"
        >
          {TABS.map((item, index) => {
            const selected = tab === item;
            return (
              <button
                key={item}
                ref={(el) => {
                  tabRefs.current[item] = el;
                }}
                id={tabId(item)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={PANEL_ID}
                tabIndex={selected ? 0 : -1}
                onClick={() => setTab(item)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={cx(
                  "relative flex-1 rounded-md px-2 py-2 mono text-[0.4rem] transition-colors",
                  selected ? "bg-flame text-ink" : "text-paper-mute hover:bg-paper/[0.06] hover:text-paper",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* fixed minimum height: switching tabs does not jump the card */}
        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={tabId(tab)}
          tabIndex={0}
          className="min-h-[178px] px-3.5 py-3 sm:px-4"
        >
          {tab === "Overview" && (
            <div>
              <div className="flex items-start gap-2.5 rounded-lg border border-line bg-ink px-3 py-2.5">
                <GraduationCap aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                <div className="min-w-0">
                  <p className="truncate text-[0.76rem] text-paper">B.E. Information Technology</p>
                  <p className="mono mt-0.5 truncate text-[0.38rem] text-paper/55">SAL College of Engineering · GTU</p>
                </div>
                <span className="mono ml-auto shrink-0 rounded-full border border-tick/25 bg-tick/10 px-1.5 py-0.5 text-[0.34rem] text-tick">
                  CGPA 7.70
                </span>
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-x-3 content-start">
                {RESUME.overview.slice(1).map((row) => (
                  <div key={row.label} className="border-b border-line/70 py-1.5">
                    <dt className="mono text-[0.36rem] text-paper/50">{row.label}</dt>
                    <dd className="mt-0.5 truncate text-[0.66rem] text-paper-dim">{row.value}</dd>
                  </div>
                ))}
                <div className="col-span-2 flex items-center gap-1.5 pt-1.5">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-tick" />
                  <span className="mono text-[0.36rem] text-paper/55">{IDENTITY.availability}</span>
                </div>
              </dl>
            </div>
          )}

          {tab === "Stack & APIs" && (
            <div>
              <p className="text-[0.72rem] leading-relaxed text-paper-dim">
                Python first, with backend and data tooling in daily practice:
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-1">
                {RESUME.stack.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-ink px-2 py-1 mono text-[0.36rem] text-paper-dim"
                  >
                    <Check aria-hidden="true" className="h-2 w-2 text-tick" strokeWidth={3} /> {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between rounded-lg border border-line bg-ink px-3 py-2">
                <div>
                  <p className="mono text-[0.34rem] text-paper/50">Current focus</p>
                  <p className="mt-0.5 text-[0.68rem] text-paper">FastAPI endpoints + PostgreSQL</p>
                </div>
                <span className="mono text-[0.34rem] text-flame">learning</span>
              </div>
            </div>
          )}

          {tab === "Key builds" && (
            <div>
              <p className="mono text-[0.36rem] text-paper/50">Selected from the projects below</p>
              <ul className="mt-1.5">
                {FEATURED.map((project) => (
                  <li key={project.name} className="border-b border-line/70 last:border-0">
                    <a href="#projects" className="group flex items-center gap-2 py-1.5">
                      <span className="mono text-[0.34rem] text-flame">{project.index}</span>
                      <span className="min-w-0 flex-1 truncate text-[0.68rem] text-paper-dim transition-colors group-hover:text-paper">
                        {project.name}
                      </span>
                      <span className="mono shrink-0 text-[0.32rem] text-paper/50">{project.status}</span>
                      <ArrowUpRight aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-paper/50 transition-colors group-hover:text-flame" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* primary and secondary actions */}
        <div className="border-t border-line p-3.5 pt-3">
          <a
            href={IDENTITY.resumeUrl}
            download={RESUME.filename}
            className="group flex w-full items-center justify-between gap-3 rounded-full bg-flame px-4 py-3 text-ink transition-colors hover:bg-paper"
          >
            <span className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.12em]">
              <Download aria-hidden="true" className="h-3.5 w-3.5" /> Download PDF
            </span>
            <span className="mono truncate text-[0.38rem] opacity-80">{RESUME.filename}</span>
          </a>

          <div className="mt-1.5 flex items-center gap-1.5">
            {IDENTITY.email ? (
              <button
                type="button"
                onClick={() => copy("email", IDENTITY.email as string, "Email copied")}
                className="group flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-paper/15 px-2 py-2 mono text-[0.36rem] text-paper-mute transition-colors hover:border-paper/40 hover:text-paper"
              >
                {copied === "email" ? (
                  <Check aria-hidden="true" className="h-2.5 w-2.5 text-tick" />
                ) : (
                  <Copy aria-hidden="true" className="h-2.5 w-2.5" />
                )}
                {copied === "email" ? "Email copied" : "Copy email"}
              </button>
            ) : (
              <a
                href="#projects"
                className="group flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-paper/15 px-2 py-2 mono text-[0.36rem] text-paper-mute transition-colors hover:border-paper/40 hover:text-paper"
              >
                <FileText aria-hidden="true" className="h-2.5 w-2.5" /> View projects
              </a>
            )}
            <button
              type="button"
              onClick={() => copy("link", IDENTITY.github, "GitHub link copied")}
              className="group flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-paper/15 px-2 py-2 mono text-[0.36rem] text-paper-mute transition-colors hover:border-paper/40 hover:text-paper"
            >
              {copied === "link" ? (
                <Check aria-hidden="true" className="h-2.5 w-2.5 text-tick" />
              ) : (
                <Copy aria-hidden="true" className="h-2.5 w-2.5" />
              )}
              {copied === "link" ? "Link copied" : "Copy GitHub"}
            </button>
          </div>

          <div role="status" aria-live="polite" className="mt-2 flex h-3 items-center justify-between gap-2">
            <span className="mono text-[0.32rem] text-paper/50">
              {IDENTITY.email ? "Direct email available" : "Email on request · GitHub is the best route"}
            </span>
            {notice && (
              <span className={cx("mono text-[0.32rem]", copied ? "text-tick" : "text-flame")}>{notice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
