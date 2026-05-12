import { useState } from "react";
import { STARTER_QUEST, STARTER_STATS } from "./data";
import type { Platform, PlayerStats, Quest } from "./types";

export function useDemoGame() {
	const [hasStarted, setHasStarted] = useState(false);
	const [goalText, setGoalText] = useState("Launch my landing page");
	const [platform, setPlatform] = useState<Platform>("X");
	const [quest, setQuest] = useState<Quest>(STARTER_QUEST);
	const [stats, setStats] = useState<PlayerStats>(STARTER_STATS);

	const startFirstQuest = () => {
		const goal = goalText.trim() || "ship one visible proof";

		setQuest({
			...STARTER_QUEST,
			id: "first-quest",
			title: `Create proof for ${goal}`,
			description: `Make one small move and share it on ${platform}.`,
		});
		setHasStarted(true);
	};

	const lockIn = () => {
		setQuest((currentQuest) => ({
			...currentQuest,
			status: "running",
		}));
		setStats((currentStats) => ({
			...currentStats,
			xp: currentStats.xp + 30,
		}));
	};

	return {
		goalText,
		hasStarted,
		platform,
		quest,
		stats,
		lockIn,
		setGoalText,
		setPlatform,
		startFirstQuest,
	};
}
