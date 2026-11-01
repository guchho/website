# guchho.js.org

Source for the [Guchho](https://github.com/guchho/guchho) documentation website,
built with Guchho itself and deployed to GitHub Pages at
<https://guchho.js.org>.

## How it works

The Markdown in the [guchho/guchho](https://github.com/guchho/guchho) repository
is the single source of truth for the core docs, and
[guchho/plugins](https://github.com/guchho/plugins) is the source of truth for
the official plugin docs. This site does not duplicate any content - it renders
that Markdown into pages at build time.

```
docs/*.md  => render => src/pages/**/index.html => guchho build => dist/
plugins/docs/*.md => render => src/pages/plugins/**/index.html
```

- `scripts/build-docs.mjs` renders the primary docs plus every secondary source
  in `site.config.mjs` (`docsSources`) to `src/pages/`, writes the entrypoint
  list into `guchho.config.js`, runs `guchho build`, copies `public/`, and emits
  `sitemap.xml` / `robots.txt`.
- `scripts/routes.mjs` maps files to routes: `foo/bar.md` => `/foo/bar/`,
  `dir/README.md` => `/dir/`, root `README.md` => `/docs/`. A secondary source
  is mounted under its `routePrefix` (a `banner.md` in the plugins source =>
  `/plugins/banner/`) and its file keys are namespaced so links can resolve
  across sources.
- `scripts/markdown.mjs` renders Markdown (markdown-it + anchor + highlight.js)
  and rewrites relative links between docs.
- `scripts/nav.mjs` builds the sidebar from `site.config.mjs`.
- `scripts/validate-links.mjs` checks every internal link and anchor.
- `src/components/` holds the layout/header/footer templates; `src/site/` holds
  pages that are not Markdown (home, examples); `src/styles/` and `src/main.js`
  are the shipped CSS/JS.

The published site has no runtime dependencies.

## Requirements

- Node.js ≥ 18

## Development

```bash
npm ci

# Render docs + authored pages into src/pages/ and check internal links
npm run build:docs        # alias: --render-only
npm run validate          # --validate-only

# Full build (render + bundle with guchho) into dist/
npm run build

# Build, then serve dist/ at http://localhost:3000
npm run dev
```

The primary docs source defaults to `../guchho/docs`, and the official plugin
docs default to `../plugins/docs` (both sibling checkouts). Override them with
`--docs` / `GUCHO_DOCS` and `--plugins-docs` / `GUCHO_PLUGINS_DOCS`:

```bash
npm run build -- --docs /path/to/guchho/docs --plugins-docs /path/to/plugins/docs
```

A missing secondary source is skipped locally with a warning; in CI it is a
hard error, so a deploy cannot silently drop the plugin docs.

### Guchho output-path workaround

Guchho v1.0.6 drops the last path separator when writing nested HTML entries
(`guide/x/index.html` is written as `guide/xindex.html`, with asset URLs
computed for the shallower path) on every platform. `scripts/build-docs.mjs`
repairs this after the build by moving each page to its intended path and
prefixing its relative URLs with one `../`. The step is a no-op once guchho is
fixed, and the build hard-fails in CI if any expected page is still missing.

## Regenerating on docs changes

Because the docs live in another repository, changes to them are picked up the
next time this site is built. Trigger a rebuild by pushing to `main` or running
the **Deploy to GitHub Pages** workflow manually. (A scheduled or
`repository_dispatch` rebuild of the `guchho/guchho` docs can be added later.)

## Deployment

`.github/workflows/deploy.yml` checks out this repo, `guchho/guchho`, and
`guchho/plugins`, runs `npm run build`, and publishes `dist/` to GitHub Pages.
`public/CNAME` pins the `guchho.js.org` domain. The build hard-fails if any
expected page is missing from `dist/`, so a bad build can never be deployed
silently.


## License

Guchho is licensed under **MIT**. Copyright © [CodeHemu](https://github.com/code-hemu).
