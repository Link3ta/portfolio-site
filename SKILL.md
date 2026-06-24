---
name: animation-doc
description: >
  Build advanced scroll animations, page transitions, text reveals, sticky
  cards, parallax, image trails, hover effects, 3D experiences, physics
  explosions, video carousels, and cycle-based scroll sequences — in Next.js
  (React) OR vanilla JavaScript — using GSAP, ScrollTrigger, SplitText,
  Lenis, Three.js, and Framer Motion. Handles mathematical motion science
  (Lerp, physics vectors, spherical coordinates), layout pre-calculation,
  and advanced transition orchestration.
---
 
# Next.js + GSAP Animations & Motion Engineering Skill
 
---
 
## HOW TO USE THIS SKILL
 
*   **Step 1:** Determine the framework — Next.js (React) or vanilla JavaScript.
*   **Step 2:** Follow Section 1 (setup) for that framework. Do not skip steps.
*   **Step 3:** Refer to Section 2 for the core mathematical principles of advanced motion.
*   **Step 4:** Abide by Section 3 (React/Next.js and DOM Orchestration Rules) to prevent layout shifts and animation bugs.
*   **Step 5:** Pick the pattern(s) from Section 4 that match the design request.
*   **Step 6:** Check Section 5 (Gotchas) before finalizing the implementation.
 
---
 
## SECTION 1 — Project Setup
 
### 1A. Next.js App Router Setup (most common)
 
**Order matters. Do every step.**
 
#### Step 1: Create project
```bash
npx create-next-app@latest my-project
# When prompted: No to TypeScript, No to Tailwind, YES to App Router
cd my-project
```
 
#### Step 2: Clean boilerplate (always)
*   `app/globals.css` → delete everything
*   `app/page.module.css` → delete everything
*   `app/page.jsx` → remove all default imports and JSX, keep only an empty wrapper:
    ```jsx
    export default function Home() {
      return <main></main>
    }
    ```
 
#### Step 3: Install packages
```bash
npm install gsap @gsap/react
npm install lenis
```
Additional packages per feature:
```bash
npm install next-transition-router      # for block/SVG page transitions
npm install next-view-transitions       # for view-transition-api transitions
npm install framer-motion              # for Framer-based transitions (pages router only)
npm install split-type                 # alternative text splitting if GSAP SplitText is unavailable
npm install three                      # for Three.js 3D scenes
npm install react-player               # for video embeds
```
 
#### Step 4: Add smooth scrolling to layout
 
Open `app/layout.jsx`. Add `'use client'` and wrap children with Lenis:
```jsx
'use client'
import ReactLenis from 'lenis/react'
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  )
}
```
 
#### Step 5: Add images/assets
*   Put all images in `/public/assets/` or `/public/images/`
*   Reference as `src="/assets/photo.jpg"` — no imports needed
*   Create the folder before referencing or Next.js will return a 404 error.

---
 
### 1B. Vanilla JavaScript Setup (no framework)
 
For vanilla JS projects (no React/Next.js):
 
```html
<!-- In <head> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
 
<!-- OR via npm + bundler: -->
```
```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
 
gsap.registerPlugin(ScrollTrigger, SplitText)
 
// Lenis smooth scroll + GSAP sync
const lenis = new Lenis()
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
 
// Or sync to GSAP ticker (preferred when using ScrollTrigger):
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```
 
In vanilla JS there is no `use client`, no `useGSAP`, and no `useRef`. Write the GSAP code directly after `DOMContentLoaded` or at the bottom of the `<body>` tag.
 
---

## SECTION 2 — Mathematical Foundations of Motion

When engineering advanced high-fidelity interactions, standard easing curves are sometimes insufficient. These mathematical formulas and universal structures drive advanced motion design.

### 2.1 Linear Interpolation (Lerp) for Smooth Trails & Parallax
Linear interpolation calculates intermediate values between a current state and a target state on every frame. It smooths out raw input values (like cursor positions or scroll coordinates) to eliminate jitter and add inertia.

$$\text{Current}_{\text{new}} = \text{Current}_{\text{old}} + (\text{Target} - \text{Current}_{\text{old}}) \cdot f$$

Where $f$ is the interpolation factor (typically between $0.05$ and $0.15$). A smaller factor increases smoothing and lag; a larger factor makes the movement snappier.

#### Universal Logic Pattern
To implement this cleanly, maintain target and interpolated values in a persistent state loop, updating them inside a high-frequency ticker (such as a `requestAnimationFrame` loop).

```javascript
class LerpController {
  constructor(factor = 0.1) {
    this.factor = factor;
    this.current = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
  }

  update(newTargetX, newTargetY) {
    this.target.x = newTargetX;
    this.target.y = newTargetY;
    
    this.current.x += (this.target.x - this.current.x) * this.factor;
    this.current.y += (this.target.y - this.current.y) * this.factor;
    
    return this.current;
  }
}
```

#### Performance Pitfalls & Edge Cases
*   **Infinite CPU Overhead:** If the animation loop continues running when the difference between `current` and `target` is imperceptible, it wastes processing power. Implement a threshold cutoff to pause the loop:
    ```javascript
    const distance = Math.hypot(target.x - current.x, target.y - current.y);
    if (distance < 0.001) {
      current.x = target.x;
      current.y = target.y;
      cancelAnimationFrame(frameId);
    }
    ```
*   **Precision Loss (Flicker):** Floating-point precision errors can cause rendering engines to flicker during sub-pixel positioning. Round values to two decimal places before applying CSS transforms:
    ```javascript
    element.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
    ```

---

### 2.2 Mathematical Spherical Coordinate Distribution
To arrange $N$ flat elements evenly across a three-dimensional sphere, use spherical coordinate mathematics. This approach uses two angles—$\phi$ (inclination/latitude) and $\theta$ (azimuth/longitude)—to calculate the coordinate positions.

$$\phi = \arccos\left(1 - \frac{2 \cdot i}{N}\right)$$

$$\theta = \sqrt{N \cdot \pi} \cdot \phi$$

$$x = R \cdot \sin(\phi) \cdot \cos(\theta)$$

$$y = R \cdot \cos(\phi)$$

$$z = R \cdot \sin(\phi) \cdot \sin(\theta)$$

Where $R$ is the radius of the sphere, and $i$ is the zero-based index of the current element ($0 \le i < N$).

```javascript
function calculateSphericalCoordinates(index, totalItems, radius) {
  // Calculate polar angle (latitude distribution)
  const phi = Math.acos(1 - (2 * index) / totalItems);
  
  // Calculate azimuthal angle (longitude distribution using Golden Angle approximation)
  const theta = Math.sqrt(totalItems * Math.PI) * phi;

  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  };
}
```

#### Mesh Orientation (LookAt Vector)
For elements (such as 3D image planes) to face outward from the sphere's surface, set their rotation matrix to point directly away from the center $(0,0,0)$. In WebGL/Three.js:
```javascript
mesh.position.set(x, y, z);
mesh.lookAt(0, 0, 0); // Forces local normal to align toward center
mesh.rotateY(Math.PI); // Flips mesh 180 degrees so the front faces outward
```

---

### 2.3 OOP Physics-Based Particle Systems
To simulate realistic, natural motion (such as explosive scattering or floating debris), use an Object-Oriented Programming (OOP) model. This model tracks velocity, acceleration, gravity, and drag coefficients per frame.

#### Core Physics Integration Logic
$$\vec{v}_{t} = (\vec{v}_{t-1} + \vec{a}_{\text{gravity}}) \cdot \mu_{\text{friction}}$$

$$\vec{p}_{t} = \vec{p}_{t-1} + \vec{v}_{t}$$

Where $\vec{v}$ is the velocity vector, $\vec{p}$ is the position vector, $\vec{a}$ is constant external acceleration (such as gravity), and $\mu$ is a friction decay multiplier ($0 < \mu < 1$).

```javascript
class PhysicsParticle {
  constructor(element, options = {}) {
    this.element = element;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    
    // Configurable physics constants
    this.gravity = options.gravity || 0.25;
    this.friction = options.friction || 0.99;
    
    // Randomized velocity vectors
    const angle = Math.random() * Math.PI * 2;
    const force = options.minForce + Math.random() * (options.maxForce - options.minForce);
    this.vx = Math.cos(angle) * force;
    this.vy = Math.sin(angle) * force - (options.initialUpwardBoost || 0);
    this.vr = (Math.random() - 0.5) * (options.rotationSpeed || 10);
  }

  update() {
    // 1. Apply gravity (acceleration along Y-axis)
    this.vy += this.gravity;

    // 2. Apply friction (drag decay)
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vr *= this.friction;

    // 3. Update positions
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.vr;

    // 4. Update the DOM
    this.element.style.transform = `translate3d(${this.x.toFixed(2)}px, ${this.y.toFixed(2)}px, 0) rotate(${this.rotation.toFixed(2)}deg)`;
  }
}
```

