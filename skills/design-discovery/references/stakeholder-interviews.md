# Stakeholder interviews

Stakeholder interviews find out what each person believes, wants, and fears about the
project before those beliefs harden into requirements. They are not user research:
stakeholders tell you about the organization, not about users' behavior.

## Who to talk to

Aim for 4–8 people across these roles. Missing a role is a common reason a project is
blocked late.

| Role | Why they matter | What they usually know |
| --- | --- | --- |
| Requester | Owns the original ask | The trigger and the assumed solution |
| Decision-maker | Approves scope and ships | What "success" means for them this quarter |
| Engineering lead | Builds it | Feasibility, tech debt, hidden costs |
| Support or success | Hears complaints | Frequency and wording of real problems |
| Sales or account management | Hears objections | Which gaps lose deals, and for whom |
| Data or analytics | Owns the numbers | Whether the metric everyone quotes is trustworthy |
| Legal, security, compliance | Can veto late | Constraints nobody else remembers |

## Format

- 30 minutes, one person at a time. Group sessions produce the most senior person's
  view, repeated.
- Same core questions for everyone, so answers can go in one comparison table.
- Record or take verbatim notes. Paraphrase loses the disagreements.
- Say at the start: "I'll share a summary with everyone I talk to, without attributing
  quotes." People are more candid when they know how the notes will be used.

## Core questions

Ask all of these, in roughly this order.

1. In your words, what is this project?
2. What happens if we do nothing for six months?
3. Who is it for? Describe one specific person or customer.
4. What would make you say, three months after launch, that it worked? What number?
5. What would make you say it failed?
6. What do you think the biggest risk is?
7. What has been tried before, and what happened?
8. What constraints should I know about (dates, systems, contracts, regulation)?
9. Who else should I talk to?
10. What question should I have asked that I didn't?

## Role-specific follow-ups

- **Decision-maker:** "If we could only do half of this, which half?"
- **Engineering:** "Which part of this is harder than it looks? Which part is easier?"
- **Support:** "How often does this come up? Can you show me three recent tickets?"
- **Sales:** "Name a deal this cost us. What did the buyer say exactly?"
- **Data:** "How is that metric defined? Where does it come from? When did it last change?"

## Comparison table

After the interviews, fill one row per person.

| Person | Role | Problem in their words | Who it's for | Success measure | Biggest risk | Constraints |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

Read down each column. Where answers differ, you have an alignment gap. Write it as a
question with an owner: "Is this for new admins or for existing power users? (Owner:
{decision-maker}, by {date})".

## Pitfalls

- Treating the most senior answer as the answer
- Asking "what features do you want?", which produces a backlog, not a problem
- Skipping support and data, who hold the evidence everyone else is guessing at
- Letting the interview turn into a design review of an idea someone already has
