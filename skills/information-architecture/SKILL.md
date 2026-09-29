---
name: information-architecture
description: >-
  Structures what a product contains and how people move through it: content
  inventory, object model, sitemap, navigation model, labels validated by card sorting
  and tree testing, user flows with edge cases in Mermaid, and a screen-state
  inventory (empty, loading, partial, error, success, permission, offline). Use for
  "sitemap", "navigation", "IA", "user flow", "card sort", "where should this live",
  or "what states does this screen need". Not for drawing screen layouts (use
  wireframing).
---

# Information Architecture

Information architecture decides what exists, what it is called, where it lives, and
how people get from one place to another. Most "this screen is confusing" problems
start here: an object with two names, a feature in the wrong section, a flow that
only works when nothing goes wrong. The output is a sitemap, a navigation model with
tested labels, flow diagrams that include the unhappy paths, and a state matrix that
lists every state every key screen can be in.

## When to use

- A new product or a major section, before wireframing
- People cannot find things, or support tickets ask "where is X?"
- Navigation has grown by accretion and nobody can say why items sit where they do
- Adding a feature and unsure where it belongs
- A flow is being designed and only the happy path has been drawn

**Not for:** laying out a single screen (use `wireframing`, then `layout-and-hierarchy`),
writing the final microcopy (use `ux-writing`, though labels decided here feed it), or
evaluating a built interface with users (use `usability-testing`).

## Inputs

Gather these. If one is missing, use the default in brackets.

- **The brief**: audience, primary jobs, scope [from `design-brief`; if none, list the
  top 5 tasks and state them as assumptions]
- **Existing structure**: current sitemap, routes, nav config [read the router and nav
  components in the codebase; crawl the live site if no code access]
- **Content and data**: objects, fields, and relationships [read the schema, API types,
  or CMS models; ask only if none exist]
- **Users' vocabulary**: the words people use [from `user-research` synthesis, support
  tickets, and search logs]
- **Analytics**: top pages, search queries, dead ends [if connected; skip and say so]
- **Platform**: web app, marketing site, mobile [web app]

## Process

1. **Inventory the content.** List every page, screen, or content type that exists or
   is planned, with its owner, traffic if known, and status (keep, merge, cut, new).
   Model: the inventory table in [`templates/sitemap-and-flows.md`](templates/sitemap-and-flows.md);
   copy that shape. Output: a content inventory.
2. **Model the objects.** Name the core objects (Project, Invoice, Member), their
   attributes, relationships, and the actions on each. This is object-oriented UX's
   ORCA process (Sophia Prater): Objects, Relationships, Calls to action, Attributes.
   Output: an object map, one row per object.
3. **Choose organization schemes.** For each area, decide how content is grouped: by
   object, task, audience, time, or alphabet (after Rosenfeld, Morville and Arango's
   organization systems). Mix at most two schemes at one level. Output: a scheme per
   area, with the reason.
4. **Draft the sitemap.** A hierarchy of places, with depth and cross-links. Draw it in
   Mermaid so it lives in version control. Model: the sitemap block in the template;
   copy that shape. Output: a sitemap diagram.
5. **Pick the navigation model.** Global, local, contextual, and utility navigation,
   each with its items and pattern (sidebar, top bar, tabs, hub-and-spoke, command
   menu). Output: a navigation spec with item counts.
6. **Test the labels and structure.** Open card sort to learn how people group content
   when the structure is new; tree test to check whether people can find things in a
   proposed structure. Read
   [`references/card-sorting-and-tree-testing.md`](references/card-sorting-and-tree-testing.md)
   before setting either up. Output: results and the changes they caused.
7. **Map the flows.** For each primary job, a flow from entry to outcome, then add the
   edge cases: validation errors, permission denied, empty data, network loss, abandon
   and resume, undo. Model: the flow block in the template; copy that shape. Output:
   one Mermaid flowchart per job.
8. **Build the state matrix.** For every key screen, specify each state in the table
   below. Model: [`templates/state-matrix.md`](templates/state-matrix.md); copy that
   shape. Output: a filled matrix, with gaps marked as open questions.

## Standards

### Structure

- **Depth.** Keep any destination within 3 levels (clicks or taps) of the top for a
  product, 4 for a large content site. Depth beyond that needs search or strong
  cross-links.
- **Breadth.** Global navigation holds 4–7 primary items. More than 7 items at one
  level stops being scannable; group them. Fewer than 3 usually means a level can be
  removed.
- **One home per object.** Every object has one canonical location. Shortcuts and
  cross-links are fine; duplicate pages are not.
- **One name per object.** The same thing is called the same thing in nav, headings,
  buttons, URLs, emails, and code. Write the name down in a glossary.
- **Labels.** Nouns for places ("Invoices"), verbs for actions ("Create invoice").
  Use users' words from research over internal names. Avoid "Resources", "Solutions",
  "Tools", and "More", which tell people nothing.
- **URLs mirror the structure.** `/projects/:id/settings`, not `/page?id=42&view=3`.

### Navigation model

| Need | Pattern | Good for |
| --- | --- | --- |
| Many sections, frequent switching | Persistent sidebar | Productivity apps, 5–12 sections |
| Few top-level sections | Top bar or bottom tab bar (mobile: 3–5 tabs) | Consumer apps, marketing sites |
| Peer views of one object | Tabs | Detail pages with 2–6 views |
| Linear task | Stepper, no global nav | Checkout, setup, 3–7 steps |
| Power users, many destinations | Command menu (in addition, never instead) | Tools with 20+ destinations |
| Deep content | Breadcrumbs plus local nav | Docs, catalogs, 3+ levels |

### Testing numbers

