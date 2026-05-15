# Duolife MVP — Duolingo-Style Design & Appearance System

> Scope: visual design only. This file defines how Duolife should look and feel in the MVP. It does **not** define product strategy, backend logic, or non-MVP features.

---

## 0. Design North Star

Duolife should feel like:

> **Duolingo’s playful clarity applied to founder execution.**

Not a dark productivity dashboard.  
Not a Notion-style task manager.  
Not a generic streak app.  
Not a macho “grindset” app.

The app should look:

- playful
- clean
- rounded
- colorful
- proof-centered
- mobile-first
- slightly game-like
- emotionally pressuring, but visually friendly

The visual fantasy:

> “A cute game UI is forcing me to ship real proof.”

---

## 1. Core Visual Translation From Duolingo

Duolingo’s redesign principles should translate into Duolife like this:

| Duolingo Pattern | Duolife Translation |
|---|---|
| Cleaner, clearer, more cohesive tabs | Every MVP screen uses one shared visual system: same header structure, same card style, same spacing, same CTA treatment. |
| Headers vary by purpose but stay positioned consistently | Every screen title sits in the same top-left zone, but each screen can have a different accent color based on state. |
| Minimal type system | Use very few text styles. Big bold headers, medium bold labels, simple readable body text. |
| Whitespace instead of forced containers | Do not box every tiny thing. Use cards only for meaningful sections: mission, proof, post, streak. |
| Modular cards where useful | Use rounded cards for mission/proof/post blocks, but avoid dashboard clutter. |
| Simplicity balanced with clarity | Remove decorative UI unless it makes the user understand the mission/proof state faster. |
| Purposeful visual identity per tab/screen | Today, Sprint, Proof, Post, Failure, and Profile can each have their own accent color while sharing the same layout language. |

---

## 2. Brand Personality

### Visual adjectives

Duolife should be:

- **bright**, not corporate
- **rounded**, not sharp
- **confident**, not serious
- **game-like**, not childish
- **clean**, not empty
- **pressuring**, not depressing
- **rewarding**, not fake-motivational

### Emotional mix

The interface should combine:

1. **Duolingo-like charm**
   - friendly colors
   - cute status badges
   - bold buttons
   - playful illustrations

2. **Founder war-room pressure**
   - countdown emphasis
   - proof requirement always visible
   - locked states
   - failure/freeze states

The app should feel like a friendly character is saying:

> “Cool. Where is the proof?”

---

## 3. Color System

Use original Duolife colors inspired by Duolingo’s brightness. Do **not** copy Duolingo’s exact mascot or brand identity.

### Primary palette

| Token | Use | Hex |
|---|---|---|
| `life.green` | Main success / ship / active CTA | `#58CC02` |
| `life.green.dark` | Button shadow / pressed edge | `#46A302` |
| `life.green.soft` | Success background | `#E5F8D8` |
| `proof.blue` | Proof upload / evidence / links | `#1CB0F6` |
| `proof.blue.dark` | Proof button shadow | `#168DCA` |
| `proof.blue.soft` | Proof card background | `#DDF4FF` |
| `post.purple` | Post From Proof / distribution | `#CE82FF` |
| `post.purple.dark` | Post button shadow | `#A96ED1` |
| `post.purple.soft` | Post card background | `#F3E5FF` |
| `streak.gold` | Streaks / rewards / rank | `#FFC800` |
| `streak.gold.dark` | Gold shadow / badge edge | `#D9A900` |
| `warning.orange` | Warnings / countdown pressure | `#FF9600` |
| `fail.red` | Failure / broken streak / danger | `#FF4B4B` |

### Neutral palette

| Token | Use | Hex |
|---|---|---|
| `neutral.bg` | App background | `#F7F7F7` |
| `neutral.card` | Main cards | `#FFFFFF` |
| `neutral.line` | Borders / dividers | `#E5E5E5` |
| `neutral.line.dark` | Raised card lower edge | `#D6D6D6` |
| `neutral.text` | Main text | `#3C3C3C` |
| `neutral.subtext` | Secondary text | `#777777` |
| `neutral.disabled` | Disabled UI | `#AFAFAF` |
| `neutral.disabled.bg` | Disabled background | `#E5E5E5` |

