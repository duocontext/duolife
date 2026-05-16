import { useRouter } from "expo-router";
import { DemoTabFrame } from "@/features/demo/components/DemoTabFrame";
import { TodayDemoScreen } from "@/features/demo/components/TodayDemoScreen";
import { useDemoGameContext } from "@/features/demo/DemoGameProvider";

export default function TodayDemoRoute() {
	const router = useRouter();
	const game = useDemoGameContext();

	return (
		<DemoTabFrame>
			<TodayDemoScreen
				game={game}
				onExit={() => router.back()}
				onStopSprint={() => router.push("/demo/stop-sprint")}
				onViewProofHistory={() => router.push("/demo/proof")}
			/>
		</DemoTabFrame>
	);
}
