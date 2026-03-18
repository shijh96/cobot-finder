# Cobot Finder

## Dev Server

- Port: **3001** (`pnpm dev` runs on localhost:3001)
- Do NOT use port 3000

## Tech Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS 4
- Supabase (PostgreSQL) — credentials in `.env.local`
- MDX blog via next-mdx-remote (articles in `content/guides/`)
- pnpm as package manager

## Project Structure

- `src/app/` — App Router pages
- `src/components/` — React components (layout/, cobots/, mdx/)
- `src/lib/` — Supabase client, data fetching, MDX utils, SEO helpers
- `src/types/` — TypeScript type definitions
- `content/guides/` — MDX articles
- `supabase/` — SQL migrations and seed data
- `docs/` — Project documentation
