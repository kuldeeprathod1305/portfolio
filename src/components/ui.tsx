import { useEffect, useRef, useState, type ReactNode } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.57.23 2.73.11 3.02.73.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.07.78 2.16v3.2c0 .32.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

/** Fades content in once it scrolls into view. Shows immediately when motion is reduced or IntersectionObserver is unavailable. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia(REDUCED_MOTION).matches || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Decorative scrolling strip. Hidden from assistive tech because the same words appear in the sections. */
export function Marquee({ words, className }: { words: string[]; className?: string }) {
  return (
    <div aria-hidden="true" className={cx("marquee border-y border-line bg-ink-soft py-3.5 text-paper/80", className)}>
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div className="flex shrink-0 items-center" key={group} aria-hidden={group === 1 || undefined}>
            {words.map((word) => (
              <span key={`${group}-${word}`} className="flex items-center gap-5 pr-5">
                <span className="mono whitespace-nowrap">{word}</span>
                <span className="text-[0.6rem] text-flame">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Reading-progress bar. Updates a transform directly (one frame at most per scroll) instead of re-rendering React. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px]">
      <div ref={bar} className="h-full origin-left bg-flame" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

export function useIstTime() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

/** Desktop-only pointer follower. Never mounted on touch or reduced-motion devices. */
export function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const root = document.documentElement;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let frame = 0;

    const setVisible = (visible: boolean) => {
      const value = visible ? "1" : "0";
      if (dot.current) dot.current.style.opacity = value;
      if (ring.current) ring.current.style.opacity = value;
    };

    const move = (event: PointerEvent) => {
      mx = event.clientX;
      my = event.clientY;
      setVisible(true);
      if (ring.current) {
        const interactive = (event.target as Element).closest("a, button, [data-cursor]");
        ring.current.dataset.active = interactive ? "true" : "false";
      }
    };

    const leave = () => setVisible(false);

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring.current) {
        const scale = ring.current.dataset.active === "true" ? 1.9 : 1;
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("mouseleave", leave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", move);
      root.removeEventListener("mouseleave", leave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[85] hidden lg:block">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-flame opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ring}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-paper/70 opacity-0 mix-blend-difference transition-[opacity,transform] duration-300"
      />
    </div>
  );
}

export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-flame" />
      <span className="mono text-paper-mute">
        {index} / {label}
      </span>
      <span className="h-px w-10 bg-paper/25" />
    </div>
  );
}
