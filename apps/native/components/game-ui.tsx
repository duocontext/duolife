import type { ComponentProps, ReactNode } from "react";
import { useMemo, useRef } from "react";
import {
	Pressable,
	ScrollView,
	Text,
	TextInput,
	type TextInputProps,
	View,
	type ViewStyle,
} from "react-native";
import { Icon } from "@/components/icon";
import { useAppTheme } from "@/contexts/app-theme-context";

export const lifeColors = {
	green: "#58CC02",
	greenDark: "#46A302",
	greenSoft: "#E5F8D8",
	proofBlue: "#1CB0F6",
	proofBlueDark: "#168DCA",
	proofBlueSoft: "#DDF4FF",
	postPurple: "#CE82FF",
	postPurpleDark: "#A96ED1",
	postPurpleSoft: "#F3E5FF",
	gold: "#FFC800",
	goldDark: "#D9A900",
	goldSoft: "#FFF3B8",
	orange: "#FF9600",
	orangeDark: "#D97800",
	orangeSoft: "#FFE7C2",
	red: "#FF4B4B",
	redDark: "#D83E3E",
	redSoft: "#FFE1E1",
	bg: "#F7F7F7",
	card: "#FFFFFF",
	line: "#E5E5E5",
	lineDark: "#D6D6D6",
	text: "#3C3C3C",
	subtext: "#777777",
	disabled: "#AFAFAF",
	disabledBg: "#E5E5E5",
};

const darkLifeColors: typeof lifeColors = {
	green: "#58CC02",
	greenDark: "#46A302",
	greenSoft: "#163B1B",
	proofBlue: "#1CB0F6",
	proofBlueDark: "#168DCA",
	proofBlueSoft: "#113448",
	postPurple: "#CE82FF",
	postPurpleDark: "#A96ED1",
	postPurpleSoft: "#382343",
	gold: "#FFC800",
	goldDark: "#D9A900",
	goldSoft: "#403613",
	orange: "#FF9600",
	orangeDark: "#D97800",
	orangeSoft: "#412B12",
	red: "#FF4B4B",
	redDark: "#D83E3E",
	redSoft: "#411D22",
	bg: "#101214",
	card: "#1B1D21",
	line: "#30343A",
	lineDark: "#25282E",
	text: "#F5F7FA",
	subtext: "#AEB6C2",
	disabled: "#7C838F",
	disabledBg: "#2A2D33",
};

type Accent = {
	color: string;
	edge: string;
	soft: string;
};

function createAccents(colors: typeof lifeColors) {
	return {
		green: {
			color: colors.green,
			edge: colors.greenDark,
			soft: colors.greenSoft,
		},
		blue: {
			color: colors.proofBlue,
			edge: colors.proofBlueDark,
			soft: colors.proofBlueSoft,
		},
		purple: {
			color: colors.postPurple,
			edge: colors.postPurpleDark,
			soft: colors.postPurpleSoft,
		},
		gold: {
			color: colors.gold,
			edge: colors.goldDark,
			soft: colors.goldSoft,
		},
		orange: {
			color: colors.orange,
			edge: colors.orangeDark,
			soft: colors.orangeSoft,
		},
		red: {
			color: colors.red,
			edge: colors.redDark,
			soft: colors.redSoft,
		},
	} satisfies Record<string, Accent>;
}

export const accents = createAccents(lifeColors);
export type AccentName = keyof typeof accents;

export function useLifeTheme() {
	const { isDark } = useAppTheme();
	const colors = isDark ? darkLifeColors : lifeColors;

	return useMemo(
		() => ({
			accents: createAccents(colors),
			colors,
		}),
		[colors],
	);
}

export function GameScreen({ children }: { children: ReactNode }) {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerClassName="gap-5 pb-8 pt-4"
		>
			{children}
		</ScrollView>
	);
}

export function ScreenHeader({
	title,
	eyebrow,
	right,
	onBack,
}: {
	title: string;
	eyebrow?: string;
	right?: ReactNode;
	onBack?: () => void;
}) {
	const { colors } = useLifeTheme();

	return (
		<View className="gap-4">
			{onBack ? (
				<Pressable onPress={onBack} hitSlop={24}>
					<Text style={{ color: colors.text }} className="text-lg">
						Back
					</Text>
				</Pressable>
			) : null}
			<View className="flex-row items-start justify-between gap-4">
				<View className="flex-1 gap-1">
					{eyebrow ? (
						<Text
							style={{ color: colors.subtext }}
							className="font-bold text-sm"
						>
							{eyebrow}
						</Text>
					) : null}
					<Text
						style={{ color: colors.text }}
						className="font-extrabold text-4xl"
					>
						{title}
					</Text>
				</View>
				{right}
			</View>
		</View>
	);
}

export function GameCard({
	children,
	accent,
	className = "",
	style,
}: {
	children: ReactNode;
	accent?: AccentName;
	className?: string;
	style?: ViewStyle;
}) {
	const { accents: themeAccents, colors } = useLifeTheme();

	return (
		<View
			className={`gap-4 rounded-[28px] border-2 p-5 ${className}`}
			style={[
				{
					backgroundColor: colors.card,
					borderColor: accent ? themeAccents[accent].color : colors.line,
					borderBottomColor: accent
						? themeAccents[accent].edge
						: colors.lineDark,
					borderBottomWidth: 5,
				},
				style,
			]}
		>
			{children}
		</View>
	);
}

