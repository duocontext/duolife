import { Button, Dialog, InputGroup, TextField } from "heroui-native";
import { Pressable, Text, View } from "react-native";
import { CAPTURE_TAGS } from "../data";
import type { CaptureTag } from "../types";

type CaptureSheetProps = {
	isOpen: boolean;
	tag: CaptureTag;
	text: string;
	onChangeText: (text: string) => void;
	onOpenChange: (isOpen: boolean) => void;
	onSave: () => void;
	onSelectTag: (tag: CaptureTag) => void;
};

export function CaptureSheet({
	isOpen,
	tag,
	text,
	onChangeText,
	onOpenChange,
	onSave,
	onSelectTag,
}: CaptureSheetProps) {
	const canSave = text.trim().length > 0;

	return (
		<Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content>
					<Dialog.Close variant="ghost" />
					<View className="mb-5 gap-1.5">
						<Dialog.Description>Quick capture</Dialog.Description>
						<Dialog.Title>Save the spark</Dialog.Title>
					</View>

					<TextField>
						<InputGroup>
							<InputGroup.Input
								multiline
								numberOfLines={4}
								onChangeText={onChangeText}
								placeholder="New idea, proof, or task..."
								value={text}
							/>
						</InputGroup>
					</TextField>

					<View className="my-4 flex-row flex-wrap gap-2">
						{CAPTURE_TAGS.map((item) => (
							<TagPill
								isSelected={tag === item}
								key={item}
								label={item}
								onPress={() => onSelectTag(item)}
							/>
						))}
					</View>

					<Button size="lg" onPress={onSave} isDisabled={!canSave}>
						Save
					</Button>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog>
	);
}

function TagPill({
	isSelected,
	label,
	onPress,
}: {
	isSelected: boolean;
	label: CaptureTag;
	onPress: () => void;
}) {
	return (
		<Pressable
			className={`rounded-full px-4 py-2 ${
				isSelected ? "bg-foreground" : "bg-foreground/10"
			}`}
			onPress={onPress}
		>
			<Text className={isSelected ? "text-background" : "text-foreground"}>
				{label}
			</Text>
		</Pressable>
	);
}
