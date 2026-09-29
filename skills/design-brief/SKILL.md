---
name: design-brief
description: >-
  Turns discovery and research into a design brief: problem, audience, jobs to be
  done, success metrics (leading and lagging, HEART), constraints, scope and
  non-goals, risks, timeline, open questions, and options considered with the choice
  made. Use for "write a brief", "design brief", "PRD for design", "define success
  metrics", "what's in scope", or "document this decision". Not for framing an unclear
  problem (use design-discovery) or handing finished designs to engineering (use
  design-handoff).
---

# Design Brief

A brief is the contract between the people asking for the work and the people doing
it. It says what problem is being solved, for whom, how success will be measured, what
is deliberately left out, and what options were weighed. A good brief is short enough
to read in five minutes and specific enough that two designers working from it would
solve the same problem, even if they drew different answers. Keep it after the work
ships; it is the record of why the design looks the way it does.

## When to use

- Discovery is done and the team is about to start designing
- A project has started without a written problem, metric, or scope
- Stakeholders keep adding requirements mid-project
- A design decision with real alternatives needs a written record
- A contractor, agency, or new team member needs to pick up the work

**Not for:** framing a problem nobody understands yet (use `design-discovery`),
documenting the finished design for engineering (use `design-handoff`), or a case study
written after launch (use `design-case-study`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Discovery one-pager**: problem statement, assumption map, alignment gaps [run
  `design-discovery` first; if there is no time, write a one-paragraph problem and mark
  every claim "assumed"]
- **Research synthesis**: insights, job stories, vocabulary [from `user-research`; if
  none, list the job stories as assumptions]
- **Reference research**: conventions and principles [from `reference-research`;
  optional]
- **Baseline metrics**: current values for anything the brief will promise to move
  [ask data or analytics; if unknown, the first milestone is measuring it]
- **Constraints**: date, budget, platforms, design system, legal, technical [ask
  engineering; default to the existing system and current platforms]
- **Decision-maker**: one named person who approves the brief [ask; a brief with
  several approvers has none]

## Process

1. **Number the brief.** Briefs live in one folder, numbered in order and never reused,
   so a brief can be cited from a ticket or pull request by number alone (Fibo's
   `plans/` convention). Output: `briefs/NNN-short-name.md`.
2. **State what is changing and why now.** Two short paragraphs. What will be different
   for people when this ships, and what trigger makes it worth doing this quarter.
   Model: [`templates/design-brief.md`](templates/design-brief.md), sections 1–2; copy
   that shape. Output: those two sections.
3. **Write the problem and audience.** Carry the problem statement from discovery; do
   not rewrite it from memory. Name the primary audience and at most one secondary.
   Output: problem, audience, and 1–3 job stories with evidence counts.
4. **Define success.** Pick HEART categories that matter for this work, then derive
   goals, signals, and metrics. Set one primary metric, 1–3 secondary metrics, and at
   least one guardrail. Read [`references/heart-metrics.md`](references/heart-metrics.md)
   before choosing. Output: a metrics table with baselines and targets.
5. **Set scope.** In scope, non-goals, and "not now" items. Non-goals are things a
   reasonable person would expect in scope that you deliberately exclude.
   Output: three lists.
6. **List constraints and risks.** Constraints are fixed; risks are uncertain. For each
   risk, give likelihood, impact, and a mitigation or an owner. Output: two tables.
7. **Record options and the choice.** At least two real options (doing nothing counts),
   each with what it is, what it costs, and why it was chosen or rejected. Model the
   section on Fibo's plans: bold decision name, the options, then "Chosen:" with the
   reason. Output: an options-and-choices section.
8. **Set the timeline.** Milestones with dates and a review at each: brief sign-off,
   concepts, critique, test, handoff. Output: a milestone table.
9. **List open questions.** Each with an owner, an answer-by date, and what happens if
   it is not answered. Output: the open-questions table.
10. **Get sign-off.** The decision-maker approves in writing. Add any later change to
    the change log at the bottom, dated, with the reason. Output: an approved
    brief.

## Standards

### Length and shape

- 1–3 pages. A brief longer than that is usually a spec or a research report in
  disguise; move the detail to an appendix or link it.
- Every claim about users cites evidence (research insight, metric, ticket count) or is
  marked "assumed".
- Sentence case headings, plain language, no feature names in the problem section.

### Metrics

- **One primary metric.** If the team cannot pick one, the goal is not decided.
- **Leading and lagging.** Lagging metrics (retention, revenue, churn) prove the outcome
  but move slowly, often over a quarter. Leading metrics (task success, time to first
  value, activation step completion) move within days and predict the lagging ones. A
  brief needs at least one of each.
- **Baselines before targets.** A target without a baseline ("increase activation") is
  a wish. Write "raise week-1 activation from 34% to 40% within 8 weeks of launch".
- **Guardrails.** A metric that must not get worse (support tickets per 1,000 users,
  error rate, page weight, accessibility violations). Every optimization has a cost
  somewhere.
- **Measurable in time.** If a metric can't be read within one quarter of launch, add
  a leading proxy.

### Scope

- Use Shape Up's framing (Ryan Singer, Basecamp): an **appetite** (how much time the
  problem is worth), **no-gos** (non-goals), and **rabbit holes** (known traps to avoid).
