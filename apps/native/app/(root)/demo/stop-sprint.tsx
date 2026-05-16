import { StopSprintModalScreen } from "@/features/demo/components/StopSprintModalScreen";
import { useDemoGameContext } from "@/features/demo/DemoGameProvider";

export default function StopSprintRoute() {
	const game = useDemoGameContext();

	return <StopSprintModalScreen game={game} />;
}
