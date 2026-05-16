import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
	type AccentName,
	GameCard,
	GameScreen,
	ScreenHeader,
	useLifeTheme,
} from "@/components/game-ui";
import { Icon } from "@/components/icon";
import { LockInSprintScreen } from "@/features/demo/components/LockInSprintScreen";
import { MissionBuilderScreen } from "@/features/demo/components/MissionBuilderScreen";
import { PostFromProofScreen } from "@/features/demo/components/PostFromProofScreen";
import { ProfileRankScreen } from "@/features/demo/components/ProfileRankScreen";
import { ProofHistoryScreen } from "@/features/demo/components/ProofHistoryScreen";
import { ProofUploadScreen } from "@/features/demo/components/ProofUploadScreen";
import { QuestHomeScreen } from "@/features/demo/components/QuestHomeScreen";
import { RunItBackScreen } from "@/features/demo/components/RunItBackScreen";
import type { DemoTab } from "@/features/demo/types";
import { useDemoGame } from "@/features/demo/useDemoGame";

const tabs: {
	key: DemoTab;
	label: string;
	icon: ComponentProps<typeof Icon>["name"];
	accent: AccentName;
}[] = [
	{ key: "today", label: "Today", icon: "flag-outline", accent: "green" },
	{ key: "proof", label: "Proof", icon: "albums-outline", accent: "blue" },
	{ key: "me", label: "Me", icon: "person-circle-outline", accent: "gold" },
];

export default function DemoRoute() {
	const router = useRouter();
	const game = useDemoGame();
	const { colors } = useLifeTheme();
	const [activeTab, setActiveTab] = useState<DemoTab>("today");

	const renderToday = () => {
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
					onChangeProofTarget={game.setProofTarget}
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
					onShrinkMission={game.shrinkMission}
					onUploadProof={() => game.setTodayMode("proof-upload")}
				/>
			);
		}

		if (game.todayMode === "proof-upload" && game.mission) {
			return (
				<ProofUploadScreen
					canSubmit={game.proofCanSubmit}
					mission={game.mission}
					proofContent={game.proofContent}
					proofType={game.proofType}
					reflection={game.reflection}
					onBack={() =>
						game.setTodayMode(
							game.mission?.status === "active" ? "sprint" : "home",
						)
					}
					onChangeProofContent={game.setProofContent}
					onChangeReflection={game.setReflection}
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
					onCopyPost={game.copyPost}
					onMarkPosted={game.markPosted}
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
				onBack={() => router.back()}
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
	};

	return (
		<View
			className="flex-1 px-5 pt-safe pb-safe"
			style={{ backgroundColor: colors.bg }}
		>
			<View className="flex-1">
				{activeTab === "today" ? renderToday() : null}
				{activeTab === "proof" ? (
					<ProofHistoryScreen proofHistory={game.proofHistory} />
				) : null}
				{activeTab === "me" ? (
					<ProfileRankScreen
						proofHistory={game.proofHistory}
						stats={game.stats}
					/>
				) : null}
			</View>

			<View
				className="flex-row gap-2 rounded-[24px] border-2 p-2"
				style={{
					backgroundColor: colors.card,
					borderColor: colors.line,
					borderBottomColor: colors.lineDark,
					borderBottomWidth: 5,
				}}
			>
				{tabs.map((tab) => (
					<ShellTabButton
						key={tab.key}
						active={activeTab === tab.key}
						accent={tab.accent}
						icon={tab.icon}
						label={tab.label}
						onPress={() => setActiveTab(tab.key)}
					/>
				))}
			</View>
		</View>
	);
}

function ShellTabButton({
	active,
	accent,
	icon,
	label,
	onPress,
}: {
	active: boolean;
	accent: AccentName;
	icon: ComponentProps<typeof Icon>["name"];
	label: string;
	onPress: () => void;
}) {
	const { accents, colors } = useLifeTheme();
	const tone = accents[accent];

	return (
		<Pressable
			accessibilityRole="tab"
			accessibilityState={{ selected: active }}
			className="flex-1 items-center justify-center gap-1 rounded-[18px] py-3"
			style={{
				backgroundColor: active ? tone.soft : colors.card,
			}}
			onPress={onPress}
		>
			<Icon
				name={icon}
				size={22}
				color={active ? tone.color : colors.subtext}
			/>
			<Text
				className="font-extrabold text-xs"
				style={{ color: active ? colors.text : colors.subtext }}
			>
				{label}
			</Text>
		</Pressable>
	);
}
