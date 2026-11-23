import { ArrowUpRight, Check } from "lucide-react";
import { OTHER_REPOS, PROJECTS, type Project, type ProjectStatus } from "../data/projects";
import { IDENTITY, PROJECT_NOTE, STATUS_KEY } from "../data/profile";
import { GithubIcon, Reveal, SectionLabel, cx } from "./ui";

// Each status has one colour and one plain-language note. Keep these in sync with STATUS_KEY.
const STATUS_STYLE: Record<ProjectStatus, { pill: string; dot: string; note: string }> = {
  Concept: { pill: "border-paper/25 bg-paper/10 text-paper-dim", dot: "bg-paper/60", note: "Shaping the idea" },
  "Active build": { pill: "border-sun/30 bg-sun/10 text-sun", dot: "bg-sun", note: "Work in progress" },
  MVP: { pill: "border-flame/35 bg-flame/10 text-flame", dot: "bg-flame", note: "Minimum version built" },
  Completed: { pill: "border-tick/30 bg-tick/10 text-tick", dot: "bg-tick", note: "Finished to planned scope" },
};

const TOTAL = String(PROJECTS.length).padStart(2, "0");

function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cx(
        "mono inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[0.4rem]",
        STATUS_STYLE[status].pill,
      )}
    >
      <span aria-hidden="true" className={cx("h-1 w-1 rounded-full", STATUS_STYLE[status].dot)} />
      {status}
    </span>
  );
}

