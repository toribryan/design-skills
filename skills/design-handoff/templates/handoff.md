# Handoff: {Feature name}

**Status:** {Draft | Ready for dev | In build | Shipped} · **Version:** {x.y}
**Designer:** {name} · **Engineer:** {name} · **Last updated:** {date}
**Figma:** {link to page} · **Ticket:** {link} · **Brief:** {link}

## 1. Overview

**Problem:** {one or two sentences}
**Success metric:** {what moves if this works}

**In scope:** {frames, flows}
**Out of scope:** {what is deliberately not included, and where it will be handled}
**Release:** {single release | behind flag `{flag}` | staged: {stages}}

## 2. Flow

| Step | Frame | Entry | Next |
| --- | --- | --- | --- |
| 1 | {frame link} | {from where} | {to where, on what action} |

Exits and cancel paths: {where each one goes}

## 3. Components

| Element | Status | Code | Code Connect | Notes |
| --- | --- | --- | --- | --- |
| Primary action | Existing | `<Button>` | Mapped | `variant="default" size="default"` |
| Project row | New | `ProjectRow` | n/a | Spec below |
| Status pill | Variant | `<Badge variant="warning">` | Mapped, variant missing | New `warning` variant needed |

### New component spec: {Name}

- **Purpose:** {one line}
- **Anatomy:** {DOM parts, each with its `data-slot`: `project-row`, `project-row-title`, ...}
- **Props:** {name: type, default, one line each}
- **Variants:** {list}
- **States:** see section 5

## 4. Tokens used

| Role | Token |
| --- | --- |
| Surface | `background`, `card` |
| Text | `foreground`, `muted-foreground` |
| Border | `border` |
| Status | `destructive`, `destructive-subtle` |
| Spacing | `gap-2`, `gap-4`, `p-4`, `p-6` |
| Radius | `radius-lg` (controls), `radius-2xl` (card) |
| Type | {text styles by name} |
| Shadow | {shadow tokens} |
| Motion | `duration-base`, `ease-out` |

New tokens requested: {none | name, value, reason}

## 5. States

| Element | Default | Hover | Focus | Active | Disabled | Loading | Error | Selected |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| {element} | {frame} | {frame or rule} | ring token | {rule} | {rule + why disabled} | {rule} | {rule} | {rule or n/a} |

## 6. Edge cases

| Case | Behavior | Frame |
| --- | --- | --- |
| Empty (first use) | {copy + action} | |
| Empty (filtered) | {copy + "Clear filters"} | |
| One item | | |
| Many items ({n}+) | {pagination / virtualization / load more} | |
| Long text | {truncate at n lines / wrap / tooltip} | |
| Missing image or avatar | {fallback} | |
| Loading | {skeleton matching layout, shown after 300ms} | |
| Error (whole view) | {copy + retry} | |
| Error (one part) | {inline, rest of page works} | |
| No permission | {hidden / disabled with reason / message} | |
| Offline or slow | {behavior} | |

## 7. Responsive behavior

| Region | < 640 | 640–1023 | ≥ 1024 | ≥ 1440 |
| --- | --- | --- | --- | --- |
| Navigation | {sheet} | {collapsed rail} | {sidebar} | {sidebar} |
| Main content | {1 col} | {2 col} | {3 col} | {max-w-6xl, centered} |
| Actions | {sticky bottom bar} | {inline} | {inline} | {inline} |

Minimum supported width: 320px. Text zoom to 200% must not clip content.

## 8. Interaction and motion

| # | Trigger | Result | Duration | Easing | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| 1 | Click "New project" | Dialog opens, focus to name field | `duration-moderate` | `ease-out` | Fade 150ms |
| 2 | Esc or backdrop click | Dialog closes, focus to trigger | `duration-base` | `ease-out` | Fade 100ms |

Keyboard shortcuts: {list, and where they are shown}

## 9. Content

| Key | Location | Copy | Max length |
| --- | --- | --- | --- |
| `projects.empty.title` | Empty state | {final copy} | {n chars} |
| `projects.error.load` | Error state | {final copy} | |

## 10. Accessibility

- **Headings:** {h1 …, h2 …}
- **Landmarks:** {header, nav, main, …}
- **Focus order:** {1. …, 2. …, 3. …}
- **Focus on open / close:** {where focus goes}
- **Accessible names:** {icon-only controls and their labels}
- **Announcements:** {live region text for async results, e.g. "Project created"}
- **Target sizes:** {any control under 44px on touch, and how it is expanded}
- **Contrast notes:** {anything near the threshold, with the measured ratio}

## 11. Acceptance criteria

**Behavior**
- [ ] {Given …, when …, then …}

**Responsive**
- [ ] {At 390px, …}

**Accessibility**
- [ ] {When the dialog closes, focus returns to …}

**Content and states**
- [ ] {With 0 items, …}

## 12. Open questions

| Question | Owner | Default if unanswered | Due |
| --- | --- | --- | --- |
| | | | |

## Changelog

| Version | Date | Change |
| --- | --- | --- |
| 1.0 | {date} | Initial handoff |
