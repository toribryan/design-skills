---
name: motion-language
description: >-
  Defines a product's motion language: principles, duration and easing tokens,
  choreography rules, and reduced-motion behavior, documented so designers and
  engineers animate the same way. Use for "motion system", "motion tokens",
  "animation guidelines", "easing curves", "our animations feel inconsistent",
  or "how should things move in our brand". Not for building a single animation
  in code; use motion-implementation for that.
---

# Motion Language

Motion is part of the interface's vocabulary, the same as color and type. A motion
language decides what movement means in this product, then encodes it as tokens and
rules so every transition says the same thing. The output is a short spec that a
designer can prototype from and an engineer can implement without guessing.

## When to use

- Starting a design system or brand refresh that needs a motion layer
- Animations across a product feel inconsistent, slow, or decorative
- Translating brand attributes ("confident", "playful") into movement
- Defining tokens for duration, easing, and springs

**Not for:** implementing one animation (use `motion-implementation`), or designing
a single hover or toggle state (use `micro-interactions`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Brand attributes**, 3–5 adjectives [infer from the product's tone; state the guess]
- **Product type**: productivity tool, consumer app, marketing site [productivity]
- **Platforms**: web, iOS, Android [web]
- **Existing motion**: record or list current animations, if any
- **Stack**: CSS only, Motion, GSAP, native [CSS + Motion]

## Process

1. **Audit what exists.** List every animation in the product: trigger, property,
   duration, easing. In code, grep for `transition`, `animation`, `motion.`, and
   `gsap.`. Output: a table, with inconsistencies highlighted.
2. **Write 3–4 principles.** Each principle is a behavior, not a feeling.
   "Elements enter from where they came from" beats "motion is delightful".
   Output: principles with a do/don't pair each.
3. **Place the product on two axes.** *Productive ↔ expressive* (how noticeable
   motion may be) and *mechanical ↔ organic* (tween curves vs. springs).
   Most tools sit productive and slightly organic. Output: a one-line positioning.
4. **Define duration tokens.** Start from the scale below and adjust at most one step
   in either direction for brand. Output: token table.
5. **Define easing tokens.** Three to five curves, each with a named job. Output: token
   table with cubic-bezier values and spring equivalents.
6. **Write choreography rules.** Stagger, sequencing, what moves first, direction
   conventions, and shared-element continuity. Output: rules list.
7. **Define reduced-motion behavior.** For each pattern, state what it becomes under
   `prefers-reduced-motion: reduce`. Output: a mapping table.
8. **Map to patterns.** Apply the tokens to the product's top 8–12 patterns
   (dialog, toast, dropdown, page transition, tab switch, list insert). Output: a
   pattern table anyone can implement from.
9. **Decide where motion is allowed at all.** Follow Fibo's two-shelf rule: standard
   parts get only short state transitions and no animation library; expressive,
   single-purpose parts may bring `motion`, and continuous animation stays off
   unless it is the point of the part. Output: one line per component tier.

Model for the whole deliverable: [`templates/motion-spec.md`](templates/motion-spec.md).
Copy that shape.

## Standards

### Duration scale

| Token | Value | Use |
| --- | --- | --- |
| `duration-instant` | 0–50ms | Color and opacity feedback on press |
| `duration-fast` | 100–150ms | Hover, focus rings, small toggles, tooltips |
| `duration-base` | 200–250ms | Dropdowns, popovers, most UI transitions |
| `duration-moderate` | 300–350ms | Dialogs, drawers, larger surface changes |
| `duration-slow` | 400–500ms | Page-level and shared-element transitions |
| `duration-expressive` | 600ms+ | Marketing and onboarding only, never in a repeated task |

Rules of thumb:
- Anything a person triggers more than a few times a minute stays at or under 200ms.
- Larger distance and surface area earn more time, not less.
- Exits are about 20–30% faster than entrances. Leaving should get out of the way.
- Keyboard-initiated actions (command menus, shortcuts) often want no animation at all.

### Easing

| Token | Curve | Job |
| --- | --- | --- |
| `ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances and anything responding to input. The default. |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Things already on screen moving to a new place. |
| `ease-in` | `cubic-bezier(0.55, 0, 1, 0.45)` | Exits only, and only when short. |
| `linear` | `linear` | Progress, spinners, marquee. Never for spatial movement. |
| `spring-snappy` | stiffness 400, damping 30 | Direct manipulation, toggles, drag release. |
| `spring-gentle` | stiffness 170, damping 26 | Layout shifts and shared-element transitions. |

Never use the browser's default `ease` for spatial motion. It starts slow, which reads
as lag. Read [`references/easing.md`](references/easing.md) before adjusting curves or
converting springs to CSS.

### Properties

- Animate `transform` and `opacity`. Avoid animating `width`, `height`, `top`, `left`,
  or `box-shadow` on large surfaces; they force layout or paint.
- Scale entrances from 0.95–0.98, never from 0. Nothing in the physical world
  appears from a point.
- Set `transform-origin` to the trigger (a dropdown grows from its button).
- Travel distance for enter/exit is 4–16px for UI. Larger feels like a page, not a panel.

### Choreography

- Stagger lists at 20–40ms per item, and cap the total at ~300ms. Beyond 8–10 items,
  animate the container, not each row.
- Parent before child: the surface arrives, then its content.
- One focal movement at a time. If two things move, one of them leads.
- Direction has meaning: forward navigation moves left, back moves right; things that
  come from the top go back to the top.

### Reduced motion

Honor `prefers-reduced-motion: reduce` everywhere. Replace spatial motion with a
short opacity crossfade (≤150ms). Keep motion that carries meaning (a progress bar
filling) and remove motion that decorates (parallax, auto-playing loops).

## Output

A motion spec using [`templates/motion-spec.md`](templates/motion-spec.md), plus the
tokens in the project's token format (CSS custom properties or DTCG JSON), e.g.:

```css
:root {
  --duration-fast: 150ms;
  --duration-base: 220ms;
  --duration-moderate: 320ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}
@media (prefers-reduced-motion: reduce) {
  :root { --duration-base: 0ms; --duration-moderate: 0ms; }
}
```

## Verify

The spec is done when:

- [ ] Every principle can be checked by watching a screen recording
- [ ] Duration and easing tokens each have a named job, no orphans
- [ ] No token below 100ms for spatial motion, none above 500ms in task flows
- [ ] Every pattern in the map uses only defined tokens
- [ ] Reduced-motion behavior is specified for every pattern, not just "disable"
- [ ] Exit timings are shorter than entrance timings
- [ ] Tokens exist in code, not only in the doc
- [ ] Three patterns from the map have been built and watched side by side at
      normal speed and at 0.25x (browser devtools animation panel), with reduced
      motion on and off

Delegate the code check to the `token-auditor` subagent: it reports any
`transition` or `animation` that uses a raw duration or easing instead of a token.

## Anti-patterns

- Principles written as adjectives ("fluid", "delightful") with no behavior behind them
- One global `transition: all 0.3s ease` applied to everything
- Animating on every hover in a dense table
- Bounce and overshoot in a finance or healthcare tool
- Loading skeletons that shimmer faster than 1s per cycle (reads as anxious)
- Motion used to hide slow responses instead of fixing them

## Related skills

- **Feeds from:** `brand-strategy` (attributes), `design-tokens` (token format)
- **Leads to:** `motion-implementation`, `micro-interactions`, `design-system-docs`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Material 3 motion** and **IBM Carbon motion**: published duration and easing specs.
  Carbon's productive/expressive split is the model for step 3.
- **Emil Kowalski / animations.dev** and **Sonner / Vaul**: how restrained, physical UI
  motion feels in practice.
- **Rauno Freiberg, Interaction Guidelines**: when not to animate.
- **Easing Wizard** and **easings.net**: tuning and comparing curves.
- **Motion** docs: spring parameters and layout animation.

From [`FIBO.md`](../../FIBO.md): the two-shelf rule (base parts stay still, special
parts may move), `active:translate-y-px` press feedback on buttons, and the
indeterminate progress animation defined as a token in `globals.css`
(`--animate-progress-indeterminate`, 1.4s ease-in-out).
