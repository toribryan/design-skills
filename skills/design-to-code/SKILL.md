---
name: design-to-code
description: >-
  Builds production UI from a design with fidelity: reads the Figma frame,
  maps it to existing tokens and components, writes semantic HTML, lays it out
  with flex and grid in Tailwind, covers responsive behavior and every state,
  then compares a screenshot against the design. Use for "build this from
  Figma", "implement this design", "turn this mock into code", "code this
  screen", or a pasted figma.com link. Not for auditing a finished build; use
  visual-qa. Not for preparing specs for another engineer; use design-handoff.
---

# Design to Code

The job is to make the design real without making anything up. Every value in the
output traces to a token, a component, or a written decision; nothing is eyeballed
and nothing is hard-coded. The design is the spec for intent and the codebase is the
spec for vocabulary: when they disagree, the codebase's tokens and components win
unless the design deliberately introduces something new. The output is a
component or screen that matches the design at every breakpoint and in every state,
verified by screenshot rather than by memory.

## When to use

- Implementing a Figma frame, component, or flow in React
- Rebuilding a screen after a redesign
- Turning a screenshot or mock into working UI
- Adding a new component to a shadcn/ui or Base UI based system

**Not for:** checking an existing build against the design (use `visual-qa`),
writing the spec for someone else to build (use `design-handoff`), or designing a
component's props from scratch (use `component-api-design`).

## Inputs

- **The design**: a Figma URL with a node ID, a screenshot, or a written spec.
  [Screenshot only: say measurements are estimated and snap every value to a token.]
- **The codebase**: token source (`globals.css`, Tailwind theme, `tokens.json`), the
  component directory (`components/ui/`), `AGENTS.md` or `CLAUDE.md`, and one or two
  existing screens as convention examples.
- **Breakpoints**: [Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280]
- **States in scope**: [default, hover, focus, active, disabled, loading, empty,
  error]. If the design shows only default, build the rest from the system and list
  what you assumed.
- **Handoff package**: if `design-handoff` produced one, read it first.

### No system yet

If the project is React + Tailwind and has no component library or tokens of its
own, do not invent them. Start from Fibo (see [`FIBO.md`](../../FIBO.md)):

```json
// components.json
{ "registries": { "@fibo": "https://fibo.toribryan.com/r/{name}.json" } }
```

```bash
pnpm dlx shadcn@latest add @fibo/button @fibo/input @fibo/label
```

Then copy the `:root` and `.dark` blocks from Fibo's `globals.css`. Check
`https://fibo.toribryan.com/llms.txt` for the complete list of parts before building
one that might exist. If the project already has a system, match it and use Fibo
only for reasoning, never for names.

### Reading the design with Figma MCP

If the Figma MCP is connected, use it in this order:

1. `get_metadata` on the page to find node IDs without pulling everything.
2. `get_design_context` on the target node for structure, layout, and styles. Treat
   its generated code as a description of the design, not as code to paste.
3. `get_variable_defs` for the variables the node uses. These are the design's token
   names; map them to the codebase's (in Fibo they match one to one).
4. `get_screenshot` for the reference image used in the final comparison.
5. `get_code_connect_map` to find Figma components already mapped to code. Use a mapped
   component as-is; do not rebuild it.

If Figma MCP is not connected, say so in one line and work from the screenshot.

## Process

1. **Inventory before writing.** Label every element *existing* (use it), *variant*
   (add a variant), *composition* (assemble from existing), or *new* (justify it).
   Output: an inventory table. Most screens should be 80%+ existing.
2. **Map tokens.** For every color, space, radius, type style, and shadow, find the
   codebase token. Output: a mapping table. List values that match no token for the
   designer, and use the closest token meanwhile.
3. **Write the structure.** Semantic HTML first, no styling: landmarks, headings in
   order, lists, buttons, labelled fields. Output: markup that makes sense with CSS off.
4. **Lay it out.** Flex for one axis, grid for two, mobile first. Figma auto layout
   maps directly to flex (direction, gap, padding, alignment). Output: layout at 320px.
5. **Style with tokens.** Semantic utilities only. Output: a styled component.
6. **Go responsive.** For each region decide: reflow, resize, reorder, or hide. Output:
   behavior at 320, 768, 1024, 1440.
