# Persistence / AsyncStorage Prompt

Use this when you want data to survive app refreshes.

```txt
Add simple local persistence to The End Game using AsyncStorage.

Data to persist:
[GOAL / QUESTS / XP / STREAK / COMPLETED QUESTS]

Constraints:
- Keep it simple.
- No backend.
- No auth.
- Use clear TypeScript types.
- Handle loading state.
- Handle missing or corrupted stored data safely.
- Label any shortcuts as technical debt.

Before coding:
1. Explain what AsyncStorage does using our app.
2. Explain what data should and should not be persisted.
3. Show the smallest implementation plan.
4. Ask me one understanding question.

After coding:
1. Explain the diff.
2. Show the key persistence code.
3. Explain serialization/deserialization simply.
4. Give me one small persistence task to implement myself.
5. Give me a manual test checklist.
```
