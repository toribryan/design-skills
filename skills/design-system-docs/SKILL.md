---
name: design-system-docs
description: >-
  Writes design system documentation people and agents actually use: a fixed
  per-component page structure, foundations pages generated from the tokens,
  metadata that feeds a catalog and llms.txt, a contribution model, a changelog,
  and the AGENTS.md, add-component skill and reviewer that let coding agents
  build parts to spec. Use for "document our components", "Storybook docs",
  "MDX docs page", "usage guidelines", "do's and don'ts", "llms.txt", "make our
  design system agent-ready", or "nobody reads our docs". Not for designing a
  component's API; use component-api-design.
---

# Design System Docs

Documentation is how a system's decisions reach the people and agents who were
not in the room. Docs get used when every page has the same shape, when the
first screen answers "what is this and how do I install it", when rules come
with a live do and don't, and when nothing is written twice (tables are read
from the source, metadata feeds the catalog and `llms.txt`). The output is a
page template, filled pages, foundations pages, a metadata file, and the agent
kit (`AGENTS.md`, an add-component skill and a reviewer) that turns the docs
into instructions.

## When to use

- A system has components but no docs, or docs nobody opens
- Moving docs into Storybook MDX, or from a wiki into the repo
- Adding usage guidelines and do's and don'ts to existing pages
- Coding agents keep inventing components or props that do not exist
- Setting up how people propose and contribute new parts

