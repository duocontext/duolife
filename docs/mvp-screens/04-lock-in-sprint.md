# Screen 04 - Lock-In Sprint

## Product Purpose

Create the execution ritual.

The screen should keep the user focused on the proof due, not just the time remaining.

## User Flow

1. User taps `Lock In` on Today's Mission.
2. App starts the countdown.
3. User sees mission, proof due, and proof status.
4. User taps `Upload Proof` when evidence exists.
5. App routes to Proof Upload.
6. If time expires without proof, app routes to Failure Proof / Run It Back.

## UI Requirements

- Compact mission title.
- Large countdown timer.
- Proof due card.
- Proof status pill.
- Primary CTA: `Upload Proof`
- Secondary CTA: `Shrink Mission`

Example content:

- Timer: `42:18 left`
- Mission: `Build Duolife onboarding`
- Proof due: `10-second screen recording`
- Status: `Not shipped yet`

## State Needed

- `mission`
- `remainingSeconds`
- `proofStatus`
- `startedAt`
- `endsAt`
- `isExpired`

## Actions

- Upload proof.
- Shrink mission.
- Handle timer expiration.

## Validation Rules

- Timer must always be paired with proof due.
- Starting the timer does not reward XP.
- Time passing alone does not count as progress.
- If timer expires without proof, user must upload failure proof or run it back.

## Components

- `LockInSprintScreen`
- `TimerDisplay`
- `ProofDueCard`
- `ProofStatusPill`
- `RaisedButton`
- `SecondaryButton`

## Acceptance Criteria

- Timer is large, but proof due remains visually central.
- Upload Proof uses proof blue, not success green.
- The screen has no chat interface or social feed.
- Expiration creates a clear transition to Run It Back.

## Explicitly Not Included

- XP animation during timer.
- Percent-complete progress.
- Social feed.
- Full chat.
- Many controls.