---
 
## SECTION 3 — React/Next.js Animation & Layout Orchestration Rules
 
These rules apply to every React/Next.js component using GSAP. Violating them can cause silent animation failures, memory leaks, and layout shifts.
 
### Rule 1: `'use client'` is always line 1
 
Any file using hooks, GSAP, Lenis, or browser APIs must start with:
```jsx
'use client'
// imports come AFTER this line
import { useRef } from 'react'
import gsap from 'gsap'
```
*   **Why:** Next.js app router renders everything server-side by default. GSAP needs `document` and `window` which do not exist on the server. Missing `'use client'` causes "document is not defined" errors or silent execution failures.
 
### Rule 2: Register GSAP plugins OUTSIDE the component
 
```jsx
'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
 
// ← register HERE, not inside the component function
gsap.registerPlugin(ScrollTrigger, SplitText)
 
export default function MyComponent() { ... }
```
*   **Why:** Registering inside the component re-runs the registration on every render. Registering at the module level runs exactly once per module load.
 
### Rule 3: Use `useGSAP`, not `useEffect`
 
```jsx
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
 
export default function Component() {
  const container = useRef(null)
 
  useGSAP(() => {
    // all GSAP code here
    gsap.to('.box', { x: 100 })
 
    // return cleanup for ScrollTrigger instances:
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, { scope: container })  // ← scope limits selectors to this element
 
  return <div ref={container}><div className="box" /></div>
}
```
*   **Why:** `useGSAP` cleanly handles React Strict Mode (which double-invokes effects in development). Using standard `useEffect` with GSAP in Strict Mode causes double-animation bugs. The `scope` option ensures CSS selectors only target elements nested within that component.
 
### Rule 4: Lenis + GSAP ticker sync (when needed per-component)
 
When a component needs fine-grained Lenis control (rather than relying on the global `<ReactLenis root>`), sync the ticker manually:
 
```jsx
import { useRef, useEffect } from 'react'
import ReactLenis from 'lenis/react'
import gsap from 'gsap'
 
export default function Page() {
  const lenisRef = useRef(null)
 
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)   // ← prevents animation jitter on tab switches
    return () => gsap.ticker.remove(update)
  }, [])
 
  return (
    <ReactLenis ref={lenisRef} root autoRaf={false}>
      {/* page content */}
    </ReactLenis>
  )
}
```
 
### Rule 5: `forwardRef` for animated child components
 
When a parent component needs to hold references to mapped child components:
 
**Child (card.jsx):**
```jsx
import { forwardRef } from 'react'
 
const Card = forwardRef(function Card({ title, image, text }, ref) {
  return (
    <div ref={ref} className="card">
      <div className="card-wrapper">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={image} alt={title} />
          </div>
          <div className="flip-card-back"><p>{text}</p></div>
        </div>
      </div>
    </div>
  )
})
export default Card
```
 
**Parent (page.jsx):**
```jsx
const cardRefs = useRef([])
 
// In JSX:
{cards.map((card, i) => (
  <Card
    key={i}
    ref={el => { cardRefs.current[i] = el }}
    {...card}
  />
))}
```
 
### Rule 6: Always clean up
 
Return a cleanup function from `useGSAP` (or `useEffect`):
```jsx
useGSAP(() => {
  const triggers = []
  // ... create triggers and push to array ...
  return () => triggers.forEach(t => t.kill())
}, { scope: container })
```
*   **Why:** Without explicit cleanups, scroll triggers accumulate on every route change or state re-render, resulting in duplicate triggers, incorrect scroll positions, and memory leaks.

### Rule 7: Decoupling Pinning from Coordinate Translation (The Inner/Outer Pin Split)
A common issue when building sticky effects with library plugins (like ScrollTrigger) is that pinning and translating the same element along the Y-axis causes it to jump or reset coordinates. When a pinned state is released, the library typically resets the element's position using inline styles.

#### The Decoupling Pattern
To avoid this conflict, use separate layers for separate behaviors:
1.  **Outer Wrapper:** Responsible solely for layout positioning and the pinned state lock.
2.  **Inner Wrapper:** Responsible solely for coordinate transformations, rotation, and translation.

```xml
<!-- Outer container controls the PIN lock -->
<div class="card-outer-pin-trigger" style="position: relative; height: 100vh;">
  <!-- Inner container controls the TRANSLATION animation -->
  <div class="card-inner-animation-target" style="position: relative; width: 100%; height: 100%;">
    <!-- Visual Content -->
  </div>
</div>
```

```javascript
// Target the outer container to lock the scroll position
ScrollTrigger.create({
  trigger: ".card-outer-pin-trigger",
  pin: true,
  pinSpacing: false,
  start: "top top",
  end: "bottom top"
});

// Target the inner container to apply vertical translation
gsap.to(".card-inner-animation-target", {
  y: "-15vh",
  scrollTrigger: {
    trigger: ".card-outer-pin-trigger",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});
```

### Rule 8: Scroll-Sized Section Height Pre-Calculations
When content expands horizontally or diagonally on scroll, it can throw off the page's vertical scrolling height. This is common when scaling a card row to a larger width, which increases the section height because the elements maintain their aspect ratio.

```
INITIAL STATE                       EXPANDED STATE (on scroll)
+-----------------------+           +---------------------------------------------+
| [Card] [Card] [Card]  | (H1)  ->  |    [ CARD ]    [ CARD ]    [ CARD ]         | (H2)
+-----------------------+           +---------------------------------------------+
                                    * Note: H2 is taller than H1
```

To prevent page jumps or visual layout shifts during this change:
1.  Force the target element to its maximum width state.
2.  Query its height (`offsetHeight`).
3.  Apply that calculated height as a static `px` value to the outer parent.
4.  Revert the element to its starting state before the first screen paint.

```javascript
function recalculateScrollSectionBounds() {
  const row = document.querySelector('.projects-row');
  const section = document.querySelector('.projects-section');
  const totalRows = 3; // example value
  const gapSize = 16;
  const verticalPadding = 64;
  
  // 1. Temporarily force maximum expanded style properties
  row.style.width = '500%';
  
  // 2. Measure the expanded layout height
  const expandedHeight = row.offsetHeight;
  
  // 3. Revert styling
  row.style.width = '';
  
  // 4. Set the section container height to accommodate the expanded content
  const totalSectionHeight = (expandedHeight * totalRows) + (gapSize * (totalRows - 1)) + verticalPadding;
  section.style.height = `${totalSectionHeight}px`;
}
```

### Rule 9: Preserving CSS Properties (e.g., `text-indent`) During Text Splitting
Text splitting libraries (like GSAP SplitText or SplitType) break text blocks into individual lines, words, and characters by wrapping them in new helper tags. However, this structure destroys native CSS properties like `text-indent` on multi-line text blocks.

To keep your layout looking exactly as designed:
1.  Read the parent element's computed `text-indent` value before splitting.
2.  Perform the text split.
3.  Reset `text-indent` to `0` on the parent container to prevent double spacing.
4.  Apply the original indent value as a `padding-left` value specifically to the first child `.line` element.

```javascript
function splitTextAndPreserveIndent(element) {
  // 1. Read the computed text-indent value before splitting
  const computedIndent = window.getComputedStyle(element).textIndent;
  
  // 2. Perform the text split
  const split = new SplitType(element, { types: 'lines' });
  
  // 3. Apply the indent to the first line and reset the parent's indent
  if (computedIndent && computedIndent !== '0px') {
    element.style.textIndent = '0px'; // Prevent double-spacing
    
    const firstLine = element.querySelector('.line');
    if (firstLine) {
      firstLine.style.paddingLeft = computedIndent;
    }
  }
}
```
 
---
 
## SECTION 4 — Comprehensive Animation & Interaction Pattern Library
 
---
 
### PATTERN 1 — Sticky Card Stack (slide-over)
*Used in: sticky card scroll, scroll-based card reveals*
 
Cards stack on top of each other; each new card slides over the previous one.
 
**HTML structure — separate pin element from animated element:**
```jsx
<section ref={sectionRef} className="cards-section">
  {cardsData.map((card, i) => (
    <div key={i} ref={el => cardRefs.current[i] = el} className="card">
      {/* Animate this inner wrapper, NOT the outer .card */}
      <div className="card-inner">
        <p className="card-tag">{card.tag}</p>
        <img src={card.image} alt="" />
      </div>
    </div>
  ))}
</section>
```
 
