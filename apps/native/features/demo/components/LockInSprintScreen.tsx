import { Text, View } from "react-native";
import {
	GameButton,
	GameCard,
	GameScreen,
	ScreenHeader,
	useLifeTheme,
} from "@/components/game-ui";
import type { Mission } from "../types";

type LockInSprintScreenProps = {
	mission: Mission;
	remainingSeconds: number;
	onBack: () => void;
	onStopSprint: () => void;
	onUploadProof: () => void;
};

export function LockInSprintScreen({
	mission,
	remainingSeconds,
	onBack,
	onStopSprint,
	onUploadProof,
}: LockInSprintScreenProps) {
	const isFinalMinute = remainingSeconds <= 60;
	const isTimeUp = remainingSeconds <= 0;
	const minutes = Math.floor(remainingSeconds / 60);
	const seconds = String(remainingSeconds % 60).padStart(2, "0");
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader
				title="Today's Mission"
				eyebrow="Active sprint"
				onBack={onBack}
			/>

			<GameCard accent={isFinalMinute ? "red" : "orange"}>
				<View className="gap-3">
					<View
						className="self-start rounded-full px-3 py-2"
						style={{ backgroundColor: colors.orangeSoft }}
					>
						<Text
							className="font-extrabold text-xs uppercase"
							style={{ color: colors.text }}
						>
							Sprint active
						</Text>
					</View>
					<Text
						className="font-extrabold text-3xl"
						style={{ color: colors.text }}
					>
						{mission.title}
					</Text>
					<View
						className="rounded-[20px] border-2 p-4"
						style={{
							backgroundColor: colors.proofBlueSoft,
							borderColor: colors.proofBlue,
						}}
					>
						<Text
							className="font-extrabold text-base"
							style={{ color: colors.text }}
						>
							Proof required before this counts.
						</Text>
					</View>
				</View>

				<View className="items-center gap-2 py-4">
					<Text
						className="font-black text-7xl"
						style={{ color: isFinalMinute ? colors.red : colors.orange }}
					>
						{minutes}:{seconds}
					</Text>
					{isTimeUp ? (
						<Text
							className="font-extrabold text-base"
							style={{ color: colors.red }}
						>
							Time's up. Show proof.
						</Text>
					) : null}
				</View>
			</GameCard>

			<GameButton accent="blue" label="Upload Proof" onPress={onUploadProof} />
			<GameButton
				accent="orange"
				label="Need to stop?"
				variant="secondary"
				onPress={onStopSprint}
			/>
		</GameScreen>
	);
}
