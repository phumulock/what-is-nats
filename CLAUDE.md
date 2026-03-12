# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is an interactive educational website explaining how NATS (a messaging
system) works. Built with Next.js 16 and React 19, it features animated diagrams
and demos to illustrate NATS concepts like pub/sub, request/reply, queue groups,
JetStream, and clustering.

## Commands

- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Production build
- `npm run lint` - Run ESLint

## Architecture

### Page Structure

The site is a single-page application (`src/app/page.tsx`) organized into
numbered sections (00-13), each explaining a NATS concept. The page imports and
composes ~15 interactive components.

### Component Patterns

Components live in `src/components/` and follow these conventions:

<!-- - **Static components** (SectionHeader, TerminalBox, InfoCard): Server components for layout and content display -->

- **Static components** (SectionHeader, TerminalBox): Server components for
  layout and content display
- **Interactive components** (PubSubDiagram, WildcardMatcher, KVStoreDemo):
  Client components with `"use client"` directive, using `framer-motion` for
  animations and `useState`/`useEffect` for state

Most diagram components follow a similar pattern:

1. Internal state machine (typically a `step` counter)
2. `useEffect` interval for auto-advancing animations
3. Conditional rendering based on current step
4. Status text that updates with each step

### Styling

- Tailwind CSS v4 via `@tailwindcss/postcss`
- Dark theme with consistent color palette:
  - Green accent: `#4ade80`
  - Blue accent: `#60a5fa`
  - Yellow accent: `#fbbf24`
  - Background: `#0a0a0a`, `#1a1a1a`
  - Border: `#333`
- JetBrains Mono font loaded via `next/font`
- Each component section should be a static height so that it's not constantly
  shifting around.

### Key Components

- `TerminalBox` / `TerminalLine`: Renders terminal-style code blocks with syntax
  highlighting
- `InfoCard`: Paginated card component for multi-part explanations
- `NestedDiagram`: Visualizes layered concepts (connection anatomy, topology
  layers)
- Various `*Diagram` and `*Demo` components: Animated visualizations of NATS
  features