**CSS:**
```css
.cards-section { width: 100%; height: 50vh; position: relative; border-radius: 12px; overflow: hidden; }
.card { position: absolute; width: 100%; height: 100%; border-radius: 12px; overflow: hidden; }
/* First card: y=0. Others: y=100% (pushed off screen, set by GSAP) */
```
 
**GSAP logic inside `useGSAP`:**
```js
const cards = cardRefs.current        // array of card DOM elements
const images = cards.map(c => c.querySelector('img'))
const total = cards.length
 
// Initial states
gsap.set(cards[0], { y: '0%', scale: 1, rotation: 0 })
gsap.set(images[0], { scale: 1 })
cards.slice(1).forEach(c => gsap.set(c, { y: '100%' }))
 
// Build timeline linked to ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.sticky-section',   // section containing the cards
    start: 'top top',
    end: () => `+=${window.innerHeight * (total - 1)}`,
    pin: true,
    pinSpacing: true,
    scrub: 0.5,
  }
})
 
for (let i = 0; i < total - 1; i++) {
  const pos = `step${i}`           // timeline label for sync
  tl.to(cards[i],   { scale: 0.5, rotation: -5 }, pos)    // current shrinks
  tl.to(images[i],  { scale: 1.5 }, pos)                   // parallax zoom
  tl.to(cards[i+1], { y: '0%' }, pos)                      // next slides in
}
```
 
**Alternative sticky variant (cards pin one-by-one, next slides over):**
```js
cards.forEach((card, i) => {
  if (i === cards.length - 1) return  // skip last card
 
  ScrollTrigger.create({
    trigger: card,
    start: 'top top',
    endTrigger: cards[cards.length - 1],
    pin: true,
    pinSpacing: false,   // ← CRITICAL: prevents gaps between pinned cards
  })
 
  // Animate inner wrapper upward (not the pinned card itself)
  const inner = card.querySelector('.card-inner')
  gsap.to(inner, {
    y: `-${(i + 1) * 14}vh`,    // stack offset
    ease: 'none',
    scrollTrigger: {
      trigger: cards[i + 1],    // triggered by NEXT card entering
      start: 'top bottom',
      end: 'top top',
      scrub: true,
    }
  })
})
```
 
**Fade effect using CSS variable (avoids transparency bleed through cards):**
```css
.card::after {
  content: ''; position: absolute; inset: 0;
  background: black;
  opacity: var(--card-overlay, 0);
  pointer-events: none;
  z-index: 2;
}
```
```js
// In onUpdate: gsap.set(card, { '--card-overlay': progress * 0.8 })
```
 
---
 
### PATTERN 2 — Scroll-Driven Progress with `onUpdate`
*Used in: multi-phase hero animations, mask sequences, progress indicators*
 
The core pattern for mapping scroll positions directly to custom, multi-phase states.
 
```js
ScrollTrigger.create({
  trigger: heroSection,
  start: 'top top',
  end: `+=${window.innerHeight * 8}`,   // 8× viewport of scroll room
  pin: true,
  pinSpacing: true,
  scrub: 0.5,
  onUpdate: (self) => {
    const p = self.progress   // always 0 to 1
 
    // — Update CSS variable progress bar —
    progressBarEl.style.setProperty('--progress', p)
 
    // — Move content block —
    gsap.set(contentEl, { y: -p * contentTravelDistance })
 
    // — Easing helper for sub-ranges —
    function easeInOut(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }
 
    // — Phase-based animation (each phase is a slice of 0–1) —
    // Phase A: 0.0 – 0.3 → mask scales down
    const A_START = 0.0, A_END = 0.3
    if (p >= A_START && p <= A_END) {
      const local = (p - A_START) / (A_END - A_START)
      const eased = easeInOut(local)
      gsap.set(maskEl, { scale: gsap.utils.interpolate(1, 0.3, eased) })
      gsap.set(imageEl, { filter: `saturate(${gsap.utils.interpolate(1, 0, eased)})` })
    }
    // Phase B: 0.3 – 0.6 → hold
    else if (p > A_END && p < 0.6) {
      gsap.set(maskEl, { scale: 0.3 })
    }
    // Phase C: 0.6 – 0.9 → mask scales back up
    else if (p >= 0.6 && p <= 0.9) {
      const local = (p - 0.6) / 0.3
      const eased = easeInOut(local)
      gsap.set(maskEl, { scale: gsap.utils.interpolate(0.3, 1, eased) })
      gsap.set(imageEl, { filter: `saturate(${eased})` })
    }
  }
})
```
 
**CSS for CSS-variable progress bar:**
```css
.progress-bar::after {
  content: '';
  position: absolute; top: 0; left: 0;
  height: 100%;
  width: 2px;                          /* thin vertical bar */
  transform: scaleY(var(--progress, 0));
  transform-origin: top;
  background: white;
}
```
 
---
 
### PATTERN 3 — Rotating Hand / Cycle-Based Scroll
*Used in: clock-hand animations, multi-chapter scroll experiences*
 
A rotating element completes multiple full 360° rotations as user scrolls. Each revolution triggers a content change.
 
```js
const pinHeight = window.innerHeight * 8    // total scroll distance
let currentCycle = 0
const headers = ['Text for cycle 1', 'Text for cycle 2', 'Text for cycle 3']
 
function updateHeaderText() {
  if (h1El) h1El.innerHTML = headers[currentCycle] || headers[0]
}
updateHeaderText()   // set initial text
 
ScrollTrigger.create({
  trigger: stickySection,
  start: 'top top',
  end: `+=${pinHeight}`,
  pin: true, pinSpacing: true,
  onUpdate: (self) => {
    const p = self.progress
 
    // Control rotation (maps progress → multiple 360° cycles)
    const rotationProgress = Math.min((p * 8) / 5, 1)   // 0→1 over first 5/8
    const totalRotation = (rotationProgress * 1800) - 90  // 5 full rotations
    gsap.set(handContainerEl, { rotation: totalRotation })
 
    // Detect which 360° cycle we're in
    const newCycle = Math.floor(Math.abs(totalRotation) / 360)
    if (newCycle !== currentCycle && newCycle < headers.length) {
      currentCycle = newCycle
      updateHeaderText()
    }
 
    // Phase-based reveals using gsap.utils.interpolate:
    // Hand height grows from 50% to 100% in first 6/8 of scroll
    if (p <= (6/8)) {
      const handProgress = p / (6/8)
      const handHeight = gsap.utils.interpolate(50, 100, handProgress)
      gsap.set(handEl, { height: `${handHeight}%` })
      gsap.set(h1El, { opacity: gsap.utils.interpolate(1, 0, handProgress) })
    }
 
    // Hand zooms out in 7/8 slice
    if (p <= (7/8)) {
      const scaleProgress = (p - 6/8) / (1/8)
      gsap.set(handEl, { scale: gsap.utils.interpolate(1, 20, scaleProgress) })
    }
 
    // Hand fades out between 7/8 and 7.5/8
    if (p <= (7.5/8)) {
      const fadeProgress = (p - 7/8) / (0.5/8)
      gsap.set(handEl, { opacity: gsap.utils.interpolate(1, 0, fadeProgress) })
    }
 
    // Final content reveals after 7.5/8
    const showFinal = p > (7.5/8)
    gsap.set(websiteContentEl, { opacity: showFinal ? gsap.utils.interpolate(0, 1, (p - 7.5/8) / (0.5/8)) : 0 })
  }
})
```
 
---
 
### PATTERN 4 — Expanding Grid Rows (GSAP Ticker, NOT ScrollTrigger)
*Used in: project grids that expand as rows scroll into view*
 
Uses `gsap.ticker` instead of ScrollTrigger because the animation reads `window.scrollY` directly each frame — offering higher precision for width-based expansion. Uses Rule 8 height pre-calculations to prevent jumps.
 
**HTML:**
```jsx
<section ref={sectionRef} className="projects-section">
  {rowsData.map((row, i) => (
    <div key={i} ref={el => rowsRef.current[i] = el} className="projects-row">
      {row.map((project, j) => (
        <div key={j} className="project-item">
          <div className="project-image"><img src={project.image} /></div>
          <div className="project-info">
            <span>{project.name}</span><span>{project.year}</span>
          </div>
        </div>
      ))}
    </div>
  ))}
</section>
```
 
**CSS — rows start wider than viewport:**
```css
.projects-section {
  display: flex; flex-direction: column;
  align-items: center; overflow: hidden;   /* ← hide horizontal overflow */
  gap: 16px; padding: 32px 0;
}
.projects-row {
  width: 125%;     /* ← compressed start; GSAP animates this UP to 500% */
  display: flex; gap: 16px;
}
.project-item { flex: 1; aspect-ratio: 7/5; overflow: hidden; }
```
 
