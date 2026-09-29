# Syncing tokens with Figma variables

The goal is one name on both sides. A designer binding a fill to
`destructive-subtle` and an engineer writing `bg-destructive-subtle` must be
choosing the same thing, in every mode.

## Collection structure

| Figma collection | Modes | Holds | Maps to |
| --- | --- | --- | --- |
| `Primitives` | one (`Value`) | Full ramps: `neutral/50` ... `neutral/950`, `red/700` | `--color-neutral-50` etc. Hide from publishing so designers cannot pick them. |
| `Color` | `Light`, `Dark` | Semantic roles, aliased to primitives | `:root` and `.dark` blocks |
| `Radius` | one | `radius/sm` ... `radius/2xl` as numbers | `--radius-*` |
| `Spacing` (optional) | one | 4px-based steps | Tailwind spacing, if customized |

- Alias semantic variables to primitives (right-click, "Create alias") so the
  tiers survive in Figma. A semantic variable holding a raw hex is a primitive
  in disguise.
- Alpha roles cannot alias a primitive plus an opacity. Store them as a raw
  color with alpha (`#bf000f14`) and put "red-700 at 8%" in the variable's
  description. This is why alpha roles exist as names at all.
- Scope variables: color roles to fills and strokes, `*-foreground` to text,
  radius to corner radius. Scoping keeps the picker short.
- Figma number variables are unitless pixels. Every radius and spacing step
  must resolve to a whole pixel in code, or the two sides round differently.

## Reading variables with the Figma MCP

If the Figma MCP is connected:

1. `get_variable_defs` on a frame that uses the library returns the variables it
   binds, with resolved values. Use a component sheet or a busy screen, not an
   empty frame.
2. Diff the names against the CSS custom properties:
   `rg -o "^\s*--[a-z0-9-]+" src/styles/globals.css | sort -u`.
3. Report three lists: in Figma only, in code only, same name with different
   values (per mode).

If the MCP is not connected, say so in one line and ask for an exported
variables JSON, or proceed from code.

## Three sync routes

| Route | When | Trade-off |
| --- | --- | --- |
| **Native variables + import/export JSON** | Small team, code is the source of truth, occasional sync | Manual step, but no plugin dependency. Generate DTCG JSON from code (Fibo's `figmaTokens()` does this) and import with a variables import plugin. |
| **Tokens Studio** | Designers author tokens, need Git sync, themes and math | Tokens live in the plugin's JSON in a repo; Figma variables are generated from it. Another tool to learn and license. |
| **Style Dictionary from DTCG** | Several platforms (web, iOS, Android) | JSON is the source; CSS, Swift and Kotlin are outputs. Figma still needs one of the first two routes. |

Pick one direction of truth and write it down. Two-way sync without a rule
produces tokens that change back and forth between sides.

## Worked example: Fibo

Fibo treats code as the source. `globals.css` says "Names match the Figma
'Color' collection one to one." The theme creator's `figmaTokens()` in
[`packages/ui/src/lib/theme.ts`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/lib/theme.ts)
writes one DTCG set per mode, with alpha roles as hex with alpha:

```ts
function figmaTokens(theme: Theme) {
  const mode = (m: Mode) => {
    const colors = Object.fromEntries(
      Object.entries(tokens(theme, m)).map(([name, token]) => [
        name,
        { $type: "color", $value: toHex(rgba(token)) },
      ])
    )
    // ...radius steps as { $type: "dimension", $value: "4px" }
    return { ...colors, ...radius }
  }
  return { Light: mode("light"), Dark: mode("dark") }
}
```

Colors are gamut-fitted to sRGB before conversion, so the Figma hex is what an
sRGB screen shows, while the CSS keeps the wider OKLCH value.

## Drift checks to run after any sync

- Every semantic name exists in both places, per mode
- Every alpha role's alpha matches (8% in Figma, 8% in `color-mix`)
- Radius steps: the same set of steps on both sides. A step used in code
  (`rounded-4xl`) with no Figma variable is drift, even if nothing looks wrong yet
- Font family and weights in Figma text styles match `--font-sans` and the
  weights actually loaded
