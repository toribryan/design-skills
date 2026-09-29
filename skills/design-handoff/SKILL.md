---
name: design-handoff
description: >-
  Produces a handoff package an engineer can build from without a meeting:
  annotated specs, every state and edge case, responsive behavior, interaction
  and motion specs, final content, accessibility notes (focus order, labels),
  tokens used, Figma Dev Mode and Code Connect setup, and acceptance criteria.
  Use for "prepare handoff", "dev handoff", "spec this for engineering",
  "annotate the design", "ready for dev", or "what does the engineer need".
  Not for building it yourself; use design-to-code. Not for checking the build
  afterward; use visual-qa.
---

# Design Handoff

A handoff is done when an engineer who was not in any of the design reviews can build
the feature correctly, and a reviewer can tell whether they did. That means the
package answers questions before anyone asks them: what happens with 200 items, what
the error says, where focus goes when the dialog closes, which token that gray is.
Most handoff failures are not missing pixels; they are missing decisions. This skill
finds the undecided parts, decides them or flags them, and packages the rest in one
place with acceptance criteria that make "done" checkable.

## When to use

- A design is approved and about to move to engineering
- An engineer keeps asking questions a spec should have answered
- Preparing a Figma file for Dev Mode
- Setting up Code Connect so Dev Mode shows real component code
- A designer who also builds wants a checklist for their own future self

**Not for:** implementing the design (use `design-to-code`), reviewing the build
against it (use `visual-qa`), or writing component documentation for a design
system (use `design-system-docs`).

## Inputs

- **The approved design**: Figma file and the frames in scope. [If only some frames
  are final, hand off those and list the rest as out of scope.]
- **The brief or ticket**: problem, success metric, constraints.
- **The codebase's system**: tokens, components, and whether Code Connect exists.
  [If unknown, check for `*.figma.tsx` files and `figma.config.json`.]
- **Who builds it**: the engineer, a team, or the designer. Depth changes; the
  checklist does not.
- **Deadline and release shape**: one release, or behind a flag in stages.

If the Figma MCP is connected, use `get_metadata` to list frames, `get_variable_defs`
to confirm every value is a variable, `get_code_connect_map` to see which components
are mapped, and `get_screenshot` for the images in the package. If not, say so and
work from exports.

## Process

1. **Hunt for undecided parts.** Walk every frame asking "what if": empty, one item,
   hundreds of items, long text, no permission, offline, slow, error, first use.
   Output: an open-questions list. Resolve each or mark it for the engineer to decide
   with a stated default. Model: [`references/edge-cases.md`](references/edge-cases.md).
   Copy that shape.
2. **Clean the file.** Every layer named, every value bound to a variable, every
   component a library instance, no detached instances, frames ordered by flow.
   Mark ready sections with Dev Mode's "Ready for dev" status. Output: a file that
   `get_variable_defs` resolves fully.
3. **Map components.** For each component in the design: existing in code (name it),
   new variant (describe the delta), or new component (spec its props). Connect the
   existing ones with Code Connect. Output: a component table.
4. **Specify states.** Every interactive element: default, hover, focus-visible,
   active, disabled, loading, error, and selected where relevant. Output: a state
   matrix, frames or table.
5. **Specify responsive behavior.** Frames at 390 and 1440 at minimum; describe what
   happens between (reflow, reorder, collapse, hide). Output: a breakpoint table.
6. **Specify interaction and motion.** Triggers, results, durations, easing, and
   reduced-motion fallback, in the project's motion tokens. Output: an interaction
   table. Model: the pattern map in
   [`../motion-language/templates/motion-spec.md`](../motion-language/templates/motion-spec.md).
7. **Finalize content.** Real copy for every string, including errors, empty states,
   confirmations, and tooltips. Output: a content table with keys if the product
   uses i18n.
8. **Write accessibility notes.** Focus order, accessible names for icon-only
   controls, headings and landmarks, live-region announcements, what focus does on
   open and close. Output: the accessibility section.
9. **Write acceptance criteria.** Testable statements, grouped by area. Output: a
   list the engineer and reviewer both check.
