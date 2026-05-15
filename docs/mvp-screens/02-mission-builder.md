# Screen 02 - Mission Builder

## Product Purpose

Help the user create one concrete mission with one required proof target.

This screen turns ambition into a small quest that can be shipped today.

## User Flow

1. User enters from Onboarding or Today's Mission empty state.
2. User writes the mission.
3. User defines the proof target.
4. User chooses a timebox.
5. App warns if the mission is vague.
6. User taps `Save Mission`.
7. App routes to Today's Mission.

## UI Requirements

- Header: `Build Mission`
- Mission prompt: `What will you move forward today?`
- Proof prompt: `What evidence will prove you did it?`
- Timebox options:
  - 25 min
  - 45 min
  - 60 min
  - 90 min
- Example mission chips:
  - Build onboarding screen
  - Fix login bug
  - Record first demo
  - DM 5 potential users
  - Finish lesson notes
- Example proof chips:
  - 10-second screen recording
  - screenshot of finished screen
  - GitHub commit link
  - public post link
  - written summary
  - voice explanation
- Primary CTA: `Save Mission`

## State Needed

- `missionTitle`
- `proofTarget`
- `timeboxMinutes`
- `isVagueMission`
- optional setup context from onboarding

## Actions

- Edit mission title.
- Edit proof target.
- Select timebox.
- Apply example mission.
- Apply example proof.
- Save mission.

## Validation Rules

- Mission cannot be empty.
- Proof target cannot be empty.
- Timebox must be selected.
- If mission is vague, show helpful pressure before save.

Vague mission example:

User writes: `Work on Duolife`

App suggests: `Too vague. Try: "Build Today's Mission card. Proof: screenshot of working screen."`

## Components

- `MissionBuilderScreen`
- `QuestFieldCard`
- `TimeboxChips`
- `ExampleChips`
- `VagueMissionWarning`
- `RaisedButton`

## Acceptance Criteria

- User cannot save a mission without proof.
- User can create a valid mission in under one minute.
- The screen feels like building a quest card, not filling a boring form.
- Saved mission appears on Today's Mission.

## Explicitly Not Included

- Multiple missions.
- Calendar scheduling.
- Project management fields.
- AI chat.
- Backend persistence for V1 unless explicitly added later.
