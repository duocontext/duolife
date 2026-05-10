# AI Quest Generation Prompt

Use this when adding AI-generated quests.

```txt
Help me add AI quest generation to The End Game.

Goal:
The user enters a real-life goal, and the app generates 3 useful daily quests.

Constraints:
- Keep the first version simple.
- Do not overbuild agents.
- Do not add complex backend architecture unless absolutely necessary.
- The generated quests must be specific, doable today, and tied to the user's goal.
- If API keys or backend safety are involved, explain the safest simple architecture.

Before coding:
1. Explain the product risk: generic quests.
2. Explain the technical options:
   - mock generation
   - local template generation
   - API-based generation
   - backend proxy
3. Recommend the simplest option for a demo.
4. Ask me one understanding question.

Then implement the smallest safe version.

After coding:
1. Explain what changed.
2. Explain the AI boundary: where prompt/input/output lives.
3. Show the key code.
4. Give me one prompt-improvement exercise.
5. Give me a manual test checklist.
```
