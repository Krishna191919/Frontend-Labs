# Short Answers — Assignment 1.2 (Topic 1.2, React)

## CSR vs SSR vs SSG (one use case each)

- **CSR (Client-Side Rendering):** The server sends an empty shell and JavaScript renders everything in the browser. *Use case:* a dashboard behind a login — SEO doesn't matter and the UI is highly interactive.
- **SSR (Server-Side Rendering):** The server renders HTML on every request, then the client hydrates it. *Use case:* a personalised profile or news feed page where content differs per user/request and must be crawlable.
- **SSG (Static Site Generation):** HTML is rendered once at build time and served as static files. *Use case:* documentation, a blog, or a marketing site where content rarely changes.

## What is hydration?

Hydration is the process where JavaScript takes over server-generated HTML and attaches event listeners/state so the page becomes interactive (`hydrateRoot` in React). If the server HTML differs from the first client render (e.g. using `Date.now()` during render), you get a *hydration mismatch* warning and React re-renders. This lab is CSR-only, so there is nothing to hydrate — but the concept matters when we move to SSR/SSG tools like Next.js or React Router's framework mode.

## When is Context the wrong tool?

Context broadcasts low-frequency global data (theme, current user) to a subtree. It is the **wrong** tool when:

1. **Values change frequently** — every consumer re-renders on any change; a state library (Zustand, Redux, signals) with selector-based subscriptions is better.
2. **You need derived/computed data or async data fetching** — Context has no caching, deduping, or loading/error states; use a data library (React Query/TanStack Query, SWR) or route loaders instead.
3. **You only need the value in a few deep leaves** — prop drilling a couple of props is cheaper than re-rendering a whole subtree through a context boundary.
