# Ramps

Read before building a custom ramp. Most products should adopt a tested ramp
(Tailwind v4 or Radix) and spend their effort on the role mapping.

## Two models

### Tailwind v4: 11 steps, 50–950

Values are OKLCH. Tailwind v4's `neutral`, as Fibo's `theme.ts` records it:

| Step | L | C | Typical light-mode job | Typical dark-mode job |
| --- | --- | --- | --- | --- |
| 50 | 0.985 | 0 | Sidebar, subtle page | Text, primary fill |
| 100 | 0.970 | 0 | Muted and secondary fills | |
| 200 | 0.922 | 0 | Borders, inputs, hover fills | |
| 300 | 0.870 | 0 | Strong borders, chart | Chart |
| 400 | 0.708 | 0 | Focus ring | Muted text |
| 500 | 0.556 | 0 | Muted text (4.73:1 on white) | Focus ring |
| 600 | 0.439 | 0 | Secondary text | |
| 700 | 0.371 | 0 | | Hover fills |
| 800 | 0.269 | 0 | | Muted and secondary fills |
| 900 | 0.205 | 0 | Primary fill | Cards, popovers |
| 950 | 0.145 | 0 | Text | Page |

For chromatic ramps, lightness at each step is close across hues, which is what
makes "status on 700" a rule that works for red, green, amber and blue alike.
Chroma rises to a peak around 500–600 and falls at both ends.

### Radix: 12 steps with fixed jobs

| Step | Job |
| --- | --- |
| 1 | App background |
| 2 | Subtle background (sidebars, striped rows) |
| 3 | UI element background |
| 4 | Hovered UI element background |
| 5 | Active or selected UI element background |
| 6 | Subtle borders and separators |
| 7 | UI element border and focus rings |
| 8 | Hovered UI element border |
| 9 | Solid backgrounds (the purest step) |
| 10 | Hovered solid backgrounds |
| 11 | Low-contrast text |
| 12 | High-contrast text |

Radix ships separate light and dark scales where step N has the same job in
both, so a role maps to one step number in both modes. It also ships alpha
variants of each scale, which layer over any surface.

**Which to pick.** Tailwind's model fits projects already on Tailwind and gives
freedom in mapping. Radix's model fixes jobs to steps, so there is less to
decide and less to get wrong. Teams split on this; pick one and document it.

## Building a custom ramp in OKLCH

1. **Fix lightness per step first.** Copy the L column from Tailwind or Radix.
   Lightness is what contrast depends on, so reusing a tested L curve gives you
   tested contrast behavior.
2. **Set the hue.** Pick the brand hue at the 500–600 step. Let hue drift 5–15
   degrees across the ramp if the color looks dirty at the dark end (yellows and
   oranges need this most).
3. **Shape chroma.** Peak at 500–600. Taper to 5–15% of peak at 50 and 20–40% at
   950. Check each step is in sRGB (oklch.com shows the gamut boundary); out of
   gamut is acceptable for P3 screens only if the sRGB fallback still looks right.
4. **Measure.** Run the validator on white text over 600 and 700, and on the 700
   step over its 8% tint. Adjust L, never by eye.

## Tinted neutrals

A neutral with a trace of the brand hue feels related to it. Chroma budgets:

| Feel | Peak chroma | Example |
| --- | --- | --- |
| Pure grey | 0 | Tailwind `neutral` |
| Barely warm or cool | 0.003–0.006 | Tailwind `stone`, `zinc` |
| Noticeably tinted | 0.02–0.03 | Tailwind `gray` |
| Strongly tinted | 0.04–0.05 | Tailwind `slate` (peak 0.046) |

Keep the ends nearly grey and put the tint in the middle. Fibo's theme creator
does this for custom tints: it reuses neutral's lightness and scales slate's
chroma curve by an amount.

```ts
// packages/ui/src/lib/theme.ts
// How much of a custom tint each step takes: slate's chroma curve, scaled
// so its peak is 1. Ends stay nearly grey, the middle carries the tint.
const TINT_CURVE = [
  0.065, 0.152, 0.283, 0.478, 0.87, 1, 0.935, 0.957, 0.891, 0.913, 0.913,
]
// The chroma a custom tint reaches at full amount: slate's peak.
const TINT_MAX = 0.046
```

## Measured reference points

Measured with `validate-contrast.mjs` (sRGB after gamut fitting):

| Pair | WCAG | Notes |
| --- | --- | --- |
| green-600 fill, white text | 3.29:1 | Fails 4.5. Why Fibo moved status to 700 |
| amber-600 fill, white text | 3.19:1 | Fails |
| green-700 fill, white text | 5.00:1 | Passes |
| amber-700 fill, white text | 5.04:1 | Passes |
| red-700 fill, white text | 6.53:1 | Passes |
| blue-700 fill, white text | 6.82:1 | Passes |
| green-700 text on 8% green-700 tint over white | 4.48:1 | Just under; a recorded gap in Fibo |
| red-700 text on 8% tint over white | 5.63:1 | Passes |
| neutral-500 text on white | 4.73:1 | Passes; the usual muted-text step |
| neutral-500 text on neutral-100 | 4.34:1 | Fails; use full-strength text on muted fills |
| neutral-400 text on neutral-950 | 7.63:1, Lc 51 | Passes WCAG, weak in APCA |
| green-400 text on 20% tint over neutral-950 | 7.71:1 | Passes |
