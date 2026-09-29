---
name: design-discovery
description: >-
  Frames a design problem before anyone draws: a problem statement, stakeholder
  alignment, an assumption map ranked by risk and evidence, "How might we"
  opportunities, and a research plan for the riskiest unknowns. Use for "kick off
  this project", "what problem are we solving", "we're not aligned", "map our
  assumptions", "what should we research", or "is this worth building". Not for
  running interviews (use user-research) or writing the final brief (use design-brief).
---

# Design Discovery

Discovery decides what problem is worth solving and what the team does not yet know.
It turns a request ("add a dashboard") into a problem statement people agree on, lays
out the beliefs the project rests on, and ranks them by how much damage they would do
if wrong. The output is three things on one page: a problem statement, an assumption
map, and a research plan that spends effort only on the assumptions that are both
important and unproven.

## When to use

- A project starts from a solution ("build X") and nobody has written down the problem
- Stakeholders describe the goal in different words, or with different success measures
- The team is about to commit weeks of build on beliefs nobody has checked
- A metric moved (activation dropped, churn rose) and the cause is unclear
- Someone asks "what should we research first?"

**Not for:** planning and running interviews (use `user-research`), studying how other
products solve it (use `reference-research`), or writing the decision document once
the problem is understood (use `design-brief`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **The request** as it arrived, verbatim: ticket, message, or meeting note [ask for it;
  the original wording shows the assumed solution]
- **Why now**: the trigger, deadline, or metric behind it [ask; if nobody knows, that is
  the first finding]
- **Stakeholders**: who asked, who decides, who builds, who supports it after launch
  [the requester, one PM, one engineering lead]
- **Existing evidence**: analytics, support tickets, sales call notes, past research,
  NPS verbatims [search the repo, docs, and connected tools; list what exists]
- **Constraints known today**: date, budget, platform, legal, team size [none stated;
  mark as an open question]
- **Appetite**: how much time the problem is worth, in weeks [ask; default 6 weeks,
  following Shape Up's "appetite" framing]

## Process

1. **Capture the request and restate it.** Write the request verbatim, then separate
   the solution it names from the outcome it implies. "Add CSV export" implies "people
   need their data somewhere else", which has other answers. Output: request, implied
   outcome, and the named solution marked as one option. Model: "The request" in
   [`templates/discovery-summary.md`](templates/discovery-summary.md); copy that shape.
2. **Interview stakeholders, one at a time.** 30 minutes each, 4–8 people. Ask each person
   the same core questions so you can compare answers. Read
   [`references/stakeholder-interviews.md`](references/stakeholder-interviews.md) for
   the question set. Output: a comparison table of how each person states the problem,
   the user, success, and the biggest risk. Model: the comparison table at the end of
   that reference; copy that shape.
3. **Find the disagreement.** Where stakeholders differ on the user, the goal, or the
   measure of success, write it down as a decision, not a detail to smooth over.
   Output: a list of 1–5 alignment gaps, each with an owner who decides. Model:
   "Alignment gaps" in the template.
4. **Dig to the underlying problem.** Ask "why" until the answer is about a person's
   situation, not the product (the "5 whys" from Toyota's production system; stop when
   the answer stops changing, often at 3). Check the problem against the evidence you
   hold. Output: a problem statement in the format under Standards; copy that
   shape word for word before editing it.
5. **List assumptions.** Everything that must be true for the project to succeed,
   written as falsifiable sentences: "Admins export data at least monthly", not
   "Export is important". Sort them into desirability, viability, feasibility (IDEO's
   three lenses), plus usability where the risk is "they want it but cannot use it".
   Aim for 15–30. Output: the raw list, in the "Assumptions" table of the template.
6. **Map assumptions by importance and evidence.** Place each on a 2×2: how bad it
   would be if it were wrong (importance) against how much evidence you hold today
   (David J. Bland's assumption mapping, from *Testing Business Ideas*). Output: the map,
   with the top-right quadrant (important, no evidence) called out; Bland puts
   evidence on the x-axis running from "have evidence" to "no evidence". Model: the "Map"
   block in the template; copy that shape.
7. **Frame opportunities as "How might we".** Turn the problem and the top 3–5 risky
   assumptions into HMW questions (Min Basadur's framing at Procter & Gamble, later
   popularized by IDEO). Check each against the scope rules below. Output: 3–7 HMWs,
   with the one to pursue first marked.
8. **Decide what to research.** For each assumption in the risky quadrant, pick the
   cheapest method that could prove it wrong, a sample size, and a threshold that
   would change the plan. Output: a research plan table. Model: "Research plan" in the
   template; every column is required.
9. **Play it back.** Share the one-pager with every stakeholder you interviewed and ask
   each to name what is wrong. Silence is not agreement; ask for an explicit yes. Output:
   the signed-off page, or a revised one.

## Standards

### Problem statement

Use this shape, one to three sentences:

> **{Who}** is trying to **{progress they want to make}** when **{situation}**, but
> **{obstacle}**, which causes **{consequence, with a number if one exists}**.
> We will know it is solved when **{observable change}**.

- It names a person, not a department ("new workspace admins in their first week",
  not "users").
- It contains no feature, screen, or technology.
- The consequence cites evidence: a metric, a count of tickets, a quote from research.
  If none exists, label it "assumed" and put it on the assumption map.
- The success line is observable in behavior or data within one quarter.

### Assumption map

| Quadrant | Importance | Evidence | Action |
| --- | --- | --- | --- |
| Test first | High | Weak or none | Research or experiment before building |
| Monitor | High | Strong | Build; instrument so you notice if it changes |
| Park | Low | Weak | Note it; revisit only if scope grows |
| Ignore | Low | Strong | Drop from the map |

- Score evidence by source, not confidence: 0 = opinion, 1 = anecdote or a single
  customer, 2 = pattern across support tickets or 5+ interviews, 3 = behavioral data or
  a run experiment. Stated preferences ("they said they'd use it") score 1 at most.
- A map where nothing sits in "Test first" means the list is too polite. Add the
  assumption the team would least like to be wrong about.
- Keep the "Test first" quadrant to 3–7 items. More than that means the project is
  too large for one discovery round; split it.

### How might we

- Narrow enough to act on, broad enough to allow three or more different answers.
  "HMW improve onboarding" is too broad; "HMW add a progress bar" is a solution.
- Starts from an insight or assumption, not from nothing: "HMW help admins trust the
  import worked without checking every row?"
- One verb, one person, one situation.

### Research plan

- Every study maps to at least one named assumption. A study with no assumption is
  a fishing trip; cut it or name what it could disprove.
- Pick the method by the kind of question (after Christian Rohrer's NN/g landscape):
  what people do (analytics, observation, diary study), why they do it (interviews,
  contextual inquiry), whether they can (usability test), how many (survey, analytics).
- Default sample sizes: 5–8 interviews per segment, 5 participants per round of
  qualitative usability testing, 100+ responses for a survey you intend to segment.
- Write the decision rule before the study: "If fewer than 3 of 8 admins describe
  exporting monthly, we drop export from v1."
- Timebox discovery to 10–20% of the appetite. On a 6-week project, 1 week.

## Tools

- **Codebase and docs.** Search for analytics events, feature flags, support macros,
  and past research before asking anyone. Evidence you already hold scores higher
  than a new opinion.
- **FigJam via Figma MCP.** If connected, put the assumption map and HMW list on a
  FigJam board: one sticky per assumption, placed on the 2×2. If not, a Markdown table
  is enough; say so in one line.
- **Analytics (PostHog or similar).** If connected, pull the funnel or event counts that
  back or undercut the stated consequence.

## Output

A discovery one-pager using [`templates/discovery-summary.md`](templates/discovery-summary.md):
the request, the problem statement, alignment gaps and their owners, the assumption
map, 3–7 HMWs, and the research plan. It fits on two screens. Longer means it is not
yet decided.

## Verify

Discovery is done when all of these are true. Check each against the one-pager, not
from memory.

- [ ] The original request is recorded verbatim, and its named solution is labeled as one option
- [ ] The problem statement names a specific person and situation, contains no feature,
      and cites evidence for the consequence or marks it "assumed" (and that assumption
      is on the map)
- [ ] Every stakeholder interviewed has seen the page and replied with an explicit yes or
      a correction, recorded in "Sign-off"
- [ ] Every alignment gap has an owner and a decide-by date
- [ ] 15+ assumptions, each falsifiable and tagged desirability, viability, feasibility,
      or usability; at least one of each of the first three
- [ ] "Test first" holds 3–7 items, and each one appears in the research plan
- [ ] Each HMW allows at least three different solutions (write the three to check)
- [ ] Each study names its assumption, method, sample, decision rule, owner, and dates
- [ ] The discovery end date is written down and is no more than 20% of the appetite away

If a stakeholder replies "looks fine" without reading, it is not a sign-off. Ask them
to name the assumption they are least sure of.

## Anti-patterns

- Discovery as ritual: interviews run after the solution is already approved and scoped
- Problem statements that restate the feature ("users need a dashboard")
- Averaging stakeholder disagreement into vague language everyone can sign
- Assumption lists with only desirability items; feasibility and viability kill
  projects too
- Treating a loud customer or a sales request as evidence of a pattern
- Research plans that study everything, so the riskiest question gets the same
  attention as trivia
- No decision rule, so any result can be read as support for the original plan
- Open-ended discovery with no timebox, which becomes a reason not to ship

## Related skills

- **Feeds from:** `product-design-process` (where discovery sits in the whole arc)
- **Leads to:** `user-research` (run the studies in the plan), `reference-research`
  (how others solved it), `design-brief` (write it up once risky assumptions are
  answered)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Nielsen Norman Group**: Rohrer's "When to Use Which User-Experience Research
  Method" for step 8, and their articles on discovery-phase scoping.
- **Laws of UX**: a check on which behavioral assumptions already have published
  support, so you can score evidence honestly.
- **UX Collective**: practitioner essays on stakeholder alignment and why discovery
  gets skipped.
- **Design Books**: Teresa Torres, *Continuous Discovery Habits* (opportunity solution
  trees); Erika Hall, *Just Enough Research*; David J. Bland and Alex Osterwalder,
  *Testing Business Ideas*; Ryan Singer, *Shape Up*.

From [`FIBO.md`](../../FIBO.md):
- **`plans/`**: the numbered design-doc format (what is changing, why now, options) is
  where a finished discovery one-pager feeds into a decision.
