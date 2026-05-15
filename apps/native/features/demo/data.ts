import type {
	GeneratedPost,
	GoalType,
	IdentityType,
	PlayerStats,
	ProofType,
} from "./types";

export const IDENTITY_OPTIONS: IdentityType[] = [
	"Founder",
	"Creator",
	"Student builder",
	"Engineer",
	"Designer",
	"Custom",
];

export const GOAL_OPTIONS: GoalType[] = [
	"Ship my startup MVP",
	"Grow my audience",
	"Get better at coding",
	"Study consistently",
	"Build a portfolio",
	"Custom",
];

export const PROOF_TYPE_OPTIONS: ProofType[] = [
	"Screenshot",
	"Video",
	"Link",
	"Text",
	"Voice",
	"Commit",
	"Figma",
];

export const TIMEBOX_OPTIONS = [25, 45, 60, 90] as const;

export const MISSION_EXAMPLES = [
	"Build onboarding screen",
	"Fix login bug",
	"Record first demo",
	"DM 5 potential users",
	"Finish lesson notes",
];

export const PROOF_EXAMPLES = [
	"10-second screen recording",
	"screenshot of finished screen",
	"GitHub commit link",
	"public post link",
	"written summary",
	"voice explanation",
];

export const FAILURE_REASONS = [
	"Scope too big",
	"Got distracted",
	"Technical issue",
	"Did not know next step",
	"Energy crash",
	"Other",
];

export const STARTER_STATS: PlayerStats = {
	currentShipStreak: 3,
	currentPostStreak: 2,
	proofShippedThisWeek: 4,
	frozenCount: 1,
	rank: "Locked-In Rookie",
};

export function buildGeneratedPosts(input: {
	missionTitle: string;
	proofReflection: string;
	identityType: string;
	goal: string;
}): GeneratedPost[] {
	const identity = input.identityType || "student founder";
	const goal = input.goal || "building in public";
	const change = input.proofReflection || "moved the product forward";

	return [
		{
			id: "x",
			platform: "X post",
			text: `Shipped proof today: ${input.missionTitle}. ${change}. Small loop, real evidence, back tomorrow.`,
		},
		{
			id: "story",
			platform: "Instagram story",
			text: `Today I locked in on ${input.missionTitle}. Proof shipped. Momentum claimed next.`,
		},
		{
			id: "reel",
			platform: "TikTok/Reel hook",
			text: `I gave myself one proof target today: ${input.missionTitle}. Here is what changed.`,
		},
		{
			id: "short",
			platform: "YouTube Short hook",
			text: `Day in the life of a ${identity}: one mission, one proof target, one shipped result.`,
		},
		{
			id: "doha",
			platform: "Student founder in Doha",
			text: `Building toward ${goal} from Doha. Today's proof: ${input.missionTitle}. ${change}.`,
		},
	];
}
