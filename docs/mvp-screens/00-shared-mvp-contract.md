# Duolife MVP Shared Contract

## Purpose

This file is the shared implementation contract for all MVP screens. Each screen must support the same product loop:

Goal -> daily mission -> lock in -> upload proof -> post from proof -> streak/rank update -> return tomorrow.

## MVP Thesis

Duolife should prove one thing:

Can the app make an ambitious builder ship proof daily and post from that proof?

This is not a generic productivity app, task manager, timer, habit tracker, or social feed.

## Core Behavior

The MVP trains one behavior:

Pick one mission -> lock in -> upload proof -> generate post from proof -> mark posted -> streak grows.

## Product Laws

- Proof matters more than intention.
- A mission without a proof target is invalid.
- The timer should never appear without the proof target.
- Post generation unlocks only after proof exists.
- Evidence grows the streak.
- Honest failure proof freezes the streak.
- No proof and no failure proof damages or breaks the streak.

## MVP Data Shapes

### Mission

- `id`
- `title`
- `proofTarget`
- `timeboxMinutes`
- `status`: `draft | active | shipped | frozen | failed`
- `createdAt`
- `startedAt`
- `completedAt`

### Proof

- `id`
- `missionId`
- `type`: `screenshot | video | link | text | voice | commit | figma`
- `contentUrl` or `text`
- `reflection`
- `createdAt`

### Post

- `id`
- `missionId`
- `proofId`
- `generatedText`
- `platform`
- `copied`
- `markedPosted`
- `postUrl`
- `createdAt`

### Streak

- `currentShipStreak`
- `currentPostStreak`
- `frozenCount`
- `lastShipDate`
- `lastPostDate`

### User Profile

- `name`
- `goal`
- `identityType`
- `preferredProofTypes`
- `pressureMode`
- `rank`

## Visual Contract

Use `duolife_duolingo_style_design_spec.md` as the visual source of truth.

Shared rules:

- Mobile-first.
- One screen, one primary action.
- One screen, one visual hero.
- Use playful, rounded, bright UI.
- Use proof-centered copy.
- Avoid dashboard clutter.
- Avoid fake progress bars.
- Avoid social feed UI in MVP.
- Use screen accent colors from the design spec.

## Build Order

1. Onboarding
2. Mission Builder
3. Today's Mission
4. Lock-In Sprint
5. Proof Upload
6. Post From Proof
7. Profile / Rank
8. Failure Proof / Run It Back

## Explicitly Not MVP

Do not build yet:

- full friends system
- Instagram-style stories feed
- Co-Lock rooms
- public discovery feed
- complex rank economy
- leaderboards
- advanced AI coach chat
- full calendar
- habit tracker
- generic task manager
- advanced analytics dashboard
- MRR or revenue integrations
- friend streaks
- duels or remix challenges

## Final Acceptance Question

Every MVP feature should be judged by one question:

Did the app make the user ship proof and post from it today?
