# Usability metrics: questionnaires and scoring

## SEQ: Single Ease Question

Asked immediately after each task:

> Overall, how difficult or easy was this task to complete?
> 1 = Very difficult … 7 = Very easy

- Average across tasks in Jeff Sauro's (MeasuringU) data is about 5.5.
- A task averaging below 5 deserves a look; below 4 is a problem task.
- Follow a low score (1–4) with "What made it difficult?" in moderated sessions.

## SUS: System Usability Scale

John Brooke, 1986. Ten items, answered after the whole session, on a 5-point scale
from 1 (Strongly disagree) to 5 (Strongly agree). Use the wording exactly; replace
"system" with the product name if you like, but change nothing else.

1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to be able to use this system.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

### Scoring

For each participant:

1. Odd items (1, 3, 5, 7, 9, positively worded): contribution = response − 1
2. Even items (2, 4, 6, 8, 10, negatively worded): contribution = 5 − response
3. Sum the ten contributions (range 0–40)
4. Multiply by 2.5 (range 0–100)

Average the per-participant scores. A SUS score is not a percentage.

```js
function sus(responses /* array of 10 answers, 1–5, in item order */) {
  const sum = responses.reduce((acc, r, i) => acc + (i % 2 === 0 ? r - 1 : 5 - r), 0);
  return sum * 2.5;
}
// sus([4,2,4,1,4,2,5,2,4,2]) === 80
```

### Interpreting

The average across Sauro's database of ~500 studies is 68 (roughly the 50th
percentile). Sauro and Lewis's curved grading scale:

| Grade | SUS | Percentile range |
| --- | --- | --- |
| A+ | 84.1–100 | 96–100 |
| A | 80.8–84.0 | 90–95 |
| A− | 78.9–80.7 | 85–89 |
| B+ | 77.2–78.8 | 80–84 |
| B | 74.1–77.1 | 70–79 |
| B− | 72.6–74.0 | 65–69 |
| C+ | 71.1–72.5 | 60–64 |
| C | 65.0–71.0 | 41–59 |
| C− | 62.7–64.9 | 35–40 |
| D | 51.7–62.6 | 15–34 |
| F | 0–51.6 | 0–14 |

SUS stabilizes with larger samples. With fewer than ~12 participants, report it as
directional only, alongside the qualitative findings, never as a benchmark.

## Task success

- Binary (1 success / 0 fail) is the most comparable. If you use partial credit, write
  the rule before sessions (e.g. partial = completed with moderator hint = 0.5).
- For small samples, report counts ("4 of 5") and, if a rate is needed, the adjusted
  Wald confidence interval rather than the raw percentage. With 4 of 5, the 95%
  interval is roughly 36%–98%: that width is why 5-person tests find problems but do
  not measure.

Adjusted Wald: add z²/2 successes and z² trials (z = 1.96, so about +1.92 and +3.84),
then compute a normal interval on the adjusted proportion.

## Time on task

- Only successful attempts. Start timing when the participant finishes reading the
  task; stop at the defined end state.
- Task times are right-skewed. For samples under ~25, report the geometric mean
  (average the logs, then exponentiate), which estimates the median better than the
  sample median does.
- Compare against a baseline: a previous version, a competitor, or an expert's time
  (people typically take 1.5–3x an expert's time on a usable design).

## Errors

Count wrong paths (navigated somewhere unrelated to the goal) and slips (right intent,
wrong execution) per task. Use them to explain failures, not as a score.
