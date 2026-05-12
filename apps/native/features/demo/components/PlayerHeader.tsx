import { Text, View } from "react-native";
import { Icon } from "@/components/icon";
import type { PlayerStats, StatIconName } from "../types";

export function PlayerHeader({ stats }: { stats: PlayerStats }) {
	const xpProgress = `${Math.min(stats.xp, 100)}%` as `${number}%`;

	return (
		<View className="gap-4">
			<View className="flex-row items-center justify-between">
				<View>
					<Text className="text-muted text-sm">Level {stats.level}</Text>
					<Text className="font-bold text-4xl text-foreground">
						Today&apos;s Quest
					</Text>
				</View>
				<View className="h-14 w-14 items-center justify-center rounded-full bg-foreground">
					<Text className="font-bold text-2xl text-background">K</Text>
				</View>
			</View>

			<View className="h-3 overflow-hidden rounded-full bg-foreground/10">
				<View
					className="h-full rounded-full bg-foreground"
					style={{ width: xpProgress }}
				/>
			</View>

			<View className="flex-row gap-3">
				<StatPill
					icon="flame-outline"
					label="Build streak"
					value={`${stats.buildStreak} days`}
				/>
				<StatPill
					icon="megaphone-outline"
					label="Share streak"
					value={`${stats.shareStreak} days`}
				/>
			</View>
		</View>
	);
}

function StatPill({
	icon,
	label,
	value,
}: {
	icon: StatIconName;
	label: string;
	value: string;
}) {
	return (
		<View className="flex-1 flex-row items-center gap-2 rounded-2xl bg-foreground/10 px-4 py-3">
			<Icon name={icon} size={18} className="text-foreground" />
			<View>
				<Text className="font-bold text-foreground">{value}</Text>
				<Text className="text-muted text-xs">{label}</Text>
			</View>
		</View>
	);
}
