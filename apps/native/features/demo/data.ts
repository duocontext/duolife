import type { CaptureTag, Platform, PlayerStats, Quest } from "./types";

export const PLATFORM_OPTIONS: Platform[] = ["X", "IG", "YouTube", "Personal"];

export const CAPTURE_TAGS: CaptureTag[] = [
	"Idea",
	"Task",
	"Proof note",
	"Content hook",
];

export const TIMEBOX_OPTIONS = [25, 50, 90] as const;

export const STARTER_STATS: PlayerStats = {
	level: 1,
	xp: 40,
	buildStreak: 3,
	shareStreak: 2,
};

export const STARTER_QUEST: Quest = {
	id: "starter-quest",
	title: "Ship one visible proof",
	description: "Make a small move, show it, and share what changed.",
	proofTarget: "1 screenshot + 1 honest reaction",
	timeboxMinutes: 45,
	xp: 80,
	status: "ready",
};
