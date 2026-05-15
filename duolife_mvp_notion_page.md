# Duolife MVP

## One-line definition

Duolife is a daily execution game where a mission only counts when the user produces proof, then turns that proof into public momentum.

---

## MVP thesis

The MVP should prove one thing:

> Can Duolife make an ambitious builder ship proof daily and post from that proof?

This is not a generic productivity app, task manager, timer, habit tracker, or social feed.

The MVP must train one behavior:

> Pick one mission → lock in → upload proof → generate post from proof → mark posted → streak grows.

---

## Core MVP loop

1. User opens Duolife.
2. User creates or sees Today’s Mission.
3. Mission must include a proof target.
4. User taps **Lock In**.
5. Sprint timer starts.
6. User uploads proof before/after the sprint.
7. User writes one sentence about what changed.
8. Duolife unlocks **Post From Proof**.
9. User copies/marks the post as posted.
10. Ship streak grows.

---

## Core design laws for MVP

### 1. Proof first

The app should reward proof, not intention.

Do not reward:

- opening the app
- choosing a mission
- starting a timer
- saying “I locked in”
- spending time without output

Reward:

- proof uploaded
- proof turned into a post
- proof posted publicly

### 2. A mission without proof is invalid

Every mission must answer:

> What evidence will prove this was done?

Examples of valid proof:

- screenshot
- screen recording
- GitHub commit
- Figma frame
- written draft
- voice explanation
- before/after result
- public post link

### 3. No timer without proof target

The timer should never appear alone.

Bad:

> 60-minute focus session

Good:

> 60 minutes to upload a 10-second onboarding demo

### 4. Shipping unlocks posting

The user should not get the post-generation screen before uploading proof.

Proof comes first. Posting comes after.

### 5. Honesty protects the streak. Evidence grows it.

Success:

> Proof uploaded → streak grows → post-from-proof unlocks.

Failure:

> Failure proof uploaded → streak freezes → Run It Back appears.

No proof and no failure proof:

> Streak takes damage or breaks.

---

# MVP Screens

## 1. Onboarding

### Purpose

Teach the user that Duolife is a proof-based execution system, not a timer app.

### Goal

Get the user to create their first mission with a proof target quickly.

### Content

Headline:

> Ship proof daily.

Subtext:

> Pick one mission, lock in, upload evidence, and turn it into momentum.

### Setup questions

1. What are you trying to become?
   - Founder
   - Creator
   - Student builder
   - Engineer
   - Designer
   - Custom

2. What are you building toward right now?
   - Ship my startup MVP
   - Grow my audience
   - Get better at coding
   - Study consistently
   - Build a portfolio
   - Custom

3. What kind of proof can you ship?
   - Screenshot
   - Screen recording
   - GitHub commit
   - Figma frame
   - Written note
   - Voice note
   - Public post

### Primary CTA

> Create Today’s Mission

---

## 2. Today’s Mission

### Purpose

This is the main MVP screen.

It should make the user understand exactly what they need to do today and what proof they owe.

### Must show

1. Mission
2. Proof required
3. Timebox
4. Reward/unlock
5. Lock In button

### Layout

Header:

> Today’s Mission

Mission card:

**Mission:**

> Build Duolife onboarding

**Proof required:**

> Upload a 10-second screen recording of the onboarding flow.

**Timebox:**

> 60 minutes

**Unlock:**

> Post From Proof unlocks after upload.

Primary CTA:

> Lock In

Secondary actions:

- Edit Mission
- Shrink Mission

### Empty state

If no mission exists:

> Pick one mission. Make the proof tiny enough to ship today.

CTA:

> Build Mission

### Avoid

- task lists
- dashboards
- calendars
- multiple missions
- fake progress bars
- motivational quotes as the main content

---

## 3. Mission Builder

### Purpose

Help the user create a concrete mission with a proof target.

### Required fields

#### Mission

Prompt:

> What will you move forward today?

Examples:

- Build onboarding screen
- Fix login bug
- Record first demo
- DM 5 potential users
- Finish lesson notes

#### Proof Target

Prompt:

> What evidence will prove you did it?

Examples:

- 10-second screen recording
- screenshot of finished screen
- GitHub commit link
- public post link
- written summary
- voice explanation

#### Timebox

Options:

- 25 min
- 45 min
- 60 min
- 90 min

### AI assist

If the mission is vague, Duolife should help shrink it.

Example:

User writes:

> Work on Duolife

Duolife suggests:

> Too vague. Try: “Build Today’s Mission card. Proof: screenshot of working screen.”

### Primary CTA

> Save Mission

### Rule

User cannot save a mission without a proof target.

---

## 4. Lock-In Sprint

### Purpose

Create the execution ritual.

The sprint screen should keep the user focused on the proof due, not just the time remaining.

### Must show

- countdown timer
- mission
- proof target
- proof status
- upload proof CTA

### Layout

Countdown:

> 42:18 left

Mission:

> Build Duolife onboarding

Proof due:

> 10-second screen recording

Status:

> Not shipped yet

Primary CTA:

> Upload Proof

Secondary CTA:

> Shrink Mission

### Warning copy

Normal Mode:

> Proof is still due. Keep it tiny and ship.

Locked-In Mode:

> Lazy mode is creeping in. Proof is still due.

### Avoid

- social feed
- full chat
- fake “percent complete” progress
- rewarding time passing
- too many controls

---

## 5. Proof Upload

### Purpose

Capture evidence that the mission was completed.

This screen should appear when the timer ends or when the user taps Upload Proof.

### Must show

- proof requirement reminder
- upload options
- one-sentence reflection

### Layout

Header:

> Upload Proof

Reminder:

> Proof required: 10-second screen recording of onboarding flow

