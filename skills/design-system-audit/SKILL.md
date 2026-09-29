---
name: design-system-audit
description: >-
  Audits a product or design system for consistency and drift: an interface
  inventory, codebase greps for hard-coded colors, opacity modifiers, primitive
  tokens and off-scale type, Figma-to-code drift, per-component review, and a
  prioritized roadmap. Reports only failures with file and line and ends in a
  verdict. Use for "audit our design system", "how consistent is our UI", "find
  hard-coded colors", "design debt", "Figma and code don't match", or "where do
  we start with a design system". Not for fixing one component; use
  component-api-design. Not for a WCAG audit; use accessibility-review.
---

# Design System Audit

An audit measures the distance between what the system says and what the
product does. It counts things (colors, font sizes, button styles, radius
values), finds where code and Figma disagree, reviews components against the
house conventions, and turns the findings into a short, ordered roadmap. The
standard: every finding has a location (file and line, or screen and frame) and
a fix; the report lists failures only; and it ends in a one-line verdict,
`ready` or `N blocking issues`.

## When to use

- Before starting a design system, to size the work and find the real patterns
- Before a release or a rebrand, to find what will not follow a token change
- Figma and code have visibly drifted
- A new team inherits a UI and needs to know what is load-bearing
- Periodically (each quarter) on an existing system

