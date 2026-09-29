---
name: brand-strategy
description: >-
  Produces a brand platform: purpose, positioning statement, audience, brand
  attributes as "this, not that" pairs, competitive map, pillars, and promise, so
  identity, voice, and product decisions have something to be checked against. Use
  for "brand strategy", "positioning", "brand platform", "who are we", "brand
  attributes", "how are we different", or "brand pillars". Not for logos, color,
  or type (use brand-identity) or how the brand writes (use brand-voice).
---

# Brand Strategy

A brand strategy is the set of decisions that everything visible about a brand should
follow from: who it is for, what it claims, why that claim is believable, and how it
differs from the alternatives. The output is a brand platform of two to four pages
that a designer, writer, or engineer can use to settle a disagreement. The standard:
every statement in the platform is specific enough that a competitor could not sign
it, and every attribute rules something out.

## When to use

- A new product or company needs a name-independent foundation before identity work
- A rebrand or refresh, where the old platform is missing or too vague to guide choices
- Teams disagree about tone, visuals, or feature emphasis and have nothing to point at
- Positioning has drifted after a pivot or a move into a new market

**Not for:** visual identity (use `brand-identity`), voice and word choice (use
`brand-voice`), or a single project's goals and constraints (use `design-brief`).

## Inputs

- **The business**: what it sells, to whom, how it makes money [ask; this one blocks]
- **Founders' or leaders' intent**: why it exists, in their words [interview 2–4 people,
  30–45 minutes each]
- **Customer evidence**: interviews, reviews, support tickets, sales call notes [if none,
  run 5–8 customer interviews via `user-research`, or mine public reviews]
- **Competitive alternatives**: named competitors plus the non-product alternatives
  (spreadsheets, an agency, doing nothing) [list the top 5 the sales team loses to]
- **Existing brand material**: decks, site, old guidelines [audit before rewriting]

## Process

1. **Gather evidence.** Interview stakeholders and read customer evidence. Pull exact
   phrases customers use for the problem and for the product. Output: a page of
   verbatim quotes grouped by theme.
2. **Map the competitive landscape.** Choose two axes that matter to buyers and that
   separate the field, place 6–10 alternatives, and find the open space. Model: the
   map section of [`templates/brand-platform.md`](templates/brand-platform.md). Copy
   that shape. Output: a 2x2 with a sentence on where the brand sits and why that
   space is real, not empty because nobody wants it.
3. **Write the purpose.** One sentence on why the company exists beyond revenue.
   Output: purpose statement, plus two rejected drafts and why they were rejected.
4. **Write the positioning statement** using Geoffrey Moore's template from *Crossing
   the Chasm* (1991), below. Check it against April Dunford's inputs from *Obviously
   Awesome* (2019): competitive alternatives, unique attributes, value, best-fit
   customers, market category. Output: the filled template.
5. **Define the audience.** A primary audience described by situation and need, not
   demographics alone, plus at most two secondary audiences. Output: audience section.
6. **Choose 3–5 brand attributes as "this, not that" pairs.** Model: the attributes
   table in the template. Output: pairs with a one-line behavior each.
7. **Optionally pick an archetype.** Only if the team finds it useful as shorthand.
   Output: one primary archetype, or "not used".
8. **Set 3–4 brand pillars and the promise.** Pillars are the themes the brand talks
   about and proves; the promise is what a customer can count on every time. Output:
   pillars with proof points, and a one-sentence promise.
9. **Pressure-test.** Swap in a competitor's name. Anything that still reads as true
   gets rewritten. Output: the final platform in the template.

## Standards

### Positioning statement (Moore)

> For **[target customer]** who **[statement of need or opportunity]**, **[product
> name]** is a **[product category]** that **[key benefit, reason to buy]**. Unlike
> **[primary competitive alternative]**, our product **[primary differentiation]**.

- The target customer is narrow enough to find: "operations leads at 50–500 person
  logistics companies", not "businesses".
- The category is one a buyer already understands. Inventing a category is expensive;
  do it only with evidence and budget.
- The differentiation is provable. If there is no proof point, it is an aspiration.
- Positioning is internal. It is never marketing copy as written.

### Attributes

- 3–5 attributes. More than 5 and none of them steer anything.
- Each attribute is a pair: **this, not that**, where "that" is a tempting neighbor,
  not an opposite nobody would choose.

