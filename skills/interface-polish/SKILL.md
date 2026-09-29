---
name: interface-polish
description: >-
  Runs a craft pass that takes a working interface from "done" to "excellent":
  optical alignment, concentric radii, baselines, tabular numbers, hit areas,
  hover and focus behavior, layout shift, text wrapping, shadows, and the
  empty/loading/error states. Use for "polish this", "make it feel better",
  "something feels off", "tighten the details", "craft pass", or "it works but
  looks rough". Not for checking a build against a Figma file; use visual-qa.
  Not for structural layout problems; use layout-and-hierarchy.
---

# Interface Polish

Polish is the set of small decisions people never notice when they are right and
always feel when they are wrong: a number that jitters while it counts, a button
whose icon sits 1px low, a hover state that sticks on a phone. This skill runs a
fixed pass over a screen or component, in the browser and in code, and fixes what it
finds. The standard comes from Rauno Freiberg's Interaction Guidelines and the
work of Emil Kowalski and Paco Coursey: nothing jumps, nothing lies, nothing is
harder to hit than it looks, and every state is designed.

## When to use

- A feature is functionally complete and about to ship
- Something "feels off" and nobody can say what
- Reviewing a component before it goes into the design system
- Before recording a demo, a case study, or a launch video

**Not for:** comparing a build against a design file (use `visual-qa`), fixing
hierarchy or grid problems (use `layout-and-hierarchy`), or designing a single
interaction from scratch (use `micro-interactions`).

## Inputs

- **The running UI.** A local dev server, Storybook, or a preview URL. Polish happens
  in the browser, not in a static mock. [If only code is available, read it and mark
  every finding that still needs a live check.]
- **The code**: component files, `globals.css` or the Tailwind theme, the tokens.
- **Target devices**: [desktop pointer, iOS Safari, Android Chrome]
- **Themes**: [light and dark if the codebase defines both]
- **Scales**: radius, spacing, shadow, and color tokens. Read them before fixing
  anything, so every fix uses the scale rather than a one-off value.

If Playwright is connected, use it for screenshots at 390px and 1440px and to emulate
touch (`hasTouch: true`, which makes `hover: none` match). If not, say so and read
the code instead.

## Process

1. **Scope.** Pick one screen or one component family. A polish pass on "the whole
   app" produces a list nobody finishes. Output: the scope and the states to cover.
2. **Capture.** Screenshot every state at 390px and 1440px, in both themes. Output: a
   state grid (default, hover, focus, active, disabled, loading, empty, error, long
   content). Model: a Storybook page with one story per state, like Fibo's
   `button.stories.tsx`. Copy that shape if the component has no stories yet.
3. **Run the pass list.** Work through the ten areas below, in order, using
   [`references/polish-checklist.md`](references/polish-checklist.md). Read it before
   starting; it holds every check and its fix. Output: failures only, each with its
   area and location.
4. **Rank.** Tag each failure *felt* (a person would notice something is wrong),
   *seen* (visible on inspection), or *invisible* (only in code). Fix felt first.
   Output: an ordered fix list.
5. **Fix at the source.** Prefer fixing the shared component or token over the
   instance: one fix to `button.tsx` beats twelve fixes to twelve buttons. Model:
   Fibo's [`button.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/components/button.tsx),
   which carries focus, press, disabled, invalid, and icon spacing in the base class.
   Copy that shape. Output: a diff.
6. **Re-capture.** Same states, same widths, same themes. Output: before/after pairs
   for every felt or seen fix.

## Standards

### The ten areas

| # | Area | The rule |
| --- | --- | --- |
| 1 | Alignment | Align optically, not mathematically. Icons and play glyphs get nudged. |
| 2 | Geometry | Nested radii are concentric: `outer = inner + padding`. |
| 3 | Type | Numbers that change use `tabular-nums`. Headings `balance`, body `pretty`. |
| 4 | Targets | Hit area ≥ 44×44px on touch and ≥ 24×24px on pointer, even when the visual is smaller. |
| 5 | Hover | Hover styles only where hover exists: `@media (hover: hover)`. |
| 6 | Focus | Every interactive element shows a `:focus-visible` ring with ≥ 3:1 contrast. |
| 7 | Stability | Zero layout shift from loading, fonts, images, scrollbars, or state changes. |
| 8 | Input | Inputs ≥ 16px on iOS, with the right `type`, `inputmode`, and `autocomplete`. |
| 9 | Surface | Hairline borders, layered shadows, a deliberate `::selection`. |
| 10 | States | Empty, loading, error, and partial states exist and match the final layout. |

### Numbers worth remembering

- **Concentric radius:** a card at `rounded-2xl` (16px) with `p-2` (8px) holds an inner
  element at `rounded-lg` (8px). If padding exceeds the outer radius, use a small
  inner radius (4–6px), not zero. A single `--radius` knob with derived steps (Fibo:
  `--radius-xl: calc(var(--radius) + 4px)`) makes this arithmetic easy to keep.
- **Icon beside text:** 14px text takes a 16px icon; 16px text takes 18–20px. Center
  on the cap height, not the line box.
- **Optical nudges:** a play triangle in a circle moves right ~8–10% of its width.
  Circles and triangles need to be 5–10% larger than squares to read as the same size.
- **Leading icon in a button:** reduce that side's padding by 2–4px
  (`has-data-[icon=inline-start]:pl-2.5` on a `px-3` button).
- **Focus ring:** ≥ 3:1 against both the element and the page (WCAG 2.2, 1.4.11).
- **Hairline:** 1px at 6–12% of the foreground color, defined once as a token
  (`--border`), not a mid-gray that disappears in dark mode.
