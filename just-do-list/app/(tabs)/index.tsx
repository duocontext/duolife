import { useState } from "react";

import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

export default function HomeScreen() {
  type Task = {
    id: string;
    text: string;
    completed: boolean;
  };

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    const newTask = input.trim();
    if (newTask === "") return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: newTask, completed: false },
    ]);
    setInput("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setTasks((prev) => prev.filter((task) => task.id !== id)),
        },
      ],
      {
        cancelable: true,
      },
    );
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
        keyExtractor={(task) => task.id}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => toggleTask(item.id)}
            onLongPress={() => deleteTask(item.id)}
          >
            <Text style={styles.task}>
              {item.completed ? "✅" : "⬜"} {item.text}
            </Text>
          </Pressable>
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
