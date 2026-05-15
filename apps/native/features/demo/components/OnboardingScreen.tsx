import type { ReactNode } from "react";
import { Text, View } from "react-native";
import {
	ChoiceCard,
	GameButton,
	GameCard,
	GameInput,
	GameScreen,
	lifeColors,
	ScreenHeader,
	SectionLabel,
	StatusPill,
} from "@/components/game-ui";
import { GOAL_OPTIONS, IDENTITY_OPTIONS, PROOF_TYPE_OPTIONS } from "../data";
import type { ProofType, SetupContext } from "../types";

type OnboardingScreenProps = {
	canContinue: boolean;
	setup: SetupContext;
	onBack: () => void;
	onContinue: () => void;
	onToggleProofType: (type: ProofType) => void;
	onUpdateSetup: (patch: Partial<SetupContext>) => void;
};

export function OnboardingScreen({
	canContinue,
	setup,
	onBack,
	onContinue,
	onToggleProofType,
	onUpdateSetup,
}: OnboardingScreenProps) {
	return (
		<GameScreen>
			<ScreenHeader
				title="Ship proof daily."
				eyebrow="Duolife MVP"
				onBack={onBack}
			/>

			<GameCard accent="green">
				<View className="items-center gap-4">
					<View
						className="h-24 w-24 items-center justify-center rounded-full"
						style={{ backgroundColor: lifeColors.greenSoft }}
					>
						<Text className="font-extrabold text-5xl">✓</Text>
					</View>
					<Text
						className="text-center font-bold text-lg"
						style={{ color: lifeColors.text }}
					>
						Pick one mission, lock in, upload evidence, and turn it into
						momentum.
					</Text>
					<StatusPill
						accent="blue"
						icon="shield-checkmark-outline"
						label="Proof beats planning"
					/>
				</View>
			</GameCard>

			<ChoiceSection title="What are you trying to become?">
				{IDENTITY_OPTIONS.map((option) => (
					<ChoiceCard
						key={option}
						label={option}
						selected={setup.identityType === option}
						onPress={() => onUpdateSetup({ identityType: option })}
					/>
				))}
				{setup.identityType === "Custom" ? (
					<GameInput
						value={setup.customIdentity}
						onChangeText={(customIdentity) => onUpdateSetup({ customIdentity })}
						placeholder="Student founder in Doha"
					/>
				) : null}
			</ChoiceSection>

			<ChoiceSection title="What are you building toward right now?">
				{GOAL_OPTIONS.map((option) => (
					<ChoiceCard
						accent="blue"
						key={option}
						label={option}
						selected={setup.goal === option}
						onPress={() => onUpdateSetup({ goal: option })}
					/>
				))}
				{setup.goal === "Custom" ? (
					<GameInput
						value={setup.customGoal}
						onChangeText={(customGoal) => onUpdateSetup({ customGoal })}
						placeholder="Ship the first paid MVP"
					/>
				) : null}
			</ChoiceSection>

			<ChoiceSection title="What kind of proof can you ship?">
				<View className="flex-row flex-wrap gap-2">
					{PROOF_TYPE_OPTIONS.map((option) => (
						<ProofOption
							key={option}
							label={option}
							selected={setup.preferredProofTypes.includes(option)}
							onPress={() => onToggleProofType(option)}
						/>
					))}
				</View>
			</ChoiceSection>

			<GameButton
				label="Create Today's Mission"
				disabled={!canContinue}
				onPress={onContinue}
			/>
		</GameScreen>
	);
}

function ChoiceSection({
	children,
	title,
}: {
	children: ReactNode;
	title: string;
}) {
	return (
		<View className="gap-3">
			<SectionLabel>{title}</SectionLabel>
			{children}
		</View>
	);
}

function ProofOption({
	label,
	selected,
	onPress,
}: {
	label: ProofType;
	selected: boolean;
	onPress: () => void;
}) {
	return (
		<ChoiceCard
			accent="blue"
			icon="camera-outline"
			label={label}
			selected={selected}
			onPress={onPress}
		/>
	);
}
