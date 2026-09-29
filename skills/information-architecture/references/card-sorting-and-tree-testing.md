# Card sorting and tree testing

Card sorting tells you how people group and name things. Tree testing tells you whether
they can find things in a structure you propose. Run them in that order: sort to
generate, test to validate.

## Which method

| Method | Question it answers | When |
| --- | --- | --- |
| Open card sort | How do people group this content, and what do they call the groups? | New structure, or current one is failing |
| Closed card sort | Do people put content where our categories say? | Categories are fixed; checking fit |
| Hybrid card sort | Mostly fixed categories, but what's missing? | Refining an existing structure |
| Tree test | Can people find X in this hierarchy, text only? | Validating a proposed sitemap before visual design |
| First-click test | Is the first click on the designed screen correct? | After wireframes exist |

## Open card sort

- **Participants:** 15–30 unmoderated. Tullis and Wood (2004) found around 15 users
  gives a correlation of about 0.90 with the results of a much larger group; 20–30
  raises that to about 0.95. For moderated sorts with think-aloud, 5–8 gives
  qualitative insight but not reliable groupings.
- **Cards:** 30–60. Under 30 produces trivial groupings; over 60 causes fatigue and
  sloppy sorting. Pick representative items across the whole scope, not every page.
- **Card text:** plain descriptions of content, not current labels. "See how much you
  were charged last month", not "Billing history". Avoid repeating a word across cards
  that would group them by keyword.
- **Instructions:** "Group these in a way that makes sense to you, then name each group."
  Allow an "I don't know what this is" pile.
- **Analysis:**
  - **Similarity matrix:** % of participants who put each pair together. Pairs above
    60–70% belong together; below 30% should be apart.
  - **Dendrogram:** hierarchical clustering; cut it where groups of 4–7 appear.
  - **Group names:** tally the words people used. Their most common name is the first
    candidate label.
  - Look for cards with no consistent home. They are either ambiguous or belong in more
    than one place (needs a cross-link).

## Closed and hybrid sorts

- Same participant counts as open.
- Report placement agreement per card: the % of people who put it in the intended
  category. Under 60% means the card or the category is unclear.

## Tree test

- **Participants:** 50+ per round (standard guidance from Optimal Workshop and others),
  because results are read as percentages per task.
- **Tree:** the proposed hierarchy as text only, no visual design, full depth.
- **Tasks:** 8–10 per participant, randomized order. Write each as a goal in the user's
  words, never using a label from the tree. Bad: "Find billing settings." Good: "You
  were charged twice this month. Where would you go to check?"
- **Metrics per task:**
  - **Success:** ended at a correct node. Aim 80%+ on critical tasks; under 60% is a
    failure.
  - **Directness:** reached the answer without backtracking. Low directness with high
    success means a misleading label on the way.
  - **First click:** where people went first. A wrong first click predicts failure
    more than any other measure.
  - **Time:** median, not mean.
- **Iterate:** change the tree, re-test with new participants. Two rounds are typical.
  Also test the current tree first as a baseline when redesigning.

## Reporting

| Task | Target node | Success | Directness | Top wrong first click | Change made |
| --- | --- | --- | --- | --- | --- |
| {task} | {path} | {%} | {%} | {node, %} | {rename / move / cross-link} |

## Pitfalls

- Card sorting the current labels, which only tests familiarity
- Treating card sort output as the sitemap. It shows mental models; the sitemap also has
  to handle business, technical, and growth needs.
- Tree tests with tasks that give away the answer
- Recruiting only internal staff, who know where everything is
- Changing several things between tree-test rounds and not knowing which change helped
