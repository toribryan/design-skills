---
name: design-critique
description: >-
  Runs a structured critique of a screen or flow: frames the goal and stage, walks
  Nielsen's 10 heuristics plus hierarchy, clarity, consistency, and craft passes, and
  reports each issue with a location, a 0–4 severity, and observation, impact, and
  suggestion. Works from screenshots, Figma links, or live URLs. Use for "critique
  this", "review my design", "what's wrong with this screen", "heuristic evaluation",
  or "feedback on this flow". Not for testing with real users (use usability-testing)
  or a WCAG audit (use accessibility-review).
---

# Design Critique

A critique is a structured look at a design against its goal, done by someone who is
not its author. It finds problems a person would hit, ranks them, and says what to do
about each one. It is not a verdict on taste. The output is a critique report that
lists only issues, each pinned to a screen and region, rated 0–4, and phrased as
observation, impact, suggestion, ending in a one-line verdict.

## When to use

- A design is ready for review at any stage: wireframe, mid-fi, hi-fi, or shipped
- A heuristic evaluation before, or instead of, a usability test
- A flow "feels off" and the team wants specific, ranked problems
- Reviewing a competitor or a reference to learn from it
- Self-review before presenting work

**Not for:** watching real people use the design (use `usability-testing`), a
conformance audit against WCAG (use `accessibility-review`), or pixel comparison
against a spec (use `visual-qa`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **The design**: screenshots, a Figma link, or a live URL [ask; this is required]
- **Goal**: what the screen or flow must achieve, and for whom [infer from the
  content; state the assumption at the top of the report]
- **Stage**: exploration, refinement, or pre-ship [infer from fidelity: gray boxes
  mean exploration]
- **Feedback wanted**: what the author wants reviewed, and what is out of scope
  [everything that matters at this stage]
- **Constraints**: platform, design system, deadlines, decisions already locked
  [none locked]
- **Primary task** to walk through [the most common task implied by the goal]

## Process

1. **Frame the critique.** Write goal, audience, stage, primary task, feedback
   wanted, and what is out of scope. Stage sets depth: at exploration, critique
   structure and concept only; at pre-ship, everything including craft. Model: the
   "Framing" block of [`templates/critique-report.md`](templates/critique-report.md).
   Copy that shape.
2. **Capture the design.** One image per screen and state, named by flow step.
   - Figma MCP: `get_screenshot` on each frame's node id; `get_metadata` to list
     frames in a section. Load `get_design_context` only if you need values.
   - Live URL: Playwright screenshots at 1440 and 390, plus the states you can reach
     (empty, error, loading, hover, focus).
   - Screenshots: use as given; note which states are missing.
   If a tool is not connected, say so in one line and work from what you have.
   Output: an ordered list of captured screens with ids.
3. **Walk the primary task.** Step through it as the target person would, screen by
   screen. At each step ask: do I know where I am, what I can do, and what will
   happen? Output: the step list with every hesitation point marked.
4. **Heuristic pass.** Check each screen against Nielsen's 10 usability heuristics.
   Model: [`references/heuristics.md`](references/heuristics.md), which lists what to
   look for and common violations per heuristic. Output: issues tagged H1–H10.
5. **Hierarchy pass.** Squint test each screen: does the most important element read
   first? Is there one primary action per view? Output: issues tagged "Hierarchy".
6. **Clarity pass.** Labels, copy, icons without text, jargon, ambiguous states.
   Output: issues tagged "Clarity".
7. **Consistency pass.** Same thing looks and behaves the same across screens and
   matches the design system and platform conventions. Output: issues tagged
   "Consistency".
8. **Craft pass** (refinement and pre-ship only). Alignment, off-scale spacing,
   contrast, truncation, missing states, focus styles. Output: issues tagged "Craft".
9. **Rate and phrase.** Merge duplicates, rate each issue 0–4, phrase as observation,
   impact, suggestion. Output: the issue list, sorted by severity.
10. **Write the verdict.** "Ready", or "N blocking issues" where blocking means
    severity 3–4. Output: the report.

## Standards

### Severity (Nielsen's 0–4 scale)

| Rating | Meaning | Blocking? | Action |
| --- | --- | --- | --- |
| 4 | Usability catastrophe: people cannot complete the task, or lose data or money | Yes | Fix before release |
| 3 | Major: people are slowed or confused often, or some fail | Yes | Fix before release, high priority |
| 2 | Minor: noticeable friction, people recover on their own | No | Fix soon |
| 1 | Cosmetic: noticed by few, no effect on completion | No | Fix if time allows |
| 0 | Not a usability problem | n/a | Do not report |

Nielsen rates severity from three factors: **frequency** (how many people hit it),
**impact** (how hard it is to overcome), and **persistence** (once, or every time).
Write the factor that drove the rating when it is not obvious. Do not inflate:
a report with ten severity-4s gets ignored.

### Feedback phrasing

Every issue has three parts, in this order:

- **Observation:** what is on screen, factually. "The 'Continue' button is below the
  fold at 390px width."
- **Impact:** what it does to the person or the goal. "On mobile, people who finish
  the form see no way forward and may think the form is broken."
- **Suggestion:** one concrete direction, not a redesign. "Make the button sticky at
  the bottom of the viewport, or reduce the form to fit."

Rules:
- Tie impact to the goal or the person, never to taste. "I don't like the blue" is
  not an issue; "the link blue and the error red are hard to tell apart for people
  with protanopia" is.
- One issue per entry. If an entry says "also", split it.
- Suggestions are optional directions, not specs. The author owns the fix.
- Ask a question when intent is unclear: "Is the secondary nav meant to be hidden
  on mobile?" Log it under open questions, not as an issue.

### Location

Every issue names where it is: flow step and screen name, plus region ("Checkout /
Payment, order summary card") or Figma node id, or URL and breakpoint. An issue
without a location cannot be fixed or verified.

### Depth by stage

| Stage | Critique | Skip |
| --- | --- | --- |
| Exploration (lo-fi) | Concept fit, task flow, structure, missing states | Visual craft, copy polish |
| Refinement (mid/hi-fi) | All heuristics, hierarchy, clarity, consistency | Pixel-level craft |
| Pre-ship (hi-fi or live) | Everything, including craft and edge cases | Nothing |

## Output

A critique report using
[`templates/critique-report.md`](templates/critique-report.md): framing, the screens
reviewed, the issue table (failures only, sorted by severity, each with location,
tag, severity, observation, impact, suggestion), open questions, and a one-line
verdict. Do not list what works; the report is a to-do list.

## Verify

Done means every check passes:

- [ ] Framing states goal, stage, primary task, and feedback wanted
- [ ] Every screen and state in scope was captured and walked
- [ ] Every issue has a location specific enough to find in under 10 seconds
- [ ] Every issue has observation, impact, and suggestion; impact names a person or
      the goal, not a preference
- [ ] Every issue has a severity 1–4 and a tag (H1–H10, Hierarchy, Clarity,
      Consistency, Craft)
- [ ] No duplicates; no issue contains "also"
- [ ] Depth matches the stage (no pixel nits on a wireframe)
- [ ] The report ends with one line: `Ready` or `N blocking issues` (count of 3s
      and 4s)

For an independent read, delegate to the `design-critic` subagent with the captured
screens and framing; merge its findings with yours and keep the higher severity on
conflicts. If the design is pre-ship, also delegate to the `accessibility-auditor`
subagent, and to the `copy-reviewer` subagent when clarity issues cluster in copy.

## Anti-patterns

- Opening with praise to soften the issues, or listing strengths as filler
- "Make it pop", "feels cluttered", "not intuitive" with no observation behind it
- Redesigning the screen inside the critique instead of naming the problem
- Taste presented as a usability issue
- Every issue rated 3 or 4, so nothing is prioritized
- Critiquing color and type on a gray wireframe
- Reviewing only the happy path; no empty, error, loading, or long-content states
- Issues without locations ("somewhere in settings the labels are inconsistent")
- Citing a heuristic by number without explaining how the design violates it

## Related skills

- **Feeds from:** `wireframing`, `layout-and-hierarchy`, `interface-polish`, or any
  shipped screen
- **Leads to:** `usability-testing` (confirm the severity-3+ issues with real people),
  `accessibility-review`, `ux-writing` (copy issues), `interface-polish` (craft issues)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Nielsen Norman Group**: the 10 usability heuristics (Nielsen, 1994), the
  severity rating method, and "How to conduct a heuristic evaluation" (3–5
  evaluators find most issues; one finds about 35%).
- **Laws of UX**: named principles (Hick's, Fitts's, Jakob's Law) to explain impact.
- **Refactoring UI**: vocabulary for hierarchy and craft issues.
- **Mobbin** and **Page Flows**: how shipped products solve the same step, to ground
  a suggestion in precedent.
- **Good UI**: evidence from A/B tests when a suggestion needs support.

From [`FIBO.md`](../../FIBO.md):
- **Read-only reviewer (`component-reviewer`)**: the report shape this skill copies:
  failures only, each with a location, ending in a one-line verdict.
