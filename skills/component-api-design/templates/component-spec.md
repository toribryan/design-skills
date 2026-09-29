# Component spec: {Name}

**Status:** {proposed | in progress | shipped} · **Shelf:** {base | special} ·
**Group:** {Actions | Forms | Display | Feedback | Navigation | ...} ·
**Owner:** {name} · **Last updated:** {date}

## Job

{One sentence: what it does for the person using the product. Start with a verb.
"Picks one option from a list that opens on demand."}

**Not for:** {the neighbor component to use instead, and when}

## Use cases

| Where | Content it holds | Notes |
| --- | --- | --- |
| {screen or flow} | {label, icon, count...} | {constraint} |

## Prior art

| Source | What we take | What we leave |
| --- | --- | --- |
| {Base UI / Radix / React Aria / shadcn / Fibo} | {part names, behavior} | {why} |

## Anatomy

DOM elements only, never props. Every part has a `data-slot`.

```
{Name}                    data-slot="{name}"            {what it is}
├── {Name}Trigger         data-slot="{name}-trigger"    {what it is}
└── {Name}Content         data-slot="{name}-content"    {what it is}
    └── {Name}Item        data-slot="{name}-item"       {what it is}
```

## API

### Variants (closed sets)

| Axis | Values | Default | Figma property |
| --- | --- | --- | --- |
| `variant` | `default`, `outline`, `ghost` | `default` | `variant` |
| `size` | `sm`, `default`, `lg` | `default` | `size` |

### Props

| Prop | Type | Default | Doc comment (one line) |
| --- | --- | --- | --- |
| `value` | `string` | — | The selected value. Pass it to control the component. |
| `defaultValue` | `string` | — | The starting value when uncontrolled. |
| `onValueChange` | `(value: string, details) => void` | — | Fires when the value changes. |
| `disabled` | `boolean` | `false` | Ignores input and dims the component. |
| `render` | `ReactElement` | — | Renders as another element, keeping behavior. |
| `className`, native attributes | | | Passed to the root. |

### Composition

{Which parts accept children, and what goes in them. Placement markers such as
`data-icon="inline-start"`.}

## State matrix

| State | Attribute | Tokens | Notes |
| --- | --- | --- | --- |
| Default | — | `bg-...` `text-...` `border-...` | |
| Hover | `:hover` (pointer only) | `hover:bg-...-hover` | |
| Focus visible | `:focus-visible` | `ring-[3px] ring-ring-subtle`, `border-ring` | Keyboard only |
| Active | `:active` | `translate-y-px` | |
| Disabled | `disabled` / `data-disabled` | `opacity-50` | Explain why nearby |
| Invalid | `aria-invalid` | `border-destructive`, `ring-destructive-ring` | |
| Open | `aria-expanded` / `data-open` | | |
| Selected | `data-checked` / `aria-selected` | | |
| Loading | `aria-busy` | | |

Cross it with each variant where the look differs. No blank cells.

## Behavior

- **Keyboard:** {Tab, Enter, Space, arrows, Escape, Home/End: what each does}
- **Pointer and touch:** {hit area, drag, long press}
- **Focus:** {where focus goes on open and close}
- **Motion:** {durations and easing tokens; reduced-motion behavior}
- **Screen reader:** {role, name source, announcements}

## Sizing

| Size | Height | Padding | Text | Icon |
| --- | --- | --- | --- | --- |
| `sm` | 32px | {x} | 14px | 16px |
| `default` | 36px | {x} | 14px | 16px |

## Figma

| Figma property | Kind | Values | Maps to |
| --- | --- | --- | --- |
| `variant` | Variant | `default`, `outline`, `ghost` | `variant` |
| `state` | Variant | `default`, `hover`, `focus`, `disabled` | attributes |
| `label` | Text | — | children |
| `iconStart` | Boolean | — | `data-icon="inline-start"` child |

## Stories and tests

| Story | Shows | `play` function |
| --- | --- | --- |
| `Default` | Args-driven playground | Pointer and keyboard; asserts callbacks and ARIA |
| `AllVariants` | Every variant | — |
| `Disabled` | Disabled state | Asserts no callback fires |
| {composition} | A real use | {if interactive} |

Unit tests for: {formatting, limits, controlled callbacks}.

## Open questions

- {question} — {who decides, by when}
