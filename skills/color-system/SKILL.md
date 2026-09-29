---
name: color-system
description: >-
  Builds a product color system: OKLCH ramps, tinted neutrals, semantic roles,
  status colors, contrast targets (WCAG and APCA) chosen by measurement, a dark
  mode designed on its own terms, and a validation script. Use for "color
  palette", "color system", "our colors fail contrast", "pick a brand color
  scale", "dark mode colors look wrong", "status colors", "OKLCH", or "which
  shade should this be". Not for naming and wiring tokens into CSS and Figma;
  use design-tokens. Not for brand color strategy; use brand-identity.
---

# Color System

A color system decides what color is for, then builds ramps that make those jobs
easy to do accessibly in every mode. The standard: every foreground/background
pair the product uses has a measured contrast, written next to the choice; color
never carries decoration the user has to decode; and dark mode is a second
design, not an inverted first one. The output is a set of ramps, a role-to-step
mapping per mode, a contrast report, and a script that reruns the report.

## When to use

- Building or rebuilding a palette, or adding a brand hue to a system
- Contrast failures in an audit, or status colors that look muddy or neon
- Dark mode was produced by inverting light mode and looks wrong
- Choosing which step of a ramp a role should use
- Charts need a palette that works with the UI colors

**Not for:** naming, tiering and exporting tokens (use `design-tokens`), brand
strategy and logo color (use `brand-identity`), a full accessibility audit (use
`accessibility-review`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Existing colors**: read the token source and grep for literals first
  (see `design-system-audit`). [none]
- **Brand hue(s)**: [none; start achromatic and add a hue only if a brand needs one]
- **Modes**: [light and dark]
- **Contrast standard**: [WCAG 2.2 AA as the gate, APCA as a second opinion]
- **Figma library**: if the Figma MCP is connected, `get_variable_defs` on a
  component sheet shows the colors in use. If not, work from code.
- **Data visualization needs**: [up to 5 categorical series]

If the project has no system and the stack is React + Tailwind, start from Fibo's
roles (`pnpm dlx shadcn@latest add @fibo/button`, then copy the `:root` and
`.dark` blocks from its `globals.css`) and change hues and steps from there.

## Process

1. **Decide what color is for.** Write one sentence per job: brand recognition,
   primary action, status, selection, data. Everything else is neutral. Output:
   a short list of color jobs; anything not on it stays grey.
2. **Pick or build ramps in OKLCH.** Use Tailwind v4's ramps or Radix's 12-step
   scales before building your own; they are tested. Read
   [`references/ramps.md`](references/ramps.md) before building a custom ramp.
   Output: one neutral ramp and one ramp per color job.
3. **Tint the neutral (optional).** A neutral with 0.003–0.02 chroma toward the
   brand hue makes greys feel related to the brand. Output: the neutral ramp.
4. **Map roles to steps, per mode.** Model: Fibo's `:root` and `.dark` blocks in
   `globals.css`; copy that shape. Output: a table of role, light step, dark step.
5. **Measure every pair.** Run
   [`references/validate-contrast.mjs`](references/validate-contrast.mjs) with the
   project's roles. Output: the contrast report.
6. **Move steps until pairs pass, and record why.** If a status fill fails at 600,
   try 700; write the measured numbers in a comment beside the token. Output:
   the adjusted mapping with the measurements in comments.
7. **Design dark mode separately.** Re-pick steps for dark surfaces rather than
   mirroring the light scale. Output: the dark column, measured.
8. **Record known gaps.** Any pair that stays under target is listed, with
   where it is used and why it is accepted. Pin the list in a test so a new gap
   cannot slip in. Output: the gap list, and a test.

## Standards

### Contrast targets

| Pair | WCAG 2.2 | APCA Lc |
| --- | --- | --- |
| Body text (under 18px regular / 14px bold) | 4.5:1 | 75 minimum, 90 preferred |
| Large text (24px+ regular, 18.66px+ bold) | 3:1 | 60 |
| UI component boundaries, focus rings, icons that carry meaning | 3:1 | 45 |
| Placeholder text | 4.5:1 (it is text) | 60 |
| Disabled controls | exempt | exempt, but keep 2:1 so it reads as present |
| Decorative dividers | exempt | 15+ to be visible |

Use WCAG as the pass/fail gate, because it is the legal standard. Report APCA
beside it: WCAG 2 overstates contrast for light text on dark backgrounds. Fibo's
dark `muted-foreground` (neutral-400 on neutral-950) measures 7.63:1 in WCAG but
only Lc 51 in APCA, below the Lc 60 a secondary text role should reach.

### Ramps

- Build in OKLCH. Equal steps in L look like equal steps; HSL's "50% lightness"
  yellow and blue differ wildly in perceived lightness.
- **Tailwind model:** 11 steps, 50–950. Light-mode text usually 600–900, fills
  500–700, tints 50–100. **Radix model:** 12 steps with fixed jobs (1–2
  backgrounds, 3–5 component fills, 6–8 borders, 9–10 solid fills, 11–12 text).
  Choose one model per system.
- Chroma peaks mid-ramp and falls at both ends. Forcing high chroma at L 0.97 or
  L 0.2 pushes colors out of sRGB; the browser will clip them.
- Hue drifts slightly along a good ramp (yellows warm toward orange as they
  darken). Tailwind's ramps already do this; do not flatten it.

### Achromatic by default

Start with no brand hue: neutral `primary`, and color only on status, selection
and data. A restrained base makes a red error unmissable. Add a brand hue when
the brand needs recognition in the product, and give it one job (usually
`primary`), not five.

### Status colors

- Four roles: destructive, success, warning, info. Each gets a solid fill, a
  foreground for that fill, and a tint (`-subtle`) for backgrounds and badges.
- Never signal status by color alone: pair it with an icon or text (WCAG 1.4.1).
- Warning (amber/yellow) is the hardest: it needs a dark step for text and fills
  in light mode, or dark text on a light fill.

### Tints with color-mix

```css
--success-subtle: color-mix(in oklch, var(--color-green-700) 8%, transparent);
```

Mix in `oklch` to keep hue stable. Use 6–10% alpha on light surfaces and 15–25%
on dark ones: the same alpha reads much weaker on a dark page. Measure text on
the tint after compositing it over the page, not against the tint's base color.

### Dark mode

- Page at L 0.13–0.18, not pure black; cards and popovers one step lighter
  (elevation reads as lightness, since shadows vanish).
- Text at L 0.93–0.985, not pure white, to reduce halation.
- Status steps move lighter (Tailwind 300–400) with dark text on solid fills.
- Borders become translucent white (`oklch(1 0 0 / 10%)`) so they work on any
  surface depth.
- Saturated fills look more intense on dark; reduce chroma 10–20% if they glare.

### Data visualization

- Categorical: up to 5–7 hues, distinct in lightness as well as hue so they
  survive grayscale and color-vision deficiency. Check with a CVD simulator.
- Sequential: one hue, light to dark. Diverging: two hues meeting at a neutral.
- Chart colors are their own roles (`chart-1` to `chart-5`), not reused status
  colors; red in a chart must not read as an error.
- For full chart rules, load the `dataviz` skill if available.

## Worked example: Fibo

Fibo is achromatic. From
[`globals.css`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/styles/globals.css):
"there is no brand hue, so `primary` is a neutral and colour only ever carries
meaning (destructive, success, warning, info)."

It chose its status step by measurement and wrote the measurement beside it:

```css
/*
 * Status tones sit on the 700 step rather than 600: at 600, white text on a
 * solid success or warning fill measures 3.3:1, and coloured text on its own
 * subtle tint measures under 3:1. The 700 step with an 8% tint clears AA on
 * both. Dark mode stays on 400, which already clears it.
 */
```

Rerunning the numbers with the validator here (same OKLab maths as Fibo's
[`color.ts`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/lib/color.ts)):
green-600 with white text is 3.29:1, green-700 is 5.00:1, amber-700 is 5.04:1.
Success text on its 8% tint lands at 4.48:1, just under 4.5, and Fibo says so:
its [`theme.test.ts`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/lib/theme.test.ts)
asserts that the only failures in its own theme are "Muted text on a muted fill"
and "Success text on its tint", both in light mode. That is the pattern: measure,
fix what you can, and pin what you accept.

Dark mode is a separate mapping, not an inversion: page `neutral-950`, card
`neutral-900`, status on the 400 step with `neutral-950` text, tints at 20%
instead of 8%, borders `oklch(1 0 0 / 10%)`. The theme creator's `checkContrast()`
in [`theme.ts`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/lib/theme.ts)
composites translucent roles over the page before measuring, and flags a failure
beside the control that caused it.

## Output

- Ramps (OKLCH values per step) and which model they follow
- A role mapping table: role, light step, dark step, job
- The contrast report from the validator, both modes, with known gaps listed
- Measurement comments beside every non-obvious step choice in the token file

## Verify

**Checks that must pass**

- `node references/validate-contrast.mjs <project-config>.json` exits 0, or every
  failure it prints is in the known-gaps list with a reason.
- A test pins the known gaps, so a new failure fails CI. Model: Fibo's
  `theme.test.ts`. Copy that shape.
- The project's gates pass (format, lint, build, typecheck, test).

**By hand**

- Every screen in light and dark: status is legible, nothing glares, borders
  are visible on cards and on the page.
- Grayscale the screen (DevTools rendering, or a CVD simulator): status and chart
  series are still distinguishable by lightness, icon or label.
- Focus rings are visible on every surface they can appear on.

**Delegate** color literals, primitive ramps in components and opacity modifiers
to the `token-auditor` subagent ([`agents/token-auditor.md`](../../agents/token-auditor.md)),
and pair-level contrast in context to the `accessibility-auditor`
([`agents/accessibility-auditor.md`](../../agents/accessibility-auditor.md)). Both
report failures only and end in `ready` or `N blocking issues`.

## Anti-patterns

- Ramps built in HSL, so "the same step" differs in lightness across hues
- Dark mode made by inverting the light ramp (950 becomes 50) without measuring
- A brand hue used for primary, links, selection, charts and illustrations at once
- Status shown by color alone: a red border with no message or icon
- Contrast checked against the tint's base color instead of the composited result
- The same alpha tint in light and dark, so tints vanish on dark surfaces
- Neutral text on a colored fill picked by eye ("looks readable")
- Pure `#000` page with pure `#fff` text in dark mode
- Step choices with no recorded reason, so the next person moves them back

## Related skills

- **Feeds from:** `brand-identity` (brand hues), `brand-strategy`
- **Leads to:** `design-tokens` (naming and wiring), `accessibility-review`,
  `design-system-docs` (a colors foundations page)
- **Checked by:** `design-system-audit`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **OKLCH Color Picker**: building and inspecting ramps in a perceptual space.
- **Radix Colors**: the 12-step model and what each step is for.
- **Huetone** and **Leonardo**: ramps balanced to contrast targets.
- **APCA Contrast Calculator**: Lc values, and why dark mode differs.
- **Color.review**: quick pair checks with suggested fixes.
- **IBM Carbon**: data-viz palettes tested for color-vision deficiency.
- **Material 3**: dynamic color and tonal palettes.

From [`FIBO.md`](../../FIBO.md):
- **"Achromatic by default"** and **"Contrast is measured"**: the strategy and the
  700-vs-600 decision this skill uses as its example.