**JS in `useEffect` (not `useGSAP` — ticker-based):**
```js
const section = sectionRef.current
const rows = rowsRef.current
const isMobile = window.innerWidth < 1000
 
const rowStartWidth = isMobile ? 250 : 125    // % values
const rowEndWidth   = isMobile ? 750 : 500
 
// Rule 8: Calculate section height based on expanded row dimensions
// (Temporarily expand → measure → reset — happens in one paint cycle)
rows[0].style.width = `${rowEndWidth}%`
const expandedRowH = rows[0].offsetHeight
rows[0].style.width = `${rowStartWidth}%`
 
const gap = parseFloat(getComputedStyle(section).gap) || 16
const paddingTop = parseFloat(getComputedStyle(section).paddingTop) || 32
const paddingBot = parseFloat(getComputedStyle(section).paddingBottom) || 32
const totalH = expandedRowH * rows.length + gap * (rows.length - 1) + paddingTop + paddingBot
section.style.height = `${totalH}px`
 
function onScrollUpdate() {
  const scrollY = window.scrollY
  const vh = window.innerHeight
 
  rows.forEach(row => {
    const rect = row.getBoundingClientRect()
    const rowTop    = rect.top + scrollY       // absolute position in doc
    const rowBottom = rowTop + rect.height
 
    const rangeStart = rowTop - vh             // when row enters viewport bottom
    const rangeEnd   = rowBottom               // when row exits viewport top
    const range      = rangeEnd - rangeStart
 
    const progress = Math.max(0, Math.min(1, (scrollY - rangeStart) / range))
    const width = rowStartWidth + (rowEndWidth - rowStartWidth) * progress
    row.style.width = `${width}%`
  })
}
 
gsap.ticker.add(onScrollUpdate)    // run every frame
gsap.ticker.lagSmoothing(0)
 
// Resize handler
function handleResize() {
  // recalculate heights using Rule 8 as above...
}
window.addEventListener('resize', handleResize)
 
return () => {
  gsap.ticker.remove(onScrollUpdate)
  window.removeEventListener('resize', handleResize)
}
```
 
---
 
### PATTERN 5 — Text Reveal (SplitText + Clip Mask)
*Used in: line-by-line reveals, character reveals, block sweeps*
 
Provides standard reveals, dual-origin block reveals, and parallel staggers.
 
**Required CSS for clip mask to work:**
```css
.line {
  display: block;
  overflow: hidden;   /* clips characters that are below the baseline */
}
.char { display: inline-block; }  /* needed for transform support */
```

#### Variant 5A: Reusable Component Basic Reveal
```jsx
'use client'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
gsap.registerPlugin(SplitText, ScrollTrigger)
 
export default function AnimatedText({
  children,
  animateOnScroll = true,  // false = play immediately on mount
  delay = 0,               // seconds before animation starts
  stagger = 0.02,          // seconds between each character
  duration = 0.8,
}) {
  const container = useRef(null)
 
  useGSAP(() => {
    const el = container.current
    if (!el) return
 
    const split = SplitText.create(el, {
      type: 'lines,words,chars',
      linesClass: 'line',
      charsClass: 'char',
      autoSplit: true,
    })
 
    // Set initial hidden state — chars pushed below clip boundary
    gsap.set(split.chars, { y: '100%', opacity: 0, skewX: 20 })
 
    const anim = gsap.to(split.chars, {
      y: '0%', opacity: 1, skewX: 0,
      duration, ease: 'power3.out',
      stagger: { amount: stagger * split.chars.length },
      delay,
      paused: animateOnScroll,
    })
 
    let trigger
    if (animateOnScroll) {
      trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',    // fire when element is 90% from top of viewport
        once: true,          // only animate once
        onEnter: () => anim.restart(),
        onLeaveBack: () => anim.pause(0),   // instant reset on scroll back
      })
    }
 
    // CRITICAL: always revert SplitText in cleanup
    return () => {
      split.revert()         // removes injected spans, restoring original DOM
      trigger?.kill()
    }
  }, { scope: container })
 
  if (typeof children === 'object' && children.type) {
    const { cloneElement } = require('react')
    return cloneElement(children, {
      ref: container,
      className: [children.props.className, 'animated-text'].filter(Boolean).join(' ')
    })
  }
  return <div ref={container}>{children}</div>
}
```

#### Variant 5B: Dual-Origin Block Reveal
A colored block slides in to cover the text line, and then slides out in the same direction to reveal the text underneath. This requires changing the transform origin of the block mid-animation.

```
PHASE A: Block Slides In (Origin: Left)
+---------------------------------------+
| ====> [   COLORED BLOCK MASK   ]      | (scaleX: 0 -> 1)
+---------------------------------------+

PHASE B: Block Slides Out (Origin: Right)
+---------------------------------------+
|       [   COLORED BLOCK MASK   ] ===> | (scaleX: 1 -> 0)
+---------------------------------------+
```

```javascript
function playBlockReveal(blockElement, textElement, blockColor = '#000') {
  const tl = gsap.timeline();
  
  // Design setup for block: position absolute overlay on text container
  gsap.set(blockElement, { 
    position: 'absolute', inset: 0, background: blockColor, 
    scaleX: 0, transformOrigin: 'left' 
  });

  tl.set(blockElement, { transformOrigin: "left" })
    .set(textElement, { opacity: 0 })
    
    // Phase 1: Expand block to cover text
    .to(blockElement, { 
      scaleX: 1, 
      duration: 0.4, 
      ease: "power2.in" 
    })
    
    // Phase 2: Make text visible while covered
    .set(textElement, { opacity: 1 })
    
    // Phase 3: Switch transform origin to right
    .set(blockElement, { transformOrigin: "right" })
    
    // Phase 4: Collapse block to the right
    .to(blockElement, { 
      scaleX: 0, 
      duration: 0.4, 
      ease: "power2.out" 
    });
}
```

#### Variant 5C: Line-Relative Character Indexing (Parallel Staggering)
Applying a simple stagger to every character across a block causes the lines to animate sequentially. For a balanced feel where all lines reveal their characters in parallel, group characters by line and calculate local indices.

```
STAGGER SEQUENCE (Sequential vs Parallel)
Sequential: Line 1 (1-2-3-4-5) -> Line 2 (6-7-8-9-10)
Parallel:   Line 1 (1-2-3-4-5)
            Line 2 (1-2-3-4-5) (Animates at the same time as Line 1)
```

$$\text{Delay} = \text{Line-Relative Index} \cdot \text{Stagger Rate}$$

```javascript
function applyParallelCharacterStagger(parentElement) {
  // SplitText lines/chars mapping
  const lines = parentElement.querySelectorAll('.line');

  lines.forEach((line) => {
    const characters = line.querySelectorAll('.char');
    
    characters.forEach((char, index) => {
      const delay = index * 0.05;
      
      gsap.to(char, {
        y: '0%',
        opacity: 1,
        delay: delay,
        ease: 'power2.out',
        duration: 0.6
      });
    });
  });
}
```
 
---
 
### PATTERN 6 — Tilt + Pin Sections
*Used in: scroll-driven tilt reveal, stacked section experiences*
 
```js
// HTML: <section class="section"><div class="container">...content...</div></section>
// CSS: .container { transform: rotate(-3deg); transform-origin: bottom left; }
 
const sections = gsap.utils.toArray('.section')
 
sections.forEach((section, i) => {
  const container = section.querySelector('.container')
 
  // Tilt animation — MUST use ease: 'none' with scrub
  gsap.to(container, {
    rotation: 0,         // CSS sets initial tilt; GSAP animates to 0
    ease: 'none',        // ← REQUIRED with scrub; easing causes drift
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',     // begins when section bottom hits viewport bottom
      end: 'top 30%',          // ends when section top is 30% from top
      scrub: true,
    }
  })
 
  // Pin — skip last section (nothing to pin it against)
  if (i < sections.length - 1) {
    ScrollTrigger.create({
      trigger: section,
      start: 'bottom bottom',   // pin AFTER all content has been seen
      end: 'bottom top',
      pin: true,
      pinSpacing: false,        // no layout gap — lets next section overlay cleanly
    })
  }
})
```
 
---
 
### PATTERN 7 — Parallax Images (With Lerp Processing)
*Used in: image sections that drift at different speeds from page scroll*
 
Smoothly lerps the coordinates in a requestAnimationFrame loop mapped to Lenis scroll data.
 
