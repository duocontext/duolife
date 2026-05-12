import { Pressable, Text, View } from "react-native";
import { Icon } from "@/components/icon";

type CaptureBarProps = {
	onPress: () => void;
};

export function CaptureBar({ onPress }: CaptureBarProps) {
	return (
		<Pressable
			className="flex-row items-center gap-3 rounded-full bg-foreground px-4 py-3"
			onPress={onPress}
		>
			<Icon name="mic-outline" size={20} className="text-background" />
			<Text className="flex-1 text-background/70">
				New idea, proof, or task...
			</Text>
			<View className="h-10 w-10 items-center justify-center rounded-full bg-background">
				<Icon name="add" size={22} className="text-foreground" />
			</View>
		</Pressable>
	);
}
