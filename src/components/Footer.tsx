import { ArrowUp, ArrowUpRight } from "lucide-react";
import { IDENTITY, NAV } from "../data/profile";
import { GithubIcon, useIstTime } from "./ui";
import ResumeButton from "./ResumeButton";

export default function Footer() {
  const time = useIstTime();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-soft">
      <div className="wrap pt-10">
        <div className="grid gap-8 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-[6px] bg-flame font-display text-base leading-none text-ink">
                K
              </span>
              <span className="font-display text-[0.95rem] text-paper">{IDENTITY.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-[0.8rem] leading-relaxed text-paper-dim">
              Aspiring Python developer building toward backend engineering and applied AI. Honest
              about where I am; serious about where I&apos;m going.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="mono flex items-center gap-1.5 text-[0.42rem] text-paper/55">
                <span className="live-dot h-1 w-1 rounded-full bg-tick" /> {IDENTITY.availability}
              </p>
              <span className="mono text-[0.42rem] text-paper/50">·</span>
              <p className="mono text-[0.42rem] text-paper/55">{IDENTITY.location}</p>
            </div>
          </div>

          <div>
            <p className="mono text-[0.44rem] text-paper-mute">Sections</p>
            <ul className="mt-3 space-y-2">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="link-line inline-flex items-center gap-2 text-[0.8rem] text-paper-dim transition-colors hover:text-paper"
                  >
                    <span className="mono text-[0.4rem] text-paper/50">{item.index}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono text-[0.44rem] text-paper-mute">Reach me</p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 text-[0.8rem] text-paper-dim transition-colors hover:text-flame"
                >
                  <GithubIcon className="h-3.5 w-3.5" /> GitHub
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li className="text-[0.8rem] text-paper-dim">
                {IDENTITY.email ?? "Email on request"}
              </li>
              <li>
                <ResumeButton
                  variant="outline"
                  label="Résumé (PDF)"
                  className="!px-3.5 !py-2 !text-[0.44rem] !normal-case !tracking-[0.04em]"
                />
              </li>
            </ul>
            <p className="mono mt-4 text-[0.42rem] text-paper/55">Local time</p>
            <p className="font-display text-2xl leading-none tabular-nums text-paper">{time}</p>
          </div>
        </div>

        <div className="select-none overflow-hidden border-t border-line pt-5">
          <p
            className="font-display leading-[0.82] text-transparent"
            style={{ fontSize: "clamp(2.5rem, 11.6vw, 10.4rem)", WebkitTextStroke: "1.4px rgba(239,234,225,0.24)" }}
          >
            Kuldeep Rathod
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line py-5">
          <p className="mono text-[0.42rem] text-paper/55">
            © {new Date().getFullYear()} Kuldeep Rathod · built and maintained by me
          </p>
          <div className="flex items-center gap-4">
            <span className="mono text-[0.42rem] text-paper/50">React · Vite · Tailwind</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group mono inline-flex items-center gap-1.5 text-[0.42rem] text-flame transition-colors hover:text-paper"
            >
              Back to top <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
