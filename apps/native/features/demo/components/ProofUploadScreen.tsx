import { Text, View } from "react-native";
import {
	ChoiceChip,
	GameButton,
	GameCard,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	useLifeTheme,
} from "@/components/game-ui";
import { Icon } from "@/components/icon";
import { PROOF_TYPE_OPTIONS } from "../data";
import type { Mission, ProofType } from "../types";

type ProofUploadScreenProps = {
	canSubmit: boolean;
	mission: Mission;
	proofType: ProofType;
	onBack: () => void;
	onSelectProofType: (type: ProofType) => void;
	onSubmit: () => void;
};

export function ProofUploadScreen({
	canSubmit,
	mission,
	proofType,
	onBack,
	onSelectProofType,
	onSubmit,
}: ProofUploadScreenProps) {
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader
				title="Upload Proof"
				eyebrow="Show the receipt"
				onBack={onBack}
			/>

			<GameCard accent="blue">
				<View
					className="gap-2 rounded-[20px] p-4"
					style={{ backgroundColor: colors.proofBlueSoft }}
				>
					<View className="flex-row items-center gap-2">
						<Icon
							name="shield-checkmark-outline"
							size={20}
							color={colors.proofBlue}
						/>
						<SectionLabel>Proof Required</SectionLabel>
					</View>
					<Text
						className="font-extrabold text-lg"
						style={{ color: colors.text }}
					>
						{mission.proofTarget}
					</Text>
				</View>

				<View className="gap-3">
					<SectionLabel>Receipt type</SectionLabel>
					<View className="flex-row flex-wrap gap-2">
						{PROOF_TYPE_OPTIONS.map((option) => (
							<ChoiceChip
								accent="blue"
								key={option}
								label={option}
								selected={proofType === option}
								onPress={() => onSelectProofType(option)}
							/>
						))}
					</View>
				</View>
			</GameCard>

			<GameCard accent="green">
				<Text className="font-extrabold text-xl" style={{ color: colors.text }}>
					One tap saves the artifact.
				</Text>
				<Text className="font-bold" style={{ color: colors.subtext }}>
					Capture the receipt and turn it into a saved proof artifact.
				</Text>
			</GameCard>

			<GameButton
				accent="blue"
				label={`Capture ${proofType}`}
				disabled={!canSubmit}
				onPress={onSubmit}
			/>
		</GameScreen>
	);
}
