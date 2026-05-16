import { Text } from "react-native";
import {
	GameCard,
	GameScreen,
	ScreenHeader,
	useLifeTheme,
} from "@/components/game-ui";
import type { DemoGameValue } from "../DemoGameProvider";
import { LockInSprintScreen } from "./LockInSprintScreen";
import { MissionBuilderScreen } from "./MissionBuilderScreen";
import { PostFromProofScreen } from "./PostFromProofScreen";
import { ProofUploadScreen } from "./ProofUploadScreen";
import { QuestHomeScreen } from "./QuestHomeScreen";
import { RunItBackScreen } from "./RunItBackScreen";

type TodayDemoScreenProps = {
	game: DemoGameValue;
	onExit: () => void;
	onStopSprint: () => void;
	onViewProofHistory: () => void;
};

export function TodayDemoScreen({
	game,
	onExit,
	onStopSprint,
	onViewProofHistory,
}: TodayDemoScreenProps) {
	const { colors } = useLifeTheme();

	if (!game.isHydrated) {
		return (
			<GameScreen>
				<ScreenHeader title="Today" eyebrow="Loading local demo" />
				<GameCard>
					<Text className="font-bold" style={{ color: colors.subtext }}>
						Loading saved mission state.
					</Text>
				</GameCard>
			</GameScreen>
		);
	}

	if (game.todayMode === "mission-builder") {
		return (
			<MissionBuilderScreen
				canSave={game.missionCanSave}
				confirmLabel="Lock In"
				isVagueMission={game.missionIsVague}
				missionTitle={game.missionTitle}
				proofTarget={game.proofTarget}
				timeboxMinutes={game.timeboxMinutes}
				onBack={game.resetTodayMode}
				onChangeMissionTitle={game.setMissionTitle}
				onSave={game.saveMissionAndLockIn}
				onSelectTimebox={game.setTimeboxMinutes}
			/>
		);
	}

	if (game.todayMode === "sprint" && game.mission) {
		return (
			<LockInSprintScreen
				mission={game.mission}
				remainingSeconds={game.remainingSeconds}
				onBack={game.resetTodayMode}
				onStopSprint={onStopSprint}
				onUploadProof={() => game.setTodayMode("proof-upload")}
			/>
		);
	}

	if (game.todayMode === "proof-upload" && game.mission) {
		return (
			<ProofUploadScreen
				canSubmit={game.proofCanSubmit}
				mission={game.mission}
				proofType={game.proofType}
				onBack={() =>
					game.setTodayMode(
						game.mission?.status === "active" ? "sprint" : "home",
					)
				}
				onSelectProofType={game.setProofType}
				onSubmit={game.submitProof}
			/>
		);
	}

	if (game.todayMode === "post-proof" && game.proof) {
		return (
			<PostFromProofScreen
				generatedPosts={game.generatedPosts}
				postState={game.postState}
				proof={game.proof}
				selectedPostId={game.selectedPostId}
				onBack={game.resetTodayMode}
				onChangeLesson={game.setPostLesson}
				onCopyPost={game.copyPost}
				onMarkPosted={() => {
					game.markPosted();
					onViewProofHistory();
				}}
				onSelectPost={game.setSelectedPostId}
			/>
		);
	}

	if (game.todayMode === "run-it-back" && game.mission) {
		return (
			<RunItBackScreen
				blockerNote={game.blockerNote}
				canFreeze={game.canFreeze}
				mission={game.mission}
				selectedBlocker={game.selectedBlocker}
				onBack={game.resetTodayMode}
				onChangeBlockerNote={game.setBlockerNote}
				onFreezeStreak={game.freezeStreak}
				onRunItBack={game.runItBack}
				onSelectBlocker={game.setSelectedBlocker}
			/>
		);
	}

	return (
		<QuestHomeScreen
			mission={game.mission}
			proof={game.proof}
			remainingSeconds={game.remainingSeconds}
			stats={game.stats}
			onBack={onExit}
			onBuildMission={game.openMissionBuilder}
			onBuildNextMission={game.buildNextMission}
			onContinueSprint={() => game.setTodayMode("sprint")}
			onEditMission={game.openMissionBuilder}
			onLockIn={game.lockIn}
			onPostFromProof={() => game.setTodayMode("post-proof")}
			onRunItBack={() => game.setTodayMode("run-it-back")}
			onShrinkMission={game.shrinkMission}
			onUploadProof={() => game.setTodayMode("proof-upload")}
		/>
	);
}
