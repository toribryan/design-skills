# design-skills

A collection of 32 Claude skills and 7 reviewer subagents for end-to-end
product design: discovery, definition, design, validation, design systems, craft,
motion, brand, and shipping. The reference bank follows designeer.xyz; the house
design system is Fibo. This file follows the layout of Fibo's `AGENTS.md`.

## Layout

| Path | Holds |
| --- | --- |
| `skills/<name>/SKILL.md` | One skill each. `references/` and `templates/` beside it when needed |
| `skills/product-design-process/` | The router: phase map, reviewers, project log |
| `agents/<name>.md` | Read-only reviewer subagents |
| `REFERENCE-BANK.md` | Curated sources, organized like designeer.xyz |
| `FIBO.md` | The house design system and its agent setup |
| `AUTHORING.md` | The skill and reviewer format. Read before writing either |

## Using the collection

- Start with `product-design-process` when work spans phases. It routes.
- Load a single skill directly for a bounded task.
- Run the reviewer a skill names in its Verify section before calling work done.
- A project's own `AGENTS.md` or `CLAUDE.md` wins over any skill here. Skills
  describe defaults; projects decide.

## Definition of done for a change to this repo

- The skill follows `AUTHORING.md`: frontmatter with trigger phrases and a "Not
  for" pointer, the body sections in order, and a Verify section.
- Every relative link resolves. Check with:
  `grep -rhoE '\]\((\.\./|\./)?[a-zA-Z0-9_./-]+\.md[^)]*\)' skills agents *.md`
  and open each target.
- Cross-links use skill and reviewer names that exist in `skills/` and `agents/`.
- Each new skill appears in the README table and in the phase map in
  `skills/product-design-process/SKILL.md`.
- Facts about Fibo are checked against the Fibo repo, not remembered.

## Conventions

- **Skill names** are kebab-case nouns or noun phrases (`color-system`,
  `design-handoff`). The folder name equals `name` in the frontmatter.
- **Reviewers** are read-only: `tools: Read, Grep, Glob`, plus `Bash` only for
  read-only commands or screenshots. They report failures only and end in a
  one-line verdict: `ready`, or `N blocking issues`.
- **Numbers over adjectives.** A standard states its value.
- **Models over descriptions.** Process steps point at a template, reference file,
  or real file and say "copy that shape".
- **Writing.** Sentence case headings. No emoji, no hype words.

## Do not

- Add a skill that duplicates a neighbor. Extend the neighbor or sharpen both
  descriptions so they do not trigger on the same request.
- Give a reviewer write tools.
- Impose Fibo's token or component names on a project that has its own.
