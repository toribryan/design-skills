# Scales and fluid values

Read before picking a scale ratio or writing `clamp()` by hand.

## Precomputed modular scales, base 16px

| Step | 1.125 | 1.2 | 1.25 | 1.333 |
| --- | --- | --- | --- | --- |
| -2 | 12.64 | 11.11 | 10.24 | 9.00 |
| -1 | 14.22 | 13.33 | 12.80 | 12.00 |
| 0 | 16 | 16 | 16 | 16 |
| 1 | 18.00 | 19.20 | 20.00 | 21.33 |
| 2 | 20.25 | 23.04 | 25.00 | 28.43 |
| 3 | 22.78 | 27.65 | 31.25 | 37.90 |
| 4 | 25.63 | 33.18 | 39.06 | 50.52 |
| 5 | 28.83 | 39.81 | 48.83 | 67.34 |
| 6 | 32.44 | 47.78 | 61.04 | 89.76 |

Round to whole pixels for the shipped scale. A 1.2 scale rounded:
11, 13, 16, 19, 23, 28, 33, 40, 48. Steps below 12px are for legal text and
badges only, if at all.

**Tailwind's default scale** for comparison (size / line height):
12/16, 14/20, 16/24, 18/28, 20/28, 24/32, 30/36, 36/40, 48/48, 60/60, 72/72.
It sits between 1.125 at the small end and 1.25–1.333 at the large end, which is
what product UI wants: fine steps where most text lives, bigger jumps for headings.

## The clamp formula

For a size that goes from `min` px at viewport `vmin` to `max` px at `vmax`:

```
slope      = (max - min) / (vmax - vmin)
intercept  = min - slope * vmin
font-size: clamp(min/16 rem, intercept/16 rem + slope*100 vw, max/16 rem)
```

Always express the intercept in rem, not px, so the size responds to browser
zoom and user font-size settings.

## A fluid scale, Utopia-style

Minimum: 16px base, ratio 1.2, at a 360px viewport.
Maximum: 18px base, ratio 1.25, at a 1240px viewport.

| Step | Min px | Max px | CSS |
| --- | --- | --- | --- |
| -2 | 11.11 | 11.52 | `clamp(0.6944rem, 0.684rem + 0.0466vw, 0.72rem)` |
| -1 | 13.33 | 14.40 | `clamp(0.8333rem, 0.806rem + 0.1216vw, 0.9rem)` |
| 0 | 16.00 | 18.00 | `clamp(1rem, 0.9489rem + 0.2273vw, 1.125rem)` |
| 1 | 19.20 | 22.50 | `clamp(1.2rem, 1.1156rem + 0.375vw, 1.4063rem)` |
| 2 | 23.04 | 28.13 | `clamp(1.44rem, 1.3099rem + 0.5784vw, 1.7578rem)` |
| 3 | 27.65 | 35.16 | `clamp(1.728rem, 1.5361rem + 0.8534vw, 2.1973rem)` |
| 4 | 33.18 | 43.95 | `clamp(2.0736rem, 1.7984rem + 1.2239vw, 2.7466rem)` |
| 5 | 39.81 | 54.93 | `clamp(2.4883rem, 2.1015rem + 1.7182vw, 3.4332rem)` |

Use this for marketing and docs. In product UI, keep steps -2 to 0 fixed (13,
14, 16) and let only headings flow.

As Tailwind v4 theme variables:

```css
@theme {
  --text-step-3: clamp(1.728rem, 1.5361rem + 0.8534vw, 2.1973rem);
  --text-step-3--line-height: 1.2;
  --text-step-3--letter-spacing: -0.01em;
}
```

This yields a `text-step-3` utility with its line height and tracking attached.

## Type role table template

| Role | Family | Size | Line height | Weight | Tracking | Used for |
| --- | --- | --- | --- | --- | --- | --- |
| `display` | sans | 48 (fluid 30–48) | 1.0 | 600 | -0.03em | Marketing hero only |
| `heading-1` | sans | 30 | 36 | 600 | -0.02em | Page titles |
| `heading-2` | sans | 24 | 32 | 600 | -0.01em | Section titles |
| `heading-3` | sans | 20 | 28 | 600 | 0 | Card and dialog titles |
| `heading-4` | sans | 16 | 24 | 600 | 0 | Group labels |
| `body` | sans | 16 | 24 | 400 | 0 | Reading text |
| `body-sm` | sans | 14 | 20 | 400 | 0 | Most UI text, table cells |
| `label` | sans | 14 | 20 | 500 | 0 | Form labels, buttons |
| `caption` | sans | 12 | 16 | 400 | 0 | Helper text, timestamps |
| `overline` | sans | 12 | 16 | 500 | +0.06em uppercase | Section eyebrows, sparingly |
| `code` | mono | 13–14 | 20 | 400 | 0 | Code, IDs, token values |

## Fallback metric overrides

Match a fallback's box to the web font so the swap does not move text. Values
come from the font files (tools: Capsize, `fontaine`, or a framework loader).

```css
@font-face {
  font-family: "Inter Fallback";
  src: local("Arial");
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
:root { --font-sans: "Inter", "Inter Fallback", ui-sans-serif, system-ui, sans-serif; }
```

The percentages above are illustrative. Compute them for the actual pair; a
wrong `size-adjust` shifts layout as much as none.
