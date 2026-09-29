---
name: usability-testing
description: >-
  Plans, runs, and reports usability tests: moderated or unmoderated, scenario-based
  tasks, think-aloud sessions, task success, time, SEQ and SUS metrics, a note-taking
  grid, and a findings report with severity. Use for "usability test", "test the
  prototype", "user testing plan", "write test tasks", "SUS score", "how many users
  should we test", or "synthesize test sessions". Not for open-ended discovery
  interviews (use user-research) or an expert review without participants (use
  design-critique).
---

# Usability Testing

A usability test watches real people try to do real tasks with a design, to find
where it fails them. It produces evidence, not opinions: who got stuck, where, how
often, and how badly. The output is a test plan before sessions and a findings report
after, with each issue tied to observed behavior and rated for severity.

## When to use

- A prototype or live product needs evidence before it ships or before the team builds more
- Choosing between two concepts with behavior, not preference
- A critique found severity-3+ issues and the team disputes them
- Benchmarking a flow before and after a redesign (SUS, task success)
- Writing tasks, a screener, or a moderator guide

**Not for:** learning about people's needs and context before there is a design (use
`user-research`), an expert review without participants (use `design-critique`), or
an accessibility conformance audit (use `accessibility-review`). Testing with disabled
participants is in scope here.

## Inputs

Gather these. If one is missing, use the default in brackets.

- **What is being tested**: prototype link, staging URL, or live product [ask; required]
- **Research questions**: 2–5 things the team needs to learn [derive from the brief
  and the open questions in the concept sheet or critique]
- **Participants**: who, and how many distinct groups [one group matching the primary
  persona]
- **Method**: moderated or unmoderated, remote or in person [remote moderated]
- **Decision it informs**: what changes depending on the result [ask; if nobody can
  say, the test is premature]
- **Benchmark goal**: qualitative (find problems) or quantitative (measure) [qualitative]

## Process

1. **Write research questions and the decision.** Each question is answerable by
   watching behavior ("Can people find where to change their plan?"), not by asking
   opinions. Model: the "Goals" block of
   [`templates/test-plan.md`](templates/test-plan.md). Copy that shape. Output: 2–5
   questions and the decision they inform.
2. **Choose method and sample size.** Use the tables under Standards. Output: method,
   number of participants per group, and number of rounds.
