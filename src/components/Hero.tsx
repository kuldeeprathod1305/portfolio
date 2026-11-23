import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { HERO, IDENTITY, NAV, STATS } from "../data/profile";
import { GithubIcon, cx } from "./ui";
import ResumeCard from "./ResumeCard";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[92px] sm:pt-[108px]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-45" />
        <div className="absolute -right-[18%] -top-[25%] h-[70vw] max-h-[760px] w-[70vw] max-w-[760px] rounded-full bg-[radial-gradient(circle,rgba(255,61,0,0.24),transparent_62%)] blur-[60px]" />
        <div className="absolute left-[8%] top-1/3 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,61,0,0.1),transparent_65%)] blur-3xl" />
        <div className="speed-lines absolute inset-y-24 right-[3%] hidden w-40 opacity-25 md:block" />
      </div>

      <div className="wrap">
        <div className="hero-rise flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <span className="mono text-paper-mute">Portfolio / 2026</span>
          <span className="mono hidden items-center gap-2 text-paper/60 md:inline-flex">
            Python · Backend · Applied AI
          </span>
          <span className="mono flex items-center gap-2 text-paper-dim">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-tick" />
            {IDENTITY.availability}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 pt-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <div className="hero-rise flex flex-wrap items-center gap-x-3 gap-y-2" style={{ animationDelay: "60ms" }}>
              <span className="mono text-flame">{IDENTITY.role}</span>
              <span className="h-3 w-px bg-paper/25" />
              <span className="mono text-paper-dim">{IDENTITY.location}</span>
            </div>

            <h1 className="mt-4 font-display">
              <span
                className="hero-rise block text-[clamp(3.7rem,11vw,8.6rem)] tracking-[-0.02em]"
                style={{ animationDelay: "120ms" }}
              >
                {IDENTITY.firstName}
              </span>
              <span
                className="hero-rise -mt-1 block text-[clamp(3.7rem,11vw,8.6rem)] tracking-[-0.02em] sm:-mt-2"
                style={{ animationDelay: "200ms" }}
              >
                <span className="outline-type">{IDENTITY.lastName}</span><span className="text-flame">.</span>
              </span>
            </h1>

            <div className="hero-rise mt-5 max-w-xl" style={{ animationDelay: "280ms" }}>
              <p className="font-editorial text-[1.4rem] leading-tight text-paper sm:text-[1.7rem]">
                {HERO.lede}
              </p>
              <p className="mt-4 text-[0.92rem] leading-relaxed text-paper-dim">{HERO.body}</p>
            </div>

            {/* Single résumé entry point lives in the card + header. */}
            <div className="hero-rise mt-7 flex flex-wrap items-center gap-2.5" style={{ animationDelay: "340ms" }}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 rounded-full bg-paper px-5 py-3.5 text-[0.68rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-flame hover:text-ink"
              >
                View projects
                <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2.5 rounded-full border border-paper/20 px-4 py-3.5 text-[0.62rem] uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper/60"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                GitHub
                <ArrowUpRight className="h-3 w-3 text-paper/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <dl className="hero-rise mt-8 grid max-w-xl grid-cols-2 gap-y-4 border-t border-line pt-5 sm:grid-cols-4" style={{ animationDelay: "400ms" }}>
              {HERO.facts.map((fact, i) => (
                <div key={fact.label} className={cx(i > 0 && "sm:border-l sm:border-line sm:pl-4")}>
                  <dt className="mono text-[0.44rem] text-paper-mute">{fact.label}</dt>
                  <dd className="mt-1 text-[0.76rem] leading-snug text-paper">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-photo mx-auto w-full min-w-0 max-w-[430px]">
            <ResumeCard />
          </div>
        </div>

        {/* stats */}
        <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="group bg-ink px-4 py-4 transition-colors hover:bg-ink-up">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl leading-none text-paper transition-colors group-hover:text-flame sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mono text-[0.38rem] leading-snug text-paper/55">{stat.note}</span>
              </div>
              <p className="mono mt-2 text-[0.46rem] text-paper-mute">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* section rail */}
        <div className="mt-4 border-t border-line py-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="mono text-[0.44rem] text-paper/50">Jump to</span>
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group mono flex items-center gap-1.5 text-[0.48rem] text-paper-mute transition-colors hover:text-flame"
              >
                <span className="text-paper/50">{item.index}</span>
                {item.label}
                <ArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