```jsx
'use client'
import { useLenis } from 'lenis/react'
import { useRef, useEffect } from 'react'
 
function ParallaxImage({ src, alt, speed = 0.2 }) {
  const wrapperRef = useRef(null)
  const imgRef     = useRef(null)
  const boundsRef  = useRef(null)
  const currentY   = useRef(0)
  const targetY    = useRef(0)
  const rafId      = useRef(null)
 
  const lerp = (a, b, f) => a + (b - a) * f
 
  // Update target Y on every Lenis scroll event
  useLenis(({ scroll }) => {
    if (!boundsRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      boundsRef.current = { top: rect.top + scroll, height: rect.height }
    }
    targetY.current = (scroll - boundsRef.current.top) * speed
  })
 
  // Smoothly lerp toward target in RAF loop
  useEffect(() => {
    function animate() {
      currentY.current = lerp(currentY.current, targetY.current, 0.1)
      if (imgRef.current) {
        // Round values to two decimal places to prevent sub-pixel positioning flicker
        imgRef.current.style.transform = `translate3d(0, ${currentY.current.toFixed(2)}px, 0) scale(1.2)`
      }
      rafId.current = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(rafId.current)
  }, [])
 
  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden', position: 'relative' }}>
      <img
        ref={imgRef} src={src} alt={alt}
        style={{ width: '100%', transform: 'translate3d(0,0,0) scale(1.2)', willChange: 'transform' }}
      />
    </div>
  )
}
```
 
---
 
### PATTERN 8 — Image Trail (Cursor Follows)
*Used in: cursor image trails with venetian-blind reveals*

#### Variant 8A: Standard GSAP Vector Image Trail
```js
// Config:
const config = {
  imageLifespan: 1000,      // ms each trail image stays on screen
  mouseThreshold: 80,       // px cursor must move before new image appears
  revealDuration: 400,      // ms clip-path reveals each slice
  fadeDuration: 500,        // ms opacity fade-out on exit
  sliceCount: 10,           // number of venetian-blind slices per image
  staggerIn: 30,            // ms between each slice appearing
  staggerOut: 20,           // ms between each slice disappearing
}
 
const imagePaths = Array.from({ length: 20 }, (_, i) => `/trail-images/img-${i+1}.jpg`)
let activeImages = []
let currentIndex = 0
let mouseX = 0, mouseY = 0, lerpX = 0, lerpY = 0
let lastX = 0, lastY = 0
let rafId
 
function createTrailImage() {
  const container = trailContainerEl
  const containerRect = container.getBoundingClientRect()
 
  const wrap = document.createElement('div')
  wrap.className = 'trail-item'
  const x = mouseX - containerRect.left
  const y = mouseY - containerRect.top
  Object.assign(wrap.style, {
    position: 'absolute', left: `${lerpX - containerRect.left}px`,
    top: `${lerpY - containerRect.top}px`, pointerEvents: 'none',
  })
 
  for (let i = 0; i < config.sliceCount; i++) {
    const slice = document.createElement('div')
    const img = document.createElement('div')
    const heightPct = 100 / config.sliceCount
 
    Object.assign(slice.style, {
      position: 'absolute', width: '100%',
      height: `${heightPct + 0.1}%`,   // +0.1% prevents hairline gaps
      top: `${i * heightPct}%`,
      overflow: 'hidden',
      clipPath: 'inset(50% 0 50% 0)',   // collapsed initially (hidden)
      transition: `clip-path ${config.revealDuration}ms ease ${i * config.staggerIn}ms`,
    })
    Object.assign(img.style, {
      width: '150px', height: '200px',
      backgroundImage: `url(${imagePaths[currentIndex % imagePaths.length]})`,
      backgroundSize: 'cover',
      backgroundPositionY: `${-i * heightPct}%`,
    })
    slice.appendChild(img)
    wrap.appendChild(slice)
  }
 
  container.appendChild(wrap)
  currentIndex++
 
  requestAnimationFrame(() => {
    wrap.style.transition = `left 0.1s, top 0.1s`
    wrap.style.left = `${mouseX - containerRect.left}px`
    wrap.style.top = `${mouseY - containerRect.top}px`
    wrap.querySelectorAll('div').forEach(s => {
      s.style.clipPath = 'inset(0% 0 0% 0)'   // fully open
    })
  })
 
  const entry = { el: wrap, born: Date.now() }
  activeImages.push(entry)
  setTimeout(() => removeTrailImage(entry), config.imageLifespan)
}
 
function removeTrailImage(entry) {
  entry.el.querySelectorAll('div').forEach((s, i) => {
    s.style.transition = `clip-path ${config.fadeDuration}ms ease ${i * config.staggerOut}ms`
    s.style.clipPath = 'inset(50% 0 50% 0)'
  })
  setTimeout(() => {
    entry.el.remove()
    activeImages = activeImages.filter(a => a !== entry)
  }, config.fadeDuration + config.sliceCount * config.staggerOut)
}
 
function render() {
  lerpX += (mouseX - lerpX) * 0.1
  lerpY += (mouseY - lerpY) * 0.1
 
  const dist = Math.hypot(mouseX - lastX, mouseY - lastY)
  if (dist > config.mouseThreshold) {
    createTrailImage()
    lastX = mouseX; lastY = mouseY
  }
 
  rafId = requestAnimationFrame(render)
}
 
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY })
render()
```

#### Variant 8B: Pixel-Slicing Image Trail (Segmented Blind Reveal)
Splits a single image into multiple overlapping vertical slices.

```
+---------------------------------------+
| S1   | S2   | S3   | S4   | S5   | S6 | ← Overlapping Vertical Slices
|      |      |      |      |      |    |
+---------------------------------------+
Each slice (S) animates its clip-path: inset(0% [dynamic]% 0% [dynamic]%)
```

$$\text{Clip-Path} = \text{inset}(0\%\ \ (100 - (\text{Index} + 1) \cdot w)\%\ \ 0\%\ \ (\text{Index} \cdot w)\%)$$

```javascript
function createSegmentedImage(container, imageSrc, x, y) {
  const slicesCount = 10;
  const sliceWidth = 100 / slicesCount;
  
  const parent = document.createElement('div');
  parent.className = 'trail-image-wrapper';
  parent.style.position = 'absolute';
  parent.style.left = `${x}px`;
  parent.style.top = `${y}px`;
  parent.style.width = '200px';
  parent.style.height = '300px';

  for (let i = 0; i < slicesCount; i++) {
    const slice = document.createElement('div');
    slice.className = 'trail-slice';
    slice.style.position = 'absolute';
    slice.style.top = '0';
    slice.style.bottom = '0';
    slice.style.left = '0';
    slice.style.right = '0';
    slice.style.overflow = 'hidden';
    
    // Set the initial clipped state (collapsed to a thin vertical line in the center of the slice)
    slice.style.clipPath = `inset(0% ${(100 - (i + 1) * sliceWidth)}% 0% ${(i * sliceWidth + sliceWidth / 2)}%)`;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '200px';
    img.style.height = '300px';
    img.style.objectFit = 'cover';
    
    slice.appendChild(img);
    parent.appendChild(slice);

    // Calculate a staggered delay starting from the center slice outward
    const delay = Math.abs((slicesCount / 2) - i) * 0.04;
    
    // Animate the clip-path open
    setTimeout(() => {
      slice.style.transition = `clip-path 0.6s cubic-bezier(0.25, 1, 0.5, 1)`;
      slice.style.clipPath = `inset(0% ${(100 - (i + 1) * sliceWidth)}% 0% ${(i * sliceWidth)}%)`;
    }, delay * 1000);
  }
  
  container.appendChild(parent);
}
```
 
---
 
### PATTERN 9 — Hover Grid Highlight
*Used in: interactive grids where a highlight glides between cells*
 
```
+-------------------+-------------------+
| [Cell 1]          | [Cell 2]          |
|  x: 0, y: 0       |  x: 200, y: 0     |
|                   |  (Hovered)        |
|                   |  +-------------+  |
|                   |  | [HIGHLIGHT] |  | ← Glides smoothly here
|                   |  +-------------+  |
+-------------------+-------------------+
```

Includes a grid highlight tracking element, positioning coordinates relative to the grid wrapper bounds.
 
```js
const container  = containerRef.current
const items      = container.querySelectorAll('.grid-item')
const highlight  = container.querySelector('.highlight')
const colors     = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
 
// Assign per-item colors via data attributes
items.forEach((item, i) => {
  item.dataset.color = colors[i % colors.length]
})
 
// Move highlight to cover a grid item
function moveToElement(target) {
  const tRect = target.getBoundingClientRect()
  const cRect = container.getBoundingClientRect()
  Object.assign(highlight.style, {
    transform: `translate3d(${tRect.left - cRect.left}px, ${tRect.top - cRect.top}px, 0)`,
    width:     `${tRect.width}px`,
    height:    `${tRect.height}px`,
    background: target.dataset.color,
  })
}
 
if (items.length > 0) moveToElement(items[0])
 
container.addEventListener('mousemove', e => {
  const el = document.elementFromPoint(e.clientX, e.clientY)
  if (!el) return
  const target = el.closest('.grid-item')
  if (target) moveToElement(target)
})
```
 