### Screen accent mapping

| Screen | Accent |
|---|---|
| Onboarding | `life.green` |
| Today’s Mission | `life.green` |
| Mission Builder | `proof.blue` |
| Lock-In Sprint | `warning.orange` |
| Proof Upload | `proof.blue` |
| Post From Proof | `post.purple` |
| Failure / Run It Back | `fail.red` + `warning.orange` |
| Profile / Rank | `streak.gold` |

### Color rules

- Green means **ship / success / proceed**.
- Blue means **proof / evidence / upload / link**.
- Purple means **post / distribute / public momentum**.
- Gold means **rank / streak / achievement**.
- Orange means **time pressure / warning**.
- Red means **failure / missing proof / danger**.
- Never use more than 2 accent colors on one screen.
- Main CTA should use the screen accent color unless the action is destructive.

---

## 4. Typography

Use rounded, friendly, high-readability typography.

### Recommended fonts

If custom fonts are available:

- Headings: **Nunito Sans ExtraBold**
- Body: **Nunito Sans SemiBold / Regular**
- Numbers / timer: **Nunito Sans Black**

If custom fonts are not ready:

- Use the system font, but keep weights bold and rounded where possible.

### Type scale

| Token | Size | Weight | Use |
|---|---:|---:|---|
| `display.timer` | 56–72 | 900 | Sprint countdown |
| `title.hero` | 34–40 | 900 | Onboarding / success state |
| `title.screen` | 28–32 | 900 | Screen title |
| `title.card` | 21–24 | 800 | Mission card headline |
| `label.section` | 15–17 | 800 | Card labels: Mission, Proof, Unlock |
| `body.primary` | 16–18 | 700 | Main body |
| `body.secondary` | 14–15 | 600 | Helper text |
| `caption` | 12–13 | 800 | Chips, badges, metadata |
| `button` | 16–17 | 900 | CTAs |

### Type rules

- Use bold text generously.
- Avoid thin fonts.
- Avoid tiny gray text for important proof requirements.
- Proof target should be visually louder than normal body text.
- Timer numbers should feel like a game HUD.
- Use short labels, not paragraphs.

---

## 5. Spacing & Layout

### Global spacing

| Token | Value |
|---|---:|
| Screen horizontal padding | 20 |
| Section gap | 24 |
| Card internal padding | 18–20 |
| Card vertical gap | 14–18 |
| Small gap | 8 |
| Chip gap | 8 |
| Bottom safe padding | 28–36 |

### Layout principles

- One screen = one primary action.
- One screen = one visual hero.
- Do not show multiple competing cards of equal weight.
- Keep the main CTA fixed near the bottom when the screen is action-heavy.
- Cards should breathe. Avoid dense productivity layouts.
- Important cards should feel tappable, even when they are informational.

### Visual hierarchy order

Every core screen should answer visually in this order:

1. What state am I in?
2. What is the mission/proof?
3. What should I do next?
4. What reward or consequence follows?

---

## 6. Shape System

Duolife should be highly rounded.

| Element | Radius |
|---|---:|
| Main card | 24 |
| Large modal/card | 28 |
| Primary button | 16 |
| Input field | 16 |
| Chips | 999 |
| Proof upload tile | 20 |
| Bottom nav container | 24 |
| Avatar / mascot bubble | 999 |

### Shape rules

- Avoid sharp corners.
- Avoid tiny radius like 4 or 6.
- Use pill shapes for badges, proof types, timeboxes, and states.
- Use large rounded rectangles for mission/proof/post modules.

---

## 7. Duolingo-Style Raised Components

Use raised, tactile components for CTAs and important cards.

### Primary button

Visual recipe:

```txt
height: 54–58
border-radius: 16
background: screen accent
bottom edge/shadow: darker accent
text: white, bold, centered, uppercase optional
pressed state: move down 3px, shadow disappears
disabled: gray bg, gray edge, muted text
```