| This | Not that | In practice |
| --- | --- | --- |
| Confident | Arrogant | States facts plainly; never compares by name in product UI |
| Precise | Pedantic | Uses exact numbers; skips jargon a customer did not use first |
| Warm | Cute | Acknowledges effort; no mascots in error states |
| Calm | Bland | Low saturation, generous space, one bold move per page |

"Innovative", "trustworthy", "quality", and "customer-focused" fail as attributes:
every competitor claims them, and they rule nothing out.

### Archetypes (use sparingly)

The 12 archetypes from Margaret Mark and Carol Pearson's *The Hero and the Outlaw*
(2001), after Jung (Creator, Sage, Explorer, Hero, Outlaw, Magician, Everyman, Lover,
Jester, Caregiver, Ruler, Innocent) are a vocabulary, not a strategy. Use one primary
archetype at most, as shorthand for tone. They collapse nuance, and many brands in one
category pick the same one (most developer tools claim Sage or Creator). Skip them if
the attributes already do the job.

### Competitive map

- Axes are buyer-relevant tradeoffs, not "good vs. bad". "Price vs. quality" puts
  everyone in the top right. Use tensions like *self-serve ↔ high-touch*, *specialist
  ↔ generalist*, *opinionated ↔ flexible*, *playful ↔ serious*.
- Include non-product alternatives (spreadsheets, hiring someone, doing nothing).
- Plot 6–10 alternatives from evidence (pricing pages, reviews, sales notes), not gut.
- Make two or three maps with different axes; keep the one that best explains why
  customers choose.

### Pillars and promise

- 3–4 pillars, each with at least two proof points (a feature, a number, a policy).
- The promise is one sentence, testable against experience: "Your data is exportable,
  in full, any time" is testable; "We put you first" is not.

### Length

The platform fits on 2–4 pages. If it needs more, it has not made its choices yet.

## Output

A brand platform in [`templates/brand-platform.md`](templates/brand-platform.md):
evidence summary, purpose, positioning, audience, attributes, optional archetype,
competitive map, pillars, promise, and a "what this means for design, voice, and
product" section with three to five concrete implications each.

## Verify

The platform is done when:

- [ ] Each statement fails the competitor swap test (it would be false for them)
- [ ] The positioning statement fills every slot of Moore's template, with a named
      alternative in "Unlike"
- [ ] Every attribute has a "not that" and a behavior a reviewer could observe
- [ ] Every pillar has at least two proof points that exist today
- [ ] The competitive map's axes came from customer evidence, and at least one
      non-product alternative is plotted
- [ ] Three people outside the project read it and each can answer, unaided: who is
      it for, what is it, why pick it over the alternative
- [ ] Two real decisions (a homepage headline, an error message, a feature priority)
      have been settled by pointing at it

Delegate a review to the `design-critic` subagent for specificity and internal
consistency; it reports only the statements that fail, with section, and ends in a
verdict ("ready" or "N blocking issues"). Once identity and voice work begins, the
`brand-reviewer` subagent checks them against this platform.

## Anti-patterns

- Attributes that every competitor would also claim ("innovative", "simple")
- Purpose statements that are a mission to "empower" or "revolutionize" something
- Positioning written as a tagline, then pasted on the homepage
- A competitive map with the brand alone in the top-right corner of "quality vs. value"
- Personas built from demographics with a stock photo and no need or situation
- Choosing an archetype first and reverse-engineering the strategy from it
- A 40-page platform nobody opens after the launch presentation
- Strategy written only from leadership interviews, with no customer language in it

## Related skills

- **Feeds from:** `design-discovery`, `user-research` (customer language),
  `reference-research` (competitor audit)
- **Leads to:** `brand-identity`, `brand-voice`, `art-direction`, `motion-language`
  (attributes into motion), `landing-page-design`, `design-brief`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Brand New**: read the stated strategy behind redesigns, and the critiques of where
  the identity did or did not follow from it.
- **Mobbin** and **Page Flows**: how competitors onboard and sell; evidence for the map.
- **SaaS Landing Page** and **Land-book**: competitor positioning as actually published,
  grouped by category.
- **Nielsen Norman Group**: interview methods for step 1.
- **Design Books**: *Crossing the Chasm*, *Obviously Awesome*, Marty Neumeier's *Zag*
  (the "onliness" statement is a useful second test for differentiation).

From [`FIBO.md`](../../FIBO.md): the decision-record format in `plans/` (what is
changing, why now, the options, what was chosen) is a good model for recording
why each positioning option was rejected.
