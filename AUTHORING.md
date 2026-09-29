# Authoring a skill or reviewer

Every skill in this collection follows the same shape, so Claude (and people) can
move between them without relearning the format. The shape is taken from the agent
setup in [Fibo](FIBO.md#how-fibo-works-with-agents): procedural steps that point at
models, a definition of done, and read-only reviewers that do the checking.

## Folder layout

```
skills/<skill-name>/
  SKILL.md              required, under ~300 lines
  references/           optional, long material loaded only when needed
  templates/            optional, fill-in-the-blank deliverables
agents/<reviewer>.md    read-only reviewer subagents
```

`SKILL.md` stays lean. Put long tables, deep dives, and templates in `references/`
or `templates/` and link them with a relative path, saying when to read them
("Read `references/easing.md` before choosing curves").

## Skill frontmatter

```yaml
---
name: motion-language
description: >-
  One or two sentences on what the skill produces, then when to use it, with the
  words a person would actually type ("easing", "animation feels off",
  "motion tokens"). Say what it is not for when a neighbor skill is closer.
---
```

The `description` is the only part Claude sees before deciding to load the skill,
so it carries the trigger phrases. Third person, under ~600 characters.

## Skill body, in order

1. **Title and one-paragraph purpose.** What the skill produces and the standard it holds.
2. **When to use.** Bullet triggers, plus "Not for" pointing at the neighbor skill.
3. **Inputs.** What to gather first, with a default for each so missing input never
   stalls the work. Ask the person only for things that change the outcome.
4. **Process.** Numbered steps in the order the work happens. Each step names its
   output and, where one exists, **a model to copy**: a template in this skill, a
   reference file, or a real file (often in Fibo) that already does it well. Write
   "Model: `templates/brief.md`. Copy that shape." Describing an output from scratch
   is the fallback, not the default.
5. **Standards.** The rules with real numbers: durations, ratios, sizes, counts.
   A standard nobody can check is not a standard.
6. **Output.** The exact deliverable shape, or a link to the template.
7. **Verify.** The definition of done. Concrete checks that must pass and the things
   to look at by hand ("in light and dark, by keyboard, with reduced motion on").
   Name the reviewer subagent to delegate to, if one fits.
8. **Anti-patterns.** What bad work in this area looks like, specifically.
9. **Related skills.** What feeds this skill and where the work goes next.
10. **References.** Entries from [`REFERENCE-BANK.md`](REFERENCE-BANK.md) and
    [`FIBO.md`](FIBO.md) that fit, with one line on what to look for in each.

## Reviewer subagents

Reviewers live in `agents/` and follow Fibo's `component-reviewer`:

```yaml
---
name: accessibility-auditor
description: What it reviews and when to use it. Read-only.
tools: Read, Grep, Glob
---
```

- **Read-only.** "You never edit files; you report." Add browser or Figma tools only
  when the reviewer has to look at rendered output, never write tools.
- **Say what to read first**, as a list of paths or inputs.
- **A numbered checklist** of things that can fail.
- **Report only failures**, each with a location (file and line, screen, frame, or
  breakpoint) and a severity.
- **End with a one-line verdict:** `ready`, or the number of blocking issues.

Skills hand work to reviewers in their Verify section: "Delegate to the
`accessibility-auditor` subagent."

## Voice

- Direct and specific. "Use 150–250ms for UI transitions", not "keep animations snappy".
- Opinionated where the field agrees, honest where it doesn't ("teams split on this;
  pick one and document it").
- Sentence case for headings. No filler, no hype words, no emoji.
- Write for someone skilled who is new to this particular problem.

## Tool awareness

Use tools when they are connected and degrade gracefully when they are not:

- **Figma MCP** for reading frames, variables, and components, and for writing designs.
- **Mobbin MCP** for real-world screens and flows during reference research.
- **shadcn MCP** for browsing and installing registry parts (including `@fibo`).
- **The browser (Playwright)** for screenshots, visual QA, and measuring live sites.
- **The codebase** for existing tokens, components, and conventions. Read before
  inventing. If the project has an `AGENTS.md`, it wins over these skills.

If a tool is missing, say so in one line and continue with what is available.
