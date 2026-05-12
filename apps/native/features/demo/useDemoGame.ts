import { useState } from "react";
import { STARTER_QUEST, STARTER_STATS } from "./data";
import type {
	CaptureNote,
	CaptureTag,
	Platform,
	PlayerStats,
	Quest,
} from "./types";

export function useDemoGame() {
	const [hasStarted, setHasStarted] = useState(false);
	const [goalText, setGoalText] = useState("Launch my landing page");
	const [platform, setPlatform] = useState<Platform>("X");
	const [quest, setQuest] = useState<Quest>(STARTER_QUEST);
	const [stats, setStats] = useState<PlayerStats>(STARTER_STATS);
	const [isCaptureOpen, setIsCaptureOpen] = useState(false);
	const [captureText, setCaptureText] = useState("");
	const [captureTag, setCaptureTag] = useState<CaptureTag>("Idea");
	const [captureNotes, setCaptureNotes] = useState<CaptureNote[]>([]);

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

	const openCapture = () => setIsCaptureOpen(true);

	const saveCapture = () => {
		const text = captureText.trim();

		if (!text) {
			return;
		}

		setCaptureNotes((notes) => [
			{ id: `${Date.now()}`, tag: captureTag, text },
			...notes,
		]);
		setStats((currentStats) => ({
			...currentStats,
			xp: currentStats.xp + 10,
		}));
		setCaptureText("");
		setIsCaptureOpen(false);
	};

	return {
		captureNotes,
		captureTag,
		captureText,
		goalText,
		hasStarted,
		isCaptureOpen,
		platform,
		quest,
		stats,
		lockIn,
		openCapture,
		saveCapture,
		setCaptureTag,
		setCaptureText,
		setGoalText,
		setIsCaptureOpen,
		setPlatform,
		startFirstQuest,
	};
}
