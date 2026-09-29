# Capture script

A Playwright script that captures the QA matrix: every route and state at 320, 768,
1024, and 1440, in light and dark, with animations frozen and fonts loaded. Adapt the
`ROUTES` list; keep the naming scheme so images sort by screen.

## Script

```ts
// qa/capture.spec.ts  —  run with: pnpm exec playwright test qa/capture.spec.ts
import { test } from "@playwright/test";

const BASE = process.env.QA_URL ?? "http://localhost:3000";
const WIDTHS = [320, 768, 1024, 1440] as const;
const SCHEMES = ["light", "dark"] as const;

// One entry per screen/state. `setup` puts the page in that state.
const ROUTES: { name: string; path: string; setup?: (page: any) => Promise<void> }[] = [
  { name: "projects--default", path: "/projects" },
  { name: "projects--empty", path: "/projects?seed=empty" },
  { name: "projects--error", path: "/projects?seed=error" },
  {
    name: "projects--dialog-open",
    path: "/projects",
    setup: async (page) => {
      await page.getByRole("button", { name: "New project" }).click();
    },
  },
];

for (const scheme of SCHEMES) {
  for (const width of WIDTHS) {
    for (const route of ROUTES) {
      test(`${route.name} ${width} ${scheme}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.setViewportSize({ width, height: 900 });
        await page.goto(BASE + route.path, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        if (route.setup) await route.setup(page);
        await page.screenshot({
          path: `qa/captures/${route.name}--${width}--${scheme}.png`,
          fullPage: true,
          animations: "disabled",
          caret: "hide",
        });
      });
    }
  }
}
```

If the app toggles dark mode with a class instead of `prefers-color-scheme`, set it
before capture:

```ts
await page.evaluate((s) => document.documentElement.classList.toggle("dark", s === "dark"), scheme);
```

## Stress captures

Run these on the densest screen at 320 and 1440.

```ts
// 200% zoom (approximates browser zoom by halving the CSS viewport at 2x DPR)
const context = await browser.newContext({ viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 });

// Pseudo-localization: lengthen every text node by ~30%
await page.evaluate(() => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const t = node.textContent ?? "";
    if (t.trim().length > 1) node.textContent = t + " " + t.slice(0, Math.ceil(t.length * 0.3));
  }
});

// Long content: seed data or patch the DOM
await page.getByTestId("project-name").first().evaluate((el) => {
  el.textContent = "Quarterly infrastructure migration planning and vendor review 2026";
});
```

## Comparing against the design

1. Export the Figma frame at 1x at its own width (`get_screenshot` with the Figma MCP,
   or Export → PNG 1x).
2. Capture the build at the same width, cropped to the same region
   (`page.getByRole("main").screenshot()` or a `clip`).
3. Overlay: open both in Figma or any image editor, build on top at 50% opacity, or
   toggle "difference" blend mode. Misalignment shows as double edges.
4. Diff (optional): `pixelmatch` or Playwright's `toHaveScreenshot` against the
   design export as a baseline, with `maxDiffPixelRatio: 0.02`. Treat the diff image
   as a map of where to look, never as the verdict.

```ts
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import fs from "node:fs";

const a = PNG.sync.read(fs.readFileSync("qa/design/projects-1440.png"));
const b = PNG.sync.read(fs.readFileSync("qa/captures/projects--default--1440--light.png"));
const { width, height } = a;
const diff = new PNG({ width, height });
const changed = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });
fs.writeFileSync("qa/diff/projects-1440.png", PNG.sync.write(diff));
console.log(`${((changed / (width * height)) * 100).toFixed(2)}% pixels differ`);
```

The two images must be the same size; crop the build capture to the frame height
first.

## Naming

`{screen}--{state}--{width}--{scheme}.png`, all lowercase, so a folder listing reads
as the matrix. Reference these names in bug reports.
