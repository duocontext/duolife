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
import { MISSION_EXAMPLES, PROOF_EXAMPLES, TIMEBOX_OPTIONS } from "../data";
import {
	AnimatedChoiceCard,
	choiceFeedbackDelayMs,
	StepProgressDots,
	StepTransition,
} from "./DuolingoMotion";

type MissionBuilderStep = "mission" | "proof" | "timebox" | "confirm";

type MissionBuilderScreenProps = {
	canSave: boolean;
	confirmLabel?: string;
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
	confirmLabel = "Save Mission",
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
	const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const { colors } = useLifeTheme();
	const currentStep = steps.findIndex((item) => item.key === step) + 1;
	const canContinueMission = missionTitle.trim().length > 0;
	const canContinueProof = proofTarget.trim().length > 0;

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

	const goToStep = (nextStep: MissionBuilderStep) => {
		clearPendingStepChange();

		if (nextStep === step) {
			return;
		}

		setStep(nextStep);
	};

	const goToStepAfterFeedback = (nextStep: MissionBuilderStep) => {
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

	const selectMissionExample = (example: string) => {
		onChangeMissionTitle(example);
		goToStepAfterFeedback("proof");
	};

	const selectProofExample = (example: string) => {
		onChangeProofTarget(example);
		goToStepAfterFeedback("timebox");
	};

	const selectTimebox = (minutes: number) => {
		onSelectTimebox(minutes);
		goToStepAfterFeedback("confirm");
	};

	return (
		<GameScreen>
			<ScreenHeader
				title="Build Mission"
				eyebrow={`Step ${currentStep} of ${steps.length}`}
				onBack={handleBack}
			/>

			<StepProgressDots activeStep={step} accent="blue" steps={steps} />

			<View className="gap-4">
				<StepTransition stepKey={step}>
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
									<AnimatedChoiceCard
										accent="blue"
										key={example}
										label={example}
										selected={missionTitle === example}
										variant="pill"
										onPress={() => selectMissionExample(example)}
									/>
								))}
							</View>
							{isVagueMission ? (
								<View
									className="gap-1 rounded-[18px] p-4"
									style={{ backgroundColor: colors.orangeSoft }}
								>
									<Text
										className="font-extrabold text-base"
										style={{ color: colors.text }}
									>
										Too vague
									</Text>
									<Text className="font-bold" style={{ color: colors.text }}>
										Try: "Build Today's Mission card. Proof: screenshot of
										working screen."
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
									<AnimatedChoiceCard
										accent="blue"
										key={example}
										label={example}
										selected={proofTarget === example}
										variant="pill"
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
									<AnimatedChoiceCard
										accent="orange"
										key={option}
										label={`${option} min`}
										selected={timeboxMinutes === option}
										variant="pill"
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
										style={{ color: colors.text }}
									>
										Confirm the mission loop.
									</Text>
									<Text className="font-bold" style={{ color: colors.subtext }}>
										This becomes your next lock-in: one mission, one proof
										target, one timer.
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
									label={confirmLabel}
									disabled={!canSave}
									onPress={onSave}
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
