---
name: design-tokens
description: >-
  Designs and implements a token architecture: primitive, semantic and
  component tiers, naming, W3C DTCG JSON, light and dark themes by semantic
  remap, CSS custom properties with a Tailwind v4 @theme inline mapping, and
  Figma variable sync. Use for "design tokens", "set up our variables",
  "semantic colors", "dark mode tokens", "sync Figma variables with code",
  "Style Dictionary", or "our colors are hard-coded everywhere". Not for
  choosing the colors themselves; use color-system. Not for checking an
  existing system for drift; use design-system-audit.
---

# Design Tokens

Tokens are the names design and code agree on. A token system decides which
decisions get a name, how names are layered so a theme can change without
touching components, and how the same names reach CSS, Tailwind and Figma. The
output is a token file in the project's format, a mapping to utilities, and a
naming contract that a designer picking a Figma variable and an engineer typing
a class name both land on.

## When to use

- Starting a design system, or adding dark mode or a second brand to one
- Colors, radii or spacing are hard-coded across components
- Figma variables and CSS variables have drifted apart
- Moving from Tailwind v3 config to v4 `@theme`, or from Sass variables to CSS custom properties
- Adopting DTCG JSON, Tokens Studio or Style Dictionary

**Not for:** picking hues, ramps and contrast steps (use `color-system`), type
scales (use `typography-system`), duration and easing values (use
`motion-language`), or auditing an existing system (use `design-system-audit`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **Existing tokens**: read the codebase first. `rg -n "^\s*--" --glob "*.css"`,
  `tailwind.config.*`, any `tokens/*.json`. [none]
- **Stack**: [React + Tailwind v4 + CSS custom properties]
- **Themes**: which modes and brands must switch at runtime [light and dark]
- **Figma**: a library file URL. If the Figma MCP is connected, call
  `get_variable_defs` on a representative frame to read the current variables.
  If not, say so in one line and work from code.
- **Existing naming conventions**: if the project has them, keep them. Rename only
  what is ambiguous or collides.

If the project has no system and the stack is React + Tailwind, start from Fibo:
register `@fibo` in `components.json`, run `pnpm dlx shadcn@latest add @fibo/button`,
and copy the `:root` and `.dark` blocks from Fibo's `globals.css`. Then adapt
values, not structure.

## Process

1. **Inventory.** List every raw value in use: colors, radii, spacing, shadows,
   font sizes, z-indexes, durations. Output: a table of value, count, and where
   it appears. The `design-system-audit` greps produce this in minutes.
2. **Choose tiers.** Primitive and semantic always; component tier only where a
   component needs a knob a theme must reach (see Standards). Output: a one-line
   rule per tier saying who may reference it.
3. **Name the semantic roles.** Name by job, never by appearance: `destructive`,
   not `red`; `muted-foreground`, not `gray-text`. Model: Fibo's `globals.css`
   role families; copy that shape. Output: the role list, grouped into families.
4. **Remap per theme.** Each semantic role points at a primitive once per mode.
   Dark mode is a second mapping, not an inversion. Output: a two-column table
   (light, dark) per role.
5. **Name every alpha.** Anything translucent a designer must pick becomes a
   role (`-subtle`, `-hover`, `-ring`) with the alpha inside the token. Output:
   the alpha roles and their percentages per mode.
6. **Derive the scales from knobs.** Radius, and optionally spacing, derive from
   one variable so a theme changes one number. Output: the formula and the
   resolved pixel values.
7. **Write the source of truth.** CSS custom properties, or DTCG JSON built to
   CSS. Model: [`references/example-token-set.md`](references/example-token-set.md);
   copy that shape. Output: the token file.
8. **Map to utilities.** Tailwind v4 `@theme inline`, or the framework's
   equivalent. Output: the mapping block.
9. **Sync to Figma.** One collection per tier, one mode per theme, names one to
   one. Read [`references/figma-sync.md`](references/figma-sync.md) before choosing
   a sync route. Output: a Figma variables file or import JSON.
10. **Replace raw values in components.** Output: a diff where components
    reference only semantic (or component) tokens.

## Standards

### Tiers

| Tier | Example | Who references it |
| --- | --- | --- |
| Primitive | `--color-neutral-900`, `--color-red-700` | Only the semantic tier. Never a component. |
| Semantic | `--primary`, `--destructive-subtle`, `--border` | Components and product code. |
| Component | `--button-radius`, `--sidebar-accent` | One component family, when a theme must reach it. |

- Keep the component tier small. A system with 40 semantic roles and 300
  component tokens has moved every decision into a spreadsheet. Add a component
  token only when two themes disagree about that one component.
- Primitives are complete ramps (11 steps for Tailwind-style, 12 for Radix-style).
  Semantic roles are the curated subset.
- Target 40–70 semantic color roles for a product UI. Under 20 forces components
  to reach for primitives; over 100 means roles are being named per component.

### Naming

- Pattern: `{family}-{variant}-{state}`, reading left to right from general to
  specific: `destructive-subtle-hover`, `input-subtle`, `sidebar-primary-foreground`.
- Pair every fill with its text: `primary` and `primary-foreground`. A fill with
  no foreground partner invites someone to guess the text color.
- kebab-case in CSS and Figma. Figma groups with `/` (`color/primary/hover`)
  and the export flattens to `-`; decide once and write it down.
- No appearance words in semantic names: no `blue`, `light`, `dark`, `100`.
- No component names in semantic roles unless it is a real component tier.

### Theming by remap

```css
:root { --primary: var(--color-neutral-900); --border: var(--color-neutral-200); }
.dark { --primary: var(--color-neutral-50);  --border: oklch(1 0 0 / 10%); }
```

- Components never branch on the theme. If a component needs `dark:` classes to
  look right, a role is probably missing. When an exception is deliberate,
  comment why at the line, as Fibo's Switch does for its dark-mode thumb.
- Dark mode is its own design: surfaces step up in lightness for elevation
  (page 950, card 900), borders become translucent white, status steps move
  lighter. See `color-system`.

### Named opacity roles, not opacity modifiers

Write `bg-destructive-subtle`, never `bg-destructive/10`. Three reasons:

1. **Figma cannot bind an opacity modifier to a variable.** A fill bound to
   `destructive` at 10% layer opacity is not a token a designer can pick, inspect
   or swap per mode. A variable named `destructive-subtle` is.
2. **The alpha lives in one place.** Twelve components using `/10`, `/15` and
   `/20` for the same intent is twelve decisions. One role is one.
3. **Alpha can differ per mode.** Tints need more alpha on dark surfaces (Fibo:
   8% light, 20% dark). A class-level modifier cannot vary by theme.

Build tints with `color-mix(in oklch, <step> 8%, transparent)`, which resolves to
`oklch(L C H / 8%)` and keeps hue stable.

### One-knob radius

```css
:root { --radius: 0.5rem; }            /* 8px */
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);  /* 4  */
  --radius-md: calc(var(--radius) - 2px);  /* 6  */
  --radius-lg: var(--radius);              /* 8  */
  --radius-xl: calc(var(--radius) + 4px);  /* 12 */
  --radius-2xl: calc(var(--radius) + 8px); /* 16 */
}
```

Offsets are whole pixels, not multipliers, so every step resolves to a whole
pixel and can exist as a Figma number variable. `calc(var(--radius) * 0.6)`
produces 4.8px, which Figma rounds and code does not.

### Tailwind v4 mapping

Use `@theme inline` so utilities reference the variable, not a copy of its value:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
```

Without `inline`, Tailwind resolves the value at build time and the `.dark` remap
never reaches the utility. Keep primitives in Tailwind's default `--color-*`
namespace; add semantic roles to it; do not delete the primitives, or
`globals.css` has nothing to alias.

### DTCG JSON

Every token has `$value` and `$type`; groups carry `$description`. References use
`{group.token}`. Supported `$type`s to use: `color`, `dimension`, `fontFamily`,
`fontWeight`, `duration`, `cubicBezier`, `number`, `shadow`, `typography`. Write
colors as hex (with alpha as `#rrggbbaa`) for Figma import, or as the newer
object form when every tool in the chain supports it.

## Worked example: Fibo

Fibo's tokens live in one file,
[`packages/ui/src/styles/globals.css`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/styles/globals.css).
Primitives are Tailwind v4's own OKLCH ramps, which Fibo does not redefine.
Semantic roles alias them per mode, and `@theme inline` exposes them:

```css
--destructive: var(--color-red-700);
--destructive-subtle: color-mix(in oklch, var(--color-red-700) 8%, transparent);
--destructive-subtle-hover: color-mix(in oklch, var(--color-red-700) 16%, transparent);
--destructive-ring: color-mix(in oklch, var(--color-red-700) 20%, transparent);
```

The file's own comment states the contract: "Names match the Figma 'Color'
collection one to one." Its reason for named alpha roles is written beside them:
"Figma cannot express an opacity modifier on a variable-bound fill:
`bg-destructive/10` has no equivalent a designer can pick or inspect."

The derivation also exists as code.
[`packages/ui/src/lib/theme.ts`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/lib/theme.ts)
rebuilds every role from a handful of choices (neutral ramp, radius, accent hue,
status hues, fonts), and a unit test asserts it reproduces `globals.css` with the
defaults. Its `figmaTokens()` writes DTCG JSON with a `Light` and a `Dark` mode
for Figma's variables import. The
[theme creator plan](https://github.com/toribryan/fibo/blob/main/plans/001-theme-creator.md)
records why the output is CSS, DTCG JSON and a link, and why a registry theme was
rejected.

Borrow the reasoning. If the project already calls its roles `brand` or
`surface-raised`, keep those names.

## Output

- The token source (CSS or DTCG JSON), following
  [`references/example-token-set.md`](references/example-token-set.md)
- The Tailwind (or framework) mapping block
- A naming contract: tiers, pattern, the role list with a one-line job each
- Figma variables, or the import JSON and the steps to load it
- A decision note for anything non-obvious (why a tier exists, why an alpha is
  8%), written next to the value in a comment and in the docs

## Verify

The work is done when all of these hold.

**Checks that must pass**

- The project's gates: format, lint (zero warnings), build, typecheck, test. In
  Fibo that is `pnpm format:check`, `pnpm lint`, `pnpm build`, `pnpm typecheck`,
  `pnpm test`.
- The `design-system-audit` greps return zero hits in component files for hex
  literals, opacity modifiers on token colors, and primitive ramp classes.
- The contrast check from `color-system` passes for every foreground/background
  pair in both modes, or each known gap is written down.

**Contract checks**

- Every fill role has a `-foreground` partner.
- Every role has a value in every mode; nothing inherits by accident.
- Every radius step resolves to a whole pixel.
- Figma variable names match code names one to one, alpha roles included, and
  the same set of radius steps exists on both sides.
- Semantic color roles number between 20 and 100, each with a stated job.

**By hand**

- Open Storybook (or the app) in light and dark. Toggling `.dark` on the root
  restyles every surface, border and status with zero component changes.
- Tab through a busy screen in both themes: every focus ring is visible.

**Delegate** to the read-only `token-auditor` subagent
([`agents/token-auditor.md`](../../agents/token-auditor.md)). It reports only
failures with file and line and ends in `ready` or `N blocking issues`.

## Anti-patterns

- Semantic names that describe appearance: `--blue-button`, `--light-gray-bg`
- `bg-primary/10` sprinkled through components, each alpha a private decision
- A component tier that mirrors every CSS property of every component
- `dark:bg-neutral-900` in component classes instead of a remapped role
- `@theme` without `inline` for runtime-themed values, so dark mode silently fails
- Radius scales built with multipliers that land on 4.8px and 9.6px
- Figma variables named `Primary/Default` and CSS named `--color-brand-500`
- Tokens that exist only in Figma, or only in code
- Renaming a project's working tokens to match Fibo's

## Related skills

- **Feeds from:** `color-system` (ramps and steps), `typography-system` (type
  tokens), `motion-language` (duration and easing tokens), `brand-identity`
- **Leads to:** `component-api-design`, `design-to-code`, `design-handoff`,
  `design-system-docs`
- **Checked by:** `design-system-audit`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **DTCG format**: the spec for `$value`, `$type`, aliases and groups.
- **Style Dictionary**: transforming DTCG JSON into CSS, iOS and Android outputs.
- **Tokens Studio**: Figma-to-Git sync when native variables are not enough.
- **Figma MCP**: `get_variable_defs` to read what the library actually defines.
- **Material 3** and **Atlassian Design**: published token tiers and naming.
- **shadcn/ui**: the `background`/`foreground` pairing convention Fibo extends.
- **Radix Colors**: how a 12-step scale maps to UI jobs.

From [`FIBO.md`](../../FIBO.md):
- **Tokens** and the **"One name on both sides"** and **"Opacity gets a name"**
  principles: the tiering and alpha-role reasoning this skill teaches.
