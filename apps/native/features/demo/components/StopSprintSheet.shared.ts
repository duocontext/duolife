export const STOP_REASONS = [
	"Mission is wrong",
	"Mission is too big",
	"I need to restart smaller",
	"Something urgent came up",
	"I avoided it",
] as const;

export type StopReason = (typeof STOP_REASONS)[number];
export type StopOutcome = "restart-smaller" | "rebuild-smaller" | "avoidance";

export function getStopOutcome(reason: StopReason): StopOutcome {
	if (reason === "I need to restart smaller") {
		return "restart-smaller";
	}

	if (reason === "I avoided it") {
		return "avoidance";
	}

	return "rebuild-smaller";
}