Example:

```txt
LOCK IN
[green button body]
[dark green 4px lower edge]
```

### Secondary button

Visual recipe:

```txt
height: 48–52
background: white
border: 2px solid neutral.line
bottom edge: neutral.line.dark
text: neutral.text or accent
```

Use for:

- Edit Mission
- Shrink Mission
- Run It Back
- Copy Post if Mark Posted is primary

### Cards

Visual recipe:

```txt
background: white
border: 2px solid neutral.line
border-radius: 24
bottom border/edge: 3–4px darker neutral
padding: 18–20
```

Cards should feel soft and chunky, not like flat SaaS panels.

---

## 8. Icon & Illustration Style

### Icons

Use thick, rounded, filled or semi-filled icons.

Good icon style:

- chunky
- rounded caps
- simple silhouettes
- high contrast
- minimal internal detail

Avoid:

- thin outline-only icons
- generic SaaS icons
- complex illustrations inside buttons
- icons that look like enterprise dashboards

### Suggested icon meanings

| Concept | Icon direction |
|---|---|
| Mission | target / flag |
| Proof | camera / image / paperclip / shield-check |
| Lock In | lock / flame / bolt |
| Timebox | stopwatch |
| Post | megaphone / send |
| Streak | flame |
| Frozen | ice cube / snowflake |
| Rank | trophy / badge |
| Failure | cracked heart / warning triangle |

### Mascot / character direction

Duolife can have an original tiny mascot later, but for MVP use small expressive badges instead of a full character system.

Possible MVP character substitute:

> A small “Proof Orb” or “Lock-In Flame” that changes expression by state.

States:

- Ready: focused face
- Locked in: intense eyes
- Proof uploaded: happy bounce
- Posted: megaphone celebration
- Frozen: icy face
- Failed: cracked but recoverable

Do not use Duo, Duolingo characters, or any copied assets.

---

## 9. Motion & Feedback

The app should feel alive but not distracting.

### Button press

- Button moves down 3–4px.
- Lower edge disappears.
- Release returns with small bounce.

### Success state

When proof is submitted:

- Card pops slightly.
- Green check appears.
- Streak badge increments with bounce.
- Confetti can appear briefly, but keep it light.

### Failure/freeze state

When mission freezes:

- Red/orange header appears.
- Frozen badge slides in.
- No confetti.
- Run It Back button should pulse subtly once.

### Timer state

- Timer should not animate aggressively every second.
- At final 5 minutes, use orange emphasis.
- At final 60 seconds, use red accent and subtle shake only once.

### Upload state

- Upload tile should show progress ring or bar.
- After upload, proof preview should snap into a card.

---

## 10. Core Navigation Style

MVP should avoid a heavy tab system, but if bottom navigation is used, it should be simple.

### Recommended bottom nav

3 items only:

1. Today
2. Proof
3. Profile

Visual recipe:

```txt
height: 76–84
background: white
top border: neutral.line
icons: rounded, thick
active item: accent color + label bold
inactive item: neutral.disabled
```

### Active tab

- Use a small filled pill behind the active icon or label.
- Do not use five tabs.
- Do not include social/feed tabs in MVP.

---

## 11. Screen-by-Screen Visual Specs

## 11.1 Onboarding

### Visual goal

Make the product feel simple, playful, and proof-first immediately.

### Layout

```txt
Top: playful illustration / proof orb
Middle: huge headline
Below: short subtext
Then: rounded setup choice cards
Bottom: raised green CTA
```

### Appearance

- Background: `neutral.bg`
- Hero accent: `life.green`
- Cards: white raised cards
- CTA: raised green button

### Header

No heavy navigation header. Let the onboarding feel spacious.

### Option cards

Each option should be a chunky selectable card:

```txt
height: 58–68
radius: 18
border: 2px neutral.line
selected border: life.green
selected bg: life.green.soft
left icon + label + optional check
```

### Avoid

- long onboarding carousel
- thin radio buttons
- corporate illustrations
- more than one paragraph of text

---

## 11.2 Today’s Mission

### Visual goal

