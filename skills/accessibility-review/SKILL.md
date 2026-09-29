---
name: accessibility-review
description: >-
  Audits a design or live product against WCAG 2.2 AA: contrast (with APCA as a
  second check), keyboard, focus, target size, semantics and ARIA, forms, motion, and
  screen reader behavior, combining axe with manual testing. Produces an audit with
  severity and a WCAG criterion per issue. Use for "accessibility audit", "a11y
  review", "WCAG", "is this accessible", "check contrast", "screen reader test", or
  "keyboard navigation". Not for general usability critique (use design-critique) or
  building accessible components from scratch (use component-api-design).
---

# Accessibility Review

An accessibility review checks whether people who use a keyboard, a screen reader,
magnification, voice control, or reduced motion can do everything anyone else can.
WCAG 2.2 AA is the bar: it contains 2.0 and 2.1 AA, which the EU's EN 301 549, US
Section 508, and the 2024 ADA Title II rule reference.
The output is an audit that lists only failures, each with a location, a WCAG
success criterion, a severity, and a fix, ending in a one-line verdict.

## When to use

- Before shipping a feature, flow, or redesign
- A design-stage review of Figma frames (contrast, targets, focus states, reading order)
- A procurement, VPAT, or legal request for conformance status
- A complaint or support ticket about access
- Checking a color palette or component library for contrast and states

**Not for:** general usability critique (use `design-critique`), designing a
component's API and states from scratch (use `component-api-design`), or building
the color ramps themselves (use `color-system`; this skill checks them).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **What to audit**: URL, staging build, Storybook, or Figma frames [ask; required]
- **Scope**: pages, flows, and components [the top 3–5 user tasks, end to end, plus
  shared templates such as header, nav, footer, and dialogs]
- **Target**: WCAG version and level [WCAG 2.2 AA]
- **Platforms**: browsers, screen readers, mobile [Chrome + axe; VoiceOver + Safari
  on macOS; NVDA + Chrome or Firefox on Windows if available]
- **Known issues** or a previous audit [none]

## Process

1. **Define scope and sample.** List the tasks and the pages or states each touches,
   including dialogs, menus, errors, and empty states. Model: the "Scope" block of
   [`templates/audit-report.md`](templates/audit-report.md). Copy that shape. Output:
   a scope table.
2. **Run automated checks.** axe DevTools in the browser, or `@axe-core/playwright`
   across every page and state in scope. Record rule id, element, and count. Treat
   the result as a floor: automated tools catch roughly 30–40% of WCAG issues
   (Deque reports about 57% by issue volume on its own data). If the browser is not
   available, say so and review code and designs manually. Output: axe results,
   deduplicated.
3. **Check contrast.** Text, icons, borders of inputs, focus indicators, and states
   (hover, disabled is exempt but check it is still perceivable), in light and dark.
   Output: failing pairs with measured ratios.
4. **Keyboard pass.** Unplug the mouse. Walk every task with Tab, Shift+Tab, Enter,
   Space, Escape, and arrow keys. Output: failures with the step where they occur.
5. **Zoom and reflow pass.** 200% text zoom, 400% page zoom (320 CSS px wide), and the
   text-spacing bookmarklet. Output: content lost, overlapped, or requiring
   two-dimensional scroll.
6. **Semantics pass.** Inspect the accessibility tree (Chrome DevTools, Accessibility
   pane) for headings, landmarks, names, roles, states, and form labels. Output:
   failures by element.
7. **Screen reader pass.** Run the task scripts in
   [`references/screen-reader-scripts.md`](references/screen-reader-scripts.md) with at
   least one screen reader. Output: what was announced vs what should be.
8. **Motion and media pass.** Reduced-motion setting on, auto-playing content,
   flashing, captions, and transcripts. Output: failures.
9. **Write the audit.** One row per failure: location, criterion, severity,
   observation, fix. Model: [`templates/audit-report.md`](templates/audit-report.md).
   Output: the audit with a verdict.

For a design-stage review in Figma, run steps 3, 5 (by reviewing mobile frames), and
6 (reading order, labels, and focus states drawn). Use the Figma MCP's
`get_variable_defs` to pull color pairs and `get_screenshot` for frames. Note that
keyboard and screen reader passes wait for a build.

## Standards

### Contrast

| What | WCAG 2.2 criterion | Minimum |
| --- | --- | --- |
| Body text (under 24px, or under 18.66px bold) | 1.4.3 Contrast (Minimum), AA | 4.5:1 |
| Large text (24px+, or 18.66px+ bold) | 1.4.3, AA | 3:1 |
| UI component boundaries needed to identify them (input borders, toggles), icons that carry meaning, chart elements | 1.4.11 Non-text Contrast, AA | 3:1 against adjacent colors |
| Focus indicator | 1.4.11 (and 2.4.13 at AAA) | 3:1 |
| Disabled controls, logos, decoration | Exempt | Keep them perceivable anyway |

