import type { ComponentProps, ReactNode } from "react";
import { useRef } from "react";
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

type Accent = {
	color: string;
	edge: string;
	soft: string;
};

export const accents = {
	green: {
		color: lifeColors.green,
		edge: lifeColors.greenDark,
		soft: lifeColors.greenSoft,
	},
	blue: {
		color: lifeColors.proofBlue,
		edge: lifeColors.proofBlueDark,
		soft: lifeColors.proofBlueSoft,
	},
	purple: {
		color: lifeColors.postPurple,
		edge: lifeColors.postPurpleDark,
		soft: lifeColors.postPurpleSoft,
	},
	gold: {
		color: lifeColors.gold,
		edge: lifeColors.goldDark,
		soft: lifeColors.goldSoft,
	},
	orange: {
		color: lifeColors.orange,
		edge: lifeColors.orangeDark,
		soft: lifeColors.orangeSoft,
	},
	red: {
		color: lifeColors.red,
		edge: lifeColors.redDark,
		soft: lifeColors.redSoft,
	},
} satisfies Record<string, Accent>;

export type AccentName = keyof typeof accents;

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
	return (
		<View className="gap-4">
			{onBack ? (
				<Pressable onPress={onBack} hitSlop={24}>
					<Text style={{ color: lifeColors.text }} className="text-lg">
						Back
					</Text>
				</Pressable>
			) : null}
			<View className="flex-row items-start justify-between gap-4">
				<View className="flex-1 gap-1">
					{eyebrow ? (
						<Text
							style={{ color: lifeColors.subtext }}
							className="font-bold text-sm"
						>
							{eyebrow}
						</Text>
					) : null}
					<Text
						style={{ color: lifeColors.text }}
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
	return (
		<View
			className={`gap-4 rounded-[28px] border-2 p-5 ${className}`}
			style={[
				{
					backgroundColor: lifeColors.card,
					borderColor: accent ? accents[accent].color : lifeColors.line,
					borderBottomColor: accent
						? accents[accent].edge
						: lifeColors.lineDark,
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
	const tone = accents[accent];
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
					? lifeColors.disabledBg
					: isPrimary
						? tone.color
						: lifeColors.line,
				borderBottomColor: disabled
					? lifeColors.disabled
					: isPrimary
						? tone.edge
						: lifeColors.lineDark,
				borderBottomWidth: pressed && !disabled ? 2 : 5,
				backgroundColor: disabled
					? lifeColors.disabledBg
					: isPrimary
						? tone.color
						: lifeColors.card,
				transform: [{ translateY: pressed && !disabled ? 3 : 0 }],
			})}
		>
			<Text
				className="text-center font-extrabold text-base"
				style={{
					color: disabled
						? lifeColors.disabled
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
	const tone = accents[accent];

	return (
		<Pressable
			onPress={onPress}
			className="rounded-full border-2 px-4 py-3"
			style={{
				backgroundColor: selected ? tone.soft : lifeColors.card,
				borderColor: selected ? tone.color : lifeColors.line,
			}}
		>
			<Text
				className="font-bold text-sm"
				style={{ color: selected ? lifeColors.text : lifeColors.subtext }}
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
	const tone = accents[accent];

	return (
		<Pressable
			onPress={onPress}
			className="flex-row items-center gap-3 rounded-[20px] border-2 p-4"
			style={{
				backgroundColor: selected ? tone.soft : lifeColors.card,
				borderColor: selected ? tone.color : lifeColors.line,
				borderBottomColor: selected ? tone.edge : lifeColors.lineDark,
				borderBottomWidth: 4,
			}}
		>
			<View
				className="h-10 w-10 items-center justify-center rounded-full"
				style={{ backgroundColor: selected ? tone.color : lifeColors.bg }}
			>
				<Icon
					name={icon}
					size={20}
					color={selected ? "#FFFFFF" : lifeColors.subtext}
				/>
			</View>
			<Text
				className="flex-1 font-extrabold"
				style={{ color: lifeColors.text }}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export function SectionLabel({ children }: { children: ReactNode }) {
	return (
		<Text
			className="font-extrabold text-sm uppercase"
			style={{ color: lifeColors.subtext }}
		>
			{children}
		</Text>
	);
}

export function GameInput(props: TextInputProps) {
	const inputRef = useRef<TextInput>(null);
	const isMultiline = Boolean(props.multiline);

	return (
		<Pressable
			disabled={props.editable === false}
			onPress={() => inputRef.current?.focus()}
			className="rounded-[18px] border-2 px-4"
			style={{
				backgroundColor: lifeColors.card,
				borderColor: lifeColors.line,
				justifyContent: isMultiline ? "flex-start" : "center",
				minHeight: isMultiline ? 96 : 58,
				paddingVertical: isMultiline ? 16 : 0,
			}}
		>
			<TextInput
				{...props}
				ref={inputRef}
				multiline={props.multiline}
				placeholderTextColor={lifeColors.disabled}
				className="font-bold text-base"
				style={[
					{
						color: lifeColors.text,
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
	const tone = accents[accent];

	return (
		<View
			className="flex-row items-center gap-1.5 rounded-full px-3 py-2"
			style={{ backgroundColor: tone.soft }}
		>
			{icon ? <Icon name={icon} size={15} color={tone.color} /> : null}
			<Text
				className="font-extrabold text-xs"
				style={{ color: lifeColors.text }}
			>
				{label}
			</Text>
		</View>
	);
}
