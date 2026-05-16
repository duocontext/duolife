import { DemoTabFrame } from "@/features/demo/components/DemoTabFrame";
import { ProfileRankScreen } from "@/features/demo/components/ProfileRankScreen";
import { useDemoGameContext } from "@/features/demo/DemoGameProvider";

export default function MeDemoRoute() {
	const game = useDemoGameContext();

	return (
		<DemoTabFrame>
			<ProfileRankScreen proofHistory={game.proofHistory} stats={game.stats} />
		</DemoTabFrame>
	);
}
