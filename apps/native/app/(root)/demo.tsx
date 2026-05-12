import { useRouter } from "expo-router";
import { View } from "react-native";
import { OnboardingScreen } from "@/features/demo/components/OnboardingScreen";
import { QuestHomeScreen } from "@/features/demo/components/QuestHomeScreen";
import { useDemoGame } from "@/features/demo/useDemoGame";

export default function DemoRoute() {
	const router = useRouter();
	const game = useDemoGame();

	return (
		<View className="flex-1 bg-background px-8 pt-safe pb-safe">
			{game.hasStarted ? (
				<QuestHomeScreen
					quest={game.quest}
					stats={game.stats}
					onBack={() => router.back()}
					onCapturePress={() => {}}
					onLockIn={game.lockIn}
				/>
			) : (
				<OnboardingScreen
					goalText={game.goalText}
					platform={game.platform}
					onBack={() => router.back()}
					onChangeGoal={game.setGoalText}
					onSelectPlatform={game.setPlatform}
					onStart={game.startFirstQuest}
				/>
			)}
		</View>
	);
}
