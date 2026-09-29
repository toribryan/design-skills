# design-skills

Claude skills for the whole product design process: discovery through shipped code,
plus design systems, interface craft, motion, and brand.

Includes 32 skills and 7 read-only reviewer subagents. It installs as a single
Claude Code plugin.

- **Reference bank:** [designeer.xyz](https://designeer.xyz), the curated index of
  interface craft, component libraries, design systems, and design engineers, is
  mirrored in [`REFERENCE-BANK.md`](REFERENCE-BANK.md).
- **House system:** [Fibo](https://github.com/toribryan/fibo), an achromatic design
  system on shadcn/ui and Base UI, is the worked example throughout. Its agent setup
  gives the collection its shape: procedural skills that point at models, a
  definition of done, and read-only reviewers that report failures and end in a
  verdict. See [`FIBO.md`](FIBO.md).

## Install

```bash
/plugin marketplace add toribryan/toribryan
/plugin install design-skills@toribryan
```

Or copy any `skills/<name>/` folder into `~/.claude/skills/` (or a project's
`.claude/skills/`), and any `agents/<name>.md` into `.claude/agents/`.

## Start here

Ask for the outcome. Claude loads the matching skill from its description. When
work spans phases, `product-design-process` routes it: it places the work on the
phase map, loads each phase's skill, runs the reviewer that guards the phase, and
keeps a project log of decisions.

## Skills

### Discover and define

| Skill | Produces |
| --- | --- |
| [`product-design-process`](skills/product-design-process/SKILL.md) | The router: phase map, reviewers per phase, a running project log |
| [`design-discovery`](skills/design-discovery/SKILL.md) | Problem statement, assumption map, research plan |
| [`user-research`](skills/user-research/SKILL.md) | Interview guides, screeners, synthesis, insights |
| [`reference-research`](skills/reference-research/SKILL.md) | Annotated reference board and pattern comparison matrix |
| [`design-brief`](skills/design-brief/SKILL.md) | A brief with success metrics, scope, non-goals, and options considered |
| [`information-architecture`](skills/information-architecture/SKILL.md) | Sitemap, user flows, and a screen-state inventory |

### Design and validate

| Skill | Produces |
| --- | --- |
| [`wireframing`](skills/wireframing/SKILL.md) | Three or more genuinely different concept directions |
| [`layout-and-hierarchy`](skills/layout-and-hierarchy/SKILL.md) | Grids, spacing, and hierarchy that read at a glance |
| [`design-critique`](skills/design-critique/SKILL.md) | Structured critique with severity ratings |
| [`usability-testing`](skills/usability-testing/SKILL.md) | Test plan, tasks, and a findings report |
| [`ux-writing`](skills/ux-writing/SKILL.md) | Interface copy: actions, errors, empty states |
| [`accessibility-review`](skills/accessibility-review/SKILL.md) | A WCAG 2.2 AA audit with fixes |

### Design systems

| Skill | Produces |
| --- | --- |
| [`design-tokens`](skills/design-tokens/SKILL.md) | Tiered tokens in DTCG and CSS, synced with Figma variables |
| [`color-system`](skills/color-system/SKILL.md) | OKLCH ramps and semantic roles with measured contrast |
| [`typography-system`](skills/typography-system/SKILL.md) | Typefaces, scale, fluid sizes, and type roles |
| [`iconography`](skills/iconography/SKILL.md) | Icon grid, style rules, library choice, SVG hygiene |
| [`component-api-design`](skills/component-api-design/SKILL.md) | Component anatomy, variants, states, and a spec |
| [`design-system-audit`](skills/design-system-audit/SKILL.md) | Inventory, drift report, and a prioritized roadmap |
| [`design-system-docs`](skills/design-system-docs/SKILL.md) | Component and foundations docs people and agents use |

### Craft and ship

| Skill | Produces |
| --- | --- |
| [`interface-polish`](skills/interface-polish/SKILL.md) | The detail pass that takes UI from done to excellent |
| [`design-to-code`](skills/design-to-code/SKILL.md) | High-fidelity UI built on existing tokens and components |
| [`design-handoff`](skills/design-handoff/SKILL.md) | A handoff package with states, specs, and acceptance criteria |
| [`visual-qa`](skills/visual-qa/SKILL.md) | Implementation checked against design at every breakpoint |
| [`landing-page-design`](skills/landing-page-design/SKILL.md) | Marketing pages that explain, persuade, and load fast |

### Motion

| Skill | Produces |
| --- | --- |
| [`motion-language`](skills/motion-language/SKILL.md) | Motion principles, duration and easing tokens, a pattern map |
| [`motion-implementation`](skills/motion-implementation/SKILL.md) | Animations in CSS, Motion, GSAP, Rive, or Lottie |
| [`micro-interactions`](skills/micro-interactions/SKILL.md) | Trigger, rules, feedback, and loops for small moments |

### Brand

| Skill | Produces |
| --- | --- |
| [`brand-strategy`](skills/brand-strategy/SKILL.md) | Positioning, attributes, and a brand platform |
| [`brand-identity`](skills/brand-identity/SKILL.md) | Logo, color, type, imagery, and identity guidelines |
| [`brand-voice`](skills/brand-voice/SKILL.md) | Voice attributes, a tone map, and word lists |
| [`art-direction`](skills/art-direction/SKILL.md) | Named direction territories, moodboards, style tiles |
| [`design-case-study`](skills/design-case-study/SKILL.md) | Portfolio case studies that show the thinking |

## Reviewer subagents

Read-only. Each reads what it needs, checks a numbered list, reports only failures
with their location, and ends with `ready` or `N blocking issues`. Modeled on
Fibo's [`component-reviewer`](https://github.com/toribryan/fibo/blob/main/.claude/agents/component-reviewer.md).

| Reviewer | Checks |
| --- | --- |
| [`design-critic`](agents/design-critic.md) | Goal fit, hierarchy, heuristics, states, craft |
| [`accessibility-auditor`](agents/accessibility-auditor.md) | WCAG 2.2 AA, from source and rendered page |
| [`component-reviewer`](agents/component-reviewer.md) | A component, its stories, and docs against house conventions |
| [`token-auditor`](agents/token-auditor.md) | Hard-coded values, primitive leaks, opacity modifiers, Figma drift |
| [`visual-qa-reviewer`](agents/visual-qa-reviewer.md) | Built UI vs. design, per breakpoint, theme, and state |
| [`copy-reviewer`](agents/copy-reviewer.md) | Interface copy against voice and UX writing standards |
| [`brand-reviewer`](agents/brand-reviewer.md) | Work against identity guidelines and art direction |

## Connected tools

Skills use these when they are connected and work without them when they are not:
Figma MCP (read frames and variables, write designs), Mobbin MCP (real screens and
flows), shadcn MCP (browse and install registry parts, including `@fibo`), and a
browser via Playwright (screenshots and visual QA).

## Contributing

Read [`AUTHORING.md`](AUTHORING.md) for the skill and reviewer format and
[`AGENTS.md`](AGENTS.md) for the definition of done.
