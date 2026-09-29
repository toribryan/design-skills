# Polish checklist

The full pass list for `interface-polish`. Work top to bottom. Each item has a check
(how to see the problem) and a fix (what to change). Mark each item pass, fail, or
n/a as you go; do not skip silently. The report lists failures only, each with a
location (`file:line`, screen, breakpoint, theme).

Token note: the fixes below use role names in the Fibo / shadcn style (`border-border`,
`ring-ring-subtle`, `bg-muted`). Use the project's own names. Where a fix needs alpha,
put it in a token (`color-mix(in oklch, ... 8%, transparent)`), not in a class
modifier like `/10`.

---

## 1. Alignment

| Check | Fix |
| --- | --- |
| Icons beside text sit on the text's optical center, not the line box | `inline-flex items-center` on the parent; if still off, nudge the icon with `translate-y-px` or `-translate-y-px`. Do not change `line-height` to fix it. |
| Play, arrow, and chevron glyphs look centered in their containers | Nudge toward the pointy side's opposite: a play triangle moves right ~8–10% of its width. |
| Circular and triangular icons look the same size as square ones | Scale them 5–10% larger, or use an icon set that already compensates (Lucide, Phosphor). |
| Text in a button with an icon looks centered | With a leading icon, reduce the leading padding by ~2–4px (`pl-2.5 pr-3`). The icon's whitespace reads as padding. |
| Left edges of stacked text, inputs, and buttons line up | Inputs and buttons have internal padding; the text inside should align with body text above, or the box edge should. Pick one and apply it on the whole screen. |
| Large headings align with body text on the left | Big type has side bearing. Pull display headings left by ~0.02–0.05em (`-ml-[0.04em]`) if the misalignment is visible. |
| Baselines line up across adjacent columns | Use `items-baseline` on flex rows that mix sizes (label + value, price + unit). |
| Avatar stacks, badges, and dots sit on the same center line | Check with a 1px horizontal guide in DevTools or a screenshot overlay. |

## 2. Geometry and radius

| Check | Fix |
| --- | --- |
| Nested rounded shapes are concentric | `inner radius = outer radius − padding`. Card 16px, padding 8px → inner 8px. Card 12px, padding 4px → inner 8px. |
| Padding larger than the outer radius | Inner radius goes to a small value (4–6px), not zero and not negative. |
| Radius comes from the scale | Map to `rounded-sm/md/lg/xl/2xl` or `--radius-*` tokens. No `rounded-[7px]`. |
| Images inside rounded cards are clipped | `overflow-hidden` on the card, or give the image the inner radius. Watch for Safari corner bleed with transforms: add `isolation: isolate`. |
| Radius is consistent by component tier | Small controls (inputs, buttons) share one radius, containers (cards, dialogs) another. Two or three radii total on a screen. |
| Pill buttons | Use `rounded-full`, not a large fixed value, so height changes do not break the shape. |

## 3. Typography

| Check | Fix |
| --- | --- |
| Numbers that update in place keep the same width | `tabular-nums` on timers, counters, prices, table columns, progress percentages. |
| Numbers in running prose | Leave proportional. Tabular figures look loose in sentences. |
| Headings wrap to balanced lines | `text-wrap: balance` (`text-balance`). Browsers cap it at ~6 lines; fine for headings. |
| Paragraphs end with a lone word (orphan) | `text-wrap: pretty` (`text-pretty`). |
| Line length | Body 45–75 characters. `max-w-prose` (65ch) or `max-w-[68ch]`. |
| Line height by size | Body 1.5–1.6, UI labels 1.25–1.4, display 1.0–1.15. Larger type gets tighter leading. |
| Letter spacing by size | Display (≥ 32px) −0.01 to −0.03em. Small caps and all-caps labels +0.02 to +0.08em. Body 0. |
| Quotes, apostrophes, dashes | Curly quotes (’ “ ”), en dash for ranges (9–5), ellipsis character (…), non-breaking space between number and unit (`10&nbsp;MB`). |
| Truncation | Truncate with `truncate` or `line-clamp-2` and expose the full text (title attribute is not enough on touch; use a tooltip or expand). |
| Font loading | `font-display: swap` plus a metric-adjusted fallback (`size-adjust`, `ascent-override`) or `next/font`, so the swap does not shift layout. |
| Font smoothing | `antialiased` on dark backgrounds on macOS if the type looks heavy. Apply once on `body`, not per component. |

## 4. Targets and interactivity