Upload options:

- screenshot
- video
- link
- text note
- voice note
- GitHub commit
- Figma link

Reflection prompt:

> What changed because of this sprint?

Examples:

- Built first onboarding screen
- Fixed login bug
- Recorded rough demo
- Sent first user DMs

Primary CTA:

> Submit Proof

### After submit

Unlock:

- Ship streak update
- Post From Proof screen

### Avoid

- long journaling
- letting users complete without proof
- asking reflection before proof

---

## 6. Post From Proof

### Purpose

Turn proof into public momentum.

This is a core differentiator of Duolife.

### Unlock condition

Only after proof is uploaded.

### Must show

- uploaded proof preview
- generated post options
- mark posted action

### Layout

Header:

> Turn proof into momentum

Proof preview:

> Show uploaded screenshot/video/link/note

AI questions:

1. What did you ship?
2. What changed?
3. Who is this for?
4. What should people respond to?

Generated outputs:

- X post
- Instagram story text
- TikTok/Reel hook
- YouTube Short hook
- “student founder in Doha” angle

Primary CTA:

> Copy Post

Secondary CTA:

> Mark Posted

If user ships but does not mark posted:

> Proof shipped. Momentum not claimed yet.

### Avoid

- generic motivational captions
- generating posts before proof exists
- fake founder content

---

## 7. Failure Proof / Run It Back

### Purpose

Handle failure honestly without turning the app into shame theater.

If the user does not upload proof in time, they should explain the blocker or run it back.

### Layout

Header:

> Mission froze

Explanation:

> You did not ship proof in time. Upload failure proof to protect your streak, or run it back now.

Blocker options:

- Scope too big
- Got distracted
- Technical issue
- Did not know next step
- Energy crash
- Other

Prompt:

> One sentence. What blocked you?

Primary CTA:

> Freeze Streak

Secondary CTA:

> Run It Back

### Rules

- Proof uploaded = streak grows
- Failure proof uploaded = streak freezes
- No proof/failure proof = streak damaged or broken

### Copy options

Normal:

> Streak froze. Run it back?

Locked-In:

> Lazy mode tried to win. Run it back with smaller proof.

Brutal Mode, optional later:

> No proof. You folded. Run it back.

---

## 8. Basic Profile / Rank

### Purpose

Show user identity progress based on proof, not fake activity.

### MVP stats

- Ship streak
- Posts from proof
- Proof shipped this week
- Frozen streak count
- Current rank

### Rank basis

Ranks should be based on:

- proof uploaded
- proof posted
- consistency

Not based mainly on:

- app opens
- minutes focused
- tasks created
- XP farming

### Example early ranks

- Locked-In Rookie
- Shipper
- Public Builder
- Operator

### Avoid in MVP

- complex XP economy
- too many meme titles
- public leaderboards
- revenue/MRR tracking too early

---

# MVP Data Model

## Mission

- id
- title
- proof_target
- timebox_minutes
- status: draft / active / shipped / frozen / failed
- created_at
- started_at
- completed_at

## Proof

- id
- mission_id
- type: screenshot / video / link / text / voice / commit / figma
- content_url or text
- reflection
- created_at

## Post

- id
- mission_id
- proof_id
- generated_text
- platform
- copied: true/false
- marked_posted: true/false
- post_url optional
- created_at

## Streak

- current_ship_streak
- current_post_streak
- frozen_count
- last_ship_date
- last_post_date

## User Profile

- name
- goal
- identity_type
- preferred_proof_types
- pressure_mode
- rank

---

# MVP Success Metrics

## Primary metric

Daily proof shipped.

## Secondary metrics

- percentage of missions with proof uploaded
- percentage of proof turned into posts
- number of users with 3-day ship streak
- number of users with 7-day ship streak
- average time from mission creation to proof upload
- number of Run It Back recoveries

## Not primary yet

MRR is the business scoreboard, but not the first product-loop metric.

The MVP should optimize the upstream behavior that can eventually create MRR:

> ship proof → post proof → get feedback → detect demand → ask for payment → MRR

---

# MVP Build Priority

## Phase 1: Solo proof loop

Build first:

1. Onboarding
2. Today’s Mission
3. Mission Builder
4. Lock-In Sprint
5. Proof Upload
6. Post From Proof
7. Basic streak/rank
8. Failure Proof / Run It Back

## Phase 2: Lightweight social, only after solo loop works

Build later:

1. Proof story card
2. Friends can see shipped proof
3. Friends can join next lock-in
4. Structured feedback buttons

Do not build full social feed until proof loop retention is working.

---

# Not MVP

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
- MRR/revenue integrations
- friend streaks
- duels/remix challenges

These are interesting but not necessary to prove the MVP.

---

# MVP UI Checklist

## Today’s Mission card must include

- Mission
- Proof required
- Timebox
- Unlock/reward
- Lock In button

## Sprint screen must include

- Timer
- Mission
- Proof due
- Upload Proof CTA

## Proof Upload must include

- Proof requirement reminder
- Upload field
- One-sentence reflection

## Post From Proof must include

- Proof preview
- Generated post
- Copy Post
- Mark Posted

## Failure screen must include

- Blocker reason
- Freeze Streak
- Run It Back

---

# MVP positioning

## Good positioning

> Duolife turns daily ambition into shipped proof.

> One mission. One proof target. One post from proof.

> If you built but did not post, the loop is incomplete.

## Bad positioning

> Manage your tasks.

> Track your habits.

> Focus better.

> Plan your life.

> Gamify productivity.

---

# Final MVP rule

The MVP should be judged by one question:

> Did the app make the user ship proof and post from it today?

If a feature does not help that happen, it is not MVP.

