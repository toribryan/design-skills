# Easing reference

## Reading a cubic-bezier

`cubic-bezier(x1, y1, x2, y2)` describes progress over time. The first pair shapes the
start, the second pair the end.

- **Fast start, soft landing (ease-out):** small `x1`, large `y1`. The element responds
  immediately and settles. Right for anything reacting to a person.
- **Soft start, fast end (ease-in):** large `x1`, small `y1`. Feels like it is
  speeding away. Right for exits, wrong for entrances.
- **Symmetric (ease-in-out):** for movement between two resting points on screen.

## Curves by strength

| Name | Value | Character |
| --- | --- | --- |
| out-quad | `cubic-bezier(0.5, 1, 0.89, 1)` | Gentle, barely noticeable |
| out-cubic | `cubic-bezier(0.33, 1, 0.68, 1)` | Neutral UI default |
| out-quint | `cubic-bezier(0.22, 1, 0.36, 1)` | Crisp, confident. Good product default |
| out-expo | `cubic-bezier(0.16, 1, 0.3, 1)` | Very fast start, long tail. Expressive |
| in-out-cubic | `cubic-bezier(0.65, 0, 0.35, 1)` | Balanced repositioning |
| in-out-quint | `cubic-bezier(0.83, 0, 0.17, 1)` | Dramatic, for page transitions |
| out-back | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot. Playful brands only, small elements only |

Stronger curves need slightly longer durations to read, because most of the movement
happens in the first 30% of the time.

## Springs

A spring is defined by physics rather than time. It has no fixed duration; it settles
when it settles. That makes it right for anything interruptible: drag, toggles, layout
changes that may reverse mid-flight.

| Feel | Stiffness | Damping | Mass | Notes |
| --- | --- | --- | --- | --- |
| Snappy | 400–500 | 30–40 | 1 | Toggles, drag release, buttons |
| Default | 170–300 | 26–30 | 1 | Most layout motion |
| Gentle | 100–150 | 20–26 | 1 | Large surfaces, shared elements |
| Bouncy | 300 | 10–15 | 1 | Only when the brand calls for it |

Motion also accepts `{ type: "spring", duration, bounce }`, which is easier to reason
about: `bounce: 0` for no overshoot, `0.1–0.2` for a hint of life, above `0.3` reads
as a toy.

## Converting springs to CSS

Modern browsers support `linear()` easing, which approximates any spring as a list of
points. Generate one with Easing Wizard or the `linear()` generator, and set the
spring's approximate settle time as the `transition-duration`. Add a cubic-bezier
fallback for older browsers:

```css
.panel {
  transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-timing-function: linear(0, 0.22 8%, 0.63 20%, 0.9 35%, 1.01 50%, 1.005 65%, 1);
}
```

## Choosing, quickly

- Responding to a click, tap, or key: ease-out, 100–250ms
- Moving something already visible: ease-in-out, 200–350ms
- Leaving: ease-in or ease-out, 100–200ms
- Following a finger or cursor, or can be interrupted: spring
- Continuous or indeterminate: linear
