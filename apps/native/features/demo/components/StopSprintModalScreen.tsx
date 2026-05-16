import { router } from "expo-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import {
	GameButton,
	GameCard,
	ScreenHeader,
	useLifeTheme,
} from "@/components/game-ui";
import type { DemoGameValue } from "../DemoGameProvider";
import {
	getStopOutcome,
	STOP_REASONS,
	type StopOutcome,
	type StopReason,
} from "./StopSprintSheet.shared";

type StopSprintModalScreenProps = {
	game: DemoGameValue;
};

export function StopSprintModalScreen({ game }: StopSprintModalScreenProps) {
	const [selectedReason, setSelectedReason] = useState<StopReason | null>(null);
	const [stopOutcome, setStopOutcome] = useState<StopOutcome | null>(null);
	const { colors } = useLifeTheme();

	const dismiss = () => {
		if (router.canGoBack()) {
			router.back();
			return;
		}

		router.replace("/demo/today");
	};

	const endSprint = () => {
		if (!selectedReason) {
			return;
		}

		setStopOutcome(getStopOutcome(selectedReason));
	};

	const completeOutcome = () => {
		if (stopOutcome === "restart-smaller") {
			game.runItBack();
		} else {
			game.buildSmallerMissionFromStop();
		}

		dismiss();
	};

	if (!game.mission || game.mission.status !== "active") {
		return (
			<StopSprintFrame>
				<ScreenHeader title="No active sprint" eyebrow="Nothing to stop" />
				<GameCard>
					<Text className="font-bold text-base" style={{ color: colors.text }}>
						There is no active sprint to stop right now.
					</Text>
				</GameCard>
				<GameButton label="Back to Today" onPress={dismiss} />
			</StopSprintFrame>
		);
	}

	return (
		<StopSprintFrame>
			<ScreenHeader title="Stop this sprint?" onBack={dismiss} />

			{stopOutcome ? (
				<GameCard accent={stopOutcome === "avoidance" ? "red" : "orange"}>
					<Text
						className="font-extrabold text-2xl"
						style={{ color: colors.text }}
					>
						{getOutcomeTitle(stopOutcome)}
					</Text>
					<Text
						className="font-bold text-base"
						style={{ color: colors.subtext }}
					>
						{getOutcomeBody(stopOutcome)}
					</Text>
					<GameButton
						accent={stopOutcome === "avoidance" ? "red" : "orange"}
						label={getOutcomeCta(stopOutcome)}
						onPress={completeOutcome}
					/>
				</GameCard>
			) : (
				<GameCard accent="orange">
					<View className="gap-2">
						<Text
							className="font-extrabold text-base"
							style={{ color: colors.text }}
						>
							Mission: {game.mission.title}
						</Text>
						<Text
							className="font-extrabold text-lg"
							style={{ color: colors.text }}
						>
							This run will not count unless you upload proof.
						</Text>
						<Text
							className="font-bold text-base"
							style={{ color: colors.subtext }}
						>
							Stop only if the mission is wrong, too big, or you are actually
							restarting smaller.
						</Text>
					</View>

					<View className="gap-2">
						<Text
							className="font-extrabold text-lg"
							style={{ color: colors.text }}
						>
							Why are you stopping?
						</Text>
						{STOP_REASONS.map((reason) => (
							<StopReasonRow
								key={reason}
								label={reason}
								selected={selectedReason === reason}
								onPress={() => setSelectedReason(reason)}
							/>
						))}
					</View>

					<GameButton label="Keep Going" onPress={dismiss} />
					<GameButton
						accent="red"
						disabled={!selectedReason}
						label="End Sprint"
						variant="secondary"
						onPress={endSprint}
					/>
				</GameCard>
			)}
		</StopSprintFrame>
	);
}

function getOutcomeTitle(outcome: StopOutcome) {
	if (outcome === "avoidance") {
		return "Run frozen.";
	}

	if (outcome === "restart-smaller") {
		return "Restart smaller.";
	}

	return "Sprint ended.";
}

function getOutcomeBody(outcome: StopOutcome) {
	if (outcome === "restart-smaller") {
		return "Start a fresh smaller sprint now.";
	}

	if (outcome === "avoidance") {
		return "No proof. No streak growth. Build a mission you can actually face.";
	}

	return "No proof. No streak growth. Build a sharper mission.";
}

function getOutcomeCta(outcome: StopOutcome) {
	return outcome === "restart-smaller"
		? "Run It Back"
		: "Build Smaller Mission";
}

function StopSprintFrame({ children }: { children: ReactNode }) {
	const { colors } = useLifeTheme();

	return (
		<View
			style={{ flex: 1, backgroundColor: colors.bg, paddingHorizontal: 20 }}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ gap: 20, paddingBottom: 32, paddingTop: 24 }}
				style={{ flex: 1 }}
			>
				{children}
			</ScrollView>
		</View>
	);
}

function StopReasonRow({
	label,
	selected,
	onPress,
}: {
	label: StopReason;
	selected: boolean;
	onPress: () => void;
}) {
	const { colors } = useLifeTheme();

	return (
		<Pressable
			className="flex-row items-center gap-3 rounded-2xl border-2 p-3"
			onPress={onPress}
			style={{
				backgroundColor: selected ? colors.orangeSoft : colors.card,
				borderColor: selected ? colors.orange : colors.line,
			}}
		>
			<View
				className="h-5 w-5 items-center justify-center rounded-full border-2"
				style={{
					borderColor: selected ? colors.orange : colors.disabled,
				}}
			>
				{selected ? (
					<View
						className="h-2.5 w-2.5 rounded-full"
						style={{ backgroundColor: colors.orange }}
					/>
				) : null}
			</View>
			<Text
				className="flex-1 font-bold text-base"
				style={{ color: colors.text }}
			>
				{label}
			</Text>
		</Pressable>
	);
}
