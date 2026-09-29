# The agent kit

Read before setting up a design system repo for coding agents. A system is
agent-ready when it ships three files beside its components, and a human mirror
that points at the same files:

| File | Job |
| --- | --- |
| `AGENTS.md` (and `CLAUDE.md` containing only `@AGENTS.md`) | One tool-agnostic source of conventions |
| `.agents/skills/add-component/SKILL.md` (linked into `.claude/skills/`) | The procedure, step by step, each step pointing at a model file |
| `.claude/agents/component-reviewer.md` | The read-only check, failures only, one-line verdict |
| `CONTRIBUTING.md`, PR template | Humans follow the same skill and the same definition of done |

Optional but useful: `.claude/settings.json` allowlisting the check commands so
agents run them without asking, and `.mcp.json` shipping the registry's MCP
server.

Fibo is the worked example for every file below:
[`AGENTS.md`](https://github.com/toribryan/fibo/blob/main/AGENTS.md),
[`add-component`](https://github.com/toribryan/fibo/blob/main/.agents/skills/add-component/SKILL.md),
[`component-reviewer`](https://github.com/toribryan/fibo/blob/main/.claude/agents/component-reviewer.md),
[`CONTRIBUTING.md`](https://github.com/toribryan/fibo/blob/main/CONTRIBUTING.md),
[`.claude/settings.json`](https://github.com/toribryan/fibo/blob/main/.claude/settings.json),
[`.mcp.json`](https://github.com/toribryan/fibo/blob/main/.mcp.json).

---

## 1. `AGENTS.md` starter

Keep it to one screen or two. Sections in this order.

````markdown
# {system name}

{One paragraph: what the system is, what it is built on, how a project installs a part.}

{Stack line: package manager, build tool, framework, styling, docs tool, runtime version.}

## Layout

| Path | Holds |
| --- | --- |
| `{components dir}` | The components. One source file plus one stories file each |
| `{metadata file}` | Title, description, shelf and group for every component |
| `{token file}` | Semantic tokens over primitives, light and dark |
| `{docs dir}` | One docs page per component |
| `.agents/skills/` | Agent skills; `.claude/skills/` links here |
| `.claude/agents/` | Reviewer subagents |
| `plans/` | Numbered design decisions |

## Commands

```
{install}
{docs dev server}
{build}
{lint}        # zero warnings
{typecheck}
{test}        # stories + a11y + unit
{format}
```

## Definition of done

A change is ready when {format}, {lint}, {build}, {typecheck} and {test} pass.
For a component change, also open it in {docs tool} in both themes and check the
keyboard path and reduced motion.

## Testing

{The layers: story render + axe, interaction (`play`) on Default by pointer and
keyboard, unit tests for logic stories cannot show, visual regression.}

## Adding a component

Use the `add-component` skill. The `component-reviewer` subagent reviews the result.

## Conventions

- **Shelves.** {base vs special and what each may depend on}
- **Tokens.** {semantic only in components; primitives only in the token file;
  named alpha roles instead of opacity modifiers}
- **Structure.** {file case, component case, variants object, part marker, prop docs}
- **Imports.** {aliases}
- **Writing.** Sentence case. Comments explain why, never what.

## Do not

- Edit generated output: {paths}
- Skip the pre-commit hook
- Add a dependency to a base component beyond {list}
````

Rules for writing it:

- Commands are exact and copy-pasteable. An agent runs them literally.
- "Do not" lists only things that have actually gone wrong or would be costly.
- Conventions state the rule and, in a few words, why ("Figma cannot bind opacity
  to a variable"), so an agent can handle a case the rule did not foresee.

## 2. `add-component` skill starter

````markdown
---
name: add-component
description: Add a new {system} component end to end, or port one in from another codebase. Covers the source file, stories, the docs page, metadata and the registry. Use when asked to create, add, build or port a component into {system}.
---

# Add a component to {system}

A component is not done until it has a source file, stories, a docs page and a
metadata entry. Work through the steps in order; each links to a file that
already does it well, so copy that shape.

## 1. Choose the shelf
{Base vs special, with the dependency rule. "If unsure, it is a base component."}

## 2. Write the source
`{path}/<name>.tsx`. Model: `{button.tsx}` (base) or `{special-example.tsx}` (special).
- {headless layer}; part marker on root and parts; variants object; semantic
  tokens only; aliases; focus ring classes; reduced motion; a doc comment per prop.

## 3. Write the stories
`{path}/<name>.stories.tsx`. Model: `{an interactive part's stories}`.
- Args-driven Default; one story per variant; `play` on Default by pointer and
  keyboard; `aria-label` on bare stories; unit tests for logic.

## 4. Write the docs page
`{docs path}/<name>.mdx`. Copy `{button.mdx}`, or `{compound.mdx}` for a part with
several elements, and keep the section order: {list the 11 sections}.

## 5. Register the metadata
{metadata entry, catalog preview, changelog line}

## 6. Verify
```bash
{format} && {lint} && {build} && {typecheck} && {test}
```
Then open the part in {docs tool}: both themes, the playground controls, keyboard
use and reduced motion. Confirm the registry output exists with the right
dependencies.

## Porting from another codebase
Treat the original as a reference, not a paste. Swap utilities, replace colors
and opacity modifiers with tokens, move primitives to {headless layer}, drop
site-specific copy, replace internal helpers with props. Credit the source in a
comment if its geometry or artwork is reused.
````

The pattern that makes it work: **every step names a real file to copy**. An agent
that copies `button.tsx` gets the focus ring, the part marker and the token usage
right without being told each one.

## 3. Reviewer subagent starter

````markdown
---
name: component-reviewer
description: Reviews a {system} component, its stories and its docs page against the repo's conventions before it ships. Use after adding or changing a component, or when asked to review one. Read-only.
tools: Read, Grep, Glob
---

You review one {system} component at a time. You never edit files; you report.

Given a component name, read:
- `{path}/<name>.tsx`, `{path}/<name>.stories.tsx`, `{docs path}/<name>.mdx`
- its entry in `{metadata file}`
- `AGENTS.md` for the conventions

Check each item and report only the ones that fail, with file and line:

1. **Shelf.** {title prefix matches tier; imports allowed for that shelf}
2. **Tokens.** {semantic only; no primitives, opacity modifiers or literals}
3. **Structure.** {part marker, aliases, variants export, prop docs}
4. **Accessibility.** {keyboard, focus ring, names, reduced motion}
5. **Stories.** {no autodocs; args-driven Default; callbacks excluded from controls}
6. **Docs page.** {section order; a sentence per example; every part marker in
   the data attributes table; every referenced story exists; sentence case}
7. **Tests.** {play on Default by pointer and keyboard; aria-label on bare
   stories; unit tests for logic}
8. **Comments.** They explain why, not what, and none describe removed code.

End with a one-line verdict: ready, or the number of blocking issues.
````

Rules for reviewers:

- Read-only tools. A reviewer that can edit will "fix" and skip reporting.
- Failures only. A list of passes buries the one that matters.
- File and line on every finding, so a person or agent can act without searching.
- A one-line verdict, so the calling agent can loop until `ready`.

## 4. Human mirror

- `CONTRIBUTING.md` points at the same skill: "Adding a component: follow
  `.agents/skills/add-component/SKILL.md`. Coding agents use the same file."
- The PR template's checklist repeats the definition of done word for word. Fibo's:
  "Checked in Storybook in light and dark, by keyboard, and with reduced motion."
- Issue templates: a bug form with a link-to-story field, and a component request
  with a shelf dropdown, so the API conversation happens before the build.

## 5. Settings and MCP

```json
// .claude/settings.json: let agents run the checks without asking
{
  "permissions": {
    "allow": ["Bash(pnpm lint)", "Bash(pnpm typecheck)", "Bash(pnpm build)",
              "Bash(pnpm format:check)", "Bash(pnpm format:write)"],
    "deny": ["Read(./.env)", "Read(./.env.*)"]
  }
}
```

```json
// .mcp.json: the registry's MCP server, so agents can browse and install parts
{ "mcpServers": { "shadcn": { "command": "npx", "args": ["shadcn@latest", "mcp"] } } }
```

Both are Fibo's, trimmed.
