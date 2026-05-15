import { Text, View } from "react-native";
import {
	ChoiceChip,
	GameButton,
	GameCard,
	GameInput,
	GameScreen,
	lifeColors,
	ScreenHeader,
	SectionLabel,
	StatusPill,
} from "@/components/game-ui";
import { MISSION_EXAMPLES, PROOF_EXAMPLES, TIMEBOX_OPTIONS } from "../data";

type MissionBuilderScreenProps = {
	canSave: boolean;
	isVagueMission: boolean;
	missionTitle: string;
	proofTarget: string;
	timeboxMinutes: number;
	onBack: () => void;
	onChangeMissionTitle: (value: string) => void;
	onChangeProofTarget: (value: string) => void;
	onSave: () => void;
	onSelectTimebox: (minutes: number) => void;
};

export function MissionBuilderScreen({
	canSave,
	isVagueMission,
	missionTitle,
	proofTarget,
	timeboxMinutes,
	onBack,
	onChangeMissionTitle,
	onChangeProofTarget,
	onSave,
	onSelectTimebox,
}: MissionBuilderScreenProps) {
	return (
		<GameScreen>
			<ScreenHeader
				title="Build Mission"
				eyebrow="Make it shippable"
				onBack={onBack}
			/>

			<GameCard accent="blue">
				<View className="gap-3">
					<SectionLabel>What will you move forward today?</SectionLabel>
					<GameInput
						value={missionTitle}
						onChangeText={onChangeMissionTitle}
						placeholder="Build onboarding screen"
					/>
					<View className="flex-row flex-wrap gap-2">
						{MISSION_EXAMPLES.map((example) => (
							<ChoiceChip
								accent="blue"
								key={example}
								label={example}
								selected={missionTitle === example}
								onPress={() => onChangeMissionTitle(example)}
							/>
						))}
					</View>
				</View>

				{isVagueMission ? (
					<View
						className="gap-1 rounded-[18px] p-4"
						style={{ backgroundColor: lifeColors.orangeSoft }}
					>
						<Text
							className="font-extrabold text-base"
							style={{ color: lifeColors.text }}
						>
							Too vague
						</Text>
						<Text className="font-bold" style={{ color: lifeColors.text }}>
							Try: “Build Today&apos;s Mission card. Proof: screenshot of
							working screen.”
						</Text>
					</View>
				) : null}
			</GameCard>

			<GameCard accent="blue">
				<View className="gap-3">
					<SectionLabel>What evidence will prove you did it?</SectionLabel>
					<GameInput
						value={proofTarget}
						onChangeText={onChangeProofTarget}
						placeholder="10-second screen recording"
					/>
					<View className="flex-row flex-wrap gap-2">
						{PROOF_EXAMPLES.map((example) => (
							<ChoiceChip
								accent="blue"
								key={example}
								label={example}
								selected={proofTarget === example}
								onPress={() => onChangeProofTarget(example)}
							/>
						))}
					</View>
				</View>
			</GameCard>

			<GameCard>
				<View className="gap-3">
					<SectionLabel>Timebox</SectionLabel>
					<View className="flex-row flex-wrap gap-2">
						{TIMEBOX_OPTIONS.map((option) => (
							<ChoiceChip
								accent="orange"
								key={option}
								label={`${option} min`}
								selected={timeboxMinutes === option}
								onPress={() => onSelectTimebox(option)}
							/>
						))}
					</View>
					<StatusPill
						accent="purple"
						icon="megaphone-outline"
						label="Posting unlocks after proof exists"
					/>
				</View>
			</GameCard>

			<GameButton
				accent="blue"
				label="Save Mission"
				disabled={!canSave}
				onPress={onSave}
			/>
		</GameScreen>
	);
}
