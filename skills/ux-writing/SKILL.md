---
name: ux-writing
description: >-
  Writes and reviews interface copy: button labels, error messages, empty states,
  confirmations, form labels and hints, notifications, and onboarding, with rules for
  tone, sentence case, reading level, and inclusive language. Use for "write the
  copy", "microcopy", "error message", "button label", "empty state text", "this
  wording is confusing", or "content review". Not for defining the brand's voice
  and personality (use brand-voice) or long-form marketing pages (use
  landing-page-design).
---

# UX Writing

Interface copy is part of the interaction. Every label, message, and hint either
helps someone finish a task or makes them stop and think. UX writing makes copy
specific, short, and consistent, and makes sure it says what happens next. The output
is copy for every string on the screens in scope, with a content pattern sheet so the
same situation always gets the same words.

## When to use

- A design has placeholder labels ("Button", "Error text here")
- Error messages say "Something went wrong" or show codes
- Empty states, confirmations, or onboarding need writing
- A usability test or critique found clarity issues in copy
- Copy across the product is inconsistent ("Delete" vs "Remove" vs "Trash")

**Not for:** defining brand personality and voice attributes (use `brand-voice`),
marketing headlines and landing page narrative (use `landing-page-design`), or
information architecture and navigation labels at the sitemap level (use
`information-architecture`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Screens or strings in scope**: Figma frames, screenshots, a URL, or a strings
  file (`en.json`, `.strings`) [ask]
- **Voice guidelines** [use `brand-voice` output if it exists; otherwise clear,
  direct, and warm, and state the assumption]
- **Audience and context**: expertise, device, stress level [general audience, on
  the go]
- **Existing terminology**: glossary, or the words the product already uses [grep the
  codebase and strings files for the current terms]
- **Constraints**: character limits, localization, truncation widths [allow for 30%
  expansion in translation; 40% for short strings]

## Process

1. **Inventory strings.** List every piece of text on the screens in scope, with its
   type (button, label, hint, error, empty state, toast, heading). Include states
   that are not visible by default. Output: a string inventory table.
2. **Fix the terminology.** One word per concept, one concept per word. Pick the term
   people use, not the internal one. Output: a glossary of 5–20 terms with
   rejected synonyms.
3. **Set the tone for each moment.** Voice stays constant; tone shifts with the
   situation. Place each moment on NN/g's four tone dimensions (funny ↔ serious,
   formal ↔ casual, respectful ↔ irreverent, enthusiastic ↔ matter-of-fact). Errors
   and destructive actions go serious and matter-of-fact. Output: a tone line per
   moment type.
4. **Write by pattern.** Draft each string using the content patterns table below.
   Model: [`references/before-after.md`](references/before-after.md), which shows each
   pattern rewritten. Copy that shape. Output: new copy next to old copy.
5. **Check length and fit.** Put the copy into the real component at the real width,
   at 390px, and with 30–40% expansion. Output: screenshots or notes on truncation.
6. **Check reading level and inclusivity.** Run a readability check on longer
   strings and scan for the words in "Inclusive language". Output: a list of changes.
7. **Hand off as strings.** Keys, copy, and a note for translators where meaning is
   ambiguous. Output: a strings table or a diff to the strings file.

## Standards

### Voice vs tone

- **Voice** is who the product is. It does not change between screens.
- **Tone** is how that voice adapts to the moment. A success toast can be warm; a
  payment failure cannot be playful.
- Humor never appears in errors, destructive confirmations, security, payment, or
  anything involving health or money lost.

### Mechanics

- **Sentence case** for everything: headings, buttons, labels, menu items, tabs.
  Capitalize only the first word and proper nouns. Title Case reads as shouting in UI
  and breaks on translation.
- **Front-load.** Put the word people scan for first: "Email address", not "Your email
  address here".
