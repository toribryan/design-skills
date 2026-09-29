---
name: design-case-study
description: >-
  Writes a portfolio case study that shows how a designer thinks: context, role,
  problem, constraints, key decisions with tradeoffs, outcome with evidence, and
  reflection, structured so a reviewer skimming headlines gets the whole story.
  Use for "case study", "portfolio project", "write up my project", "portfolio
  review", "how do I show my process", or "NDA portfolio". Not for internal project
  documentation or handoff (use design-handoff or design-system-docs).
---

# Design Case Study

A case study is an argument that you make good decisions, with one project as the
evidence. Reviewers (hiring managers, design leads, clients) read many and skim most,
so the story must work at three depths: the headlines alone, the headlines plus
captions, and the full text. This skill produces a case study that shows thinking
rather than a gallery of deliverables. The standard: a reader who only reads the
headings can say what the problem was, what you decided, and what changed as a result.

## When to use

- Writing a new portfolio case study, or cutting down one that is too long
- Preparing a portfolio review or presentation
- Turning a project under NDA into something showable
- A portfolio gets looks but no interviews, or interviews but no offers

**Not for:** documenting a project for the team that will maintain it (use
`design-handoff`), writing a design system's docs (use `design-system-docs`), or
presenting in-progress work for feedback (use `design-critique`).

## Inputs

- **The project**: what it was, dates, team, your role and what you personally did
  [ask; this blocks]
- **The target reader**: role and company type you are applying to [default: a design
  manager at a product company, first pass under 5 minutes]
- **Artifacts**: research notes, sketches, flows, iterations, final screens, metrics
  [gather everything, then cut]
- **Outcome evidence**: shipped metrics, research findings, quotes, adoption, or a
  documented reason there are none
- **Confidentiality**: NDA terms, what is public, what is not [assume nothing unreleased
  is showable until confirmed]

## Process

1. **Pick the project.** Choose work that matches the job you want, where you made
   decisions that mattered, and where you can explain tradeoffs. A messy project with
   clear reasoning beats a polished one where you executed someone else's plan.
   Output: one project, and a sentence on why it is in the portfolio.
2. **Write the one-line summary first.** "Redesigned X for Y, which changed Z." If you
   cannot write it, the story is not clear yet. Output: the summary.
3. **List the decisions.** Find 2–4 moments where you chose between real options.
   For each: the options, what you chose, the tradeoff, and the evidence. Model: the
   decision block in [`templates/case-study.md`](templates/case-study.md). Copy that
   shape. Output: decision blocks.
4. **Write the headlines.** One headline per section that states a finding or decision,
   not a phase name. Output: a headline outline that reads as a story on its own.
5. **Choose visuals.** One visual per decision, each with a caption that says what to
   notice. Output: a visual list with captions.
6. **Draft the body** in the template order. Output: full draft.
7. **Cut.** Remove process steps that did not change the outcome, generic methods
   ("I conducted user interviews"), and every screen that does not support a decision.
   Output: a draft 30–40% shorter.
8. **Handle confidentiality.** Output: an NDA-safe version, and written permission if
   needed.
9. **Test on a stranger.** Give someone five minutes. Ask them to retell it. Output:
   fixes to whatever they missed.

## Standards

### Structure

1. **Summary block** (first screen): title, one-line summary, role, team, timeline,
   platform, and the outcome. The reader should know the result before scrolling.
2. **Context**: the company, product, and users in 2–4 sentences.
3. **Problem**: what was wrong, for whom, and how you knew. Evidence, not assertion.
4. **Constraints**: time, tech, team, business, regulation. Constraints make decisions
   legible; without them every choice looks arbitrary.
5. **Process highlights**: only the steps that changed the direction. Not a full
   double-diamond walkthrough.
6. **Key decisions**: 2–4, each with options considered, the choice, the tradeoff, and
   the evidence. This is the core of the case study.
7. **Outcome**: what changed, with numbers where possible.
8. **Reflection**: what you would do differently, what you learned, what happened
   after. Specific, not "I learned the value of collaboration".

### Showing thinking, not deliverables

- Every visual answers "what decision does this show?" A persona poster, a journey
  map, or a wall of sticky notes proves activity, not judgment.
