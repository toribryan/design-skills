---
name: micro-interactions
description: >-
  Designs single-purpose interactions (a button press, a toggle, copy-to-clipboard,
  a like, an input validating) as trigger, rules, feedback, and loops, with every
  state and timing specified. Use for "micro-interaction", "button states", "hover
  and pressed states", "loading feedback", "optimistic UI", "make this feel
  responsive", "toggle behavior", or "delight". Not for building the animation in
  code (use motion-implementation) or product-wide motion tokens (use motion-language).
---

# Micro-interactions

A micro-interaction is a contained product moment built around one task: turn a
setting on, copy a link, like a post, submit a field. Dan Saffer's model from
*Microinteractions: Designing with Details* (2013) breaks each one into four parts:
trigger, rules, feedback, and loops and modes. This skill produces a spec for each
moment that covers every state, the timing of the feedback, and what happens when it
fails. The standard: a person always knows their action registered within 100ms, and
nothing moves that does not tell them something.

## When to use

- Specifying states for buttons, toggles, inputs, checkboxes, like and save actions
- An interaction feels unresponsive, laggy, or unclear about whether it worked
- Deciding loading feedback: spinner, skeleton, progress bar, or nothing
- Deciding whether to update optimistically
- Reviewing "delight" proposals for whether they help or get in the way

**Not for:** code for the animation (use `motion-implementation`), the product's
duration and easing scale (use `motion-language`), or microcopy wording (use `ux-writing`).

## Inputs

- **The task** in one sentence, from the person's side ("save this article for later")
- **Frequency**: how often a person does this per session [assume often; design for the
  hundredth time, not the first]
- **Latency**: typical and p95 server response [assume 200ms typical, 2s p95]
- **Failure modes**: what can go wrong and whether it is recoverable
- **Motion tokens** from `motion-language` [defaults: `duration-instant` 0–50ms,
  `duration-fast` 100–150ms, `duration-base` 200–250ms, `ease-out`
  `cubic-bezier(0.22, 1, 0.36, 1)`, `spring-snappy` 400/30]
- **Platform**: web, iOS, Android [web, touch and pointer]

## Process

1. **Write the trigger.** Manual (a person acts) or system (a condition is met). Name
   the control, its affordance at rest, and its discoverability. Output: one line.
2. **Write the rules.** What happens, in order, including constraints: what is allowed,
   what is disabled and why, what the default is. Output: numbered rules.
3. **Specify feedback for every state.** Model: the matching control in
   [`references/catalog.md`](references/catalog.md), and the "Copy link" spec under
   Output. Copy that shape. Output: a table with visual change, timing, copy, and
   screen-reader announcement per state.
4. **Decide loops and modes.** Does the interaction change on repeat (collapse the
   tutorial hint after 3 uses)? Does it have a mode (edit mode)? Avoid modes unless the
   mode is clearly shown. Output: loop and mode notes, or "none".
5. **Plan the failure path.** Offline, timeout, permission denied, validation error.
   Output: what the person sees and how they recover.
6. **Place it on a shelf.** Following Fibo's two-shelf rule, feedback on standard
   controls is CSS state changes only, with no animation library. Flourishes (a like
   burst, a reaction picker) belong to a special part that may use `motion`, and
   continuous animation stays off unless it is the point. Model: Fibo's `button.tsx`
   for base feedback, its reactions part for special. Output: "base" or "special".
7. **Cut.** Remove any feedback that repeats what another signal already says. Output:
   the final spec, usually shorter than the draft.

## Standards

### Response time limits (Nielsen, 1993, after Miller 1968)

| Delay | Perception | Feedback |
| --- | --- | --- |
| < 0.1s | Instant; the system reacted directly | State change only. No spinner. |
| 0.1–1s | Noticed, but flow of thought intact | No spinner needed; subtle pending state on the control |
| 1–10s | Attention at risk | Spinner or skeleton; for longer operations, show what is happening |
| > 10s | Person will switch tasks | Determinate progress, time estimate, and a way to leave and come back |

Practical rules on top of those limits:
- Delay showing a spinner by ~300ms, then keep it for at least ~500ms once shown.
  This stops a spinner flashing for 50ms on fast responses.
- Skeletons for content areas with a known shape; spinners for actions on a control.
- Skeleton shimmer at 1.5–2s per cycle. Faster reads as anxious.

### Press feedback

- Pressed state appears on `pointerdown` (`:active`), not on `click`. It must show
  within one frame.
- Two valid press treatments; pick one per system and document it. Fibo's base
  buttons nudge down one pixel (`active:translate-y-px`), which reads as a physical
  key and never changes the button's footprint. Scale is the other: 0.97 on press with
  `duration-instant` to `duration-fast` and `ease-out`, released with `spring-snappy`;
  0.95–0.97 for small icon buttons, 0.98–0.99 for large cards, never below 0.95.
- Do not add press scale to links in running text, table rows, or anything that
  shifts surrounding layout.
- Hover changes color or background in `duration-fast`. Gate hover styles behind
  `@media (hover: hover) and (pointer: fine)` so taps do not leave sticky hover.

### Hover intent and delays

- Tooltips: ~300–700ms open delay (Radix defaults to 700ms); once one tooltip is open,
  neighbors open instantly for ~300ms (skip delay). Close immediately on pointer leave.
- Hover-opened menus: 100–200ms open delay, 200–300ms close delay, and a safe triangle
  toward the submenu so a diagonal cursor path does not close it.
- Hover must never be the only way to reach information. Anything in a tooltip is also
  reachable by focus and on touch.

### Optimistic UI

