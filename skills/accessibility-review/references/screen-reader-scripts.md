# Screen reader quick scripts

Test with the pairings people actually use: VoiceOver with Safari on macOS and iOS,
NVDA with Chrome or Firefox on Windows, TalkBack with Chrome on Android. (JAWS with
Chrome is the other common desktop pairing; it needs a license.) One desktop and one
mobile pairing covers most issues. Record announcements verbatim.

## VoiceOver (macOS, Safari)

| Action | Keys |
| --- | --- |
| Turn on / off | Cmd+F5 (or hold Cmd and triple-press Touch ID) |
| VO modifier | Ctrl+Option (written "VO"), or Caps Lock if set |
| Read from here | VO+A |
| Next / previous item | VO+Right / VO+Left |
| Activate | VO+Space |
| Next heading | VO+Cmd+H |
| Rotor (headings, links, landmarks, form controls) | VO+U, then Left/Right to switch lists |
| Into / out of a group | VO+Shift+Down / VO+Shift+Up |
| Next focusable | Tab |
| Stop speaking | Ctrl |

Turn on the caption panel (VoiceOver Utility → Visuals) to copy announcements.

## NVDA (Windows, Chrome or Firefox)

| Action | Keys |
| --- | --- |
| Start | Ctrl+Alt+N |
| NVDA modifier | Insert (or Caps Lock in laptop layout) |
| Read all | NVDA+Down |
| Next item (browse mode) | Down |
| Headings / level 1–6 | H / 1–6 (Shift to go back) |
| Landmarks | D |
| Form fields / buttons / links / tables | F / B / K / T |
| Elements list | NVDA+F7 |
| Toggle browse / focus mode | NVDA+Space |
| Stop speaking | Ctrl |
| Quit | NVDA+Q |

Open Tools → Speech Viewer to see and copy announcements.

## VoiceOver (iOS) and TalkBack (Android)

| Action | VoiceOver iOS | TalkBack |
| --- | --- | --- |
| Turn on | Triple-click side button (set in Accessibility Shortcut) | Hold both volume keys 3s (if enabled) |
| Next / previous | Swipe right / left | Swipe right / left |
| Activate | Double-tap | Double-tap |
| Change navigation unit | Rotor: two-finger twist | Swipe up then down (reading controls) |
| Read from top | Two-finger swipe up | Menu → Read from top |

## Scripts

Run each script on every page or flow in scope. For each step, write what was
announced and whether it matches the expected announcement.

### 1. Page orientation (1 minute)

1. Load the page. **Expect:** the page title is announced and is unique and specific.
2. Open the headings list (VO rotor / NVDA+F7). **Expect:** one `h1` that names the
   page; `h2`s that outline the content; no skipped levels used for structure.
3. Open the landmarks list. **Expect:** banner, navigation (labelled if more than
   one), main, contentinfo.
4. Tab once from the top. **Expect:** a "Skip to main content" link, or landmarks
   that make it unnecessary.

### 2. Links and buttons (2 minutes)

1. Open the links list. **Expect:** every link makes sense out of context; no
   repeated "Learn more" or "Click here".
2. Tab through controls. **Expect:** each announces name, role, and state: "Save
   changes, button"; "Notifications, switch, on"; "Filters, button, collapsed".
3. Icon-only buttons. **Expect:** a name, never "button" alone or the icon's file name.

### 3. Forms (3 minutes)

1. Tab into each field. **Expect:** label, role, required state, and hint: "Email
   address, required, edit text, We'll send your receipt here".
2. Submit with errors. **Expect:** focus moves to the first invalid field or an error
   summary; the error text is announced with the field; "invalid entry" state is set.
3. Radio groups and checkboxes. **Expect:** the group label (`fieldset`/`legend`) is
   announced on entering the group.

### 4. Dynamic content (3 minutes)

1. Trigger a toast or "Saved" message. **Expect:** announced once, without focus
   moving (`role="status"`).
2. Filter a list. **Expect:** the result count is announced ("12 results").
3. Open a dialog. **Expect:** focus moves inside; name and role announced ("Delete
   project?, dialog"); background content is not reachable; Escape closes; focus
   returns to the trigger.
4. Open a menu, combobox, or tabs. **Expect:** role and state ("expanded", "1 of 4",
   "selected"); arrow keys move within; announcements follow.

### 5. Images and media (1 minute)

1. Move through images. **Expect:** meaningful images announce useful alt text;
   decorative images are skipped.
2. Charts. **Expect:** a text summary or data table is available.
3. Video. **Expect:** controls are labelled and captions can be turned on.

## Recording results

| Step | Element | Announced | Expected | WCAG | Pass |
| --- | --- | --- | --- | --- | --- |
| 3.1 | Email field | "edit text" | "Email address, required, edit text" | 1.3.1, 4.1.2 | No |

Move every "No" row into the audit as a failure.
