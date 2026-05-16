import { Text, View } from "react-native";
import {
	GameCard,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	useLifeTheme,
} from "@/components/game-ui";
import { Icon } from "@/components/icon";
import type { PlayerStats, Proof } from "../types";
import { ProofArtifactCard } from "./ProofArtifactCard";

type ProfileRankScreenProps = {
	proofHistory: Proof[];
	stats: PlayerStats;
};

export function ProfileRankScreen({
	proofHistory,
	stats,
}: ProfileRankScreenProps) {
	const { colors } = useLifeTheme();
	const latestProof = proofHistory[0] ?? null;

	return (
		<GameScreen>
			<ScreenHeader title="Me" eyebrow="Proof-based profile" />

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
				<StatCard label="Post streak" value={`${stats.currentPostStreak}`} />
				<StatCard
					label="Proof this week"
					value={`${stats.proofShippedThisWeek}`}
				/>
				<StatCard label="Frozen count" value={`${stats.frozenCount}`} />
			</View>

			<View className="gap-3">
				<SectionLabel>Latest proof</SectionLabel>
				{latestProof ? (
					<ProofArtifactCard compact proof={latestProof} />
				) : (
					<GameCard>
						<Text className="font-bold" style={{ color: colors.subtext }}>
							No proof shipped yet. Your first artifact will show here.
						</Text>
					</GameCard>
				)}
			</View>
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