Update the interface immediately and reconcile with the server afterward when all of
these are true: the action succeeds more than ~99% of the time, it is reversible, and
the server's answer does not change what the person sees. Likes, saves, toggles,
reordering, and marking read qualify. Payments, sends to other people, and destructive
deletes do not.

On failure: revert the state with the same motion in reverse, and say what happened in
a toast or inline message with a retry. Never silently revert.

### Haptics

- iOS: `UIImpactFeedbackGenerator` (light/medium/heavy, soft/rigid) for physical
  collisions, `UISelectionFeedbackGenerator` for picker ticks,
  `UINotificationFeedbackGenerator` (success/warning/error) for outcomes.
- Android: `View.performHapticFeedback` with constants like `CONFIRM`, `REJECT`,
  `CLOCK_TICK`, `LONG_PRESS`.
- Web: `navigator.vibrate()` works on Android Chrome, not on iOS Safari. Treat it as
  optional garnish.
- Pair each haptic with a visual change. Use them for confirmations and thresholds
  (a swipe crossing its commit point), not for every tap. Respect system settings.

### Accessibility

- Every state change that is only visual needs a text equivalent: `aria-pressed`,
  `aria-checked`, `aria-busy`, or a polite live-region message ("Copied to clipboard").
- Focus ring visible on keyboard focus (`:focus-visible`), 2px minimum, 3:1 contrast.
- Touch targets at least 24x24 CSS px (WCAG 2.2 AA), 44x44pt on iOS, 48x48dp on Android.
- Reduced motion keeps the state change and drops the travel: a like fills without the burst.

### Delight versus noise

Delight is earned when the moment is rare, emotionally significant, and not on the
critical path: a first completed project, a streak, a payment going through. Noise is
the same flourish on the 40th like of the day. Test: would a person who does this 50
times a day want to see it the 50th time? If not, make it fire once, or cut it.

## Output

A spec per micro-interaction:

```
Name: Copy link
Trigger: Manual. Icon button, "Copy link" tooltip after 500ms, shortcut Cmd+Shift+C.
Rules: 1. Writes URL to clipboard. 2. If clipboard permission denied, select the URL
  in a read-only field. 3. Repeat clicks restart the confirmation timer.
Feedback:
  | State   | Visual                          | Timing                | Announcement        |
  | Rest    | Link icon                       |                       |                     |
  | Pressed | Scale 0.97                      | 50ms ease-out         |                     |
  | Success | Icon crossfades to check        | 150ms; revert after 2s| "Link copied"       |
  | Error   | Icon to warning, field shown    | 150ms                 | "Couldn't copy..."  |
Loops/modes: None.
Reduced motion: Crossfade only, no scale.
```

For states and timings of common controls, read
[`references/catalog.md`](references/catalog.md) before specifying buttons, toggles,
inputs, copy-to-clipboard, like, and save.

## Verify

The spec is done when it has been tried in a prototype or build: by mouse, by touch
(or device emulation), and by keyboard alone; in light and dark; with reduced motion
turned on; with a screen reader (VoiceOver or NVDA) announcing each state change; and
with the network throttled to "Slow 4G" plus one forced failure. Then confirm:

- [ ] Every control has rest, hover, focus-visible, pressed, disabled, loading, success,
      and error specified, or marked "not applicable" with a reason
- [ ] Feedback appears within 100ms of input for every action
- [ ] Spinners are delayed ~300ms and shown for at least ~500ms
- [ ] Optimistic updates have a written, tested failure path
- [ ] Every visual-only change has an accessible announcement or ARIA state
- [ ] Nothing depends on hover alone
- [ ] Each flourish passes the 50th-time test and lives on the special shelf
- [ ] Timings reference motion tokens by name

Delegate to read-only reviewers, which report only failures with location and end in
a verdict ("ready" or "N blocking issues"): `accessibility-auditor` for ARIA states,
live regions, target sizes, and focus; `copy-reviewer` for confirmation and error text;
`component-reviewer` when the interaction ships inside a component.

## Anti-patterns

- Disabled submit buttons with no explanation of what is missing
- A spinner replacing the button label, so the button width jumps
- Toggle switches that need a separate Save button; a switch applies immediately
- "Copied!" toasts at the far corner of the screen when the button itself could confirm
- Success animations longer than 1s on repeated actions
- Confetti for routine completions
- Optimistic deletes with no undo
- Hover delays on every table row, making the table feel sticky
- Haptics on scroll or every keystroke

## Related skills

- **Feeds from:** `motion-language` (tokens), `component-api-design` (state props),
  `ux-writing` (confirmation and error copy)
- **Leads to:** `motion-implementation`, `interface-polish`, `accessibility-review`,
  `design-handoff`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Design Spells**: dissected moments of delight; judge each against the 50th-time test.
- **Rauno Freiberg, Interaction Guidelines**: press states, hover gating, and when not to animate.
- **Emil Kowalski / animations.dev** and **Sonner**: feedback that is fast and quiet.
- **Nielsen Norman Group**: response time limits and progress indicator research.
- **Laws of UX**: Doherty Threshold (under 400ms keeps people engaged) and related principles.
- **Apple HIG**: haptic feedback patterns and when to use each generator.
- **Inclusive Components**: toggle buttons and switches with correct ARIA.

From [`FIBO.md`](../../FIBO.md): `active:translate-y-px` press feedback, the
`focus-visible:ring-[3px]` focus treatment, states expressed as attributes
(`aria-pressed`, `aria-invalid`, `disabled`) rather than extra props, and the
two-shelf rule that keeps flourishes out of base components.
