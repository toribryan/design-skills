---
name: component-api-design
description: >-
  Designs a component's API and anatomy before it is built: parts, variants vs
  props vs composition, compound components and render props, state through ARIA
  and data attributes, a state matrix, controlled and uncontrolled use, cva
  variants, matching Figma component properties, and stories with interaction
  tests. Use for "design a component", "component props", "should this be a
  variant", "compound component", "component spec", "Figma properties don't
  match code", or "make our system agent-ready". Not for docs pages; use
  design-system-docs. Not for implementing a whole screen; use design-to-code.
---

# Component API Design

A component's API is a promise to everyone who uses it, in code and in Figma.
Good APIs are small, closed where they should be closed (variants), open where
they should be open (composition), and express state the way the platform
already does (ARIA and data attributes), so styling, testing and accessibility
all read the same signals. The output is a component spec that a designer can
build the Figma component from and an engineer or agent can build the code
from, with the same names on both sides.

## When to use

- Adding a component to a design system, or porting one from another codebase
- A component has grown 15 props and a dozen booleans
- Figma variants and code props have drifted apart
- Deciding between a variant, a prop, a slot, or a separate component
- Making a system that coding agents can extend correctly on the first pass

**Not for:** writing the docs page (use `design-system-docs`), naming tokens
(use `design-tokens`), building a screen from components (use `design-to-code`),
or designing one interaction's feel (use `micro-interactions`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **The project's conventions**: `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, and
  one existing component the team treats as the model. They win over this skill.
- **Headless layer**: [Base UI for new React work; keep Radix or React Aria if
  the project uses it]
- **Styling**: [Tailwind v4 + `class-variance-authority` + a `cn` helper]
- **Use cases**: 3–5 real places the component will appear. [ask; this changes the API]
- **Figma component**: read with the Figma MCP (`get_design_context`, and
  `get_code_connect_map` if Code Connect exists). If not connected, say so and
  work from code and screenshots.
- **Prior art**: the same component in Base UI, Radix, React Aria and shadcn/ui.

If the project has no system and uses React + Tailwind, install the Fibo part
first (`pnpm dlx shadcn@latest add @fibo/<name>`) and extend it rather than
designing from zero. Keep the project's names if it already has conventions.

## Process

1. **Collect use cases.** Screenshots or code of every place it will be used.
   Output: a list, each with the content it must hold.
2. **Draw the anatomy.** Name each DOM part (root, trigger, content, item,
   indicator). Output: an anatomy list with a `data-slot` per part. Model:
   Fibo's `select.mdx` Anatomy block; copy that shape.
3. **Sort every difference into variant, prop, composition, or new component**
   using the rules in Standards. Output: the API table.
4. **Write the state matrix.** Every visual state crossed with every variant.
   Output: the matrix, with each cell's attribute (`data-disabled`,
   `aria-invalid`).
5. **Decide control.** For anything with state: `value` + `onValueChange` +
   `defaultValue`. Output: the controlled/uncontrolled contract.
6. **Map to Figma.** Each code prop becomes a Figma component property with the
   same name and values. Output: a property table for the designer.
7. **Write the spec.** Model: [`templates/component-spec.md`](templates/component-spec.md).
   Copy that shape. Output: the filled spec.
8. **Build and write stories.** One story per variant worth showing, a `Default`
   driven by args, and a `play` function on `Default` that uses pointer and
   keyboard. Model: Fibo's `switch.stories.tsx`; copy that shape. Output: the
   component, stories, and a unit test for logic stories cannot show.
9. **Review.** Delegate to the `component-reviewer`. Output: its report, fixed
   until the verdict is `ready`.

## Standards

### Variant, prop, composition, or new component

| Difference | Make it | Example |
| --- | --- | --- |
| A closed set of looks with one job | **Variant** (cva) | `variant: default \| outline \| secondary \| ghost \| destructive \| link` |
| A closed set of dimensions | **Variant** | `size: xs \| sm \| default \| lg \| icon` |
| A value or behavior | **Prop** | `value`, `onValueChange`, `disabled`, `orientation` |
| Arbitrary content in a known place | **Composition** (children or parts) | `<SelectItem>`, `<ToastTitle>` |
| A different element with the same look | **Render prop** / `asChild` | `render={<a href="/pricing" />}` |
| A different job, even if it looks similar | **New component** | Toggle vs Button, Badge vs Button |

- Variants are closed unions, never free strings. Two orthogonal axes (variant,
  size) at most; a third axis usually means a new component.
- Booleans that combine into impossible states (`primary` + `ghost` + `danger`)
  become one variant.
- Rendering props (`icon`, `leftIcon`, `rightIcon`, `title`, `subtitle`) that
  multiply are a sign the part wants composition: let children carry content and
  mark placement with an attribute (`data-icon="inline-start"`).
- Pass through every native attribute (`...props`) and `className`. A consumer
  should never need a wrapper div to add an `aria-*` or `id`.

### Compound components

Split into parts when the consumer must control order or content of more than one
region. Each part is a thin wrapper over the headless primitive with a
`data-slot`. Export parts flat (`SelectTrigger`, `SelectContent`) or as a
namespace (`Select.Trigger`); pick one per system.

### State through attributes

- Use the attribute the platform or primitive already sets: `disabled`,
  `aria-invalid`, `aria-expanded`, `aria-checked`, and Base UI's `data-checked`,
  `data-disabled`, `data-highlighted`, `data-open`, `data-side`.
- Style from them: `aria-invalid:border-destructive`, `data-checked:bg-primary`.
- Add a `data-*` attribute only for a state with no ARIA equivalent (`data-size`,
  `data-align-trigger`).
- Never add a parallel prop (`isInvalid`, `isOpen`) that duplicates an attribute.
  Two sources of truth drift; the attribute is also what tests and assistive
  tech read.

### State matrix

Every interactive component defines: default, hover (pointer only), focus-visible,
active/pressed, disabled, and where relevant: invalid, selected/checked, open,
loading, read-only, empty. Each cell names its attribute and its tokens. A blank
cell is a design decision nobody made.

### Controlled and uncontrolled

- `value` and `onValueChange(value, details)` for controlled; `defaultValue` for
  uncontrolled. Same pattern for `open`, `checked`, `index`.
- Callbacks name the value, not the event: `onCheckedChange`, not `onClick`.
- Both modes work; a story or test covers each.

### Sizes and hit areas

- Heights on a 4px grid, aligned across form controls: Fibo uses `xs` 24px,
  `sm` 32px, `default` 36px, `lg` 40px, and `Select` matches `Input` at 36px.
- Hit area at least 24×24px on pointer and 44×44px on touch. Extend small controls
  with a pseudo-element (Fibo's Checkbox and Switch use `after:-inset-x-3 after:-inset-y-2`).

### Figma mirrors code

| Code | Figma component property |
| --- | --- |
| cva variant `variant` | Variant property `variant` with the same values |
| cva variant `size` | Variant property `size` |
| boolean prop `disabled` | Variant property `state=disabled` (visual) |
| children text | Text property `label` |
| `data-icon="inline-start"` child | Boolean `iconStart` + instance swap `icon` |

Same names, same values, same casing. If Code Connect is available, map them so
the Figma inspect panel shows real code.

### Two shelves

Separate the dependable core from expressive parts. **Base** parts depend only on
the headless layer, the variant helper and the icon set, animate nothing
continuously, and must work in any product. **Special** parts serve one moment
(a reaction picker, a diagram), may use a motion library, and are held to the
same accessibility bar. The split keeps base installs small and tells reviewers
which rules apply.

### Shipping the system to agents

A design system is agent-ready when it ships three files beside the components:

1. **`AGENTS.md`**: one tool-agnostic page of layout, commands, definition of done,
   conventions and a short "Do not" list. `CLAUDE.md` contains only `@AGENTS.md`.
2. **An `add-component` skill**: numbered steps in the order the work happens,
   each pointing at a model file ("copy that shape"), ending in exact verify
   commands. It also covers porting a part in from elsewhere.
3. **A read-only reviewer subagent**: `tools: Read, Grep, Glob`, a numbered
   checklist, failures only with file and line, and a one-line verdict.

Starter versions of all three are in
[`../design-system-docs/references/agent-kit.md`](../design-system-docs/references/agent-kit.md).

## Worked example: Fibo

[`button.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/components/button.tsx)
is the model base part: a Base UI primitive, a `buttonVariants` cva object with
two closed axes, `data-slot="button"`, and state styled from attributes:

