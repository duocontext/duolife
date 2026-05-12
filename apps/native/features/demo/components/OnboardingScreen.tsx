import { Button } from "heroui-native";
import {
	Image,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { PLATFORM_OPTIONS } from "../data";
import type { Platform } from "../types";

type OnboardingScreenProps = {
	goalText: string;
	platform: Platform;
	onBack: () => void;
	onChangeGoal: (goal: string) => void;
	onSelectPlatform: (platform: Platform) => void;
	onStart: () => void;
};

export function OnboardingScreen({
	goalText,
	platform,
	onBack,
	onChangeGoal,
	onSelectPlatform,
	onStart,
}: OnboardingScreenProps) {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerClassName="flex-grow gap-6 pb-8 pt-4"
		>
			<Pressable onPress={onBack} hitSlop={24}>
				<Text className="text-foreground text-lg">← Back</Text>
			</Pressable>

			<View className="flex-1 justify-center gap-6">
				<View className="gap-3">
					<Text className="text-muted text-sm">New run</Text>
					<Text className="font-bold text-4xl text-foreground">
						What are you trying to win this week?
					</Text>
				</View>

				<View className="h-56 w-full overflow-hidden rounded-3xl">
					<Image
						source={require("@/assets/demo.jpeg")}
						className="h-full w-full"
						resizeMode="cover"
					/>
				</View>

				<View className="gap-3 rounded-3xl bg-foreground/10 p-5">
					<Text className="font-bold text-foreground">Goal</Text>
					<TextInput
						className="rounded-2xl bg-background/60 p-4 text-foreground"
						onChangeText={onChangeGoal}
						placeholder="Launch my landing page"
						placeholderTextColor="#737373"
						value={goalText}
					/>
				</View>

				<View className="gap-3 rounded-3xl bg-foreground/10 p-5">
					<Text className="font-bold text-foreground">Main stage</Text>
					<View className="flex-row flex-wrap gap-2">
						{PLATFORM_OPTIONS.map((option) => (
							<PlatformPill
								isSelected={platform === option}
								key={option}
								label={option}
								onPress={() => onSelectPlatform(option)}
							/>
						))}
					</View>
				</View>

				<Button className="w-full" size="lg" onPress={onStart}>
					<Button.Label>Start First Quest</Button.Label>
				</Button>
			</View>
		</ScrollView>
	);
}

function PlatformPill({
	isSelected,
	label,
	onPress,
}: {
	isSelected: boolean;
	label: Platform;
	onPress: () => void;
}) {
	return (
		<Pressable
			className={`rounded-full px-4 py-3 ${
				isSelected ? "bg-foreground" : "bg-background/60"
			}`}
			onPress={onPress}
		>
			<Text className={isSelected ? "text-background" : "text-foreground"}>
				{label}
			</Text>
		</Pressable>
	);
}
