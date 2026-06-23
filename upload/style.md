# Visual & Motion Direction — Anders Ljungstedt Portfolio (zavian.ai)

**Audience:** Proptech AI hiring teams in Oslo (via Ladda/Laddwho)  
**Tone:** Editorial luxury proptech — Marbella sophistication meets Nordic restraint  
**Anti-pattern:** Generic purple AI gradients, glassmorphism clichés, stock "futuristic" mesh backgrounds

---

## 1. Design Philosophy

This portfolio should feel like a **high-end property brochure crossed with a technical case study** — not a SaaS landing page. The visitor is a proptech AI company evaluating whether Anders can ship production systems in their domain. Every visual choice should signal:

- **Domain credibility** — real estate operations, permits, owner portals, multilingual listings
- **Engineering depth** — architecture diagrams, pipeline language, observability mindset
- **Nordic editorial taste** — calm, confident, generous whitespace, no visual noise

Think: Kinfolk magazine layout + Stripe Docs clarity + subtle motion craft.

---

## 2. Color System

### Base palette (dark editorial)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-deep` | `#0B0F14` | Page background, hero |
| `--bg-surface` | `#121820` | Cards, case study panels |
| `--bg-elevated` | `#1A2230` | Screenshot frames, hover states |
| `--text-primary` | `#F4F0EA` | Headlines, key copy (warm off-white) |
| `--text-secondary` | `#9BA8B8` | Body, captions |
| `--text-muted` | `#5C6B7A` | Labels, metadata |
| `--border-subtle` | `rgba(244, 240, 234, 0.08)` | Dividers, frame borders |

### Accent (warm proptech luxury)

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-copper` | `#C4895A` | Primary CTA, highlights, active nav |
| `--accent-amber` | `#D4A574` | Secondary accent, hover glow |
| `--accent-glow` | `rgba(196, 137, 90, 0.15)` | Soft radial behind hero text |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#5A9E7A` | Live status badges, pipeline "complete" |
| `--info` | `#5A8FA8` | Architecture callouts |

**Do not use:** `#6366F1`, `#8B5CF6`, neon blues, rainbow gradients.

---

## 3. Typography

### Headlines — distinctive serif

**Primary:** `Fraunces` (Google Fonts) — optical size axis gives editorial warmth  
**Fallback:** `Playfair Display`, `Georgia`, serif

- Hero H1: `clamp(3rem, 8vw, 6.5rem)`, weight 500, tight tracking `-0.02em`
- Section H2: `clamp(2rem, 4vw, 3.5rem)`, weight 500
- Case study titles: `clamp(1.75rem, 3vw, 2.5rem)`

### Body — clean geometric sans

**Primary:** `DM Sans` (Google Fonts)  
**Fallback:** `Inter`, `system-ui`, sans-serif

- Body: `1rem / 1.7`, weight 400
- Labels / caps: `0.75rem`, letter-spacing `0.12em`, uppercase
- Code / tech tags: `0.8125rem`, `font-family: 'JetBrains Mono', monospace` (optional, sparing)

### Pairing rules

- Serif for **emotion and authority** (hero, section openers, project names)
- Sans for **clarity and scanability** (body, bullets, tech stack, captions)
- Never use serif for long paragraphs (>3 lines)

---

## 4. Layout & Spacing

### Grid

- Max content width: `1200px`
- Section padding: `clamp(4rem, 10vh, 8rem)` vertical, `clamp(1.5rem, 5vw, 4rem)` horizontal
- Case study inner grid: `1fr 1fr` on desktop (copy left, sticky screenshot right); stack on mobile

### Section rhythm

1. **Hero** — full viewport, centered-left text block
2. **About** — two-column: portrait area (optional abstract shape) + narrative
3. **Case Studies** — three scroll-driven chapters (Kian Estate → KE Stays → Florida Lead Portal)
4. **Architecture Highlights** — horizontal card row or pinned diagram strip
5. **Skills / Tech** — tag cloud in organized clusters, not a wall of logos
6. **Contact CTA** — minimal, confident, Oslo-forward

### Screenshot presentation

- Frame screenshots in `--bg-elevated` containers with `1px` `--border-subtle` border
- Subtle `border-radius: 8px` (not pill-shaped)
- Optional: faint copper corner accent (top-left `2px` line)
- Drop shadow: `0 24px 48px rgba(0,0,0,0.4)` — grounded, not floating

---

## 5. GSAP Motion Spec (follow attached SKILL.md exactly)

### Global setup (mandatory per SKILL.md)

