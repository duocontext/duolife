import { Stack } from "expo-router";
import { Platform } from "react-native";
import { DemoGameProvider } from "@/features/demo/DemoGameProvider";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function DemoLayout() {
	return (
		<DemoGameProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen
					name="stop-sprint"
					options={{
						presentation: Platform.OS === "ios" ? "modal" : "formSheet",
						sheetAllowedDetents: [0.78, 0.96],
						sheetCornerRadius: 28,
						sheetGrabberVisible: true,
						sheetInitialDetentIndex: 0,
					}}
				/>
			</Stack>
		</DemoGameProvider>
	);
}
