import type { ComponentProps } from "react";
import type { Icon } from "@/components/icon";

export type MvpScreen =
	| "onboarding"
	| "mission-builder"
	| "today"
	| "sprint"
	| "proof-upload"
	| "post-proof"
	| "run-it-back"
	| "profile";

export type DemoTab = "today" | "proof" | "me";

export type TodayMode =
	| "home"
	| "mission-builder"
	| "sprint"
	| "proof-upload"
	| "post-proof"
	| "run-it-back";

export type IdentityType =
	| "Founder"
	| "Creator"
	| "Student builder"
	| "Engineer"
	| "Designer"
	| "Custom";

export type GoalType =
	| "Ship my startup MVP"
	| "Grow my audience"
	| "Get better at coding"
	| "Study consistently"
	| "Build a portfolio"
	| "Custom";

export type ProofType =
	| "Screenshot"
	| "Video"
	| "Link"
	| "Text"
	| "Voice"
	| "Commit"
	| "Figma";

export type MissionStatus =
	| "draft"
	| "active"
	| "shipped"
	| "posted"
	| "frozen"
	| "failed";

export type Mission = {
	id: string;
	title: string;
	proofTarget: string;
	timeboxMinutes: number;
	status: MissionStatus;
	createdAt: string;
	startedAt?: string;
	completedAt?: string;
	postedAt?: string;
};

export type SetupContext = {
	identityType: IdentityType | "";
	goal: GoalType | "";
	preferredProofTypes: ProofType[];
	customIdentity: string;
	customGoal: string;
};

export type Proof = {
	id: string;
	missionId: string;
	missionTitle: string;
	proofTarget: string;
	type: ProofType;
	content: string;
	reflection: string;
	createdAt: string;
	postedAt?: string;
};

export type GeneratedPost = {
	id: string;
	platform: string;
	text: string;
};

export type PostState = {
	id: string;
	missionId: string;
	proofId: string;
	selectedPostId: string;
	copied: boolean;
	markedPosted: boolean;
	postUrl?: string;
	createdAt: string;
	postedAt?: string;
};

export type GeneratedPostSet = PostState & {
	posts: GeneratedPost[];
};

export type ActiveTimerState = {
	missionId: string;
	startedAt: string;
	expiresAt: string;
	durationSeconds: number;
};

export type PlayerStats = {
	currentShipStreak: number;
	currentPostStreak: number;
	proofShippedThisWeek: number;
	frozenCount: number;
	rank: "Locked-In Rookie" | "Shipper" | "Public Builder" | "Operator";
};

export type RecentProof = {
	id: string;
	title: string;
	text: string;
	status: "shipped" | "posted" | "frozen";
};

export type StatIconName = ComponentProps<typeof Icon>["name"];
