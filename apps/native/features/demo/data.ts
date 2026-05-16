import type { GeneratedPost, GoalType, IdentityType, ProofType } from "./types";

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
	"Video/demo",
	"Notes",
	"Link",
	"Other",
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
	"screenshot/demo clip",
	"notes or solved problem",
	"uploaded post or draft",
	"link to the shipped artifact",
];

export const FAILURE_REASONS = [
	"Scope too big",
	"Got distracted",
	"Technical issue",
	"Did not know next step",
	"Energy crash",
	"Other",
];

export function buildGeneratedPosts(input: {
	missionTitle: string;
	proofType: ProofType;
	lesson?: string;
	identityType: string;
	goal: string;
}): GeneratedPost[] {
	const identity = input.identityType || "student founder";
	const goal = input.goal || "building in public";
	const receipt = input.proofType.toLowerCase();
	const lesson = input.lesson?.trim();
	const lessonLine = lesson ? ` Lesson: ${lesson}.` : "";

	return [
		{
			id: "x",
			platform: "X post",
			text: `Shipped proof today: ${input.missionTitle}. Receipt: ${receipt}.${lessonLine} Small loop, real evidence, back tomorrow.`,
		},
		{
			id: "story",
			platform: "Instagram story",
			text: `Locked in on ${input.missionTitle}. Proof captured as ${receipt}. Momentum claimed next.`,
		},
		{
			id: "reel",
			platform: "TikTok/Reel hook",
			text: `I gave myself one mission today: ${input.missionTitle}. Here is the ${receipt} that proves it.`,
		},
		{
			id: "short",
			platform: "YouTube Short hook",
			text: `Day in the life of a ${identity}: one mission, one proof target, one shipped result.`,
		},
		{
			id: "doha",
			platform: "Student founder in Doha",
			text: `Building toward ${goal} from Doha. Today's proof: ${input.missionTitle}. Receipt: ${receipt}.${lessonLine}`,
		},
	];
}