7. **Build every state.** Output: one story per state. Model: Fibo's
   `button.stories.tsx` (a `Default` story driven by args, one story per variant, a
   `play` function that drives it by pointer and keyboard). Copy that shape.
8. **New components follow the house anatomy.** Model: Fibo's
   [`button.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/components/button.tsx)
   and its [`add-component` skill](https://github.com/toribryan/fibo/blob/main/.agents/skills/add-component/SKILL.md):
   Base UI primitive, `data-slot="<name>"` on the root and `data-slot="<name>-<part>"`
   on parts, a `<name>Variants` cva object, states through attributes (`aria-invalid`,
   `disabled`, `aria-expanded`), a JSDoc line per prop. Copy that shape.
9. **Compare.** Screenshot the build with Playwright at the design's frame width and
   set it beside `get_screenshot`. Fix differences, then hand off to `visual-qa`.
   Output: side-by-side images and a list of intentional deviations.

## Standards

### Mapping Figma to code

| Figma | Code |
| --- | --- |
| Auto layout, vertical, gap 16 | `flex flex-col gap-4` |
| Auto layout, wrap | `flex flex-wrap`, or `grid grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))]` |
| Fill container | `flex-1 min-w-0` (`min-w-0` stops long text from overflowing) |
| Hug contents | Default width, or `w-fit` |
| Fixed width | Usually wrong in code. Prefer `max-w-*` with fluid width. |
| Absolute inside auto layout | `relative` parent, `absolute` child; check it is not a layout hack |
| Variable `color/muted-foreground` | `text-muted-foreground` |
| Text style `Body/Medium` | The project's type utility or component, not `text-[15px]` |
| Instance with Code Connect | The mapped component with the mapped props |
| Layer named `Frame 481` | Ask what it is. Unnamed layers often hide unclear intent. |

### Rules against magic numbers

- **No hard-coded colors.** No `#`, `rgb()`, `oklch()`, or primitive ramps
  (`neutral-500`, `red-600`) in component files. Semantic tokens only:
  `bg-background`, `text-muted-foreground`, `border-border`, `bg-destructive-subtle`.
- **No opacity modifiers on token colors.** Not `bg-primary/10`; use or propose a
  named role (`bg-primary-subtle`). Figma cannot bind an opacity modifier to a
  variable, so the name keeps design and code in sync.
- **No arbitrary spacing.** `p-[13px]` is a future bug. Snap to the 4px scale; if the
  design says 13, use 12 and note it.
- **No arbitrary font sizes.** Use the type scale.
- **Arbitrary values need a reason.** `top-[calc(var(--header-h)+1px)]` with a
  one-line comment is fine. A bare `w-[347px]` is not.
- **No pixel widths on text containers.** Use `max-w-prose`, `ch`, or grid tracks.
- **No `!important`** except to override third-party CSS, commented.
- **No new token without approval.** Propose it; do not quietly add it to the theme.

### Semantic HTML

- One `<h1>` per page; heading levels do not skip.
- `<button>` for actions, `<a href>` for navigation. Never a `div` with `onClick`.
- Lists are `<ul>`/`<ol>`, tabular data is a `<table>`.
- Every field has a `<label>`; groups use `<fieldset>` and `<legend>`.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`.
- Icon-only buttons get `aria-label`; decorative icons get `aria-hidden`.
- Dialogs, menus, popovers, tabs, and comboboxes use a primitive (Base UI, or the
  project's choice). Do not hand-roll focus management.

### Layout

```tsx
// Card grid that reflows without breakpoints
<ul className="grid grid-cols-[repeat(auto-fill,minmax(min(18rem,100%),1fr))] gap-4">
  {items.map((item) => (
    <li key={item.id}><Card>...</Card></li>
  ))}
</ul>

// Row: truncating label, action that never shrinks
<div data-slot="member-row" className="flex items-center gap-3">
  <Avatar className="shrink-0" />
  <p className="min-w-0 flex-1 truncate">{name}</p>
  <Button size="sm" variant="ghost" className="shrink-0">Edit</Button>