- **Open card sort:** 15–30 participants. Tullis and Wood (2004) found about 15 gives a
  0.90 correlation with a much larger sample; 20–30 gets to roughly 0.95. 30–60 cards.
- **Tree test:** 50+ participants per round, 8–10 tasks each, tasks written in users'
  words without using any label from the tree.
- **Success thresholds (working defaults):** 80%+ success on critical tasks; below 60%
  means the structure fails for that task. Also read directness: a correct answer after
  wandering means the label misled.

### Flows

- Every flow has one entry, one or more outcomes, and every decision diamond has an
  exit for each answer.
- Draw the unhappy paths: invalid input, server error, permission denied, empty data,
  offline, timeout, duplicate, cancel midway, return later.
- Mark where the system does something without the person (email sent, job queued).
- Every destructive action has an undo or a confirmation, and the flow shows which.

### Screen states

Every key screen has an explicit design for each state (after Scott Hurff's "UI stack":
ideal, empty, error, partial, loading; extended here with success, permission, and
offline).

| State | When | Must include |
| --- | --- | --- |
| **Empty, first use** | No data yet | What this place is for, and one primary action to fill it |
| **Empty, no results** | Filter or search returned nothing | The query, a way to clear or broaden it |
| **Empty, cleared** | User finished everything | Confirmation that done is done (inbox zero) |
| **Loading** | Waiting on data | Nothing under ~300ms; a skeleton matching the layout for 1–10s; a progress indicator with an estimate beyond 10s (Nielsen's 0.1s / 1s / 10s response limits) |
| **Partial** | Some data, or some parts failed | What loaded, what didn't, and a retry for the part that failed |
| **Error** | Request failed | What happened in plain words, whether data is safe, one recovery action |
| **Success** | Action completed | Confirmation near where the action happened, and the next likely step |
| **Permission** | Viewer lacks access | Why, who can grant it, and a request-access action if possible |
| **Offline** | No connection | What still works, what is queued, and when it will sync |

Also consider: ideal (typical data), overflow (the longest name, 10,000 rows), and
read-only or archived.

## Tools

- **Codebase.** Read the router, nav components, and data schema before drawing
  anything. The real structure is often different from the one in people's heads.
- **Mermaid.** Sitemaps and flows go in Mermaid code blocks so they diff in version
  control and render in GitHub and most docs tools.
- **Figma MCP.** If connected, `generate_diagram` can produce the sitemap or flows in
  FigJam from the same structure. If not, Mermaid alone is enough; say so in one line.
- **Card sorting and tree testing tools.** Optimal Workshop (OptimalSort, Treejack),
  Maze, or UXtweak. If none is available, run a moderated card sort with 5–8 people as
  a qualitative read and label it as such.

## Output

- A content inventory, object map, sitemap, navigation spec, and flows, using
  [`templates/sitemap-and-flows.md`](templates/sitemap-and-flows.md)
- A state matrix for every key screen, using
  [`templates/state-matrix.md`](templates/state-matrix.md)
- A glossary of object names, handed to `ux-writing`

## Verify

The IA is done when all of these are true:

- [ ] Every item in the inventory is marked keep, merge, cut, or new, and appears in the
      sitemap (or is cut)
- [ ] Every object has one canonical location and one name, listed in the glossary
- [ ] No destination is deeper than 3 levels (4 for content sites) without search or a
      cross-link
- [ ] Global navigation has 4–7 items; mobile tab bars have 3–5
- [ ] Labels were tested: a card sort (15+ participants) or tree test (50+), or a
      moderated qualitative round labeled as such; critical tasks at 80%+ success
- [ ] Each primary job has a Mermaid flow that renders, with every unhappy path listed
      in Standards drawn or marked n/a with a reason
- [ ] The state matrix has every state filled or marked n/a for every key screen
- [ ] Routes in the sitemap match what engineering will build (checked with the eng lead)

Have the `copy-reviewer` agent check the glossary and navigation labels for
consistency, and the `design-critic` agent review the flows for missing paths before
wireframing starts.

## Anti-patterns

- A sitemap that mirrors the org chart ("Marketing", "Sales tools") instead of users' jobs
- The same object called "Workspace", "Team", and "Organization" in different places
- "More" or "Other" as a nav item holding everything that didn't fit
- Flows that only show the happy path, so error and empty states are invented in code
- Empty states that say only "No data"
- Spinners for every load, including sub-300ms ones that flash
- Error states that blame the user or show a raw error code with no recovery
- Card sorting with 5 participants and reporting the result as a quantitative finding
- Tree-test tasks that contain the answer's label ("Find the Billing settings")
- Adding a nav item for every new feature instead of finding its home

## Related skills

- **Feeds from:** `design-brief` (jobs and scope), `user-research` (vocabulary, mental
  models), `reference-research` (navigation conventions)
- **Leads to:** `wireframing` (screens built on the structure and states),
  `ux-writing` (labels, empty and error copy), `usability-testing` (findability tasks),
  `design-handoff` (state matrix as part of the spec)

## References

From [`REFERENCE-BANK.md`](../../REFERENCE-BANK.md):
- **Nielsen Norman Group**: card sorting, tree testing, navigation, and the response-time
  limits used for loading states.
- **Mobbin** and **Navbar Gallery**: real navigation models and empty, error, and
  permission states in shipped products.
- **UI Patterns**: problem/solution framing for navigation patterns.
- **Laws of UX**: Hick's Law and Miller's Law, often misapplied to nav item counts; read
  them for what they do and do not claim.
- **Design Books**: Louis Rosenfeld, Peter Morville and Jorge Arango, *Information
  Architecture for the Web and Beyond*; Abby Covert, *How to Make Sense of Any Mess*;
  Donna Spencer, *Card Sorting*.
