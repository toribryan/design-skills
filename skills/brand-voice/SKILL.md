---
name: brand-voice
description: >-
  Defines how a brand sounds in writing: 3–4 voice attributes with do/don't
  examples, a tone map across contexts (onboarding, errors, success, marketing,
  legal), word lists, and before/after rewrites, documented so any writer or UI
  string stays on-voice. Use for "brand voice", "tone of voice", "voice and tone
  guide", "how should we sound", "our copy is inconsistent", or "word list". Not
  for writing specific UI strings (use ux-writing).
---

# Brand Voice

Voice is the brand's personality in words, and it stays constant. Tone is how that
voice adjusts to the moment: a person reading an error is in a different state than a
person reading a launch announcement. Mailchimp's content style guide made this split
standard, and this skill uses it. The output is a voice guide that a new
writer, a product designer, or a support agent can use to write something on-voice
the first time. The standard: every attribute comes with rewrites that show it, and
two writers given the same brief produce copy that sounds like the same company.

## When to use

- A new brand, or a brand platform that exists without a voice layer
- Copy across product, marketing, support, and email sounds like different companies
- Hiring writers or scaling content, and needing a shared reference
- Deciding how formal, funny, or technical the brand can be

**Not for:** writing or reviewing specific interface strings, error messages, or
empty states (use `ux-writing`), or the brand's positioning and attributes (use
`brand-strategy`).

## Inputs

- **Brand attributes** from the brand platform [if missing, infer 3–4 from the product
  and state the guess; strategy and voice can be drafted together for small teams]
- **Audience**: who reads this, their expertise, their state when they read [from the
  platform]
- **Existing copy**: 20–40 samples across site, product UI, emails, support macros,
  legal [collect them; this is the audit]
- **Customer language**: verbatim phrases from interviews, reviews, tickets [from
  `user-research`, or mine public reviews]
- **Constraints**: regulated claims, localization languages, reading level [assume
  plain English at grade 8 or lower for product copy]

## Process

1. **Audit existing copy.** Collect 20–40 samples and sort them into on-voice,
   off-voice, and "no voice" (generic). Output: a table with each sample, context, and
   what is wrong or right.
2. **Place the brand on NN/g's four tone dimensions** (Kate Moran, 2016): funny ↔
   serious, formal ↔ casual, respectful ↔ irreverent, enthusiastic ↔ matter-of-fact.
   Output: a position on each, with the reason from the attributes.
3. **Write 3–4 voice attributes.** Each is a "this, not that" pair with a paragraph,
   do/don't examples, and one before/after. Model: the attribute block in
   [`templates/voice-guide.md`](templates/voice-guide.md). Copy that shape. Output:
   attribute section.
4. **Build the tone map.** For each context, the reader's likely state, the tone
   adjustment, and an example. Model: the tone map table in the template. Output:
   tone map for at least onboarding, empty states, errors, success, marketing,
   transactional email, support, and legal.
5. **Write word lists.** "We say / we don't say" with a reason per row, plus product
   terms with definitions and capitalization. Output: word list and glossary.
6. **Set mechanics.** Casing, punctuation, numbers, dates, contractions, emoji policy,
   inclusive language. Output: a short mechanics section; defer anything detailed to
   the product's UX writing style guide.
7. **Rewrite real samples.** Take 8–10 off-voice samples from the audit and rewrite
   them. Output: before/after pairs with a line on what changed.
8. **Test with writers.** Give the guide and the same three briefs to two people who
   were not involved. Compare. Output: revisions where their results diverged.

## Standards

### Attributes

- 3–4 attributes. Each one must change a sentence. If removing an attribute would
  not change any rewrite, cut it.
- Pair each with the failure it slides into when overdone:

| This | Not that | Do | Don't |
| --- | --- | --- | --- |
| Direct | Curt | "Your card was declined. Try another card or contact your bank." | "Declined." |
| Warm | Gushing | "Nice work. Your first invoice is out." | "Woohoo!! You're absolutely crushing it!!" |
| Expert | Jargon-heavy | "Your site is slow because images aren't compressed." | "LCP regression due to unoptimized raster assets." |
| Plainspoken | Flat | "We'll email you when it ships." | "A notification will be dispatched upon fulfillment." |

### Tone map

Voice stays fixed; tone moves along the dimensions from step 2, within a set range.