- Non-goals are specific: "No bulk editing in v1" beats "keep it simple".
- If using MoSCoW (Dai Clegg, DSDM), "Must" items total no more than 60% of the
  appetite, leaving room for the unknown.

### Options and choices

Model this section on Fibo's `plans/` format: each plan answers what is changing, why
now, what the options were, and what was chosen, and is kept after shipping. For each
decision:

- **{Decision name}.** The options, in one line each. "Chosen: {option}." Then the
  reason, in terms of the problem and the metrics, not taste.
- Include the option that was the original request, even if rejected, and why.
- Include "do nothing" when it is a real option, with its cost.
- If a first attempt was tried and abandoned, record it and what was learned
  (Fibo's theme creator plan does this for its first layout).

## Tools

- **Codebase.** If the repo has a `plans/`, `briefs/`, or `docs/decisions/` folder, put
  the brief there and follow its numbering. If not, create `briefs/` and say so.
- **Analytics.** If connected, pull baselines directly and link the query.
- **Figma MCP.** Link the file and page where concepts will live, so the brief and the
  work point at each other.

## Output

A brief from [`templates/design-brief.md`](templates/design-brief.md), saved as
`briefs/NNN-short-name.md` (or the project's equivalent), approved by the named
decision-maker. It links to the discovery one-pager, research synthesis, and reference
board it draws on.

## Verify

The brief is done when all of these are true:

- [ ] It has a number, a single decision-maker, and a written approval with a date
- [ ] "What is changing" and "why now" are each one short paragraph
- [ ] The problem statement contains no feature, and every user claim cites evidence
      or is marked "assumed"
- [ ] One primary metric, with baseline, target, and date; at least one leading, one
      lagging, and one guardrail metric
- [ ] Non-goals list 3+ things a reasonable person would have expected in scope
- [ ] Every risk has likelihood, impact, and a mitigation or owner
- [ ] Options and choices covers 2+ options per major decision, including the original
      request and, where real, "do nothing"
- [ ] Every open question has an owner, a deadline, and a default if unanswered
- [ ] It reads in under five minutes (roughly 1,200 words or fewer, excluding appendices)

When concepts come back, the `design-critic` agent reviews them against this brief's
problem, primary metric, and non-goals. Keep the brief current so that review has
something true to check against.

## Anti-patterns

- A brief that is a feature list with a title
- "Success: users love it" or "improve engagement" with no baseline, target, or date
- Only lagging metrics, so nobody learns anything until next quarter
- No non-goals, so every stakeholder request later looks in scope
- One option presented as if it were the only one
- A brief written after the design to justify it
- Several approvers, so the brief is never approved, or approved by nobody in particular
- Deleting or overwriting the brief after launch, which loses the record of why

## Related skills

- **Feeds from:** `design-discovery` (problem, assumptions), `user-research` (audience,
  JTBD, evidence), `reference-research` (conventions and principles)
- **Leads to:** `information-architecture`, `wireframing`, `design-critique` (review
  against the brief), `usability-testing` (task success targets), `design-case-study`
  (the brief is the "before" of the story)

## References

From [`FIBO.md`](../../FIBO.md):
- **`plans/`** and the **theme creator plan**: numbered decision documents, and the
  model for the options-and-choices section, including a rejected first attempt.

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Nielsen Norman Group**: articles on UX metrics and on the HEART framework.
- **Good UI**: evidence for which patterns move which metrics, useful when setting
  realistic targets.
- **UX Collective**: practitioner writing on briefs, scoping, and non-goals.
- **Design Books**: Ryan Singer, *Shape Up*; Erika Hall, *Just Enough Research*;
  Kerry Rodden, Hilary Hutchinson and Xin Fu, "Measuring the User Experience on a Large
  Scale" (CHI 2010), the HEART paper.
