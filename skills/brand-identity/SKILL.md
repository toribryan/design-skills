---
name: brand-identity
description: >-
  Translates a brand strategy into a visual identity system (logo and lockups,
  color, typography, graphic devices, imagery, iconography, motion signature) and
  documents it as usable guidelines. Explores three territories before converging.
  Use for "visual identity", "logo", "brand guidelines", "brand colors", "brand
  book", "rebrand", or "identity system". Not for positioning or attributes (use
  brand-strategy) or a campaign's look (use art-direction).
---

# Brand Identity

A visual identity is a system, not a logo. It is the small set of elements (mark,
color, type, one or two graphic devices, an image style) plus the rules for combining
them, chosen so the brand is recognizable from a fragment. This skill turns a brand
platform into that system through three explored territories, one chosen direction,
and guidelines that someone who was not in the room can apply correctly. The standard:
each element traces back to an attribute in the strategy, and the system works at
16px and on a billboard.

## When to use

- Creating an identity for a new company, product, or sub-brand
- A rebrand or refresh, including an audit of what to keep
- Existing guidelines are a logo sheet with no system behind it
- Product UI and marketing look like two different companies

**Not for:** the strategy underneath (use `brand-strategy`), a campaign or launch look
built on top of the identity (use `art-direction`), UI color and type scales for a
product (use `color-system` and `typography-system`), or icon set production (use
`iconography`).

## Inputs

- **Brand platform** from `brand-strategy`: attributes, audience, positioning [if
  missing, write a one-page version first; do not design without attributes]
- **Name and naming constraints**: final name, any sub-brands [ask; this blocks the logo]
- **Equity to keep**: existing colors, marks, or shapes customers recognize [audit;
  assume some equity exists in any brand older than two years]
- **Applications** that matter most: product UI, app icon, site, social, print,
  packaging, signage [default: product UI, app icon, site, social, slides]
- **Competitive visuals**: screenshots of 5–10 alternatives [collect during step 1]
- **Budget constraints**: type licensing, custom type or not [assume retail or open
  source fonts]

## Process

1. **Audit.** Collect the brand's current touchpoints and 5–10 competitors on one board.
   Note the category's clichés (every fintech in blue, every AI tool in purple
   gradients). Output: audit board with keep, drop, and category-default notes.
2. **Explore three territories.** Each territory is a distinct answer to the strategy,
   named, with a rationale tied to specific attributes. Model: the territory format in
   `art-direction` ([`templates/direction-deck.md`](../art-direction/templates/direction-deck.md)).
   Copy that shape. Output: three boards, each with a mark sketch, palette, type
   pairing, one graphic device, image style, and two applications (app icon and a
   homepage hero).
3. **Review against the strategy.** Present all three side by side with the attributes
   listed. Pick one; take at most one element from another. Output: chosen territory
   and a written reason.
4. **Design the logo system.** Wordmark, mark (symbol), and lockups. Draw at small sizes
   first. Output: master artwork, clear space, minimum sizes, misuse examples.
5. **Build color.** Primary, secondary, neutrals, and functional colors with proportions
   and contrast pairs. Output: palette with values in OKLCH, HEX, RGB, CMYK, and
   Pantone where print matters.
6. **Set typography.** One or two families, roles, and a fallback stack. Output: type
   roles and licensing notes.
7. **Define graphic devices, imagery, iconography, and motion signature.** Output: one
   page each, with rules and examples.
8. **Apply.** Mock the system on the 8–12 applications that matter most. Fix the system
   where applications break it. Output: application mockups.
9. **Document.** Model: [`templates/identity-guidelines.md`](templates/identity-guidelines.md).
   Copy that shape. Output: guidelines plus an asset package.

## Standards

### Territories

- Exactly three, and different: vary at least two of mark style, color
  strategy, and type genre between any two territories.
- Each is named ("Signal", "Workshop", "Field Notes"), not numbered, so discussion is
  about ideas.
- Each cites which attributes it leans into and which it risks.
- Show every territory at app-icon size. Many ideas die at 32px; better now than later.

### Logo

- **Components:** wordmark, symbol, horizontal and stacked lockups. A symbol is optional
  for a new brand; a strong wordmark is usually enough until the brand has recognition.
