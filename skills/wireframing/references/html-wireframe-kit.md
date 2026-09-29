# HTML wireframe kit

A minimal starting point for lo-fi wireframes in a single HTML file. It enforces the
fidelity rules by construction: three grays, one typeface, three sizes, one accent
color that only annotations may use.

## Starter file

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Wireframes – {feature}</title>
<style>
  :root {
    --fill: #f2f2f2;
    --stroke: #bdbdbd;
    --ink: #333;
    --note: #d6336c;          /* annotations only */
    --s1: 4px; --s2: 8px; --s3: 16px; --s4: 24px; --s5: 32px; --s6: 48px;
    font: 14px/1.5 system-ui, sans-serif;
    color: var(--ink);
  }
  body { margin: 0; background: #fff; }
  .board { display: flex; gap: var(--s6); padding: var(--s6); align-items: flex-start; flex-wrap: wrap; }
  .direction h2 { font-size: 18px; margin: 0 0 var(--s2); }
  .direction p.bet { margin: 0 0 var(--s3); max-width: 60ch; }
  .frame { position: relative; border: 1px solid var(--stroke); background: #fff; overflow: hidden; }
  .frame.desktop { width: 1440px; min-height: 900px; }
  .frame.mobile  { width: 390px;  min-height: 844px; }
  .box { background: var(--fill); border: 1px solid var(--stroke); padding: var(--s3); }
  .media { background: var(--fill); border: 1px solid var(--stroke); display: grid; place-items: center; aspect-ratio: 16/9; }
  .btn { display: inline-block; border: 1px solid var(--ink); padding: var(--s2) var(--s3); font-weight: 700; }
  .btn.secondary { border-color: var(--stroke); font-weight: 400; }
  .field { display: grid; gap: var(--s1); margin-bottom: var(--s3); }
  .field .input { border: 1px solid var(--stroke); height: 40px; }
  .h1 { font-size: 28px; font-weight: 700; margin: 0; }
  .h2 { font-size: 18px; font-weight: 700; margin: 0; }
  /* annotations */
  .pin { position: absolute; width: 22px; height: 22px; border-radius: 50%; background: var(--note);
         color: #fff; font-size: 12px; font-weight: 700; display: grid; place-items: center; }
  .notes { max-width: 60ch; margin-top: var(--s3); }
  .notes li { margin-bottom: var(--s2); }
  .notes .open { color: var(--note); }
  .annotations-hidden .pin { display: none; }
</style>
</head>
<body>
<main class="board">
  <section class="direction" aria-label="Direction: Inbox-first">
    <h2>Inbox-first</h2>
    <p class="bet">Bet: people arrive to triage, so the default view is a sorted queue, not a dashboard.</p>
    <div class="frame desktop">
      <!-- frame content, using CSS grid for regions -->
      <span class="pin" style="top: 24px; left: 24px">1</span>
    </div>
    <ol class="notes">
      <li><strong>Queue sorted by due date.</strong> Why: the brief's metric is time to first response.
        Assumes: due date exists for 90%+ of items. <span class="open">Open: what sorts items with no due date?</span></li>
    </ol>
  </section>
</main>
</body>
</html>
```

## Conventions

- One `.direction` section per concept, side by side on one board, so they are
  compared at a glance.
- Lay out regions with CSS grid (`grid-template-columns: 240px 1fr` for sidebar
  layouts, `repeat(12, 1fr)` when testing a 12-column structure).
- Position pins with inline `top` and `left` in pixels relative to the frame.
- Add `class="annotations-hidden"` to `body` to screenshot clean frames.
- Screenshot each frame with Playwright at its native width: `page.setViewportSize({
  width: 1440, height: 900 })`, then `locator('.frame.desktop').screenshot()`.

## What not to add

- Web fonts, icon libraries, images, or color beyond the four tokens above
- JavaScript interactions. If the bet depends on an interaction, draw the before and
  after states as two frames with an arrow note between them.
