import { useEffect, useMemo, useState } from "react";
import { buildGeneratedPosts, STARTER_STATS } from "./data";
import type {
	GeneratedPost,
	Mission,
	MvpScreen,
	PlayerStats,
	PostState,
	Proof,
	ProofType,
	RecentProof,
	SetupContext,
} from "./types";

const EMPTY_SETUP: SetupContext = {
	identityType: "",
	goal: "",
	preferredProofTypes: [],
	customIdentity: "",
	customGoal: "",
};

const DEFAULT_MISSION_TITLE = "Build Duolife onboarding";
const DEFAULT_PROOF_TARGET =
	"Upload a 10-second screen recording of the onboarding flow.";

function nowId(prefix: string) {
	return `${prefix}-${Date.now()}`;
}

function isVagueMission(title: string) {
	const normalized = title.trim().toLowerCase();

	return (
		normalized.length > 0 &&
		(normalized.split(/\s+/).length < 3 ||
			["work on duolife", "work on app", "build startup"].includes(normalized))
	);
}

function getRank(stats: PlayerStats): PlayerStats["rank"] {
	if (stats.currentPostStreak >= 7) {
		return "Operator";
	}

	if (stats.currentPostStreak >= 3) {
		return "Public Builder";
	}

	if (stats.currentShipStreak >= 4) {
		return "Shipper";
	}

	return "Locked-In Rookie";
}

