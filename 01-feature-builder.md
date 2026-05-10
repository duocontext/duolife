# Feature Builder Prompt

Use this when you want Codex to build a specific feature while teaching you.

```txt
We are building The End Game in Expo/React Native/TypeScript.

Feature:
[DESCRIBE THE FEATURE]

I want you to help me ship this fast while teaching me enough to understand the codebase long-term.

Before coding:
1. Explain what this feature does in product terms.
2. Explain the React Native concepts involved.
3. Give me the smallest implementation plan.
4. List files you will create/edit.
5. Ask me one understanding question.

Then implement the smallest working version.

After coding:
1. Summarize the diff.
2. Explain the most important concept.
3. Show the key code snippet.
4. Give me one small exercise to modify it myself.
5. Give me a manual test checklist.

Constraints:
- Keep it simple.
- Avoid unnecessary abstractions.
- Do not add a backend unless truly needed.
- Protect the core loop: goal → quests → completion → XP/streak.
```

## Example

```txt
Feature:
Add a daily quests screen where the user sees 3 quests, can tap complete, and gains XP.

Use local state first. Do not add a backend. Keep UI clean and shippable.
```
