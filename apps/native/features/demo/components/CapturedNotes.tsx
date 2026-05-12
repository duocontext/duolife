import { Card } from "heroui-native";
import { Text, View } from "react-native";
import type { CaptureNote } from "../types";

export function CapturedNotes({ notes }: { notes: CaptureNote[] }) {
	if (notes.length === 0) {
		return null;
	}

	return (
		<Card variant="secondary">
			<Card.Body className="gap-3">
				<Card.Title>Captured</Card.Title>
				{notes.slice(0, 3).map((note) => (
					<View
						className="gap-1 rounded-2xl bg-background/60 p-4"
						key={note.id}
					>
						<Text className="font-bold text-foreground text-sm">
							{note.tag}
						</Text>
						<Text className="text-foreground">{note.text}</Text>
					</View>
				))}
			</Card.Body>
		</Card>
	);
}
