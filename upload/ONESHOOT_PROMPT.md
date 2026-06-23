# z.ai Full-Stack One-Shot Prompt — Anders Ljungstedt Portfolio

**Paste this entire document into z.ai Full-Stack mode.**

---

## ATTACHED FILES (you MUST read all of these before writing any code)

| File | Purpose |
|------|---------|
| **SKILL.md** | Animation & motion engineering bible — follow to the letter |
| **style.md** | Visual design direction, colors, typography, motion spec |
| **content/CONTENT.md** | All copy, project narratives, mermaid architecture diagrams |
| **content/screenshots/** | 7 product screenshots — copy to `/public/assets/` |

If any attached file conflicts with this prompt, **SKILL.md wins for implementation mechanics** and **style.md wins for visual design**. CONTENT.md wins for all text/copy.

---

## YOUR MISSION

Build a **complete, production-quality portfolio website** for **Anders Ljungstedt** — an Applied AI Engineer based in Oslo, applying for a **Generative AI Engineer role at a proptech AI company** (contact via Ladda/Laddwho).

**Primary domain:** zavian.ai  
**Audience:** Proptech AI hiring teams in Oslo — they need to see real domain work (luxury real estate, vacation rentals, permit intelligence), not a generic AI template.

**Deliverable:** A fully working Next.js site with advanced GSAP scroll animations, all sections populated from CONTENT.md, all screenshots in place, mobile responsive, no placeholder lorem ipsum.

---

## NON-NEGOTIABLE TECH STACK

Read SKILL.md Section 1A and execute every step. Summary:

```
✅ Next.js App Router
✅ JavaScript ONLY — NO TypeScript (.jsx not .tsx, no type annotations)
✅ NO Tailwind — use CSS modules and/or globals.css with custom properties
✅ GSAP + @gsap/react
✅ Lenis smooth scroll (ReactLenis in layout.jsx)
✅ ScrollTrigger for all scroll-driven animations
✅ Images in /public/assets/ — create folder, copy all 7 screenshots from attachments
❌ NO TypeScript
❌ NO Tailwind CSS
❌ NO default Next.js boilerplate content
❌ NO generic purple AI gradients
```

### Project creation (do this first)

```bash
npx create-next-app@latest zavian-portfolio
# Prompts: No TypeScript, No Tailwind, YES App Router
cd zavian-portfolio
```

### Clean boilerplate (mandatory per SKILL.md)

1. `app/globals.css` → delete all default content, replace with design tokens from style.md
2. `app/page.module.css` → delete all default content
3. `app/page.jsx` → remove all default imports/JSX, keep only:

```jsx
export default function Home() {
  return <main></main>
}
```

4. Install packages:

```bash
npm install gsap @gsap/react lenis
```

5. `app/layout.jsx` — add `'use client'`, wrap children with ReactLenis per SKILL.md Step 4

6. Create `/public/assets/` and copy these files from attached screenshots:

| Source (attachment) | Destination |
|---------------------|-------------|
| `kianestate-overview.png` | `/public/assets/kianestate-overview.png` |
| `kianestate-properties.png` | `/public/assets/kianestate-properties.png` |
| `kianestate-images.png` | `/public/assets/kianestate-images.png` |
| `kianestate-translations.png` | `/public/assets/kianestate-translations.png` |
| `kestays-owner-portal-login.png` | `/public/assets/kestays-owner-portal-login.png` |
| `kestays-admin-owners.png` | `/public/assets/kestays-admin-owners.png` |
| `kestays-admin-properties.png` | `/public/assets/kestays-admin-properties.png` |

Reference images as `src="/assets/kianestate-overview.png"` — no imports needed.

---

## SKILL.MD COMPLIANCE CHECKLIST

You MUST follow SKILL.md for every animation. Key rules:

### Setup (Section 1A)
- [ ] Clean boilerplate done
- [ ] Lenis in layout.jsx
- [ ] GSAP + ScrollTrigger registered

### React/DOM rules (Section 3)
- [ ] **Rule 1:** All GSAP code in `useGSAP` hooks with proper scope
- [ ] **Rule 6:** Cleanup — kill all ScrollTriggers on unmount
- [ ] **Rule 7:** Inner/outer pin split for sticky screenshot frames
- [ ] **Rule 8:** Pre-calculate scroll section heights where cards expand
- [ ] Sync Lenis with GSAP ticker: `gsap.ticker.add((time) => lenis.raf(time * 1000))`

### Patterns to implement (Section 4 — pick these)

| Pattern | Where to use |
|---------|--------------|
| **Text split reveal** | Hero headline — split into lines/words, stagger y + opacity |
| **Sticky card scroll** | Case study sections — pin screenshot frame while copy scrolls |
| **Scroll-scrubbed parallax** | Background grain/grid, screenshot subtle y-translate |
| **Line-by-line text reveal** | Section intros on ScrollTrigger enter |
| **Staggered list reveal** | Bullet outcomes in case studies |

### Gotchas (Section 5)
- [ ] No layout shift on text split — use SplitText or split-type, preserve text-indent per Rule 9
- [ ] `prefers-reduced-motion` media query — disable pin/scrub, show static layout
- [ ] No duplicate ScrollTriggers on re-render

---

## VISUAL DESIGN (from style.md)

Implement the full design system from the attached **style.md**. Key points:

### Colors
- Background: `#0B0F14` (deep navy/charcoal)
- Surfaces: `#121820`, `#1A2230`
- Text: warm off-white `#F4F0EA`, secondary `#9BA8B8`
- Accent: copper `#C4895A`, amber `#D4A574`
- **NO purple AI gradients**

### Typography (Google Fonts)
- Headlines: **Fraunces** (serif, editorial)
- Body: **DM Sans** (clean sans)
- Load via `next/font/google` in layout.jsx

### Aesthetic
- Dark editorial proptech luxury — Marbella/Gothenburg/Oslo sophistication
- Screenshot frames: elevated surface, subtle border, soft shadow
- Generous whitespace, calm Nordic editorial rhythm

---

## SITE STRUCTURE & SECTIONS

Build as a single-page scroll experience with anchor navigation. All copy comes from **CONTENT.md** — use it verbatim.

### 1. Navigation (fixed)
- Logo: "zavian.ai" in Fraunces serif, lowercase
- Links: Work · About · Architecture · Contact
- Transparent → solid `--bg-deep` on scroll (GSAP or CSS)
- Copper underline hover

### 2. Hero (`#hero`)
- Full viewport height
- Headline (split reveal): "Applied AI / for Proptech / that ships."
- Subheadline from CONTENT.md
- Metadata line: "Oslo · zavian.ai · 8 months proptech craft..."
- CTAs: "View case studies" (scroll to #work), "Contact" (scroll to #contact)
- Subtle copper radial glow behind headline (slow pulse)

### 3. About (`#about`)
- Two-column layout (stack on mobile)
- Headline: "From safety-critical buses to production AI in real estate."
- Full bio paragraphs from CONTENT.md
- Language pills: Swedish · English · Norwegian & Danish
- Education block

### 4. Case Studies (`#work`)
Three scroll-driven chapters. Each follows this structure:

```
[Section label: 01 / Kian Estate]
[Project name — serif]
[One-liner]
[Challenge paragraph]
[Solution bullets]
[Outcome bullets]
[Sticky screenshot frame(s) — inner/outer pin split]
[Tech tag row]
[Architecture diagram — render mermaid from CONTENT.md as styled block]
[External link: View live → kianestate.com etc.]
```

#### Case Study 01 — Kian Estate
- Screenshots: overview, properties, images, translations (cycle or stack in sticky frame)
- Mermaid: Translation pipeline (DeepSeek + ChatGPT + publish)
- Link: https://www.kianestate.com/

#### Case Study 02 — KE Stays
- Screenshots: owner portal login, admin owners, admin properties
- Mermaid: Lodgify sync + owner portal
- Link: https://www.kestays.com/

#### Case Study 03 — Florida Lead Portal
- No screenshots — use architecture diagram prominently
- Optional: stylized stats card (67 counties · daily cron · Postgres)
- Mermaid: Scrape → enrich → score pipeline
- Reference: zavian.ai

**Sticky scroll implementation (desktop):**
- Outer container: `ScrollTrigger.create({ pin: true })`
- Inner container: receives `y` translate / `scale` on scrub
- Copy column scrolls naturally alongside
- Mobile: disable pin, stack screenshot above copy

### 5. Architecture Highlights (`#architecture`)
- Headline: "Pipelines designed for real-world failure modes."
- Three cards from CONTENT.md:
  1. Enrichment cascades
  2. Agent orchestration (Jira AI Factory)
  3. Anti-bot resilience
- Subtle scroll reveal on cards

### 6. Skills & Tech (`#skills`)
- Headline: "What I bring to a generative AI engineer role."
- Clustered tags (not a logo wall) — groups from CONTENT.md:
  - LLMs & NLP
  - RAG & Retrieval
  - Agents & Orchestration
  - AI Quality & Evaluation
  - Engineering
  - Proptech domain

### 7. Contact CTA (`#contact`)
- Headline: "Let's build proptech AI that ships."
- Body: Oslo-based, Ladda/Laddwho
- Email: anders.ljungstedt1@gmail.com (mailto link)
- LinkedIn link
- Footer: © 2026 Anders Ljungstedt · zavian.ai

---

## COMPONENT ARCHITECTURE (suggested)

```
app/
  layout.jsx          — fonts, Lenis, metadata
  page.jsx            — composes all sections
  globals.css         — CSS custom properties, resets, typography
  components/
    Nav.jsx
    Hero.jsx
    About.jsx
    CaseStudy.jsx     — reusable for 01/02/03
    Architecture.jsx
    Skills.jsx
    Contact.jsx
    MermaidDiagram.jsx — render or static SVG from CONTENT.md diagrams
  hooks/
    useReducedMotion.js
```

Use CSS modules per component where helpful (`Hero.module.css`, etc.).

---

## MERMAID DIAGRAMS

CONTENT.md contains three mermaid diagrams. Render them as:

**Option A (preferred):** Install `mermaid` and render client-side in a dark-themed container matching `--bg-elevated`

**Option B:** Pre-render to SVG and embed inline

Style: dark background, copper accent on key nodes, monospace labels on edges.

Diagrams:
1. Kian Estate translation pipeline
2. KE Stays Lodgify sync + owner portal
3. Florida Lead Portal scrape → enrich → score

---

## MOTION SPEC (detailed)

### Hero animation sequence
1. On mount: split headline into lines (SplitText or manual spans)
2. Stagger each line: `y: 100% → 0`, `opacity: 0 → 1`, `duration: 1.2`, `ease: power4.out`, `stagger: 0.1`
3. Subheadline: fade in `0.6s` after headline completes
4. CTAs: fade + slight y, `delay: 0.3`
5. Background glow: infinite slow `scale` + `opacity` pulse

### Case study scroll choreography
For each of the 3 case studies:
1. Section label reveals on enter (`start: top 80%`)
2. Project name line-by-line reveal
3. Screenshot frame pins (desktop only) for ~150vh scroll distance
4. During pin: screenshot `scale: 0.95 → 1`, subtle `y` parallax on scrub
5. Bullet lists stagger in as they enter viewport
6. Architecture diagram fades in after bullets

### Navigation scroll behavior
- At `scrollY > 100`: nav background transitions to `rgba(11, 15, 20, 0.9)`
- Active section highlight on nav links (optional IntersectionObserver)

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  /* disable all GSAP pin/scrub, show static layout */
}
```

---

## METADATA & SEO

From CONTENT.md:

```jsx
export const metadata = {
  title: 'Anders Ljungstedt — Applied AI Engineer · Proptech · Oslo',
  description: 'Production LLM systems for luxury real estate and permit intelligence. Kian Estate, KE Stays, Florida Lead Portal.',
}
```

---

## COPY RULES

- Use CONTENT.md text **verbatim** — do not paraphrase headlines or bio
- Do NOT claim employment at Kian Estate or KE Stays — frame as bespoke build / consultancy
- Do NOT invent metrics
- Do NOT use lorem ipsum anywhere
- External links open in new tab with `rel="noopener noreferrer"`

---

## QUALITY BAR

Before considering the build complete, verify:

- [ ] Site runs with `npm run dev` without errors
- [ ] No TypeScript files exist
- [ ] No Tailwind classes or config
- [ ] All 7 screenshots visible and correctly captioned
- [ ] All 6 sections present with real copy
- [ ] Hero text split animation works
- [ ] At least 3 sticky/pinned scroll sections work on desktop
- [ ] Mobile layout stacks cleanly, no horizontal overflow
- [ ] Lenis smooth scroll feels natural
- [ ] ScrollTriggers cleaned up (no duplicate triggers on hot reload)
- [ ] Colors match style.md (dark editorial, copper accent, no purple)
- [ ] Fonts loaded (Fraunces + DM Sans)
- [ ] Contact email and LinkedIn links work
- [ ] Mermaid diagrams render for all 3 projects

---

## WHAT NOT TO BUILD

- No blog, no CMS, no backend API
- No contact form (email link only)
- No dark/light mode toggle (dark only)
- No i18n (English only)
- No authentication
- No Florida Lead Portal live demo (architecture narrative only)
- No z.ai UI screenshots

---

## CONTEXT FOR THE BUILDER

**Who is Anders?**  
Applied AI Engineer in Oslo. 8 months hands-on proptech with a top Gothenburg real estate agent. Built Kian Estate staff portal (luxury Marbella), KE Stays owner/admin platform (vacation rentals), and Florida Lead Portal (67-county permit intelligence). Background: Volvo Buses safety-critical systems (ISO 26262). Also built Jira AI Factory (LangGraph, MCP, Slack HITL).

**Why this portfolio?**  
He's applying for Generative AI Engineer at a proptech AI company in Oslo. The site must prove domain credibility + engineering depth + motion craft — in one scroll.

**Domains:**  
- zavian.ai (primary, deploy here)  
- anders.dev (future, don't configure now)

---

## FINAL INSTRUCTION

Build the **entire site in one pass**. Do not stop after scaffolding. Do not ask clarifying questions. Read all attached files, implement every section, every animation, every screenshot, every diagram. The output should be a portfolio that makes an Oslo proptech AI hiring manager want to schedule an interview.

**Start with project setup per SKILL.md Section 1A. Then build section by section from top to bottom. Test scroll animations as you go. Ship it.**
