# Project Conventions

## Stack

- HTML, CSS, and vanilla JavaScript (no frameworks or build tools)

## Conventions

- Use Conventional Commits for all commit messages
- Keep functions small and readable
- Write clear variable names

   
## Rules Learned from AI-Assisted Development

- Always specify exact validation rules (field-by-field) instead of just saying "add validation" — vague requests produce fake validation that looks right but doesn't actually check anything real (e.g. accepting any text as an "email").
- Always ask the AI to write and run tests for logic-heavy code (like form validation) before trusting it — this catches real bugs immediately instead of discovering them later.
- Always require accessible markup explicitly (linked `<label>` elements, ARIA attributes) — AI defaults to placeholder-only inputs unless told otherwise, which breaks accessibility.