```tsx
function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

Its base classes carry every state: `focus-visible:ring-[3px] focus-visible:ring-ring-subtle`,
`active:not-aria-[haspopup]:translate-y-px`, `disabled:opacity-50`,
`aria-invalid:ring-destructive-ring`, `aria-expanded:bg-muted`. Rendering as a
link uses Base UI's `render` prop, not a separate `LinkButton`.

[`select.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/components/select.tsx)
is the compound model: ten flat exports. The root is Base UI's `Select.Root`,
which renders no element; every other part is a thin wrapper with its own
`data-slot` (`select-trigger`, `select-content`, `select-item`...). It has a
`size` prop documented in one line: "Matches Input at 36 pixels tall, or 32 for
dense forms." It is exposed as `data-size` so the parent can style from it.

Controlled and uncontrolled pairs appear in
[`chapter-scrubber.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/components/chapter-scrubber.tsx):
`currentIndex` ("Pass it to control the marker"), `defaultCurrentIndex`, and
`onCurrentIndexChange(index, chapter)`.

The agent kit is real: [`AGENTS.md`](https://github.com/toribryan/fibo/blob/main/AGENTS.md),
[`.agents/skills/add-component/SKILL.md`](https://github.com/toribryan/fibo/blob/main/.agents/skills/add-component/SKILL.md)
("If unsure, it is a base component"; "Model: `button.tsx` (base) or
`integration-visual.tsx` (special)"), and
[`.claude/agents/component-reviewer.md`](https://github.com/toribryan/fibo/blob/main/.claude/agents/component-reviewer.md)
("You never edit files; you report."). `CONTRIBUTING.md` points humans at the
same skill file: "Coding agents use the same file."

## Output

- A component spec from [`templates/component-spec.md`](templates/component-spec.md)
- The Figma property table, for the designer
- Source, stories with a `play` function, and a unit test where logic needs one
- The reviewer's report ending in `ready`
- For a new system: `AGENTS.md`, an `add-component` skill and a reviewer

## Verify

**Checks that must pass**

- The project's gates. In Fibo: `pnpm format:check`, `pnpm lint` (zero warnings),
  `pnpm build`, `pnpm typecheck`, `pnpm test` (every story renders in Chromium,
  its `play` function passes, and axe finds no violation).
- Every `data-slot` in the source appears in the spec's anatomy and in the docs'
  data attributes table.
- Every prop has a one-line doc comment (Storybook's props table reads them).

**By hand**

- Open the component in Storybook in light and dark, and drive it with the
  keyboard only: every state in the matrix is reachable and visible.
- Turn on reduced motion: nothing animates that should not.
- Compare the Figma component's properties with the code props: same names, same values.

**Delegate** to the `component-reviewer` subagent
([`agents/component-reviewer.md`](../../agents/component-reviewer.md)). It reports
only failures with file and line and ends in `ready` or `N blocking issues`.
Fix and rerun until `ready`.

## Anti-patterns

- `isPrimary`, `isGhost`, `isDanger` booleans that can all be true
- `variant: string`, accepting anything
- `leftIcon`, `rightIcon`, `iconSize`, `iconColor` props instead of composition
- `isOpen` props that shadow `aria-expanded`, so the two disagree
- A `LinkButton`, `SubmitButton` and `IconButton` that are one button with a render prop
- A wrapper `<div>` root that swallows `className` and native attributes
- Controlled-only components that force every consumer to hold state
- Figma variants named `Type=Primary, State=Hover` and code `variant="default"`
- A base component that imports an animation library for a hover effect
- Stories that only show variants and never exercise the keyboard

## Related skills

- **Feeds from:** `design-tokens`, `iconography`, `typography-system`,
  `motion-language`, `accessibility-review`
- **Leads to:** `design-system-docs`, `design-to-code`, `design-handoff`
- **Checked by:** `design-system-audit`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Base UI**: parts, `render` prop and the data attributes each part sets.
- **Radix Primitives** and **React Aria**: compound APIs and state handling to compare.
- **shadcn/ui**: the copy-in, `data-slot`, cva pattern Fibo follows.
- **Inclusive Components**: which element and which ARIA each pattern needs.
- **Storybook**: args, `play` functions and interaction tests.
- **GitHub Primer**: component API guidelines and status labels.

From [`FIBO.md`](../../FIBO.md):
- **How Fibo works with agents**: the AGENTS.md, add-component skill and reviewer set.
- **Component conventions** and **"Two shelves"**: the house rules this skill generalizes.