This is the home screen. It should look like a daily quest screen, not a task manager.

### Layout

```txt
Top header:
- "Today’s Mission"
- streak pill on right

Main mission card:
- small state badge
- mission title
- proof required block
- timebox chip
- unlock/reward row

Bottom:
- huge Lock In button
- smaller Shrink Mission / Edit Mission buttons
```

### Main card appearance

```txt
background: white
border: 2px neutral.line
bottom edge: neutral.line.dark
radius: 28
padding: 20
```

Inside the card:

- Mission title should be large and bold.
- Proof required should sit in a blue-tinted inset block.
- Unlock should use a purple/gold chip.

### Proof block

```txt
background: proof.blue.soft
border-radius: 18
padding: 14
icon: camera/shield-check
label: PROOF REQUIRED
text: bold, dark
```

### Streak pill

```txt
background: streak.gold
radius: 999
icon: flame
text: current streak
edge: streak.gold.dark
```

### Empty state

If there is no mission:

- Use a centered proof orb illustration.
- One bold sentence.
- One green CTA.
- Avoid dashboard placeholders.

---

## 11.3 Mission Builder

### Visual goal

Make creating a mission feel like building a quest card.

### Layout

```txt
Header: "Build Mission"
Step cards:
1. Mission
2. Proof Target
3. Timebox
Bottom: Save Mission button
```

### Form fields

Inputs should not look like boring forms. They should look like large rounded game cards.

```txt
min-height: 64
radius: 18
border: 2px neutral.line
focused border: proof.blue
focused bg: proof.blue.soft at low opacity
```

### Example chips

Use pill chips under each field:

```txt
"Screenshots"
"10-sec demo"
"GitHub commit"
"Post link"
```

Selected chip:

```txt
background: proof.blue
text: white
```

### Vague mission warning

When mission is too vague:

```txt
background: warning.orange soft tint
border-left/icon: warning.orange
title: "Too vague"
body: "Shrink it until proof is obvious."
```

This should feel like helpful pressure, not an error.

---

## 11.4 Lock-In Sprint

### Visual goal

Create a focused game HUD. The timer is big, but proof is still the hero.

### Layout

```txt
Top: compact mission title
Center: huge countdown
Below: proof due card
Below: proof status pill
Bottom: Upload Proof CTA
```

### Background

Use a slightly warmer background than normal:

```txt
neutral.bg + subtle orange tint
```

### Timer

```txt
font-size: 64–72
weight: 900
color: neutral.text
```

Timer color states:

| Time state | Timer color |
|---|---|
| Normal | `neutral.text` |
| Last 5 min | `warning.orange` |
| Last 60 sec | `fail.red` |

### Proof due card

This card must be visually louder than the mission text.

```txt
background: proof.blue.soft
border: 2px solid proof.blue
radius: 24
icon: camera / shield-check
label: PROOF DUE
```

### Upload Proof button

Use blue, not green.

Reason: in this screen, the next concrete action is evidence capture.

### Avoid

- progress percentage
- XP animation during timer
- social feed
- chat interface
- too many controls

---

## 11.5 Proof Upload

### Visual goal

Make uploading proof feel like submitting evidence in a game quest.

### Layout

```txt
Header: "Upload Proof"
Reminder card: proof required
Upload grid / upload tile
Preview area
One-sentence reflection
Submit Proof CTA
```

### Upload tile

```txt
height: 140–180
border: 2px dashed proof.blue
background: proof.blue.soft
radius: 24
center icon: upload/camera
label: "Add proof"
```

### Upload type chips

Use horizontal pills:

- Screenshot
- Video
- Link
- Text
- Voice
- Commit
- Figma

### Reflection input

Should be short and constrained visually.

```txt
height: 80–100
placeholder: "What changed?"
max feel: one sentence
```

Do not make it look like a journal.

---

## 11.6 Post From Proof

### Visual goal

This screen should feel like converting proof into public momentum.

### Layout

```txt
Header: "Turn proof into momentum"
Top: proof preview card
Middle: generated post cards
Bottom: Copy Post + Mark Posted
```

