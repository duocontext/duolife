import { useRouter } from "expo-router";
import { Button } from "heroui-native";
import { Image, Pressable, Text, View } from "react-native";

export default function DemoRoute() {
  const router = useRouter();

  return (
    <View className="flex-1 px-8 pt-safe pb-safe">
      {/* Back button */}
      <Pressable onPress={() => router.back()} hitSlop={24}>
        <Text className="text-foreground text-lg">← Back</Text>
      </Pressable>

      {/* Content */}
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