**Not for:** deciding a component's props and parts (use `component-api-design`),
token architecture (use `design-tokens`), product copy (use `ux-writing`), or a
docs audit as part of a system audit (use `design-system-audit`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **The components and their stories**: read the source; props come from code.
- **Docs platform**: [Storybook with MDX, no `autodocs` tag, one MDX page per component]
- **Audience**: [product engineers first, designers second, coding agents third]
- **Existing conventions**: the project's `AGENTS.md`, `CONTRIBUTING.md`, and one
  page the team considers good. They win over this skill.
- **Figma**: component descriptions and links, via the Figma MCP if connected.
- **Publishing**: [static site with the registry and `llms.txt` beside it]

If the project has no system and uses React + Tailwind, start from Fibo
(`pnpm dlx shadcn@latest add @fibo/<name>`) and use its docs pages as the model
for the parts you install.

## Process

1. **Fix the page structure.** One order for every component page. Model:
   Fibo's `button.mdx` (single element) and `select.mdx` (compound); copy that
   shape, or use [`templates/component-doc.md`](templates/component-doc.md).
   Output: the template.
2. **Build the doc blocks.** Reusable pieces so pages stay consistent: install
   command, guidelines list, do/don't pair, anatomy tree, data attributes table,
   related components. Output: the block components.
3. **Write the metadata file.** One entry per component: title, one-line
   description, shelf or tier, group, status. The build fails when a component
   has no entry. Output: `components.meta.json` (or equivalent).
4. **Write foundations pages from the source.** Colors, typography, radius and
   motion pages read the token file instead of restating it. Output: pages whose
   tables cannot drift.
5. **Write component pages**, highest-traffic first (button, input, select,
   dialog). Output: filled pages, each passing the checklist in Standards.
6. **Publish agent-readable docs.** Generate `llms.txt` from the metadata, with
   every part, its docs link and its install command, and a line saying the list
   is complete. Output: `llms.txt` beside the site.
7. **Ship the agent kit.** `AGENTS.md`, an `add-component` skill and a read-only
   reviewer. Read [`references/agent-kit.md`](references/agent-kit.md) and copy
   its starter files. Output: the three files, linked from `CONTRIBUTING.md`.
8. **Set the contribution model and changelog.** A request template, a PR
   checklist that restates the definition of done, numbered decision records, and
   a changelog page. Output: those files.

## Standards

### Component page, in this order

1. **Name**, one or two sentences on what it does, and a live canvas of `Default`.
2. **Features**: three or four bullets on what it can do.
3. **Installation**: the exact command, and a line for any dependency it adds.
4. **Usage**: a small, complete, copy-pasteable example, then one sentence with the
   rule that matters most. Show the shape of any array prop as a type.
5. **Anatomy**: multi-element parts only. DOM elements with their part markers,
   never props.
6. **Guidelines**: 3–6 rules, each checkable ("Keep 8px between buttons in a group").
7. **Examples**: one live example per story, each with one sentence saying what it shows.
8. **Do's and don'ts**: live pairs, rendered with the real component, not screenshots.
9. **API reference**: the props table generated from code, then a data attributes table.
10. **Accessibility**: keyboard behavior, naming, focus, what the component does
    and what the consumer must do.
11. **Related components**, then **References** (specs and sources followed).

Why this order: people arrive asking "is this the right part?" (1–2), then "how
do I get it working?" (3–4), then "how do I use it well?" (5–8), then "what exactly
does it accept?" (9–10). Props come late because the table is generated and
complete; prose comes first because only a person can write it.

### Writing

- Sentence case for headings and UI copy.
- The description starts with a verb or names the job: "Picks one option from a
  list that opens on demand." Not "A beautiful, flexible select component."
- Every example has a sentence. An example with no sentence is a screenshot.
- Rules state a number or a named choice. "Use one default button per view."
- Don'ts say what goes wrong: "Nothing tells people which one matters."
- No marketing words, no emoji, no "simply" or "just".

### Single source

- Props tables come from code (doc comments on every prop). Never hand-write them.
- Token tables are read from the token file at build time.
- Titles and descriptions live in one metadata file that feeds the sidebar, the
  catalog, the registry and `llms.txt`.
- Every part marker in the source appears in the data attributes table; the
  reviewer checks this.

### Agent-readable docs

- `llms.txt` at the site root: a title, a one-paragraph summary, how to install,
  then every component as `- [Title](docs-url): description. Install: \`command\``,
  grouped by shelf.
- State that the list is complete ("anything not listed is not part of X"), so an
  agent does not search for parts that do not exist.
- Keep descriptions to one line; they are the agent's only context before it
  opens a page.
- Registry items (shadcn `registry.json`) carry the same title, description and a
  docs link.

### Contribution model

- A **request** template before building: name, shelf, the problem, prior art.
- A **PR checklist** that restates the definition of done in the same words as
  `AGENTS.md`.
- **Decision records** (`plans/NNN-name.md`, numbered, never reused): what is
  changing, why now, options, what was chosen. Kept after shipping.
- A **changelog** page in the docs site, newest first, one line per change a
  consumer would notice.
- Status labels in metadata (`new`, `beta`, `deprecated`) shown in the sidebar.

## Worked example: Fibo

Fibo's docs are Storybook 10 MDX, one page per component in
[`apps/storybook/src/components/`](https://github.com/toribryan/fibo/tree/main/apps/storybook/src/components),
with no `autodocs` tag. [`button.mdx`](https://github.com/toribryan/fibo/blob/main/apps/storybook/src/components/button.mdx)
follows the 11-section order above, using shared blocks: `<Install name="button"
exports={["Button", "buttonVariants"]} />`, `<UsageGuidelines>`,
`<ComponentRules>` for live do/don't pairs, `<ArgTypes of={Stories.Default} />`
and `<DataAttributes rows={[...]} />`. Its usage rule: "Use one default button
per view, and give every other action a quieter variant."

Metadata lives in
[`packages/ui/components.meta.json`](https://github.com/toribryan/fibo/blob/main/packages/ui/components.meta.json):

```json
"button": {
  "title": "Button",
  "description": "Triggers an action or event with a single click.",
  "tier": "base-components",
  "group": "Actions"
}
```

Its `$comment` reads: "The registry build, the Storybook catalog and llms.txt all
read this; the build fails if a component is missing."
[`build-registry.mjs`](https://github.com/toribryan/fibo/blob/main/apps/registry/scripts/build-registry.mjs)
writes `llms.txt` with the line "The lists below are complete: anything not listed
is not part of fibo."

The [Colors page](https://github.com/toribryan/fibo/blob/main/apps/storybook/src/pages/colors.mdx)
reads its tables from `globals.css` ("so they always match the code") and ends in
live do's and don'ts (`bg-red-700` vs `bg-destructive`; `bg-primary/10` vs
`bg-primary-subtle`).

The contribution model: [`CONTRIBUTING.md`](https://github.com/toribryan/fibo/blob/main/CONTRIBUTING.md)
asks for a component request first "so we can agree on the shelf and the API";
issue templates for bugs (with a Storybook link field) and component requests
(with a shelf dropdown); a PR template whose checklist restates the definition of
done; [`plans/`](https://github.com/toribryan/fibo/tree/main/plans) for decisions;
and a changelog page in Storybook. The agent kit is `AGENTS.md`,
`.agents/skills/add-component/SKILL.md` and `.claude/agents/component-reviewer.md`,
described in [`references/agent-kit.md`](references/agent-kit.md).

## Output

- The page template ([`templates/component-doc.md`](templates/component-doc.md))
  and the doc blocks
- A filled page per component in scope
- Foundations pages that read from the token source
- The metadata file, and `llms.txt` generated from it
- `AGENTS.md`, an add-component skill, a reviewer, `CONTRIBUTING.md`, request and
  PR templates, a changelog page

## Verify

**Checks that must pass**

- The project's gates. In Fibo: `pnpm format:check`, `pnpm lint`, `pnpm build`
  (which fails on a missing metadata entry), `pnpm typecheck`, `pnpm test`.
- Every component file has a docs page and a metadata entry.
- Every story a page references exists; every part marker in the source appears
  in the page's data attributes table.
- `llms.txt` lists every component and nothing else.

**By hand**

- Open each page in Storybook in light and dark: canvases render, do/don't pairs
  show the real component, props tables are filled.
- Follow the Installation and Usage sections in a fresh project: the example
  works as pasted.
- Keyboard through the docs site: sidebar, canvases and tabs are reachable.
- Give an agent only `AGENTS.md` and the add-component skill and ask it to add a
  small part. The reviewer's verdict on the result is the test of the kit.

**Delegate** each page to the `component-reviewer`
([`agents/component-reviewer.md`](../../agents/component-reviewer.md)), whose docs
check covers section order, example sentences and data attributes. It reports
failures only and ends in `ready` or `N blocking issues`. Delegate copy to the
`copy-reviewer` ([`agents/copy-reviewer.md`](../../agents/copy-reviewer.md)).

## Anti-patterns

- `autodocs` pages with a props table and nothing else
- Hand-written props tables that drift from the code
- Color tables typed into the docs, already wrong
- Guidelines like "use buttons appropriately"
- Do's and don'ts as static screenshots from an old version
- Examples with no sentence, or sentences that restate the heading
- Every page in a different order, so readers hunt for installation
- A wiki that says one thing and `AGENTS.md` that says another
- An `llms.txt` that lists some components, so agents guess the rest
- A changelog in commit messages only

## Related skills

- **Feeds from:** `component-api-design` (the spec), `design-tokens`,
  `color-system`, `typography-system`, `motion-language`, `ux-writing`
- **Leads to:** `design-handoff`, `design-to-code`
- **Checked by:** `design-system-audit`

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Storybook**: MDX docs, `ArgTypes`, doc blocks and interaction tests.
- **GitHub Primer**: component pages with status, accessibility and content rules.
- **Shopify Polaris**: usage guidelines and content rules written as checkable rules.
- **Atlassian Design**: foundations pages generated from tokens.
- **shadcn/ui**: installation-first pages and the registry format.
- **Design System Checklist**: what a complete docs site covers.

From [`FIBO.md`](../../FIBO.md):
- **Documentation structure**: the 11-section order.
- **How Fibo works with agents**: `AGENTS.md`, the add-component skill, the
  reviewer, `llms.txt` and the human mirror in `CONTRIBUTING.md`.
