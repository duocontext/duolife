import { Text, View } from "react-native";
import {
	ChoiceChip,
	GameButton,
	GameCard,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	StatusPill,
	useLifeTheme,
} from "@/components/game-ui";
import type { GeneratedPost, Mission, PostState, Proof } from "../types";

type PostFromProofScreenProps = {
	generatedPosts: GeneratedPost[];
	mission: Mission;
	postState: PostState | null;
	proof: Proof;
	selectedPostId: string;
	onBack: () => void;
	onCopyPost: () => void;
	onMarkPosted: () => void;
	onSelectPost: (id: string) => void;
};

export function PostFromProofScreen({
	generatedPosts,
	mission,
	postState,
	proof,
	selectedPostId,
	onBack,
	onCopyPost,
	onMarkPosted,
	onSelectPost,
}: PostFromProofScreenProps) {
	const selectedPost =
		generatedPosts.find((post) => post.id === selectedPostId) ??
		generatedPosts[0];
	const { colors } = useLifeTheme();

	return (
		<GameScreen>
			<ScreenHeader
				title="Turn proof into momentum"
				eyebrow="Loop is not complete yet"
				onBack={onBack}
			/>

			<GameCard accent="purple">
				<View className="gap-2">
					<SectionLabel>Proof Preview</SectionLabel>
					<Text
						className="font-extrabold text-xl"
						style={{ color: colors.text }}
					>
						{mission.title}
					</Text>
					<Text className="font-bold" style={{ color: colors.text }}>
						{proof.content}
					</Text>
					<StatusPill
						accent="blue"
						icon="chatbubble-ellipses-outline"
						label={proof.reflection}
					/>
				</View>
			</GameCard>

			<GameCard>
				<View className="gap-3">
					<SectionLabel>Generated post options</SectionLabel>
					<View className="flex-row flex-wrap gap-2">
						{generatedPosts.map((post) => (
							<ChoiceChip
								accent="purple"
								key={post.id}
								label={post.platform}
								selected={selectedPostId === post.id}
								onPress={() => onSelectPost(post.id)}
							/>
						))}
					</View>
					{selectedPost ? (
						<View
							className="gap-2 rounded-[20px] p-4"
							style={{ backgroundColor: colors.postPurpleSoft }}
						>
							<StatusPill accent="purple" label={selectedPost.platform} />
							<Text
								selectable
								className="font-bold text-base"
								style={{ color: colors.text }}
							>
								{selectedPost.text}
							</Text>
						</View>
					) : null}
				</View>
			</GameCard>

			{postState?.copied && !postState.markedPosted ? (
				<GameCard accent="orange">
					<Text
						className="font-extrabold text-base"
						style={{ color: colors.text }}
					>
						Proof shipped. Momentum not claimed yet.
					</Text>
				</GameCard>
			) : null}

			<GameButton accent="purple" label="Mark Copied" onPress={onCopyPost} />
			<GameButton
				accent="green"
				variant={postState?.copied ? "primary" : "secondary"}
				label="Mark Posted"
				onPress={onMarkPosted}
			/>
		</GameScreen>
	);
}
