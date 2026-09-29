---
name: art-direction
description: >-
  Defines a visual direction for a site, campaign, launch, or product surface:
  annotated moodboards, 2–3 named territories with rationale, style tiles, rules for
  photography, illustration, 3D, and composition, and how the direction applies to
  product versus marketing. Use for "art direction", "moodboard", "visual direction",
  "look and feel", "style tile", "photo direction", or "this feels generic". Not for
  the logo and core identity system (use brand-identity).
---

# Art Direction

Art direction decides what a piece of work should look and feel like, and why, before
anyone designs screens. It sits between the identity (the fixed system) and the
execution (the pages, campaigns, and assets). The output is a direction deck: two or
three named territories, one chosen, and the rules that let designers, photographers,
illustrators, and 3D artists produce work that belongs together. The standard: every
reference is annotated with what to take from it, and every rule can reject a real
piece of work.

## When to use

- A launch, campaign, marketing site, or redesign needs a look before layout starts
- Work across a team looks inconsistent even though it uses the same identity
- Briefing photographers, illustrators, or 3D artists
- A design "feels generic" and nobody can say what it should feel like instead

**Not for:** creating the logo, palette, and type system (use `brand-identity`),
collecting UI patterns for a feature (use `reference-research`), or page structure
(use `layout-and-hierarchy`).

## Inputs

- **Identity guidelines** [if none, the direction must also propose color and type; say so]
- **Brand platform** attributes [from `brand-strategy`; if missing, write 3–5 working
  attributes and mark them provisional]
- **The brief**: what is being made, for whom, where it appears, and what it must
  achieve [from `design-brief`]
- **Production constraints**: budget for shoots or illustration, 3D capability,
  timeline, stock allowed or not [assume no custom shoot, existing tools only]
- **Surfaces**: which of product UI, marketing site, social, paid, print, video
  [default: marketing site and social]

## Process

1. **Collect references with intent.** Run `reference-research` across Godly,
   Awwwards, Fonts In Use, Brand New, Land-book, and outside the web (editorial,
   packaging, film stills, architecture). Output: 40–80 references.
2. **Annotate and cull.** For each kept reference, one line on what to take: "the
   cropping", "the flat midday light", "type set tight at display sizes". Drop anything
   kept only because it looks good. Output: 15–25 annotated references.
3. **Form 2–3 territories.** Cluster references into distinct directions. Name each,
   write a rationale tied to attributes and audience, and list what it risks. Model:
   [`templates/direction-deck.md`](templates/direction-deck.md). Copy that shape.
   Output: one board per territory.
4. **Make a style tile per territory.** Samantha Warren's style tiles (2011): type,
   color, buttons, a texture or image treatment, and a few adjectives, on one canvas,
   without layout. Dan Mall's element collages are the next step up when the team
   needs to see pieces of a real page. Output: one tile or collage per territory.
5. **Test on one real surface.** Apply each territory to the same hero and one inner
   section. Output: side-by-side comparisons.
6. **Choose.** Review against the brief and attributes, not taste. Output: the chosen
   territory and the reason in two sentences.
7. **Write the rules.** Photography, illustration, 3D, composition, type in use, color
   in use. Output: rule pages with approved and rejected examples.
8. **Define product versus marketing.** Output: a table of which rules apply where.
9. **Crit against the direction.** Every later review starts from the rules, not
   preference. Output: a crit checklist derived from the rules.

## Standards

### References

- Annotated: every image has a line saying what to take. Unannotated boards read
  as "make it look like this" and produce copies.
- At least a third from outside the category, and some from outside screens entirely.
  A board made only of competitors produces the category average.
- Dribbble shots are mood, not proof that something works in production.
- Record sources so references can be credited or checked for rights.

### Territories

- Two or three. One is a decision already made; four is a failure to edit.
- Distinct on at least two of: color temperature and saturation, type genre, image
  style, density and composition, motion character.
- Named with a phrase that carries the idea ("Quiet instrument", "Night market"),
  not "Option A".
- Each states: the idea in one sentence, attributes it serves, audience it speaks to,
  what it risks, and production cost.

### Photography direction

Specify, with examples: subject and casting, setting, lighting (hard or soft, natural
or studio, time of day), lens and distance (wide environmental, 50mm natural, tight
detail), color grade, crop and negative space for type, and what to avoid (posed
handshakes, people pointing at laptops). Provide a shot list template. For stock,
list search terms and three filters that reject off-direction images.

