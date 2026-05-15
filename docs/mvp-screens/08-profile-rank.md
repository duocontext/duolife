# Screen 08 - Basic Profile / Rank

## Product Purpose

Show proof-based identity progress.

The screen should reward shipped evidence and posted momentum, not app opens or fake productivity stats.

## User Flow

1. User enters after posting, from bottom navigation, or from completion state.
2. User sees current rank.
3. User sees proof-based stats.
4. User sees recent proof history.
5. User returns to Today's Mission for the next loop.

## UI Requirements

- Header with profile name and rank badge.
- Hero rank card.
- Stats grid:
  - Ship streak
  - Posts from proof
  - Proof shipped this week
  - Frozen streak count
- Current rank.
- Recent proof list.

Example early ranks:

- Locked-In Rookie
- Shipper
- Public Builder
- Operator

## State Needed

- `profile`
- `rank`
- `currentShipStreak`
- `currentPostStreak`
- `proofShippedThisWeek`
- `frozenCount`
- `recentProof`

## Actions

- Return to Today's Mission.
- View recent proof item.

## Validation Rules

- Rank is based on proof uploaded, proof posted, and consistency.
- Rank is not based mainly on app opens, minutes focused, tasks created, or XP farming.
- Recent proof list should not become a social feed.

## Components

- `ProfileRankScreen`
- `RankCard`
- `StatCard`
- `RecentProofList`
- `ProofStatusBadge`
- `StreakPill`

## Acceptance Criteria

- User understands their progress is tied to real-world proof.
- Stats stay simple and MVP-sized.
- The screen encourages returning tomorrow, not farming fake points.

## Explicitly Not Included

- Complex XP economy.
- Meme-title overload.
- Public leaderboards.
- Revenue or MRR tracking.
- Social profile feed.
