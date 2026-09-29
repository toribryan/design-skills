---
name: user-research
description: >-
  Plans, runs, and synthesizes qualitative user research: screeners, recruiting,
  JTBD-style interviews that follow the Mom Test, affinity mapping, and findings
  written as observation, insight, implication. Use for "interview users", "write a
  discussion guide", "recruit participants", "synthesize these interview notes",
  "what are users' jobs to be done", or "do we need personas". Not for testing a
  design's usability (use usability-testing) or deciding what to research (use
  design-discovery).
---

# User Research

User research finds out what people actually do, in what situation, and why, so the
team designs for behavior instead of for opinions. This skill covers generative
research: interviews and contextual inquiry that uncover needs before a design exists.
The output is a set of insights, each traceable to what participants did and said, and
each ending in an implication the design team can act on.

## When to use

- The discovery plan has risky desirability assumptions to test
- The team is about to design for a group it has not spoken to in the last 3 months
- Someone asks "what do users want?" and the only answer is a feature request list
- Interview notes or transcripts exist and need synthesis
- The team is debating personas versus jobs to be done

**Not for:** watching people use a prototype or live product to find usability
problems (use `usability-testing`), deciding which questions are worth researching
(use `design-discovery`), or studying competitors' products (use `reference-research`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Research questions**: 3–5 things the team needs to learn, tied to assumptions
  [take them from the `design-discovery` research plan; if none, write them and state
  them before recruiting]
- **Segments**: the groups whose behavior may differ [one primary segment; add a second
  only if you expect different jobs]
- **Access to participants**: customer list, panel, support queue, community [ask; if
  none, budget for a panel such as User Interviews or Respondent]
- **Incentive budget** [USD 75–150 per 60 minutes for consumers, 150–300 for
  professionals, more for specialists such as clinicians or engineers]
- **Timeline** [2–3 weeks: 1 to recruit, 1 to interview, 2–4 days to synthesize]
- **Existing evidence**: past research, support tickets, analytics [search first;
  never re-ask what the team already knows]

## Process

1. **Write the research questions.** What the team needs to learn, not what it will
   ask participants. "How do admins decide when an import is trustworthy?" is a research
   question; nobody should be asked it directly. Output: 3–5 questions, each linked to
   an assumption.