### Illustration direction

Line weight (for example, 2px at 1x), fill (flat, grain, gradient), palette (subset of
brand colors plus at most two illustration-only colors), perspective (flat, isometric,
3/4), how people are drawn (proportions, faces or not, representation), and level of
detail at each size.

### 3D direction

Materials (matte, glass, clay, metal), lighting setup (studio three-point, HDRI),
camera (focal length, orthographic or perspective), color and background, level of
realism, and render output sizes. Keep a library of approved material and lighting
presets so assets from different artists match.

### Composition

- One focal point per frame or section. Measure: squint; the first thing you see should
  be the intended one.
- A defined grid and at least one rule for breaking it (full-bleed images only, or
  display type may cross columns).
- A scale contrast rule: for example, display type at least 4x body size on hero
  sections.
- Negative space as a rule, not a leftover: for example, at least 40% empty in hero
  compositions.

### Product versus marketing

| Element | Marketing | Product UI |
| --- | --- | --- |
| Color | Full expressive range | Neutral base; brand color for primary actions and meaning |
| Type | Display face at large sizes | Text face; display only in onboarding and empty states |
| Imagery | Photography, 3D, illustration | Spot illustrations in empty and success states only |
| Motion | Expressive, scroll-linked allowed | Productive, per `motion-language` |
| Density | Airy, one idea per viewport | As dense as the task needs |

The product carries the direction through restraint and detail; marketing carries it
through scale and image. A product UI styled like a campaign becomes hard to use.

## Output

A direction deck in [`templates/direction-deck.md`](templates/direction-deck.md):
brief recap, annotated references, 2–3 territories with style tiles and a hero test,
the chosen direction, rules by discipline, product versus marketing table, and a crit
checklist. Keep it to 20–35 slides or pages.

## Verify

The direction is done when you have applied the chosen territory to one real
marketing surface and one product surface and viewed both at mobile (375px) and desktop
(1440px) widths, in light and dark where the product supports both, and when someone
outside the project has used the rules to reject an off-direction image correctly.
Then confirm:

- [ ] Every reference is annotated with what to take from it
- [ ] 2–3 named territories, each with rationale, risks, and a style tile
- [ ] The choice is justified against attributes and the brief, in writing
- [ ] Photography, illustration, and 3D rules each include approved and rejected examples
- [ ] Composition rules have numbers (grid, scale ratio, negative space)
- [ ] The product versus marketing table is filled in
- [ ] A crit checklist exists and was used in at least one review

Delegate to the `brand-reviewer` subagent to check produced work against the direction
and identity guidelines, and to the `design-critic` subagent for composition and
hierarchy. Both report only failures with location (slide, frame, or URL and
breakpoint) and end in a verdict ("ready" or "N blocking issues").

## Anti-patterns

- A moodboard of 60 unannotated images and no stated intent
- Territories that differ only in accent color
- References drawn only from award sites and competitors, producing a copy of this
  year's trend (oversized grotesk, grain gradients, bento grids) without a reason
- Choosing by who argued loudest instead of against the brief
- Photography direction that says "authentic, diverse, candid" and nothing else
- Applying the marketing direction directly to dense product screens
- Crits that open with "I like" or "I don't like" instead of the rules

## Related skills

- **Feeds from:** `brand-strategy`, `brand-identity`, `reference-research`, `design-brief`
- **Leads to:** `landing-page-design`, `layout-and-hierarchy`, `design-critique`,
  `motion-language`, `design-case-study` (showing the direction work)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Godly** and **Awwwards**: ambitious web craft; annotate the specific move, not the site.
- **Fonts In Use**: type in context, searchable by industry and era.
- **Brand New**: how identities extend into campaigns and applications.
- **Land-book** and **Lapa Ninja**: landing pages by style, for the hero test.
- **Abduzeedo** and **Dribbble**: visual exploration, treated as mood only.
- **Mobbin**: how direction translates into real product screens.
- **Fontshare** and **Velvetyne**: display faces for territories on a budget.

From [`FIBO.md`](../../FIBO.md): achromatic by default with color only for meaning,
as a worked example of a product-side direction that stays restrained so marketing
can carry the expressive range.
