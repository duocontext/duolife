# Screen 01 - Onboarding

## Product Purpose

Teach the user that Duolife is a proof-based execution game, not a timer app.

The screen should get the user into their first mission as quickly as possible.

## User Flow

1. User opens the app for the first time.
2. User chooses what they are trying to become.
3. User chooses what they are building toward.
4. User chooses what kind of proof they can ship.
5. User taps `Create Today's Mission`.
6. App routes to Mission Builder with the selected context.

## UI Requirements

- Headline: `Ship proof daily.`
- Subtext: `Pick one mission, lock in, upload evidence, and turn it into momentum.`
- Identity choices:
  - Founder
  - Creator
  - Student builder
  - Engineer
  - Designer
  - Custom
- Goal choices:
  - Ship my startup MVP
  - Grow my audience
  - Get better at coding
  - Study consistently
  - Build a portfolio
  - Custom
- Proof type choices:
  - Screenshot
  - Screen recording
  - GitHub commit
  - Figma frame
  - Written note
  - Voice note
  - Public post
- Primary CTA: `Create Today's Mission`

## State Needed

- `identityType`
- `goal`
- `preferredProofTypes`
- optional custom identity text
- optional custom goal text

## Actions

- Select identity type.
- Select current goal.
- Select one or more proof types.
- Continue to Mission Builder.

## Validation Rules

- User must choose or enter an identity type.
- User must choose or enter a current goal.
- User must choose at least one proof type.

## Components

- `OnboardingScreen`
- `ChoiceCard`
- `ProofTypeChips`
- `RaisedButton`

## Acceptance Criteria

- The user understands that the app rewards proof, not planning.
- The user can complete setup without a long onboarding carousel.
- The CTA is disabled until required choices exist.
- The next screen receives the selected setup context.

## Explicitly Not Included

- Account creation.
- Auth.
- Backend persistence.
- Long personality quiz.
- Multi-screen onboarding carousel.
