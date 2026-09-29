# Accessibility audit: {Product / feature}

**Date:** {date} · **Auditor:** {name or agent} · **Target:** WCAG 2.2 Level AA
**Build:** {URL, commit, or Figma file + version}

## Scope

| Task / template | Pages and states covered |
| --- | --- |
| {Sign up} | {/signup default, validation errors, email-sent confirmation} |
| {Global header and nav} | {desktop, mobile menu open} |
| {Dialogs} | {Delete project, Invite member} |

Out of scope: {…}

## Environment and method

- **Automated:** {axe DevTools x.y / @axe-core/playwright x.y}, on every page and state above
- **Manual:** keyboard only; 200% text zoom; 400% page zoom (320 CSS px); text spacing
  override; reduced motion; light and dark themes
- **Screen readers:** {VoiceOver + Safari macOS {version}}, {NVDA {version} + Chrome}
- **Contrast:** {tool}; WCAG 2 ratio for conformance, APCA Lc as a second check

## Failures

Failures only, sorted by severity. Blocking = Critical or Serious.

| # | Severity | WCAG | Location | Observation | Fix |
| --- | --- | --- | --- | --- | --- |
| 1 | Critical | 2.1.2 No Keyboard Trap (A) | Invite member dialog, /settings/team | Focus cannot leave the role select with Tab or Escape | Use a native `<select>` or a listbox that handles Escape and Tab per APG |
| 2 | Serious | 1.4.3 Contrast (Minimum) (AA) | Helper text under all inputs, `input.tsx:42` | `#9ca3af` on `#ffffff` measures 2.5:1 | Use the muted-foreground token at 4.5:1 or higher |
| 3 | Serious | 2.4.11 Focus Not Obscured (Minimum) (AA) | /pricing, FAQ links under sticky header | Focused links scroll under the 72px sticky header | Add `scroll-padding-top: 80px` to `html` |
| 4 | Moderate | 1.3.1 Info and Relationships (A) | /signup, "Plan" radio group | Group label not announced; no `fieldset`/`legend` | Wrap in `fieldset` with `legend` "Plan" |
| 5 | Minor | 1.1.1 Non-text Content (A) | Footer social icons | Decorative divider icon announced as "image" | Add `aria-hidden="true"` |

Severity: Critical (blocks a task for a group of users) · Serious (major difficulty,
or AA failure on a core task) · Moderate (workaround exists) · Minor (annoyance or
best practice).

## Summary by criterion

| WCAG criterion | Level | Failures | Highest severity |
| --- | --- | --- | --- |
| 1.4.3 Contrast (Minimum) | AA | {n} | {…} |
| 2.1.2 No Keyboard Trap | A | {n} | {…} |

## Not tested

- {Anything in scope that could not be tested, and why (e.g. payment iframe from a third party)}

## Verdict

{Ready | N blocking issues}
