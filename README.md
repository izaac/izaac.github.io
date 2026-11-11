# izaac.github.io

Personal CV site for Izaac Zavaleta (https://www.izaac.me), built with Astro and
Tailwind CSS. Static output, printable as an ATS-friendly resume.

## Stack

- Astro 5 (static output)
- Tailwind CSS 3.4 via `@astrojs/tailwind`
- `@tailwindcss/typography`
- `@astrojs/sitemap`

## Commands

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/ locally
```

`npm run dev` and `npm run build` both run `scripts/sync-resume.mjs` first. That
script copies `src/data/resume.json`, the single source of truth, to
`public/resume.json` so the same data is available at:

- rendered page: `https://www.izaac.me/`
- machine readable: `https://www.izaac.me/resume.json`

Edit only `src/data/resume.json`. `public/resume.json` is a generated copy and is
kept in git so branch-based Pages deploys serve it without a build step.

## Structure

```text
src/
  components/    Header, Section, Experience, Skills, Education,
                 Certifications, Volunteer
  data/          resume.json (source of truth, JSON Resume schema)
  layouts/       Layout.astro (meta, OpenGraph, JSON-LD Person, theme, print)
  pages/         index.astro
  styles/        global.css (Tailwind layers, components, print rules)
public/          avatar.svg / avatar.png, favicon.png, CNAME, keybase.txt, robots.txt
scripts/         sync-resume.mjs
```

## Editing content

All resume content lives in `src/data/resume.json` following the
[JSON Resume schema](https://jsonresume.org/schema). Components read from it
directly, so content changes never require markup edits.

## Print / PDF

The "Download / Print PDF" button calls `window.print()`. Print styles strip all
chrome, force black on white, and avoid breaking sections and entries across
pages. Use the browser's "Save as PDF" destination for the PDF copy.

## Deployment

GitHub Pages serves `dist/` on the custom domain from `public/CNAME`. Publish a
build with your usual Pages workflow (branch or Actions); the domain record and
`resume.json` endpoint ship with the output.

## License

See [LICENSE](LICENSE). The resume content is personal and not for reuse.