- **Clear space:** defined by an element of the logo itself (the cap height, or the
  height of the symbol's counter), so it scales. Typical: 1x cap height on all sides.
- **Minimum sizes:** symbol legible at 16px (favicon) and 24px; wordmark at least
  ~80px wide on screen and ~20mm in print. Draw a simplified small-size version if
  details close up below 32px.
- **Versions:** full color, one-color black, one-color white (reversed). Test on photos.
- **App icon:** master at 1024x1024 with the symbol at about 60–70% of the canvas;
  check at 29pt and 60pt. Social avatar: works inside a circle crop.
- **Misuse page:** stretched, recolored, outlined, rotated, effects, on busy backgrounds.

### Color

- **Structure:** primary (1, sometimes 2), secondary or accent (1–3), neutrals (a ramp
  of 8–12 steps), functional (success, warning, error, info) owned by `color-system`.
- **Proportion:** state it. The interior design 60/30/10 rule (dominant, secondary,
  accent) is a reasonable start: often neutrals 60, primary 30, accent 10. Many strong
  brands are far more restrained: 80–90% neutral with color at a single point.
- **Achromatic by default** is one valid strategy. Fibo has no brand hue: `primary` is a
  neutral, and color only carries meaning (destructive, success, warning, info). It
  makes status legible and lets type and layout carry the identity. It suits tools
  where content and state matter more than recognition; it is a weak choice for
  consumer brands that compete on shelf or in an app grid.
- **Contrast:** document which foreground and background pairs pass WCAG 2.2 AA
  (4.5:1 body text, 3:1 large text and UI). Write the measured ratio next to each pair.
- **Specify values** in OKLCH for digital ramps, HEX for convenience, and CMYK and
  Pantone only after a print proof.

### Typography

- One family is enough; two at most (a display and a text face, or a sans and a mono).
- Check before choosing: weights needed, italics, language and script coverage, tabular
  figures, variable-font axes, and licensing for web, app embedding, and broadcast.
- Define roles (display, heading, body, caption, data) and let `typography-system`
  set the product scale.

### Graphic devices

One or two ownable elements: a crop, a grid, a shape derived from the mark, a pattern,
a line treatment. A device earns its place by making the brand recognizable without
the logo. More than two, and none of them become recognizable.

### Imagery, illustration, iconography

- Imagery: subject, lighting, color treatment, crop, and what to avoid, with 6–10
  approved examples and 3–4 rejected ones.
- Illustration: one style with rules for line weight, fill, perspective, and people.
- Iconography: stroke weight matched to the type's stem weight at the size used; one
  corner radius; one grid (24px is standard). Hand off to `iconography`.

### Motion signature

One recognizable move (how the mark resolves, how surfaces enter) expressed in
`motion-language` tokens. A logo animation lasts 1–2s at most; the in-product
version is shorter or static. Reduced motion shows the resolved mark.

## Output

Identity guidelines in [`templates/identity-guidelines.md`](templates/identity-guidelines.md),
plus an asset package: logo files (SVG, PDF, PNG at 1x/2x/3x, favicon ICO and SVG, app
icon), color values as design tokens, font files or links with licenses, and templates
for the top applications (slides, social, OG image at 1200x630).

## Verify

The identity is done when you have seen it, by hand, at the extremes: the symbol at
16px in a browser tab, the app icon on a real home screen next to competitors, the
wordmark on a photo, every palette pair in light and dark, and the full system on the
8–12 applications. Then confirm:

- [ ] Each element cites an attribute from the brand platform
- [ ] Three territories were explored and the choice is written down with its reason
- [ ] Clear space and minimum sizes are defined from the logo's own geometry
- [ ] Every text color pair lists a measured contrast ratio that passes AA
- [ ] Color proportions are stated as numbers, with an example layout
- [ ] Fonts are licensed for every application listed
- [ ] Someone outside the project produced one application from the guidelines alone,
      and it looked right

Delegate to the `brand-reviewer` subagent to check applications against the guidelines,
and to the `accessibility-auditor` for contrast; both report only failures with
location and end in a verdict ("ready" or "N blocking issues").

## Anti-patterns

- Presenting one direction, or three variations of the same direction
- A logo that only works at hero size, with details that vanish at 32px
- Choosing the category's default color (fintech blue, AI purple gradient) without
  deciding to
- Brand colors that fail contrast as text, with no documented alternate for text use
- Guidelines that show the logo on white and never on photos, dark UI, or merchandise
- Four typefaces, six accent colors, and three graphic devices
- An identity designed for marketing that the product team cannot use in UI
- A 90-page PDF brand book with no downloadable assets or tokens

## Related skills

- **Feeds from:** `brand-strategy` (attributes), `reference-research`, `art-direction`
- **Leads to:** `color-system`, `typography-system`, `iconography`, `design-tokens`,
  `motion-language`, `brand-voice`, `landing-page-design`, `design-system-docs`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Brand New**: identity redesigns with the before, after, and applications; read the
  critiques for what fails at small sizes.
- **Fonts In Use**: typefaces in real brand contexts, filterable by industry.
- **Abduzeedo** and **Godly**: current identity and web craft for the audit and territories.
- **Fontshare**, **Klim Type Foundry**, **Velvetyne**: typefaces with clear licensing.
- **OKLCH Color Picker**, **Huetone**, **Leonardo**: building ramps and checking contrast.
- **Phosphor** and **Lucide**: icon weights to match the type's stem.
- **Apple HIG**: app icon grid and size requirements.

From [`FIBO.md`](../../FIBO.md): achromatic by default with color only for meaning, as a
worked example of a restrained color strategy; status tones chosen by measured contrast
(700 step in light, 400 in dark) with the measurement written next to the choice.
