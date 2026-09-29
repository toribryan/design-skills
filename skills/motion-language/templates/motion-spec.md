# Motion spec: {Product name}

**Version:** {x.y} · **Owner:** {name} · **Last updated:** {date}

## Positioning

{Product} moves in a **{productive | balanced | expressive}**, **{mechanical | organic}**
way. In one sentence: {what motion should feel like and why, tied to brand attributes}.

## Principles

1. **{Principle as a behavior}.** {One-sentence rationale.}
   - Do: {specific example}
   - Don't: {specific counter-example}
2. ...

## Tokens

### Duration

| Token | Value | Use |
| --- | --- | --- |
| `duration-fast` | {ms} | {job} |

### Easing

| Token | Value | Use |
| --- | --- | --- |
| `ease-out` | `cubic-bezier(...)` | {job} |

### Springs

| Token | Config | Use |
| --- | --- | --- |
| `spring-snappy` | `{ stiffness, damping }` | {job} |

## Choreography

- Stagger: {ms per item, max total}
- Order: {what moves first}
- Direction: {conventions}
- Shared elements: {when to use continuity}

## Pattern map

| Pattern | Enter | Exit | Properties | Reduced motion |
| --- | --- | --- | --- | --- |
| Dropdown | {duration} {easing} | {duration} {easing} | opacity, scale 0.96→1, origin: trigger | opacity only, 100ms |
| Dialog | | | | |
| Toast | | | | |
| Page transition | | | | |

## Don'ts

- {product-specific anti-pattern}
