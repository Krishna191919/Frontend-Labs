# Design Tokens

Single source of truth for colour, radius, and type. Raw CSS variables are
switched by `data-theme` (set by `ThemeContext`) and exposed as Tailwind
utilities via `@theme inline` in `src/index.css`.

| Token (CSS var)      | Tailwind utility   | Light value | Dark value | Usage |
| -------------------- | ------------------ | ----------- | ---------- | ----- |
| `--bg`               | `bg-bg`            | `#f8fafc`   | `#0b1220`  | Page background |
| `--surface`          | `bg-surface`       | `#ffffff`   | `#131c2e`  | Cards, header, elevated panels |
| `--text`             | `text-fg`          | `#0f172a`   | `#e2e8f0`  | Primary body/heading text |
| `--muted`            | `text-muted`       | `#64748b`   | `#94a3b8`  | Secondary text, placeholders |
| `--primary`          | `text-primary`, `bg-primary`, `outline-primary` | `#0ea5e9` | `#38bdf8` | Links, primary buttons, focus rings |
| `--primary-contrast` | `text-primary-contrast` | `#ffffff` | `#06202e` | Text on top of `--primary` |
| `--border`           | `border-line`      | `#e2e8f0`   | `#243049`  | Borders, dividers, input outlines |
| `--radius`           | `rounded-card`     | `0.75rem`   | `0.75rem`  | Corner radius for cards/buttons/inputs |
| `--font-sans`        | `font-sans`        | `"Inter", system-ui, sans-serif` (same) | — | Base typeface |

## How it works

1. `ThemeContext` writes `data-theme="light|dark"` on `<html>`.
2. `:root` / `[data-theme="dark"]` swap the raw variable values.
3. `@theme inline` maps each variable to a utility class, so markup stays
   token-driven: `bg-surface`, `text-muted`, `border-line`, `rounded-card`.
4. Changing one `--token` recolours every component — light and dark — with
   zero changes to JSX.