### Background

Use a subtle purple tint or white/gray with purple accents.

### Proof preview card

```txt
background: white
border: 2px neutral.line
radius: 24
top badge: PROOF SHIPPED
badge color: life.green
```

### Generated post cards

Each generated output should be a card:

```txt
platform label pill
generated text
copy icon
```

Platform accent mapping:

| Output | Accent |
|---|---|
| X post | neutral.text / black |
| Instagram story | purple/pink |
| TikTok/Reel hook | red/blue accent |
| YouTube Short hook | red |
| Student founder in Doha angle | gold/purple |

### Mark Posted

Make this the most emotionally important action.

If post not marked:

```txt
purple warning card:
"Proof shipped. Momentum not claimed yet."
```

CTA:

```txt
MARK POSTED
purple raised button
```

---

## 11.7 Failure Proof / Run It Back

### Visual goal

Failure should feel serious but recoverable.

### Layout

```txt
Header: "Mission froze"
Frozen/failed badge illustration
Explanation card
Blocker chips
One-sentence blocker input
Run It Back / Freeze Streak buttons
```

### Color

- Header accent: `fail.red`
- Recovery CTA: `warning.orange` or `life.green`
- Freeze state: icy blue accent can be added later

### Blocker chips

Use rounded chips:

```txt
Scope too big
Got distracted
Technical issue
Did not know next step
Energy crash
Other
```

Selected chip:

```txt
background: warning.orange
text: white
```

### Failure tone visually

Keep text sharp, but visuals should not be ugly or humiliating.

Good visual feeling:

> “You lost this run. Shrink it and go again.”

Bad visual feeling:

> “You are a failure.”

---

## 11.8 Basic Profile / Rank

### Visual goal

Show proof-based identity progress, not fake productivity stats.

### Layout

```txt
Header: profile name + rank badge
Hero rank card
Stats grid
Recent proof list
```

### Rank card

```txt
background: streak.gold soft tint
border: 2px streak.gold
radius: 28
badge icon: trophy/flame
rank name: big bold
```

### Stats grid

2-column chunky cards:

- Ship streak
- Posts from proof
- Proof shipped this week
- Frozen streak count

Each stat card:

```txt
background: white
radius: 22
border: 2px neutral.line
number: 28–34 bold
label: 13–15 bold muted
```

### Recent proof list

Keep it visually lightweight:

```txt
small proof thumbnail
mission title
status badge
posted/not posted pill
```

Avoid turning this into a social feed.

---

## 12. Component Library Checklist

Build these components first:

### Foundation

- `Screen`
- `ScreenHeader`
- `AccentHeader`
- `RaisedCard`
- `RaisedButton`
- `SecondaryButton`
- `Pill`
- `StateBadge`
- `ProofBlock`
- `TimerDisplay`
- `UploadTile`
- `StatCard`
- `BottomNav`

### MVP-specific components

- `MissionCard`
- `ProofRequiredCard`
- `UnlockRewardRow`
- `TimeboxChips`
- `ProofTypeChips`
- `GeneratedPostCard`
- `FailureReasonChips`
- `RankCard`
- `StreakPill`

---

## 13. Component Recipes

## 13.1 RaisedButton

### Default

```txt
height: 56
border-radius: 16
padding-horizontal: 20
background: accent
shadow/edge height: 4
text: white, 16–17, 900
```

### Pressed

```txt
translateY: 4
edge height: 0
```

### Disabled

```txt
background: neutral.disabled.bg
edge: neutral.line.dark
text: neutral.disabled
```

---

## 13.2 RaisedCard

```txt
background: neutral.card
border: 2px solid neutral.line
border-radius: 24
padding: 18–20
bottom edge: 3–4px neutral.line.dark
```

Optional accent top strip:

```txt
height: 6
background: screen accent
border-top-left-radius: 24
border-top-right-radius: 24
```

---

## 13.3 StateBadge

```txt
height: 28–34
padding-horizontal: 10–12
radius: 999
font: caption bold
icon: optional, 14–16
```

Examples:

