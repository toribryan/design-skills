# Critique: {Screen or flow name}

**Date:** {date} · **Reviewer:** {name or agent} · **Source:** {Figma link / URL / screenshot set}

## Framing

- **Goal:** {what this screen or flow must achieve}
- **Audience:** {who uses it, in what context}
- **Stage:** {exploration | refinement | pre-ship}
- **Primary task walked:** {task, as a sentence}
- **Feedback wanted:** {what the author asked for}
- **Out of scope:** {locked decisions, things not reviewed}
- **Assumptions:** {anything inferred because it was not provided}

## Screens reviewed

| # | Flow step | Screen / state | Source id |
| --- | --- | --- | --- |
| S1 | {Step 1} | {Screen name, default state} | {Figma node id / URL @ 1440} |
| S2 | {Step 1} | {Screen name, error state} | {…} |

Missing states not reviewed: {empty, loading, long content, …}

## Issues

Failures only, sorted by severity (4 → 1). Blocking = 3 or 4.

| # | Sev | Tag | Location | Observation | Impact | Suggestion |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 4 | H3 | S2, payment form | {what is on screen} | {effect on the person or goal} | {one direction} |
| 2 | 3 | Hierarchy | S1, header region | | | |
| 3 | 2 | H4 | S1 → S3, secondary buttons | | | |
| 4 | 1 | Craft | S3 @ 390, card footer | | | |

Tags: H1–H10 (Nielsen), Hierarchy, Clarity, Consistency, Craft.

## Open questions

- {Question about intent that affects whether something is an issue}

## Verdict

{Ready | N blocking issues}
