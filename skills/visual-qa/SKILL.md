---
name: visual-qa
description: >-
  Compares an implementation against its design and reports the differences:
  Playwright screenshots at 320, 768, 1024, and 1440, overlays and pixel diffs,
  a checklist covering spacing, type, color, states, motion, dark mode, 200%
  zoom, long content, and ~30% translation expansion, with severity and bug
  reports stating expected vs. actual. Use for "QA this against Figma", "does
  it match the design", "design review of the build", "visual bugs", "pixel
  check", or "compare staging to the mock". Not for raising craft beyond the
  design; use interface-polish.
---

# Visual QA

Visual QA answers one question: does the build match the agreed design, everywhere it
will be seen? "Everywhere" is the point. Most mismatches do not show at the designer's
own laptop width in light mode with short English copy; they show at 320px, in dark
mode, at 200% zoom, with a German label or a 3-line title. This skill captures the
build under those conditions, compares it against the design, and reports only what
fails, each with a location, a severity, and expected vs. actual, so an engineer can
fix it without a meeting.

## When to use

- A feature is built and deployed to a preview or staging URL
- Before a release, as the design sign-off
- After a refactor or dependency upgrade that might have shifted visuals
- Setting up visual regression for a component library

**Not for:** improving craft beyond what the design specifies (use
`interface-polish`), a full accessibility audit (use `accessibility-review`), or
testing whether people can use it (use `usability-testing`).

## Inputs

