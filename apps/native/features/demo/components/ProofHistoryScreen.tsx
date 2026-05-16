import { Text, View } from "react-native";
import {
	GameCard,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	useLifeTheme,
} from "@/components/game-ui";
import { Icon } from "@/components/icon";
import type { Proof } from "../types";
import { ProofArtifactCard } from "./ProofArtifactCard";

type ProofHistoryScreenProps = {
	proofHistory: Proof[];
};

export function ProofHistoryScreen({ proofHistory }: ProofHistoryScreenProps) {
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader title="Proof" eyebrow="All submitted artifacts" />

			{proofHistory.length > 0 ? (
				<View className="gap-4">
					<SectionLabel>{proofHistory.length} submitted</SectionLabel>
					{proofHistory.map((proof) => (
						<ProofArtifactCard key={proof.id} proof={proof} />
					))}
				</View>
			) : (
				<GameCard accent="blue">
					<View className="items-center gap-4 py-8">
						<View
							className="h-24 w-24 items-center justify-center rounded-full"
							style={{ backgroundColor: colors.proofBlueSoft }}
						>
							<Icon name="albums-outline" size={42} color={colors.proofBlue} />
						</View>
						<Text
							className="text-center font-extrabold text-2xl"
							style={{ color: colors.text }}
						>
							No proof artifacts yet.
						</Text>
						<Text
							className="text-center font-bold"
							style={{ color: colors.subtext }}
						>
							Submit proof from Today and it will persist here.
						</Text>
					</View>
				</GameCard>
			)}
		</GameScreen>
	);
}
