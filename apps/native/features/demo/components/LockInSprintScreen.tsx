import { Text, View } from "react-native";
import {
	GameButton,
	GameCard,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	StatusPill,
	useLifeTheme,
} from "@/components/game-ui";
import { Icon } from "@/components/icon";
import type { Mission } from "../types";

type LockInSprintScreenProps = {
	mission: Mission;
	remainingSeconds: number;
	onBack: () => void;
	onShrinkMission: () => void;
	onUploadProof: () => void;
};

export function LockInSprintScreen({
	mission,
	remainingSeconds,
	onBack,
	onShrinkMission,
	onUploadProof,
}: LockInSprintScreenProps) {
	const isFinalMinute = remainingSeconds <= 60;
	const minutes = Math.floor(remainingSeconds / 60);
	const seconds = String(remainingSeconds % 60).padStart(2, "0");
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader
				title="Lock-In Sprint"
				eyebrow={mission.title}
				onBack={onBack}
				right={
					<StatusPill
						accent={isFinalMinute ? "red" : "orange"}
						icon="stopwatch-outline"
						label="Active"
					/>
				}
			/>

			<GameCard accent={isFinalMinute ? "red" : "orange"}>
				<View className="items-center gap-3 py-4">
					<Text
						className="font-black text-7xl"
						style={{ color: isFinalMinute ? colors.red : colors.text }}
					>
						{minutes}:{seconds}
					</Text>
					<Text
						className="font-extrabold text-lg"
						style={{ color: colors.text }}
					>
						left
					</Text>
				</View>
			</GameCard>

			<GameCard accent="blue">
				<View className="flex-row items-start gap-3">
					<View
						className="h-12 w-12 items-center justify-center rounded-full"
						style={{ backgroundColor: colors.proofBlueSoft }}
					>
						<Icon name="camera-outline" size={24} color={colors.proofBlue} />
					</View>
					<View className="flex-1 gap-2">
						<SectionLabel>Proof Due</SectionLabel>
						<Text
							className="font-extrabold text-xl"
							style={{ color: colors.text }}
						>
							{mission.proofTarget}
						</Text>
						<StatusPill accent="orange" label="Not shipped yet" />
					</View>
				</View>
			</GameCard>

			<GameCard>
				<Text className="font-bold text-base" style={{ color: colors.text }}>
					Proof is still due. Keep it tiny and ship.
				</Text>
			</GameCard>

			<GameButton accent="blue" label="Upload Proof" onPress={onUploadProof} />
			<GameButton
				accent="orange"
				variant="secondary"
				label="Shrink Mission"
				onPress={onShrinkMission}
			/>
		</GameScreen>
	);
}
