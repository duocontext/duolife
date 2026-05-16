import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useThemeColor } from "heroui-native";

export default function DemoTabsLayout() {
	const accent = useThemeColor("accent");

	return (
		<NativeTabs>
			<NativeTabs.Trigger name="today">
				<NativeTabs.Trigger.Icon
					sf={{ default: "flag", selected: "flag.fill" }}
					md="flag"
					selectedColor={accent}
				/>
				<NativeTabs.Trigger.Label>Today</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="proof">
				<NativeTabs.Trigger.Icon
					sf={{ default: "archivebox", selected: "archivebox.fill" }}
					md="collections"
					selectedColor={accent}
				/>
				<NativeTabs.Trigger.Label>Proof</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="me">
				<NativeTabs.Trigger.Icon
					sf={{
						default: "person.crop.circle",
						selected: "person.crop.circle.fill",
					}}
					md="person"
					selectedColor={accent}
				/>
				<NativeTabs.Trigger.Label>Me</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
