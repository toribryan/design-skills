---
name: motion-implementation
description: >-
  Builds animations in code that hit 60fps, can be interrupted, and respect
  reduced motion: picks the right tool (CSS, View Transitions, Motion for React,
  GSAP, Rive, Lottie) and wires it to the motion tokens. Use for "animate this",
  "add a transition", "exit animation not working", "janky animation", "layout
  animation", "shared element transition", "scroll animation", or "AnimatePresence".
  Not for deciding what motion should mean or defining tokens; use motion-language.
---

# Motion Implementation

This skill turns a motion spec into code that runs on the compositor, survives being
interrupted, and degrades cleanly for people who ask for less motion. The standard:
every animation uses defined tokens, animates only `transform` and `opacity` unless a
reason is stated, reverses mid-flight without a jump, and has a reduced-motion path
that was tested, not assumed.

## When to use

- Building a specific animation: dropdown, dialog, toast, list reorder, page transition
- Choosing between CSS, the View Transitions API, Motion, GSAP, Rive, or Lottie
- Fixing jank, dropped frames, or animations that snap when interrupted
- Adding exit animations to elements that unmount
- Adding scroll-linked or scroll-triggered motion

**Not for:** defining durations, easing, or motion principles (use `motion-language`),
or designing the states of a button, toggle, or input (use `micro-interactions`).

## Inputs

- **Motion tokens** from the motion spec [if none exist, use the `motion-language`
  defaults: `--duration-fast: 150ms`, `--duration-base: 220ms`,
  `--duration-moderate: 320ms`, `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`,
  `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`, springs 400/30 and 170/26]
- **Stack**: framework, existing animation libraries in `package.json` [read the
  codebase first; do not add a library the project does not already use without saying so]
- **Browser support floor** [evergreen browsers, last 2 versions]
- **The pattern**: what enters, what exits, what moves, what triggers it

## Process

1. **Name the pattern and read its row in the pattern map.** Model: the pattern map in
   `motion-language`'s [`templates/motion-spec.md`](../motion-language/templates/motion-spec.md).
   Output: enter and exit duration, easing, properties, transform-origin,
   reduced-motion behavior.
2. **Check the shelf.** Follow Fibo's two-shelf rule: base components (button, input,
   menu, dialog) use no animation library, only short CSS state transitions. Special
   components, built for one expressive moment, may import `motion`. Continuous
   animation stays off unless it is the point of the part. Output: "base" or "special".
3. **Choose the tool** using the table below. Pick the lightest tool that handles the
   hardest requirement, within the shelf's limits. Output: one line, "CSS transitions
   because...".
4. **Build the enter and exit.** Model: the matching recipe in
   [`references/recipes.md`](references/recipes.md). Copy that shape, then swap in the
   project's tokens. In a Fibo-style codebase, model base parts on Fibo's `button.tsx`
   and special parts on `integration-visual.tsx`. Exits run 20–30% faster than
   entrances. Output: working code with tokens referenced by name, never raw values.
5. **Make it interruptible.** Trigger the reverse halfway through. It should turn around
   from where it is. Output: confirmation, or a switch to transitions or springs.
6. **Add reduced motion** in the tool's own mechanism (see below). Output: code path.
7. **Profile** in the DevTools Performance panel at 4x CPU throttle. Output: no long
   frames, and no layout or paint in the flame chart for transform/opacity work.
8. **Test** per the Testing standard below. Output: passing tests.

## Standards

### Choosing the tool

| Requirement | Tool |
| --- | --- |
| Hover, focus, press, open/close of a mounted element | CSS transitions |
| Enter animation for an element that just rendered or left `display: none` | CSS `@starting-style` |
| Looping or multi-step decorative motion | CSS `@keyframes` |
| Moving between two DOM states or pages with continuity | View Transitions API |
| React unmount animations, layout changes, shared elements, gestures | Motion (`motion/react`) |
| Long choreographed sequences, scroll-scrubbed storytelling, SVG morphs | GSAP + ScrollTrigger |
| Interactive vector art that reacts to state (mascot, animated icon with inputs) | Rive |
| Designer-authored After Effects animation played back as-is | Lottie (prefer `.lottie`) |

CSS covers most product UI. Add Motion when unmounting or layout animation is the hard
part; keep GSAP on marketing pages. Rive over Lottie whenever input must drive it.

### Performance

