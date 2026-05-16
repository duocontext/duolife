import { Host, OutlinedButton, Text } from "@expo/ui/jetpack-compose";
import { width } from "@expo/ui/jetpack-compose/modifiers";
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
		<Host matchContents style={{ width: 92, height: 44 }}>
			<OutlinedButton
				onClick={onPress}
				contentPadding={{ start: 14, end: 14, top: 8, bottom: 8 }}
				colors={{ contentColor: colors.text }}
				modifiers={[width(92)]}
			>
				<Text color={colors.text} style={{ fontSize: 14, fontWeight: "700" }}>
					{isViewingArchive ? "Proofs" : "Archive"}
				</Text>
			</OutlinedButton>
		</Host>
	);
}
