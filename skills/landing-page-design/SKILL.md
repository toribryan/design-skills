---
name: landing-page-design
description: >-
  Designs and builds a marketing or product landing page: section anatomy,
  hero rules, messaging hierarchy, conversion heuristics, performance budgets,
  and art direction, from reference hunting through a shipped page. Use for
  "landing page", "marketing site", "homepage", "hero section", "launch page",
  "waitlist page", "pricing page", or "our page doesn't convert". Not for the
  brand's visual identity itself; use brand-identity or art-direction. Not for
  in-app screens; use layout-and-hierarchy.
---

# Landing Page Design

A landing page has one job: move a specific visitor from "what is this?" to one
action. Every section either answers the next question that visitor has, or it is in
the way. This skill starts from the message, not the layout: who arrives, what they
already believe, the one thing they must understand, and the one action to take.
Then it picks sections to answer their questions in order, directs the visuals so
the page looks like the product rather than a template, and ships it fast enough that
the hero appears in under 2.5 seconds on a mid-range phone.

## When to use

- Launching a product, feature, or waitlist
- Redesigning a homepage or a page with a conversion problem
- Designing a pricing, feature, or campaign page
- Writing the section outline before anyone opens Figma

**Not for:** defining the brand's visual system (use `brand-identity` and
`art-direction`), writing the brand voice (use `brand-voice`), or in-product screens
(use `layout-and-hierarchy`).

## Inputs

- **Audience and source**: who arrives and from where (search, ad, launch post,
  referral). [Default: a skeptical, informed buyer from a launch post.]
- **The one action**: sign up, start trial, book demo, join waitlist, download.
  [If more than one is proposed, ask which one; this changes the whole page.]
- **Positioning**: category, the alternative they use today, and the difference.
  [If missing, draft one line and state it as an assumption.]
- **Proof available**: logos, numbers, testimonials, reviews, press. Real only.
- **Brand assets**: identity, type, color, voice, product screenshots or video.
- **Stack**: [Next.js, Tailwind, the project's component library; Fibo parts if the
  project has no system]

## Process

1. **Write the message first.** A one-line promise, three supporting benefits, the
   objection most likely to stop someone, and the action. Output: a message
   hierarchy on one page. Model: [`templates/page-outline.md`](templates/page-outline.md),
   sections 1–2. Copy that shape.
2. **Hunt references.** 8–12 pages from the same category and a few from outside it,
   chosen for one specific thing each (a hero, a proof strip, a pricing table).
   Sources: Godly for craft, Land-book by industry, SaaS Landing Page by section, and
   Mobbin's web sections if connected. Output: a board with one note per reference
   saying what to take. Hand off to `reference-research` for a deeper pass.
3. **Outline sections.** Pick from the anatomy below, in the order the visitor's
   questions arise. Cut anything that does not answer a question. Output: the filled
   outline with a headline and job per section.
4. **Write the copy in the outline.** Headlines and CTAs before any layout. Output:
   copy for every section. Run it past `ux-writing` or `brand-voice`.
5. **Set the art direction.** One visual idea that carries the page (a product
   close-up, a type-driven layout, an illustration system, a signature interaction).
   Output: a direction note and one hero mock. Hand off to `art-direction` if the
   brand has none.
6. **Design at two widths.** Mobile (390) and desktop (1440) for every section.
   Output: frames, or code directly for a designer who builds.
7. **Build.** Static rendering, semantic sections, the budget below. Output: a
   deployed preview.
8. **Measure and test.** Lighthouse on mobile, real-device check, analytics on the CTA.
   Output: scores and a list of experiments to run next.

## Standards

### Section anatomy

