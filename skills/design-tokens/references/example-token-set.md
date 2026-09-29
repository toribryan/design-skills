# Example token set

A complete, small token set for a product UI, in three forms: DTCG JSON (the
source), the CSS it builds to, and the Tailwind v4 mapping. Values follow Fibo's
defaults so they can be checked against a working system. Rename and revalue to
fit the project; keep the shape.

## 1. DTCG JSON

Three files keep tiers separate. Style Dictionary or Tokens Studio reads them
together; references resolve across files.

### `tokens/primitive.json`

```json
{
  "color": {
    "$type": "color",
    "white": { "$value": "#ffffff" },
    "neutral": {
      "$description": "Tailwind v4 neutral, achromatic. oklch(L 0 0).",
      "50":  { "$value": "#fafafa" },
      "100": { "$value": "#f5f5f5" },
      "200": { "$value": "#e5e5e5" },
      "300": { "$value": "#d4d4d4" },
      "400": { "$value": "#a1a1a1" },
      "500": { "$value": "#737373" },
      "600": { "$value": "#525252" },
      "700": { "$value": "#404040" },
      "800": { "$value": "#262626" },
      "900": { "$value": "#171717" },
      "950": { "$value": "#0a0a0a" }
    },
    "red":   { "400": { "$value": "#ff6568" }, "700": { "$value": "#bf000f" } },
    "green": { "400": { "$value": "#05df72" }, "700": { "$value": "#008139" } },
    "amber": { "400": { "$value": "#fabc00" }, "700": { "$value": "#b55200" } },
    "blue":  { "400": { "$value": "#56a2ff" }, "700": { "$value": "#1447e6" } }
  },
  "radius": {
    "$type": "dimension",
    "base": { "$value": "8px", "$description": "The one knob. Every step derives from it." }
  }
}
```

