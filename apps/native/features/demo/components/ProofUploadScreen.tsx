import { Text, View } from "react-native";
import {
	ChoiceChip,
	GameButton,
	GameCard,
	GameInput,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	useLifeTheme,
} from "@/components/game-ui";
import { Icon } from "@/components/icon";
import { PROOF_TYPE_OPTIONS } from "../data";
import type { Mission, ProofType } from "../types";
import { ProofArtifactCard } from "./ProofArtifactCard";

type ProofUploadScreenProps = {
	canSubmit: boolean;
	mission: Mission;
	proofContent: string;
	proofType: ProofType;
	reflection: string;
	onBack: () => void;
	onChangeProofContent: (value: string) => void;
	onChangeReflection: (value: string) => void;
	onSelectProofType: (type: ProofType) => void;
	onSubmit: () => void;
};

export function ProofUploadScreen({
	canSubmit,
	mission,
	proofContent,
	proofType,
	reflection,
	onBack,
	onChangeProofContent,
	onChangeReflection,
	onSelectProofType,
	onSubmit,
}: ProofUploadScreenProps) {
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader
				title="Upload Proof"
				eyebrow="Evidence first"
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
					<SectionLabel>Proof type</SectionLabel>
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

			<GameCard>
				<View className="gap-3">
					<SectionLabel>Add proof content</SectionLabel>
					<GameInput
						value={proofContent}
						onChangeText={onChangeProofContent}
						placeholder="Paste a link or describe the uploaded proof"
						multiline
					/>
					{proofContent.trim() ? (
						<ProofArtifactCard
							compact
							framed={false}
							proof={{
								id: "preview",
								missionId: mission.id,
								missionTitle: mission.title,
								proofTarget: mission.proofTarget,
								type: proofType,
								content: proofContent,
								reflection: reflection || "Reflection pending.",
								createdAt: new Date().toISOString(),
							}}
						/>
					) : null}
				</View>
			</GameCard>

			<GameCard>
				<View className="gap-3">
					<SectionLabel>What changed because of this sprint?</SectionLabel>
					<GameInput
						value={reflection}
						onChangeText={onChangeReflection}
						placeholder="Built the first onboarding screen."
						multiline
					/>
					<Text className="font-bold text-sm" style={{ color: colors.subtext }}>
						One sentence. Proof first, reflection second.
					</Text>
				</View>
			</GameCard>

			<GameButton
				accent="blue"
				label="Submit Proof"
				disabled={!canSubmit}
				onPress={onSubmit}
			/>
		</GameScreen>
	);
}
