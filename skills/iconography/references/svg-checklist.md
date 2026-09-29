# Custom icon checklist

Read before drawing or adding a custom icon beside a library set.

## Drawing

- [ ] Same canvas as the library (24×24 for Lucide and Heroicons outline)
- [ ] Inside the live area (20×20 with 2px padding; never touching the edge)
- [ ] Sized to the matching keyline shape: circle 20, square 18, portrait 16×20,
      landscape 20×16
- [ ] Same stroke width as the library (Lucide 2px, Heroicons outline 1.5px)
- [ ] Same caps and joins (Lucide: round and round)
- [ ] Same corner radius on rectangles (Lucide uses 2px)
- [ ] At least 2px between separate strokes, so shapes do not merge at 16px
- [ ] Coordinates on whole or half pixels so strokes align at the primary size
- [ ] Checked at 16px and 24px on a 1x screen, beside three library icons
- [ ] One metaphor, recognizable without a label. If it needs a label to be
      understood, it always gets one.

## Exporting

- [ ] Outline set: strokes kept as strokes, not outlined to fills
- [ ] Flattened groups; no transforms left on paths
- [ ] Artboard exported at exactly 24×24 (no fractional bounds)

## Cleaning

Run SVGO (or SVGOMG) with default settings, then confirm the result:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round"
     stroke-linejoin="round">
  <path d="M12 5v14" />
  <path d="M5 12h14" />
</svg>
```

- [ ] `viewBox` present; no fixed `width`/`height` (the component sets size)
- [ ] `stroke="currentColor"` (or `fill="currentColor"` for fill sets); no hex colors
- [ ] No `id`, `class`, `style`, `data-name`, `<title>`, `<desc>` or editor namespaces
- [ ] No `<defs>`, `<clipPath>` or `<mask>` unless the shape needs it
- [ ] Path data under ~1KB for a simple glyph

## Shipping

- [ ] Wrapped as a component with the same API as the library's icons (`size`,
      `strokeWidth`, `className`, spread props), so it drops into the same slots.
      With Lucide, `createLucideIcon` produces a component with that API.
- [ ] Named in the library's convention (`FooIcon`)
- [ ] Added to the icon specimen page or story
- [ ] `aria-hidden` by default; accessible names go on the control that uses it
