# Kuldeep Rathod — Portfolio

Personal portfolio for Kuldeep Rathod, an IT engineering student and aspiring Python developer from Gujarat, India.
Built with React 19, TypeScript, Vite, Tailwind CSS 4 and Lucide icons.

## Scripts

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local development server |
| `npm run typecheck` | TypeScript validation only (`tsc --noEmit`) |
| `npm run build` | Runs the TypeScript check first, then produces the production build in `dist/` |
| `npm run preview` | Serves the production build locally for a final check |

## Deploy on Vercel

Vercel detects Vite automatically. The settings below are the expected defaults:

- **Framework Preset:** Vite
- **Root Directory:** `./`
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node.js version:** 20.19 or newer (set in `package.json` under `engines`)

No `vercel.json` is needed. Import the GitHub repository in the Vercel dashboard, keep the defaults above, and deploy.

## Content and where to edit it

All personal content lives in `src/data/`:

- `profile.ts`: identity, about text, education, certifications and learning records, skills, résumé preview data, contact settings, and status legend.
- `projects.ts`: project list, statuses, summaries, planned flows, highlights, and repository links.

Set `email` in `profile.ts` to turn on a `mailto:` link and the copy-email button. It is `null` until you add an address.

### Project statuses

Each project uses one of four statuses. Keep them accurate:

- **Concept**: an idea being shaped, not yet a working build (RACK AI).
- **Active build**: being built and improved now.
- **MVP**: a minimum working version exists and is still open to extension.
- **Completed**: finished to its planned scope. Use only after you confirm it.

### Résumé

`public/resume.pdf` is a one-page PDF generated from the profile data. Replace it with your own file using the same name, and every download button keeps working. If you remove the file, set `resumeReady: false` in `profile.ts`. The buttons then open a "request the latest copy" dialog instead of a broken link.

### Social-share image

`public/og-image.jpg` (1200×630) is used for link previews. Some platforms require an absolute URL, so change `og:image` and `twitter:image` in `index.html` to your full domain once it is known.

### Guestbook

The guestbook in the Connect section is a local demo. Notes are stored in each visitor's browser (`localStorage`). They are not shared between visitors or devices. For shared comments, connect a backend or hosted form service in `src/components/Connect.tsx`.

## Project structure

```
src/
  components/   Nav, Hero, ResumeCard, ResumeButton, About, Skills, Projects, Connect, Footer, ui
  data/         profile.ts, projects.ts
  assets/       hero.jpg (optimised)
  index.css     theme tokens, typography, animations
public/
  resume.pdf    downloadable résumé
  og-image.jpg  social-share image
```

## Verification record

- `npm run typecheck`: passes with strict mode and no unused locals or parameters.
- `npm run build`: passes. Output is `dist/index.html` (about 373 KB, 124 KB gzipped), `og-image.jpg` and `resume.pdf`.
- Headless browser audit (Chromium, production build served by `vite preview`):
  - No console or page errors, and no failed requests.
  - No horizontal page overflow at 320, 375, 430, 768, 1024, 1440 and 1920 px.
  - Navigation lands sections correctly and updates the active link.
  - Mobile menu: focus management, Escape to close, inert while closed, scroll lock restored.
  - Résumé download serves a valid PDF (`application/pdf`).
  - Résumé tabs follow the WAI-ARIA keyboard model.
  - Guestbook: validation messages, posting, persistence across reloads, and two-step clear.
  - Reduced-motion users see content without scroll animations. Touch devices get no custom cursor.
  - All images have alt text. All external links use `rel="noopener"`.