export function GameButton({
	label,
	accent = "green",
	variant = "primary",
	disabled = false,
	onPress,
}: {
	label: string;
	accent?: AccentName;
	variant?: "primary" | "secondary";
	disabled?: boolean;
	onPress: () => void;
}) {
	const { accents: themeAccents, colors } = useLifeTheme();
	const tone = themeAccents[accent];
	const isPrimary = variant === "primary";

	return (
		<Pressable
			accessibilityRole="button"
			disabled={disabled}
			onPress={onPress}
			style={({ pressed }) => ({
				minHeight: isPrimary ? 58 : 52,
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 16,
				borderWidth: 2,
				borderColor: disabled
					? colors.disabledBg
					: isPrimary
						? tone.color
						: colors.line,
				borderBottomColor: disabled
					? colors.disabled
					: isPrimary
						? tone.edge
						: colors.lineDark,
				borderBottomWidth: pressed && !disabled ? 2 : 5,
				backgroundColor: disabled
					? colors.disabledBg
					: isPrimary
						? tone.color
						: colors.card,
				transform: [{ translateY: pressed && !disabled ? 3 : 0 }],
			})}
		>
			<Text
				className="text-center font-extrabold text-base"
				style={{
					color: disabled
						? colors.disabled
						: isPrimary
							? "#FFFFFF"
							: tone.color,
				}}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export function ChoiceChip({
	label,
	selected,
	accent = "green",
	onPress,
}: {
	label: string;
	selected: boolean;
	accent?: AccentName;
	onPress: () => void;
}) {
	const { accents: themeAccents, colors } = useLifeTheme();
	const tone = themeAccents[accent];

	return (
		<Pressable
			onPress={onPress}
			className="rounded-full border-2 px-4 py-3"
			style={{
				backgroundColor: selected ? tone.soft : colors.card,
				borderColor: selected ? tone.color : colors.line,
			}}
		>
			<Text
				className="font-bold text-sm"
				style={{ color: selected ? colors.text : colors.subtext }}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export function ChoiceCard({
	label,
	selected,
	accent = "green",
	icon = "checkmark-circle-outline",
	onPress,
}: {
	label: string;
	selected: boolean;
	accent?: AccentName;
	icon?: ComponentProps<typeof Icon>["name"];
	onPress: () => void;
}) {
	const { accents: themeAccents, colors } = useLifeTheme();
	const tone = themeAccents[accent];

	return (
		<Pressable
			onPress={onPress}
			className="flex-row items-center gap-3 rounded-[20px] border-2 p-4"
			style={{
				backgroundColor: selected ? tone.soft : colors.card,
				borderColor: selected ? tone.color : colors.line,
				borderBottomColor: selected ? tone.edge : colors.lineDark,
				borderBottomWidth: 4,
			}}
		>
			<View
				className="h-10 w-10 items-center justify-center rounded-full"
				style={{ backgroundColor: selected ? tone.color : colors.bg }}
			>
				<Icon
					name={icon}
					size={20}
					color={selected ? "#FFFFFF" : colors.subtext}
				/>
			</View>
			<Text className="flex-1 font-extrabold" style={{ color: colors.text }}>
				{label}
			</Text>
		</Pressable>
	);
}

export function SectionLabel({ children }: { children: ReactNode }) {
	const { colors } = useLifeTheme();

	return (
		<Text
			className="font-extrabold text-sm uppercase"
			style={{ color: colors.subtext }}
		>
			{children}
		</Text>
	);
}

export function GameInput(props: TextInputProps) {
	const inputRef = useRef<TextInput>(null);
	const isMultiline = Boolean(props.multiline);
	const { colors } = useLifeTheme();

	return (
		<Pressable
			disabled={props.editable === false}
			onPress={() => inputRef.current?.focus()}
			className="rounded-[18px] border-2 px-4"
			style={{
				backgroundColor: colors.card,
				borderColor: colors.line,
				justifyContent: isMultiline ? "flex-start" : "center",
				minHeight: isMultiline ? 96 : 58,
				paddingVertical: isMultiline ? 16 : 0,
			}}
		>
			<TextInput
				{...props}
				ref={inputRef}
				multiline={props.multiline}
				placeholderTextColor={colors.disabled}
				className="font-bold text-base"
				style={[
					{
						color: colors.text,
						height: isMultiline ? undefined : 24,
						includeFontPadding: false,
						lineHeight: 22,
						minHeight: isMultiline ? 64 : undefined,
						padding: 0,
						paddingBottom: 0,
						paddingTop: 0,
						textAlignVertical: isMultiline ? "top" : "center",
					},
					props.style,
				]}
			/>
		</Pressable>
	);
}

export function StatusPill({
	label,
	accent = "green",
	icon,
}: {
	label: string;
	accent?: AccentName;
	icon?: ComponentProps<typeof Icon>["name"];
}) {
	const { accents: themeAccents, colors } = useLifeTheme();
	const tone = themeAccents[accent];

	return (
		<View
			className="flex-row items-center gap-1.5 rounded-full px-3 py-2"
			style={{ backgroundColor: tone.soft }}
		>
			{icon ? <Icon name={icon} size={15} color={tone.color} /> : null}
			<Text className="font-extrabold text-xs" style={{ color: colors.text }}>
				{label}
			</Text>
		</View>
	);
}
