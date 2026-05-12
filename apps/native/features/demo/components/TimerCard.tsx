import { Button, Card } from "heroui-native";
import { Text } from "react-native";
import type { Quest } from "../types";

type TimerCardProps = {
	isRunning: boolean;
	quest: Quest;
	onLockIn: () => void;
};

export function TimerCard({ isRunning, quest, onLockIn }: TimerCardProps) {
	const timerText = isRunning
		? `${quest.timeboxMinutes - 1}:59`
		: `${quest.timeboxMinutes} min`;

	return (
		<Card variant="secondary">
			<Card.Body className="items-center gap-4">
				<Text className="text-muted text-sm">
					{isRunning ? "Quest running" : "Ready to start"}
				</Text>
				<Text className="font-bold text-6xl text-foreground">{timerText}</Text>
				<Button
					className="w-full"
					size="lg"
					onPress={onLockIn}
					isDisabled={isRunning}
				>
					{isRunning ? "Locked In" : "Lock In"}
				</Button>
			</Card.Body>
		</Card>
	);
}
