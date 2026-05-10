# MVP Demo Build Prompt

Use this when starting or rebuilding the first demo.

```txt
We are building the first shippable demo of The End Game.

Goal:
A 90-second Expo/React Native demo where a user enters a goal, gets 3 daily quests, completes them, and sees XP/streak progress.

Stack:
Expo + React Native + TypeScript.

Constraints:
- No backend.
- No auth.
- Use local mock data or AsyncStorage only if needed.
- Beautiful enough to record a demo.
- Keep architecture simple.
- Prioritize shipping over perfection.

Screens:
1. Welcome screen
2. Goal onboarding screen
3. Daily quests screen
4. Quest completion feedback
5. Progress/profile screen with XP and streak

Before coding:
1. Explain the architecture simply.
2. Explain the React Native concepts involved.
3. List the files you will touch.
4. Ask me one understanding question.

Then build the smallest working version step-by-step.

After coding:
1. Explain the diff.
2. Show me the key code.
3. Give me one small task to modify myself.
4. Give me a 90-second demo script I can post.
5. Give me a manual test checklist.
```
