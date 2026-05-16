import { Text, View } from "react-native";
import {
	GameButton,
	GameCard,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	StatusPill,
	useLifeTheme,
} from "@/components/game-ui";
import { Icon } from "@/components/icon";
import type { Mission, PlayerStats, Proof } from "../types";
import { ProofArtifactCard } from "./ProofArtifactCard";

type QuestHomeScreenProps = {
	mission: Mission | null;
	proof: Proof | null;
	remainingSeconds: number;
	stats: PlayerStats;
	onBack: () => void;
	onBuildMission: () => void;
	onBuildNextMission: () => void;
	onContinueSprint: () => void;
	onEditMission: () => void;
	onLockIn: () => void;
	onPostFromProof: () => void;
	onRunItBack: () => void;
	onShrinkMission: () => void;
	onUploadProof: () => void;
};

export function QuestHomeScreen({
	mission,
	proof,
	remainingSeconds,
	stats,
	onBack,
	onBuildMission,
	onBuildNextMission,
	onContinueSprint,
	onEditMission,
	onLockIn,
	onPostFromProof,
	onRunItBack,
	onShrinkMission,
	onUploadProof,
}: QuestHomeScreenProps) {
	const canLockIn = Boolean(mission?.proofTarget && mission?.timeboxMinutes);
	const minutes = Math.max(0, Math.ceil(remainingSeconds / 60));
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader
				title="Today"
				eyebrow="One mission. One proof."
				onBack={onBack}
				right={<StreakPill streak={stats.currentShipStreak} />}
			/>

			{mission ? (
				<>
					<GameCard
						accent={
							mission.status === "frozen"
								? "red"
								: mission.status === "posted"
									? "gold"
									: mission.status === "shipped"
										? "purple"
										: mission.status === "active"
											? "orange"
											: "green"
						}
					>
						<View className="flex-row items-center justify-between gap-3">
							<StatusPill
								accent={mission.status === "frozen" ? "red" : "blue"}
								icon="flag-outline"
								label={statusLabel(mission.status)}
							/>
							<StatusPill
								accent="gold"
								icon="sparkles-outline"
								label={`Rank: ${stats.rank}`}
							/>
						</View>

						<View className="gap-2">
							<SectionLabel>Mission</SectionLabel>
							<Text
								className="font-extrabold text-3xl"
								style={{ color: colors.text }}
							>
								{mission.title}
							</Text>
						</View>

						<View
							className="gap-2 rounded-[20px] p-4"
							style={{ backgroundColor: colors.proofBlueSoft }}
						>
							<View className="flex-row items-center gap-2">
								<Icon
									name="shield-checkmark-outline"
									size={20}
									color={colors.proofBlue}
								/>
								<SectionLabel>Proof target</SectionLabel>
							</View>
							<Text
								className="font-extrabold text-lg"
								style={{ color: colors.text }}
							>
								{mission.proofTarget}
							</Text>
						</View>

						<View className="flex-row flex-wrap gap-2">
							<StatusPill
								accent="orange"
								icon="stopwatch-outline"
								label={
									mission.status === "active"
										? `${minutes} min left`
										: `${mission.timeboxMinutes} min lock-in`
								}
							/>
							<StatusPill
								accent="purple"
								icon="megaphone-outline"
								label="Post From Proof after upload"
							/>
						</View>
					</GameCard>

					{mission.status === "draft" ? (
						<>
							<GameButton
								label="Lock In"
								disabled={!canLockIn}
								onPress={onLockIn}
							/>
							<View className="flex-row gap-3">
								<View className="flex-1">
									<GameButton
										variant="secondary"
										accent="blue"
										label="Edit"
										onPress={onEditMission}
									/>
								</View>
								<View className="flex-1">
									<GameButton
										variant="secondary"
										accent="orange"
										label="Shrink"
										onPress={onShrinkMission}
									/>
								</View>
							</View>
						</>
					) : null}

					{mission.status === "active" ? (
						<>
							<GameButton
								accent="blue"
								label="Upload Proof"
								onPress={onUploadProof}
							/>
							<GameButton
								accent="orange"
								variant="secondary"
								label="Continue Sprint"
								onPress={onContinueSprint}
							/>
						</>
					) : null}

					{mission.status === "shipped" && proof ? (
						<>
							<ProofArtifactCard compact proof={proof} />
							<GameButton
								accent="purple"
								label="Post From Proof"
								onPress={onPostFromProof}
							/>
						</>
					) : null}

					{mission.status === "posted" ? (
						<GameCard accent="gold">
							<View className="items-center gap-3 py-3">
								<Icon name="trophy-outline" size={42} color={colors.goldDark} />
								<Text
									className="text-center font-extrabold text-2xl"
									style={{ color: colors.text }}
								>
									Run Complete
								</Text>
								<Text
									className="text-center font-bold"
									style={{ color: colors.subtext }}
								>
									Proof shipped and posted. Build the next loop.
								</Text>
							</View>
							<GameButton
								accent="gold"
								label="Build Next Mission"
								onPress={onBuildNextMission}
							/>
						</GameCard>
					) : null}

					{mission.status === "frozen" ? (
						<GameCard accent="red">
							<Text
								className="font-extrabold text-xl"
								style={{ color: colors.text }}
							>
								Run frozen
							</Text>
							<Text className="font-bold" style={{ color: colors.text }}>
								The timer expired before proof shipped.
							</Text>
							<GameButton
								accent="red"
								label="Run It Back"
								onPress={onRunItBack}
							/>
						</GameCard>
					) : null}
				</>
			) : (
				<GameCard accent="green">
					<View className="items-center gap-4 py-8">
						<View
							className="h-24 w-24 items-center justify-center rounded-full"
							style={{ backgroundColor: colors.greenSoft }}
						>
							<Icon name="flag-outline" size={42} color={colors.green} />
						</View>
						<Text
							className="text-center font-extrabold text-2xl"
							style={{ color: colors.text }}
						>
							Pick one mission. Make the proof tiny enough to ship today.
						</Text>
						<GameButton label="Build Mission" onPress={onBuildMission} />
					</View>
				</GameCard>
			)}
		</GameScreen>
	);
}

function statusLabel(status: Mission["status"]) {
	if (status === "shipped") {
		return "PROOF UPLOADED";
	}

	if (status === "posted") {
		return "POSTED";
	}

	if (status === "frozen") {
		return "FROZEN";
	}

	return status.toUpperCase();
}

function StreakPill({ streak }: { streak: number }) {
	const { colors } = useLifeTheme();

	return (
		<View
			className="flex-row items-center gap-2 rounded-full px-4 py-3"
			style={{
				backgroundColor: colors.gold,
				borderBottomColor: colors.goldDark,
				borderBottomWidth: 4,
			}}
		>
			<Icon name="flame-outline" size={20} color={colors.text} />
			<Text className="font-extrabold" style={{ color: colors.text }}>
				{streak}
			</Text>
		</View>
	);
}
