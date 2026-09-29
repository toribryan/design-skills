---
name: layout-and-hierarchy
description: >-
  Sets a screen's grid, spacing, grouping, alignment, and visual hierarchy so the most
  important thing reads first and related things read together, at every breakpoint.
  Use for "fix the layout", "this feels cluttered", "spacing is off", "nothing stands
  out", "set up a grid", "spacing scale", "make it responsive", or "density". Not for
  choosing between structurally different concepts (use wireframing) or final pixel
  detail and states (use interface-polish).
---

# Layout and Hierarchy

Layout decides where the eye goes and what belongs together. A good layout has one
obvious starting point, groups that read as units, and a spacing system that forms
those groups without borders or boxes. The output is a layout spec (grid,
spacing scale, content widths, breakpoints, density) and a hierarchy pass on the
target screens, with each change tied to a rule someone else can check.

## When to use

- A chosen wireframe direction needs to become a real layout
- A screen feels cluttered, flat, or "off" and nobody can say why
- Spacing values are arbitrary (13px here, 18px there) and need a scale
- Setting up the grid and breakpoints for a new product or system
- Adding a compact or comfortable density mode to a data-heavy product

**Not for:** exploring structurally different concepts (use `wireframing`), defining
the type scale (use `typography-system`), encoding the spacing scale as tokens (use
`design-tokens`), or final detailing of states, radii, and shadows (use
`interface-polish`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Target screens**: Figma frames, screenshots, or a live URL [ask for the one
  screen that matters most]
- **Primary action and primary content** per screen [infer from the brief; state it]
- **Existing spacing and grid tokens** [read the codebase: Tailwind config, CSS
  custom properties, token JSON; if none and the stack is React + Tailwind, start
  from Fibo's; otherwise the 4/8 scale below]
- **Type scale** [`typography-system` output; otherwise a 1.25 ratio from 16px]
- **Product type and density need**: marketing, consumer app, data tool [consumer
  app, comfortable density]
- **Viewports** [390, 768, 1280, 1440]

## Process

1. **Name the hierarchy before touching pixels.** For each screen, rank what should be
   seen 1st, 2nd, 3rd, and what stays quiet until needed. At most three emphasized
   levels. Output: a ranked list per screen.
2. **Squint test the current state.** Blur the screenshot (or view it at 25%) and note
   what reads first. Compare to the ranking. Output: a list of mismatches.
3. **Set the grid.** Model: the "Column grids" and "App shells" tables in
   [`references/spacing-and-grids.md`](references/spacing-and-grids.md). Copy that
   shape, changing only what the product needs. Output: a grid table.
4. **Set the spacing scale.** Adopt the project's tokens; if none, copy the scale table
   in the reference file. Map every gap on the screen to a step and flag off-scale
   values. Output: a spacing map.
5. **Group by proximity.** Assign each element to a group, then set spacing so space
   inside a group is clearly smaller than space between groups. Model: the
   "Proximity ratios" table. Remove borders and boxes that proximity now makes
   redundant. Output: an annotated grouping screenshot.
6. **Build hierarchy with the fewest tools.** Adjust in this order: position, size,
   weight, color and contrast, then decoration. Quiet the neighbors before making the
   primary element louder. Output: before/after with one note per change, each
   citing the rule it applies.
7. **Align everything to few edges.** Count distinct left edges per region and reduce
   them. Output: edge count before and after.
8. **Define responsive behavior.** For each region, decide what happens at each breakpoint:
   reflow, stack, collapse to a rail, move into a sheet, or scroll. Model: the "App
   shells" table (sidebar collapses below 1024, inspector becomes a sheet below 1280).
   Output: a breakpoint behavior table.
9. **Define density modes** if needed. Model: the "Density modes" table below and the
   "Control and row heights" table in the reference file. Output: row height,
   control height, padding, and type size per mode.

### Tools

- **Figma MCP.** If connected, read frames with `get_design_context` and
  `get_variable_defs` to see actual spacing and token use; `get_screenshot` for the
  squint test. If not, work from screenshots and say so.
- **Playwright.** For live pages, screenshot at 390, 768, 1280, 1440. Measure gaps
  with `getBoundingClientRect()` on adjacent elements to find off-scale values.
- **Codebase.** Search styles for arbitrary values (`\b\d+px\b`, Tailwind `-[13px]`)
  and compare against the scale.

## Standards

### Spacing

- Base unit 4px; most decisions on an 8px rhythm: 4, 8, 12, 16, 24, 32, 48, 64, 96,
  128. Steps grow by about 1.5x so neighbors are distinguishable; 16 vs 18 is noise.
- Inside a component: 4–16px. Between related components: 16–24px. Between sections:
  48–96px desktop, 32–64px mobile.
- **Proximity rule:** space between groups is at least 2x space within them. If a
  label sits 8px above its field, the next field starts 24px or more below.
- Interactive heights land on the scale (24, 32, 36–40, 48px). Targets are at least
  24×24 CSS px (WCAG 2.2, 2.5.8); 44px or more on touch-first screens.

### Grid and widths

- 12 columns on desktop (divisible by 2, 3, 4, 6), 8 on tablet, 4 on mobile.
- Gutters 16px mobile, 24px tablet, 24–32px desktop; outer margin at least 16px.
- **Measure:** long-form body text at 60–75 characters per line (`max-width: 65ch`).
  Bringhurst gives 45–75 with 66 as the ideal; above ~80 the eye loses its place on
  the return sweep.
- Page content max-width 1120–1280px. Data tables may go full-width; prose never does.
- Not everything belongs on the column grid. A fixed 240–280px sidebar with a fluid
  main area usually beats a sidebar forced to "3 columns".

### Hierarchy

- One primary element per region, one primary button per view.
- At most three text emphasis levels: primary (strong color, larger or bold),
  secondary (strong color, regular), tertiary (muted, still at least 4.5:1).
- **De-emphasize to emphasize.** When something does not stand out, make its
  competitors quieter before making it louder.
- Size is not the only lever. Weight (400 vs 600) and contrast do most of the work in
  product UI; save large size jumps for page titles and marketing.
- Labels are a last resort. "$1,240 / month" beats "Price: $1,240 per month".
- Semantic level and visual level are separate. An `h2` can look small; a stat can
  look large without being a heading.
- No gray text on colored backgrounds. Use a tint or shade of the background hue.
- Space above a heading is larger than space below it, so it binds to its content.

### Alignment

- 2–4 distinct left edges per region. Each extra edge is another thing to scan.
- Numbers right-aligned and tabular (`font-variant-numeric: tabular-nums`) in tables.
- Optical adjustment is expected: icons and round shapes often need 1–2px of nudge.

### Density modes

| Mode | Table row | Control height | Cell padding (x) | Body size | Use |
| --- | --- | --- | --- | --- | --- |
| Compact | 32px | 28–32px | 8–12px | 13–14px | Expert, data-dense, many rows |
| Comfortable (default) | 40–48px | 36–40px | 12–16px | 14–16px | Most product UI |
| Spacious | 56–64px | 44–48px | 16–24px | 16px | Consumer, touch-first |

Density changes spacing and row height, never the hierarchy or the 24px target floor.
Offer a user setting when views routinely exceed ~50 rows.

### Breakpoints

Use the project's breakpoints. If none, Tailwind's (640, 768, 1024, 1280, 1536) for
web, or Material 3 window classes (compact under 600, medium 600–839, expanded 840+)
for app-like layouts. Start at the smallest width and add a breakpoint where the
content breaks, not where a device happens to be. Use container queries for
components that live in regions of different widths.

## Output

A layout spec with, in order:

1. Hierarchy ranking per screen (1st, 2nd, 3rd, quiet)
2. Grid table: breakpoint, columns, gutter, margin, max-width
3. Spacing scale with token names, and the map of every gap to a step
4. Before/after screenshots or frames with numbered changes, each citing its rule
5. Breakpoint behavior table per region
6. Density mode table, if in scope

## Verify

Open the result at 320, 390, 768, 1280, and 1440 in light and dark, and zoom to 200%.
Done means:

- [ ] Squint test (blurred or 25% zoom) shows the intended first element first
- [ ] Every gap is on the spacing scale, or the exception is written down with a reason
- [ ] Space between groups is at least 2x space within groups, everywhere
- [ ] Long-form body text measures 60–75 characters; nothing over 80
- [ ] One primary button per view
- [ ] No more than 4 distinct left edges in a region
- [ ] Muted and tertiary text still passes 4.5:1
- [ ] No horizontal scroll at 320px (WCAG 1.4.10 Reflow), except data tables and
      canvases that need two dimensions
- [ ] Interactive targets are 24×24px or larger in every density mode
- [ ] Every region has defined behavior at every breakpoint

Then delegate: the `design-critic` subagent checks hierarchy and grouping on the
screenshots; the `token-auditor` subagent checks the implemented styles for
off-scale spacing values. Both report only failures, with a location (screen and
breakpoint, or file and line), and end with a verdict. Fix blocking issues first.

## Anti-patterns

- Equal spacing everywhere, so nothing groups and the screen reads as a pile of parts
- A border or card around every group to fix what is really a proximity problem
- Hierarchy by size alone: five font sizes and everything still competes
- Three primary buttons in one view, each in the brand color
- Full-width paragraphs on a 1440px screen (140+ characters per line)
- Centered body text longer than two lines
- 13px, 18px, 22px scattered through the stylesheet
- Designing at 1440 only, then "stacking everything" at mobile
- Hiding content people need on mobile instead of disclosing it progressively

## Related skills

- **Feeds from:** `wireframing` (the chosen direction), `typography-system` (type
  scale), `information-architecture` (content priority)
- **Leads to:** `design-tokens` (encode the scale), `interface-polish`,
  `design-critique`, `design-to-code`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Refactoring UI**: the tactics behind step 6 (de-emphasize to emphasize, labels as
  a last resort, no gray on color, start with too much white space).
- **Utopia**: fluid space and type scales with `clamp()` between two viewports.
- **IBM Carbon** and **Material 3**: published grid, gutter, and breakpoint specs.
- **Practical Typography**: line length and line spacing.
- **Laws of UX**: the Law of Proximity and Law of Common Region behind step 5.
- **Polypane**: checking one layout at several viewports at once.

From [`FIBO.md`](../../FIBO.md):
- **Component conventions**: the xs/sm/default/lg height ladder (24/32/36/40px) as a
  worked control-size scale for density modes.
- **Tokens**: radius as one knob with derived steps; the same "one base, derived
  steps" idea applies to spacing.