3. **Write the screener.** Behavioral criteria ("has booked travel for work in the
   last 3 months"), not demographics alone. Exclude designers, researchers, and
   employees. Model: the "Participants" block of the test plan. Output: screener with
   qualify and disqualify answers.
4. **Write tasks.** 5–7 tasks for a 45–60 minute moderated session, 3–5 for a 15–20
   minute unmoderated one. Each is a scenario with a goal and a clear end state. Model:
   the task table in the test plan and the rules below. Output: tasks with success
   criteria.
5. **Write the moderator guide.** Intro and consent script, warm-up questions, tasks,
   post-task SEQ, post-test SUS and debrief. Output: guide in the test plan.
6. **Pilot once.** Run one session with a colleague or a real participant. Fix tasks
   that confuse, prototypes that break, and timing. Output: a revised plan.
7. **Run sessions.** Think-aloud, record with consent, one moderator and 1–2 note
   takers. Output: recordings and a filled note grid.
8. **Capture in the grid.** One row per observation, one column per participant.
   Model: the note-taking grid in [`templates/test-results.md`](templates/test-results.md).
   Output: the grid, filled within 24 hours of each session.
9. **Synthesize.** Group observations into issues, count how many participants hit
   each, rate severity, and compute metrics. Model: the issue table and metrics table
   in the results template. Scoring details in
   [`references/metrics.md`](references/metrics.md). Output: a ranked issue list.
10. **Report.** Findings only, each with location, evidence, and a recommendation,
    ending in a verdict. Output: the findings report.

## Standards

### Moderated vs unmoderated

| | Moderated | Unmoderated |
| --- | --- | --- |
| Best for | Why people struggle; complex or early prototypes; follow-up questions | What happens at scale; simple, well-defined tasks; benchmarks |
| Session length | 45–60 min | 15–20 min |
| Tasks | 5–7 | 3–5 |
| Participants per round | 5–8 | 15–40+ |
| Risk | Moderator bias; smaller sample | No way to probe; participants skip or rush; needs a robust prototype |

### How many participants

Nielsen and Landauer (1993) modeled problem discovery as `1 − (1 − L)^n`. With the
average problem affecting L = 31% of users, 5 participants find about 85% of
problems. That makes **5 per round, then iterate** the right default for qualitative
testing: three rounds of 5 beat one round of 15.

Five is wrong when:

- **Several distinct user groups** use the product differently (admins vs. members,
  buyers vs. sellers): test 3–5 per group.
- **Problems are rarer**: at L = 10%, 5 participants find only about 41%. Complex
  products, long flows, or edge-case-heavy domains need more.
- **You need numbers**: benchmarks, comparisons, or SUS need 20+ per group; NN/g
  recommends about 40 for quantitative studies to get useful confidence intervals.
- **Stakes are high**: medical, financial, or safety-critical flows justify more.

### Writing tasks

- Scenario, goal, and end state: "You're going to a conference in Denver on the
  14th. Book a hotel within walking distance of the venue for under $250 a night.
  Stop when you reach the payment step."
- No UI words from the screen. "Add it to your cart" leads if the button says
  "Add to cart"; write "You've decided on this one; get ready to buy it."
- No steps, no hints, no "try to", no "easily".
- Realistic data: give the participant the names, dates, and numbers they need.
- One goal per task. Order tasks as a real session would flow; put the task most
  critical to the research questions early.
- Define success before sessions: what counts as complete, partial, and failed.

### Think-aloud and moderation

- Ask people to say what they are thinking, looking for, and expecting. Demonstrate
  once on an unrelated page.
- Neutral prompts only: "What are you thinking?", "What would you do next?", "What
  did you expect to happen?"
- Answer questions with questions ("What do you think it does?"). Do not rescue. If a
  participant is stuck for ~2–3 minutes, or distressed, move on and mark the task failed.
- Do not ask "Would you use this?" or "Do you like it?"; stated preference predicts
  little. Watch behavior.

### Metrics

| Metric | How | Benchmark |
| --- | --- | --- |
| Task success | Binary per task (or complete / partial / fail with a stated rule) | Sauro's average across ~1,100 tasks is about 78% |
| Time on task | Successful attempts only; report the geometric mean for small samples | Compare to an expert time or previous version |
| SEQ (Single Ease Question) | After each task, 1 (very difficult) to 7 (very easy) | Average about 5.5; below 5 flags a task |
| SUS (System Usability Scale) | 10 items after the session, scored 0–100 | Average 68; 80+ is top quartile |
| Errors | Count of wrong paths or slips per task | Qualitative context, not a score |

With 5 participants, report counts ("4 of 5"), not percentages, and never report SUS
as a benchmark. Scoring and confidence intervals: [`references/metrics.md`](references/metrics.md).

### Severity

Rate each issue on Nielsen's 0–4 scale (4 catastrophe, 3 major, 2 minor, 1 cosmetic),
weighing **frequency** (how many participants), **impact** (did they fail or recover),
and **persistence** (does it recur). A problem that made one person fail a critical
task can still be a 4. Blocking means 3 or 4.

## Output

1. A test plan using [`templates/test-plan.md`](templates/test-plan.md), agreed before
   recruiting.
2. A findings report using [`templates/test-results.md`](templates/test-results.md):
   summary, metrics table, issues only (each with location, participant count,
   evidence quote or clip timestamp, severity, recommendation), and a one-line verdict.

## Verify

Before sessions:

- [ ] Every research question maps to at least one task
- [ ] Every task has a scenario, an end state, and a written success rule
- [ ] No task contains a label that appears on the screen being tested
- [ ] The prototype works end to end on every task path (click through it yourself)
- [ ] One pilot session run and the plan revised
- [ ] Sample size justified against the "Five is wrong when" list

After sessions:

- [ ] Every issue names a location (screen, step, element) and how many participants
      hit it ("3 of 5")
- [ ] Every issue has evidence: a quote, an observed action, or a clip timestamp
- [ ] Severities use the 0–4 scale and at least one issue is not rated 3–4
- [ ] SUS computed with the correct odd/even formula, if collected
- [ ] The report ends with `Ready` or `N blocking issues`

Before running sessions, delegate the prototype to the `design-critic` subagent so
session time is not spent rediscovering known issues. Delegate task and moderator
guide wording to the `copy-reviewer` subagent to catch leading language.

## Anti-patterns

- Tasks that name the button: "Click Settings and change your password"
- Asking "Was that easy?" right after watching someone struggle
- Helping participants when they get stuck, then counting the task as a success
- Testing with colleagues, friends, or people who know the product internals
- Reporting "60% of users" from 5 sessions
- A findings report that is a transcript summary with no severity or recommendation
- Testing once at the end, when there is no time left to change anything
- Treating the SUS score from 5 people as a benchmark
- Recruiting by demographics when the task depends on behavior or expertise

## Related skills

- **Feeds from:** `wireframing` and `design-critique` (what to test), `user-research`
  (personas, recruiting criteria)
- **Leads to:** `design-critique` and `interface-polish` (fixes), `ux-writing` (copy
  issues), `design-case-study` (evidence for the story)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Nielsen Norman Group**: "Why You Only Need to Test with 5 Users", the thinking-aloud
  method, task-writing guidance, and quantitative sample sizes.
- **Laws of UX**: vocabulary to explain why an observed issue happens.
- **Page Flows**: how comparable products handle the flow that failed, to ground a
  recommendation.
- **Good UI**: A/B-tested patterns when a fix needs supporting evidence.
