---
name: wireframing
description: >-
  Produces low-fidelity wireframes that explore three or more structurally different
  concept directions, with annotated decisions, as quick HTML or in Figma. Use for
  "wireframe this", "sketch some options", "lo-fi mockups", "explore layouts",
  "crazy 8s", "concept directions", or "what could this screen look like". Not for
  refining spacing and hierarchy on a chosen direction (use layout-and-hierarchy) or
  deciding what content and navigation exist (use information-architecture).
---

# Wireframing

A wireframe is a cheap argument about structure. Its job is to make a few genuinely
different bets visible early, while changing direction still costs minutes, and to
record why each choice was made. The output is a set of 3+ distinct concept
directions at low fidelity, annotated, with a recommendation on which to take forward
and what would have to be true for it to win.

## When to use

- A brief exists and nobody has drawn anything yet
- The team is converging on the first idea without having seen a second
- A redesign where the current structure may be the problem, not the styling
- A stakeholder asks "can we see some options"
- Before usability testing, to have 2–3 concepts to compare

**Not for:** deciding the sitemap, object model, or navigation labels (use
`information-architecture` first), polishing spacing and type on a chosen direction
(use `layout-and-hierarchy`), or final visual design (use `interface-polish`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **The brief**: problem, audience, success metric [ask for one sentence each; if
  none, write a one-line assumed brief and state it]
- **Primary task**: the one thing a person must accomplish on this screen or flow
  [infer from the brief; state the guess]
- **Content inventory**: real fields, labels, and data the screen must hold [pull
  from the codebase, API responses, or `information-architecture` output]
- **Constraints**: platform, viewport, existing design system, technical limits
  [web, 1440 and 390 widths, no system constraints at lo-fi]
- **Reference material**: competitor or pattern screens [run `reference-research`,
  or search the Mobbin MCP if connected; if not, say so and continue]
- **Output medium**: HTML, Figma, or both [HTML; Figma if the Figma MCP is connected
  and the team works there]

## Process

1. **Restate the problem as a design question.** One sentence, "How might we help
   {person} {do task} when {constraint}?", plus the primary task and 1–2 secondary
   tasks. Model: the "Design question" block of
   [`templates/concept-sheet.md`](templates/concept-sheet.md). Copy that shape.
2. **Run a crazy 8s pass.** Eight thumbnail ideas, fast, no filtering. On paper this
   is the Google Ventures Design Sprint exercise: one sheet folded into eight panels,
   one minute per panel. As an agent, write eight one-line concepts, each naming a
   different structural bet from "Axes of divergence" below. Output: the eight lines
   in the concept sheet.
3. **Pick 3–4 directions that differ on at least two axes.** Discard any pair that
   differs only in styling, ordering, or column count. Name each by its bet
   ("Inbox-first", "Map-first", "Guided wizard"), never "Option A". Output: named
   directions, one-sentence bet each.
4. **Wireframe the key screen of each direction.** Same content, same fidelity, same
   viewport, so the comparison is fair. Add the one or two adjacent states the bet
   depends on (empty, error, or the next step). Model:
   [`references/html-wireframe-kit.md`](references/html-wireframe-kit.md) for HTML.
   Copy that shape: its tokens enforce the fidelity rules. In Figma, see "Tools" below.
   Output: 3–4 frames per viewport.
5. **Annotate decisions.** Numbered pins on the frame, each tied to a note: what the
   element is, why it is there, what it assumes. Open questions marked separately.
   Model: the `.pin` and `.notes` markup in the wireframe kit. Output: annotated frames.
6. **Compare against the brief.** Directions against the primary task, the success
   metric, the riskiest assumption, and build cost. Model: the "Comparison" table in
   the concept sheet; for how to write up rejected directions, Fibo's theme creator
   plan (see [`FIBO.md`](../../FIBO.md)), which records three layouts tried and why
   the shipped one won. Output: comparison table and a recommendation, or a proposal
   to test two directions against each other.
7. **Decide the next fidelity step** using "When to go hi-fi". Output: one line
   naming what happens next and which skill takes it.

### Tools

- **HTML (default).** One self-contained file with all directions side by side on one
  board. Plain HTML and CSS grid, no framework. Screenshot with Playwright at 1440 and
  390 widths if the browser is available.
- **Figma MCP.** If connected, load the `figma-use` skill before calling `use_figma`.
  One page named "Wireframes – {date}", one section per direction, frames at 1440 and
  390, auto layout so content length changes reflow. Plain rectangles and text, not
  library components, unless the direction is being built mid-fi. Annotations in
  their own layer group so they can be hidden. If not connected, say so in one line
  and produce HTML.
- **Mobbin MCP.** If connected, search real flows for each axis position before
  committing (for example "onboarding wizard" vs "checklist onboarding").

## Standards

### Axes of divergence

Two directions are different only if they differ on at least two of these:

| Axis | Genuinely different positions |
| --- | --- |
| Primary object | List of items / single item detail / timeline / map / canvas |
| Entry point | Search-first / browse-first / recommendation-first / blank create |
| Navigation model | Tabs / sidebar / hub-and-spoke / linear steps / command menu |
| Interaction model | Direct manipulation / form / conversation / wizard / inline edit |
| Density | One thing per screen / dashboard of many / progressive disclosure |
| Automation | Person does it / system suggests / system does it and asks to confirm |

"Same layout with the filter on the left instead of the top" is a variation, not a
direction. Variations belong in `layout-and-hierarchy` once a direction is chosen.

### Lo-fi fidelity rules

- **Grayscale only.** Three grays at most: a fill (`#f2f2f2`), a stroke (`#bdbdbd`),
  and text (`#333`). One accent color, reserved for annotations, never for UI.
- **One typeface, three sizes.** System sans at roughly 14, 18, and 28px. Regular
  and bold only.
- **Real content, not lorem ipsum.** Real labels, realistic names, realistic lengths,
  including the longest one. Lorem hides the overflow and truncation problems
  wireframes exist to find.
- **Boxes for media.** A rectangle with a cross or the word "Image" and its aspect
  ratio. No stock photos; icons only as simple glyphs.
- **Actual widths.** Draw at the real viewport (1440 or 1280 desktop, 390 mobile).
- **No shadows, radii, gradients, or brand.** If a reviewer comments on color, the
  fidelity is too high for this stage.
- **Every interactive element carries its verb** ("Save draft", not "Button").

### When to go hi-fi

Move up in fidelity when one or more of these is true:

- A direction has been chosen and its structure survived a critique or a test round
- The decision depends on visual detail: data density, scannability of a table,
  legibility of a chart, brand expression on a landing page
- Testing needs realism: people must believe it to behave naturally (checkout, pricing)
- A design system already exists (Fibo, or the project's own), so mid-fi with real
  components costs no more than gray boxes

Stay lo-fi while the team still disagrees about what the screen is for, or when the
next step is a stakeholder decision between directions. Polished frames get approved
on looks, not on structure.

### Annotation format

- Numbered pins in the accent color, 1–n per frame, top-left to bottom-right
- Each note: **what** (element), **why** (the decision and the need it serves),
  **assumes** (what must be true), and optionally **open** (a question to resolve)
- 1–3 lines per note. A paragraph means the decision is not yet made.

## Output

A concept sheet using [`templates/concept-sheet.md`](templates/concept-sheet.md),
plus the frames (an HTML file or a Figma link). The sheet holds the design question,
the crazy 8s list, each named direction with its bet and annotations, the comparison
table, and the recommendation.

## Verify

Done means every check passes. Open the board at 1440 and 390 and look, then:

- [ ] At least three directions, each differing from every other on two or more axes
      (write the two axes next to each pair; if you cannot, merge them)
- [ ] Each direction is named for its bet
- [ ] All directions use the same content and the same viewport
- [ ] Real content, including the longest realistic label and an empty state
- [ ] Grayscale, one typeface, no brand styling; accent color only on pins
- [ ] Every interactive element has a verb label
- [ ] Every non-obvious element has a numbered annotation with a "why"
- [ ] The riskiest assumption is named for each direction
- [ ] A recommendation, or a test plan to choose between two directions
- [ ] Mobile and desktop both drawn for at least the recommended direction
- [ ] Screenshot with annotations hidden (`body.annotations-hidden`) still reads

Then delegate to the `design-critic` subagent with the concept sheet and frames. It
reports only failures, each with the direction and frame, and ends with a verdict.
Fix blocking issues before presenting.

## Anti-patterns

- Three "options" that are the same layout with the sidebar moved
- One strong direction and two strawmen designed to lose
- Lorem ipsum and "Title goes here", which hide overflow and truncation
- Wireframes at pixel-perfect fidelity, which invite color debates and discourage
  throwing work away
- Only the happy path; the empty and error states are often where a direction fails
- Annotations that describe what is visible ("this is a header") instead of why
- Jumping from wireframes straight to handoff without a critique or test round
- Skipping mobile because "we'll make it responsive later"

## Related skills

- **Feeds from:** `design-brief` (the problem), `information-architecture` (content
  and navigation), `reference-research` (patterns to borrow or avoid)
- **Leads to:** `design-critique` (review the directions), `usability-testing`
  (compare two directions), `layout-and-hierarchy` (refine the chosen one),
  `ux-writing` (replace placeholder labels)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Mobbin** and **Page Flows**: real screens and full flows, to see where shipped
  products sit on each axis.
- **UI Patterns**: problem/solution framing for choosing an interaction model.
- **Refero**: pattern-tagged reference for the key screen.
- **Nielsen Norman Group**: articles on prototype fidelity and sketching.
- **Figma MCP**: writing frames directly into the team's file.
- **v0**: a fast first structural draft to react to; strip its styling back to lo-fi
  before comparing it with the other directions.

From [`FIBO.md`](../../FIBO.md):
- **Decision records (`plans/`)**, especially the theme creator plan: the model for
  writing up directions that were tried and rejected, with the reason.