- **Skeletons:** show only if loading takes longer than ~300ms; one pulse or shimmer
  cycle per 1.5–2s; static under reduced motion.
- **Measure:** body text 45–75 characters per line (`max-w-prose` is 65ch).

### Code patterns

```css
/* Hover only where hover exists. Tailwind v4 already wraps hover: in this. */
@media (hover: hover) and (pointer: fine) {
  .row:hover { background: var(--muted); }
}

/* Numbers that update in place */
.price, .timer, .counter, td[data-numeric] { font-variant-numeric: tabular-nums; }

/* Wrapping */
h1, h2, h3 { text-wrap: balance; }
p, li { text-wrap: pretty; }

/* Hit area larger than the visual */
.icon-button { position: relative; }
.icon-button::before { content: ""; position: absolute; inset: -8px; }

/* Stop the scrollbar from shifting centered layouts */
html { scrollbar-gutter: stable; }
```

```tsx
// Concentric radius (16 = 8 + 8), token border, Fibo-style focus and press
<div className="rounded-2xl border border-border p-2">
  <button className="rounded-lg px-3 py-2 outline-none hover:bg-muted
    focus-visible:ring-[3px] focus-visible:ring-ring-subtle
    active:translate-y-px">
    Save
  </button>
</div>
```

On Tailwind v3, set `future: { hoverOnlyWhenSupported: true }` instead of hand-writing
the media query in each component. Alpha belongs in the token
(`--ring-subtle: color-mix(in oklch, var(--ring) 50%, transparent)`), not in a class
like `ring-ring/50`, so Figma and code share one name.

## Output

A findings report, failures only:

| Area | Location | Problem | Weight | Fix |
| --- | --- | --- | --- | --- |
| 3 Type | `usage-meter.tsx:42`, 390px | Percentage shifts the bar label as it counts | felt | `tabular-nums` on the value |

Then the diff (shared-component fixes separate from instance fixes), before/after
screenshots for felt and seen items, and a one-line verdict: **ready**, or **N felt
issues remaining**. Twenty felt findings is a design problem, not a polish problem;
stop and hand off to `design-critique`.

## Verify

The pass is done when:

- [ ] Every state in the grid was opened in light and dark, at 390px and 1440px
- [ ] The screen was used end to end by keyboard only: every stop visible, order
      matches reading order, Escape closes one layer at a time
- [ ] The screen was used on a touch device or touch emulation: no sticky hover,
      every target ≥ 44px
- [ ] Reload at DevTools "Slow 4G" with the Performance panel open shows CLS 0, and
      state changes (loading → loaded, empty → filled) shift nothing
- [ ] Reduced motion on: skeletons and transitions still read, nothing loops
- [ ] Zoom to 200%: no clipped text or overlapping controls
- [ ] Every counter, price, and timer uses `tabular-nums`
- [ ] No nested rounded element breaks `outer = inner + padding`
- [ ] No input below 16px at mobile widths
- [ ] Every fix uses existing tokens; the diff adds no hex values, no arbitrary pixel
      values, and no opacity modifiers on token colors
- [ ] The project's own checks pass (for Fibo-shaped repos: `pnpm lint`,
      `pnpm typecheck`, `pnpm test`)

Delegate the code-level checks: the `token-auditor` subagent for raw values and
opacity modifiers in the diff, the `accessibility-auditor` subagent for focus, names,
and target size, and the `component-reviewer` subagent when the fix touched a shared
component.

## Anti-patterns

- `transition: all` on everything, which animates layout and color you did not mean to
- The same radius on a card and the button inside it, so the corners pinch
- Spinners where a skeleton would hold the layout, or skeletons that do not match it
- `outline: none` with no replacement focus style
- A 16px icon button with a 16px hit area
- Hover-revealed actions with no touch or keyboard equivalent
- Borders in `#e5e5e5` that vanish in dark mode instead of a themed `--border` token
- One heavy `box-shadow: 0 10px 30px rgba(0,0,0,.3)` instead of layered shadows
- Numbers that change width as they tick and push their neighbors sideways
- Disabled buttons with no hint about what would enable them
- "Polish" that adds decoration: gradients, glows, and extra motion are not polish

## Related skills

- **Feeds from:** `design-to-code` (the build), `visual-qa` (fix fidelity first),
  `design-tokens` (the scales every fix uses)
- **Leads to:** `accessibility-review` (the full audit), `design-case-study`,
  `design-system-docs` (promote fixes into component guidance)
- **Neighbors:** `micro-interactions` for one state change, `motion-implementation`
  for animation timing

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Rauno Freiberg, Interaction Guidelines**: the source for most of the pass list.
  Read the interactivity, typography, and touch sections before the first pass.
- **Emil Kowalski** and **Sonner / Vaul**: what "finished" feels like in a component.
- **Paco Coursey / cmdk**: quiet precision; how little decoration a polished UI needs.
- **Design Spells**: small, specific moments worth studying.
- **Refactoring UI**: shadows, borders, and spacing stated as tactical rules.
- **Inclusive Components** and **axe DevTools**: focus, labels, and target size.
- **Polypane**: many viewports and `hover: none` side by side.

From [`FIBO.md`](../../FIBO.md): `button.tsx` as the model for carrying states in the
base class (`focus-visible:ring-[3px] ring-ring-subtle`, `active:translate-y-px`,
`has-data-[icon=inline-start]:pl-2.5`), the single `--radius` knob, alpha kept in
named `-subtle` roles, and `skeleton.tsx` (`motion-reduce:animate-none`).
