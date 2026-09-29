# Nielsen's 10 usability heuristics: what to look for

Jakob Nielsen's heuristics (1994, wording refreshed by NN/g in 2020). Tag issues
H1–H10. For each, check the questions and scan for the common violations.

## H1. Visibility of system status

The design keeps people informed about what is going on, through timely feedback.

- Does every action produce feedback within ~100ms (press state), and a progress
  indicator if it takes over ~1s?
- Is the current location clear (active nav item, page title, breadcrumb, step count)?
- Are saved / unsaved / syncing states visible?

Common violations: a button that does nothing visible until the request returns;
multi-step forms with no "Step 2 of 4"; autosave with no indication it happened.

## H2. Match between the system and the real world

The design speaks the person's language and follows real-world conventions.

- Are labels in the person's words, not internal or database terms?
- Do icons and metaphors mean what people expect?
- Is information in a natural order (e.g. address fields in local order)?

Common violations: "Entity", "Instance", "Null"; error codes shown as messages;
dates in a format the audience does not use.

## H3. User control and freedom

People need a clearly marked exit and a way to undo.

- Can every dialog, flow, and destructive action be cancelled or undone?
- Is back navigation preserved (browser back works, state survives)?

Common violations: modals with no close control or no Escape; wizards that lose
input on Back; delete with no undo and no confirmation.

## H4. Consistency and standards

The same words, situations, and actions mean the same thing, internal and external.

- Internal: same component, same behavior, same label for the same action everywhere?
- External: platform conventions (links look like links, the logo goes home, Cmd/Ctrl+K
  opens search if the product has a command menu)?

Common violations: "Remove", "Delete", and "Archive" used for the same action; primary
button on the left in one dialog and right in another; custom scrollbars or selects
that break platform expectations.

## H5. Error prevention

Better than good error messages is a design that prevents the problem.

- Are constraints enforced before submit (date pickers, input masks, disabled
  impossible options with a reason)?
- Are high-cost actions confirmed or made reversible?
- Are defaults safe?

Common violations: free-text fields for structured data; "Delete all" next to "Save";
no warning before leaving a page with unsaved changes.

## H6. Recognition rather than recall

Minimize memory load by making elements, actions, and options visible.

- Does the person need to remember information from one screen to use on another?
- Are recent items, suggestions, and previews available?

Common violations: IDs that must be copied between screens; icon-only toolbars with no
labels or tooltips; applied filters that are not shown.

## H7. Flexibility and efficiency of use

Shortcuts, hidden from novices, speed up experts.

- Keyboard shortcuts, bulk actions, saved views, sensible defaults?
- Can frequent tasks be done in fewer steps by people who do them daily?

Common violations: no bulk select in a table people manage daily; every setting
reached through three levels of menus.

## H8. Aesthetic and minimalist design

Interfaces should not contain information that is irrelevant or rarely needed.

- Does every element on the screen support the primary task or a common secondary one?
- Is there a clear visual hierarchy?

Common violations: dashboards with 12 equal-weight cards; marketing banners inside
task flows; help text that repeats the label.

## H9. Help users recognize, diagnose, and recover from errors

Error messages in plain language, stating the problem and a solution.

- Does the message say what happened, why, and how to fix it?
- Is it placed next to the problem, and is input preserved?

Common violations: "Something went wrong"; "Invalid input" with no rule; clearing the
whole form after one invalid field.

## H10. Help and documentation

Best if no documentation is needed, but help should be easy to find and task-focused.

- Is contextual help available where people get stuck (inline hints, empty states
  that teach)?
- Is help searchable and written as steps?

Common violations: a help link that opens a generic docs home page; empty states that
say only "No data".

## Beyond the ten

Log these under their own tags; the heuristics do not cover them well.

- **Hierarchy:** first read is wrong; more than one primary action; everything equal.
- **Clarity:** ambiguous labels, unlabeled icons, unclear state (is this toggle on?).
- **Consistency:** drift from the design system (off-scale spacing, one-off colors).
- **Craft:** misalignment, truncation, missing hover/focus/disabled states, contrast
  below 4.5:1, layout breaks at 390px or 200% zoom.
