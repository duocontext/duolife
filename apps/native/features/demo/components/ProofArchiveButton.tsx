import { Pressable, Text } from "react-native";
import { useLifeTheme } from "@/components/game-ui";

type ProofArchiveButtonProps = {
	isViewingArchive: boolean;
	onPress: () => void;
};

export function ProofArchiveButton({
	isViewingArchive,
	onPress,
}: ProofArchiveButtonProps) {
	const { colors } = useLifeTheme();

	return (
		<Pressable
			accessibilityRole="button"
			onPress={onPress}
			className="h-11 w-[92px] items-center justify-center rounded-full border"
			style={{ borderColor: colors.line, backgroundColor: colors.card }}
		>
			<Text className="font-bold text-sm" style={{ color: colors.text }}>
				{isViewingArchive ? "Proofs" : "Archive"}
			</Text>
		</Pressable>
	);
}
