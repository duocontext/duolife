import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
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
import { ProofArchiveButton } from "./ProofArchiveButton";
import { ProofArtifactCard } from "./ProofArtifactCard";

type ProofHistoryScreenProps = {
	proofHistory: Proof[];
	onArchiveProof: (proofId: string) => void;
	onRestoreProof: (proofId: string) => void;
};

export function ProofHistoryScreen({
	proofHistory,
	onArchiveProof,
	onRestoreProof,
}: ProofHistoryScreenProps) {
	const { colors } = useLifeTheme();
	const [isViewingArchive, setIsViewingArchive] = useState(false);
	const shouldResetOnFocus = useRef(false);
	const activeProofs = proofHistory.filter((proof) => !proof.archivedAt);
	const archivedProofs = proofHistory.filter((proof) => proof.archivedAt);
	const visibleProofs = isViewingArchive ? archivedProofs : activeProofs;

	useFocusEffect(
		useCallback(() => {
			if (shouldResetOnFocus.current) {
				shouldResetOnFocus.current = false;
				setIsViewingArchive(false);
			}

			return () => {
				shouldResetOnFocus.current = true;
			};
		}, []),
	);

	return (
		<GameScreen>
			<ScreenHeader
				title={isViewingArchive ? "Archive" : "Proof"}
				eyebrow={`${visibleProofs.length} ${
					isViewingArchive ? "archived" : "active"
				}`}
				right={
					proofHistory.length > 0 ? (
						<ProofArchiveButton
							isViewingArchive={isViewingArchive}
							onPress={() => setIsViewingArchive((current) => !current)}
						/>
					) : null
				}
			/>

			{visibleProofs.length > 0 ? (
				<View className="gap-4">
					<SectionLabel>
						{visibleProofs.length} {isViewingArchive ? "archived" : "active"}
					</SectionLabel>
					{visibleProofs.map((proof) => (
						<ProofArtifactCard
							key={proof.id}
							proof={proof}
							action={{
								icon: isViewingArchive
									? "arrow-undo-outline"
									: "archive-outline",
								label: isViewingArchive ? "Restore proof" : "Archive proof",
								onPress: () =>
									isViewingArchive
										? onRestoreProof(proof.id)
										: onArchiveProof(proof.id),
							}}
						/>
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
							{isViewingArchive
								? "No archived proof yet."
								: "No proof artifacts yet."}
						</Text>
						<Text
							className="text-center font-bold"
							style={{ color: colors.subtext }}
						>
							{isViewingArchive
								? "Archive a proof and you can restore it here."
								: "Submit proof from Today and it will persist here."}
						</Text>
					</View>
				</GameCard>
			)}
		</GameScreen>
	);
}
