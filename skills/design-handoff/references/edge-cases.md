# Edge-case hunt

Walk every frame in the handoff through these questions. Each one either has an
answer in the package, a stated default, or "not applicable" with a reason. A blank
is a question the engineer will have to answer alone.

## Quantity

- **Zero, first use.** What does a new account see? What is the one action that
  fills it?
- **Zero, filtered.** Search or filters return nothing. Different copy from first
  use, and a way to clear filters.
- **One.** Does a list of one still look like a list? Does a grid of one stretch?
- **Many.** At what count does it paginate, virtualize, or "load more"? What is the
  realistic maximum (check production data if it exists)?
- **Selection of many.** Bulk actions with 1, 10, and "all 4,000" selected.

## Content length

- **Long names.** 60+ characters, no spaces (URLs, emails, German compounds).
- **Long titles.** Three lines or more. Truncate, clamp, or wrap?
- **Large numbers.** 1,000,000 and 12-digit values. Abbreviate (1.2M) or not?
- **Translation.** About 30% longer than English for most European languages;
  up to 2–3x for short labels. Which labels break first?
- **Right-to-left.** If supported, which icons mirror (arrows) and which do not
  (play, checkmarks)?
- **Missing content.** No avatar, no image, no description, no date. Each needs a
  fallback.

## Time and network

- **Loading.** Under 300ms: nothing. 300ms–2s: skeleton matching layout. Longer:
  progress or message.
- **Slow.** What if the request takes 10 seconds? Can the person cancel?
- **Offline.** Read-only, queued, or blocked? What does the message say?
- **Stale data.** Another person changed it. Refresh silently, notify, or conflict?
- **Timeouts and sessions.** Session expires mid-form. Is input preserved?

## Errors

- **Validation.** When does it run (blur, submit)? Where does the message sit? Is
  input kept?
- **Server error.** Whole-view vs. single-component failure.
- **Partial success.** 8 of 10 items imported. What is shown, and how are the 2 fixed?
- **Destructive action.** Confirm or undo? For how long is undo available?
- **Rate limits and quotas.** What happens at the limit, and before it (warning)?

## People and permissions

- **Roles.** What does a viewer see vs. an editor vs. an admin? Hidden or disabled
  with a reason?
- **Plan limits.** Free vs. paid. Where does the upgrade prompt appear, and where
  does it not?
- **Multiple people.** Presence, concurrent edits, "edited by" attribution.
- **Deleted or deactivated users.** How are their items and mentions shown?

## Input and device

- **Keyboard only.** Every action reachable; shortcuts shown where they exist.
- **Touch.** No hover-only actions; targets ≥ 44px.
- **Screen reader.** What is announced after an async action?
- **Zoom 200% and large text settings.** Does anything clip?
- **Reduced motion.** What each animation becomes.
- **Dark mode.** Images, illustrations, and charts in both themes.
- **Small screens.** 320px wide; landscape phone at ~390px tall.

## Lifecycle

- **First run vs. returning.** Onboarding hints appear once; where are they
  dismissed and can they come back?
- **Draft and unsaved changes.** Navigating away warns? Autosave?
- **Deep links.** Opening the screen directly by URL, with and without access.
- **Back button.** Restores scroll, filters, and open panels?
- **Undo after navigation.** Does the toast survive a route change?

## Output shape

Record each answer in the handoff's edge-case table:

| Case | Behavior | Frame |
| --- | --- | --- |
| Zero, filtered | "No projects match these filters" + Clear filters button | [frame] |
| Long names | Truncate at 1 line with ellipsis; full name in tooltip and detail view | — |