**CSS — smooth glide via CSS transitions:**
```css
.highlight {
  position: absolute; top: 0; left: 0;
  pointer-events: none;
  transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), 
              width 0.25s cubic-bezier(0.25, 1, 0.5, 1), 
              height 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  border-radius: 4px; z-index: 0;
}
.grid-item p { position: relative; z-index: 1; }
```
 
---
 
### PATTERN 10 — 3D Card Fan/Flip
*Used in: 3-phase scroll: pin → spread → flip*
 
**Three-layer HTML structure:**
```jsx
<div className="card">           {/* outer: handles positioning & scale */}
  <div className="card-wrapper"> {/* middle: handles float CSS animation */}
    <div className="flip-card-inner">   {/* inner: CSS preserve-3d */}
      <div className="flip-card-front"><img /></div>
      <div className="flip-card-back"><p>text</p></div>
    </div>
  </div>
</div>
```
 
**CSS for 3D flip:**
```css
.card {
  position: absolute;
  width: 240px; height: 360px;
  perspective: 1000px;           /* ← required for 3D depth */
}
.card-wrapper {
  position: absolute; inset: 0;
  animation: float 3s ease-in-out infinite;
}
.flip-card-inner {
  position: absolute; inset: 0;
  transform-style: preserve-3d;  /* ← children render in 3D space */
}
.flip-card-front,
.flip-card-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;   /* ← hide the back face when rotated away */
}
.flip-card-back {
  transform: rotateY(180deg);    /* ← start rotated; flip will rotate to 0 */
  background: #333; color: white;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}
```
 
**GSAP — three-phase animation:**
```js
const cards    = cardRefs.current
const totalScrollH = window.innerHeight * 3
const positions  = ['-30%', '-10%', '10%', '30%']
const rotations  = ['-15deg', '-5deg', '5deg', '15deg']
 
// PHASE 1: Pin the section
ScrollTrigger.create({
  trigger: cardSection,
  start: 'top top',
  end: `+=${totalScrollH}`,
  pin: true, pinSpacing: true,
})
 
// PHASE 2: Spread cards (scroll 0 → 1× viewport)
cards.forEach((card, i) => {
  gsap.to(card, {
    left: positions[i], rotation: rotations[i],
    ease: 'power2.out',
    scrollTrigger: {
      trigger: cardSection,
      start: 'top top',
      end: `+=${window.innerHeight}`,
      scrub: 0.5,
      id: `spread-${i}`,
    }
  })
})
 
// PHASE 3: Flip cards (scroll 1×→2× viewport, staggered per card)
const staggerOffset = 0.1
cards.forEach((card, i) => {
  const startOffset = (1/3) + i * staggerOffset
  const endOffset   = (2/3) + i * staggerOffset
 
  const front = card.querySelector('.flip-card-front')
  const back  = card.querySelector('.flip-card-back')
 
  ScrollTrigger.create({
    trigger: cardSection,
    start: 'top top',
    end: `+=${totalScrollH}`,
    scrub: 1,
    onUpdate: (self) => {
      const p = self.progress
      if (p >= startOffset && p <= endOffset) {
        const flipProgress = (p - startOffset) / (endOffset - startOffset)
        gsap.set(front, { rotateY: flipProgress * -180 })
        gsap.set(back,  { rotateY: 180 - flipProgress * 180 })
        const currentRotation = parseFloat(rotations[i]) * (1 - flipProgress)
        gsap.set(card, { rotation: currentRotation })
      }
    }
  })
})
```
 
---
 
### PATTERN 11 — Physics Particle Explosion
*Used in: footer image scatter, confetti effects*
 
Utilizes the OOP Physics system outlined in Section 2.3.
 
```js
const CONFIG = {
  gravity: 0.25,
  friction: 0.99,
  horizontalForce: 20,
  verticalForce: 15,
  rotationSpeed: 10,
  imageSize: 150,
  resetDelay: 500,
  totalImages: 15,
}
 
let particles = []
let animId = null
let triggered = false
 
function explode() {
  if (triggered) return
  triggered = true
 
  explosionContainer.innerHTML = ''
  particles = imagePaths.map((src, i) => {
    const img = document.createElement('img')
    img.src = src
    img.style.cssText = `width:${CONFIG.imageSize}px; position:absolute; bottom:0; left:50%;`
    explosionContainer.appendChild(img)
    
    // Instantiate our OOP physics particle
    return new PhysicsParticle(img, {
      gravity: CONFIG.gravity,
      friction: CONFIG.friction,
      minForce: 5,
      maxForce: CONFIG.horizontalForce,
      initialUpwardBoost: CONFIG.verticalForce,
      rotationSpeed: CONFIG.rotationSpeed
    })
  })
 
  let finished = false
  function animate() {
    if (finished) return
    particles.forEach(p => p.update())
 
    // Check if all particles have fallen below viewport boundary
    if (particles.every(p => p.y > explosionContainer.clientHeight)) {
      finished = true
      cancelAnimationFrame(animId)
      setTimeout(() => { triggered = false }, CONFIG.resetDelay)
      return
    }
    animId = requestAnimationFrame(animate)
  }
  animate()
}
 
function checkVisibility() {
  const rect = footerEl.getBoundingClientRect()
  if (rect.top < window.innerHeight && !triggered) explode()
}
window.addEventListener('scroll', checkVisibility)
```
 
**CSS for explosion container:**
```css
.explosion-container {
  position: absolute; bottom: 0; left: 0;
  width: 100%; height: 200%;    /* extra vertical flight clearance */
  pointer-events: none; overflow: hidden;
}
```
 
---
 
### PATTERN 12 — CSS 3D Video/Image Carousel
*Used in: 3D depth carousels, video sliders with perspective*
 
**CSS — perspective creates 3D depth:**
```css
.slider {
  position: absolute;
  top: 50vh;
  width: 100vw; height: 100vh;
  perspective: 175px;          /* smaller value = more dramatic depth */
  perspective-origin: center bottom;
}
.card {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  width: 65vw; height: 500px;
  overflow: hidden;
}
```
 
**GSAP — initialize card positions (3D stack):**
```js
function initializeCards() {
  const cards = sliderEl.querySelectorAll('.card')
  gsap.to(cards, {
    yPercent: (i) => i * 20,    // each card 20% lower than previous
    z: (i) => i * 15,           // each card 15px further back
    duration: 1,
    ease: 'power2.out',
    stagger: { each: 0.05, from: 'end' },  // negative stagger — animate from last
  })
}
```
 
**Click to cycle cards:**
```js
let isAnimating = false
 
function handleClick() {
  if (isAnimating) return
  isAnimating = true
 
  const cards = Array.from(sliderEl.querySelectorAll('.card'))
  const lastCard = cards[cards.length - 1]
 
  gsap.to(lastCard, {
    yPercent: 150,              // animate off screen down
    duration: 0.75,
    onStart: () => {
      setTimeout(() => {
        sliderEl.prepend(lastCard)   // move to front of DOM (first in stack)
        initializeCards()            // re-initialize all positions
      }, 50)
    },
    onComplete: () => {
      setTimeout(() => { isAnimating = false }, 200)
    }
  })
}
 
containerEl.addEventListener('click', handleClick)
```
 
**For Vimeo/YouTube embeds — disable SSR on ReactPlayer:**
```jsx
import dynamic from 'next/dynamic'
 
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
// WHY: react-player loads external scripts that violate CSP when server-rendered
```
 
---
 
### PATTERN 13 — Page Transitions: Block Grid
*Used in: pixelated screen wipe between routes*
 