- Next.js App Router, **JavaScript only** (no TypeScript)
- **No Tailwind** — CSS modules or global CSS
- GSAP + `@gsap/react` + Lenis smooth scroll in `layout.jsx`
- Clean boilerplate: empty `globals.css`, empty `page.module.css`, minimal `page.jsx`
- All images in `/public/assets/` — copy from attached screenshots folder

### Hero — text split reveal

- Split hero headline into lines/words using GSAP SplitText (or `split-type` fallback)
- Staggered `y: 100% → 0`, `opacity: 0 → 1`, `duration: 1.2`, `ease: power4.out`
- Subheadline fades in `0.4s` after last word
- Subtle copper glow pulses behind headline (`scale` + `opacity` loop, very slow)

### Scroll — case study sticky frames

Use **inner/outer pin split** (SKILL.md Rule 7):

```
[Outer pin container — locks scroll position]
  [Inner animation target — receives y-translate / scale]
    [Screenshot frame]
  [/Inner]
[/Outer]
```

Per case study section:
- Pin screenshot frame while copy scrolls alongside (desktop)
- On scroll progress `0 → 1`: screenshot scales `0.95 → 1`, slight `y` parallax
- Section label (e.g. "01 / Kian Estate") reveals on enter via `clip-path` or `y` stagger
- Mobile: unpin, stack screenshot above copy, reduce motion complexity

### Parallax accents

- Background grain texture or subtle grid at `0.3×` scroll speed
- Architecture diagram cards: `lerp`-smoothed `y` offset (`factor: 0.08`)

### Text reveals

- Section intros: line-by-line reveal on `ScrollTrigger` enter (`start: top 80%`)
- Bullet lists: stagger `0.08s` per item

### Performance rules (from SKILL.md)

- `useGSAP` with cleanup — kill all ScrollTriggers on unmount
- `gsap.ticker` sync with Lenis
- `prefers-reduced-motion`: disable pin/scrub, show static layout

---

## 6. Component Notes

### Navigation

- Fixed top, transparent → `--bg-deep` at 80% opacity on scroll
- Links: sans, `0.875rem`, copper underline on hover
- Logo/wordmark: "zavian.ai" in serif, lowercase

### Case study cards

Each project block includes:
- Index number (`01`, `02`, `03`) in copper
- Project name (serif)
- One-line domain tag (e.g. "Luxury Marbella Real Estate")
- 3–4 bullet outcomes
- Screenshot(s) from `/public/assets/`
- Optional "View live" link (external, opens new tab)

### Architecture section

- Render mermaid diagrams from CONTENT.md as styled SVG blocks or pre-rendered images
- Dark cards with monospace labels
- Animate nodes/lines on scroll enter (stroke-dashoffset if SVG)

### Contact CTA

- Headline: "Let's build proptech AI that ships."
- Sub: Oslo-based · Available via Ladda/Laddwho
- Email link: `anders.ljungstedt1@gmail.com`
- LinkedIn link
- No form — keep it editorial

---

## 7. Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `< 768px` | Single column, disable sticky pin, hero text `clamp` down |
| `768–1024px` | Case studies stack, screenshots full-width |
| `> 1024px` | Full sticky scroll experience |

Touch targets: minimum `44px`.

---

## 8. Assets Checklist

Copy these to `/public/assets/` in the built project:

| File | Project |
|------|---------|
| `kianestate-overview.png` | Kian Estate — Staff Portal overview |
| `kianestate-properties.png` | Kian Estate — Properties ops view |
| `kianestate-images.png` | Kian Estate — Images library + AI audit |
| `kianestate-translations.png` | Kian Estate — Translations + Ask ChatGPT |
| `kestays-owner-portal-login.png` | KE Stays — PropertyFlow owner login |
| `kestays-admin-owners.png` | KE Stays — Admin owners dashboard |
| `kestays-admin-properties.png` | KE Stays — Admin properties + sync |

---

## 9. Brand & Meta

- **Primary domain:** zavian.ai
- **Future domain:** anders.dev
- **Page title:** Anders Ljungstedt — Applied AI Engineer · Proptech
- **Meta description:** Production LLM systems for luxury real estate and permit intelligence. Oslo-based Applied AI Engineer.
- **Favicon:** Simple monogram "A" or abstract copper mark on `--bg-deep`

---

## 10. What Success Looks Like

A hiring manager in Oslo scrolls once and thinks:

1. *This person has actually built proptech systems* — not demo apps
2. *The motion is intentional* — not a template
3. *The architecture thinking is clear* — scrape → enrich → score is credible
4. *I'd trust them in a generative AI engineer role* — fullstack, agents, production discipline

The site should load fast, read well on mobile, and feel like it belongs next to kianestate.com and kestays.com — not next to a generic AI portfolio template.
