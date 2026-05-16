import type { ComponentProps } from "react";
import { Text, View } from "react-native";
import {
	type AccentName,
	GameCard,
	SectionLabel,
	StatusPill,
	useLifeTheme,
} from "@/components/game-ui";
import { Icon } from "@/components/icon";
import type { Proof, ProofType } from "../types";

const proofVisuals: Record<
	ProofType,
	{
		accent: AccentName;
		icon: ComponentProps<typeof Icon>["name"];
		label: string;
	}
> = {
	Screenshot: {
		accent: "blue",
		icon: "camera-outline",
		label: "Screenshot artifact",
	},
	Video: {
		accent: "purple",
		icon: "videocam-outline",
		label: "Video artifact",
	},
	Link: {
		accent: "green",
		icon: "link-outline",
		label: "Link artifact",
	},
	Text: {
		accent: "gold",
		icon: "document-text-outline",
		label: "Text artifact",
	},
	Voice: {
		accent: "orange",
		icon: "mic-outline",
		label: "Voice artifact",
	},
	Commit: {
		accent: "red",
		icon: "git-branch-outline",
		label: "Commit artifact",
	},
	Figma: {
		accent: "purple",
		icon: "color-palette-outline",
		label: "Figma artifact",
	},
};

type ProofArtifactCardProps = {
	proof: Proof;
	compact?: boolean;
	framed?: boolean;
};

export function ProofArtifactCard({
	proof,
	compact = false,
	framed = true,
}: ProofArtifactCardProps) {
	const { colors, accents } = useLifeTheme();
	const visual = proofVisuals[proof.type];
	const tone = accents[visual.accent];
	const createdDate = new Date(proof.createdAt).toLocaleDateString(undefined, {
		month: "short",
		day: "numeric",
	});

	const body = (
		<>
			<View className="flex-row items-start gap-4">
				<View
					className="h-16 w-16 items-center justify-center rounded-[20px] border-2"
					style={{
						backgroundColor: tone.soft,
						borderColor: tone.color,
					}}
				>
					<Icon name={visual.icon} size={30} color={tone.color} />
				</View>

				<View className="flex-1 gap-2">
					<View className="flex-row flex-wrap items-center gap-2">
						<StatusPill accent={visual.accent} label={proof.type} />
						<StatusPill
							accent={proof.postedAt ? "purple" : "green"}
							label={proof.postedAt ? "posted" : "proof shipped"}
						/>
					</View>
					<Text
						className="font-extrabold text-xl"
						style={{ color: colors.text }}
					>
						{proof.missionTitle}
					</Text>
					<Text className="font-bold text-sm" style={{ color: colors.subtext }}>
						{visual.label} - {createdDate}
					</Text>
				</View>
			</View>

			<View
				className="gap-2 rounded-[18px] p-4"
				style={{ backgroundColor: tone.soft }}
			>
				<SectionLabel>Proof content</SectionLabel>
				<Text
					selectable
					numberOfLines={compact ? 3 : undefined}
					className="font-extrabold text-base"
					style={{ color: colors.text }}
				>
					{proof.content}
				</Text>
			</View>

			{compact ? null : (
				<View className="gap-2">
					<SectionLabel>Reflection</SectionLabel>
					<Text className="font-bold text-base" style={{ color: colors.text }}>
						{proof.reflection}
					</Text>
				</View>
			)}
		</>
	);

	if (framed) {
		return <GameCard accent={visual.accent}>{body}</GameCard>;
	}

	return <View className="gap-4">{body}</View>;
}