Conformance is judged by the WCAG 2 ratio. Use **APCA** (the perceptual model in
the WCAG 3 drafts, not yet normative) as a second check, because the WCAG 2 formula
overstates contrast for dark color pairs, which matters in dark mode. APCA
guidance in Lc (lightness contrast):

| Lc | Use |
| --- | --- |
| 90 | Preferred for body text |
| 75 | Minimum for body text and columns of reading text |
| 60 | Minimum for other content text: labels, short UI text at 16px+ |
| 45 | Large or bold headlines (roughly 36px+ regular, 24px+ bold), and meaningful icons |
| 30 | Absolute minimum for any text, such as placeholder or disabled |
| 15 | Minimum for non-text elements such as dividers |

Never use color alone to carry meaning (1.4.1): pair it with text, an icon, or a
pattern. Measure; do not eyeball.

### Keyboard and focus

- Everything operable by pointer is operable by keyboard (2.1.1), with no trap
  (2.1.2). Escape closes dialogs, menus, and popovers.
- Focus order follows reading order (2.4.3). No positive `tabindex`.
- Composite widgets (tabs, menus, radio groups, listboxes, grids) use one tab stop and
  arrow keys inside, per the ARIA Authoring Practices Guide.
- A skip link or landmarks let people bypass repeated blocks (2.4.1).
- Opening a dialog moves focus into it; closing returns focus to the trigger.
- **2.4.7 Focus Visible (AA):** every focused element shows an indicator. Never
  `outline: none` without a replacement; use `:focus-visible`.
- **2.4.11 Focus Not Obscured (Minimum) (AA, new in 2.2):** the focused element is not
  entirely hidden by sticky headers, footers, cookie banners, or chat widgets. Fix with
  `scroll-padding-top` equal to the sticky header height.
- **2.4.13 Focus Appearance (AAA, new in 2.2):** the indicator is at least as large as
  a 2 CSS px thick perimeter of the component and changes contrast by 3:1. Treat this
  as the design target even when auditing to AA: a 2px solid outline with a 2px offset
  in a color with 3:1 against the background meets it.

### Target size

- **2.5.8 Target Size (Minimum) (AA, new in 2.2):** pointer targets are at least 24×24
  CSS px, or spaced so a 24px circle centered on each does not overlap another target.
  Exceptions: inline links in text, an equivalent control elsewhere, browser-native
  controls, and cases where the size is essential.
- Aim higher for touch: 44×44pt (Apple HIG, and WCAG 2.5.5 at AAA) or 48×48dp (Material).
- **2.5.7 Dragging Movements (AA, new in 2.2):** anything done by dragging also works
  with a single pointer (buttons to reorder, click to place).

### Semantics and ARIA

- **First rule of ARIA** (W3C, Using ARIA): if a native HTML element or attribute has
  the semantics and behavior you need, use it instead of adding ARIA. `<button>`, not
  `<div role="button" tabindex="0">`.
- No ARIA is better than bad ARIA. WebAIM's annual Million report consistently finds
  home pages that use ARIA have more detected errors than pages that do not.
- Every interactive element has an accessible name (4.1.2); visible label text is
  contained in the name (2.5.3), so voice users can say what they see.
- Icon-only buttons get `aria-label`; decorative icons get `aria-hidden="true"`.
- One `h1` per page, headings in order without skipped levels for structure (1.3.1,
  2.4.6). Landmarks: `header`, `nav`, `main`, `footer`.
- Page has a unique `<title>` (2.4.2) and `lang` attribute (3.1.1).
- Images: meaningful `alt` text, or `alt=""` for decoration (1.1.1).
- Status messages (toasts, "3 results", "Saved") are announced without moving focus,
  via `role="status"` or `aria-live="polite"` (4.1.3).

### Forms

- Every field has a visible, programmatically associated label (1.3.1, 3.3.2).
  Placeholder is not a label.
- Errors identified in text, next to the field, and linked with `aria-describedby`;
  the field gets `aria-invalid="true"` (3.3.1). Messages suggest the fix (3.3.3).
- Personal-data fields use `autocomplete` tokens (`email`, `given-name`,
  `street-address`) (1.3.5).
- **3.3.7 Redundant Entry (A, new in 2.2):** do not make people re-enter information
  they already gave in the same process; prefill or offer "same as billing".
- **3.3.8 Accessible Authentication (Minimum) (AA, new in 2.2):** no memory or puzzle
  test to log in unless there is an alternative. Allow paste and password managers;
  do not block paste into password or code fields.