**Setup with `next-transition-router`:**
```jsx
'use client'
import { TransitionRouter } from 'next-transition-router'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
 
export default function TransitionProvider({ children }) {
  const gridRef  = useRef(null)
  const blocksRef = useRef([])
 
  function buildGrid() {
    if (!gridRef.current) return
    gridRef.current.innerHTML = ''
    blocksRef.current = []
    const BLOCK = 80
    const cols = Math.ceil(window.innerWidth / BLOCK)
    const rows = Math.ceil(window.innerHeight / BLOCK) + 1
 
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const div = document.createElement('div')
        div.className = 'transition-block'
        Object.assign(div.style, {
          position: 'absolute', background: '#111',
          width: `${BLOCK}px`, height: `${BLOCK}px`,
          left: `${c * BLOCK}px`, top: `${r * BLOCK}px`,
        })
        gridRef.current.appendChild(div)
        blocksRef.current.push(div)
      }
    }
    gsap.set(blocksRef.current, { opacity: 0 })
  }
 
  useEffect(() => {
    buildGrid()
    window.addEventListener('resize', buildGrid)
    return () => window.removeEventListener('resize', buildGrid)
  }, [])
 
  return (
    <TransitionRouter
      auto
      leave={(next) => {
        const tw = gsap.to(blocksRef.current, {
          opacity: 1, duration: 0.04,
          stagger: { amount: 0.4, from: 'random' },
          onComplete: next,
        })
        return () => tw.kill()
      }}
      enter={(next) => {
        gsap.set(blocksRef.current, { opacity: 1 })
        const tw = gsap.to(blocksRef.current, {
          opacity: 0, duration: 0.04,
          stagger: { amount: 0.4, from: 'random' },
          onComplete: next,
        })
        return () => tw.kill()
      }}
    >
      <div
        ref={gridRef}
        style={{ position: 'fixed', inset: 0, zIndex: 9999,
                 pointerEvents: 'none', overflow: 'hidden' }}
      />
      {children}
    </TransitionRouter>
  )
}
```
 
---
 
### PATTERN 14 — Page Transitions: SVG Stroke Draw
*Used in: organic hand-drawn path transitions*
 
Animating `stroke-dashoffset` to a positive length causes the stroke to visually rewind back to its start point. To make the stroke look like it is continuing its journey forward off-screen, animate the dashoffset to a **negative** value.

#### Structural SVG Setup
```xml
<svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style="position: fixed; inset: 0; width: 100%; height: 100%; scale: 1.5; pointer-events: none; z-index: 9999;">
  <path id="transition-path" d="M0,540 C480,100 1440,980 1920,540" fill="none" stroke="#FF0000" stroke-width="200" />
</svg>
```
 
#### Control Logic
```jsx
// In transition provider:
useEffect(() => {
  const path = document.querySelector('#transition-path')
  const len = path.getTotalLength()
  gsap.set(path, {
    strokeDasharray: len,
    strokeDashoffset: len, // fully hidden
    attr: { strokeWidth: 200 }
  })
}, [])
 
// Leave: draw paths IN + thicken to cover full screen
const leave = (next) => {
  const path = document.querySelector('#transition-path')
  const len = path.getTotalLength()
  
  const tl = gsap.timeline({ onComplete: next })
  tl.to(path, {
    strokeDashoffset: 0,          // fully drawn
    attr: { strokeWidth: 700 },   // thick enough to fill viewport
    duration: 0.8, ease: 'power2.inOut',
  })
  return () => tl.kill()
}
 
// Enter: continue paths FORWARD off screen (NOT reverse/rewind)
const enter = (next) => {
  const path = document.querySelector('#transition-path')
  const len = path.getTotalLength()
  
  const tl = gsap.timeline({ onComplete: next })
  tl.to(path, {
    strokeDashoffset: -len,       // ← NEGATIVE: continues forward off-screen
    attr: { strokeWidth: 200 },   // thins back out
    duration: 0.8, ease: 'power2.inOut',
    onComplete: () => gsap.set(path, { strokeDashoffset: len })  // reset for next transition
  })
  return () => tl.kill()
}
```
 
---
 
### PATTERN 15 — Page Transitions: View Transition API
*Used in: clip-path slide-in transitions (next-view-transitions)*
 
```jsx
// app/layout.jsx
import { ViewTransitions } from 'next-view-transitions'
<html><body><ViewTransitions />{children}</body></html>
```

Navbar page routing configuration using customized CSS Grouping overlays:

```jsx
'use client'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
 
function NavLink({ href, children }) {
  const router = useTransitionRouter()
  const pathname = usePathname()
 
  function handleClick(e) {
    e.preventDefault()
    if (pathname === href) return
 
    router.push(href, {
      onTransitionReady: slideInOut
    })
  }
 
  function slideInOut() {
    document.documentElement.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0.2, transform: 'translateY(-35%)' }
      ],
      { duration: 1500, easing: 'cubic-bezier(0.76,0,0.24,1)',
        fill: 'forwards', pseudoElement: '::view-transition-old(root)' }
    )
    document.documentElement.animate(
      [
        { clipPath: 'inset(100% 0 0 0)' },   // hidden below screen
        { clipPath: 'inset(0% 0 0 0)' }       // fully revealed
      ],
      { duration: 1500, easing: 'cubic-bezier(0.76,0,0.24,1)',
        fill: 'forwards', pseudoElement: '::view-transition-new(root)' }
    )
  }
 
  return <a href={href} onClick={handleClick}>{children}</a>
}
```
 
**REQUIRED CSS overrides — without these, the incoming page can render underneath the outgoing page:**
```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none !important;
  mix-blend-mode: normal !important;
}
::view-transition-image-pair(root) {
  isolation: isolate;
  will-change: clip-path, transform;
}
::view-transition-new(root) {
  z-index: 10000;
}
::view-transition-old(root) {
  z-index: 1;
}
```
 
---
 
### PATTERN 16 — Page Transitions: Framer Motion (Pages Router only)
*Used in: slide/scale transitions*
 
```jsx
// pages/_app.js
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
 
export default function App({ Component, pageProps }) {
  const router = useRouter()
 
  return (
    <AnimatePresence mode="wait">
      <div key={router.asPath}>
        <motion.div
          className="slide-in"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="slide-out"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <Component {...pageProps} />
      </div>
    </AnimatePresence>
  )
}
```
```css
.slide-in  { position: fixed; inset: 0; background: #111; transform-origin: bottom; z-index: 999; }
.slide-out { position: fixed; inset: 0; background: #111; transform-origin: top;    z-index: 999; }
```
 
---
 
### PATTERN 17 — Scroll-Driven Pinned Footer Page Transition
*Used in: footer that pins while a progress bar fills, then triggers a route change*
 
```
PAGE A (Outgoing)               PAGE B (Incoming)
+-------------------------+     +-------------------------+
| [Content Scroll]        |     | [Fixed Title Position]  |
|                         |     |      (x:50%, y:50%)     |
| [Title: "PROJECT X"]    | === |                         |
|      (x:50%, y:50%)     |     | [New Content Scroll]    |
+-------------------------+     +-------------------------+
```

To create a transition where a piece of content (like a header) appears to stay locked in place while the rest of the page layout changes, align the element coordinates exactly between the outgoing page's footer and the incoming page's hero.

```js
let isTransitioning = false
 
ScrollTrigger.create({
  trigger: footerEl,
  start: 'top top',
  end: `+=${window.innerHeight * 3}`,
  pin: true, pinSpacing: true,
  onEnter: () => {
    gsap.to(navbarEl, { y: '-100%', duration: 0.4 })
  },
  onLeaveBack: () => {
    gsap.to(navbarEl, { y: '0%', duration: 0.4 })
  },
  onUpdate: (self) => {
    progressBarEl.style.transform = `scaleX(${self.progress})`
 
    if (self.progress >= 1 && !isTransitioning) {
      isTransitioning = true
      gsap.timeline()
        .to(progressBarEl, { scaleX: 1, duration: 0 })
        .to(footerContentEl, { opacity: 0, duration: 0.3 })
        .add(() => { window.location.href = nextProjectUrl })
    }
  }
})
```
 
---
 
### PATTERN 18 — GSAP Overlay Navigation Menu
*Used in: fullscreen overlay menus with clip-path reveal + staggered links*
 
```jsx
const tlRef = useRef(null)
const [isOpen, setIsOpen] = useState(false)
 
useGSAP(() => {
  gsap.set('.menu-link', { y: '110%' })
 
  tlRef.current = gsap.timeline({ paused: true })
    .to('.menu-overlay', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      // Start value in CSS: clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
      duration: 0.8, ease: 'power4.inOut',
    })
    .to('.menu-link', {
      y: '0%', stagger: 0.08, duration: 0.5, ease: 'power3.out',
    }, '-=0.4')
}, { scope: container })
 
useEffect(() => {
  if (isOpen) tlRef.current.play()
  else tlRef.current.reverse()
}, [isOpen])
```

---

### PATTERN 19 — Infinite SVG Text Path Loops
*Used in: continuous scrolling text paths*

To animate text continuously along an SVG path, map the text using the native `<textPath>` element and shift the `startOffset` coordinate continuously.

```xml
<svg viewBox="0 0 1000 500">
  <path id="loop-path" d="M100,250 C300,50 700,450 900,250" fill="none" />
  <text>
    <textPath href="#loop-path" startOffset="0%" class="loop-text-path">
      INFINITE TEXT SCROLLING ALONG A PATH • INFINITE TEXT SCROLLING ALONG A PATH • 
    </textPath>
  </text>
</svg>
```

