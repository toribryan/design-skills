# Component docs page template

Copy into `{docs dir}/<name>.mdx` (or the platform's equivalent) and fill every
`{...}`. Keep the section order. Delete **Anatomy** only for a single-element
part. Block names follow Fibo's Storybook blocks; use the project's own if it
has them, or plain Markdown tables where it has none.

````mdx
import { ArgTypes, Canvas, Meta } from "@storybook/addon-docs/blocks"

import * as Stories from "{path}/{name}.stories"
import { {Name} } from "{path}/{name}"
import { Anatomy } from "../blocks/anatomy"
import { RelatedComponents } from "../blocks/catalog"
import { DataAttributes } from "../blocks/data-attributes"
import { ComponentRules, Tip, UsageGuidelines } from "../blocks/guidelines"
import { Install } from "../blocks/install"

<Meta of={Stories} />

# {Name}

{One or two sentences. What it does, for whom, and the one thing that sets its
use apart. Start with the job: "Picks one option from a list that opens on demand."}

<Canvas of={Stories.Default} />

## Features

- {Capability, with the variant or prop that provides it}
- {Capability}
- {Capability}

## Installation

<Install name="{name}" exports={["{Name}", "{name}Variants"]} />

{If it installs a dependency: "Also installs `{package}`."}

## Usage

```tsx
import { {Name} } from "@/components/ui/{name}"

export function Example() {
  return <{Name}>{...}</{Name}>
}
```

{The one rule that matters most, in one sentence.}

## Anatomy

<Anatomy
  root={{
    name: "{Name}",
    slot: "{name}",
    note: "{What this element is. Which data attributes it carries.}",
    children: [
      { name: "{Name}{Part}", slot: "{name}-{part}", note: "{What it is.}" },
    ],
  }}
/>

## Guidelines

<UsageGuidelines
  guidelines={[
    "{A checkable rule with a number or a named choice.}",
    "{Label length and case.}",
    "{Spacing or grouping rule.}",
    "{When to use a neighbor component instead.}",
  ]}
/>

<Tip>{Optional: one non-obvious technique, such as rendering as a link.}</Tip>

## Examples

### {Example name}

{One sentence on what this example shows.}

<Canvas of={Stories.{StoryName}} />

## Do's and don'ts

<ComponentRules
  rules={[
    {
      positive: { component: <{Name} />, description: "{Do this.}" },
      negative: { component: <{Name} />, description: "{Don't do this. Say what goes wrong.}" },
    },
  ]}
/>

## API reference

{One sentence on what it passes through: "{Name} takes every prop of Base UI's
`{Primitive}`, including `render`."}

<ArgTypes of={Stories.Default} />

### Data attributes

<DataAttributes
  rows={[
    { attribute: 'data-slot="{name}"', element: "{The root}", when: "Always." },
    { attribute: "data-disabled", element: "{The root}", when: "{It is disabled.}" },
  ]}
/>

## Accessibility

<UsageGuidelines
  guidelines={[
    "{Keyboard: which keys do what.}",
    "{Naming: where the accessible name comes from; what the consumer must add.}",
    "{Focus: what the ring looks like and when it shows.}",
    "{Motion: what changes with reduced motion.}",
  ]}
/>

## Related components

<RelatedComponents names={["{Neighbor}", "{Neighbor}"]} />

## References

- [{Headless primitive docs}]({url})
- [{WAI-ARIA pattern}]({url})
````

## Page checklist

- [ ] Description names the job; no adjectives like "beautiful" or "flexible"
- [ ] Features are three or four bullets
- [ ] Usage example runs as pasted
- [ ] Anatomy lists DOM elements, never props
- [ ] Every guideline is checkable
- [ ] Every example has one sentence
- [ ] Do's and don'ts render the real component
- [ ] Every `data-slot` in the source is in the data attributes table
- [ ] Accessibility says what the consumer must do, not only what the part does
- [ ] Headings in sentence case
- [ ] Metadata entry exists (title, description, shelf, group, status)