| State | Text | Color |
|---|---|---|
| Ready | READY | green |
| Locked in | LOCKED IN | orange |
| Proof due | PROOF DUE | blue |
| Shipped | SHIPPED | green |
| Posted | POSTED | purple |
| Frozen | FROZEN | blue/orange |
| Failed | NO PROOF | red |

---

## 13.4 ProofBlock

```txt
background: proof.blue.soft
border: 2px solid proof.blue
radius: 20
padding: 14–16
left icon: proof.blue
label: PROOF REQUIRED
body: bold, neutral.text
```

This component should appear anywhere the user could forget what evidence is required.

---

## 14. Visual Do / Don’t

### Do

- Use big rounded cards.
- Use raised buttons with darker lower edges.
- Make proof visually obvious.
- Use bright accents with lots of white/gray space.
- Use short labels and bold type.
- Use playful badges and chips.
- Make each screen feel like one game state.
- Use illustrations sparingly and purposefully.

### Don’t

- Build a dark-mode-only startup dashboard.
- Use thin outline icons everywhere.
- Use tiny text for critical proof requirements.
- Add multiple mission cards on the home screen.
- Use generic progress bars for fake progress.
- Let the timer become the visual reward.
- Add full social/feed UI in MVP.
- Over-containerize every row.
- Use copied Duolingo characters, assets, or exact brand identity.

---

## 15. Design QA Checklist

Before a screen is accepted, check:

- [ ] Is the screen’s main action obvious in 2 seconds?
- [ ] Is proof visible without scrolling?
- [ ] Is the primary CTA a raised button?
- [ ] Are there no more than 2 accent colors?
- [ ] Are cards rounded and chunky enough?
- [ ] Is typography bold enough?
- [ ] Is spacing consistent with the rest of the app?
- [ ] Does the screen avoid dashboard/task-manager vibes?
- [ ] Does the screen feel playful but still pressure the user?
- [ ] Does the screen visually reward proof, not intention?

---

## 16. MVP Visual Acceptance Criteria

The MVP design is successful if someone can open the app and immediately understand:

1. This is a daily mission game.
2. The mission requires proof.
3. The proof must be uploaded.
4. Posting comes after proof.
5. Streak/rank is based on evidence, not vibes.

The app should look like a cheerful execution game where every visual element points toward one thing:

> **Ship proof. Then post from proof.**

---

## 17. Implementation Notes for React Native / Expo

Use design tokens first. Do not hardcode random colors and radii across screens.

Suggested token structure:

```ts
export const colors = {
  lifeGreen: "#58CC02",
  lifeGreenDark: "#46A302",
  lifeGreenSoft: "#E5F8D8",
  proofBlue: "#1CB0F6",
  proofBlueDark: "#168DCA",
  proofBlueSoft: "#DDF4FF",
  postPurple: "#CE82FF",
  postPurpleDark: "#A96ED1",
  postPurpleSoft: "#F3E5FF",
  streakGold: "#FFC800",
  streakGoldDark: "#D9A900",
  warningOrange: "#FF9600",
  failRed: "#FF4B4B",
  bg: "#F7F7F7",
  card: "#FFFFFF",
  line: "#E5E5E5",
  lineDark: "#D6D6D6",
  text: "#3C3C3C",
  subtext: "#777777",
  disabled: "#AFAFAF",
  disabledBg: "#E5E5E5",
};

export const radius = {
  card: 24,
  cardLarge: 28,
  button: 16,
  input: 16,
  chip: 999,
};

export const spacing = {
  screenX: 20,
  section: 24,
  card: 18,
  gap: 12,
  chipGap: 8,
};
```

### Build order visually

1. Tokens
2. RaisedButton
3. RaisedCard
4. ScreenHeader
5. ProofBlock
6. MissionCard
7. TimerDisplay
8. UploadTile
9. GeneratedPostCard
10. RankCard

Do not design every screen from scratch. The app must feel like one cohesive system.

---

## 18. One-Sentence Design Rule

> If a UI element does not make the mission, proof, posting, or streak state clearer, remove it.
