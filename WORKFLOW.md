# Workflow Comparison: Vague Prompt vs. Precise Prompt

## The Task

I built the same feature — a settings form with validation (name, email, password fields) — twice, using two different prompting approaches, to see how much the prompt itself affects the quality of AI-generated code.

## Round 1: Vague Prompt

**Prompt used:** "Create a form with validation"

This produced a form that technically worked, but was weak in almost every way that matters for real use:

- **Correctness:** Only checked whether fields were empty. The email field was `type="text"`, so it accepted any string — `"asdf"` would pass as a valid email. Password had no length or content rules at all.
- **Accessibility:** No `<label>` elements were linked to inputs (just `placeholder` text, which disappears once you start typing and isn't reliably read by screen readers). A screen reader user would have no idea what each field was for.
- **Edge cases:** None were handled. Typing a single space (`" "`) into a field passed as "not empty." There was no feedback per field — just one generic message ("Please fill all fields") shown after submission.
- **Review effort:** High. Before this could ship, I'd need to rewrite the entire validation logic, add real labels, and completely redo the feedback system. Essentially none of the logic was reusable as-is.

## Round 2: Precise Prompt

**Prompt used:** Referenced the actual CLAUDE.md conventions (HTML/CSS/vanilla JS, small functions), specified exact validation rules per field (name ≥2 characters, valid email format, password ≥8 characters with a number), asked for accessible markup, live per-field error messages, a disabled submit button until valid, and — critically — a separate test file verifying the validation logic.

- **Correctness:** Real regex-based email validation, password rules that actually check length and digit presence, and a `validateName`/`validateEmail`/`validatePassword` set of small, isolated functions instead of one big inline check.
- **Accessibility:** Every input has a linked `<label>`, plus `aria-describedby` connecting each field to its own error message region.
- **Edge cases:** Handled live — errors clear as soon as a field becomes valid, and the submit button stays disabled until every field passes, preventing a broken submission entirely rather than just complaining after the fact.
- **Review effort:** Low. I ran the included `test.js` file directly (`node test.js`) and got **7 passed, 0 failed** on real pass/fail cases per field, including two independent failure conditions for the password (too short, and long-but-no-digit). That gave me actual, verifiable proof the logic worked, rather than trusting a description of it.

## Takeaway

The single biggest gap wasn't a "nice to have" like styling — it was that Round 1 had zero real validation logic behind its promise of "validation," while Round 2 had testable, verified logic behind every claim. Being specific about constraints and asking for tests didn't just make the code look better; it caught real bugs I would have shipped unknowingly in Round 1 (like the fake email validation).
