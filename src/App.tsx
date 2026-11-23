import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Connect from "./components/Connect";
import Footer from "./components/Footer";
import { Cursor, Marquee, ScrollProgress } from "./components/ui";
import { MARQUEE_WORDS } from "./data/profile";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-paper antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-paper focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <Nav />

      <main id="main">
        <Hero />
        <Marquee words={MARQUEE_WORDS} />
        <About />
        <Skills />
        <Projects />
        <Connect />
      </main>

      <Footer />
    </div>
  );
}