2. **Write the screener.** Screen on behavior in a recent, specific window ("imported
   data into a tool in the last 30 days"), not on self-description ("tech savvy").
   Model: [`templates/screener.md`](templates/screener.md); copy that shape. Output: a
   screener of 6–10 questions with qualify and disqualify rules.
3. **Recruit.** Over-recruit by 20–25% for no-shows. Mix sources so one channel's bias
   does not dominate (customers who answer emails are your happiest ones). Output: a
   schedule of participants per segment.
4. **Write the discussion guide.** Warm-up, a timeline of the last real occurrence, the
   forces behind it, and wrap-up. Model:
   [`templates/discussion-guide.md`](templates/discussion-guide.md); copy that shape.
   Read [`references/interviewing.md`](references/interviewing.md) for JTBD and Mom Test
   technique before writing questions. Output: a guide for a 45–60 minute session.
5. **Pilot once.** Run the guide with one colleague or friendly participant. Cut the
   questions that got a generic answer, reorder the ones that felt abrupt. Output: a
   revised guide.
6. **Run the sessions.** One interviewer, one note-taker, recorded with consent. Aim for
   the participant speaking 80% of the time. Debrief for 10 minutes right after each
   session while memory is fresh. Output: a transcript or notes plus a 5-line debrief
   per session.
7. **Synthesize with affinity mapping.** One note per observation, clustered bottom-up
   into themes (the KJ method, after Jiro Kawakita). Name clusters by the finding, not
   the topic. Output: a clustered board.
8. **Write insights.** For each theme that holds across participants: observation, then
   insight, then implication. Model: [`templates/synthesis.md`](templates/synthesis.md);
   copy that shape. Output: 5–10 insights, each with evidence counts.
9. **Update the assumption map.** Mark each tested assumption as supported, weakened, or
   refuted, with the evidence. Output: a revised map returned to `design-discovery` or
   `design-brief`.

## Standards

### Sample size

| Study | Per segment | Why |
| --- | --- | --- |
| Generative interviews | 5–8 | Guest, Bunce and Johnson (2006) found most themes emerged within the first 6 and saturation by 12 in a homogeneous group |
| JTBD switch interviews | 8–12 total | Enough to see the forces repeat across different switching moments |
| Contextual inquiry | 4–6 | Each session is long (90–120 min) and dense |
| Diary study | 10–15 | Expect 20–30% dropout over 1–2 weeks |

Stop when two consecutive sessions produce no new theme. If every session is still
surprising at 8, the segment is too broad; split it.

### Sessions

- 45–60 minutes. Under 30 is too short to reach a specific story; over 75, answers
  degrade.
- Leave 30 minutes between sessions for the debrief and a buffer.
- Remote by default; in person or on-site when the environment matters (warehouse,
  clinic, a parent at a kitchen table).
- Ask for consent to record in the scheduling message and again on the recording.

### The Mom Test

From Rob Fitzpatrick's *The Mom Test* (2013). Three rules, applied to every question:

1. Talk about their life, not your idea.
2. Ask about specifics in the past, not generics or opinions about the future.
3. Talk less and listen more.

In practice:

| Instead of | Ask |
| --- | --- |
| "Would you use a tool that…?" | "Tell me about the last time you did {task}." |
| "How often do you…?" | "When was the last time? And the time before?" |
| "Is this a problem for you?" | "What have you tried to fix it? What did that cost?" |
| "What features would you want?" | "Walk me through what you did next." |
| "Would you pay for…?" | "What do you pay for today to deal with this?" |

Compliments, hypotheticals ("I would definitely…"), and generic claims ("I always…")
are not data. Note them, then redirect to a specific past instance.

### Personas vs. jobs to be done

- **Jobs to be done** (Clayton Christensen, *Competing Against Luck*; Bob Moesta's
  switch interview) describe the progress a person is trying to make in a situation.
  Write them as job stories (the format Alan Klement popularized at Intercom): "When
  {situation}, I want to {motivation}, so I can {expected outcome}." Use JTBD when
  behavior depends more on the situation than on who the person is. For most product
  work, that is the default.
- **Personas** (Alan Cooper, *The Inmates Are Running the Asylum*, 1999) describe
  archetypal people. Use them when segments differ in goals, skills, or context in ways
  that change the design (a clinician and a patient using the same record). Base each
  on 5+ interviews; label anything else a proto-persona.
- Never use demographic personas (age, hobbies, stock photo) as design input. Nothing in
  them predicts behavior.

### Insights

- **Observation**: what was seen or said, with counts ("6 of 8 exported to a
  spreadsheet before trusting the import").
- **Insight**: why it happens, the interpretation ("Admins don't trust a result they
  can't inspect row by row").
- **Implication**: what the design should do or test ("Show a verifiable diff of changed
  rows before commit").
- A theme needs 3+ participants, or 2 in a segment of 5, to be called a pattern. Below
  that, report it as a signal to watch.
- Keep one or two verbatim quotes per insight. Quotes illustrate; counts carry the weight.

## Tools

- **Figma MCP (FigJam).** If connected, build the affinity board in FigJam: one sticky
  per observation, color by participant. If not, cluster in a Markdown file with one
  line per note and a participant code; say so in one line.
- **Transcripts.** If recordings are transcribed, tag each observation with participant
  code and timestamp (`P4 12:30`) so every insight can be traced.
- **Analytics.** If connected, check whether a behavior participants describe shows up
  at scale before calling it a pattern.

## Output

- A screener and a discussion guide from the templates above
- Per-session notes and debriefs
- A synthesis document from [`templates/synthesis.md`](templates/synthesis.md):
  research questions answered, participant table, 5–10 insights with evidence, job
  stories or personas, updated assumptions, and open questions

## Verify

Research is done when all of these are true:

- [ ] Every research question has an answer or is marked "not answered" with a reason
- [ ] The screener qualifies on recent behavior, and every participant passed it
- [ ] At least 5 sessions per segment were run, and the last two added no new theme
- [ ] No question in the guide asks about the future, a hypothetical, or the idea itself
- [ ] Every insight has observation, insight, and implication, and an evidence count
      (n of N)
- [ ] Every insight traces to participant codes and timestamps
- [ ] Contradicting evidence is reported next to the insight it contradicts
- [ ] The assumption map is updated, with each tested assumption marked
- [ ] Recordings and personal data are stored per the consent given, and names are
      replaced with codes in shared documents

Before sharing, have the `copy-reviewer` agent read the synthesis for leading or
overstated language ("users love", "everyone wants").

## Anti-patterns

- Pitching the idea in the interview, then counting polite agreement as validation
- Screening on attitude ("interested in productivity") instead of recent behavior
- Recruiting only from power users or the customer advisory board
- Asking "would you use…" or "how much would you pay…"
- Synthesizing from memory a week later instead of from notes and debriefs
- Topic clusters ("Onboarding", "Pricing") instead of finding clusters ("Admins wait for
  a colleague before inviting the team")
- Reporting a single vivid quote as a pattern
- Personas with names, ages, and hobbies and no behavior
- Research that ends in a deck and never updates a decision

## Related skills

- **Feeds from:** `design-discovery` (research questions and assumptions)
- **Leads to:** `design-brief` (audience, JTBD, evidence), `information-architecture`
  (users' own words become labels), `usability-testing` (evaluate the design that
  follows), `ux-writing` (vocabulary participants actually use)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Nielsen Norman Group**: articles on interview technique, affinity diagramming, and
  when to use personas versus jobs.
- **Laws of UX**: the peak-end rule and related effects, which explain why a recalled
  story differs from what happened and why you probe for the timeline.
- **UX Collective**: practitioner write-ups on synthesis and on JTBD in product teams.
- **Design Books**: Steve Portigal, *Interviewing Users*; Rob Fitzpatrick, *The Mom
  Test*; Clayton Christensen et al., *Competing Against Luck*; Erika Hall, *Just Enough
  Research*; Indi Young, *Mental Models*.
