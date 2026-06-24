# portfolio-site

Private source for **[zavian.ai](https://zavian.ai)** — Anders Ljungstedt's proptech AI portfolio.

This repo is the template behind the live site. The repository stays private; this README is the public-facing overview of what's inside.

## Live site

**https://zavian.ai**

## Template files (use with [z.ai](https://z.ai) Full-Stack + GLM 5.2)

| File | Purpose |
|------|---------|
| [`SKILL.md`](./SKILL.md) | GSAP / Lenis / ScrollTrigger animation skill — motion engineering bible |
| [`ONESHOOT_PROMPT.md`](./ONESHOOT_PROMPT.md) | Mega prompt to one-shot the portfolio in z.ai |
| [`upload/style.md`](./upload/style.md) | Visual direction reference (attach with the prompt) |
| [`upload/CONTENT.md`](./upload/CONTENT.md) | Copy, project narratives, architecture notes |

### Quick start

1. Open [z.ai](https://z.ai) → **Full-Stack** mode  
2. Attach `SKILL.md`, `ONESHOOT_PROMPT.md`, `upload/style.md`, `upload/CONTENT.md`, and screenshots  
3. Paste `ONESHOOT_PROMPT.md` as your main prompt  
4. Deploy when satisfied

## Stack

- Next.js App Router · TypeScript · design tokens in `globals.css`
- GSAP + ScrollTrigger · Lenis smooth scroll
- i18n: English, Norwegian, Swedish, Spanish (flag switcher in nav)

## What's in the site

- Hero with Marbella / Florida ambient collage + iPhone meeting mock
- About + speciality trajectory chart
- Project timeline (Florida Lead Portal, Kian Estate, KE Stays)
- Capabilities trust strip · Testimonials · Contact

---

**Oneshotted with [z.ai GLM 5.2](https://z.ai/blog/glm-5.2)** · iterated in Cursor
