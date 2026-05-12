import { Pressable, ScrollView, Text, View } from "react-native";
import type { CaptureNote, PlayerStats, Quest } from "../types";
import { CaptureBar } from "./CaptureBar";
import { CapturedNotes } from "./CapturedNotes";
import { PlayerHeader } from "./PlayerHeader";
import { QuestCard } from "./QuestCard";
import { TimerCard } from "./TimerCard";

type QuestHomeScreenProps = {
	captureNotes: CaptureNote[];
	quest: Quest;
	stats: PlayerStats;
	onBack: () => void;
	onCapturePress: () => void;
	onLockIn: () => void;
};

export function QuestHomeScreen({
	captureNotes,
	quest,
	stats,
	onBack,
	onCapturePress,
	onLockIn,
}: QuestHomeScreenProps) {
	const isRunning = quest.status === "running";

	return (
		<View className="flex-1">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerClassName="gap-5 pb-8 pt-4"
			>
				<Pressable onPress={onBack} hitSlop={24}>
					<Text className="text-foreground text-lg">← Back</Text>
				</Pressable>

				<PlayerHeader stats={stats} />
				<QuestCard quest={quest} />
				<TimerCard isRunning={isRunning} quest={quest} onLockIn={onLockIn} />
				<CapturedNotes notes={captureNotes} />
			</ScrollView>

			<CaptureBar onPress={onCapturePress} />
		</View>
	);
}
