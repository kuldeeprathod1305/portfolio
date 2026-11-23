import { Check } from "lucide-react";
import { SKILL_COUNT, SKILL_GROUPS, SKILL_NOTE } from "../data/profile";
import { Reveal, SectionLabel } from "./ui";

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-y border-line bg-ink-soft py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 opacity-30" />
        <div className="absolute -right-20 top-10 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(255,61,0,0.1),transparent_65%)] blur-2xl" />
      </div>
      <div className="wrap relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionLabel index="02" label="Skills" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-display text-[clamp(2.8rem,6.6vw,5.4rem)]">
                The <span className="text-flame">toolkit.</span>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-4 max-w-lg text-[0.9rem] leading-relaxed text-paper-dim">{SKILL_NOTE}</p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div className="rounded-xl border border-line bg-ink px-5 py-4">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl leading-none text-paper">{SKILL_COUNT}</span>
                <span className="mono text-[0.42rem] text-tick">all active</span>
              </div>
              <p className="mono mt-1.5 text-[0.42rem] text-paper-mute">skills in practice · 06 areas</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <Reveal key={group.title} delay={Math.min(groupIndex * 60, 280)}>
              <div className="group h-full rounded-xl border border-line bg-ink p-4 transition-colors duration-300 hover:border-flame/40 sm:p-5">
                <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
                  <div>
                    <p className="text-[0.94rem] font-medium text-paper">{group.title}</p>
                    <p className="mono mt-1 text-[0.4rem] text-paper/55">{group.note}</p>
                  </div>
                  <span className="mono shrink-0 rounded-full border border-tick/25 bg-tick/10 px-2 py-0.5 text-[0.36rem] text-tick">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full border border-tick/35 bg-tick/12 text-tick">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span className="text-[0.8rem] text-paper-dim transition-colors group-hover:text-paper">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line bg-ink px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2.5 text-[0.78rem] text-paper-dim">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-tick/15 text-tick">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              Nothing pending here — every skill listed is one I&apos;m actively working with.
            </p>
            <span className="mono text-[0.42rem] text-paper/55">Always adding, never bluffing</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
