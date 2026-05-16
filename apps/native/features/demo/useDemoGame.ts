import * as Clipboard from "expo-clipboard";
import * as SecureStore from "expo-secure-store";
import { useEffect, useMemo, useState } from "react";
import { buildGeneratedPosts } from "./data";
import type {
	ActiveTimerState,
	GeneratedPost,
	GeneratedPostSet,
	Mission,
	PlayerStats,
	PostState,
	Proof,
	ProofType,
	TodayMode,
} from "./types";

const STORAGE_KEY = "duolife.demo.mvp.v1";

const DEFAULT_MISSION_TITLE = "Build Duolife onboarding";
const DEFAULT_PROOF_TARGET = "Proof required before this counts.";

type DemoState = {
	onboardingComplete: boolean;
	currentMission: Mission | null;
	activeTimer: ActiveTimerState | null;
	proofHistory: Proof[];
	generatedPostSets: GeneratedPostSet[];
	shipStreak: number;
	postStreak: number;
	frozenCount: number;
	rank: PlayerStats["rank"];
};

const INITIAL_STATE: DemoState = {
	onboardingComplete: false,
	currentMission: null,
	activeTimer: null,
	proofHistory: [],
	generatedPostSets: [],
	shipStreak: 0,
	postStreak: 0,
	frozenCount: 0,
	rank: "Locked-In Rookie",
};

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

function getSuggestedProofType(missionTitle: string): ProofType {
	const normalized = missionTitle.toLowerCase();

	if (
		/lesson|study|notes|problem|exam|quiz|read|course|boot\.?dev/.test(
			normalized,
		)
	) {
		return "Notes";
	}

	if (/post|content|thread|draft|publish|dm|outreach/.test(normalized)) {
		return "Link";
	}

	if (/demo|video|record|walkthrough/.test(normalized)) {
		return "Video/demo";
	}

	return "Screenshot";
}

function getProofTarget(input: { missionTitle: string; proofType: ProofType }) {
	if (input.proofType === "Screenshot") {
		return "Screenshot of the shipped result.";
	}

	if (input.proofType === "Video/demo") {
		return "Short demo clip of the shipped result.";
	}

	if (input.proofType === "Notes") {
		return "Notes or solved problem from the work session.";
	}

	if (input.proofType === "Link") {
		return "Link to the shipped artifact, post, draft, or diff.";
	}

	return `Proof receipt for: ${input.missionTitle}.`;
}

function normalizeProofType(value: unknown): ProofType {
	if (
		value === "Screenshot" ||
		value === "Video/demo" ||
		value === "Notes" ||
		value === "Link" ||
		value === "Other"
	) {
		return value;
	}

	if (value === "Video" || value === "Commit" || value === "Figma") {
		return "Video/demo";
	}

	if (value === "Text" || value === "Voice") {
		return "Notes";
	}

	return "Other";
}

function getRank(input: {
	shipStreak: number;
	postStreak: number;
}): PlayerStats["rank"] {
	if (input.postStreak >= 7) {
		return "Operator";
	}

	if (input.postStreak >= 3) {
		return "Public Builder";
	}

	if (input.shipStreak >= 4) {
		return "Shipper";
	}

	return "Locked-In Rookie";
}

function withRank(state: DemoState): DemoState {
	return {
		...state,
		rank: getRank({
			shipStreak: state.shipStreak,
			postStreak: state.postStreak,
		}),
	};
}

function isThisWeek(isoDate: string) {
	const date = new Date(isoDate).getTime();
	const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

	return Number.isFinite(date) && date >= weekAgo;
}

function migrateState(value: unknown): DemoState {
	if (!value || typeof value !== "object") {
		return INITIAL_STATE;
	}

	const parsed = value as Partial<DemoState>;

	return withRank({
		...INITIAL_STATE,
		...parsed,
		currentMission: parsed.currentMission ?? null,
		activeTimer: parsed.activeTimer ?? null,
		proofHistory: Array.isArray(parsed.proofHistory)
			? parsed.proofHistory.map((proof) => ({
					...proof,
					type: normalizeProofType((proof as Partial<Proof>).type),
				}))
			: [],
		generatedPostSets: Array.isArray(parsed.generatedPostSets)
			? parsed.generatedPostSets
			: [],
		shipStreak: parsed.shipStreak ?? 0,
		postStreak: parsed.postStreak ?? 0,
		frozenCount: parsed.frozenCount ?? 0,
	});
}

