import { Text, View } from "react-native";
import {
	ChoiceChip,
	GameButton,
	GameCard,
	GameInput,
	GameScreen,
	ScreenHeader,
	SectionLabel,
	StatusPill,
	useLifeTheme,
} from "@/components/game-ui";
import type { GeneratedPost, PostState, Proof } from "../types";
import { ProofArtifactCard } from "./ProofArtifactCard";

type PostFromProofScreenProps = {
	generatedPosts: GeneratedPost[];
	postState: PostState | null;
	proof: Proof;
	selectedPostId: string;
	onBack: () => void;
	onChangeLesson: (value: string) => void;
	onCopyPost: () => void;
	onMarkPosted: () => void;
	onSelectPost: (id: string) => void;
};

export function PostFromProofScreen({
	generatedPosts,
	postState,
	proof,
	selectedPostId,
	onBack,
	onChangeLesson,
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
				title="Post From Proof"
				eyebrow="Proof captured. Post pending."
				onBack={onBack}
			/>

			<GameCard accent="blue">
				<View className="gap-2">
					<SectionLabel>Proof card preview</SectionLabel>
					<ProofArtifactCard compact framed={false} proof={proof} />
				</View>
				<View className="gap-2">
					<StatusPill accent="blue" label={`Proof: ${proof.type}`} />
					<StatusPill
						accent="purple"
						label="Status: proof uploaded, post pending"
					/>
				</View>
			</GameCard>

			<GameCard>
				<View className="gap-3">
					<SectionLabel>Generated post</SectionLabel>
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
						className="font-extrabold text-lg"
						style={{ color: colors.text }}
					>
						Copied. Now post it before the run counts.
					</Text>
					<Text className="font-bold" style={{ color: colors.text }}>
						Proof is private evidence. Posting turns it into leverage.
					</Text>
				</GameCard>
			) : null}

			<GameCard accent="green">
				<View className="gap-3">
					<View className="gap-2">
						<SectionLabel>Add one lesson, optional</SectionLabel>
						<Text className="font-bold" style={{ color: colors.text }}>
							This can improve the post, but it never blocks the loop.
						</Text>
					</View>
					<GameInput
						value={postState?.lesson ?? ""}
						placeholder="Example: cutting the form made proof feel faster."
						onChangeText={onChangeLesson}
					/>
				</View>
			</GameCard>

			<GameButton
				accent="purple"
				label={postState?.copied ? "Copied. Now Post" : "Copy Post"}
				onPress={onCopyPost}
			/>
			<GameButton
				accent="green"
				variant={postState?.copied ? "primary" : "secondary"}
				label="Mark Posted"
				onPress={onMarkPosted}
			/>
		</GameScreen>
	);
}
