# Motion recipes

Six patterns that cover most product UI. Each uses the `motion-language` tokens:
`--duration-fast: 150ms`, `--duration-base: 220ms`, `--duration-moderate: 320ms`,
`--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`,
`--ease-in: cubic-bezier(0.55, 0, 1, 0.45)`, `spring-snappy` (400/30),
`spring-gentle` (170/26). Swap in the project's own values if they differ.

---

## 1. Dropdown menu

**Spec:** enter 220ms ease-out, exit 150ms ease-in; opacity 0→1, scale 0.96→1;
origin at the trigger. Reduced motion: opacity only, 100ms.

CSS with the Popover API:

```css
[popover].menu {
  transform-origin: top left; /* set per placement: top right, bottom left... */
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out),
    display var(--duration-base) allow-discrete,
    overlay var(--duration-base) allow-discrete;
}
[popover].menu:not(:popover-open) {
  opacity: 0;
  transform: scale(0.96);
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-in);
}
@starting-style {
  [popover].menu:popover-open { opacity: 0; transform: scale(0.96); }
}
@media (prefers-reduced-motion: reduce) {
  [popover].menu, [popover].menu:not(:popover-open) { transform: none; transition-duration: 100ms; }
}
```

Radix and Base UI expose the computed origin as a CSS variable
(`--radix-dropdown-menu-content-transform-origin`, `--transform-origin`). Use it
instead of hardcoding.

Keyboard-opened command menus often skip the animation; opening via a
shortcut should feel instant.

---

## 2. Dialog

**Spec:** backdrop fades 220ms; panel enter 320ms ease-out, opacity 0→1,
translateY 8px→0, scale 0.98→1; exit 220ms. Reduced motion: opacity only, 150ms.

```css
dialog.modal {
  transition:
    opacity var(--duration-moderate) var(--ease-out),
    transform var(--duration-moderate) var(--ease-out),
    display var(--duration-moderate) allow-discrete,
    overlay var(--duration-moderate) allow-discrete;
}
dialog.modal:not([open]) {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
  transition-duration: var(--duration-base);
}
@starting-style {
  dialog.modal[open] { opacity: 0; transform: translateY(8px) scale(0.98); }
}
dialog.modal::backdrop {
  background: rgb(0 0 0 / 0.4);
  transition: opacity var(--duration-base) linear, display var(--duration-base) allow-discrete,
              overlay var(--duration-base) allow-discrete;
}
dialog.modal:not([open])::backdrop { opacity: 0; }
@starting-style { dialog.modal[open]::backdrop { opacity: 0; } }
```

Use `showModal()` so focus trapping and `Escape` come for free. Focus moves into the
dialog immediately on open, not after the animation.

Mobile bottom sheet: translateY 100%→0 with `spring-gentle`; allow drag-to-dismiss
past ~30% of height or a flick above ~500px/s (Vaul's approach).

---

## 3. Toast stack

**Spec:** new toast enters from the edge it lives on, 320ms ease-out, translateY
100%→0 plus opacity. Stack shows at most 3; older toasts scale down 0.05 per step and
offset 8–12px behind. On hover, the stack expands. Exit 220ms toward the same edge.
Swipe to dismiss past ~45px or with velocity.

Motion version:

```tsx
<ol className="toasts" aria-live="polite">
  <AnimatePresence initial={false}>
    {toasts.slice(0, 3).map((t, i) => (
      <motion.li
        key={t.id}
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1 - i * 0.15, y: expanded ? -i * 64 : -i * 10, scale: expanded ? 1 : 1 - i * 0.05 }}
        exit={{ opacity: 0, y: 24, transition: { duration: 0.22 } }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => { if (info.offset.y > 45 || info.velocity.y > 500) dismiss(t.id); }}
      />
    ))}
  </AnimatePresence>
</ol>
```

Pause auto-dismiss timers while hovered or focused and while the tab is hidden.
Read Sonner's source before building your own; it handles the edge cases.

---

## 4. List reorder, insert, remove

**Spec:** siblings slide to new positions with `spring-gentle`; inserted items fade
and expand; removed items fade and collapse in 150ms. Reduced motion: no slide; items
appear and disappear with a 100ms fade.

```tsx
<motion.ul layout>
  <AnimatePresence initial={false}>
    {items.map(item => (
      <motion.li
        key={item.id}
        layout
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0, transition: { duration: 0.15 } }}
        transition={{ type: "spring", stiffness: 170, damping: 26 }}
      />
    ))}
  </AnimatePresence>
</motion.ul>
```

Keys must be stable IDs, never array indexes. Past ~50 rows, or in a virtualized list,
skip per-row layout animation and animate only the row that changed.

Without a library, use the View Transitions API: give each row
`view-transition-name: item-<id>` and wrap the state update in
`document.startViewTransition()`.

---

## 5. Shared element (card to detail)

**Spec:** thumbnail grows into the detail hero, 400ms `ease-in-out` or
`spring-gentle`; surrounding content crossfades. Reduced motion: crossfade only.

Motion, same page:

```tsx
<motion.img layoutId={`photo-${id}`} src={thumb} />
// detail view
<motion.img layoutId={`photo-${id}`} src={full} />
```

View Transitions, across routes:

```css
.card img        { view-transition-name: var(--vt); }  /* set --vt: photo-42 inline */
.detail .hero img { view-transition-name: photo-42; }
::view-transition-group(photo-42) { animation-duration: 400ms; animation-timing-function: var(--ease-in-out); }
```

Only the clicked card should carry the name at capture time. Set it in the click
handler, not on every card, or duplicates abort the transition.

Match aspect ratios or use `object-fit: cover` on both ends; otherwise the image
visibly squashes mid-flight.

---

## 6. Scroll reveal

**Spec:** section content rises 16px and fades in over 400–500ms ease-out when 20–30%
of it is visible. Once only. Marketing pages only, never inside the app.
Reduced motion: content is visible from the start.

Pure CSS with scroll-driven animations (Chromium 115+, Safari 26+; progressive enhancement):

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 30%;
    }
  }
}
@keyframes reveal { from { opacity: 0; transform: translateY(16px); } }
```

IntersectionObserver fallback:

```js
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.dataset.shown = ""; io.unobserve(e.target); }
}, { threshold: 0.25 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
```

```css
.reveal { transition: opacity 450ms var(--ease-out), transform 450ms var(--ease-out); }
.reveal:not([data-shown]) { opacity: 0; transform: translateY(16px); }
```

Scrubbed storytelling section with GSAP and ScrollTrigger (marketing only):

```js
gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.timeline({ scrollTrigger: { trigger: ".story", start: "top 70%", end: "bottom 30%", scrub: 0.5 } })
    .from(".story h2", { y: 24, opacity: 0, ease: "power3.out" })
    .from(".story img", { scale: 0.96, opacity: 0 }, "<0.1");
});
```

`scrub: 0.5` smooths the link to the scrollbar by half a second; `"<0.1"` starts the
image 0.1s after the heading. In React, wrap this in `useGSAP()` for cleanup.

Content must be visible if JavaScript fails: add the hidden state only after a
`js` class is on `<html>`. Never hide above-the-fold content behind a reveal; it
delays Largest Contentful Paint.
