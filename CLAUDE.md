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

## Design Context

### Users
Manufacturing decision-makers — plant managers, operations directors, and owners of small/mid-size factories (10-500 employees) in the US. They are researching collaborative robots for the first time or comparing options. They value data, specs, and ROI over flashy visuals. They are time-constrained and skeptical of marketing fluff.

### Brand Personality
**Professional · Trustworthy · Practical**

The brand voice is authoritative but approachable — like a knowledgeable industry consultant, not a salesperson. Every claim is backed by data. No hype, no buzzwords.

### Aesthetic Direction
- **Visual tone:** G2.com / Capterra style — high information density, well-organized, trust-first
- **Theme:** Light mode only, warm white/gray backgrounds, blue primary + orange accent
- **Typography:** Clean, readable, strong hierarchy. Geist Sans.
- **Cards & data:** Dense but scannable — specs, comparison tables, rating-style layouts
- **Trust signals:** Data badges, specific numbers, brand logos, structured comparisons

### Anti-references (DO NOT look like)
- Flashy SaaS landing pages (no 3D illustrations, no gradient overload, no animation spam)
- Traditional industrial websites (no dark blue/gray walls of text, no 90s corporate feel)
- Minimalist personal blogs (too sparse, not enough information density for a decision platform)

### Design Principles
1. **Data density over decoration** — Every pixel should inform. Prefer tables, specs, and numbers over stock photos and abstract graphics.
2. **Trust through specificity** — Use exact numbers ($45,000, ±0.03mm, 6.8-month payback) not vague claims. Specificity = credibility.
3. **Scannable hierarchy** — Users skim first, read second. Strong visual hierarchy with clear H2/H3 structure, bold key metrics, and card-based layouts.
4. **Warm professionalism** — Professional enough for a plant manager to share with their VP, warm enough to not feel like a government website. Orange accent adds approachability.
5. **Content is the product** — The articles ARE the value. Design serves readability and comprehension, not decoration.