| Check | Fix |
| --- | --- |
| Touch targets | ≥ 44×44px (Apple) / 48×48dp (Material). WCAG 2.2 minimum is 24×24px. Expand with padding or a `::before` with negative inset. |
| Adjacent targets | ≥ 8px between hit areas, or the expanded areas overlap and the wrong one wins. |
| Whole row or card is clickable | Make the full surface the link (stretched `::after` on the primary link), not just the title. Keep nested buttons above it with `relative z-10`. |
| Labels toggle their inputs | Every checkbox and radio has a `<label>` wrapping or `htmlFor`-linked, so the text is clickable. |
| Buttons respond on press | An `:active` state (scale 0.97–0.98 or a darker fill) under 100ms. |
| Double submission | Disable or show pending on submit; the button keeps its width while its label changes (set `min-width` or overlay the spinner). |
| Destructive actions | Confirm, or better, allow undo for 5–10 seconds. |
| Drag handles and sliders | Hit area extends well past the visual; thumb ≥ 24px visual, 44px target. |
| Menus open on pointerdown or click consistently | Dropdowns can open on `pointerdown` for speed; do not mix models on one screen. |
| Hover intent | Tooltips wait 300–500ms before the first show, then show instantly for neighbors while one is open. |

## 5. Hover

| Check | Fix |
| --- | --- |
| Hover styles stick after tap on iOS | Gate with `@media (hover: hover) and (pointer: fine)`. Tailwind v4 does this for `hover:` by default; v3 needs `future.hoverOnlyWhenSupported`. |
| Hover reveals essential actions | Keep them visible on touch (`@media (hover: none)`) and reachable by keyboard (`:focus-within` reveals them too). |
| Hover transitions | Color and background 100–150ms ease-out. No hover transition on dense tables longer than 100ms. |
| Hover on disabled elements | None. Also no pointer cursor. `cursor-not-allowed` is optional; teams split on it. |
| Cursor | `cursor: pointer` on links and buttons that navigate or act; default cursor on non-interactive cards. |

## 6. Focus and keyboard

| Check | Fix |
| --- | --- |
| Visible focus on every interactive element | `focus-visible:ring-[3px] focus-visible:ring-ring-subtle` (Fibo) or the project's ring token. Never `outline: none` without a replacement. |
| Focus ring contrast | ≥ 3:1 against adjacent colors, in both themes. |
| Ring follows the shape | `outline` follows `border-radius` in modern browsers; `box-shadow` rings do too. Check pills and circles. |
| Focus order matches visual order | Tab through. No positive `tabindex`. |
| Focus moves on open and returns on close | Dialogs focus the first meaningful control and return focus to the trigger. Base UI and Radix handle this; custom overlays often do not. |
| Escape closes the top layer only | One Escape, one layer. |
| Skip link | "Skip to content" as the first tab stop on pages with navigation. |
| Keyboard shortcuts | Show them in menus and tooltips (`⌘K`), and do not fire them while typing in an input. |

## 7. Stability and scroll

| Check | Fix |
| --- | --- |
| Images and embeds reserve space | `width` and `height` attributes, or `aspect-ratio`. |
| Content loaded later pushes content down | Reserve the slot with a fixed-height skeleton or `min-height`. |
| Scrollbar appearing shifts centered layouts | `scrollbar-gutter: stable` on `html`. |
| Opening a modal shifts the page | Scroll lock must compensate for the scrollbar width (Base UI and Radix do; custom locks often do not). |
| Bold-on-hover or active tab changes width | Reserve the bold width: render the bold text invisibly with `after:content-[attr(data-text)] after:font-semibold after:invisible after:h-0 after:block`. |
| Count badges and labels change width | `tabular-nums` and a `min-width`. |
| Anchor links hide under a sticky header | `scroll-margin-top` equal to the header height on targets. |
| Smooth scrolling | `scroll-behavior: smooth` only inside `@media (prefers-reduced-motion: no-preference)`. |
| Scroll chaining out of panels | `overscroll-behavior: contain` on scrollable popovers, drawers, and sidebars. |
| Horizontal scroll areas | Scroll snap (`snap-x snap-mandatory`), a visible cue that more exists (partial item or fade), and no hidden scrollbar on desktop without another affordance. |
| Scroll position on back navigation | Restored. Check in the router. |
| Mobile viewport height | Use `dvh`/`svh` instead of `vh` for full-height layouts, so the URL bar does not crop them. |

## 8. Inputs and forms

