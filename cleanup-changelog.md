# Cleanup Changelog — 2026-02-27

## Deleted Files

| File | Reason |
|------|--------|
| `src/components/InfoCard.tsx` | Exported but never imported by any file |
| `src/components/PageNavigation.tsx` | Built for multi-page routing; single-page app, never imported |
| `src/components/sections/BeyondHttpSection.tsx` | Not registered in `sections/index.ts`, never imported |
| `thinking.md` | Scratch/notes file (2 lines), not referenced anywhere |

## CSS Variables Removed (`src/app/globals.css`)

Removed 5 `--accent-*-fg` variables and their `@theme inline` mappings. These were identical duplicates of the base `--accent-*` values and were never referenced by any component:

- `--accent-green-fg` (duplicate of `--accent-green`)
- `--accent-blue-fg` (duplicate of `--accent-blue`)
- `--accent-yellow-fg` (duplicate of `--accent-yellow`)
- `--accent-purple-fg` (duplicate of `--accent-purple`)
- `--accent-pink-fg` (duplicate of `--accent-pink`)

## Color Consolidation

Replaced ~212 hardcoded Tailwind arbitrary hex value classes with theme classes across 47 files:

| Before | After |
|--------|-------|
| `text-[#4ade80]`, `bg-[#4ade80]`, `border-[#4ade80]` | `text-accent-green`, `bg-accent-green`, `border-accent-green` |
| `text-[#60a5fa]`, `bg-[#60a5fa]`, `border-[#60a5fa]` | `text-accent-blue`, `bg-accent-blue`, `border-accent-blue` |
| `text-[#fbbf24]`, `bg-[#fbbf24]`, `border-[#fbbf24]` | `text-accent-yellow`, `bg-accent-yellow`, `border-accent-yellow` |
| `text-[#a78bfa]`, `bg-[#a78bfa]`, `border-[#a78bfa]` | `text-accent-purple`, `bg-accent-purple`, `border-accent-purple` |
| `text-[#f472b6]`, `bg-[#f472b6]`, `border-[#f472b6]` | `text-accent-pink`, `bg-accent-pink`, `border-accent-pink` |

Inline `style={{}}` hex values in data constant arrays (used for hex alpha concatenation like `` `${color}40` ``) were intentionally kept — these require raw hex values and are clearly defined at the top of each component.