function RepoLink({ name, href, small = false }: { name: string; href: string; small?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${name} repository on GitHub (opens in a new tab)`}
      className={cx(
        "group/link mono inline-flex items-center gap-2 rounded-full border border-paper/20 px-3.5 py-2 text-paper transition-colors hover:border-flame hover:bg-flame hover:text-ink",
        small ? "text-[0.46rem]" : "text-[0.5rem]",
      )}
    >
      <GithubIcon className="h-3.5 w-3.5" />
      Repository
      <ArrowUpRight aria-hidden="true" className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

function Flow({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <ol className={cx("flex flex-wrap items-center", compact ? "mt-1 gap-1" : "gap-x-2 gap-y-1.5")}>
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className={cx("text-paper-dim", compact ? "text-[0.62rem]" : "mono text-[0.38rem]")}>{step}</span>
          {i < steps.length - 1 && (
            <ArrowUpRight
              aria-hidden="true"
              className={cx("-rotate-45 text-flame/70", compact ? "h-2 w-2" : "h-2.5 w-2.5")}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="group relative overflow-hidden rounded-2xl border border-flame/25 bg-ink-soft transition-colors duration-500 hover:border-flame/50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_85%_-10%,rgba(255,61,0,0.16),transparent_60%)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-14 right-4 font-display text-[11rem] leading-none text-transparent"
          style={{ WebkitTextStroke: "1.2px rgba(255,61,0,0.16)" }}
        >
          AI
        </span>
        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mono flex items-center gap-2 rounded-full bg-flame px-2.5 py-1 text-[0.4rem] text-ink">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ink" /> Flagship project
              </span>
              <StatusPill status={project.status} />
              <span className="mono ml-auto text-[0.42rem] text-paper/55">
                {project.index} / {TOTAL}
              </span>
            </div>

            <h3 className="mt-5 font-display text-[clamp(2.6rem,6.4vw,4.8rem)] leading-[0.85] text-paper transition-colors group-hover:text-flame">
              {project.name}
            </h3>
            <p className="mono mt-2.5 text-[0.46rem] text-paper/60">{project.domain}</p>
            <p className="mt-4 max-w-xl text-[0.88rem] leading-relaxed text-paper-dim">{project.summary}</p>

            {project.workflow && (
              <div className="mt-4 rounded-lg border border-line bg-ink px-3 py-2">
                <p className="mono mb-1 text-[0.36rem] text-paper/55">Planned flow</p>
                <Flow steps={project.workflow} />
              </div>
            )}

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line px-2.5 py-1 mono text-[0.42rem] text-paper-mute transition-colors group-hover:border-paper/20 group-hover:text-paper-dim"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <RepoLink name={project.name} href={project.href} />
            </div>
          </div>

          <div className="relative border-t border-line p-5 sm:p-7 lg:border-l lg:border-t-0">
            <p className="mono text-[0.44rem] text-paper/55">Inside the build</p>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-flame/35 bg-flame/10 text-flame"
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <span className="text-[0.8rem] leading-snug text-paper-dim">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between gap-2 border-t border-line pt-3">
              <span className="mono text-[0.38rem] text-paper/55">{STATUS_STYLE[project.status].note}</span>
              <span className="mono text-[0.38rem] text-flame">{project.status}</span>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function LeadCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col rounded-2xl border border-line bg-ink-soft p-5 transition-colors duration-300 hover:border-flame/45">
        <div className="flex items-center justify-between gap-2">
          <span className="mono text-[0.44rem] text-paper/55">{project.index}</span>
          <StatusPill status={project.status} />
        </div>
        <h3 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] leading-none text-paper transition-colors group-hover:text-flame">
          {project.name}
        </h3>
        <p className="mono mt-2 text-[0.42rem] text-paper/60">{project.domain}</p>
        <p className="mt-3 text-[0.82rem] leading-relaxed text-paper-dim">{project.summary}</p>

        {project.workflow && (
          <div className="mt-3 rounded-lg border border-line bg-ink px-2.5 py-2">
            <p className="mono text-[0.34rem] text-paper/55">Planned flow</p>
            <Flow steps={project.workflow} compact />
          </div>
        )}

        <ul className="mt-4 space-y-1.5">
          {project.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2 text-[0.74rem] text-paper-mute">
              <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-flame/70" />
              {item}
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <li key={tech} className="rounded-full border border-line px-2 py-0.5 mono text-[0.38rem] text-paper-mute">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <RepoLink name={project.name} href={project.href} small />
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-paper/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame" />
        </div>
      </article>
    </Reveal>
  );
}

function MiniCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col rounded-xl border border-line bg-ink p-4 transition-colors duration-300 hover:border-flame/40">
        <div className="flex items-center justify-between gap-2">
          <span className="mono text-[0.42rem] text-paper/50">{project.index}</span>
          <StatusPill status={project.status} />
        </div>
        <h3 className="mt-3.5 text-[0.98rem] font-medium leading-snug text-paper transition-colors group-hover:text-flame">
          {project.name}
        </h3>
        <p className="mono mt-1 text-[0.38rem] text-paper/55">{project.domain}</p>
        <p className="mt-2.5 text-[0.76rem] leading-relaxed text-paper-mute">{project.summary}</p>

        <ul className="mt-3 flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((tech) => (
            <li key={tech} className="rounded-full border border-line px-2 py-0.5 mono text-[0.36rem] text-paper/60">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3 mt-4">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.name} repository on GitHub (opens in a new tab)`}
            className="mono inline-flex items-center gap-1.5 text-[0.42rem] text-paper-mute transition-colors hover:text-flame"
          >
            <GithubIcon className="h-3 w-3" /> Repository
          </a>
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-paper/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame" />
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const [flagship, ...rest] = PROJECTS;
  const leads = rest.slice(0, 2);
  const others = rest.slice(2);

  return (
    <section id="projects" className="relative py-20 sm:py-24">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionLabel index="03" label="Projects" />
            </Reveal>
            <Reveal delay={60}>
              <h2 className="font-display text-[clamp(2.8rem,6.6vw,5.4rem)]">
                Things I&apos;ve <span className="text-flame">built.</span>
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-paper-dim">{PROJECT_NOTE}</p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-4 rounded-full border border-paper/20 px-5 py-3.5 mono text-[0.52rem] text-paper transition-colors hover:border-flame hover:bg-flame hover:text-ink"
            >
              <GithubIcon className="h-4 w-4" />
              All repositories
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <ul className="mt-7 grid gap-2 rounded-xl border border-line bg-ink-soft px-4 py-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Status key">
            {STATUS_KEY.map((item) => (
              <li key={item.label} className="flex items-start gap-2.5">
                <span aria-hidden="true" className={cx("mt-1 h-2 w-2 shrink-0 rounded-full", STATUS_STYLE[item.label].dot)} />
                <div>
                  <p className="mono text-[0.4rem] text-paper">{item.label}</p>
                  <p className="mt-0.5 text-[0.66rem] leading-snug text-paper/60">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-3">
          <FeaturedCard project={flagship} />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {leads.map((project, i) => (
            <LeadCard key={project.name} project={project} delay={i * 80} />
          ))}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((project, i) => (
            <MiniCard key={project.name} project={project} delay={Math.min(i * 60, 240)} />
          ))}
        </div>

        {OTHER_REPOS.length > 0 && (
          <Reveal delay={80} className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-line px-4 py-3.5">
            <p className="flex items-center gap-2.5 text-[0.78rem] text-paper-dim">
              <span aria-hidden="true" className="live-dot h-1.5 w-1.5 rounded-full bg-tick" />
              Also on GitHub: {OTHER_REPOS.map((repo) => repo.name).join(", ")}.
            </p>
            <a
              href={OTHER_REPOS[0].href}
              target="_blank"
              rel="noreferrer noopener"
              className="mono inline-flex items-center gap-1.5 text-[0.46rem] text-paper transition-colors hover:text-flame"
            >
              View {OTHER_REPOS[0].name} <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