| Context | Reader's state | Tone shift | Example |
| --- | --- | --- | --- |
| Onboarding | Curious, unsure | Warmer, encouraging, brief | "Add your first project. You can change everything later." |
| Empty state | Neutral | Helpful, points to the next action | "No invoices yet. Create one to get paid." |
| Error | Frustrated, blocked | Most serious and plain; no humor, no blame | "We couldn't save your changes. Check your connection and try again." |
| Destructive confirm | Cautious | Precise about consequences | "Delete 12 files? This can't be undone." |
| Success | Relieved | Brief acknowledgment, then out of the way | "Payment sent." |
| Marketing | Evaluating | Most expressive the voice allows | {headline} |
| Transactional email | Checking a fact | Fact first, then detail | "Your order shipped. Arrives Thursday." |
| Support | Stressed | Empathetic, specific, owns the problem | "That's on us. Here's what happened..." |
| Legal and billing | Wary | Plain and complete; voice recedes | "You can cancel any time. You'll keep access until {date}." |

Humor never appears in errors, payments, security, or anything involving loss.

### Word lists

- 15–30 rows of "we say / we don't say", each with a reason. Pull the "we say" column
  from customer language wherever possible.
- A glossary of product terms: one term per concept, with capitalization. Two words
  for one thing ("workspace" and "team") is the most common cause of confusion.

| We say | We don't say | Why |
| --- | --- | --- |
| Sign in | Log in, login (as verb) | One term everywhere; matches the button |
| Delete | Remove, trash (for permanent actions) | "Remove" implies it can come back |
| Can't | Unable to | Contractions sound like a person |
| Team | Workspace, org | Customers say "team" in interviews |

### Mechanics (defaults; adjust and write down)

- Sentence case for headings and buttons.
- Contractions yes. Exclamation marks: at most one per screen, never in errors.
- Numbers as numerals ("3 files"). Dates unambiguous ("Mar 4, 2026", not "3/4/26").
- "You" for the reader; "we" for the company, and only when the company acted.
- Emoji: decide once. Default: none in product UI.
- Grade 8 or lower reading level for product copy (Hemingway or Flesch-Kincaid check).

### How voice feeds ux-writing

The voice guide sets personality and tone ranges; `ux-writing` applies them to
specific strings with patterns (error = what happened + why + what to do). Put the
tone map and word list where UX writers work: the design system docs and the string
review checklist. Voice is not a license to add personality to every string: in UI,
clarity wins every conflict, and voice shows mostly in word choice and in the few
moments with room for it (onboarding, empty states, success).

## Output

A voice guide in [`templates/voice-guide.md`](templates/voice-guide.md): summary,
tone dimensions, attributes with do/don't and rewrites, tone map, word list and
glossary, mechanics, and a rewrite gallery. Also a one-page cheat sheet (attributes,
the tone map row for errors, top 10 words) for people who will not read the full guide.

## Verify

The guide is done when two writers who were not involved have used it on the same
three briefs (one error, one onboarding screen, one marketing paragraph) and their
drafts read as the same company, and you have read every sample in it aloud.
Then confirm:

- [ ] Each attribute has a "not that", at least two do/don't pairs, and one rewrite
- [ ] The tone map covers onboarding, empty, error, success, marketing, email,
      support, and legal
- [ ] Errors and legal contexts contain no humor
- [ ] Every word-list row has a reason, and the glossary has one term per concept
- [ ] Rewrites come from real audit samples, not invented examples
- [ ] Product copy samples score at or below grade 8

Delegate to the `copy-reviewer` subagent to check sample strings and the rewrite
gallery against the guide, and to the `brand-reviewer` subagent to check the voice
against the brand platform's attributes. Both report only failures with location and
end in a verdict ("ready" or "N blocking issues").

## Anti-patterns

- Attributes like "human", "friendly", "clear" with no "not that" and no example
- Voice guides that only show marketing copy, so nobody knows how an error should sound
- Jokes in error messages, payment failures, or outage notices
- Forced personality in every button and tooltip ("Let's gooo!")
- Word lists that ban words without saying what to use instead
- Two terms for one concept across product and docs
- A guide that describes the voice in abstractions without a single before/after

## Related skills

- **Feeds from:** `brand-strategy` (attributes and audience), `user-research`
  (customer language)
- **Leads to:** `ux-writing` (string-level application), `landing-page-design`,
  `design-system-docs` (content guidelines), `art-direction` (headlines in campaigns)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Nielsen Norman Group**: "The Four Dimensions of Tone of Voice" for step 2, and tone
  research on user perception of casual versus formal copy.
- **Shopify Polaris** content guidelines: voice and tone, word list, and grammar rules
  organized for product teams; a model for structure.
- **Atlassian Design** content design section: voice principles with product examples.
- **GitHub Primer**: content guidelines tied to components.
- **Apple HIG** writing section: restraint and platform conventions.
- **Brand New**: how a verbal identity accompanies a visual rebrand.

From [`FIBO.md`](../../FIBO.md): headings and UI copy in sentence case, and each
component docs page's "Usage" rule stated in one sentence, as a model for how voice
rules should read: one rule, one example.
