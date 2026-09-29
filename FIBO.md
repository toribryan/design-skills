# Fibo: the house design system

[Fibo](https://github.com/toribryan/fibo) ([docs](https://fibo.toribryan.com) ·
[Figma](https://www.figma.com/design/LJZ5Tt4Ba7NPPi8Xnq8i0e/Fibo-DS) ·
[llms.txt](https://fibo.toribryan.com/llms.txt)) is the working example this
collection is calibrated against. It is an achromatic design system built on
shadcn/ui and Base UI, documented in Storybook, and published as a shadcn
registry.

Skills cite Fibo in two ways:

- **As the default.** When a project has no system of its own, and the stack is
  React + Tailwind, start from Fibo instead of inventing tokens and components.
- **As the worked example.** When a skill describes a practice (token naming,
  component anatomy, docs structure), Fibo shows that practice done for real.
  Read the linked file before writing your own version.

Never copy Fibo's conventions into a project that already has its own. Match the
project. Use Fibo for the reasoning, not the names.

---

## How Fibo works with agents

This part of Fibo shaped this collection most. Fibo is set up so a coding
agent can add a component and get it right on the first pass, and the collection
copies that setup: its skill format and its reviewer subagents both come from here.

| Piece | File | Pattern it establishes |
| --- | --- | --- |
| **One source of truth** | [`AGENTS.md`](https://github.com/toribryan/fibo/blob/main/AGENTS.md), with `CLAUDE.md` containing only `@AGENTS.md` | Conventions live in one tool-agnostic file: layout, commands, definition of done, testing layers, conventions, and a short "Do not" list. Every agent and every human reads the same page. |
| **Procedural skill** | [`.agents/skills/add-component/SKILL.md`](https://github.com/toribryan/fibo/blob/main/.agents/skills/add-component/SKILL.md), symlinked into `.claude/skills/` | Numbered steps in the order the work happens. Each step names **a model file that already does it well** and says "copy that shape". It ends in a Verify step with exact commands and what to look at by hand. A second section covers porting from elsewhere. |
| **Read-only reviewer** | [`.claude/agents/component-reviewer.md`](https://github.com/toribryan/fibo/blob/main/.claude/agents/component-reviewer.md) | Tools limited to `Read, Grep, Glob`. "You never edit files; you report." A numbered checklist; **report only the items that fail, with file and line**; end with **a one-line verdict: ready, or the number of blocking issues**. |
| **Decision records** | [`plans/`](https://github.com/toribryan/fibo/tree/main/plans) | Numbered, never reused. Four questions: what is changing, why now, what the options were, what was chosen. Kept after shipping as the record of why. |
| **Agent-readable docs** | [`llms.txt`](https://fibo.toribryan.com/llms.txt), `components.meta.json` | Every part with its install command, and an explicit statement that the list is complete, so an agent does not go looking for parts that do not exist. |
| **Pre-approved checks** | [`.claude/settings.json`](https://github.com/toribryan/fibo/blob/main/.claude/settings.json) | The lint, typecheck, build, and format commands are allowlisted, so agents run the checks without asking; `.env` reads are denied. |
| **Shipped MCP** | [`.mcp.json`](https://github.com/toribryan/fibo/blob/main/.mcp.json) | The repo configures the shadcn MCP server, so agents can browse and install registry parts. |
| **Human mirror** | [`CONTRIBUTING.md`](https://github.com/toribryan/fibo/blob/main/CONTRIBUTING.md), PR template | It points humans at the same skill file agents use ("Coding agents use the same file"). The PR checklist restates the definition of done. |

What this collection takes from it:

- Every skill ends in a **Verify** section, a definition of done, not a vague quality bar.
- Process steps point at **models** (templates, references, real files) instead of
  describing an output from scratch.
- Checking is delegated to **read-only reviewer subagents** in [`agents/`](agents/)
  that report failures only and end in a verdict.
- The collection has its own [`AGENTS.md`](AGENTS.md), and `CLAUDE.md` imports it.
- `component-api-design` and `design-system-docs` teach this setup as part of
  shipping a design system: a system is agent-ready when it ships an `AGENTS.md`,
  an add-component skill, and a reviewer.

## Install

```json
// components.json
{ "registries": { "@fibo": "https://fibo.toribryan.com/r/{name}.json" } }
```

```bash
pnpm dlx shadcn@latest add @fibo/button
```

Then copy the `:root` and `.dark` blocks from
[`packages/ui/src/styles/globals.css`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/styles/globals.css).
With `@fibo` registered, the shadcn MCP server can browse and install parts.

**Stack:** React 19, Tailwind CSS 4, Base UI, class-variance-authority,
lucide-react, Storybook 10, Vitest in Chromium with axe, Chromatic, pnpm +
Turborepo.

## Principles, and the skills they inform

| Fibo principle | What it teaches | Skills |
| --- | --- | --- |
| **Achromatic by default.** No brand hue. `primary` is a neutral; color only carries meaning (destructive, success, warning, info). | Color as signal, not decoration. A restrained base makes status legible. | `color-system`, `brand-identity`, `art-direction` |
| **One name on both sides.** Every token in `globals.css` matches a Figma variable one to one. | Token names are a contract between design and code. | `design-tokens`, `design-handoff`, `design-system-audit` |
| **Opacity gets a name.** No `bg-destructive/10`. Instead `-subtle`, `-hover`, `-ring` roles, because Figma cannot bind an opacity modifier to a variable. | Anything a designer must pick needs a name. Keep alpha in one place. | `design-tokens`, `color-system` |
| **Contrast is measured.** Status tones sit on the 700 step in light mode (600 measured 3.3:1 with white text) and 400 in dark. Tints are 8% light, 20% dark. | Choose steps by measurement, and record the measurement next to the choice. | `color-system`, `accessibility-review` |
| **Yours once installed.** Parts copy in as source via the registry. | Distribution model shapes API design: parts must be readable and editable. | `component-api-design`, `design-to-code` |
| **Two shelves.** *Base components* depend only on Base UI, cva, and lucide. *Special components* are playful, built for one moment, and may use `motion`. | Separate the dependable core from expressive parts, and give each different rules. | `component-api-design`, `motion-implementation`, `micro-interactions` |

## Tokens

- **Primitives** are Tailwind v4's OKLCH ramps (`neutral`, `red`, `green`,
  `amber`, `blue`; steps 50–950). They appear only in `globals.css`.
- **Semantic roles** alias primitives in `:root` and `.dark`, and are exposed to
  Tailwind with `@theme inline` (`--color-primary: var(--primary)`). Components
  use only these: `bg-primary`, `text-muted-foreground`, `border-border`.
- **Role families:** `background/foreground`, `card`, `popover` (+ `-overlay`),
  `primary` (+ `-foreground`, `-hover`, `-subtle`), `secondary`, `muted`,
  `accent`, four status roles (+ `-foreground`, `-subtle`, and for destructive
  `-subtle-hover`, `-ring`), `border`, `input` (+ `-subtle`, `-subtle-hover`),
  `ring` (+ `-subtle`), `chart-1…5`, and `sidebar-*`.
- **Derived tints** use `color-mix(in oklch, <step> 8%, transparent)`, so the
  alpha lives in the token, never in a class.
- **Dark mode** remaps roles, it does not invert: borders become
  `oklch(1 0 0 / 10%)`, status moves to the 400 step, `primary` flips to
  `neutral-50`.
- **Radius** is one knob, `--radius: 0.5rem`, with `sm` through `4xl` derived as
  `calc(var(--radius) ± n px)`. Every step lands on a whole pixel so it can be a
  Figma variable.
- **Type:** Geist and Geist Mono with system fallbacks.

## Component conventions

From [`AGENTS.md`](https://github.com/toribryan/fibo/blob/main/AGENTS.md) and
[`button.tsx`](https://github.com/toribryan/fibo/blob/main/packages/ui/src/components/button.tsx):

- Built on Base UI primitives (`@base-ui/react/*`), not Radix.
- kebab-case file, PascalCase component, a `<name>Variants` cva object when it
  has variants.
- `data-slot="<name>"` on the root and `data-slot="<name>-<part>"` on parts,
  which makes parts styleable and documentable.
- A JSDoc line on every prop (Storybook's props table reads them).
- States expressed through attributes, not extra props: `aria-invalid`,
  `aria-expanded`, `disabled`, `has-data-[icon=inline-start]`.
- Focus: `focus-visible:ring-[3px] focus-visible:ring-ring-subtle`.
- Press feedback: `active:translate-y-px`.
- Sizes: `xs` h-6, `sm` h-8, `default` h-9, `lg` h-10, plus square `icon-*` sizes.
- Motion respects `prefers-reduced-motion`; continuous animation stays off unless
  it is the point of the part.

## Documentation structure

Every component gets an MDX page in this order (see
[`button.mdx`](https://github.com/toribryan/fibo/blob/main/apps/storybook/src/components/button.mdx)):

1. Name, one or two sentences, live canvas
2. Features (three or four bullets)
3. Installation
4. Usage: a small complete example, plus the one rule that matters most
5. Anatomy (multi-element parts only; DOM elements, never props)
6. Guidelines
7. Examples, one sentence each
8. Do's and don'ts, with live examples
9. API reference, then a data attributes table
10. Accessibility
11. Related components, then References

Headings and UI copy in sentence case. Metadata (title, one-line description,
shelf, group, status) lives in `components.meta.json` and feeds the catalog,
the registry, and `llms.txt`.

## Quality gates

A change is done when `format:check`, `lint` (zero warnings), `build`,
`typecheck`, and `test` all pass, and someone has opened the part in Storybook in
both themes and checked the keyboard path. Testing has four layers:

1. **Story tests:** every story renders in Chromium and fails on an axe violation.
2. **Interaction tests:** a `play` function on `Default` drives the part by
   pointer *and* keyboard.
3. **Unit tests:** logic a story cannot show (formatting, limits, controlled callbacks).
4. **Visual regression:** Chromatic snapshots every story on pull requests.

The [theme creator plan](https://github.com/toribryan/fibo/blob/main/plans/001-theme-creator.md)
models a design-decision write-up with rejected alternatives: it
records three layouts that were tried and why the shipped one won.