- **3.2.6 Consistent Help (A, new in 2.2):** help links or contact options appear in
  the same relative place across pages.

### Motion, time, and media

- Honor `prefers-reduced-motion: reduce`: replace spatial motion with a fade or none
  (2.3.3 Animation from Interactions is AAA; treat it as required).
- Anything that moves, blinks, or scrolls automatically for more than 5 seconds has a
  pause control (2.2.2). Nothing flashes more than 3 times per second (2.3.1).
- Video has captions (1.2.2); audio has a transcript.
- Time limits can be turned off, adjusted, or extended (2.2.1).

### Zoom and reflow

- Text resizes to 200% without loss (1.4.4). Content reflows at 320 CSS px width
  without horizontal scroll, except tables, maps, and diagrams (1.4.10).
- Layout survives text spacing overrides: line height 1.5, paragraph spacing 2x,
  letter spacing 0.12em, word spacing 0.16em (1.4.12).
- Tooltips and hover content are dismissible with Escape, hoverable, and persistent
  (1.4.13).

### Severity

| Severity | Meaning | Blocking | Example |
| --- | --- | --- | --- |
| Critical | Blocks a task for a group of users | Yes | Keyboard trap in a dialog; unlabeled submit button; CAPTCHA with no alternative |
| Serious | Major difficulty, or an AA failure on a core task | Yes | Body text at 3.2:1; errors announced only by color; focus invisible on primary nav |
| Moderate | Difficulty with a workaround | No | Heading levels skipped; redundant link text |
| Minor | Annoyance or best practice | No | Decorative icon announced; `title` attribute duplicating the label |

## Output

An audit using [`templates/audit-report.md`](templates/audit-report.md): scope,
environment, method, then failures only, each with location, WCAG criterion
(number, name, level), severity, observation, and fix, sorted by severity; a summary
count by criterion; and a one-line verdict.

## Verify

Look at the product with the mouse unplugged, at 400% zoom, with reduced motion on,
in light and dark, and with a screen reader running. Done means:

- [ ] axe reports zero violations on every page and state in scope, or each remaining
      one is in the audit
- [ ] Every task in scope completed by keyboard alone, with focus always visible and
      never fully hidden
- [ ] Every text pair measured at 4.5:1 (or 3:1 large), UI boundaries and focus at 3:1
- [ ] Every target at least 24×24 CSS px or meets the spacing exception
- [ ] Every task completed with at least one screen reader, announcements recorded
- [ ] No horizontal scroll at 320px except for two-dimensional content
- [ ] Every failure has a location, a WCAG criterion with level, a severity, and a fix
- [ ] The audit ends with `Ready` or `N blocking issues` (count of critical + serious)

Delegate to the `accessibility-auditor` subagent for an independent pass on the same
scope. It reports only failures with location, criterion, and severity, and ends with
a verdict. Merge its findings; keep the higher severity on conflicts.

## Anti-patterns

- Declaring a product accessible because axe or Lighthouse shows 100
- `outline: none` on `:focus` with no replacement
- `<div onclick>` buttons with `role="button"` added later, and no keyboard handler
- `aria-label` on a `div` with no role, or on everything, overriding visible text
- Placeholder text as the only label, at 2.5:1 contrast
- Accessibility overlays and widgets presented as a fix; they do not make the
  underlying markup conformant
- Error states shown only in red
- Auditing only the home page, never the dialogs, errors, and authenticated flows
- Screen reader testing with a screen reader and browser pairing few people use
- Reporting "fails WCAG" with no criterion number or location

## Related skills

- **Feeds from:** `color-system` (contrast), `component-api-design` (states and
  semantics), `design-to-code` (the build under review), `ux-writing` (names and labels)
- **Leads to:** `interface-polish` and `design-to-code` (fixes), `visual-qa`
  (regression), `design-system-docs` (accessibility sections per component)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **axe DevTools**: automated checks in the browser and CI; know its coverage limit.
- **APCA Contrast Calculator**: Lc values for the second contrast check.
- **Color.review** and **Huetone**: fixing failing pairs across a ramp.
- **Inclusive Components** and **React Aria**: correct keyboard and screen reader
  behavior for complex widgets.
- **GitHub Primer**: accessibility guidance written per component.
- **Polypane**: reflow, zoom, and simulated vision checks across viewports.

From [`FIBO.md`](../../FIBO.md):
- **"Contrast is measured"**: status tones chosen by measured contrast and the
  measurement written next to the choice; copy that habit in the audit.
- **Quality gates**: every story fails on an axe violation, plus a `play` test by
  keyboard. The model for keeping an audit's fixes from regressing.
