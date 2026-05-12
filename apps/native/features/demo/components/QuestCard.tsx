import { Card } from "heroui-native";
import { Text, View } from "react-native";
import type { Quest } from "../types";

export function QuestCard({ quest }: { quest: Quest }) {
	return (
		<Card>
			<Card.Body className="gap-4">
				<View className="flex-row items-start justify-between gap-4">
					<View className="flex-1 gap-2">
						<Card.Title className="text-2xl">{quest.title}</Card.Title>
						<Card.Description>{quest.description}</Card.Description>
					</View>
					<View className="rounded-full bg-foreground/10 px-3 py-2">
						<Text className="font-bold text-foreground">+{quest.xp} XP</Text>
					</View>
				</View>

				<View className="gap-2 rounded-2xl bg-foreground/10 p-4">
					<Text className="font-bold text-foreground">Proof target</Text>
					<Text className="text-muted">{quest.proofTarget}</Text>
				</View>
			</Card.Body>
		</Card>
	);
}
