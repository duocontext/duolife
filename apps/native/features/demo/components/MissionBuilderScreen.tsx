import type { ReactNode } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import {
	type AccentName,
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

type MissionBuilderStep = "mission" | "proof" | "timebox" | "confirm";

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
	const [step, setStep] = useState<MissionBuilderStep>("mission");
	const currentStep = steps.findIndex((item) => item.key === step) + 1;
	const canContinueMission = missionTitle.trim().length > 0;
	const canContinueProof = proofTarget.trim().length > 0;

	const goToStep = (nextStep: MissionBuilderStep) => {
		if (nextStep === step) {
			return;
		}

		setStep(nextStep);
	};

	const handleBack = () => {
		const stepIndex = steps.findIndex((item) => item.key === step);

		if (stepIndex > 0) {
			goToStep(steps[stepIndex - 1].key);
			return;
		}

		onBack();
	};

	const selectMissionExample = (example: string) => {
		onChangeMissionTitle(example);
		goToStep("proof");
	};

	const selectProofExample = (example: string) => {
		onChangeProofTarget(example);
		goToStep("timebox");
	};

	const selectTimebox = (minutes: number) => {
		onSelectTimebox(minutes);
		goToStep("confirm");
	};

	return (
		<GameScreen>
			<ScreenHeader
				title="Build Mission"
				eyebrow={`Step ${currentStep} of ${steps.length}`}
				onBack={handleBack}
			/>

			<ProgressDots activeStep={step} />

			<View className="gap-4">
				{step === "mission" ? (
					<StepCard
						accent="blue"
						kicker="Mission"
						title="What will you move forward today?"
						subtitle="Write one concrete thing you can finish today."
					>
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
									onPress={() => selectMissionExample(example)}
								/>
							))}
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
									Try: "Build Today's Mission card. Proof: screenshot of working
									screen."
								</Text>
							</View>
						) : null}
						<GameButton
							accent="blue"
							label="Next"
							disabled={!canContinueMission}
							onPress={() => goToStep("proof")}
						/>
					</StepCard>
				) : null}

				{step === "proof" ? (
					<StepCard
						accent="blue"
						kicker="Proof"
						title="What evidence proves it?"
						subtitle="Name the artifact you will upload when the mission is done."
					>
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
									onPress={() => selectProofExample(example)}
								/>
							))}
						</View>
						<GameButton
							accent="blue"
							label="Next"
							disabled={!canContinueProof}
							onPress={() => goToStep("timebox")}
						/>
					</StepCard>
				) : null}

				{step === "timebox" ? (
					<StepCard
						accent="orange"
						kicker="Timebox"
						title="How long is the lock-in?"
						subtitle="Pick the smallest window that still gives you real proof."
					>
						<View className="flex-row flex-wrap gap-2">
							{TIMEBOX_OPTIONS.map((option) => (
								<ChoiceChip
									accent="orange"
									key={option}
									label={`${option} min`}
									selected={timeboxMinutes === option}
									onPress={() => selectTimebox(option)}
								/>
							))}
						</View>
						<StatusPill
							accent="purple"
							icon="megaphone-outline"
							label="Posting unlocks after proof exists"
						/>
						<GameButton
							accent="orange"
							label="Next"
							onPress={() => goToStep("confirm")}
						/>
					</StepCard>
				) : null}

				{step === "confirm" ? (
					<GameCard accent="blue">
						<View className="gap-5">
							<View className="gap-2">
								<StatusPill
									accent="green"
									icon="checkmark-circle-outline"
									label="Mission ready"
								/>
								<Text
									className="font-extrabold text-2xl"
									style={{ color: lifeColors.text }}
								>
									Confirm the mission loop.
								</Text>
								<Text
									className="font-bold"
									style={{ color: lifeColors.subtext }}
								>
									This becomes your next lock-in: one mission, one proof target,
									one timer.
								</Text>
							</View>
							<View className="gap-3">
								<SummaryRow label="Mission" value={missionTitle} />
								<SummaryRow label="Proof target" value={proofTarget} />
								<SummaryRow
									label="Lock-in timer"
									value={`${timeboxMinutes} minutes`}
								/>
							</View>
							<GameButton
								accent="blue"
								label="Save Mission"
								disabled={!canSave}
								onPress={onSave}
							/>
						</View>
					</GameCard>
				) : null}
			</View>
		</GameScreen>
	);
}

function StepCard({
	accent,
	children,
	kicker,
	subtitle,
	title,
}: {
	accent: AccentName;
	children: ReactNode;
	kicker: string;
	subtitle: string;
	title: string;
}) {
	return (
		<GameCard accent={accent}>
			<View className="gap-1">
				<SectionLabel>{kicker}</SectionLabel>
				<Text
					className="font-extrabold text-2xl"
					style={{ color: lifeColors.text }}
				>
					{title}
				</Text>
				<Text className="font-bold" style={{ color: lifeColors.subtext }}>
					{subtitle}
				</Text>
			</View>
			{children}
		</GameCard>
	);
}

function ProgressDots({ activeStep }: { activeStep: MissionBuilderStep }) {
	return (
		<View className="flex-row gap-2">
			{steps.map((stepItem) => {
				const isActive = stepItem.key === activeStep;

				return (
					<View
						key={stepItem.key}
						className="h-3 flex-1 rounded-full"
						style={{
							backgroundColor: isActive
								? lifeColors.proofBlue
								: lifeColors.line,
						}}
					/>
				);
			})}
		</View>
	);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
	return (
		<View
			className="rounded-[18px] border-2 p-4"
			style={{
				backgroundColor: lifeColors.card,
				borderColor: lifeColors.line,
			}}
		>
			<Text
				className="font-extrabold text-xs uppercase"
				style={{ color: lifeColors.subtext }}
			>
				{label}
			</Text>
			<Text
				className="mt-1 font-extrabold text-lg"
				style={{ color: lifeColors.text }}
			>
				{value || "Not set yet"}
			</Text>
		</View>
	);
}

const steps: { key: MissionBuilderStep; label: string }[] = [
	{ key: "mission", label: "Mission" },
	{ key: "proof", label: "Proof" },
	{ key: "timebox", label: "Timebox" },
	{ key: "confirm", label: "Confirm" },
];
