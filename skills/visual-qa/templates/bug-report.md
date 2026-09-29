# Visual QA: {Feature or release}

**Build:** {URL} · **Commit:** {sha} · **Date:** {date} · **Reviewer:** {name}
**Design source:** {Figma link, version or last-modified date}
**Handoff:** {link, if any}

**Covered:** {screens} × {320, 768, 1024, 1440} × {light, dark} × {browsers}
**Stress checks:** {200% zoom, long content, ~30% expansion, reduced motion, keyboard}
**Not covered:** {what, and why}

Failures only. Passing checks are not listed.

---

## {Screen name}

### VQA-{01} · {S1 | S2 | S3 | S4} · {short title, e.g. "Delete button hidden at 320px"}

- **Where:** {screen} / {state} / {width}px / {light | dark} / {browser}
- **Code:** {`path/to/file.tsx:line`, if known}
- **Expected:** {the design's value, by token or frame: "gap-4 (16px) between rows, frame 'Projects / 320'"}
- **Actual:** {the computed value: "gap 8px; delete button wraps below the fold"}
- **Evidence:** {design image} · {build image} (e.g. `projects--default--320--light.png`)
- **Suggested fix:** {one line: "use `gap-4`; move actions into overflow menu under `sm`"}
- **Source of truth:** {design | build is right, design is stale | needs decision}

### VQA-{02} · ...

---

## Design gaps

States or breakpoints the design did not specify, found during QA. These go back to
design, not to engineering.

| Gap | Where | What the build does now | Suggested decision |
| --- | --- | --- | --- |
| {No filtered-empty state} | {Projects} | {Shows first-run empty copy} | {"No projects match" + Clear filters} |

---

**Verdict:** {ready | N blocking issues (S1: x, S2: y)}
