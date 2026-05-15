# Screen 06 - Post From Proof

## Product Purpose

Turn shipped proof into public momentum.

This is a core Duolife differentiator: the loop is incomplete if the user ships but does not post from the proof.

## Unlock Condition

Only show this screen after proof is uploaded.

## User Flow

1. User submits proof.
2. App routes to Post From Proof.
3. User sees proof preview.
4. User reviews generated post options.
5. User copies one post.
6. User marks the post as posted.
7. App updates post streak and routes to Profile / Rank or Today's Mission completion state.

## UI Requirements

- Header: `Turn proof into momentum`
- Proof preview card.
- Generated post cards:
  - X post
  - Instagram story text
  - TikTok/Reel hook
  - YouTube Short hook
  - Student founder in Doha angle
- Primary CTA: `Copy Post`
- Secondary or final CTA: `Mark Posted`
- Warning if not marked posted: `Proof shipped. Momentum not claimed yet.`

## State Needed

- `mission`
- `proof`
- `generatedPosts`
- `selectedPost`
- `copied`
- `markedPosted`

## Actions

- Select post option.
- Copy post text.
- Mark posted.
- Optionally paste post URL if supported in demo.

## Validation Rules

- Generated posts require proof.
- Mark Posted should not be available before proof exists.
- Copying is not the same as posting.
- If user copies but does not mark posted, show momentum-not-claimed state.

## Components

- `PostFromProofScreen`
- `ProofPreviewCard`
- `GeneratedPostCard`
- `PlatformPill`
- `MomentumWarningCard`
- `RaisedButton`
- `SecondaryButton`

## Acceptance Criteria

- Proof preview is visible on the same screen as post options.
- User can copy generated text.
- User can mark posted.
- Marking posted updates post streak or completion state.
- The copy does not sound generic or fake.

## Explicitly Not Included

- Posting directly to social platforms.
- OAuth integrations.
- Generic motivational captions.
- Generating posts before proof exists.
- Social feed.
