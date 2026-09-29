# HEART metrics

HEART is a framework from Google (Kerry Rodden, Hilary Hutchinson, and Xin Fu, "Measuring
the User Experience on a Large Scale: User-Centered Metrics for Web Applications",
CHI 2010). It gives five categories of user-centered metrics and a process, Goals →
Signals → Metrics, for turning a vague goal into a number.

## The five categories

| Category | Measures | Example metrics | Leading or lagging |
| --- | --- | --- | --- |
| **Happiness** | Attitude: satisfaction, perceived ease | CSAT, SUS score, NPS, SEQ after a task | Mostly lagging |
| **Engagement** | Depth of use by existing users | Sessions per user per week, actions per session, feature use frequency | Leading or lagging, depending on window |
| **Adoption** | New users of the product or feature | % of eligible users who try the feature in 30 days, new accounts per week | Leading |
| **Retention** | Users who come back | Week-4 retention, 90-day churn, repeat purchase rate | Lagging |
| **Task success** | Effectiveness and efficiency | Completion rate, time on task, error rate, steps to complete | Leading |

You rarely need all five. Pick the 2–3 that match what this work is meant to change.
Task success is almost always one of them for product design work.

## Goals → Signals → Metrics

1. **Goal:** what you want for people, in words. "Admins can trust an import without
   checking every row."
2. **Signal:** the behavior or attitude that would show the goal is met, and that you
   can detect. "Fewer admins open the exported spreadsheet after an import." "Fewer
   undo actions within 10 minutes of an import."
3. **Metric:** the signal as a number over a population and a time window. "% of
   imports followed by a CSV export within 24 hours, weekly." Baseline 41%, target 20%.

Write one row per goal:

| Category | Goal | Signal | Metric | Baseline | Target | By |
| --- | --- | --- | --- | --- | --- | --- |
| Task success | Admins trust an import | Fewer post-import exports | % imports with export < 24h | 41% | 20% | 8 weeks after launch |
| Adoption | Admins find the diff view | Diff view opened | % imports where diff is opened | 0% | 60% | 4 weeks |
| Retention | Admins keep importing | Repeat imports | % admins with 2+ imports in 30 days | 28% | 35% | 1 quarter |

## Choosing well

- **Primary metric.** One. It should be a leading metric the design can plausibly move
  within weeks, and it should predict the lagging outcome the business cares about.
- **Guardrails.** Pick 1–2 that would show you bought the win at someone else's cost:
  support contacts, error rate, time on task for a different task, performance budget,
  accessibility violations.
- **Avoid vanity metrics.** Page views, total sign-ups, and time on site go up for bad
  reasons (confusion increases time on site).
- **Averages hide things.** Report task time as a median, and segment by new vs.
  returning users when the design targets one of them.

## Small-sample alternatives

When the product lacks traffic for a quantitative read:

- **Task success** from usability testing: completion rate over 5–8 participants per
  round, with the caveat that small samples show direction, not precision.
- **SEQ** (Single Ease Question, 7-point scale) after each task. Jeff Sauro's
  benchmark places the average around 5.5.
- **SUS** (System Usability Scale, John Brooke, 1986): 10 items, scored 0–100; 68 is
  roughly average.

## Leading vs. lagging, in one line

Leading metrics tell you early whether you are on track; lagging metrics tell you
later whether it mattered. A brief needs both, and it names which is primary.