export function useDemoGame() {
	const [screen, setScreen] = useState<MvpScreen>("onboarding");
	const [setup, setSetup] = useState<SetupContext>(EMPTY_SETUP);
	const [mission, setMission] = useState<Mission | null>(null);
	const [missionTitle, setMissionTitle] = useState(DEFAULT_MISSION_TITLE);
	const [proofTarget, setProofTarget] = useState(DEFAULT_PROOF_TARGET);
	const [timeboxMinutes, setTimeboxMinutes] = useState(60);
	const [remainingSeconds, setRemainingSeconds] = useState(60 * 60);
	const [proofType, setProofType] = useState<ProofType>("Video");
	const [proofContent, setProofContent] = useState("");
	const [reflection, setReflection] = useState("");
	const [proof, setProof] = useState<Proof | null>(null);
	const [postState, setPostState] = useState<PostState | null>(null);
	const [selectedPostId, setSelectedPostId] = useState("x");
	const [stats, setStats] = useState<PlayerStats>(STARTER_STATS);
	const [selectedBlocker, setSelectedBlocker] = useState("");
	const [blockerNote, setBlockerNote] = useState("");
	const [recentProof, setRecentProof] = useState<RecentProof[]>([
		{
			id: "recent-1",
			title: "Landing page proof",
			text: "Screenshot plus a public build note.",
			status: "posted",
		},
	]);

	const onboardingComplete =
		Boolean(setup.identityType) &&
		(setup.identityType !== "Custom" ||
			setup.customIdentity.trim().length > 0) &&
		Boolean(setup.goal) &&
		(setup.goal !== "Custom" || setup.customGoal.trim().length > 0) &&
		setup.preferredProofTypes.length > 0;

	const missionIsVague = isVagueMission(missionTitle);
	const missionCanSave =
		missionTitle.trim().length > 0 &&
		proofTarget.trim().length > 0 &&
		timeboxMinutes > 0;
	const proofCanSubmit =
		proofContent.trim().length > 0 && reflection.trim().length > 0;
	const canFreeze = selectedBlocker.length > 0 && blockerNote.trim().length > 0;

	const generatedPosts = useMemo<GeneratedPost[]>(() => {
		if (!mission || !proof) {
			return [];
		}

		return buildGeneratedPosts({
			missionTitle: mission.title,
			proofReflection: proof.reflection,
			identityType:
				setup.identityType === "Custom"
					? setup.customIdentity
					: setup.identityType,
			goal: setup.goal === "Custom" ? setup.customGoal : setup.goal,
		});
	}, [mission, proof, setup]);

	const selectedPost =
		generatedPosts.find((post) => post.id === selectedPostId) ??
		generatedPosts[0] ??
		null;

	useEffect(() => {
		if (screen !== "sprint" || mission?.status !== "active") {
			return;
		}

		if (remainingSeconds <= 0) {
			setScreen("run-it-back");
			return;
		}

		const interval = setInterval(() => {
			setRemainingSeconds((seconds) => Math.max(seconds - 1, 0));
		}, 1000);

		return () => clearInterval(interval);
	}, [mission?.status, remainingSeconds, screen]);

	const updateSetup = (patch: Partial<SetupContext>) => {
		setSetup((current) => ({ ...current, ...patch }));
	};

	const toggleProofType = (type: ProofType) => {
		setSetup((current) => {
			const nextTypes = current.preferredProofTypes.includes(type)
				? current.preferredProofTypes.filter((item) => item !== type)
				: [...current.preferredProofTypes, type];

			return { ...current, preferredProofTypes: nextTypes };
		});
	};

	const continueFromOnboarding = () => {
		if (!onboardingComplete) {
			return;
		}

		setProofType(setup.preferredProofTypes[0] ?? "Video");
		setScreen("mission-builder");
	};

	const openMissionBuilder = () => {
		if (mission) {
			setMissionTitle(mission.title);
			setProofTarget(mission.proofTarget);
			setTimeboxMinutes(mission.timeboxMinutes);
		}

		setScreen("mission-builder");
	};

	const saveMission = () => {
		if (!missionCanSave) {
			return;
		}

		setMission({
			id: mission?.id ?? nowId("mission"),
			title: missionTitle.trim(),
			proofTarget: proofTarget.trim(),
			timeboxMinutes,
			status: "draft",
			createdAt: mission?.createdAt ?? new Date().toISOString(),
		});
		setScreen("today");
	};

	const shrinkMission = () => {
		const smallerProof = "Screenshot of the smallest working proof.";
		const smallerTitle = mission?.title
			? `Small proof: ${mission.title.replace(/^Small proof: /, "")}`
			: "Ship one tiny proof";

		setMissionTitle(smallerTitle);
		setProofTarget(smallerProof);
		setTimeboxMinutes(25);
		setMission((current) =>
			current
				? {
						...current,
						title: smallerTitle,
						proofTarget: smallerProof,
						timeboxMinutes: 25,
						status: current.status === "active" ? "active" : "draft",
					}
				: current,
		);
	};

	const lockIn = () => {
		if (!mission?.proofTarget || !mission.timeboxMinutes) {
			return;
		}

		setMission({
			...mission,
			status: "active",
			startedAt: new Date().toISOString(),
		});
		setRemainingSeconds(mission.timeboxMinutes * 60);
		setScreen("sprint");
	};

	const openProofUpload = () => {
		setScreen("proof-upload");
	};

	const submitProof = () => {
		if (!mission || !proofCanSubmit) {
			return;
		}

		const nextProof: Proof = {
			id: nowId("proof"),
			missionId: mission.id,
			type: proofType,
			content: proofContent.trim(),
			reflection: reflection.trim(),
			createdAt: new Date().toISOString(),
		};

		setProof(nextProof);
		setMission({
			...mission,
			status: "shipped",
			completedAt: new Date().toISOString(),
		});
		setStats((current) => {
			const next = {
				...current,
				currentShipStreak: current.currentShipStreak + 1,
				proofShippedThisWeek: current.proofShippedThisWeek + 1,
			};

			return { ...next, rank: getRank(next) };
		});
		setRecentProof((items) => [
			{
				id: nextProof.id,
				title: mission.title,
				text: nextProof.reflection,
				status: "shipped",
			},
			...items,
		]);
		setSelectedPostId("x");
		setPostState({
			id: nowId("post"),
			missionId: mission.id,
			proofId: nextProof.id,
			selectedPostId: "x",
			copied: false,
			markedPosted: false,
			createdAt: new Date().toISOString(),
		});
		setScreen("post-proof");
	};

	const copyPost = () => {
		if (!postState || !selectedPost) {
			return;
		}

		setPostState({
			...postState,
			selectedPostId: selectedPost.id,
			copied: true,
		});
	};

	const markPosted = () => {
		if (!postState || !proof || !mission) {
			return;
		}

		setPostState({
			...postState,
			selectedPostId,
			copied: true,
			markedPosted: true,
		});
		setStats((current) => {
			const next = {
				...current,
				currentPostStreak: current.currentPostStreak + 1,
			};

			return { ...next, rank: getRank(next) };
		});
		setRecentProof((items) =>
			items.map((item) =>
				item.id === proof.id ? { ...item, status: "posted" } : item,
			),
		);
		setScreen("profile");
	};

	const freezeStreak = () => {
		if (!mission || !canFreeze) {
			return;
		}

		setMission({ ...mission, status: "frozen" });
		setStats((current) => ({
			...current,
			frozenCount: current.frozenCount + 1,
		}));
		setRecentProof((items) => [
			{
				id: nowId("freeze"),
				title: mission.title,
				text: `${selectedBlocker}: ${blockerNote.trim()}`,
				status: "frozen",
			},
			...items,
		]);
		setScreen("profile");
	};

	const runItBack = () => {
		shrinkMission();
		setSelectedBlocker("");
		setBlockerNote("");
		setMission((current) =>
			current
				? {
						...current,
						status: "active",
						startedAt: new Date().toISOString(),
					}
				: current,
		);
		setRemainingSeconds(25 * 60);
		setScreen("sprint");
	};

	const returnToToday = () => {
		setProofContent("");
		setReflection("");
		setSelectedBlocker("");
		setBlockerNote("");
		setScreen("today");
	};

	return {
		blockerNote,
		canFreeze,
		generatedPosts,
		mission,
		missionCanSave,
		missionIsVague,
		missionTitle,
		onboardingComplete,
		postState,
		proof,
		proofCanSubmit,
		proofContent,
		proofTarget,
		proofType,
		recentProof,
		reflection,
		remainingSeconds,
		screen,
		selectedBlocker,
		selectedPost,
		selectedPostId,
		setup,
		stats,
		timeboxMinutes,
		continueFromOnboarding,
		copyPost,
		freezeStreak,
		lockIn,
		markPosted,
		openMissionBuilder,
		openProofUpload,
		returnToToday,
		runItBack,
		saveMission,
		setBlockerNote,
		setMissionTitle,
		setProofContent,
		setProofTarget,
		setProofType,
		setReflection,
		setScreen,
		setSelectedBlocker,
		setSelectedPostId,
		setTimeboxMinutes,
		shrinkMission,
		submitProof,
		toggleProofType,
		updateSetup,
	};
}
