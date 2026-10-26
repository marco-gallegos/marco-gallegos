# AGENTS.md

Static multi-page portfolio: `index.html` plus `certifications.html`, built with Vue 2 (global build), jQuery, and Bootstrap, all assets committed. `README.md` is the GitHub profile README, not project documentation.

## Branches and deployment (read first)

- **`main` is the source of truth; `gh-pages` is the published mirror.** Both hold the whole site at the repo root (no build output). Don't develop on `gh-pages`.
- Live site: https://marco-gallegos.github.io/marco-gallegos/ — served from the repo subpath, so keep every asset/link path relative (no leading `/`).
- GitHub Pages is configured as **Deploy from a branch → `gh-pages` / (root)** with the legacy build. `.github/workflows/deploy-pages.yml` runs on every push to `main` and fast-forwards `gh-pages` to that commit. There is no build or test step: whatever lands on `gh-pages` goes live, and the whole repo root is public (do not commit secrets).
- Deploy: push to `main`, then watch the workflow:

  ```bash
  git switch main
  git pull --ff-only
  git push origin main
  gh run list --workflow=deploy-pages.yml --limit 1
  ```

  Re-run a failed deploy without a new commit: `gh workflow run deploy-pages.yml --ref main`. Manual fallback: `git push origin main:gh-pages` (same fast-forward).
- If the workflow cannot fast-forward, someone committed to `gh-pages` directly: run `git merge origin/gh-pages` into `main`, resolve, and push again (never force-push).
- Verify: the run succeeds, `gh api repos/marco-gallegos/marco-gallegos/pages --jq '.status'` returns `built`, and the live URL shows the change (Pages takes about a minute).
- `js/about.vue.js` is not referenced by `index.html`; editing it has no effect.

## Local preview

- Serve over HTTP: `python3 -m http.server 8000` → http://localhost:8000/.
- `file://` will not work: `js/projects.vue.js` dynamically imports the `.mjs` data modules, which browsers block from `file://`.
- No build step, package manager, bundler, tests, or linter. Verify by loading the page and watching the browser console.

## Content model

- `js/projects.mjs`: one object per project card. `folder` + `cover` resolve to `img/<folder>/<cover>` (falls back to `img/work-1.jpg` when `cover` is empty). `technologies` entries must exactly match `name`s in `js/technologies.mjs`, or the logo silently disappears. `show:false` hides a project; `url:null`/`""` renders the offline state; `repos` is a list of URL strings.
- `js/technologies.mjs`: `logo` is just a filename under `img/techs/` (path prefix is added at runtime); add the SVG there for a new tech. The gh-pages-only `language`/`skilllevel` fields are not rendered anywhere; the skill bars in `index.html` are hand-written.
- `index.html` contains the Vue template for `#work` (`{{ }}` bindings) plus large commented-out template blocks — don't "clean up" those.
- `certifications.html` renders `js/certifications.mjs` through `js/certifications.vue.js`. Add one object per credential (newest first); `pdf` is a bare filename under `certifications/`, and `url` is the verification link. `show:false` hides an entry. Drop the PDFs in `certifications/` and keep `certifications/README.md` accurate.
- The home intro and certifications hero use the technology-logo canvas in `js/tech-particles.js` instead of the old `img/code_background.jpg` image. Mark a section with `has-particles` and `data-tech-particles`; the script injects the canvas plus a transparent layer of focusable links, and `css/tech-particles.css` supplies the gradient/overlay/z-index rules. Keep the existing overlay element (`overlay-itro` or `overlay-mf`) for text contrast. The logo pool is the `LOGOS` array (file, name, URL); add files under `img/techs/`. Tux (`linux-tux.svg`), Ubuntu (`ubuntu.svg`), and the Bohr atom (`bohr-atom.svg`) are always included. The animation pauses off-screen and honors `prefers-reduced-motion`.
- When adding a page, copy the `index.html` head/nav/footer scaffolding and add the nav link to **both** pages; there is no shared layout or templating.
- `css/style-darkaubergine.css` is the active theme; `css/style-*.css` are alternate palettes. SCSS sources are not in the repo (see `css/scss-files.txt`).
- `lib/` is vendored third-party code (Vue 2, jQuery, Bootstrap 4, lightbox, etc.) — make changes in `js/`/`css/`, not `lib/`. Note that the unminified `vue.dev.js` is loaded in production.
