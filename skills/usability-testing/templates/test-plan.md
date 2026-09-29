# Usability test plan: {Product / flow}

**Version:** {x.y} · **Owner:** {name} · **Dates:** {sessions from – to}

## Goals

- **Decision this informs:** {what we will do differently depending on the result}
- **Research questions:**
  1. {Can people … ? — answerable by watching behavior}
  2. ...
- **What is being tested:** {prototype link / staging URL / live}, version {…}
- **Out of scope:** {…}

## Method

- **Type:** {moderated | unmoderated}, {remote | in person}
- **Session length:** {45–60 min moderated | 15–20 min unmoderated}
- **Rounds:** {1–3}, {N} participants per group per round
- **Sample-size rationale:** {5 per round, iterate | 3–5 per group across N groups | 20+ for benchmark}
- **Roles:** moderator {name}, note takers {names}, observers {names, muted}
- **Recording and consent:** {tool}, consent form {link}

## Participants

| Group | Count | Must have | Must not |
| --- | --- | --- | --- |
| {Primary persona} | {5} | {behavioral criterion, e.g. "manages a team budget monthly"} | {works in design, research, or at {company}} |

Screener questions:

1. {Question} — qualify: {answer}; disqualify: {answer}
2. ...

Over-recruit by one per group for no-shows. Incentive: {amount}.

## Tasks

| # | Scenario (read aloud) | Maps to question | Success rule | Max time |
| --- | --- | --- | --- | --- |
| T1 | "{You're … Your goal is … Stop when …}" | Q1 | Complete: {end state}. Fail: {…} | {5 min} |
| T2 | | | | |

Task data to give participants: {names, dates, amounts, login}

## Moderator guide

**Intro (3 min).** "Thanks for joining. We're testing the design, not you; there are no
wrong answers. Please think aloud: tell me what you're looking at, what you're
trying to do, and what you expect. I may not answer questions, because I want to see
how it works without me. Is it OK to record?"

**Warm-up (3–5 min).** {2–3 questions about their context related to the tasks}

**Tasks (30–40 min).** For each: read the scenario, hand it over in writing, observe.
After each task, ask the SEQ: "Overall, how difficult or easy was this task, from 1
very difficult to 7 very easy?" If 1–4: "What made it difficult?"

**Post-test (5 min).** SUS questionnaire (10 items; see `references/metrics.md`).

**Debrief (5 min).** "What, if anything, was confusing?" "If you could change one
thing, what would it be?" Thank and close.

Neutral prompts: "What are you thinking?" · "What would you do next?" · "What did you
expect to happen?" · "What do you think that does?"

## Pilot

- **Date and participant:** {…}
- **Changes made after pilot:** {…}

## Metrics collected

- [ ] Task success (binary or complete / partial / fail)
- [ ] Time on task (successful attempts)
- [ ] SEQ per task
- [ ] SUS (only reported as a benchmark if n ≥ 12)
- [ ] Errors per task