- **The build**: a URL (local, preview, or staging) and any login or seed data.
- **The design**: Figma frames for the same screens and states, or the handoff
  package. [If the design has no frame for a state or breakpoint, compare against the
  handoff's written behavior, and flag the gap instead of inventing a standard.]
- **Acceptance criteria** from `design-handoff`, if they exist.
- **Scope**: screens and states. [Default: every frame marked "Ready for dev".]
- **Supported browsers**: [latest Chrome, Safari, Firefox; iOS Safari]

If the Figma MCP is connected, pull reference images with `get_screenshot` and exact
values with `get_design_context` and `get_variable_defs`. If Playwright is connected,
use it for all captures. If either is missing, say so in one line and fall back to
exports and manual screenshots.

## Process

1. **Build the matrix.** Screens × states × breakpoints × themes. Prune combinations
   that cannot differ, but never prune 320px or dark mode. Output: a capture list.
2. **Capture.** Playwright screenshots at 320, 768, 1024, and 1440, both color
   schemes, with animations disabled and fonts loaded. Model:
   [`references/capture-script.md`](references/capture-script.md). Copy that shape.
   Output: a folder of named images (`settings--empty--1024--dark.png`).
3. **Compare at the design's width.** Overlay the build on the Figma export at 50%
   opacity, or diff them, at the frame's exact width. Output: marked-up differences.
4. **Inspect values.** For each difference, read the computed style in DevTools and
   compare it to the design's token. Values beat pixels: a 2px shift caused by a
   wrong token is a bug; a 1px shift caused by subpixel rendering is not. Output:
   expected vs. actual per finding.
5. **Run the stress checklist.** Dark mode, 200% zoom, long content, ~30% text
   expansion, empty and error data, reduced motion, keyboard focus. Output: failures.
6. **Grade severity.** Use the table below. Output: each finding tagged.
7. **Write the report.** Failures only, grouped by screen, using
   [`templates/bug-report.md`](templates/bug-report.md). Copy that shape. End with the
   verdict. Output: the report, linked from the ticket.
8. **Re-verify fixes.** Recapture the same matrix cells. Close only what now matches.

## Standards

### Breakpoints

| Width | Represents | Why it is in the matrix |
| --- | --- | --- |
| 320 | Smallest phones, 400% zoom on 1280 desktop (WCAG reflow) | Overflow, wrapping, and truncation bugs |
| 768 | Tablet portrait, `md` | Where most layouts switch columns |
| 1024 | Tablet landscape, small laptop, `lg` | Sidebars appear; cramped middle layouts |
| 1440 | Common desktop design width | The width most designs are drawn at |

Also resize slowly from 320 to 1440 once, watching for widths between breakpoints
where things collide.

### Checklist

| Area | Check |
| --- | --- |
| Spacing | Gaps, padding, and margins match the design's tokens. Alignment edges line up. |
| Type | Family, weight, size, line height, letter spacing, case, wrapping. No faux bold or faux italic. |
| Color | Every color is the specified token, in both themes. Borders and dividers included. |
| Radius and shadow | Correct tokens; nested radii concentric. |
| Icons and images | Right icon, size, stroke; images crisp at 2x; correct crop and aspect ratio. |
| Layout | Column counts, alignment, max widths, sticky elements at each breakpoint. |
| States | Hover, focus-visible, active, disabled, loading, empty, error, selected, all present and matching. |
| Motion | Duration, easing, and direction match the spec; reduced motion honored. Record at 0.25x speed to compare. |
| Dark mode | No light-mode leftovers (white flashes, dark text on dark), images and charts legible. |
| Zoom 200% | Browser zoom and text-only zoom: nothing clipped, overlapping, or hidden. |
| Long content | 60-character names, 3-line titles, 12-digit numbers, 1,000-row lists. |
| Text expansion | Replace copy with ~30% longer strings (pseudo-localization); buttons, tabs, and nav still fit. |
| Missing data | No avatar, no image, empty optional fields. |
| Focus | Visible on every stop, in visual order. |
| Browsers | Safari differences: `backdrop-filter`, sticky, date inputs, scrollbar, font rendering. |

### Severity

| Level | Definition | Example | Ship? |
| --- | --- | --- | --- |
| **S1 blocking** | Broken, unusable, inaccessible, or wrong information | Button hidden at 320px; text invisible in dark mode; no focus ring | No |
| **S2 major** | Clearly visible mismatch that changes meaning or hierarchy | Wrong heading size; missing error state; wrong token for destructive | Not without sign-off |
| **S3 minor** | Visible on inspection, does not change meaning | Gap 12 instead of 16; icon 1px low | Yes, fix next |
| **S4 nit** | Only visible in overlay | Subpixel offset, antialiasing | Log or drop |

Grade by effect, not by size: a 1px border missing on an input that then disappears
in dark mode is S1.

### Tolerances

- Differences caused by snapping to a token are correct. Log them as design debt if
  the design used an off-scale value.
- Pixel diffs: expect ~0.1–2% noise from font rendering and antialiasing. Investigate
  regions, not totals.
- Copy differences are always findings. Either the build is wrong or the design is
  stale; the report says which is the source of truth.

### Visual regression

For component libraries, make this automatic: every Storybook story snapshotted by
Chromatic on each pull request, reviewed and approved there. For pages, Playwright's
`toHaveScreenshot()` with a stable seed and `animations: "disabled"`. Keep the
baseline images out of manual QA reports; the report is for people.

## Output

A report in the shape of [`templates/bug-report.md`](templates/bug-report.md):

- Header: build URL, commit, date, matrix covered, what was not covered.
- Failures only, grouped by screen, each with ID, severity, location (screen, state,
  breakpoint, theme, browser, and `file:line` when known), expected, actual, evidence
  (paired screenshots), and suggested fix.
- A one-line verdict: **ready**, or **N blocking issues** (S1 count, then S2 count).

## Verify

The QA pass is done when:

- [ ] Every cell in the matrix was captured, or listed as not covered with a reason
- [ ] 320px and dark mode were checked for every screen
- [ ] 200% zoom, long content, and ~30% expansion were checked on at least the
      densest screen
- [ ] Every state the design specifies was opened in the build
- [ ] Motion was compared at 0.25x speed and with reduced motion on
- [ ] Keyboard focus was walked on every screen
- [ ] Every finding has severity, location, expected, actual, and a screenshot pair
- [ ] Every expected value names a token or a frame, not "as designed"
- [ ] The report contains no passing items
- [ ] The report ends with a verdict

Delegate the comparison to the `visual-qa-reviewer` subagent when there are many
screens: give it the capture folder and the Figma references; it reports failures
only and ends with a verdict. Send focus and contrast findings to the
`accessibility-auditor` subagent and suspected raw values in code to the
`token-auditor` subagent.

## Anti-patterns

- Checking only at 1440 in light mode with the design's sample copy
- "Doesn't match Figma" with no expected value, location, or screenshot
- Filing subpixel antialiasing as a bug while the 320px layout overflows
- Reports that list every passing check, burying the three that failed
- Pixel-diff percentages as the verdict instead of reviewed regions
- Comparing against a Figma frame that changed after handoff without saying so
- Filing token-snapping differences as bugs
- Logging design gaps (no empty state designed) as engineering bugs; they go back to
  design with the finding

## Related skills

- **Feeds from:** `design-to-code` (the build), `design-handoff` (the acceptance
  criteria and states)
- **Leads to:** `interface-polish` (after fidelity is right), `accessibility-review`
  (for anything beyond focus and contrast), `design-system-audit` (when the same
  mismatch appears across many screens)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Figma MCP**: `get_screenshot` for references, `get_variable_defs` for expected values.
- **Polypane**: many synchronized viewports, overlays, and zoom in one window.
- **Chromatic** and **Storybook**: automated visual regression per story.
- **axe DevTools**: catch contrast and focus failures during the same pass.
- **Rauno Freiberg, Interaction Guidelines**: states and details that designs often
  leave implicit.

From [`FIBO.md`](../../FIBO.md): Chromatic snapshots of every story on pull requests
as the model for automated regression, and the definition of done that requires
opening each part in both themes and walking the keyboard path.
