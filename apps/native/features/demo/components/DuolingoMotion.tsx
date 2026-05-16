import type { ReactNode } from "react";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
	Easing,
	FadeInRight,
	FadeOutLeft,
	useAnimatedProps,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { type AccentName, useLifeTheme } from "@/components/game-ui";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const CHECK_LENGTH = 22;

export const choiceFeedbackDelayMs = 280;

export function StepTransition({
	children,
	stepKey,
}: {
	children: ReactNode;
	stepKey: string;
}) {
	return (
		<Animated.View
			key={stepKey}
			entering={FadeInRight.duration(180).easing(Easing.out(Easing.cubic))}
			exiting={FadeOutLeft.duration(120).easing(Easing.out(Easing.cubic))}
		>
			{children}
		</Animated.View>
	);
}

export function AnimatedChoiceCard({
	accent = "green",
	label,
	selected,
	variant = "card",
	onPress,
}: {
	accent?: AccentName;
	label: string;
	selected: boolean;
	variant?: "card" | "pill";
	onPress: () => void;
}) {
	const { accents, colors } = useLifeTheme();
	const tone = accents[accent];
	const isPill = variant === "pill";

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityState={{ selected }}
			onPress={onPress}
			style={({ pressed }) => ({
				alignItems: "center",
				backgroundColor: selected ? tone.soft : colors.card,
				borderBottomColor: selected ? tone.edge : colors.lineDark,
				borderBottomWidth: pressed ? 2 : isPill ? 3 : 4,
				borderColor: selected ? tone.color : colors.line,
				borderRadius: isPill ? 999 : 20,
				borderWidth: 2,
				flexDirection: "row",
				gap: isPill ? 8 : 12,
				minHeight: isPill ? 46 : 68,
				paddingHorizontal: isPill ? 12 : 16,
				paddingVertical: isPill ? 9 : 14,
				transform: [{ translateY: pressed ? 2 : 0 }],
			})}
		>
			<AnimatedCheckmark checked={selected} size={isPill ? 24 : 34} />
			<Text
				className={isPill ? "font-extrabold text-sm" : "flex-1 font-extrabold"}
				style={{ color: selected ? colors.text : colors.subtext }}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export function StepProgressDots({
	activeStep,
	accent = "green",
	steps,
}: {
	activeStep: string;
	accent?: AccentName;
	steps: { key: string; label: string }[];
}) {
	const { accents, colors } = useLifeTheme();
	const tone = accents[accent];

	return (
		<View className="flex-row gap-2">
			{steps.map((stepItem) => {
				const isActive = stepItem.key === activeStep;

				return (
					<View
						key={stepItem.key}
						className="h-3 flex-1 rounded-full"
						style={{
							backgroundColor: isActive ? tone.color : colors.line,
						}}
					/>
				);
			})}
		</View>
	);
}

function AnimatedCheckmark({
	checked,
	size,
}: {
	checked: boolean;
	size: number;
}) {
	const progress = useSharedValue(checked ? 1 : 0);
	const { colors } = useLifeTheme();

	useEffect(() => {
		progress.value = withTiming(checked ? 1 : 0, {
			duration: checked ? 220 : 100,
			easing: Easing.out(Easing.cubic),
		});
	}, [checked, progress]);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: CHECK_LENGTH * (1 - progress.value),
	}));

	return (
		<View
			style={{
				alignItems: "center",
				backgroundColor: checked ? colors.green : colors.bg,
				borderColor: checked ? colors.greenDark : colors.lineDark,
				borderRadius: 999,
				borderWidth: 2,
				height: size,
				justifyContent: "center",
				width: size,
			}}
		>
			<Svg height={size - 10} viewBox="0 0 24 24" width={size - 10}>
				<AnimatedPath
					animatedProps={animatedProps}
					d="M5 12.5 9.2 17 19 7"
					fill="none"
					stroke="#FFFFFF"
					strokeDasharray={CHECK_LENGTH}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={4}
				/>
			</Svg>
		</View>
	);
}
