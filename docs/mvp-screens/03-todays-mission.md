# Screen 03 - Today's Mission

## Product Purpose

This is the main MVP screen.

It should make the user understand exactly what they need to do today, what proof they owe, and what action comes next.

## User Flow

1. User opens the app after onboarding.
2. If no mission exists, user sees the empty state.
3. If a mission exists, user sees the mission card.
4. User taps `Lock In`.
5. App starts the sprint and routes to Lock-In Sprint.

## UI Requirements

### Header

- Title: `Today's Mission`
- Streak pill on the right.

### Mission Card

Must show:

- Mission title.
- Proof required.
- Timebox.
- Reward or unlock.
- Mission status badge.

Example content:

- Mission: `Build Duolife onboarding`
- Proof required: `Upload a 10-second screen recording of the onboarding flow.`
- Timebox: `60 minutes`
- Unlock: `Post From Proof unlocks after upload.`

### Actions

- Primary CTA: `Lock In`
- Secondary action: `Edit Mission`
- Secondary action: `Shrink Mission`

### Empty State

If no mission exists:

- Copy: `Pick one mission. Make the proof tiny enough to ship today.`
- CTA: `Build Mission`

## State Needed

- `mission`
- `streak`
- `rank`
- `missionStatus`

## Actions

- Build mission.
- Lock in.
- Edit mission.
- Shrink mission.

## Validation Rules

- `Lock In` is available only when mission has a proof target and timebox.
- Do not show the sprint timer on this screen.
- Do not show post-generation before proof exists.

## Components

- `QuestHomeScreen`
- `PlayerHeader`
- `MissionCard`
- `ProofRequiredCard`
- `UnlockRewardRow`
- `StreakPill`
- `RaisedButton`
- `SecondaryButton`

## Acceptance Criteria

- The screen has one obvious primary action.
- The proof target is visually louder than normal helper text.
- The user never sees multiple equal-weight missions.
- Empty state routes to Mission Builder.
- Lock In routes to Lock-In Sprint.

## Explicitly Not Included

- Dashboard.
- Task list.
- Calendar.
- Multiple missions.
- Fake progress bars.
- Motivational quotes as main content.
