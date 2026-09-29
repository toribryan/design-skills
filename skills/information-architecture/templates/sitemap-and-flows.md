# Information architecture: {Product or area}

**Owner:** {name} · **Brief:** {link to NNN brief} · **Updated:** {date}

## Content inventory

| ID | Page / screen / content type | Current location | Owner | Traffic (30d) | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | {Invoices list} | /billing/invoices | {team} | {n} | Keep | |
| C2 | {Payment methods} | /settings/payment | | | Merge into C1's area | |
| C3 | {Usage report} | — | | — | New | |

## Object map

| Object | Attributes (key) | Relationships | Actions |
| --- | --- | --- | --- |
| {Project} | name, owner, status, due date | has many Tasks; belongs to Workspace | create, rename, archive, share |

## Glossary

| Name (use this) | Do not use | Definition |
| --- | --- | --- |
| {Workspace} | Team, Organization, Org | {The billing and membership boundary} |

## Sitemap

```mermaid
flowchart TD
  Home[Home] --> Projects[Projects]
  Home --> Inbox[Inbox]
  Home --> Settings[Settings]
  Projects --> ProjectDetail[Project]
  ProjectDetail --> Overview[Overview tab]
  ProjectDetail --> Tasks[Tasks tab]
  ProjectDetail --> ProjectSettings[Project settings]
  Settings --> Profile[Profile]
  Settings --> Members[Members]
  Settings --> Billing[Billing]
  Billing --> Invoices[Invoices]
  Tasks -. cross-link .-> Inbox
```

## Navigation

| Layer | Pattern | Items (in order) | Count |
| --- | --- | --- | --- |
| Global | {Sidebar} | {Home, Projects, Inbox, Settings} | {4} |
| Local | {Tabs on Project} | {Overview, Tasks, Settings} | {3} |
| Contextual | {Links in content} | {Task → related Project} | — |
| Utility | {Top-right} | {Search, Help, Account} | {3} |
| Command menu | {⌘K} | {All destinations + top actions} | — |

## Flows

### Flow: {Primary job, e.g. Invite a teammate}

**Entry:** {where people start} · **Outcome:** {what done looks like}

```mermaid
flowchart TD
  A[Members page] --> B[Click Invite]
  B --> C{Has invite permission?}
  C -- No --> P[Permission state: ask an admin]
  C -- Yes --> D[Enter email and role]
  D --> E{Valid email?}
  E -- No --> D1[Inline error, keep input] --> D
  E -- Yes --> F{Already a member?}
  F -- Yes --> F1[Show existing member, offer to change role]
  F -- No --> G{Seats available?}
  G -- No --> G1[Upgrade prompt or request seats]
  G -- Yes --> H[Send invite]
  H --> I{Request succeeded?}
  I -- No --> I1[Error: nothing sent, retry] --> H
  I -- Yes --> J[Success: pending invite in list]
  J -.-> K([System: email sent, expires in 7 days])
```

**Edge cases covered:** {permission, validation, duplicate, limits, server error}
**Edge cases n/a:** {offline: web-only admin page, requires connection}

### Flow: {next job}

…

## Test results

| Method | Participants | Date | Key finding | Change made |
| --- | --- | --- | --- | --- |
| Open card sort | {n} | | | |
| Tree test round 1 | {n} | | | |
