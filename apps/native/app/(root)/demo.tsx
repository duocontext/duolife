import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { Image, Pressable, Text, View } from "react-native";

type QuestStatus = "active" | "locked" | "complete";

type Quest = {
  id: string;
  title: string;
  description: string;
  timeLimit: string;
  xp: number;
  note: string;
  status: QuestStatus;
};

const QUESTS: Quest[] = [
  {
    id: "make-duolife-mvp",
    title: "Make Duolife MVP",
    description: "Ship one tiny feature that makes the app feel more real.",
    timeLimit: "45 min",
    xp: 80,
    note: "Post progress to keep momentum visible.",
    status: "active",
  },
  {
    id: "build-icontext-mvp",
    title: "Build iContext MVP",
    description: "Turn one strong AI workflow idea into a usable prototype.",
    timeLimit: "60 min",
    xp: 100,
    note: "Ask a friend to review the core flow.",
    status: "locked",
  },
  {
    id: "do-boot-dev",
    title: "Do boot.dev",
    description: "Complete one focused backend lesson without multitasking.",
    timeLimit: "30 min",
    xp: 50,
    note: "Protect the streak before chasing extra work.",
    status: "locked",
  },
  {
    id: "daily-founder-loop",
    title: "Daily Founder Loop",
    description: "Contribute in public, post content, and check YC signals.",
    timeLimit: "25 min",
    xp: 70,
    note: "Open source, X/IG/YT/TT, YC jobs, and HN all count.",
    status: "locked",
  },
];

export default function DemoRoute() {
  const router = useRouter();

  return (
    <View className="flex-1 px-8 pt-safe pb-safe">
      <Pressable onPress={() => router.back()} hitSlop={24}>
        <Text className="text-foreground text-lg">← Back</Text>
      </Pressable>

      <View className="flex-1 items-center justify-center gap-6">
        <Text className="text-2xl font-bold text-foreground">
          Ready to begin?
        </Text>
        <View className="w-full h-64 rounded-3xl overflow-hidden">
          <Image
            source={require("@/assets/demo.jpeg")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <Button className="w-full" size="lg" onPress={() => {}}>
          <Button.Label>Start</Button.Label>
        </Button>
      </View>
    </View>
  );
}