| Section | Visitor's question | Rules |
| --- | --- | --- |
| **Hero** | What is it, and is it for me? | Headline, one sentence of support, one primary CTA, product visual. |
| **Social proof** | Does anyone like me use it? | Logos or a number, directly under the hero. 4–6 logos, greyscale, same optical size. |
| **Problem** | Do they understand my situation? | The pain in the visitor's words. Short. Optional for known categories. |
| **Features as benefits** | What will it do for me? | 3–6 items. Benefit in the heading, feature in the body, product visual for each major one. |
| **How it works** | Is it hard to start? | 3 steps, numbered. The first step should look easy. |
| **Deeper proof** | Is it real? | Testimonials with name, role, company, photo. Case-study numbers. |
| **Pricing** | What does it cost? | 2–4 tiers, one highlighted, annual/monthly toggle, feature comparison below. |
| **FAQ** | What about my objection? | 5–8 real objections: price, security, migration, cancellation. |
| **Final CTA** | OK, what now? | Repeat the primary action with the promise restated. |
| **Footer** | Where else can I go? | Sitemap, legal, contact, status. Not a second landing page. |

Short pages (waitlist, launch) can be hero + proof + three benefits + CTA. Long pages
earn their length only if each section answers a new question.

### Hero rules

- Headline ≤ ~10 words. Says what it is or what it changes, not a slogan that could
  belong to any product. Test: cover the logo; could a competitor use this headline?
  If yes, rewrite.
- Subheadline one or two sentences, ≤ ~25 words, naming who it is for and how.
- **One primary CTA.** A secondary action (watch demo, see docs) is visually quieter:
  ghost or link style.
- CTA label is the outcome or action ("Start free trial", "Get early access"), not
  "Submit" or "Learn more".
- Show the product. A real screenshot or short loop beats abstract 3D art for most
  software.
- Above the fold at 390×844: headline, subheadline, and CTA visible without scrolling.
- Display type: 48–72px desktop, 36–44px mobile, line height 1.0–1.1, letter spacing
  −0.02em, `text-wrap: balance`. Use `clamp()` (Utopia) so it scales between.

### Messaging hierarchy

1. **Promise** (hero headline): the outcome.
2. **Proof** (directly below): someone credible believes it.
3. **Benefits** (features): three reasons it is true.
4. **Objections** (FAQ, pricing notes): what would stop them.
5. **Action** (CTA, repeated): the same one, every time.

Each section heading should make sense read alone, in order, as a skim path.

### Conversion heuristics

Grounded in Good UI's tested patterns; treat them as strong defaults, then test.

- One action per page. Every competing link in the hero costs clicks.
- Repeat the primary CTA after every 2–3 sections, with the same label.
- Put risk reducers next to the CTA: "No credit card", "Cancel anytime", "Free for
  teams under 5".
- Specific beats vague: "Cuts review time by 40% at Linear" beats "Loved by teams".
- Real faces and names on testimonials; anonymous quotes read as fabricated.
- Show the price, or say why not. Hidden pricing loses self-serve buyers.
- Fewer form fields: email only for waitlists; each extra field costs completions.
- Sticky header CTA on long pages, visible after the hero scrolls away.
- Remove the main navigation on paid-traffic campaign pages.

### Performance budget

| Metric | Target (mobile, p75) |
| --- | --- |
| LCP | < 2.5s (aim for < 1.8s) |
| CLS | < 0.1 (aim for 0) |
| INP | < 200ms |
| JS shipped | < 150KB compressed for a static page |
| Hero image | < 200KB, AVIF or WebP, `fetchpriority="high"`, no lazy loading |
| Fonts | ≤ 2 families, WOFF2, subset, preloaded, metric-matched fallback |

```tsx
// Hero image: sized, prioritized, responsive
<Image
  src="/hero.png" alt="Dashboard showing weekly review queue" width={1440} height={900}
  priority sizes="(min-width: 1024px) 1200px, 100vw"
  className="rounded-2xl border border-border"
/>
```

Hero video: poster image, `muted autoplay loop playsinline`, under ~2MB, and a
static image under reduced motion or `Save-Data`. Below-the-fold animation loads on
scroll. Scroll-driven effects use CSS `animation-timeline: view()` before a library.