```javascript
function initInfiniteTextPathLoop(textPathSelector) {
  const textPaths = document.querySelectorAll(textPathSelector);
  
  textPaths.forEach((textPath) => {
    gsap.to(textPath, {
      attr: { startOffset: '100%' },
      duration: 12,
      ease: 'none',
      repeat: -1
    });
  });
}
```

---

### PATTERN 20 — Dynamic Bottom Pinning for Tall Content Sections
*Used in: pinning content layouts where elements are taller than viewport height*

```
VIEWPORT        TALL SECTION STATE
+----------+    +-----------------------+ ← Section Top (hits top of screen)
|          |    |                       |
|          |    | [Scrollable Content]  | (User reads this section first)
|          |    |                       |
+----------+    |                       | ← Section Bottom (pins when this hits viewport bottom)
                +-----------------------+
```

To handle this, set the pin trigger to lock **only when the bottom of the section aligns with the bottom of the viewport**. This allows the content to scroll naturally until it is fully visible, pinning only at the end.

```javascript
ScrollTrigger.create({
  trigger: ".tall-content-section",
  pin: true,
  pinSpacing: false,
  start: "bottom bottom", // Pins only when the bottom of the element is visible
  end: "bottom top"       // Releases when the element scrolls completely out of view
});
```
 
---
 
## SECTION 5 — Critical Gotchas & Troubleshooting
 
| Mistake | Symptom | Fix |
|---------|---------|-----|
| **Forgot `'use client'`** | "document is not defined", blank component | Add as line 1 |
| **`useEffect` instead of `useGSAP`** | Double animation in development mode | Switch to `useGSAP` |
| **No `scope` on `useGSAP`** | Selectors target elements outside the component | Add `{ scope: containerRef }` |
| **Registered plugin inside component** | Intermittent errors on component update/re-render | Register at the module level |
| **Used `ease` on scrubbed tween** | Animation "drifts" past scroll | Use `ease: 'none'` |
| **No `pinSpacing: false` on stacked cards** | Blank spaces between pinned sections | Add `pinSpacing: false` |
| **Animated the pinned element directly** | Element jumps/glitches after un-pinning | Animate an inner wrapper only (Rule 7) |
| **Lenis not synced to GSAP ticker** | ScrollTrigger lags behind smooth scroll | Add ticker sync + `lagSmoothing(0)` |
| **SplitText not reverted in cleanup** | DOM accumulates extra span tags on state change | Call `split.revert()` in cleanup |
| **View transition — new page behind old** | Layout appears broken during route change | Add `::view-transition-*` CSS overrides |
| **SVG stroke enter goes backwards** | Stroke rewinds on enter transition | Use negative dashoffset values |
| **`forwardRef` missing on child card** | Refs array contains null values | Wrap child component in `forwardRef` |
| **ReactPlayer causes CSP errors** | Console: "Refused to load script" | `dynamic(() => import('react-player'), { ssr: false })` |
| **Three.js used without `'use client'`** | SSR attempts to reference WebGL context | Add `'use client'` + check `typeof window !== 'undefined'` |
| **No cleanup on ticker** | Callbacks stack up after route changes | `gsap.ticker.remove(fn)` in cleanup |
| **No cleanup on resize listener** | Memory leaks, layout calculations broken | `window.removeEventListener` in cleanup |
| **`gsap.utils.toArray` not used** | NodeList does not have map/forEach array methods | Wrap: `gsap.utils.toArray('.class')` |
| **Wide rows cause horizontal scroll** | Screen container breaks viewport | Add `overflow: hidden` on section wrapper |
| **Text splitting breaks indent** | Multi-line layouts lose designed text indent | Apply computed indent to first line wrapper (Rule 9) |
| **Lerp updates run indefinitely** | High CPU overhead in static states | Implement precision distance cutoff to cancel RAF |
 
---
 
## SECTION 6 — ScrollTrigger Start/End Syntax Reference
 
```
"top top"       → element's top edge hits viewport's top
"top bottom"    → element's top edge hits viewport's bottom
"bottom top"    → element's bottom edge hits viewport's top
"bottom bottom" → element's bottom edge hits viewport's bottom
"top 30%"       → element's top hits 30% from top of viewport
"top 80%"       → element's top hits 80% from top (common for 'enter' triggers)
"center center" → element's center hits viewport center
"+=${n}"        → n pixels past the start point (for custom scroll distance)
```
 
*   `scrub: true` — animation progress is mapped directly to scroll progress (1:1)
*   `scrub: 0.5`  — 0.5-second lag between scroll and animation (smooth interpolation)
*   `scrub: 1`    — 1-second lag (slow, heavy smoothing)
 
*   `pin: true` + `pinSpacing: true`  → adds padding equal to pinned scroll distance
*   `pin: true` + `pinSpacing: false` → no padding added; next section overlaps pinned section
 
---
 
## SECTION 7 — Core CSS Patterns Always Needed
 
```css
/* 1. Reset */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
 
/* 2. Images fill containers */
img { width: 100%; height: 100%; object-fit: cover; display: block; }
 
/* 3. Hidden scrollbar */
html { scrollbar-width: none; }
::-webkit-scrollbar { display: none; }
 
/* 4. Full-viewport section */
section {
  width: 100%; min-height: 100vh;
  position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
 
/* 5. Fixed overlay (for transitions, menus) */
.overlay {
  position: fixed; inset: 0;
  z-index: 9999; pointer-events: none; overflow: hidden;
}
 
/* 6. Smooth GPU-accelerated transforms */
.animated { will-change: transform; }
 
/* 7. 3D context */
.three-d-parent { transform-style: preserve-3d; perspective: 1000px; }
.three-d-child  { backface-visibility: hidden; }
 
/* 8. SplitText clip mask */
.line { display: block; overflow: hidden; }
.char { display: inline-block; }
 
/* 9. Image parallax wrapper */
.parallax-wrap { overflow: hidden; position: relative; }
.parallax-wrap img { transform: scale(1.2); will-change: transform; }

/* 10. View Transitions API layout overrides */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none !important;
  mix-blend-mode: normal !important;
}
::view-transition-image-pair(root) {
  isolation: isolate;
  will-change: clip-path, transform;
}
::view-transition-new(root) {
  z-index: 10000;
}
::view-transition-old(root) {
  z-index: 1;
}
```
 
---
 
## SECTION 8 — Package Quick Reference
 
| Package | Import | When |
|---------|--------|------|
| `gsap` | `import gsap from 'gsap'` | Always |
| `gsap/ScrollTrigger` | `import { ScrollTrigger } from 'gsap/ScrollTrigger'` | Scroll animations |
| `gsap/SplitText` | `import { SplitText } from 'gsap/SplitText'` | Text splitting |
| `gsap/MotionPathPlugin` | `import { MotionPathPlugin } from 'gsap/MotionPathPlugin'` | SVG path motion |
| `@gsap/react` | `import { useGSAP } from '@gsap/react'` | Any React component |
| `lenis/react` | `import ReactLenis from 'lenis/react'` | Smooth scroll wrapper |
| `lenis/react` | `import { useLenis } from 'lenis/react'` | Per-scroll-event hook |
| `next-transition-router` | `import { TransitionRouter } from 'next-transition-router'` | Block/SVG transitions |
| `next-view-transitions` | `import { ViewTransitions } from 'next-view-transitions'` | View Transition API |
| `framer-motion` | `import { motion, AnimatePresence } from 'framer-motion'` | Pages router only |
| `three` | `import * as THREE from 'three'` | 3D scenes |
| `three/examples/jsm/controls/OrbitControls` | `import { OrbitControls } from '...'` | 3D interaction |
| `react-player` | `dynamic(() => import('react-player'), { ssr: false })` | Video embeds |
 
---
 
## SECTION 9 — Project Scaffold Checklist
 
```
[ ] npx create-next-app@latest — No TypeScript, No Tailwind, YES App Router
[ ] Delete default css and page boilerplate code
[ ] npm install gsap @gsap/react lenis
[ ] Install optional animation dependencies
[ ] Add 'use client' to layout.jsx + wrap with <ReactLenis root>
[ ] Place media assets inside /public/assets/
[ ] Add 'use client' as line 1 in all client animation files
[ ] Register GSAP plugins outside the component context
[ ] Scope selection selectors in useGSAP hook initialization
[ ] Apply forwardRef on parent-targeted child elements
[ ] Connect manual tickers with Lenis Raf loops
[ ] Build cleanups for GSAP tickers, window resize hooks, and SplitText instances
[ ] Verify layout calculations remain aligned when changing viewports
```