10. **Package it.** Fill [`templates/handoff.md`](templates/handoff.md), link it from
    the ticket and from the Figma page. Model for a real component spec: Fibo's
    [`button.mdx`](https://github.com/toribryan/fibo/blob/main/apps/storybook/src/components/button.mdx)
    for anatomy, data attributes, and accessibility sections. Copy that shape.

## Standards

### What a complete package contains

| Section | Must include |
| --- | --- |
| Overview | Problem, link to brief, scope in and out, release plan |
| Flow | Entry points, happy path, exits, with frame links |
| Components | Existing / variant / new, with code names and Code Connect status |
| Tokens | Every color, space, radius, type, shadow, motion token used, by name |
| States | Matrix for every interactive element |
| Edge cases | Empty, one, many, long, error, loading, permission, offline |
| Responsive | Behavior at each breakpoint, not just two frames |
| Interaction and motion | Trigger → result, duration token, easing token, reduced motion |
| Content | Every string, final, with character limits where layouts depend on them |
| Accessibility | Focus order, names, headings, announcements, target sizes |
| Acceptance criteria | Testable, one behavior each |
| Open questions | Owner and default for each |

### Annotation rules

- Annotate decisions, not measurements. Dev Mode shows `gap: 16`; the annotation says
  "gap stays 16 at every width; the list scrolls, the header does not".
- Every value is a token name. "#6B7280" in a spec is a defect. In Fibo-shaped
  systems the Figma variable and the CSS token share one name, so the spec, the
  file, and the code all say `muted-foreground`.
- No opacity-modified colors in the design. If the design needs a tint, make it a named
  role (`destructive-subtle`), because an engineer cannot reproduce "red at 10%" reliably.
- Use Figma's native annotations (Dev Mode) or a single annotation component. One
  style, one color, never overlapping the design.
- Number interactions (1, 2, 3) and reference those numbers in the interaction table.
- Mark anything intentionally different from the system and say why.

### Code Connect

- Map every system component used in the design to its code component, so Dev Mode
  shows `<Button variant="outline" size="sm">` instead of generated CSS.
- Map variant properties to props one to one. A Figma variant named `Type=Ghost`
  mapping to `variant="ghost"` is the goal; mismatches are a system bug to log.
- With the Figma MCP: `get_code_connect_suggestions` proposes mappings,
  `send_code_connect_mappings` or `add_code_connect_map` writes them.
- Without it: `*.figma.tsx` files published with the Code Connect CLI.

### Acceptance criteria

Write them as observable behavior, one per line, in the Given / When / Then shape or
plain statements that a reviewer can pass or fail:

- Given the list has 0 projects, the empty state shows "Create your first project"
  and the primary button opens the create dialog.
- When the dialog closes, focus returns to the button that opened it.
- At 390px, the filter bar collapses into a "Filters" button that opens a sheet.
- Project names longer than one line truncate with an ellipsis; the full name shows
  on hover and in the detail view.
- With reduced motion on, the sheet appears with a 150ms fade and no slide.

Bad: "Looks like the design." "Is accessible." "Responsive."

### Right-sizing

| Change | Package |
| --- | --- |
| Copy or token tweak | Ticket comment with before/after and the token names |
| New variant of an existing component | States, tokens, one acceptance list |
| New screen from existing parts | Full template minus component specs |
| New component or flow | Full template, plus component spec and Code Connect |

## Output

The filled [`templates/handoff.md`](templates/handoff.md), linked from the ticket and
pinned on the Figma page, plus the Figma file in a clean, "Ready for dev" state.

## Verify

The handoff is done when:

- [ ] Someone who was not in design reviews can read it and list zero questions
      that change what they would build (walk them through it or ask them to try)
- [ ] `get_variable_defs` on every handed-off frame returns variables only; no raw
      hex, no detached styles
- [ ] Every system component in the frames has a Code Connect mapping, or a listed
      reason it does not
- [ ] Every interactive element has all its states shown or explicitly listed as
      not applicable
- [ ] Every edge case in [`references/edge-cases.md`](references/edge-cases.md) is
      answered or marked not applicable
- [ ] Every string is final copy, including errors and empty states
- [ ] Focus order, accessible names, and open/close focus behavior are written down
- [ ] Motion uses motion tokens and states a reduced-motion fallback
- [ ] Every acceptance criterion can be passed or failed by watching the build
- [ ] Open questions have an owner and a default

Delegate the checks: the `token-auditor` subagent for untokenized values in the spec,
the `accessibility-auditor` subagent for the accessibility notes, and the
`copy-reviewer` subagent for the content table. Each reports failures only, with the
frame or section, and ends with a verdict.

## Anti-patterns

- A Figma link and "let me know if you have questions"
- Redlines on every pixel and no word about behavior
- Only the happy path at one width
- "Lorem ipsum" or "Error message here" in a handed-off frame
- Specs in three places (Figma comments, Slack, ticket) that disagree
- Detached instances that look like the system but are not
- Motion described as "smooth" or "snappy" instead of token names
- Accessibility left as "make it accessible"
- Acceptance criteria that restate the design ("matches Figma")
- Changing the design after handoff without versioning the package

## Related skills

- **Feeds from:** `design-brief`, `design-critique` (approval), `ux-writing` (content),
  `motion-language` (motion tokens), `design-tokens`
- **Leads to:** `design-to-code` (the build), `visual-qa` (checks against this
  package's acceptance criteria), `accessibility-review`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Figma MCP**: `get_variable_defs`, `get_code_connect_map`, and Code Connect writes.
- **GitHub Primer** and **Atlassian Design**: how mature systems document states,
  content, and accessibility per component.
- **Shopify Polaris**: content guidelines as part of a spec.
- **Inclusive Components**: the accessibility notes a handoff should carry per pattern.
- **Design System Checklist**: a readiness list to compare the package against.
- **Storybook**: when the handoff target is a component, stories are the spec.

From [`FIBO.md`](../../FIBO.md): "one name on both sides" (Figma variables and CSS
tokens match one to one), named `-subtle` roles instead of opacity, and `button.mdx`
as the model for anatomy, data attributes, and accessibility sections.