- Animate `transform` and `opacity`. These run on the compositor and skip layout and
  paint. `filter` and `clip-path` can be acceptable on small elements; measure first.
- Frame budget is 16.7ms at 60Hz, 8.3ms at 120Hz; keep JavaScript per frame under ~4ms.
- To animate size or position change, use FLIP (First, Last, Invert, Play; Paul Lewis):
  measure, apply the end state, invert with `transform`, then release. Motion's
  `layout` prop and View Transitions do this for you.
- Never interleave DOM reads (`getBoundingClientRect`, `offsetHeight`) and writes in a
  loop. Batch reads, then writes. That interleaving is layout thrash.
- `will-change: transform` only on elements about to animate, removed afterward, and
  never on more than a handful at once. Each one creates a layer and costs GPU memory.
- For `height: auto`, use `grid-template-rows: 0fr → 1fr`, `interpolate-size:
  allow-keywords` where supported, or Motion's `animate={{ height: "auto" }}`; never
  measure in JavaScript every frame.
- Animated blurred `box-shadow` repaints every frame. Fade a pseudo-element that holds
  the shadow instead.

### Interruptibility

- CSS transitions reverse from their current value; `@keyframes` restart. Use
  transitions for anything a person can toggle.
- Springs keep velocity through an interruption: drag, toggles, and layout shifts use
  `spring-snappy` or `spring-gentle`. Never block input until an animation finishes.

### CSS enter transitions with `@starting-style`

Supported in Chrome 117+, Safari 17.5+, Firefox 129+. It defines the "before" style for
an element's first frame, so a transition runs on insert or on leaving `display: none`:

```css
@starting-style { .popover:popover-open { opacity: 0; transform: scale(0.96); } }
```

Add `display` and `overlay` to the transition list with `allow-discrete`, or a
top-layer element (popover, `<dialog>`) disappears before its exit runs.
`references/recipes.md` has full dropdown and dialog versions.

### View Transitions

Same-document transitions ship in Chrome 111+, Safari 18+, Firefox 144+. Cross-document
(MPA) transitions use `@view-transition { navigation: auto; }` in Chromium 126+ and
Safari 18.2+. Always feature-detect.

```js
function update(fn) {
  if (!document.startViewTransition ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) return fn();
  document.startViewTransition(fn);
}
```

Style the default crossfade with `::view-transition-group(*)` using `duration-slow` and
`ease-in-out`. Each `view-transition-name` must be unique on the page at capture time;
duplicates abort the transition. The page is not interactive during the transition, so
keep it under 500ms.

### Motion for React

Import from `motion/react` (the package formerly `framer-motion`).

```tsx
import { AnimatePresence, motion, MotionConfig } from "motion/react";

<MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 400, damping: 30 }}>
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        key="menu"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
        style={{ transformOrigin: "top right" }}
      />
    )}
  </AnimatePresence>
</MotionConfig>
```

- `AnimatePresence` needs a stable `key` on direct children. Missing keys are the most
  common reason exits do not run.
- `layout` animates size and position changes via FLIP. Put `layout="position"` on
  children whose text would otherwise stretch.
- `layoutId` links two elements across renders for shared-element motion (a tab
  underline, a card expanding to a detail view). Wrap siblings in `LayoutGroup` when
  separate components share ids.
- `reducedMotion="user"` drops transform and layout animation and keeps opacity when
  the OS setting is on. Use `useReducedMotion()` for custom branches.
- `LazyMotion` with `m` components cuts the bundle when only basic features are needed.

### GSAP and ScrollTrigger

GSAP and all its plugins are free for commercial use since 3.13. In React, use the
`useGSAP` hook from `@gsap/react` so it cleans up animations on unmount. Build every
timeline inside `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", ...)`,
which reverts it when the query stops matching; the scrubbed timeline is in recipe 6.
Never pin sections inside the app UI; pinning fights native scroll and breaks find-in-page.

### Rive and Lottie

- **Rive**: drive state through state machine inputs (`useStateMachineInput`), not by
  seeking the timeline. Under reduced motion, set a boolean input the artboard uses to
  jump to its resting state.
- **Lottie**: prefer `.lottie` (dotLottie) over raw JSON; it is typically far smaller.
  Keep files under ~100KB. Under reduced motion, do not autoplay; render a single
  meaningful frame with `goToAndStop(frame, true)`. Never loop Lottie in a task flow.

### Reduced motion, every tool

