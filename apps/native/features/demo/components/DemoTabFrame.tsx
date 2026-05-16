import type { ReactNode } from "react";
import { View } from "react-native";
import { useLifeTheme } from "@/components/game-ui";

export function DemoTabFrame({ children }: { children: ReactNode }) {
	const { colors } = useLifeTheme();

	return (
		<View
			className="flex-1 px-5 pt-safe"
			style={{ backgroundColor: colors.bg }}
		>
			{children}
		</View>
	);
}
