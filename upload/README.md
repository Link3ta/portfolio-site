# z.ai Portfolio One-Shot Package

Everything you need to generate Anders Ljungstedt's proptech AI portfolio in z.ai Full-Stack mode.

## What's in this folder

| File / folder | Purpose |
|---------------|---------|
| `ONESHOOT_PROMPT.md` | The mega prompt — paste into z.ai |
| `style.md` | Visual design direction (colors, typography, GSAP motion) |
| `content/CONTENT.md` | All copy, project narratives, mermaid architecture diagrams |
| `content/screenshots/` | 7 product screenshots (Kian Estate × 4, KE Stays × 3) |

## How to use with z.ai

1. Open [z.ai](https://z.ai) and start a **Full-Stack** project.

2. **Attach these files** to the chat (upload or drag-and-drop):
   - `ONESHOOT_PROMPT.md` — paste its contents as your main prompt
   - `style.md`
   - `content/CONTENT.md`
   - All 7 PNG files from `content/screenshots/`
   - `SKILL.md` from `C:\Users\Johny\Downloads\SKILL.md` (animation skill — attach separately)

3. **Paste** the full contents of `ONESHOOT_PROMPT.md` into the z.ai prompt field.

4. Let z.ai build the complete Next.js site. It should:
   - Use JavaScript only (no TypeScript)
   - Use GSAP + Lenis + ScrollTrigger (per SKILL.md)
   - Copy screenshots to `/public/assets/`
   - Implement all sections from CONTENT.md

5. **Review** the output:
   - Hero text split animation
   - Sticky case study scroll (desktop)
   - All 3 projects with screenshots/diagrams
   - Contact section with email + LinkedIn

6. **Deploy** to zavian.ai when satisfied.

## Screenshot inventory

| File | Project |
|------|---------|
| `kianestate-overview.png` | Kian Estate — Staff Portal overview |
| `kianestate-properties.png` | Kian Estate — Properties ops |
| `kianestate-images.png` | Kian Estate — Images + AI audit |
| `kianestate-translations.png` | Kian Estate — Translations + ChatGPT |
| `kestays-owner-portal-login.png` | KE Stays — Owner portal login |
| `kestays-admin-owners.png` | KE Stays — Admin owners |
| `kestays-admin-properties.png` | KE Stays — Admin properties |

## Tips

- If z.ai stops early, reply: *"Continue — implement all remaining sections per ONESHOT_PROMPT.md"*
- If animations break on mobile, ask it to disable sticky pin below 768px per style.md
- SKILL.md overrides any conflicting animation advice in the prompt

## Target role

Generative AI Engineer · proptech AI company · Oslo · via Ladda/Laddwho
