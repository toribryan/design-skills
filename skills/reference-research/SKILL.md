---
name: reference-research
description: >-
  Runs structured inspiration and competitive pattern research: collects real screens
  and flows from Mobbin (via the Mobbin MCP when connected), Page Flows, Refero, Godly
  and similar galleries, annotates why each works, compares patterns across 5–10
  products, and extracts principles. Use for "find references", "how do other apps do
  X", "competitive analysis", "moodboard", "pattern research", or "look at Mobbin". Not
  for interviewing users (use user-research) or setting visual direction (use
  art-direction).
---

# Reference Research

Reference research looks at how shipped products solve the same problem, so the team
starts from the field's accumulated answers instead of a blank canvas. The goal is not
a folder of screenshots. It is a short list of principles, each backed by several
products, plus a clear view of where the field converges (follow it; people expect it)
and where it splits (a real design decision). The output is an annotated reference
board and a pattern comparison matrix.

## When to use

- Before wireframing a flow the team has not designed before (onboarding, checkout,
  permissions, import, cancellation)
- A stakeholder says "make it like {product}" and nobody has said which part or why
- Competitive analysis for a redesign or a new category
- Choosing between two interaction patterns and wanting to see which is conventional
- Building a moodboard for a landing page or brand refresh

**Not for:** learning what users need (use `user-research`), setting the visual
language once references are chosen (use `art-direction`), or reviewing your own
design (use `design-critique`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **The question**: exactly what you need to learn ["how do products handle
  {flow} for {user}"; write it and state it]
- **Scope**: which flow, screen, or section [the primary task from the brief]
- **Platform**: iOS, Android, web [match the product; web if unknown]
- **Product set**: direct competitors, adjacent products with the same job, and 1–2
  best-in-class products from another category [5–10 total; propose a list]
- **Constraints to respect**: platform conventions, design system, accessibility,
  regulation [from `design-brief`]
- **Kind of research**: pattern (how it works) or aesthetic (how it looks) [pattern;
  aesthetic only for marketing and brand work]

## Process

1. **Write the research question and product set.** One sentence, plus a table of
   5–10 products with why each is included. At least 2 must be outside the direct
   category (a bank studying a travel app's itinerary view). Output: question and
   product table.
2. **Collect.** Search the sources below, in order of fit. Capture the full flow, not
   only the hero screen: entry point, each step, confirmation, the empty state, the
   error state. Aim for 20–40 captures. Output: raw captures with source link,
   product, platform, and date.
3. **Annotate every keeper.** For each kept capture, write what it does, why it works
   (the mechanism), the trade-off it makes, and whether it applies to your context.
   Model: [`templates/reference-board.md`](templates/reference-board.md); copy that
   shape. Output: 12–25 annotated references. Discard the rest.
4. **Break the flow into decisions.** List the 6–12 decisions every product in the set
   had to make (where does it start, how many steps, when is account creation asked,
   what's the default, how is progress shown). Output: the rows of the matrix.
5. **Fill the comparison matrix.** Products as columns, decisions as rows, one short
   answer per cell. Model: [`templates/pattern-matrix.md`](templates/pattern-matrix.md);
   copy that shape. Output: a filled matrix.
6. **Read the matrix for convergence and divergence.** Where 70% or more of products
   agree, note it as a convention. Where they split, note the split and what explains
   it (audience, business model, platform). Output: a convention list and a decision
   list.
7. **Extract principles.** Write 3–7 principles, each a behavior supported by 3 or more
   references, in the form "Do X, because Y (seen in A, B, C)". Output: the principles.
8. **Name what not to copy.** Dark patterns, patterns that depend on something you lack
   (a huge catalog, a known brand, native APIs), and things that work only because of
   the product's scale. Output: an avoid list with reasons.

## Standards

### Sources, by question

| Question | Start with | Then |
| --- | --- | --- |
| How do real apps handle this screen or flow? | Mobbin (screens, flows) | Page Flows, Refero |
| What does the full end-to-end journey look like? | Page Flows (recorded videos) | Mobbin flows |
| Which component or pattern variant is common? | Refero, UI Patterns | Mobbin screens |
| Is there test evidence for a pattern? | Good UI | Nielsen Norman Group articles |
| Is the pattern accessible? | Inclusive Components | the relevant WAI-ARIA pattern |
| How ambitious can a marketing page be? | Godly, Awwwards | Land-book, SaaS Landing Page, Lapa Ninja |
| Navigation or footer specifically | Navbar Gallery, Footer.design | Mobbin sections |
| Small moments of craft | Design Spells | Rauno Freiberg's interaction guidelines |
| Identity and type in use | Brand New, Fonts In Use | Abduzeedo |

Dribbble is mood, not evidence. A shot has not shipped, has not met real content, and
has not been used by anyone. Never cite it as proof a pattern works.

### Mobbin MCP

If the Mobbin MCP is connected, use it before browsing manually:

- `search_flows` for multi-step journeys ("onboarding with workspace creation and team
  invite"). Start with a limit of 5; it returns evenly spaced screens per flow.
- `search_screens` for a single screen ("empty state for a project list with a create
  button"). Limit 10–20.
- `search_sections` for marketing website sections (pricing table, hero, footer).
- Describe one screen or one journey per query, in concrete UI terms. No style words
  ("clean", "modern"), no negations, no two intents in one query. Name an app to filter
  to it. Set `platform` as a parameter, not in the query text.
- Look at the returned images before describing anything; metadata alone is not enough.
- Cite each reference with its `mobbin_url`. If saving images to a board, download from
  `image_url`; those links expire after 30 days.

If the Mobbin MCP is not connected, say so in one line and use the browser or ask for
screenshots.

### Capture

- Full flow, in order, at native resolution. A single hero screen hides the decisions.
- Record product, platform, date captured, and source URL for every image. Products
  change; a reference without a date is a rumor.
- Include the unglamorous states: empty, error, loading, permission prompt, cancel.
- Capture your own current product with the same method, as the first column.

### Annotation

Each annotation answers four questions in 1–2 lines each:

- **What:** what the screen does, in neutral terms
- **Why it works:** the mechanism ("defers account creation until after the first
  success, so the value is felt before the cost")
- **Trade-off:** what it gives up ("fewer verified emails on day 1")
- **Fit:** applies / applies with changes / does not apply, and why

"Nice", "clean", and "love this" are not annotations.

### Principles, not copies

- A principle is supported by 3+ products and states a behavior and a reason.
- Borrow the mechanism, never the pixels, copy, or illustration. If a reviewer can name
  the source product from your screen, you copied.
- A convention that 70%+ of products share is a reason to follow it (Jakob's Law:
  people spend most of their time on other products). Depart only with a stated reason.

## Tools

- **Mobbin MCP**: see above.
- **Browser (Playwright)**: capture live sites at 1440 and 390 widths, full page, when a
  source is not in a gallery. Note the date.
- **Figma MCP**: if connected, lay out the board on a page named "References – {date}",
  one row per product in flow order, annotations as text beside each frame.

## Output

- An annotated reference board from
  [`templates/reference-board.md`](templates/reference-board.md), or a Figma page in
  the same structure
- A pattern comparison matrix from
  [`templates/pattern-matrix.md`](templates/pattern-matrix.md), with conventions,
  decisions, principles, and an avoid list

## Verify

Research is done when all of these are true:

- [ ] The research question is written, and every reference answers part of it
- [ ] 5–10 products, including 2+ from outside the direct category and your own current product
- [ ] Every reference has product, platform, date, and source link (a `mobbin_url` for Mobbin)
- [ ] Every kept reference has what, why it works, trade-off, and fit
- [ ] The matrix covers 6–12 decisions, with every cell filled or marked "n/a"
- [ ] Conventions (70%+ agreement) and splits are listed separately
- [ ] 3–7 principles, each citing 3+ products
- [ ] An avoid list exists, including any dark patterns seen
- [ ] No Dribbble shot is used as evidence

Give the principles and the board to the `design-critic` agent as the comparison set
when it reviews the wireframes that follow.

## Anti-patterns

- A moodboard of 60 screenshots with no annotation and no question
- Researching only direct competitors, so the team converges on the category's average
- Capturing hero screens and skipping the empty, error, and cancel states
- "Make it like Linear" without naming which decision, and why it fits here
- Copying a pattern that works because of the source's scale or brand trust
- Treating Dribbble or award sites as evidence of usability
- Undated references, so nobody knows the product has since changed
- Borrowing dark patterns (confirmshaming, pre-checked upsells, hidden cancellation)
  because a large company ships them

## Related skills

- **Feeds from:** `design-discovery` (the question), `design-brief` (scope and
  constraints)
- **Leads to:** `wireframing` (directions built on the principles),
  `information-architecture` (navigation conventions), `landing-page-design` and
  `art-direction` (aesthetic references), `design-critique` (comparison set)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Mobbin** and **Mobbin MCP**: the default source for screens and flows.
- **Page Flows**: recorded journeys, best for onboarding, checkout, and cancellation.
- **Refero** and **UI Patterns**: pattern-tagged reference and problem/solution framing.
- **Good UI**: A/B-tested patterns, for when a decision needs evidence.
- **Inclusive Components**: check any borrowed pattern for accessibility.
- **Godly**, **Awwwards**, **Land-book**, **SaaS Landing Page**: marketing and aesthetic
  reference only.
- **Laws of UX**: Jakob's Law, the argument for following conventions.
