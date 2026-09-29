---
name: iconography
description: >-
  Sets up a product's icon system: library choice or a custom set, the 24px grid
  and keylines, stroke weight, optical sizing, sizing and spacing inside
  components, SVG hygiene, and accessible names. Use for "which icon library",
  "icons look inconsistent", "design a custom icon", "icon sizes", "icon in a
  button", "Lucide vs Phosphor", "optimize SVGs", or "icon accessibility". Not
  for logos or brand marks; use brand-identity. Not for illustration; use
  art-direction.
---

# Iconography

Icons are a small vocabulary that has to read at 16px in half a second. An icon
system fixes one grid, one stroke, one corner style and a short list of sizes, so
any two icons on a screen look like they were drawn by the same hand, and it
fixes how icons sit inside components so nobody sizes them per instance. The
output is a library decision, sizing and spacing rules in code, an SVG checklist,
and accessibility rules.

## When to use

- Choosing an icon library, or replacing a mix of three
- Icons look mismatched in weight, size or corner style
- Drawing custom icons that must sit beside a library set
- Icons inside buttons, inputs and menus are sized or spaced inconsistently
- Icon-only controls fail an accessibility audit

**Not for:** logos and brand marks (use `brand-identity`), illustration and
spot art (use `art-direction`), animated icon transitions (use
`micro-interactions`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Current icons**: grep imports (`rg -n "from ['\"](lucide|@phosphor|@heroicons|react-icons)"`)
  and inline `<svg` in components. [none]
- **Type scale**: the body and UI text sizes the icons sit beside. [14px UI text]
- **Brand character**: [neutral, precise]
- **Stack**: [React; an icon package with tree-shaken per-icon imports]
- **Figma**: the icon library file or component set, via the Figma MCP if connected.

If the project has no system and uses React + Tailwind, start from Fibo, which
uses Lucide, via `pnpm dlx shadcn@latest add @fibo/button`, and keep its icon
sizing rule.

## Process

1. **Inventory.** List every icon in use, its source, and its rendered size.
   Output: a table with duplicates (three different "close" icons) flagged.
2. **Choose one library.** Use the comparison below. Mixing libraries is the most
   common cause of mismatched weight. Output: the library and why.
3. **Fix the sizes.** Two or three sizes tied to the type scale. Output: a size
   table (see Standards).
4. **Encode sizing in components, not instances.** Components size their own
   icons by default and let an explicit class override. Model: Fibo's
   `button.tsx` base classes; copy that shape. Output: the rule in each
   component that holds an icon.
5. **Define placement.** Leading or trailing icon, with padding that adjusts.
   Output: the markup convention (Fibo's `data-icon="inline-start"`).
6. **Draw custom icons to the library's grid**, if any are needed. Output: SVGs
   on the same canvas, stroke and corner radius, run through SVGO.
7. **Write accessibility rules.** Decorative vs meaningful, and names for
   icon-only controls. Output: the rules, and fixes for every violation found.

## Standards

### Grid and keylines (24px canvas)

- Canvas 24×24, with 2px padding: the live area is 20×20. Lucide requires at
  least 1px padding; Material uses 2dp.
- Keyline shapes, so different forms read as the same size: circle 20px diameter,
  square 18×18, portrait rectangle 16×20, landscape rectangle 20×16.
- Draw circles and triangles 5–10% larger than squares so they look equal.
- Align strokes to the pixel grid at the primary size: with a 2px stroke, put
  path coordinates on whole pixels so edges land on pixel boundaries.

### Stroke and style

| Library | Canvas | Stroke | Style | Weights |
| --- | --- | --- | --- | --- |
| **Lucide** | 24 | 2px, round caps and joins | Outline | One, stroke adjustable |
| **Phosphor** | 256 (scaled) | Varies by weight | Outline, fill, duotone | Six: thin, light, regular, bold, fill, duotone |
| **Heroicons** | 24 outline, 20 mini, 16 micro | 1.5px outline | Outline and solid | Per size |

- 1.5px reads lighter and more refined; 2px holds up better at 16px and on
  low-density screens. Match the stroke to the text weight: 400-weight UI text
  pairs with 1.5–2px at 24px.
- One corner style across the set: all round or all square joins.
- Filled variants signal state (selected tab, active favorite), not emphasis.

### Sizes

| Icon size | Beside text of | Use |
| --- | --- | --- |
| 12px | 12px | Extra-small buttons, dense badges |
| 16px | 14px | Default for UI: buttons, menus, inputs |
| 20px | 16px | Larger controls, navigation |
| 24px | 18–20px | Standalone and empty-state icons |

- Icon size is about 1.1–1.25 times the text size it sits beside.
- When a 24px-grid icon renders at 16px, a 2px stroke becomes 1.33px. That is
  usually right: the icon matches lighter UI text. If strokes must stay constant
  across sizes, Lucide's `absoluteStrokeWidth` prop does that.
- Gap between icon and label: 4px at 12–14px text, 6px at 14–16px, 8px at 18px+.
- Pull the padding in on the icon's side by 2–4px so the visual weight balances
  (Fibo: `px-3` becomes `pl-2.5` with a leading icon, `px-4` becomes `pl-3` at `lg`).

### Color

- `currentColor` for stroke or fill, so the icon follows the text role.
- Color an icon only when it carries meaning (a success check in `text-success`),
  and never let color be the only signal.

### SVG hygiene

- `viewBox="0 0 24 24"`, no hard-coded `width` and `height` in the source (or
  `1em`), `fill="none" stroke="currentColor"` for outline sets.
- No embedded styles, IDs, `<title>` from the design tool, editor metadata,
  transforms or clip paths that are not needed. Run SVGO (or SVGOMG) and diff.
- Keep strokes as strokes in outline sets so stroke width stays adjustable;
  outline them only for fill-based sets.
- Import per icon (`import { XIcon } from "lucide-react"`), never a whole set.
- Read [`references/svg-checklist.md`](references/svg-checklist.md) before adding
  a custom icon.

### Accessibility

- **Decorative** (next to a visible label): `aria-hidden="true"`. The label names
  the control.
- **Icon-only control**: the name goes on the control, `aria-label="Delete"`, and
  the icon stays hidden. A `title` attribute is not an accessible name on its own.
- **Meaningful standalone icon** (a status icon with no text): `role="img"` and an
  `aria-label`, or visually hidden text beside it.
- Hit area at least 24×24px for pointer and 44×44px for touch, even for a 16px icon.
- Icons that carry meaning need 3:1 contrast against their background.
- Spinners stop under `prefers-reduced-motion` (or slow to a pulse).

## Worked example: Fibo

Fibo uses Lucide (`lucide-react`), one of the three dependencies a base component
may have. Components size their own icons with one selector and let a `size-*`
class win. From
[`button.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/components/button.tsx):

```
[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
```

The same rule appears in `select.tsx`, `toast.tsx` and the scroll buttons. Small
sizes override it: `xs` and `icon-xs` use `[&_svg:not([class*='size-'])]:size-3`.

Placement is declared on the icon, and the button adjusts its own padding:

```tsx
<Button>
  <PlusIcon data-icon="inline-start" />
  New project
</Button>
```

```
h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5
```

Icon-only buttons are a size (`icon`, `icon-xs`, `icon-sm`, `icon-lg`) and are
named on the control; the docs say "Icon-only buttons need an `aria-label`. The
icon is decorative." In
[`toast.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/components/toast.tsx)
the type icon is colored only where it carries meaning ("Colour only where the
type carries meaning; a plain toast has no icon"), wrapped in an
`aria-hidden="true"` span, and the loading spinner is
`animate-spin motion-reduce:animate-none`.

## Output

- Library decision with the reason, and a list of icons replaced
- A size table tied to the type scale
- The sizing and placement rule in every component that holds an icon
- Custom SVGs (if any) on the library grid, optimized
- Accessibility fixes for every icon-only control

## Verify

**Checks that must pass**

- One icon library in `package.json`; `rg` finds no imports from a second.
- `rg -n "<svg" src/components` shows no inline SVG that duplicates a library icon.
- Every icon-only button has an accessible name (axe `button-name` passes in
  story tests or the app).
- The project's gates pass (format, lint, build, typecheck, test).

**By hand**

- A screen with ten or more icons, in light and dark: weights and corner styles
  match, nothing is optically off-center (play and chevron glyphs especially).
- Buttons with leading and trailing icons: padding looks balanced on both sides.
- Keyboard through every icon-only control: each has a visible focus ring and a
  sensible screen reader name.
- Reduced motion on: spinners stop or slow.

**Delegate** names, contrast and target size to the `accessibility-auditor`
([`agents/accessibility-auditor.md`](../../agents/accessibility-auditor.md)), and
icon placement inside a component to the `component-reviewer`
([`agents/component-reviewer.md`](../../agents/component-reviewer.md)).

## Anti-patterns

- Lucide in the header, Heroicons in settings and Font Awesome in the footer
- `className="w-4 h-4"` on every icon instance instead of a component default
- Icons centered mathematically when they need an optical nudge
- Icon-only buttons with `title` and no `aria-label`
- An icon with its own `aria-label` inside a button that also has a text label
- Custom icons at 1px stroke beside a 2px library
- Color on every icon for decoration, so meaningful color stops standing out
- Importing an entire icon set as a font or sprite for 12 icons
- Spinners that keep spinning with reduced motion on

## Related skills

- **Feeds from:** `typography-system` (sizes to match), `brand-identity` (character)
- **Leads to:** `component-api-design` (icon slots), `design-to-code`,
  `interface-polish` (optical alignment)
- **Checked by:** `accessibility-review`, `design-system-audit`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Lucide**: the 24px, 2px-stroke set Fibo uses, and its design guidelines.
- **Phosphor**: six weights, for matching icon weight to a brand.
- **Heroicons**: 1.5px outline and size-specific mini and micro sets.
- **Iconify**: finding a missing glyph across 150+ sets (then redraw it to your grid).
- **SVGOMG**: optimizing SVGs with a visual diff.
- **Gavin Nelson**: craft in small icons.
- **Inclusive Components**: naming icon-only buttons.

From [`FIBO.md`](../../FIBO.md):
- **Component conventions**: `data-icon` placement and state through attributes.
