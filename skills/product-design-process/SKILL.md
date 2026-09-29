---
name: product-design-process
description: >-
  Runs a product design effort end to end - discover, define, design, validate,
  systematize, ship, and tell the story - by routing each phase to the right skill
  and reviewer and keeping a running project log. Use for "design this feature
  from scratch", "where do I start", "take this from idea to shipped", "plan the
  design process", or any request that spans more than one phase. Not for a single
  task that one skill already covers; load that skill directly.
---

# Product design process

The router for the whole collection. It decides which phase the work is in, loads
the skill for that phase, runs the reviewer that checks it, and records each
decision so the next phase starts from what was learned instead of from scratch.
It does not do the phase work itself.

## When to use

- A new feature, product, or redesign with no clear starting point
- Work that crosses phases ("research this, then design it, then build it")
- Picking the work back up after a break and needing to know what comes next
- Planning a design effort's steps and timeline

**Not for:** one bounded task ("critique this screen", "make motion tokens"). Load
that skill directly.

## Inputs

- **The ask**, in the requester's words
- **What already exists**: research, briefs, designs, a design system, code.
  Read the repo's `AGENTS.md`, `plans/` or `docs/`, and any Figma links before
  proposing work. [Assume nothing exists.]
- **Appetite**: how much time this deserves (a day, a week, six weeks). [One week.]
- **Fidelity needed at the end**: a decision, a prototype, shipped code. [Shipped code.]

## Process

1. **Place the work.** Use the phase map below to decide where the work starts. Most requests arrive in the middle: "design a settings page" is phase 3
   with phase 1 and 2 questions still open. Name the skipped phases and the risk of
   skipping each in one line.
2. **Open a project log.** Model: [`templates/project-log.md`](templates/project-log.md).
   Copy that shape. Keep it in the repo (`plans/NNN-<name>.md` if the repo has a
   `plans/` folder, otherwise `docs/design/<name>.md`).
3. **Run each phase.** Load the phase's skill, produce its output, then run its
   exit check (below). Record the decision and the evidence in the log before
   moving on.
4. **Size to the appetite.** With a day, run phase 1 as a 30-minute framing pass and
   phase 4 as a `design-critic` pass. With six weeks, run every phase fully. Never
   drop Verify.
5. **Loop back when evidence says so.** A usability finding with severity 3 or 4
   sends the work back to phase 3. A finding that the problem was wrong sends it
   back to phase 1. Record the loop and why.
6. **Close.** Ship, write the changelog line, and, if the work is portfolio-worthy,
   hand the log to `design-case-study` while it is fresh.

## Phase map

| Phase | Question it answers | Skills | Exit check |
| --- | --- | --- | --- |
| **1. Discover** | What problem, for whom, and what do we not know? | `design-discovery`, `user-research`, `reference-research` | Problem statement agreed; riskiest assumption named and tested or accepted |
| **2. Define** | What will we build, how will we know it worked? | `design-brief`, `information-architecture` | Brief with success metrics and non-goals; flows and state inventory cover the edge cases |
| **3. Design** | What does it look like and how does it behave? | `wireframing`, `layout-and-hierarchy`, `ux-writing`, `interface-polish` | Three directions explored before one was chosen; all states drawn; `design-critic` verdict ready |
| **4. Validate** | Does it work for real people? | `usability-testing`, `design-critique`, `accessibility-review` | No open severity 3–4 findings; `accessibility-auditor` verdict ready |
| **5. Systematize** | What should become reusable? | `design-tokens`, `color-system`, `typography-system`, `iconography`, `component-api-design`, `design-system-docs`, `design-system-audit` | New parts documented; `token-auditor` and `component-reviewer` verdicts ready |
| **6. Ship** | Is what shipped what was designed? | `design-handoff`, `design-to-code`, `visual-qa` | `visual-qa-reviewer` verdict ready; project checks pass |
| **7. Tell** | What did we learn, and how do we show it? | `design-case-study` | Outcome measured against the brief's metrics |

Brand, motion, and marketing run alongside the phases, not in sequence:

| Track | Skills | When it enters |
| --- | --- | --- |
| **Brand** | `brand-strategy` → `brand-voice` → `brand-identity` → `art-direction` | Before phase 3 for a new product or rebrand; otherwise read the existing guidelines at phase 3 |
| **Motion** | `motion-language` → `motion-implementation` → `micro-interactions` | Language at phase 5, implementation at phase 6, micro-interactions during phase 3 polish |
| **Marketing** | `landing-page-design` | After brand and art direction exist |

## Reviewers

Read-only subagents in [`agents/`](../../agents/). Each reports failures only and
ends in a verdict. Run them at the exit of the phase they guard, and run them
again after fixes.

| Reviewer | Guards |
| --- | --- |
| `design-critic` | Phase 3 and 4 |
| `accessibility-auditor` | Phase 4 and 6 |
| `copy-reviewer` | Phase 3 and 6 |
| `component-reviewer` | Phase 5 |
| `token-auditor` | Phase 5 and 6 |
| `visual-qa-reviewer` | Phase 6 |
| `brand-reviewer` | Brand track and marketing |

## Standards

- Every phase ends with a written decision and the evidence behind it. A phase
  with no record did not happen.
- Explore at least three genuinely different directions before converging, at
  whatever fidelity the appetite allows.
- Carry the brief's success metrics through to the end; phase 7 measures them.
- If the project has a design system, new work uses it. New parts go through
  phase 5 before phase 6, not after.
- If the project has an `AGENTS.md`, its conventions win over any skill here.

## Output

The project log, filled in as the work moves, plus each phase's deliverable.
At any point, the log answers: where are we, what was decided, why, and what is next.

## Verify

The effort is done when:

- [ ] Every phase that ran has a decision and evidence in the log
- [ ] Every skipped phase is named with its accepted risk
- [ ] All reviewer verdicts for the phases that ran read `ready`
- [ ] The shipped result was checked in light and dark, by keyboard, with reduced
      motion on, and at 320px and 1440px
- [ ] The brief's success metrics have a date when they will be measured

## Anti-patterns

- Jumping to high fidelity on day one because the tool makes it easy
- Research that produces a deck and no decision
- One direction presented as if it were the only option
- A design system built before two real screens needed the same part
- Treating accessibility and QA as phase 7 cleanup
- A case study written from memory months later

## Related skills

Every skill in the collection. This one only routes.

## References

- [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md): Nielsen Norman Group for method
  choice at each phase; Laws of UX for the principles phase 3 leans on.
- [`FIBO.md`](../../FIBO.md): Fibo's `plans/` folder is the model for the project
  log (numbered, four questions, kept after shipping), and its definition of done
  is the model for phase 6's exit check.
