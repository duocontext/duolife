import { Button, Host, Text as SwiftText } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize, frame } from "@expo/ui/swift-ui/modifiers";

type ProofArchiveButtonProps = {
	isViewingArchive: boolean;
	onPress: () => void;
};

export function ProofArchiveButton({
	isViewingArchive,
	onPress,
}: ProofArchiveButtonProps) {
	return (
		<Host style={{ width: 92, height: 44 }}>
			<Button
				onPress={onPress}
				modifiers={[
					buttonStyle("glass"),
					controlSize("regular"),
					frame({ width: 92, height: 36 }),
				]}
			>
				<SwiftText>{isViewingArchive ? "Proofs" : "Archive"}</SwiftText>
			</Button>
		</Host>
	);
}
