# Micro-interaction catalog

States and timings for common controls. Timings use the `motion-language` tokens:
`duration-instant` 0–50ms, `duration-fast` 100–150ms, `duration-base` 200–250ms,
`ease-out` `cubic-bezier(0.22, 1, 0.36, 1)`, `spring-snappy` 400/30.

---

## Button

| State | Visual | Timing | Notes |
| --- | --- | --- | --- |
| Rest | Base fill, label | | Minimum 44px tall on touch, 32–36px in dense desktop UI |
| Hover | Background one step darker or lighter | 100–150ms ease-out | Only under `(hover: hover)` |
| Focus-visible | 2px ring, 2px offset, 3:1 contrast | Instant | Never removed, only restyled |
| Pressed | `translateY(1px)` (Fibo: `active:translate-y-px`) or scale 0.97; background one more step | 0–50ms on `pointerdown` | Pick one treatment per system. Release scale with `spring-snappy` |
| Loading | Label stays, spinner replaces leading icon or overlays label with label at 0 opacity | Spinner after 300ms, min 500ms | Width must not change; `aria-busy="true"` |
| Success | Brief check or label change ("Saved") | 150ms in, revert after 1.5–2s | Only for actions with no other visible result |
| Error | Returns to rest; message near the button or field | 150ms | Button itself does not shake unless the brand is playful |
| Disabled | Reduced contrast, `cursor: not-allowed` | | Prefer enabled + validation message; if disabled, explain why nearby |

Double submits: ignore clicks while loading, do not rely on `disabled` alone
(it drops focus).

---

## Toggle switch

| State | Visual | Timing |
| --- | --- | --- |
| Off → on | Thumb slides, track fills | `spring-snappy`, or 150–200ms ease-out |
| Pressed | Thumb widens 10–20% (iOS style) or scales 0.95 | 0–50ms |
| Pending (server) | Stays in new position; optional small spinner in thumb after 300ms | |
| Failure | Thumb slides back; inline message | Same motion reversed |

Rules: a switch applies immediately. If the change needs confirmation or a Save, use a
checkbox instead. `role="switch"` with `aria-checked`. Label says what is on, not
"Enable/Disable".

---

## Checkbox

| State | Visual | Timing |
| --- | --- | --- |
| Check | Box fills, check draws (stroke-dashoffset) | 150ms ease-out |
| Uncheck | Check disappears, box empties | 100ms |
| Indeterminate | Dash | Instant |

Shift-click range selection in lists. Whole row clickable when the checkbox is the
row's main action.

---

## Text input

| State | Visual | Timing |
| --- | --- | --- |
| Rest | 1px border, placeholder only as example | |
| Focus | Border color and 2px ring | 100ms |
| Typing | No validation messages yet | |
| Validating | Small spinner at end after 300ms (async checks like username) | Debounce 300–500ms |
| Valid | Optional check for fields people worry about (username, password rules) | 150ms |
| Error | Border and message below, icon plus text, not color alone | On blur, or on submit |
| Error being fixed | Clear the error as soon as the value becomes valid, while typing | Instant |

Validate on blur, not on every keystroke. Re-validate live only once a field has shown
an error. Link the message with `aria-describedby`; set `aria-invalid="true"`.

---

## Copy to clipboard

| State | Visual | Timing | Announcement |
| --- | --- | --- | --- |
| Rest | Copy icon, tooltip "Copy" | Tooltip 500ms delay | |
| Pressed | Scale 0.97 | 50ms | |
| Success | Icon crossfades to check; tooltip reads "Copied" | 150ms; revert after 2s | Polite live region: "Copied" |
| Error | Select the text in a visible field | 150ms | "Press Cmd+C to copy" |

`navigator.clipboard.writeText()` needs a secure context and a user gesture. Confirm at
the button, not in a distant toast.

---

## Like / favorite

| State | Visual | Timing |
| --- | --- | --- |
| Like | Icon fills, scales 1 → 1.2 → 1; count increments | `spring-snappy` or 250ms total |
| First like ever (optional) | Small particle burst (special-shelf part only) | 400–600ms, once per item |
| Unlike | Icon empties, no burst | 150ms |
| Failure | Revert fill and count; toast "Couldn't save. Retry" | Same motion reversed |

Optimistic. Debounce rapid toggling to the final state before sending. `aria-pressed`
on the button; the count is not part of the accessible name.

---

## Save / bookmark to collection

Optimistic save, then a small inline confirmation ("Saved to Reading list · Change")
for 4–6s, giving a shortcut to change the destination. Undo available for as long
as the confirmation is visible.

---

## Delete with undo

Remove the row immediately (collapse 150ms), show a toast "Deleted · Undo" for 5–8s,
and send the delete when the toast expires or the page unloads. Use a confirmation
dialog instead only when the delete is irreversible and affects other people or
large amounts of data.

---

## Drag to reorder

| Phase | Visual |
| --- | --- |
| Grab | Item lifts: shadow increases, scale 1.02, cursor `grabbing` after 150ms press on touch |
| Move | Item follows pointer 1:1; siblings slide with `spring-gentle` |
| Drop | Item settles with `spring-snappy`; announce "Moved to position 3 of 8" |
| Cancel (Escape) | Returns to origin |

Keyboard alternative required: move up/down buttons, or Space to grab and arrows to move.

---

## Pull to refresh

Threshold at ~60–80px of pull; show the indicator's progress toward the threshold,
a haptic tick (native) when it is crossed, and release to trigger. Only on lists
ordered by time.

---

## Loading states by duration

| Expected wait | Pattern |
| --- | --- |
| < 300ms | Nothing extra |
| 300ms–1s | Pending state on the control |
| 1–3s | Skeleton for content, spinner for actions |
| 3–10s | Skeleton plus a status line ("Fetching invoices...") |
| > 10s | Determinate progress, estimate, allow backgrounding, notify on completion |
