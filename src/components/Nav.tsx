import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { IDENTITY, NAV } from "../data/profile";
import { GithubIcon, cx } from "./ui";
import ResumeButton from "./ResumeButton";

const MENU_ID = "site-menu";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(NAV[0].id);
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Scroll state updates at most once per animation frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
      let current: string = NAV[0].id;
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    openerRef.current?.focus({ preventScroll: true });
  }, []);

  // Mobile menu behaves as a modal: lock scroll, move focus in, close on Escape, restore scroll on exit.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-[75] transition-all duration-500",
          scrolled ? "border-b border-paper/10 bg-ink/92 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="wrap flex h-[68px] items-center justify-between gap-2">
          <a href="#top" className="group flex items-center gap-2.5 text-left" aria-label={`${IDENTITY.name}, back to top`}>
            <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[7px] bg-flame font-display text-lg leading-none text-ink transition-transform duration-300 group-hover:-rotate-6">
              K
              <span aria-hidden="true" className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-ink" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="whitespace-nowrap font-display text-[0.8rem] tracking-[0.02em] text-paper sm:text-[0.9rem] lg:text-[0.95rem]">
                {IDENTITY.name}
              </span>
              <span className="mono mt-1 hidden whitespace-nowrap text-[0.42rem] tracking-[0.18em] text-paper-mute lg:block">
                Aspiring Python developer
              </span>
            </span>
          </a>

          <nav className="hidden shrink-0 items-center gap-0.5 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cx(
                    "group relative whitespace-nowrap rounded-full px-2.5 py-2 mono text-[0.46rem] transition-colors lg:px-3 lg:text-[0.5rem]",
                    isActive ? "bg-paper text-ink" : "text-paper-dim hover:bg-paper/10 hover:text-paper",
                  )}
                >
                  <span aria-hidden="true" className={cx("mr-1 text-[0.38rem]", isActive ? "text-flame" : "text-paper/50")}>
                    {item.index}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span className="hidden items-center gap-2 2xl:inline-flex">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-tick" />
              <span className="mono whitespace-nowrap text-[0.44rem] text-paper-dim">{IDENTITY.availability}</span>
            </span>

            {/* One résumé action in the DOM: compact below lg, full size at lg and up. */}
            <ResumeButton
              variant="red"
              label="Résumé"
              className="!gap-2 !px-3 !py-2.5 !text-[0.42rem] lg:!gap-3 lg:!px-4 lg:!text-[0.48rem]"
            />

            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile (opens in a new tab)"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-flame hover:text-flame sm:inline-flex"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <button
              ref={openerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls={MENU_ID}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper/20 text-paper transition-colors hover:bg-paper hover:text-ink lg:hidden"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu. `inert` removes it from the tab order and accessibility tree while closed. */}
      <div
        id={MENU_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={cx(
          "fixed inset-0 z-[78] flex flex-col bg-ink transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="wrap flex h-[68px] shrink-0 items-center justify-between">
          <span className="font-display text-lg">{IDENTITY.name}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-paper hover:bg-paper hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <nav className="wrap flex flex-1 flex-col justify-center" aria-label="Menu sections">
          <p className="mono mb-4 text-paper-mute">Explore</p>
          {NAV.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-line py-4"
              style={{
                transitionDelay: `${i * 40}ms`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(18px)",
                transition: "opacity .5s ease, transform .5s ease",
              }}
            >
              <span className="flex items-baseline gap-4">
                <span aria-hidden="true" className="mono text-flame">{item.index}</span>
                <span className="font-display text-4xl text-paper transition-colors group-hover:text-flame">
                  {item.label}
                </span>
              </span>
              <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-paper-mute transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-flame" />
            </a>
          ))}
          <div className="mt-8 flex flex-wrap gap-2">
            <ResumeButton variant="red" label="Download résumé" className="!px-4 !py-3 !text-[0.52rem]" />
            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noreferrer noopener"
              className="mono inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-3 text-[0.52rem] text-paper"
            >
              <GithubIcon className="h-3.5 w-3.5" /> GitHub
            </a>
          </div>
        </nav>
        <div className="wrap pb-8">
          <p className="mono text-[0.46rem] text-paper/55">
            Based in {IDENTITY.location} · {IDENTITY.availability}
          </p>
        </div>
      </div>
    </>
  );
}
