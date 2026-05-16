import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import {
	type AccentName,
	GameButton,
	GameCard,
	GameInput,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	StatusPill,
	useLifeTheme,
} from "@/components/game-ui";
import { GOAL_OPTIONS, IDENTITY_OPTIONS, PROOF_TYPE_OPTIONS } from "../data";
import type { GoalType, IdentityType, ProofType, SetupContext } from "../types";
import {
	AnimatedChoiceCard,
	choiceFeedbackDelayMs,
	StepProgressDots,
	StepTransition,
} from "./DuolingoMotion";

type OnboardingStep = "identity" | "goal" | "proof" | "confirm";

type OnboardingScreenProps = {
	canContinue: boolean;
	setup: SetupContext;
	onBack: () => void;
	onContinue: () => void;
	onUpdateSetup: (patch: Partial<SetupContext>) => void;
};

export function OnboardingScreen({
	canContinue,
	setup,
	onBack,
	onContinue,
	onUpdateSetup,
}: OnboardingScreenProps) {
	const [step, setStep] = useState<OnboardingStep>("identity");
	const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const { colors } = useLifeTheme();
	const selectedIdentity = getIdentityLabel(setup);
	const selectedGoal = getGoalLabel(setup);
	const selectedProofType = setup.preferredProofTypes[0] ?? "";
	const currentStep = steps.findIndex((item) => item.key === step) + 1;

	useEffect(() => {
		return () => {
			if (stepTimerRef.current) {
				clearTimeout(stepTimerRef.current);
			}
		};
	}, []);

	const clearPendingStepChange = () => {
		if (stepTimerRef.current) {
			clearTimeout(stepTimerRef.current);
			stepTimerRef.current = null;
		}
	};

	const goToStep = (nextStep: OnboardingStep) => {
		clearPendingStepChange();

		if (nextStep === step) {
			return;
		}

		setStep(nextStep);
	};

	const goToStepAfterFeedback = (nextStep: OnboardingStep) => {
		clearPendingStepChange();
		stepTimerRef.current = setTimeout(() => {
			goToStep(nextStep);
		}, choiceFeedbackDelayMs);
	};

	const handleBack = () => {
		const stepIndex = steps.findIndex((item) => item.key === step);

		if (stepIndex > 0) {
			goToStep(steps[stepIndex - 1].key);
			return;
		}

		onBack();
	};

	const selectIdentity = (identityType: IdentityType) => {
		onUpdateSetup({ identityType });

		if (identityType !== "Custom") {
			goToStepAfterFeedback("goal");
		}
	};

	const selectGoal = (goal: GoalType) => {
		onUpdateSetup({ goal });

		if (goal !== "Custom") {
			goToStepAfterFeedback("proof");
		}
	};

	const selectProofType = (proofType: ProofType) => {
		onUpdateSetup({ preferredProofTypes: [proofType] });
		goToStepAfterFeedback("confirm");
	};

	return (
		<GameScreen>
			<ScreenHeader
				title="Build your first mission."
				eyebrow={`Step ${currentStep} of ${steps.length}`}
				onBack={handleBack}
			/>

			<StepProgressDots activeStep={step} steps={steps} />

			<View className="gap-4">
				<StepTransition stepKey={step}>
					{step === "identity" ? (
						<StepCard
							accent="green"
							kicker="Identity"
							title="What are you trying to become?"
							subtitle="Pick the role this app should push you toward."
						>
							{IDENTITY_OPTIONS.map((option) => (
								<AnimatedChoiceCard
									key={option}
									label={option}
									selected={setup.identityType === option}
									onPress={() => selectIdentity(option)}
								/>
							))}
							{setup.identityType === "Custom" ? (
								<View className="gap-3">
									<GameInput
										value={setup.customIdentity}
										onChangeText={(customIdentity) =>
											onUpdateSetup({ customIdentity })
										}
										placeholder="Student founder in Doha"
									/>
									<GameButton
										label="Next"
										disabled={setup.customIdentity.trim().length === 0}
										onPress={() => goToStep("goal")}
									/>
								</View>
							) : null}
						</StepCard>
					) : null}

					{step === "goal" ? (
						<StepCard
							accent="blue"
							kicker="Target"
							title="What are you building toward right now?"
							subtitle="Choose one direction. The mission builder will make it smaller next."
						>
							{GOAL_OPTIONS.map((option) => (
								<AnimatedChoiceCard
									accent="blue"
									key={option}
									label={option}
									selected={setup.goal === option}
									onPress={() => selectGoal(option)}
								/>
							))}
							{setup.goal === "Custom" ? (
								<View className="gap-3">
									<GameInput
										value={setup.customGoal}
										onChangeText={(customGoal) => onUpdateSetup({ customGoal })}
										placeholder="Ship the first paid MVP"
									/>
									<GameButton
										label="Next"
										disabled={setup.customGoal.trim().length === 0}
										onPress={() => goToStep("proof")}
									/>
								</View>
							) : null}
						</StepCard>
					) : null}

					{step === "proof" ? (
						<StepCard
							accent="green"
							kicker="Proof"
							title="What proof can you ship fastest?"
							subtitle="Pick one evidence type for the first mission."
						>
							<View className="flex-row flex-wrap gap-2">
								{PROOF_TYPE_OPTIONS.map((option) => (
									<AnimatedChoiceCard
										accent="blue"
										key={option}
										label={option}
										selected={selectedProofType === option}
										variant="pill"
										onPress={() => selectProofType(option)}
									/>
								))}
							</View>
						</StepCard>
					) : null}

					{step === "confirm" ? (
						<GameCard accent="green">
							<View className="gap-5">
								<View className="gap-2">
									<StatusPill
										accent="blue"
										icon="shield-checkmark-outline"
										label="Confirm your loop"
									/>
									<Text
										className="font-extrabold text-2xl"
										style={{ color: colors.text }}
									>
										Ready to build today's mission?
									</Text>
									<Text className="font-bold" style={{ color: colors.subtext }}>
										Duolife will turn this into one mission, one proof target,
										and one shipping loop.
									</Text>
								</View>
								<View className="gap-3">
									<SummaryRow
										label="You are becoming"
										value={selectedIdentity}
									/>
									<SummaryRow
										label="You are building toward"
										value={selectedGoal}
									/>
									<SummaryRow
										label="First proof type"
										value={selectedProofType}
									/>
								</View>
								<GameButton
									label="Create Today's Mission"
									disabled={!canContinue}
									onPress={onContinue}
								/>
							</View>
						</GameCard>
					) : null}
				</StepTransition>
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
	const { colors } = useLifeTheme();

	return (
		<GameCard accent={accent}>
			<View className="gap-1">
				<SectionLabel>{kicker}</SectionLabel>
				<Text
					className="font-extrabold text-2xl"
					style={{ color: colors.text }}
				>
					{title}
				</Text>
				<Text className="font-bold" style={{ color: colors.subtext }}>
					{subtitle}
				</Text>
			</View>
			{children}
		</GameCard>
	);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
	const { colors } = useLifeTheme();

	return (
		<View
			className="rounded-[18px] border-2 p-4"
			style={{
				backgroundColor: colors.card,
				borderColor: colors.line,
			}}
		>
			<Text
				className="font-extrabold text-xs uppercase"
				style={{ color: colors.subtext }}
			>
				{label}
			</Text>
			<Text
				className="mt-1 font-extrabold text-lg"
				style={{ color: colors.text }}
			>
				{value || "Not picked yet"}
			</Text>
		</View>
	);
}

function getIdentityLabel(setup: SetupContext) {
	if (setup.identityType === "Custom") {
		return setup.customIdentity.trim();
	}

	return setup.identityType;
}

function getGoalLabel(setup: SetupContext) {
	if (setup.goal === "Custom") {
		return setup.customGoal.trim();
	}

	return setup.goal;
}

const steps: { key: OnboardingStep; label: string }[] = [
	{ key: "identity", label: "Identity" },
	{ key: "goal", label: "Goal" },
	{ key: "proof", label: "Proof" },
	{ key: "confirm", label: "Confirm" },
];
