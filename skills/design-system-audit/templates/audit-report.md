# Design system audit: {Product or system}

**Date:** {date} · **Auditor:** {name or agent} · **Commit:** {sha} ·
**Rules audited against:** {project AGENTS.md | Fibo AGENTS.md as default}

## Scope

- Code: {directories}, excluding {stories, tests, token source, generated}
- Figma: {library file, pages} {or "not connected; code only"}
- Product: {screens and flows captured, themes, widths}

## Counts

| Measure | Count | Healthy | Status |
| --- | --- | --- | --- |
| Color literals in components | {n} | 0 | {fail/ok} |
| Opacity modifiers on token colors | {n} | 0 | |
| Primitive ramp classes in components | {n} | 0 | |
| Distinct font sizes | {n} | 6–9 | |
| Arbitrary values without a comment | {n} | 0 | |
| `dark:` overrides without a comment | {n} | 0 | |
| Distinct button looks (inventory) | {n} | {documented n} | |
| Icon libraries | {n} | 1 | |
| Tokens in Figma only / code only / value mismatch | {a} / {b} / {c} | 0 / 0 / 0 | |

## Findings

Failures only. One line each.

```
<file>:<line>  [blocking|minor]  <check>  <what is wrong>  →  <the fix>
```

### Tokens

```
src/components/card.tsx:14  [blocking]  literal  bg-[#f7f7f8]  →  bg-muted
```

### Components

#### {ComponentName}

```
src/components/dialog.tsx:22  [blocking]  accessibility  close button has no name  →  aria-label="Close"
```

### Figma drift

| Name | Figma (light / dark) | Code (light / dark) | Fix |
| --- | --- | --- | --- |
| {name} | {value} | {missing} | {add to code / remove from Figma / align value} |

### Accessibility sample

```
{flow} step {n}  [blocking]  {what fails}  →  {fix}
```

## Decisions made during the audit

- {e.g. base-layer defaults in globals.css treated as out of scope for check 2}

## Roadmap

### Now (this sprint)

| # | Fix | Reach | Findings closed |
| --- | --- | --- | --- |
| 1 | {fix at the source} | {n instances} | {ids} |

### Next (this quarter)

| # | Fix | Reach | Findings closed |
| --- | --- | --- | --- |

### Later

- {item}

## How to rerun

```bash
{the exact grep commands and scope used}
```

{ready | N blocking issues}