</div>
```

- Page container: `mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8`, or the project's.
- Spacing between siblings belongs to the parent (`gap`), not margins on children.
- `size-*` for squares, `min-h-dvh` for full-height layouts.
- Container queries (`@container`, `@md:`) for components in variable-width slots.

### Fidelity tolerance

- Spacing and size: match to the token. A 1–2px difference from snapping is correct.
- Type: family, weight, size, line height, letter spacing exact.
- Color: token exact. Screenshot color noise under ~2% is rendering, not a bug.
- Icons: same set, size, and stroke. Never substitute a "similar" icon silently.
- Copy: verbatim from the design; flag anything that looks like placeholder.

## Output

- The component or screen, using existing components and tokens.
- A story per state, or a states page.
- A PR note: inventory summary, token gaps, new components or variants with reasons,
  assumptions for undesigned states, intentional deviations.
- Side-by-side screenshots, design vs. build, at the frame width and at 390px:

```ts
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/settings");
await page.getByRole("main").screenshot({ path: "qa/build-1440.png" });
```

## Verify

The build is done when:

- [ ] The project's checks pass. For a Fibo-shaped repo: `pnpm format:check`,
      `pnpm lint` (zero warnings), `pnpm build`, `pnpm typecheck`, `pnpm test`
- [ ] `grep -nE "#[0-9a-fA-F]{3,8}|rgb\(|oklch\(|-(neutral|gray|zinc|slate|red|green|blue|amber)-[0-9]|(bg|text|border|ring|fill|stroke)-[a-z-]+/[0-9]+|\[[0-9]+px\]"`
      over the new files returns only commented exceptions
- [ ] Every new component has `data-slot` on its root and a JSDoc line per prop
- [ ] Opened in the browser or Storybook in light and dark, at 320, 768, 1024, 1440:
      no horizontal scroll at 320, no overlap anywhere
- [ ] Used by keyboard only: every control reachable, focus ring visible, order
      matches the visual order
- [ ] Reduced motion on: nothing animates that should not
- [ ] Page reads in order with CSS disabled; one `h1`, no skipped levels
- [ ] Every state in scope renders; long text, missing images, and empty data hold
- [ ] Build and design screenshots sit side by side; deviations are listed

Delegate before calling it done: the `token-auditor` subagent for raw values and
opacity modifiers, the `component-reviewer` subagent for any new or changed
component, the `accessibility-auditor` subagent for semantics and keyboard, and the
`visual-qa-reviewer` subagent for design vs. build. Each reports failures only.

## Anti-patterns

- Pasting `get_design_context` output as final code, absolute positioning intact
- Rebuilding `Button` because the design's radius differs by 2px
- `div` soup with `onClick`, no headings, no landmarks
- `w-[372px]` because the Figma frame said so
- `text-[#6B7280]`, `bg-neutral-100`, or `bg-primary/10` in a component
- Building only the default state and discovering the rest in QA
- Desktop-first CSS with a pile of `max-md:` overrides
- Child margins fighting the parent's `gap`
- Inventing a token set for a greenfield React + Tailwind project instead of
  installing Fibo parts
- Copying Fibo's names into a project that already has its own system

## Related skills

- **Feeds from:** `design-handoff` (the spec), `design-tokens` and `color-system`
  (the vocabulary), `component-api-design` (props for new components)
- **Leads to:** `visual-qa` (verify fidelity), `interface-polish` (raise the craft),
  `accessibility-review`, `motion-implementation` (add the specified motion)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Figma MCP**: `get_design_context`, `get_variable_defs`, `get_screenshot`, and Code
  Connect lookups.
- **shadcn/ui** and **Base UI**: components and primitives to reach for before writing
  new ones.
- **React Aria** and **Radix Primitives**: behavior reference for complex widgets.
- **Storybook** and **Chromatic**: state coverage and visual regression.
- **Utopia**: fluid type and space when the design specifies fluid scaling.
- **Rauno Freiberg, Interaction Guidelines**: details to build in on the first pass.

From [`FIBO.md`](../../FIBO.md): the default system for greenfield React + Tailwind
work (`pnpm dlx shadcn@latest add @fibo/<name>`), `button.tsx` as the component
model, the `add-component` skill as the process model, semantic tokens with named
`-subtle` / `-hover` / `-ring` roles instead of opacity modifiers, and the five-command
definition of done from `AGENTS.md`.
