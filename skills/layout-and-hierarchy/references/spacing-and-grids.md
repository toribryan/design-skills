# Spacing and grid reference

Read this before setting a spacing scale, a grid, or breakpoints. Match the project's
existing values first; use these tables when there are none.

## Spacing scale (4px base, 8px rhythm)

| Token | px | rem | Typical job |
| --- | --- | --- | --- |
| `space-0.5` | 2 | 0.125 | Hairline offsets, optical nudges only |
| `space-1` | 4 | 0.25 | Icon to label, tight inline gaps |
| `space-2` | 8 | 0.5 | Label to input, items in a tight group |
| `space-3` | 12 | 0.75 | Padding in compact controls, list item gaps |
| `space-4` | 16 | 1 | Default padding inside cards and controls, mobile page margin |
| `space-6` | 24 | 1.5 | Between related components, form field to field |
| `space-8` | 32 | 2 | Between groups in a panel |
| `space-12` | 48 | 3 | Between sections (mobile), card padding on marketing pages |
| `space-16` | 64 | 4 | Between sections (desktop app) |
| `space-24` | 96 | 6 | Between sections (marketing, desktop) |
| `space-32` | 128 | 8 | Hero padding, very large separations |

Token names follow Tailwind's convention (the number counts multiples of 4px), which is
what Fibo and most React + Tailwind projects already use. If the project names
tokens by t-shirt size (`space-sm`, `space-md`), keep that.

The steps are uneven on purpose. Between 16 and 24 the eye can tell the
difference; between 16 and 18 it cannot, so 18 is noise.

## Proximity ratios

| Relationship | Gap | Example |
| --- | --- | --- |
| Inside one element | 4–8px | Icon and its label |
| Label to its control | 4–8px | "Email" above its input |
| Control to the next control in a group | 16–24px | Two fields in a form |
| Group to group | 32–48px | "Shipping" section to "Payment" section |
| Section to section | 48–96px | Page bands |

Rule: each level is at least 2x the level below it.

## Column grids

| Breakpoint | Columns | Gutter | Outer margin | Content max-width |
| --- | --- | --- | --- | --- |
| < 640 (mobile) | 4 | 16px | 16px | fluid |
| 640–1023 (tablet) | 8 | 24px | 24–32px | fluid |
| 1024–1279 (laptop) | 12 | 24px | 32px | fluid or 960px |
| 1280+ (desktop) | 12 | 24–32px | auto (centered) | 1120–1280px |
| 1536+ (wide) | 12 | 32px | auto | 1280px, or full-bleed for data |

IBM Carbon's 2x Grid (16 columns on large screens, 32px gutter, built on an 8px
mini-unit) is the main alternative. Pick one system per product.

## App shells

| Region | Width | Notes |
| --- | --- | --- |
| Icon rail | 48–64px | Icons need tooltips and accessible names |
| Sidebar nav | 240–280px | Collapsible to rail below 1024px |
| Inspector / detail panel | 320–400px | Overlays as a sheet below 1280px |
| Main | fluid, min 480px | Holds the primary content |
| Dialog | 400–560px (small), 640–800px (large) | Full-screen sheet on mobile |

## Content widths

| Content | Width |
| --- | --- |
| Body text | 60–75ch (`max-width: 65ch`) |
| Form column | 400–560px (single column; one field per row) |
| Settings page | 640–800px |
| Article with images | 680–760px text, images may break out to 1024px+ |
| Data table | as wide as needed; freeze the first column past 1024px |

## Breakpoint systems

| System | Breakpoints |
| --- | --- |
| Tailwind | sm 640, md 768, lg 1024, xl 1280, 2xl 1536 |
| Material 3 window classes | compact < 600, medium 600–839, expanded 840–1199, large 1200–1599, extra-large 1600+ |
| Bootstrap 5 | sm 576, md 768, lg 992, xl 1200, xxl 1400 |

Prefer container queries (`@container`) for components that appear in regions of
different widths (a card in a sidebar and in the main area).

## Vertical rhythm

| Text | Line height | Space after |
| --- | --- | --- |
| Body 14–16px | 1.5–1.6 | 0.75–1em between paragraphs |
| UI labels 12–14px | 1.3–1.4 | n/a |
| Headings 20–32px | 1.2–1.3 | 0.5em below, 1.5–2em above |
| Display 40px+ | 1.0–1.15 | set by section spacing |

Space above a heading is larger than space below it, so the heading groups with the
content it introduces.

## Control and row heights

| Size | Height | Fibo equivalent |
| --- | --- | --- |
| xs | 24px | `size="xs"` (h-6) |
| sm | 32px | `size="sm"` (h-8) |
| default | 36–40px | `size="default"` (h-9) |
| lg | 40–48px | `size="lg"` (h-10) |
| Touch primary | 44–48px | n/a |

WCAG 2.2 2.5.8 requires targets of at least 24×24 CSS px (or 24px spacing around
smaller ones). Apple HIG recommends 44×44pt; Material recommends 48×48dp.

## Fluid spacing

For marketing pages, scale section spacing between viewports with `clamp()`:

```css
:root {
  --space-section: clamp(3rem, 1.875rem + 4.57vw, 6rem);   /* 48px at 390 → 96px at 1440 */
}
```

Generate a full fluid scale with Utopia rather than hand-tuning each value.
