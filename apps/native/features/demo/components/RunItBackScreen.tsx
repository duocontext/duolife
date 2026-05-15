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
} from "@/components/game-ui";
import { FAILURE_REASONS } from "../data";
import type { Mission } from "../types";

type RunItBackScreenProps = {
	blockerNote: string;
	canFreeze: boolean;
	mission: Mission;
	selectedBlocker: string;
	onBack: () => void;
	onChangeBlockerNote: (value: string) => void;
	onFreezeStreak: () => void;
	onRunItBack: () => void;
	onSelectBlocker: (reason: string) => void;
};

export function RunItBackScreen({
	blockerNote,
	canFreeze,
	mission,
	selectedBlocker,
	onBack,
	onChangeBlockerNote,
	onFreezeStreak,
	onRunItBack,
	onSelectBlocker,
}: RunItBackScreenProps) {
	return (
		<GameScreen>
			<ScreenHeader
				title="Mission froze"
				eyebrow={mission.title}
				onBack={onBack}
			/>

			<GameCard accent="red">
				<Text
					className="font-extrabold text-xl"
					style={{ color: lifeColors.text }}
				>
					You did not ship proof in time.
				</Text>
				<Text
					className="font-bold text-base"
					style={{ color: lifeColors.text }}
				>
					Upload failure proof to protect your streak, or run it back now.
				</Text>
			</GameCard>

			<GameCard accent="orange">
				<View className="gap-3">
					<SectionLabel>What blocked you?</SectionLabel>
					<View className="flex-row flex-wrap gap-2">
						{FAILURE_REASONS.map((reason) => (
							<ChoiceChip
								accent="orange"
								key={reason}
								label={reason}
								selected={selectedBlocker === reason}
								onPress={() => onSelectBlocker(reason)}
							/>
						))}
					</View>
				</View>

				<View className="gap-3">
					<SectionLabel>One sentence. What blocked you?</SectionLabel>
					<GameInput
						value={blockerNote}
						onChangeText={onChangeBlockerNote}
						placeholder="Scope was too big, so I need a screenshot-only proof."
						multiline
					/>
				</View>
			</GameCard>

			<GameButton
				accent="orange"
				label="Freeze Streak"
				disabled={!canFreeze}
				onPress={onFreezeStreak}
			/>
			<GameButton
				accent="red"
				variant="secondary"
				label="Run It Back"
				onPress={onRunItBack}
			/>
		</GameScreen>
	);
}
