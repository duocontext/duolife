# Strict Code Review Prompt

Use this after Codex builds something.

```txt
Review the current code changes like a strict senior engineer.

Look for:
1. Bugs
2. TypeScript issues
3. Bad naming
4. Unnecessary complexity
5. UI problems
6. State management mistakes
7. Future scaling issues
8. Product-scope creep
9. Places where I would misunderstand the code later
10. Places where the implementation violates the core loop

Then:
1. Explain the top 3 issues in plain English.
2. Propose the smallest fixes.
3. Apply only the important fixes.
4. After fixing, explain what changed and why.

Do not refactor everything.
Do not make the code “enterprise.”
Keep it shippable.
```
