# BUILD.md — Assignment 1.5: Vite Code Splitting

Branch: `assignment-1.5` · Vite 8.4 (Rolldown) · built with `npm run build`

## Before / After

| Metric | Before (baseline) | After (lazy + manual chunks) |
| --- | --- | --- |
| JS files emitted | **1** (`index-*.js`) | **14** |
| Total JS (raw) | 309.50 kB | 316.87 kB |
| Total JS (gzip) | **96.81 kB** | **103.58 kB** |
| Largest chunk | `index-*.js` 309.50 kB (96.81 gz) | `react-vendor-*.js` 218.27 kB (68.18 gz) |
| Initial-load JS (first paint) | 309.50 kB / 96.81 gz | **300.11 kB / 95.71 gz** (index + react-vendor + router + query + runtime) |
| Loaded on demand | — | **9 chunks, 16.76 kB / 7.87 gz** (pages + shared + modal) |
| CSS | 14.29 kB / 3.75 gz | 15.38 kB / 3.95 gz |

Interpretation: total size grows slightly (splitting overhead + runtime helper), but each
route now ships only what it needs — `Users` code no longer downloads on first paint —
and the big vendor pieces sit in **content-hashed chunks that can be cached forever**.

## Chunk map

| Chunk | Holds |
| --- | --- |
| `index-*.js` | App shell: `main.jsx`, `App.jsx`, `Layout`, contexts, UI primitives, `ProtectedRoute` |
| `react-vendor-*.js` | `react`, `react-dom`, `scheduler` (long-lived vendor) |
| `router-*.js` | `react-router`, `react-router-dom` |
| `query-*.js` | `@tanstack/react-query` + devtools |
| `useUsers-*.js` | Shared hooks used by Users + UserDetail (deduped, not duplicated) |
| `Card-*.js` | Shared `Card` primitive used by several pages |
| `Home / Users / UserDetail / Login / Profile / NotFound-*.js` | One chunk per route, loaded via `React.lazy` |
| `StatsPanel-*.js` | Heavy non-route modal, loaded only on button click |
| `rolldown-runtime-*.js` | Bundler runtime helper |
| `index-*.css` | All Tailwind utilities (single stylesheet) |

Verification: DevTools → Network shows `Users-*.js` fetched **only** when navigating to
`/users` (hover prefetch on the nav link starts it even earlier). `StatsPanel-*.js` appears
only after clicking **Load stats (lazy modal)** on Home.

## Treemap

Screenshot of `dist/stats.html` (open after `npm run build`):
`npx vite preview` → `/stats.html`, or open the file directly in a browser.

> _(paste treemap screenshot here)_

## Top 3 offenders (from dist/stats.html) and actions

| # | Module | Size (rendered) | Action |
| --- | --- | --- | --- |
| 1 | `react-dom-client.production.js` | 516.9 kB | **Accept** — framework runtime; lives in the hashed `react-vendor` chunk, so browsers cache it immutably and it never re-downloads on app updates |
| 2 | `react-router/dist/…/chunk-*.mjs` | 91.9 kB | **Accept** — already isolated in its own `router` chunk; changes rarely, so it's cache-friendly. Swapping routers isn't worth it mid-Unit-1 |
| 3 | `queryObserver.js` (`@tanstack/react-query`) | 12.8 kB | **Accept** — the engine of the server-state tool assigned in 1.4; alternative would be SWR (smaller) only if we outgrow Query's features |

Noted improvement (not required): `@tanstack/react-query-devtools` is bundled in the
`query` chunk even in production — gating the import behind `import.meta.env.DEV` would
trim it from prod builds.

## Rolldown note (manualChunks → codeSplitting)

This project uses **Vite 8 + Rolldown**, where the guide's object-form
`build.rollupOptions.output.manualChunks = { … }` fails with
`TypeError: manualChunks is not a function` (Rolldown expects a function; the object form
is Rollup-only). Per the guide, the equivalent split is expressed with Rolldown's
**`output.codeSplitting.groups`** in `vite.config.js`:

```js
build: {
  rollupOptions: {
    output: {
      codeSplitting: {
        groups: [
          { name: 'react-vendor', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
          { name: 'router', test: /node_modules[\\/](react-router|react-router-dom)[\\/]/ },
          { name: 'query', test: /node_modules[\\/]@tanstack[\\/]/ },
        ],
      },
    },
  },
},
```

With `react` + `react-router` merged, the vendor chunk hit 257 kB — over our own
250 kB budget (`chunkSizeWarningLimit`) — so the router was split into its own group;
every chunk is now under budget and the build prints no size warning.

## Webpack mapping (how the same split would be expressed)

```js
// webpack.config.js (explanation only — not a working setup)
module.exports = {
  entry: './src/main.jsx',
  output: { filename: '[name].[contenthash].js', clean: true },
  optimization: { splitChunks: { chunks: 'all' } },   // ≈ our vendor groups
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },       // ≈ Vite's esbuild/oxc transform
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};
```

Vocabulary map: `entry` ≈ Vite's `index.html` script; `optimization.splitChunks` ≈
`codeSplitting.groups`/`manualChunks`; `loaders` ≈ Vite's built-in transforms +
plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`); `mode: 'production'` ≈
`vite build` defaults (minify on, `import.meta.env.PROD`).

## Cache note (leads into 1.6)

Filenames like `react-vendor-BqoaRaaM.js` embed a **content hash**: change the code and
the hash changes, so a new URL is issued. Because the URL *implies* the content, servers
can send `Cache-Control: immutable, max-age=31536000` — returning 304s forever until the
file actually changes, while `index.html` (which references the hashes) stays
`no-cache`. This is exactly the stale-while-revalidate / CDN story explored in 1.6.

## How to reproduce

```bash
npm install
npm run build        # emits dist/ + dist/stats.html
npx vite preview     # serves dist/ on http://localhost:4173
```

`dist/` is gitignored and never committed.