Hex values are Tailwind v4's OKLCH steps converted to sRGB with chroma pulled
in until they fit, the way Fibo's `fitGamut()` does before writing Figma tokens.
They differ by a few units from Tailwind's published hex for out-of-gamut steps
(red-700 is `#bf000f` here, `#c10007` in Tailwind's docs) because gamut-mapping
methods differ. The CSS keeps the OKLCH value and lets the browser map it; the
hex is what Figma and contrast maths see. Regenerate with the project's own
conversion rather than copying these.

### `tokens/semantic.light.json`

```json
{
  "color": {
    "$type": "color",
    "background":          { "$value": "{color.white}" },
    "foreground":          { "$value": "{color.neutral.950}" },
    "card":                { "$value": "{color.white}" },
    "card-foreground":     { "$value": "{color.neutral.950}" },
    "popover":             { "$value": "{color.white}" },
    "popover-foreground":  { "$value": "{color.neutral.950}" },

    "primary":             { "$value": "{color.neutral.900}" },
    "primary-foreground":  { "$value": "{color.neutral.50}" },
    "primary-hover":       { "$value": "#171717cc", "$description": "neutral-900 at 80%" },
    "primary-subtle":      { "$value": "#1717171a", "$description": "neutral-900 at 10%" },
    "secondary":           { "$value": "{color.neutral.100}" },
    "secondary-foreground":{ "$value": "{color.neutral.900}" },
    "secondary-hover":     { "$value": "{color.neutral.200}" },
    "muted":               { "$value": "{color.neutral.100}" },
    "muted-foreground":    { "$value": "{color.neutral.500}" },
    "accent":              { "$value": "{color.neutral.100}" },
    "accent-foreground":   { "$value": "{color.neutral.900}" },

    "destructive":             { "$value": "{color.red.700}" },
    "destructive-foreground":  { "$value": "{color.neutral.50}" },
    "destructive-subtle":      { "$value": "#bf000f14", "$description": "red-700 at 8%" },
    "destructive-subtle-hover":{ "$value": "#bf000f29", "$description": "red-700 at 16%" },
    "destructive-ring":        { "$value": "#bf000f33", "$description": "red-700 at 20%" },
    "success":             { "$value": "{color.green.700}" },
    "success-foreground":  { "$value": "{color.neutral.50}" },
    "success-subtle":      { "$value": "#00813914", "$description": "green-700 at 8%" },
    "warning":             { "$value": "{color.amber.700}" },
    "warning-foreground":  { "$value": "{color.neutral.50}" },
    "warning-subtle":      { "$value": "#b5520014", "$description": "amber-700 at 8%" },
    "info":                { "$value": "{color.blue.700}" },
    "info-foreground":     { "$value": "{color.neutral.50}" },
    "info-subtle":         { "$value": "#1447e614", "$description": "blue-700 at 8%" },

    "border":              { "$value": "{color.neutral.200}" },
    "input":               { "$value": "{color.neutral.200}" },
    "input-subtle":        { "$value": "#e5e5e533", "$description": "neutral-200 at 20%" },
    "input-subtle-hover":  { "$value": "#e5e5e580", "$description": "neutral-200 at 50%" },
    "ring":                { "$value": "{color.neutral.400}" },
    "ring-subtle":         { "$value": "#a1a1a180", "$description": "neutral-400 at 50%" }
  },
  "radius": {
    "$type": "dimension",
    "sm":  { "$value": "4px" },
    "md":  { "$value": "6px" },
    "lg":  { "$value": "{radius.base}" },
    "xl":  { "$value": "12px" },
    "2xl": { "$value": "16px" }
  }
}
```

### `tokens/semantic.dark.json`

Same keys, different targets. Every key in light must exist here.

```json
{
  "color": {
    "$type": "color",
    "background":          { "$value": "{color.neutral.950}" },
    "foreground":          { "$value": "{color.neutral.50}" },
    "card":                { "$value": "{color.neutral.900}" },
    "card-foreground":     { "$value": "{color.neutral.50}" },
    "primary":             { "$value": "{color.neutral.50}" },
    "primary-foreground":  { "$value": "{color.neutral.900}" },
    "primary-subtle":      { "$value": "#fafafa33", "$description": "neutral-50 at 20%" },
    "muted":               { "$value": "{color.neutral.800}" },
    "muted-foreground":    { "$value": "{color.neutral.400}" },
    "destructive":         { "$value": "{color.red.400}" },
    "destructive-foreground": { "$value": "{color.neutral.950}" },
    "destructive-subtle":  { "$value": "#ff656833", "$description": "red-400 at 20%" },
    "border":              { "$value": "#ffffff1a", "$description": "white at 10%" },
    "input":               { "$value": "#ffffff26", "$description": "white at 15%" },
    "ring":                { "$value": "{color.neutral.500}" }
  }
}
```

(Abbreviated: fill in every remaining key from the light file.)

## 2. CSS custom properties

What the JSON builds to, or what to write by hand when there is no build step.
Prefer `color-mix()` over precomputed hex in CSS, so the alpha role still follows
its base if the base changes.

```css
:root {
  --radius: 0.5rem;

  --background: var(--color-white);
  --foreground: var(--color-neutral-950);
  --primary: var(--color-neutral-900);
  --primary-foreground: var(--color-neutral-50);
  --primary-hover: color-mix(in oklch, var(--color-neutral-900) 80%, transparent);
  --primary-subtle: color-mix(in oklch, var(--color-neutral-900) 10%, transparent);
  --muted: var(--color-neutral-100);
  --muted-foreground: var(--color-neutral-500);
  --destructive: var(--color-red-700);
  --destructive-foreground: var(--color-neutral-50);
  --destructive-subtle: color-mix(in oklch, var(--color-red-700) 8%, transparent);
  --border: var(--color-neutral-200);
  --ring: var(--color-neutral-400);
  --ring-subtle: color-mix(in oklch, var(--color-neutral-400) 50%, transparent);
}

.dark {
  --background: var(--color-neutral-950);
  --foreground: var(--color-neutral-50);
  --primary: var(--color-neutral-50);
  --primary-foreground: var(--color-neutral-900);
  --primary-hover: color-mix(in oklch, var(--color-neutral-50) 80%, transparent);
  --primary-subtle: color-mix(in oklch, var(--color-neutral-50) 20%, transparent);
  --muted: var(--color-neutral-800);
  --muted-foreground: var(--color-neutral-400);
  --destructive: var(--color-red-400);
  --destructive-foreground: var(--color-neutral-950);
  --destructive-subtle: color-mix(in oklch, var(--color-red-400) 20%, transparent);
  --border: oklch(1 0 0 / 10%);
  --ring: var(--color-neutral-500);
  --ring-subtle: color-mix(in oklch, var(--color-neutral-500) 50%, transparent);
}
```

## 3. Tailwind v4 mapping

```css
@import "tailwindcss";
@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-hover: var(--primary-hover);
  --color-primary-subtle: var(--primary-subtle);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-destructive-subtle: var(--destructive-subtle);
  --color-border: var(--border);
  --color-ring: var(--ring);
  --color-ring-subtle: var(--ring-subtle);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
}
```

Components then write `bg-primary text-primary-foreground hover:bg-primary-hover`,
`bg-destructive-subtle text-destructive`, `rounded-lg`, and never a raw value.

## 4. Style Dictionary config (optional build step)

```js
// style-dictionary.config.mjs (Style Dictionary v4, DTCG input)
export default {
  source: ["tokens/primitive.json", "tokens/semantic.light.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/",
      files: [{
        destination: "tokens.light.css",
        format: "css/variables",
        options: { selector: ":root", outputReferences: true },
      }],
    },
  },
}
```

Run a second config with `semantic.dark.json` and `selector: ".dark"`.
`outputReferences: true` keeps `var(--color-neutral-900)` in the output instead
of flattening it to hex, so the tiers survive into CSS.

## 5. Role families at a glance

| Family | Roles |
| --- | --- |
| Surfaces | `background`, `card`, `popover`, `popover-overlay`, `sidebar` (+ `-foreground` each) |
| Actions | `primary` (+ `-foreground`, `-hover`, `-subtle`), `secondary` (+ `-foreground`, `-hover`), `accent` (+ `-foreground`) |
| Text | `foreground`, `muted-foreground` |
| Status | `destructive`, `success`, `warning`, `info` (+ `-foreground`, `-subtle`; destructive also `-subtle-hover`, `-ring`) |
| Lines and focus | `border`, `input` (+ `-subtle`, `-subtle-hover`), `ring` (+ `-subtle`) |
| Data | `chart-1` to `chart-5` |
| Shape | `radius` and `radius-sm` to `radius-2xl` |
