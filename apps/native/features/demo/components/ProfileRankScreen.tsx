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
import type { PlayerStats, RecentProof } from "../types";

type ProfileRankScreenProps = {
	recentProof: RecentProof[];
	stats: PlayerStats;
	onBack: () => void;
	onReturnToday: () => void;
};

export function ProfileRankScreen({
	recentProof,
	stats,
	onBack,
	onReturnToday,
}: ProfileRankScreenProps) {
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader
				title="Khaled"
				eyebrow="Proof-based profile"
				onBack={onBack}
			/>

			<GameCard accent="gold">
				<View className="items-center gap-4 py-3">
					<View
						className="h-24 w-24 items-center justify-center rounded-full"
						style={{ backgroundColor: colors.goldSoft }}
					>
						<Icon name="trophy-outline" size={44} color={colors.goldDark} />
					</View>
					<View className="items-center gap-1">
						<SectionLabel>Current rank</SectionLabel>
						<Text
							className="text-center font-extrabold text-3xl"
							style={{ color: colors.text }}
						>
							{stats.rank}
						</Text>
					</View>
				</View>
			</GameCard>

			<View className="flex-row flex-wrap gap-3">
				<StatCard label="Ship streak" value={`${stats.currentShipStreak}`} />
				<StatCard
					label="Posts from proof"
					value={`${stats.currentPostStreak}`}
				/>
				<StatCard
					label="Proof this week"
					value={`${stats.proofShippedThisWeek}`}
				/>
				<StatCard label="Frozen count" value={`${stats.frozenCount}`} />
			</View>

			<GameCard>
				<View className="gap-3">
					<SectionLabel>Recent proof</SectionLabel>
					{recentProof.map((item) => (
						<View
							key={item.id}
							className="gap-2 rounded-[18px] p-4"
							style={{ backgroundColor: colors.bg }}
						>
							<View className="flex-row items-center justify-between gap-3">
								<Text
									className="flex-1 font-extrabold text-base"
									style={{ color: colors.text }}
								>
									{item.title}
								</Text>
								<StatusPill
									accent={
										item.status === "posted"
											? "purple"
											: item.status === "frozen"
												? "orange"
												: "green"
									}
									label={item.status}
								/>
							</View>
							<Text className="font-bold" style={{ color: colors.subtext }}>
								{item.text}
							</Text>
						</View>
					))}
				</View>
			</GameCard>

			<GameButton label="Return to Today's Mission" onPress={onReturnToday} />
		</GameScreen>
	);
}

function StatCard({ label, value }: { label: string; value: string }) {
	const { colors } = useLifeTheme();

	return (
		<View className="min-w-[47%] flex-1">
			<GameCard className="gap-1" style={{ minHeight: 112 }}>
				<Text
					className="font-extrabold text-3xl"
					style={{ color: colors.text }}
				>
					{value}
				</Text>
				<Text className="font-bold text-sm" style={{ color: colors.subtext }}>
					{label}
				</Text>
			</GameCard>
		</View>
	);
}
