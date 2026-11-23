import { ArrowUpRight, Award, BookOpen, GraduationCap, MapPin } from "lucide-react";
import {
  ABOUT,
  EDUCATION,
  IDENTITY,
  INFO_ROWS,
  INTERESTS,
  LEARNING,
  LEARNING_GROUPS,
} from "../data/profile";
import { GithubIcon, Reveal, SectionLabel, cx } from "./ui";
import ResumeButton from "./ResumeButton";

const route = ["Python", "Backend", "Applied AI", "AI engineering"];
const activeStep = 2;

export default function About() {
  return (
    <section id="info" className="relative border-t border-line py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/4 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,61,0,0.08),transparent_65%)] blur-2xl" />
      <div className="wrap relative">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <Reveal>
              <SectionLabel index="01" label="Info" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-display text-[clamp(2.8rem,6.4vw,5.2rem)]">
                About <span className="text-flame">me.</span>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-5 font-editorial text-[1.45rem] leading-snug text-paper sm:text-[1.65rem]">
                Curious about systems, serious about the fundamentals.
              </p>
            </Reveal>

            <div className="mt-5 space-y-3.5">
              {ABOUT.map((paragraph, i) => (
                <Reveal key={i} delay={140 + i * 50}>
                  <p className={cx("leading-relaxed", i === 0 ? "text-[0.94rem] text-paper-dim" : "text-[0.88rem] text-paper-mute")}>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={220} className="mt-7">
              <p className="mono text-[0.44rem] text-paper/55">The direction</p>
              <div className="mt-3 grid grid-cols-4 gap-1.5">
                {route.map((step, i) => (
                  <div key={step}>
                    <span className={i <= activeStep ? "block h-1 rounded-full bg-flame" : "block h-1 rounded-full bg-paper/12"} />
                    <p className={i <= activeStep ? "mt-2 text-[0.66rem] leading-tight text-paper" : "mt-2 text-[0.66rem] leading-tight text-paper/55"}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mono mt-3 text-[0.4rem] leading-relaxed text-paper/55">
                A direction, not a claim of seniority. Each stage builds on the last.
              </p>
            </Reveal>

            <Reveal delay={260} className="mt-6 flex flex-wrap items-center gap-1.5">
              <span className="mono mr-1 text-[0.42rem] text-paper/55">Beyond tech</span>
              {INTERESTS.map((interest) => (
                <span key={interest} className="rounded-full border border-line px-2.5 py-1 mono text-[0.38rem] text-paper-dim">
                  {interest}
                </span>
              ))}
            </Reveal>
          </div>

          {/* profile card */}
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-soft">
              <div aria-hidden className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,61,0,0.24),transparent_65%)] blur-xl" />
              <div className="relative flex items-center justify-between border-b border-line px-4 py-3">
                <span className="mono text-[0.46rem] text-paper-mute">Quick profile</span>
                <span className="mono flex items-center gap-1.5 rounded-full border border-tick/30 bg-tick/10 px-2 py-0.5 text-[0.38rem] text-tick">
                  <span className="h-1 w-1 rounded-full bg-tick" /> open to work
                </span>
              </div>

              <div className="relative flex items-center gap-4 border-b border-line p-4 sm:p-5">
                <img
                  src={IDENTITY.avatar}
                  alt={`${IDENTITY.name} avatar`}
                  loading="lazy"
                  className="h-16 w-16 rounded-full border border-paper/20 bg-ink object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
                <div className="min-w-0">
                  <p className="font-display text-[1.7rem] leading-none text-paper">{IDENTITY.name}</p>
                  <p className="mt-1.5 text-[0.78rem] leading-snug text-paper-dim">{IDENTITY.role}</p>
                  <p className="mono mt-1.5 flex items-center gap-1.5 text-[0.4rem] text-paper/60">
                    <MapPin className="h-2.5 w-2.5 text-flame" /> {IDENTITY.location}
                    {IDENTITY.age ? ` · ${IDENTITY.age} yrs` : ""}
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-line">
                {INFO_ROWS.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                    <dt className="mono shrink-0 text-[0.4rem] text-paper-mute">{row.label}</dt>
                    <dd className="text-right text-[0.74rem] leading-snug text-paper">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-line p-4">
                <div className="flex flex-wrap gap-2">
                  <ResumeButton variant="red" label="Download résumé" className="!px-4 !py-2.5 !text-[0.46rem]" />
                  <a
                    href={IDENTITY.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group mono inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2.5 text-[0.46rem] text-paper transition-colors hover:border-flame hover:text-flame"
                  >
                    <GithubIcon className="h-3.5 w-3.5" /> GitHub
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* education + certifications */}
        <div className="mt-14 border-t border-line pt-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mono text-[0.46rem] text-paper-mute">Education & certifications</p>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl">
                The <span className="text-flame">record.</span>
              </h3>
            </div>
            <p className="mono max-w-sm text-[0.4rem] leading-relaxed text-paper/55">
              Continuous learning is part of the job. Everything below is real and verifiable on request.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
            {/* education */}
            <Reveal>
              <div className="h-full rounded-xl border border-line bg-ink-soft p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="mono flex items-center gap-2 text-[0.44rem] text-paper-mute">
                    <GraduationCap className="h-3.5 w-3.5 text-flame" /> Education
                  </span>
                  <span className="mono rounded-full border border-tick/25 bg-tick/10 px-2 py-0.5 text-[0.36rem] text-tick">
                    CGPA {EDUCATION.cgpa}
                  </span>
                </div>

                <p className="mt-4 font-display text-[1.6rem] leading-none text-paper">
                  {EDUCATION.degree}
                </p>
                <p className="mt-1.5 text-[0.84rem] text-flame">{EDUCATION.field}</p>
                <p className="mt-2 text-[0.8rem] text-paper-dim">{EDUCATION.college}</p>
                <p className="mono mt-1 text-[0.4rem] leading-relaxed text-paper/60">{EDUCATION.affiliation}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="mono rounded-full border border-line px-2.5 py-1 text-[0.38rem] text-paper-mute">
                    {EDUCATION.duration}
                  </span>
                  <span className="mono rounded-full border border-line px-2.5 py-1 text-[0.38rem] text-paper-mute">
                    Currently studying
                  </span>
                </div>

                <div className="mt-4 border-t border-line pt-3">
                  <p className="mono flex items-center gap-1.5 text-[0.4rem] text-paper/55">
                    <BookOpen className="h-3 w-3" /> Academic interests
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {EDUCATION.interests.map((interest) => (
                      <span key={interest} className="rounded-full border border-line px-2 py-0.5 text-[0.58rem] text-paper-mute">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-[0.7rem] leading-relaxed text-paper/55">{EDUCATION.note}</p>
              </div>
            </Reveal>

            {/* learning records */}
            <Reveal delay={80}>
              <div className="h-full rounded-xl border border-line bg-ink-soft p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="mono flex items-center gap-2 text-[0.44rem] text-paper-mute">
                    <Award className="h-3.5 w-3.5 text-flame" /> Certifications & learning
                  </span>
                  <span className="mono text-[0.36rem] text-paper/55">{LEARNING.length} records</span>
                </div>

                <div className="mt-3 divide-y divide-line/80">
                  {LEARNING_GROUPS.map((group) => {
                    const records = LEARNING.filter((record) => record.group === group);
                    if (records.length === 0) return null;
                    return (
                      <div key={group} className="py-2.5 first:pt-0 last:pb-0">
                        <p className="mono mb-1.5 text-[0.36rem] text-paper/55">{group}</p>
                        <ul className="space-y-1.5">
                          {records.map((record) => (
                            <li key={`${record.title}-${record.date}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                              <span className="text-[0.76rem] leading-snug text-paper-dim">{record.title}</span>
                              <span className="mono text-[0.34rem] text-paper/55">
                                {record.issuer} · {record.date}
                              </span>
                              {record.score && (
                                <span className="mono rounded-full border border-tick/25 bg-tick/10 px-1.5 py-0.5 text-[0.32rem] text-tick">
                                  {record.score}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
                <p className="mono mt-2 border-t border-line pt-2 text-[0.34rem] leading-relaxed text-paper/50">
                  Course names and dates as issued. Certificates available on request.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
