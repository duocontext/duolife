# Screen 05 - Proof Upload

## Product Purpose

Capture evidence that the mission was completed.

This screen appears when the user taps `Upload Proof` or when the sprint ends and proof is still required.

## User Flow

1. User enters from Lock-In Sprint.
2. User sees the proof requirement reminder.
3. User selects proof type.
4. User adds proof content.
5. User writes one sentence about what changed.
6. User taps `Submit Proof`.
7. App updates the ship streak and routes to Post From Proof.

## UI Requirements

- Header: `Upload Proof`
- Reminder: `Proof required: 10-second screen recording of onboarding flow`
- Upload type chips:
  - Screenshot
  - Video
  - Link
  - Text
  - Voice
  - Commit
  - Figma
- Upload tile or input.
- Proof preview.
- Reflection prompt: `What changed because of this sprint?`
- Primary CTA: `Submit Proof`

## State Needed

- `mission`
- `proofType`
- `proofContent`
- `proofPreview`
- `reflection`
- `isSubmitting`

## Actions

- Select proof type.
- Add proof.
- Preview proof.
- Edit reflection.
- Submit proof.

## Validation Rules

- User cannot submit without proof content.
- User cannot submit without a reflection.
- Reflection should feel like one sentence, not a journal.
- Reflection comes after proof content, not before it.

## Components

- `ProofUploadScreen`
- `ProofRequirementCard`
- `ProofTypeChips`
- `UploadTile`
- `ProofPreviewCard`
- `ReflectionInput`
- `RaisedButton`

## Acceptance Criteria

- User clearly sees the proof target before uploading.
- User can submit proof using a demo-safe local input.
- Submitting proof changes mission status to `shipped`.
- Submitting proof unlocks Post From Proof.

## Explicitly Not Included

- Long journaling.
- Completing without proof.
- Cloud file upload unless explicitly scoped.
- Complex media management.