**Not for:** redesigning one component (use `component-api-design`), a full
WCAG conformance audit (use `accessibility-review`), a craft pass on one screen
(use `interface-polish`), or reviewing docs pages alone (use `design-system-docs`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Scope**: [every component directory, plus the three most-used product screens]
- **Conventions**: the project's `AGENTS.md`, `CONTRIBUTING.md`, token source.
  If the project has none, audit against Fibo's `AGENTS.md` as the default rules
  and say so in the report.
- **Token source**: `globals.css`, `tokens/*.json`, `tailwind.config.*`, `@theme`.
- **Figma library**: via the Figma MCP (`get_variable_defs`, `get_metadata`,
  `search_design_system`) if connected. If not, say so and audit code only.
- **Running product**: a URL or dev server for screenshots. With Playwright,
  capture; without it, ask for screenshots or skip the visual inventory.

## Process

1. **Interface inventory.** Screenshot every instance of each pattern across the
   product (buttons, inputs, cards, modals, colors, type, icons) and group them
   on one board per pattern, after Brad Frost's interface inventory. Output: one
   board per pattern with a count of distinct versions.
2. **Codebase greps.** Run the greps in [`references/greps.md`](references/greps.md)
   over the scope. Output: counts per check and the file:line list.
3. **Token drift.** Compare token names and values between code and Figma, per
   mode. Output: three lists: Figma only, code only, same name with different values.
4. **Component review.** For each component in scope, run the checklist in
   Standards (generalized from Fibo's `component-reviewer`). Output: failures
   with file and line, per component.
5. **Accessibility sample.** Keyboard through the three main flows; run axe on
   each. Output: blocking failures only; hand the rest to `accessibility-review`.
6. **Prioritize.** Score each finding by reach (how many instances) and risk
   (does a user or a consumer hit it). Output: a roadmap in three horizons.
7. **Write the report.** Model: [`templates/audit-report.md`](templates/audit-report.md).
   Copy that shape. Output: the report, ending in the verdict.

## Standards

### What to count, and healthy ranges

| Measure | Healthy | Finding when |
| --- | --- | --- |
| Distinct text colors in product code | 3–6 roles | Over 10 literals or classes |
| Distinct font sizes | 6–9 | Over 10 |
| Distinct radius values | 4–7, from one knob | Literals outside the scale |
| Button looks (variant × size) | Matches the documented set | Any undocumented look |
| Hex/rgb/hsl/oklch literals in components | 0 | Any, outside documented exceptions |
| Opacity modifiers on token colors | 0 (if the system names alpha roles) | Any |
| Primitive ramp classes in components | 0 | Any |
| Arbitrary values (`-[13px]`) | Only with a comment saying why | Uncommented |
| `dark:` overrides in components | 0–2, each commented | Uncommented, or using primitives |
| Icon libraries | 1 | 2 or more |

### Component review checklist

Report only failures, each with file and line, tagged blocking or minor.

1. **Tier.** Sits in the right shelf or tier; imports nothing that tier forbids.
2. **Tokens.** Semantic tokens only. No primitives, literals, or opacity modifiers.
3. **Structure.** House naming, a part marker (`data-slot`) on the root and parts,
   project import aliases, a doc comment on every prop.
4. **API.** Closed variant sets, no impossible boolean combinations, state via
   ARIA and data attributes, controlled and uncontrolled both work.
5. **States.** Default, hover, focus-visible, active, disabled, plus invalid,
   selected, open and loading where relevant.
6. **Accessibility.** Keyboard reachable, visible focus ring at 3:1, names on
   icon-only controls, native or primitive semantics, reduced motion honored.
7. **Stories.** Args-driven `Default`, a story per meaningful variant, `play`
   functions on interactive parts covering pointer and keyboard.
8. **Docs.** A page exists, sections in house order, every part marker in the
   data attributes table.
9. **Tests.** Logic a story cannot show has a unit test.
10. **Figma parity.** The Figma component exists, and its properties match the
    code props by name and value.

### Severity

- **Blocking:** a user or a consuming engineer hits it: an accessibility failure,
  a broken or misleading API, a literal that will not follow a theme change, a
  token that exists on one side only.
- **Minor:** house style: naming, comment quality, story completeness.

### Prioritizing

| Horizon | Contains | Size |
| --- | --- | --- |
| **Now** (this sprint) | Blocking findings with high reach | 5–10 items |
| **Next** (this quarter) | Blocking with low reach; minor with high reach; consolidations (7 buttons into 1) | 10–20 items |
| **Later** | Minor, low reach; docs and story gaps | The rest |

Fix at the source: one fix in `Button` beats 40 fixes at call sites. Count a
consolidation as one item with its instance count.

## Worked example: Fibo

The component review checklist is generalized from Fibo's
[`.claude/agents/component-reviewer.md`](https://github.com/toribryan/fibo/blob/main/.claude/agents/component-reviewer.md):
eight checks (shelf, tokens, structure, accessibility, stories, docs page, tests,
comments), "Report only the ones that fail, with file and line", and "End with a
one-line verdict: ready, or the number of blocking issues."

Running the greps in `references/greps.md` over Fibo's `packages/ui/src` (excluding
stories and tests) returns:

- **Hex literals in components:** none.
- **Primitive ramp classes in components:** none.
- **Opacity modifiers:** none in components. Two hits in `styles/globals.css`: line
  107 is inside the comment explaining the rule, and line 301 is `outline-ring/50`
  in the base layer's `* { @apply border-border outline-ring/50; }`. A grep cannot
  tell a rule from its documentation; the auditor decides whether base-layer
  defaults are in scope and records the decision.
- **Font sizes:** `text-sm` 21, `text-xs` 14, `text-base` 3, `text-lg` 2, and three
  arbitrary sizes, all in special components: `text-[13px] leading-[18px]` in
  `chapter-scrubber.tsx:588`, `text-[10px]` in `token-flow.tsx:289`, `text-[9px]`
  in `token-flow.tsx:327`.
- **Color functions:** one, `rgb(0 0 0 / 0.18)` in `reactions.tsx:153`, a special
  component.
- **`dark:` overrides:** three, in `switch.tsx:29` (commented in the source),
  `checkbox.tsx:13` and `avatar.tsx:23`.

One Figma-to-code drift candidate shows up from reading, not grepping: the theme
creator's `figmaTokens()` in
[`theme.ts`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/lib/theme.ts)
exports radius `sm` to `2xl`, while `globals.css` defines up to `4xl` and
`Button` uses `rounded-4xl`. A designer importing those tokens has no variable
for the button's radius.

Whether the special-component findings block depends on the house rules: Fibo's
`AGENTS.md` allows special parts more freedom in dependencies, but its token
rules apply to every component. The report states a judgment like this outright
instead of leaving it to the reader.

## Output

- The audit report from [`templates/audit-report.md`](templates/audit-report.md):
  scope, counts, failures only (with locations), drift lists, roadmap, verdict
- The inventory boards (Figma page or screenshots folder)
- The grep commands used, so the audit can be rerun and diffed next quarter

## Verify

**Checks that must pass**

- Every finding has a location (file:line, or screen and frame) and a fix.
- The report contains no passing items and no "looks good" sections.
- It ends in exactly one line: `ready`, or `N blocking issues`, where N equals the
  count of findings tagged blocking.
- Every grep in the report is written out so a second person gets the same counts.

**By hand**

- Spot-check five findings by opening the file at the line.
- Spot-check three inventory boards against the live product in light and dark.
- Confirm the roadmap's "Now" items are all blocking.

**Delegate** token checks to the `token-auditor`
([`agents/token-auditor.md`](../../agents/token-auditor.md)), each component to the
`component-reviewer` ([`agents/component-reviewer.md`](../../agents/component-reviewer.md)),
and the accessibility sample to the `accessibility-auditor`
([`agents/accessibility-auditor.md`](../../agents/accessibility-auditor.md)).
Merge their reports; keep their verdict format.

## Anti-patterns

- A 60-page report of everything checked, passing items included
- Findings with no location ("buttons are inconsistent")
- Counting hex values in the token file itself as violations
- Treating every arbitrary value as a failure without reading why it exists
- A roadmap sorted by what is easy instead of by reach and risk
- Auditing Figma only, or code only, and calling it a system audit
- Recommending a new design system when three consolidations would do
- Imposing another system's names (Fibo's included) on a project that has its own

## Related skills

- **Feeds from:** `design-tokens`, `component-api-design`, `design-system-docs`
  (the rules being audited against)
- **Leads to:** `design-tokens` and `color-system` (fixing token debt),
  `component-api-design` (consolidations), `accessibility-review`
- **Neighbors:** `visual-qa` (a build against its design), `interface-polish`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Design System Checklist**: a production-readiness list to audit against.
- **GitHub Primer** and **Atlassian Design**: what complete foundations and
  component docs look like, as the target state.
- **axe DevTools** and **Polypane**: the accessibility sample and multi-viewport capture.
- **Figma MCP**: reading variables and components for the drift lists.
- **Storybook** and **Chromatic**: which components have stories and snapshots.

From [`FIBO.md`](../../FIBO.md):
- **How Fibo works with agents**: the reviewer format this audit's checklist and
  verdict follow.
- **Principles**: the rules (achromatic, named alpha, measured contrast) an audit
  of a Fibo-based project checks.
