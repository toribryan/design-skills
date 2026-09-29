# Screen-state matrix: {Product or area}

**Owner:** {name} · **Updated:** {date}

One row per key screen. In each cell, write what the screen shows and the one primary
action, or "n/a: {reason}". Blank cells are open questions, not defaults.

| Screen | Ideal | Empty, first use | Empty, no results | Loading | Partial | Error | Success | Permission | Offline | Overflow |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| {Projects list} | {Grid of projects, sorted by recent} | {"Projects hold your team's work." + Create project} | {"No projects match 'q'." + Clear filters} | {Skeleton: 6 cards, after 300ms} | {Projects loaded, counts failed: "—" + retry} | {"Couldn't load projects. Your work is safe." + Retry} | {Toast after create: "Project created" + Open} | {n/a: all members can view} | {Cached list, read-only banner} | {Name truncates at 1 line with tooltip; 500+ projects paginate at 50} |
| {Project detail} | | | | | | | | | | |
| {Invite member} | | | | | | | | | | |

## Loading rules for this product

| Expected wait | Show |
| --- | --- |
| < 300ms | Nothing |
| 300ms – 1s | Subtle inline indicator, no layout shift |
| 1 – 10s | Skeleton that matches the final layout |
| > 10s | Progress with estimate or steps, and a way to leave and be notified |

## Copy owners

| State | Copy drafted by | Reviewed by `copy-reviewer` |
| --- | --- | --- |
| Empty states | | |
| Errors | | |
| Permission | | |

## Open questions

- {Screen / state}: {question} → {owner}