function createTimer(mission: Mission, startedAt: Date): ActiveTimerState {
	const expiresAt = new Date(
		startedAt.getTime() + mission.timeboxMinutes * 60 * 1000,
	);

	return {
		missionId: mission.id,
		startedAt: startedAt.toISOString(),
		expiresAt: expiresAt.toISOString(),
		durationSeconds: mission.timeboxMinutes * 60,
	};
}

function createSmallerMission(mission: Mission): Mission {
	const createdAt = new Date().toISOString();

	return {
		...mission,
		id: nowId("mission"),
		status: "draft",
		title: `Small proof: ${mission.title.replace(/^Small proof: /, "")}`,
		proofTarget: "Screenshot of the smallest working proof.",
		timeboxMinutes: 25,
		createdAt,
		startedAt: undefined,
		completedAt: undefined,
		postedAt: undefined,
	};
}

export function useDemoGame() {
	const [isHydrated, setIsHydrated] = useState(false);
	const [todayMode, setTodayMode] = useState<TodayMode>("home");
	const [state, setState] = useState<DemoState>(INITIAL_STATE);
	const [missionTitle, setMissionTitle] = useState(DEFAULT_MISSION_TITLE);
	const [proofTarget, setProofTarget] = useState(DEFAULT_PROOF_TARGET);
	const [timeboxMinutes, setTimeboxMinutes] = useState(60);
	const [proofType, setProofType] = useState<ProofType>(
		getSuggestedProofType(DEFAULT_MISSION_TITLE),
	);
	const [reflection, setReflection] = useState("");
	const [selectedPostId, setSelectedPostId] = useState("x");
	const [selectedBlocker, setSelectedBlocker] = useState("");
	const [blockerNote, setBlockerNote] = useState("");
	const [clockNow, setClockNow] = useState(Date.now());

	const mission = state.currentMission;
	const proof = useMemo(() => {
		if (!mission) {
			return null;
		}

		return (
			state.proofHistory.find((item) => item.missionId === mission.id) ?? null
		);
	}, [mission, state.proofHistory]);

	const currentPostSet = useMemo(() => {
		if (!proof) {
			return null;
		}

		return (
			state.generatedPostSets.find((item) => item.proofId === proof.id) ?? null
		);
	}, [proof, state.generatedPostSets]);

	const generatedPosts = currentPostSet?.posts ?? [];
	const postState: PostState | null = currentPostSet
		? {
				id: currentPostSet.id,
				missionId: currentPostSet.missionId,
				proofId: currentPostSet.proofId,
				selectedPostId: currentPostSet.selectedPostId,
				copied: currentPostSet.copied,
				markedPosted: currentPostSet.markedPosted,
				lesson: currentPostSet.lesson,
				createdAt: currentPostSet.createdAt,
				postedAt: currentPostSet.postedAt,
			}
		: null;

	const selectedPost =
		generatedPosts.find((post) => post.id === selectedPostId) ??
		generatedPosts[0] ??
		null;
	const activeTimer =
		mission?.status === "active" && state.activeTimer?.missionId === mission.id
			? state.activeTimer
			: null;

	const remainingSeconds =
		mission?.status === "active"
			? activeTimer
				? Math.max(
						0,
						Math.ceil(
							(new Date(activeTimer.expiresAt).getTime() - clockNow) / 1000,
						),
					)
				: 0
			: (mission?.timeboxMinutes ?? timeboxMinutes) * 60;

	const missionIsVague = isVagueMission(missionTitle);
	const missionCanSave = missionTitle.trim().length > 0 && timeboxMinutes > 0;
	const proofCanSubmit = Boolean(mission);
	const canFreeze = selectedBlocker.length > 0 && blockerNote.trim().length > 0;

	const stats = useMemo<PlayerStats>(
		() => ({
			currentShipStreak: state.shipStreak,
			currentPostStreak: state.postStreak,
			proofShippedThisWeek: state.proofHistory.filter((item) =>
				isThisWeek(item.createdAt),
			).length,
			frozenCount: state.frozenCount,
			rank: getRank({
				shipStreak: state.shipStreak,
				postStreak: state.postStreak,
			}),
		}),
		[state.frozenCount, state.postStreak, state.proofHistory, state.shipStreak],
	);

	useEffect(() => {
		let cancelled = false;

		async function hydrate() {
			try {
				const stored = await SecureStore.getItemAsync(STORAGE_KEY);

				if (!cancelled && stored) {
					setState(migrateState(JSON.parse(stored)));
				}
			} catch {
				if (!cancelled) {
					setState(INITIAL_STATE);
				}
			} finally {
				if (!cancelled) {
					setIsHydrated(true);
				}
			}
		}

		hydrate();

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (!isHydrated) {
			return;
		}

		SecureStore.setItemAsync(
			STORAGE_KEY,
			JSON.stringify(withRank(state)),
		).catch(() => {});
	}, [isHydrated, state]);

	useEffect(() => {
		if (mission?.status !== "active" || !activeTimer) {
			return;
		}

		const interval = setInterval(() => {
			setClockNow(Date.now());
		}, 1000);

		return () => clearInterval(interval);
	}, [mission?.status, activeTimer]);

	useEffect(() => {
		if (currentPostSet) {
			setSelectedPostId(currentPostSet.selectedPostId);
		}
	}, [currentPostSet]);

	useEffect(() => {
		if (
			!isHydrated ||
			mission?.status !== "active" ||
			!activeTimer ||
			remainingSeconds > 0
		) {
			return;
		}

		setState((current) =>
			withRank({
				...current,
				activeTimer: null,
			}),
		);
		setTodayMode("proof-upload");
	}, [activeTimer, isHydrated, mission?.status, remainingSeconds]);

	const openMissionBuilder = () => {
		if (mission && mission.status !== "posted") {
			setMissionTitle(mission.title);
			setProofTarget(mission.proofTarget);
			setTimeboxMinutes(mission.timeboxMinutes);
		} else {
			setMissionTitle(DEFAULT_MISSION_TITLE);
			setProofTarget(DEFAULT_PROOF_TARGET);
			setTimeboxMinutes(60);
			setProofType(getSuggestedProofType(DEFAULT_MISSION_TITLE));
		}

		setTodayMode("mission-builder");
	};

	const startMission = (
		nextMission: Mission,
		nextProofType: ProofType = proofType,
	) => {
		const startedAt = new Date();

		setProofType(nextProofType);
		setClockNow(startedAt.getTime());

		const activeMission: Mission = {
			...nextMission,
			proofTarget: getProofTarget({
				missionTitle: nextMission.title,
				proofType: nextProofType,
			}),
			status: "active",
			startedAt: startedAt.toISOString(),
		};

		setState((current) =>
			withRank({
				...current,
				onboardingComplete: true,
				currentMission: activeMission,
				activeTimer: createTimer(activeMission, startedAt),
			}),
		);
		setReflection("");
		setTodayMode("sprint");
	};

	const saveMission = () => {
		if (!missionCanSave) {
			return;
		}

		const nextMission: Mission = {
			id:
				mission && mission.status !== "posted" ? mission.id : nowId("mission"),
			title: missionTitle.trim(),
			proofTarget: proofTarget.trim() || DEFAULT_PROOF_TARGET,
			timeboxMinutes,
			status: "draft",
			createdAt:
				mission && mission.status !== "posted"
					? mission.createdAt
					: new Date().toISOString(),
		};

		setState((current) =>
			withRank({
				...current,
				onboardingComplete: true,
				currentMission: nextMission,
				activeTimer: null,
			}),
		);
		setTodayMode("home");
	};

	const saveMissionAndLockIn = () => {
		if (!missionCanSave) {
			return;
		}

		const nextMission: Mission = {
			id:
				mission && mission.status !== "posted" ? mission.id : nowId("mission"),
			title: missionTitle.trim(),
			proofTarget: proofTarget.trim() || DEFAULT_PROOF_TARGET,
			timeboxMinutes,
			status: "draft",
			createdAt:
				mission && mission.status !== "posted"
					? mission.createdAt
					: new Date().toISOString(),
		};

		startMission(nextMission, getSuggestedProofType(nextMission.title));
	};

	const shrinkMission = () => {
		const smallerProof = "Screenshot of the smallest working proof.";
		const smallerTitle = mission?.title
			? `Small proof: ${mission.title.replace(/^Small proof: /, "")}`
			: "Ship one tiny proof";

		setMissionTitle(smallerTitle);
		setProofTarget(smallerProof);
		setTimeboxMinutes(25);
		setState((current) =>
			current.currentMission
				? withRank({
						...current,
						currentMission: {
							...current.currentMission,
							title: smallerTitle,
							proofTarget: smallerProof,
							timeboxMinutes: 25,
						},
					})
				: current,
		);
	};

	const lockIn = () => {
		if (!mission?.timeboxMinutes) {
			return;
		}

		startMission(mission, getSuggestedProofType(mission.title));
	};

	const submitProof = () => {
		if (!mission) {
			return;
		}

		const createdAt = new Date().toISOString();
		const content = `${proofType} captured for "${mission.title}" at ${new Date(
			createdAt,
		).toLocaleTimeString([], {
			hour: "numeric",
			minute: "2-digit",
		})}.`;
		const nextProof: Proof = {
			id: nowId("proof"),
			missionId: mission.id,
			missionTitle: mission.title,
			proofTarget: mission.proofTarget,
			type: proofType,
			content,
			reflection: reflection.trim(),
			createdAt,
		};
		const posts: GeneratedPost[] = buildGeneratedPosts({
			missionTitle: mission.title,
			proofType: nextProof.type,
			lesson: nextProof.reflection,
			identityType: "student founder",
			goal: "building Duolife",
		});

		setSelectedPostId(posts[0]?.id ?? "x");
		setState((current) =>
			withRank({
				...current,
				currentMission: {
					...mission,
					status: "shipped",
					completedAt: createdAt,
				},
				activeTimer: null,
				proofHistory: [nextProof, ...current.proofHistory],
				generatedPostSets: [
					{
						id: nowId("post"),
						missionId: mission.id,
						proofId: nextProof.id,
						selectedPostId: posts[0]?.id ?? "x",
						copied: false,
						markedPosted: false,
						createdAt,
						posts,
					},
					...current.generatedPostSets,
				],
				shipStreak: current.shipStreak + 1,
			}),
		);
		setTodayMode("post-proof");
	};

	const updateCurrentPostSet = (
		updater: (postSet: GeneratedPostSet) => GeneratedPostSet,
	) => {
		if (!currentPostSet) {
			return;
		}

		setState((current) =>
			withRank({
				...current,
				generatedPostSets: current.generatedPostSets.map((item) =>
					item.id === currentPostSet.id ? updater(item) : item,
				),
			}),
		);
	};

	const copyPost = async () => {
		if (!selectedPost) {
			return;
		}

		await Clipboard.setStringAsync(selectedPost.text);

		updateCurrentPostSet((postSet) => ({
			...postSet,
			selectedPostId: selectedPost.id,
			copied: true,
		}));
	};

	const setPostLesson = (value: string) => {
		if (!proof) {
			return;
		}

		updateCurrentPostSet((postSet) => ({
			...postSet,
			lesson: value,
			posts: buildGeneratedPosts({
				missionTitle: proof.missionTitle,
				proofType: proof.type,
				lesson: value,
				identityType: "student founder",
				goal: "building Duolife",
			}),
		}));
	};

	const markPosted = () => {
		if (!mission || !proof || !selectedPost) {
			return;
		}

		const postedAt = new Date().toISOString();

		setState((current) =>
			withRank({
				...current,
				currentMission: {
					...mission,
					status: "posted",
					postedAt,
				},
				proofHistory: current.proofHistory.map((item) =>
					item.id === proof.id ? { ...item, postedAt } : item,
				),
				generatedPostSets: current.generatedPostSets.map((item) =>
					item.proofId === proof.id
						? {
								...item,
								selectedPostId: selectedPost.id,
								copied: true,
								markedPosted: true,
								postedAt,
							}
						: item,
				),
				postStreak: current.postStreak + 1,
			}),
		);
		setTodayMode("home");
	};

	const freezeStreak = () => {
		if (!mission || !canFreeze) {
			return;
		}

		setState((current) =>
			withRank({
				...current,
				currentMission: current.currentMission
					? { ...current.currentMission, status: "frozen" }
					: current.currentMission,
				activeTimer: null,
				frozenCount:
					current.currentMission?.status === "frozen"
						? current.frozenCount
						: current.frozenCount + 1,
			}),
		);
		setTodayMode("home");
	};

	const buildSmallerMissionFromStop = () => {
		if (!mission) {
			return;
		}

		const nextMission = createSmallerMission(mission);

		setMissionTitle(nextMission.title);
		setProofTarget(nextMission.proofTarget);
		setTimeboxMinutes(nextMission.timeboxMinutes);
		setProofType(getSuggestedProofType(nextMission.title));
		setReflection("");
		setState((current) =>
			withRank({
				...current,
				currentMission: nextMission,
				activeTimer: null,
			}),
		);
		setTodayMode("mission-builder");
	};

	const runItBack = () => {
		if (!mission) {
			return;
		}

		const nextMission = createSmallerMission(mission);

		setSelectedBlocker("");
		setBlockerNote("");
		setReflection("");
		startMission(nextMission, getSuggestedProofType(nextMission.title));
	};

	const buildNextMission = () => {
		setState((current) =>
			withRank({
				...current,
				currentMission: null,
				activeTimer: null,
			}),
		);
		setMissionTitle(DEFAULT_MISSION_TITLE);
		setProofTarget(DEFAULT_PROOF_TARGET);
		setTimeboxMinutes(60);
		setProofType(getSuggestedProofType(DEFAULT_MISSION_TITLE));
		setReflection("");
		setTodayMode("mission-builder");
	};

	const archiveProof = (proofId: string) => {
		setState((current) =>
			withRank({
				...current,
				proofHistory: current.proofHistory.map((item) =>
					item.id === proofId
						? { ...item, archivedAt: new Date().toISOString() }
						: item,
				),
			}),
		);
	};

	const restoreProof = (proofId: string) => {
		setState((current) =>
			withRank({
				...current,
				proofHistory: current.proofHistory.map((item) =>
					item.id === proofId ? { ...item, archivedAt: undefined } : item,
				),
			}),
		);
	};

	const resetTodayMode = () => {
		setTodayMode("home");
	};

	return {
		blockerNote,
		canFreeze,
		generatedPosts,
		isHydrated,
		mission,
		missionCanSave,
		missionIsVague,
		missionTitle,
		onboardingComplete: state.onboardingComplete,
		postState,
		proof,
		proofCanSubmit,
		proofHistory: state.proofHistory,
		proofTarget,
		proofType,
		reflection,
		remainingSeconds,
		selectedBlocker,
		selectedPost,
		selectedPostId,
		stats,
		timeboxMinutes,
		todayMode,
		archiveProof,
		buildSmallerMissionFromStop,
		buildNextMission,
		copyPost,
		freezeStreak,
		lockIn,
		markPosted,
		openMissionBuilder,
		resetTodayMode,
		restoreProof,
		runItBack,
		saveMission,
		saveMissionAndLockIn,
		setBlockerNote,
		setMissionTitle,
		setPostLesson,
		setProofTarget,
		setProofType,
		setReflection,
		setSelectedBlocker,
		setSelectedPostId,
		setTimeboxMinutes,
		setTodayMode,
		shrinkMission,
		submitProof,
	};
}
