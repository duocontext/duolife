import { createContext, type ReactNode, useContext } from "react";
import { useDemoGame } from "./useDemoGame";

export type DemoGameValue = ReturnType<typeof useDemoGame>;

const DemoGameContext = createContext<DemoGameValue | null>(null);

export function DemoGameProvider({ children }: { children: ReactNode }) {
	const game = useDemoGame();

	return (
		<DemoGameContext.Provider value={game}>{children}</DemoGameContext.Provider>
	);
}

export function useDemoGameContext() {
	const game = useContext(DemoGameContext);

	if (!game) {
		throw new Error("useDemoGameContext must be used inside DemoGameProvider");
	}

	return game;
}
