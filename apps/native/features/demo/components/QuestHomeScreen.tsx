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
import type { Mission, PlayerStats } from "../types";

type QuestHomeScreenProps = {
	mission: Mission | null;
	stats: PlayerStats;
	onBack: () => void;
	onBuildMission: () => void;
	onEditMission: () => void;
	onLockIn: () => void;
	onShrinkMission: () => void;
	onViewProfile: () => void;
};

export function QuestHomeScreen({
	mission,
	stats,
	onBack,
	onBuildMission,
	onEditMission,
	onLockIn,
	onShrinkMission,
	onViewProfile,
}: QuestHomeScreenProps) {
	const canLockIn = Boolean(mission?.proofTarget && mission?.timeboxMinutes);
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader
				title="Today's Mission"
				eyebrow="One proof target"
				onBack={onBack}
				right={<StreakPill streak={stats.currentShipStreak} />}
			/>

			{mission ? (
				<>
					<GameCard accent="green">
						<View className="flex-row items-center justify-between gap-3">
							<StatusPill
								accent={mission.status === "shipped" ? "green" : "blue"}
								icon="flag-outline"
								label={mission.status.toUpperCase()}
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
								<SectionLabel>Proof Required</SectionLabel>
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
								label={`${mission.timeboxMinutes} minutes`}
							/>
							<StatusPill
								accent="purple"
								icon="megaphone-outline"
								label="Post From Proof unlocks after upload"
							/>
						</View>
					</GameCard>

					<GameButton
						label="Lock In"
						disabled={!canLockIn || mission.status === "active"}
						onPress={onLockIn}
					/>

					<View className="flex-row gap-3">
						<View className="flex-1">
							<GameButton
								variant="secondary"
								accent="blue"
								label="Edit Mission"
								onPress={onEditMission}
							/>
						</View>
						<View className="flex-1">
							<GameButton
								variant="secondary"
								accent="orange"
								label="Shrink Mission"
								onPress={onShrinkMission}
							/>
						</View>
					</View>
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

			<GameButton
				variant="secondary"
				accent="gold"
				label="View Profile / Rank"
				onPress={onViewProfile}
			/>
		</GameScreen>
	);
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
