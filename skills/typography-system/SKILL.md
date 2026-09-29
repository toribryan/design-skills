---
name: typography-system
description: >-
  Builds a product's type system: typeface choice, a modular or fixed scale,
  fluid sizes with clamp(), line-height and letter-spacing per size, measure,
  font loading, and named type roles as tokens. Use for "type scale", "font
  sizes are all over the place", "pick a font", "fluid typography", "line
  height", "text styles in Figma", "fonts load with a flash", or "typography
  tokens". Not for the brand's typeface as identity; use brand-identity. Not
  for editorial layout of one page; use layout-and-hierarchy.
---

# Typography System

A type system is a short list of named roles (body, label, heading levels, code),
each a fixed combination of family, size, line height, weight and tracking, that
every screen draws from. The standard: a product uses 6–9 sizes, not 23; every
size has a line height and tracking chosen for that size; text measures 45–75
characters; fonts load without layout shift; and the same role names exist as
text styles in Figma and as utilities or tokens in code.

## When to use

- Starting a design system, or a codebase has a dozen near-identical font sizes
- Choosing or replacing the product's typefaces
- Headings look cramped on desktop or huge on mobile
- Fonts flash, swap visibly, or shift layout on load
- Figma text styles and code sizes disagree

**Not for:** choosing a typeface as part of a brand identity (use
`brand-identity`), hierarchy on one screen (use `layout-and-hierarchy`), or copy
(use `ux-writing`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Current sizes in use**: grep for them (see `design-system-audit`). [none]
- **Product type**: [dense product UI; marketing pages are a separate, larger scale]
- **Brand typefaces**: [none; use a neutral grotesque with a matching mono]
- **Languages and scripts**: [Latin only. CJK, Arabic or Devanagari change the choice]
- **Stack**: [Tailwind v4, where the default scale may already be enough]
- **Figma text styles**: read with the Figma MCP if connected (`get_design_context`
  on a type specimen frame); otherwise from code.

If the project has no system and uses React + Tailwind, start from Fibo (Geist,
Geist Mono and Tailwind's own scale) via `pnpm dlx shadcn@latest add @fibo/<name>`
and change the families before touching the scale.

## Process

1. **Inventory.** List every distinct font size, weight, line height and
   letter-spacing in use, with counts. Output: a frequency table; anything used
   fewer than 3 times is a candidate for removal.
2. **Choose typefaces.** One sans for UI, one mono for code and numbers-heavy
   data; a display face only for marketing. Check the criteria below. Output:
   families with the weights and axes to load.
3. **Pick the scale.** Product UI: adopt Tailwind's fixed scale or a 1.125–1.2
   ratio. Marketing and editorial: 1.25–1.333, fluid. Read
   [`references/scales.md`](references/scales.md) for precomputed steps and clamp
   values. Output: the size list.
4. **Set line height and tracking per size.** Use the table in Standards.
   Output: a size / line-height / tracking table. Model: Fibo's
   `typography.stories.tsx` spec column (`14 / 20`); copy that shape.
5. **Define roles.** Name by job: `body`, `body-sm`, `label`, `caption`,
   `heading-1` to `heading-4`, `display`, `code`. Output: a role table mapping
   each role to size, line height, weight and tracking.
6. **Make it fluid where it helps.** Headings and display only; body text stays
   fixed in product UI. Output: `clamp()` values.
7. **Load fonts.** Self-host WOFF2, preload the one or two files used above the
   fold, and match fallback metrics. Output: the `@font-face` and preload tags.
8. **Ship as tokens and styles.** CSS variables or utilities in code; text styles
   with the same names in Figma. Output: token file, Figma styles, a specimen page.

## Standards

### Choosing a typeface for UI

- Large x-height (around 0.5–0.55 of the em) for legibility at 12–14px.
- Distinct `I l 1` and `O 0`. Test the string `Il1 O0 rn m` at 13px.
- Tabular figures available (`font-variant-numeric: tabular-nums`) for tables,
  prices and timers.
- A variable font or at least 400, 500, 600 and 700.
- Coverage for every language the product ships in.
- A mono with matching x-height and weight for code, IDs and token values.
- Limit to two families and 3–4 weights. Each extra file costs 20–50KB.

### Scale

| Ratio | Name | Use |
| --- | --- | --- |
| 1.125 | Major second | Dense tools, data tables |
| 1.2 | Minor third | Product UI default |
| 1.25 | Major third | Content sites, docs |
| 1.333 | Perfect fourth | Marketing, editorial |
| 1.5+ | Perfect fifth and up | Display only; too few usable steps for UI |

- Product UI: 6–9 sizes total. Over 10 means sizes are being chosen per screen.
- Tailwind's default scale (12, 14, 16, 18, 20, 24, 30, 36, 48...) is not a pure
  ratio, and that is fine: it is tuned by hand and familiar to engineers.
- Round to whole pixels (or to 0.125rem) so Figma and code match.
- Minimum 12px for any text a person must read; 16px for inputs on mobile, or
  iOS Safari zooms on focus.

### Line height per size

| Size | Line height | Ratio |
| --- | --- | --- |
| 12px | 16px | 1.33 |
| 14px | 20px | 1.43 |
| 16px (body) | 24px | 1.5 |
| 18px | 28px | 1.55 |
| 20–24px | 28–32px | 1.33–1.4 |
| 30–36px | 36–40px | 1.1–1.2 |
| 48px+ | 1.0–1.1 × size | 1.0–1.1 |

Long-form reading text can go to 1.6–1.7. Snap line heights to a 4px grid in
product UI, so text boxes align with spacing.

### Letter-spacing

- Body sizes (12–18px): 0. Most UI faces are spaced for these sizes.
- Headings 24–36px: -0.01em to -0.02em.
- Display 48px+: -0.02em to -0.04em.
- All-caps labels and overlines: +0.04em to +0.08em, and at least 11px.
- Mono: 0. Never track code.

### Measure

45–75 characters per line; 66 is the classic target. `max-width: 65ch` on text
containers. Wider than 90 characters, people lose their place on the return sweep.

### Fluid type

Interpolate between a minimum and maximum size across a viewport range, in rem
plus vw so browser zoom still works:

```css
/* 30px at 360px viewport, 48px at 1240px */
--text-display: clamp(1.875rem, 1.4148rem + 2.0455vw, 3rem);
```

- Keep the maximum at most 2.5 times the minimum, or text may fail WCAG 1.4.4
  (resize to 200%) at some zoom levels.
- Fluid headings, fixed body. A 16px body that grows to 18px on desktop is a
  marketing choice, not a product one.
- Utopia generates a whole fluid scale from two ratios; see `references/scales.md`.

### Font loading

- Self-host WOFF2 (Fontsource packages make this an `npm install`), or use a
  framework loader that does. Third-party font CDNs add a connection per page load.
- `font-display: swap` for body text so text shows immediately; `optional` for
  display faces where a fallback is acceptable on slow loads.
- Preload only the 1–2 files used above the fold:
  `<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>`.
- Match fallback metrics with `size-adjust`, `ascent-override` and
  `descent-override` on a local fallback `@font-face`, so the swap causes zero
  layout shift. Framework font loaders (for example `next/font`) generate these.
- Subset to the scripts the product needs.

## Worked example: Fibo

Fibo uses Tailwind's own scale so a style name maps to a utility class and to a
Figma text style of the same name. From
[`packages/ui/src/foundations/typography.stories.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/foundations/typography.stories.tsx):

```ts
/*
 * The scale is Tailwind's own, so a style name here maps straight to a utility
 * class and to a text style of the same name in the Figma library. Weight is a
 * separate axis rather than being baked into the size.
 */
const SCALE = [
  { className: "text-xs", spec: "12 / 16" },
  { className: "text-sm", spec: "14 / 20" },
  { className: "text-base", spec: "16 / 24" },
  // ... up to text-5xl, "48 / 48"
]
```

Weights are Regular 400, Medium 500, SemiBold 600 and Bold 700. Families are
tokens with system fallbacks, in
[`globals.css`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/styles/globals.css):

```css
--font-sans: Geist, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;
--font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas,
  "Liberation Mono", monospace;
```

Components use `text-sm` for most UI text. Fibo's `Input` is `text-base md:text-sm`:
16px on small screens so iOS does not zoom on focus, 14px from the `md`
breakpoint. The Storybook site loads Geist from Google Fonts with `display=swap`
and a weight range (`wght@400..700`). A product adopting Fibo should self-host
instead. The theme creator's `SANS_FONTS` list (Geist, Inter, IBM Plex Sans, DM
Sans, Manrope, System) is a reasonable shortlist of UI sans faces.

## Output

- A role table: role, family, size, line height, weight, tracking, where used
- Tokens or utilities in code, and matching Figma text styles
- `@font-face` rules, preload tags and fallback metric overrides
- A specimen page (Storybook foundation story or equivalent) that renders every role

## Verify

**Checks that must pass**

- Distinct font sizes in product code: 9 or fewer (grep from `design-system-audit`).
- No arbitrary sizes (`text-[13px]`, `font-size: 13px`) outside the token file.
- Lighthouse or the Performance panel shows CLS 0.00 attributable to font swap.
- The project's gates pass (format, lint, build, typecheck, test).

**By hand**

- Specimen page in light and dark: every role renders in the intended family and
  weight, and nothing falls back silently (check the Fonts pane in DevTools).
- Zoom to 200%: no clipped or overlapping text, fluid headings still scale.
- A long paragraph at desktop width stays under 75 characters per line.
- On an iOS device or simulator, focusing an input does not zoom the page.

**Delegate** off-scale type to the `token-auditor` subagent
([`agents/token-auditor.md`](../../agents/token-auditor.md)) and text contrast and
resize to the `accessibility-auditor`
([`agents/accessibility-auditor.md`](../../agents/accessibility-auditor.md)).

## Anti-patterns

- 14px, 14.5px and 15px all in use, each on a different screen
- Line height set once globally (`1.5`) and applied to 48px headings
- Positive tracking on body text, or tracked mono
- Fluid body text in a product UI, so table rows change height with the window
- `vw`-only font sizes that ignore browser zoom
- Four families and nine weights loaded on every page
- Font CSS from a third-party CDN with no `font-display`, causing invisible text
- Text styles in Figma named "Heading/Big" and utilities named `text-2xl`, with no map
- Line lengths of 120+ characters in settings pages and docs

## Related skills

- **Feeds from:** `brand-identity` (typefaces), `design-tokens` (token format)
- **Leads to:** `layout-and-hierarchy`, `design-to-code`, `design-system-docs`
  (a typography foundations page), `interface-polish`
- **Checked by:** `design-system-audit`, `accessibility-review`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Utopia**: fluid type and space scales from two ratios and a viewport range.
- **Typescale**: previewing ratios before committing.
- **Practical Typography**: line length, line spacing and hierarchy, stated bluntly.
- **Fontsource**: self-hosting open fonts as npm packages.
- **Wakamai Fondue**: checking a font's axes, features (tabular figures) and coverage.
- **Fonts In Use** and **Fontshare**: typefaces in real products; free commercial faces.
- **Vercel Geist**: the typeface and scale Fibo uses, documented by its makers.

From [`FIBO.md`](../../FIBO.md):
- **Tokens** (the type line): Geist and Geist Mono with system fallbacks, and
  Tailwind's scale kept one to one with Figma text styles.