### Art direction hooks

- One signature element people will remember (a product detail at huge scale, a
  custom illustration style, one interaction). Not five.
- Type does most of the work: a strong display face and generous size contrast
  (hero 4–6x body).
- Consistent screenshot treatment: same frame, same shadow, same background, same
  crop logic.
- Section rhythm: vary density (full-bleed visual, then a tight text section) so the
  page does not read as a stack of identical cards.
- Vertical spacing between sections 96–160px desktop, 64–96px mobile.
- Dark mode is optional for marketing pages; if supported, design both on purpose.

## Output

- The filled [`templates/page-outline.md`](templates/page-outline.md): message
  hierarchy, section list with copy, reference board, art direction, and the
  experiment backlog.
- Frames at 390 and 1440, or a deployed preview.
- A Lighthouse mobile report and a list of the three highest-value experiments.

## Verify

The page is done when:

- [ ] Cover the logo: the hero headline could not belong to a competitor
- [ ] At 390×844, headline, subheadline, and primary CTA are visible without scrolling
- [ ] There is exactly one primary CTA style on the page, with one label
- [ ] Reading only the section headings, in order, tells the story
- [ ] Every proof point is real and attributed
- [ ] Lighthouse mobile: Performance ≥ 90, LCP < 2.5s, CLS < 0.1, Accessibility 100
- [ ] Opened on a real phone on cellular, in light and dark if supported, by keyboard,
      and with reduced motion on (no autoplaying motion left)
- [ ] Every image has meaningful `alt` or `alt=""`; one `h1`; section headings in order
- [ ] CTA clicks and form submissions are tracked
- [ ] Meta title, description, and a 1200×630 Open Graph image are set

Delegate the checks: the `copy-reviewer` subagent for headlines and CTAs, the
`brand-reviewer` subagent for consistency with the identity and voice, the
`accessibility-auditor` subagent for semantics and contrast, and the `design-critic`
subagent for hierarchy. Each reports failures only and ends with a verdict.

## Anti-patterns

- A headline like "The future of work" that says nothing about the product
- Three CTAs of equal weight in the hero
- Feature lists named after internal modules instead of what the visitor gets
- A hero carousel
- Logo walls with logos at wildly different optical sizes, or logos with no permission
- Stock photos of people pointing at laptops
- A 6MB hero video, or a hero that fades in after JavaScript loads (LCP penalty)
- Scroll-jacking and parallax on every section
- Every section the same centered heading + three-card grid
- Pricing hidden behind "Contact us" for a self-serve product
- A footer that repeats the whole page

## Related skills

- **Feeds from:** `brand-strategy` (positioning), `brand-voice` (tone),
  `reference-research` (the board), `art-direction` (the visual idea),
  `brand-identity` (assets)
- **Leads to:** `ux-writing` (copy review), `design-to-code` (the build),
  `motion-implementation` (scroll and hero motion), `visual-qa`, `interface-polish`,
  `design-case-study`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Godly** and **Awwwards**: craft and art direction; look for one idea per page.
- **Land-book** and **Lapa Ninja**: pages by industry; compare how competitors open.
- **SaaS Landing Page**: browse by section (pricing, FAQ, testimonials) for patterns.
- **Navbar Gallery** and **Footer.design**: navigation and footer patterns only.
- **Good UI**: A/B-tested conversion patterns behind the heuristics above.
- **Mobbin**: web marketing sections, if the MCP is connected.
- **Utopia**: fluid display type with `clamp()`.
- **Fontshare** and **Fonts In Use**: display faces and how brands pair them.
- **Squoosh**: hero image compression and format comparison.
- **Vercel**: preview deploys and Speed Insights for real-user LCP.

From [`FIBO.md`](../../FIBO.md): installing Fibo parts (`button`, `input`, `badge`)
for the form and CTA when the project has no system, and the achromatic-by-default
principle as a reminder that color on a landing page should carry meaning, not fill.