| Tool | Mechanism |
| --- | --- |
| CSS | `@media (prefers-reduced-motion: reduce)` swapping transforms for opacity, ≤150ms |
| View Transitions | Skip `startViewTransition`, or shorten `::view-transition-group(*)` to a crossfade |
| Motion | `<MotionConfig reducedMotion="user">`, `useReducedMotion()` |
| GSAP | `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` |
| Rive | Boolean input to a static state |
| Lottie | No autoplay; static frame |

Reduced motion means less movement, not no feedback. Keep opacity changes and progress.

### Testing

- Playwright: `page.emulateMedia({ reducedMotion: "reduce" })` for the reduced path,
  `toHaveScreenshot({ animations: "disabled" })` for visual tests.
- Wait on `Promise.all(el.getAnimations().map(a => a.finished))`, not `waitForTimeout`.
- Motion: `MotionGlobalConfig.skipAnimations = true` in unit test setup.

## Output

Working code in the project's stack, plus a short note: tool chosen and why, tokens used,
reduced-motion behavior, and profiling result. For common patterns, start from
[`references/recipes.md`](references/recipes.md): dropdown, dialog, toast stack, list
reorder, shared element, and scroll reveal. Read it before building any of those.

## Verify

The animation is done when the project's lint, typecheck, and tests pass, and you have
watched it by hand: at normal speed and at 0.25x in the DevTools Animations panel, in
light and dark, driven by pointer and by keyboard, and once with reduced motion turned
on (OS setting or `emulateMedia`). Then confirm:

- [ ] Only tokens from the motion spec; no raw `0.3s ease` in components
- [ ] Only `transform` and `opacity` animated, or the exception is justified in a comment
- [ ] Base components import no animation library; only special parts use `motion`
- [ ] Reversing mid-animation turns around without a jump
- [ ] Exit is shorter than enter and actually runs (seen, not assumed)
- [ ] `transform-origin` points at the trigger for popovers and menus
- [ ] Reduced-motion path exists and was seen working under emulation
- [ ] Performance recording at 4x CPU throttle shows no long frames
- [ ] No `will-change` left on idle elements; no continuous animation that is not the point
- [ ] Focus moves correctly during and after the animation

Delegate checks to read-only reviewers, which report only failures with file and line
and end in a verdict ("ready" or "N blocking issues"):
- `token-auditor` for raw durations and easings in `transition`, `animation`, and
  Motion `transition` props.
- `component-reviewer` for shelf violations (a base part importing `motion`).
- `accessibility-auditor` for reduced-motion handling and focus during transitions.

## Anti-patterns

- `transition: all`, which animates properties no one intended, including layout ones
- Scaling from `scale(0)`; start at 0.95–0.98
- Animating `top`/`left`/`width`/`height` for movement that `transform` can do
- Adding GSAP to an app for one fade that CSS handles
- `AnimatePresence` wrapped around a component that conditionally returns `null`
  internally, so the exit never fires
- `setTimeout` matched to the animation duration to unmount things
- Lottie spinners on every loading state, adding 50–300KB of JSON to the bundle
- Scroll-jacking: replacing native scroll speed or direction
- `prefers-reduced-motion` handled by `animation: none !important` everywhere, which
  also kills spinners and progress feedback

## Related skills

- **Feeds from:** `motion-language` (tokens and pattern map), `micro-interactions`
  (state specs), `design-handoff` (prototype and timing notes)
- **Leads to:** `visual-qa` (verify against the prototype), `accessibility-review`
  (reduced motion, focus), `interface-polish`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Motion** docs: `AnimatePresence`, `layout`, `layoutId`, and spring options.
- **GSAP**: timeline position parameters and `ScrollTrigger` start/end syntax.
- **Rive** and **Lottie**: state machines versus playback; export settings.
- **Sonner** and **Vaul**: source code for interruptible toast stacking and drag physics.
- **Emil Kowalski / animations.dev**: exit timing, origin-aware popovers, springs in practice.
- **Adam Argyle**: `@starting-style`, View Transitions, and modern CSS transitions.
- **Josh Comeau**: CSS transitions and keyframes explained interactively.
- **Easing Wizard**: generating `linear()` spring approximations for CSS.

From [`FIBO.md`](../../FIBO.md): the two-shelf rule (base parts depend only on Base UI,
cva, and lucide; special parts may use `motion`), `active:translate-y-px` as the base
press feedback, reduced motion respected in every part, and `add-component` step 2 as
the model for where motion rules sit in a component procedure.
