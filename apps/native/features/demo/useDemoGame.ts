import { useState } from "react";
import { STARTER_QUEST, STARTER_STATS } from "./data";
import type { Platform, PlayerStats, Quest } from "./types";

export function useDemoGame() {
	const [goalText, setGoalText] = useState("Launch my landing page");
	const [platform, setPlatform] = useState<Platform>("X");
	const [quest, setQuest] = useState<Quest>(STARTER_QUEST);
	const [stats] = useState<PlayerStats>(STARTER_STATS);

	const startFirstQuest = () => {
		const goal = goalText.trim() || "ship one visible proof";

		setQuest({
			...STARTER_QUEST,
			id: "first-quest",
			title: `Create proof for ${goal}`,
			description: `Make one small move and share it on ${platform}.`,
		});
	};

	return {
		goalText,
		platform,
		quest,
		stats,
		setGoalText,
		setPlatform,
		startFirstQuest,
	};
}
