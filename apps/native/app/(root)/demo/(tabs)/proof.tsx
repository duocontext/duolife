import { DemoTabFrame } from "@/features/demo/components/DemoTabFrame";
import { ProofHistoryScreen } from "@/features/demo/components/ProofHistoryScreen";
import { useDemoGameContext } from "@/features/demo/DemoGameProvider";

export default function ProofDemoRoute() {
	const game = useDemoGameContext();

	return (
		<DemoTabFrame>
			<ProofHistoryScreen
				proofHistory={game.proofHistory}
				onArchiveProof={game.archiveProof}
				onRestoreProof={game.restoreProof}
			/>
		</DemoTabFrame>
	);
}
