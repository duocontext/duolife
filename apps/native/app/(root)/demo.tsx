import { useRouter } from "expo-router";
import { View } from "react-native";
import { useLifeTheme } from "@/components/game-ui";
import { LockInSprintScreen } from "@/features/demo/components/LockInSprintScreen";
import { MissionBuilderScreen } from "@/features/demo/components/MissionBuilderScreen";
import { OnboardingScreen } from "@/features/demo/components/OnboardingScreen";
import { PostFromProofScreen } from "@/features/demo/components/PostFromProofScreen";
import { ProfileRankScreen } from "@/features/demo/components/ProfileRankScreen";
import { ProofUploadScreen } from "@/features/demo/components/ProofUploadScreen";
import { QuestHomeScreen } from "@/features/demo/components/QuestHomeScreen";
import { RunItBackScreen } from "@/features/demo/components/RunItBackScreen";
import { useDemoGame } from "@/features/demo/useDemoGame";

export default function DemoRoute() {
	const router = useRouter();
	const game = useDemoGame();
	const { colors } = useLifeTheme();

	return (
		<View
			className="flex-1 px-5 pt-safe pb-safe"
			style={{ backgroundColor: colors.bg }}
		>
			{game.screen === "onboarding" ? (
				<OnboardingScreen
					canContinue={game.onboardingComplete}
					setup={game.setup}
					onBack={() => router.back()}
					onContinue={game.continueFromOnboarding}
					onUpdateSetup={game.updateSetup}
				/>
			) : null}

			{game.screen === "mission-builder" ? (
				<MissionBuilderScreen
					canSave={game.missionCanSave}
					isVagueMission={game.missionIsVague}
					missionTitle={game.missionTitle}
					proofTarget={game.proofTarget}
					timeboxMinutes={game.timeboxMinutes}
					onBack={() => game.setScreen(game.mission ? "today" : "onboarding")}
					onChangeMissionTitle={game.setMissionTitle}
					onChangeProofTarget={game.setProofTarget}
					onSave={game.saveMission}
					onSelectTimebox={game.setTimeboxMinutes}
				/>
			) : null}

			{game.screen === "today" ? (
				<QuestHomeScreen
					mission={game.mission}
					stats={game.stats}
					onBack={() => router.back()}
					onBuildMission={game.openMissionBuilder}
					onEditMission={game.openMissionBuilder}
					onLockIn={game.lockIn}
					onShrinkMission={game.shrinkMission}
					onViewProfile={() => game.setScreen("profile")}
				/>
			) : null}

			{game.screen === "sprint" && game.mission ? (
				<LockInSprintScreen
					mission={game.mission}
					remainingSeconds={game.remainingSeconds}
					onBack={() => game.setScreen("today")}
					onShrinkMission={game.shrinkMission}
					onUploadProof={game.openProofUpload}
				/>
			) : null}

			{game.screen === "proof-upload" && game.mission ? (
				<ProofUploadScreen
					canSubmit={game.proofCanSubmit}
					mission={game.mission}
					proofContent={game.proofContent}
					proofType={game.proofType}
					reflection={game.reflection}
					onBack={() => game.setScreen("sprint")}
					onChangeProofContent={game.setProofContent}
					onChangeReflection={game.setReflection}
					onSelectProofType={game.setProofType}
					onSubmit={game.submitProof}
				/>
			) : null}

			{game.screen === "post-proof" && game.mission && game.proof ? (
				<PostFromProofScreen
					generatedPosts={game.generatedPosts}
					mission={game.mission}
					postState={game.postState}
					proof={game.proof}
					selectedPostId={game.selectedPostId}
					onBack={() => game.setScreen("proof-upload")}
					onCopyPost={game.copyPost}
					onMarkPosted={game.markPosted}
					onSelectPost={game.setSelectedPostId}
				/>
			) : null}

			{game.screen === "run-it-back" && game.mission ? (
				<RunItBackScreen
					blockerNote={game.blockerNote}
					canFreeze={game.canFreeze}
					mission={game.mission}
					selectedBlocker={game.selectedBlocker}
					onBack={() => game.setScreen("sprint")}
					onChangeBlockerNote={game.setBlockerNote}
					onFreezeStreak={game.freezeStreak}
					onRunItBack={game.runItBack}
					onSelectBlocker={game.setSelectedBlocker}
				/>
			) : null}

			{game.screen === "profile" ? (
				<ProfileRankScreen
					recentProof={game.recentProof}
					stats={game.stats}
					onBack={() => game.setScreen("today")}
					onReturnToday={game.returnToToday}
				/>
			) : null}
		</View>
	);
}