- **Short.** Buttons 1–3 words. Labels 1–4 words. Toasts under ~80 characters.
  Sentences in body copy under 25 words (GOV.UK's guidance).
- **Reading level** grade 6–8 for general audiences (Flesch-Kincaid). Expert tools can
  go higher, but only for domain terms, not for sentence structure.
- **No periods** on buttons, labels, headings, or single-sentence toasts. Use periods
  in multi-sentence text.
- **Numerals** for numbers ("3 files", not "three files"). Use the locale's formatting.
- **Second person** ("your files"). Use "my" only where the person is the one
  speaking, such as a checkbox label ("Remember my device").
- **Avoid:** "please" in every string, "simply", "just", "easy", "oops", "whoops",
  "uh oh", "click here", "via", "utilize", "in order to".

### Buttons and links

- **Verb + noun**: "Save changes", "Create project", "Send invite". The verb says what
  happens; the noun says to what.
- The button repeats the verb from the heading or question: "Delete project?" →
  "Delete project" / "Cancel". Never "Yes" / "No" or "OK" / "Cancel" for a
  consequential action.
- Links say where they go: "View billing history", never "Click here" or "Learn more"
  alone (WCAG 2.4.4 needs the purpose clear from the link or its context).
- Loading states continue the verb: "Saving…", "Sending invite…".

### Error messages

Three parts, in this order, in the fewest words that carry them:

1. **What happened**, in the person's terms: "We couldn't save your changes."
2. **Why**, if it helps them act: "You're offline."
3. **How to fix it**, as an action: "Reconnect and try again." Offer a button when
   possible ("Try again").

Rules:
- Place the message next to the problem. Inline for fields, banner for page-level.
- Never blame: "The card number is incomplete", not "You entered an invalid card number".
- Keep the person's input. Never clear a form on error.
- Validation messages state the rule: "Password needs at least 12 characters", not
  "Invalid password".
- Show error codes only as secondary reference text, for support.

### Empty states

- Say what will appear here, why it is empty, and the next action: heading, one
  sentence, one button. "No invoices yet / Invoices appear here after your first
  sale. / Create invoice".
- Distinguish first use, no results from a search or filter ("No results for
  'acme'. Check the spelling or clear filters."), and cleared ("You're all caught up").

### Confirmations

- Confirm only destructive or irreversible actions. For reversible ones, act
  immediately and offer undo in a toast ("Project archived. Undo").
- Title is a question naming the action and object: "Delete 'Q3 roadmap'?"
- Body states the consequence: "This deletes the project and its 14 files for
  everyone. You can't undo this."
- For severe actions, require typing the object name.

### Forms

- Labels above fields, always visible. Placeholder text is not a label; it
  disappears on input and usually fails contrast.
- Hint text sits between label and field and says format or reason: "We'll only
  use this to send receipts."
- Mark the minority: if most fields are required, mark optional ones "(optional)".
- Validate on blur or on submit, not on every keystroke.
- Ask for exactly what you need, in the order people know it.

### Inclusive language

- Gender-neutral: "they", "you", "people"; no "guys".
- Ability-neutral: "check", "confidence check" instead of "sanity check"; "see" and
  "view" are acceptable, but prefer "select" over "click" for input-neutral
  instructions.
- Replace "whitelist / blacklist" with "allowlist / blocklist", "master / slave" with
  "primary / replica", "grandfathered" with "legacy".
- Names: one "Full name" field, not first/last, unless the system requires them.
- No idioms or culture-bound references in core flows; they do not translate.

### Content patterns

| Situation | Pattern | Example |
| --- | --- | --- |
| Primary action | Verb + noun | "Create project" |
| Destructive confirm | Title: "Verb object?" · Body: consequence · Button: same verb | "Remove member?" / "Remove member" |
| Success toast | Past tense, what happened, optional undo | "Invite sent" · "Message deleted. Undo" |
| Inline field error | Rule, not verdict | "Enter a date after today" |
| Page error | What happened · why · action | "We couldn't load your reports. Check your connection and try again." |
| Empty, first use | What goes here · how to start | "No projects yet. Create one to start tracking work." |
| Empty, no results | What was searched · recovery | "No results for 'acme'. Try another term or clear filters." |
| Loading | Verb + ellipsis | "Uploading 3 files…" |
| Permission request | Benefit first, then the ask | "Get notified when someone replies. Turn on notifications" |
| Disabled control | Tooltip says why and how to enable | "Add a payment method to publish" |

## Output

A copy deck: the string inventory with old copy, new copy, string key, and notes;
the glossary; and the tone line per moment type. Deliver as a table in the design
file or a diff to the strings file.

## Verify

Put every string into the real component and look at it at 390px and at 1440, with
30–40% expansion. Then:

- [ ] Every button is a verb, or verb + noun, and matches the heading it answers
- [ ] Every error message says what happened and how to fix it; none says only
      "Something went wrong" or "Invalid"
- [ ] Every empty state has a heading, one sentence, and one action
- [ ] Destructive confirmations name the object and consequence; reversible actions
      use undo instead
- [ ] Sentence case everywhere; no Title Case buttons
- [ ] One term per concept, matching the glossary
- [ ] No placeholder used as a label
- [ ] Nothing truncates at 390px or with 40% expansion
- [ ] Flesch-Kincaid grade 8 or under for body copy (unless expert audience is stated)
- [ ] None of the "Avoid" words or non-inclusive terms remain

Then delegate to the `copy-reviewer` subagent with the copy deck and screenshots. It
reports only failures, each with the screen and string key, and ends with a verdict.

## Anti-patterns

- "Oops! Something went wrong." with no cause and no action
- "OK" / "Cancel" on a dialog that deletes data
- Title Case On Every Button And Heading
- "Submit" on every form, whatever it does
- Placeholder-only fields that lose their label as soon as someone types
- Error messages that blame ("You entered an invalid email")
- Confirming everything, so people click through the one that matters
- Cute copy in a payment failure or a security warning
- The same action called "Delete", "Remove", and "Trash" on three screens
- Help text that repeats the label ("Email: enter your email")

## Related skills

- **Feeds from:** `brand-voice` (voice attributes), `information-architecture`
  (labels and terms), `design-critique` and `usability-testing` (clarity issues)
- **Leads to:** `design-handoff` (strings with keys), `accessibility-review`
  (accessible names, link purpose), `design-system-docs` (content guidelines)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Shopify Polaris** and **Atlassian Design**: published content guidelines with
  patterns for actions, errors, and empty states.
- **GitHub Primer**: terse, consistent product copy and accessibility-aware wording.
- **Nielsen Norman Group**: the four dimensions of tone of voice and error message
  guidelines.
- **Inclusive Components**: how copy interacts with accessible names and labels.
- **Mobbin**: real empty states, errors, and confirmations to compare against.

From [`FIBO.md`](../../FIBO.md):
- **Documentation structure**: headings and UI copy in sentence case, stated as a
  system rule rather than a preference.
