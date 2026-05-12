import type { ComponentProps } from "react";
import type { Icon } from "@/components/icon";

export type Platform = "X" | "IG" | "YouTube" | "Personal";

export type QuestStatus = "ready" | "running" | "shipped" | "complete";

export type Quest = {
	id: string;
	title: string;
	description: string;
	proofTarget: string;
	timeboxMinutes: number;
	xp: number;
	status: QuestStatus;
};

export type PlayerStats = {
	level: number;
	xp: number;
	buildStreak: number;
	shareStreak: number;
};

export type CaptureTag = "Idea" | "Task" | "Proof note" | "Content hook";

export type CaptureNote = {
	id: string;
	text: string;
	tag: CaptureTag;
};

export type StatIconName = ComponentProps<typeof Icon>["name"];
