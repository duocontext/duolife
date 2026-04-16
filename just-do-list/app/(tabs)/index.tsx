import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    const newTask = input.trim();
    if (newTask === "") return;
    setTasks([...tasks, newTask]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Just Do List</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Add a task..."
        onSubmitEditing={addTask}
      />
      <Button title="Add" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(task, index) => task + index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.task}>
            <Text style={styles.taskNumber}>{index + 1}.</Text> {item}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#fff",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#f9f9f9",
  },
  task: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    color: "#222",
  },
  taskNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