- Show rejected options next to the chosen one, with why they lost.
- Show one before/after per major decision.
- Name what you did versus what the team did. "I" for your decisions, "we" for shared
  work. Overclaiming is the fastest way to lose trust in an interview.

### Scannability

- Headlines carry the story: "Cutting onboarding from 7 steps to 3 doubled activation",
  not "Ideation".
- Paragraphs of 2–4 sentences. Pull out key numbers.
- Captions on every image, stating what to notice.
- Body text 18–21px, line length 60–80 characters, on a page that works at 375px.

### Length

- 800–1,500 words and 6–12 visuals for a written case study; 3–6 minutes of reading.
- Portfolio presentations: 3–4 minutes per project in a 45-minute review, 2–3 projects.
- A longer one usually carries process that did not change the outcome.

### Outcome and metrics

- Report the metric, the baseline, the change, the time window, and your contribution:
  "Activation rose from 22% to 31% in the 8 weeks after launch (A/B test, 50/50 split)."
- Relative numbers are fine under NDA: "activation up 40%".
- Without metrics, use the next best evidence: usability test results (task
  success went from 3/8 to 7/8), adoption, qualitative quotes, or what the work
  enabled. Say plainly why there are no numbers (not launched, left before launch).
- Never invent or round up numbers. Interviewers ask.

### NDA handling

- Ask the employer or client what is allowed. Get it in writing.
- Show only what is public, or anonymize: remove the company name and logo, change
  brand colors to neutrals, replace real data with realistic fake data, blur or
  redraw sensitive screens.
- Convert absolute metrics to relative ones.
- Password-protect only when necessary; many reviewers will not open a locked page. If
  you lock it, put the password in the application.
- When little can be shown, tell the decision story in words and redraw simplified
  diagrams of the flow.

## Output

A case study in [`templates/case-study.md`](templates/case-study.md): summary block,
context, problem, constraints, process highlights, 2–4 decision blocks, outcome,
reflection, plus a visual list with captions and an NDA note.

## Verify

The case study is done when a stranger has read it for five minutes and can retell
the problem, your role, one decision with its tradeoff, and the outcome, and you
have read it on a phone at 375px and on a desktop. Then confirm:

- [ ] The headings alone tell the story
- [ ] The summary block states the outcome before any scrolling
- [ ] Each decision shows options, the choice, the tradeoff, and evidence
- [ ] Every visual has a caption saying what to notice
- [ ] "I" and "we" are used accurately
- [ ] Every metric has a baseline, a time window, and a source
- [ ] 800–1,500 words, 6–12 visuals
- [ ] Nothing confidential appears without written permission
- [ ] Images have alt text; text is real text, not baked into images

Delegate to the `design-critic` subagent for the argument and visuals, and to the
`copy-reviewer` subagent for headlines, length, and clarity. Both report only failures
with location (section and heading) and end in a verdict ("ready" or "N blocking
issues").

## Anti-patterns

- Headings that are phase names: "Research", "Ideation", "Wireframes", "Final designs"
- The full double diamond narrated step by step, with every method named and no
  decision shown
- A hero mockup of phones floating at an angle, then 30 final screens with no captions
- "I led the redesign" when the reader later learns you owned one flow
- Outcomes like "users loved it" or "improved the experience"
- Personas and journey maps included as proof of process
- Reflection that says "I learned the importance of communication"
- 4,000 words that read as a project report
- Password-protected everything with no explanation

## Related skills

- **Feeds from:** `product-design-process`, `design-brief`, `user-research`,
  `usability-testing` (evidence), `design-critique`
- **Leads to:** `art-direction` and `layout-and-hierarchy` (portfolio site presentation),
  `ux-writing` (headline and caption edit)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Nielsen Norman Group**: how people scan pages (F- and layer-cake patterns), which
  is why headlines must carry the story; also their UX portfolio guidance.
- **UX Collective**: essays from hiring managers on what they look for in case studies.
- **Refactoring UI** and **Practical Typography**: making the page itself readable.
- **Godly** and **Land-book**: portfolio sites with strong presentation, for layout.
- **Smashing Magazine**: long-form writing on presenting design work.

From [`FIBO.md`](../../FIBO.md): the decision records in `plans/` (what changed, why
now, the options, what was chosen), and the theme creator plan in particular, which
records three layouts tried and why the shipped one won. That is the shape of a good
decision block.