| Check | Fix |
| --- | --- |
| iOS zooms on focus | Input font-size ≥ 16px at mobile widths (`text-base md:text-sm`). Never disable zoom with `maximum-scale`. |
| Correct keyboard | `type="email"`, `type="tel"`, `inputmode="numeric"` for codes, `inputmode="decimal"` for amounts. |
| Autofill | `autocomplete` on every field (`email`, `current-password`, `one-time-code`, `street-address`). |
| Autofill styling | Autofilled inputs keep the theme: style `:-webkit-autofill` with an inset box-shadow in dark mode. |
| Spellcheck and capitalization | `spellcheck={false}` and `autoCapitalize="none"` on emails, usernames, codes. |
| Labels | A visible label on every field. Placeholder is an example, not the label. |
| Errors | Inline, next to the field, after blur or submit (not on first keystroke). Linked with `aria-describedby`. |
| Submit on Enter | Forms submit on Enter; textareas use ⌘/Ctrl+Enter. |
| Password fields | A show/hide toggle; paste allowed. |
| Number inputs | Avoid `type="number"` for codes and IDs (it strips leading zeros and adds spinners). |

## 9. Surface: borders, shadows, color, selection

| Check | Fix |
| --- | --- |
| Borders read in both themes | A `--border` token defined per theme: a light neutral step in light mode, translucent white in dark (Fibo: `oklch(1 0 0 / 10%)`). Components use `border-border` only. |
| Hairline dividers | 1px, 6–12% foreground. `divide-y` over manual borders. |
| Shadows are layered | Two to four stacked shadows: a tight one for contact, a soft one for lift. See the recipe below. |
| Shadows in dark mode | Shadows barely read on dark. Use a lighter surface color plus a 1px inner highlight (`inset 0 1px 0 rgb(255 255 255 / 0.05)`) instead. |
| Selection color | `::selection` uses the brand hue at low saturation, with readable text. |
| Theme color | `<meta name="theme-color">` per scheme so the mobile browser chrome matches. |
| Color scheme | `color-scheme: light dark` on `:root` so scrollbars and form controls follow the theme. |
| Gradients | Interpolate in OKLCH (`bg-linear-to-r/oklch`) to avoid muddy midpoints. |
| Images on dark backgrounds | A 1px inset ring in a named token (`ring-1 ring-inset ring-border`) stops light images from bleeding into the page. |

Layered shadow recipe:

```css
--shadow-sm:
  0 1px 1px rgb(0 0 0 / 0.04),
  0 1px 2px rgb(0 0 0 / 0.06);
--shadow-md:
  0 0 0 1px rgb(0 0 0 / 0.04),
  0 1px 2px rgb(0 0 0 / 0.04),
  0 4px 8px rgb(0 0 0 / 0.04),
  0 12px 24px rgb(0 0 0 / 0.04);
```

## 10. States

| Check | Fix |
| --- | --- |
| Empty state | Says what goes here, why it is empty, and offers the one action that fills it. No generic "No data". |
| First-run empty vs. filtered-to-nothing | Different messages. Filtered-empty offers "Clear filters". |
| Loading | Under ~300ms: nothing. 300ms–2s: skeleton. Over ~2s or unknown: skeleton plus progress or a message. |
| Skeletons match layout | Same dimensions, count, and radius as the loaded content; swapping them in causes zero shift. |
| Skeleton motion | Shimmer 1.5–2s per cycle, or a static fill under reduced motion. |
| Error | Says what happened in plain words, what the person can do, and keeps their input. Retry is one click. |
| Partial failure | One failed widget does not blank the page; it shows its own error in its own slot. |
| Optimistic updates | Update immediately, roll back with a message on failure. |
| Long content | Test with a 60-character name, a 5-line title, 1,000+ rows, and a 12-digit number. |
| Missing content | No image, no avatar, no description: each has a designed fallback (initials avatar, neutral placeholder). |
| Offline and slow network | Test at "Slow 4G" in DevTools. Nothing should flash or jump. |
| Success | Confirm without blocking: a toast or inline change, not a modal. |

---

## Quick scan (5 minutes)

When there is no time for the full pass, check these eight:

1. Tab through: is every stop visible?
2. Resize to 320px: anything overflow or overlap?
3. Tap on a phone: does hover stick?
4. Throttle to Slow 4G and reload: anything jump?
5. Any counters or prices jitter while updating?
6. Nested rounded corners concentric?
7. Empty and error states exist?
8. Inputs at 16px on mobile?
