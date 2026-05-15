# Screen 07 - Failure Proof / Run It Back

## Product Purpose

Handle failure honestly without turning the app into shame theater.

If the user does not upload proof in time, they should explain the blocker or run it back with a smaller proof target.

## User Flow

1. Sprint timer expires without proof.
2. User lands on Mission Froze screen.
3. User chooses blocker reason.
4. User writes one sentence about what blocked them.
5. User chooses either `Freeze Streak` or `Run It Back`.
6. Freeze protects the streak for today.
7. Run It Back restarts with a smaller mission or shorter proof target.

## UI Requirements

- Header: `Mission froze`
- Explanation: `You did not ship proof in time. Upload failure proof to protect your streak, or run it back now.`
- Blocker options:
  - Scope too big
  - Got distracted
  - Technical issue
  - Did not know next step
  - Energy crash
  - Other
- Prompt: `One sentence. What blocked you?`
- Primary CTA: `Freeze Streak`
- Secondary CTA: `Run It Back`

## State Needed

- `mission`
- `selectedBlocker`
- `blockerNote`
- `frozenCount`
- `pressureMode`

## Actions

- Select blocker.
- Enter blocker note.
- Freeze streak.
- Run it back.

## Validation Rules

- User cannot freeze streak without a blocker reason.
- Failure proof freezes the streak but does not grow it.
- No proof and no failure proof damages or breaks the streak.
- Run It Back should preserve the mission idea but shrink the proof target.

## Components

- `RunItBackScreen`
- `FailureExplanationCard`
- `FailureReasonChips`
- `BlockerInput`
- `RaisedButton`
- `SecondaryButton`

## Acceptance Criteria

- Failure feels serious but recoverable.
- Copy focuses on blocker plus next action.
- User can freeze streak with honest failure proof.
- User can restart with smaller scope.

## Explicitly Not Included

- Shame-heavy identity copy.
- Leaderboard punishment.
- Public failure posting.
- Complex streak economy.
