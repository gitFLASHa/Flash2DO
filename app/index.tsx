import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  useColorScheme,
  Pressable,
  StatusBar,
} from "react-native";
import uuid from "react-native-uuid";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import TaskEditModal from "./components/TaskEditModal";
import { lightStyles, darkStyles } from "./styles/styles";

export default function App() {
  const theme = useColorScheme();
  const styles = theme === "dark" ? darkStyles : lightStyles;

  type Task = {
    id: string;
    text: string;
    deadline?: number; // Optional deadline timestamp
  };

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("@tasks");
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          if (Array.isArray(parsedTasks)) {
            setTasks(parsedTasks);
          }
        }
      } catch (e) {
        console.error("Failed to load tasks", e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      const saveTasks = async () => {
        try {
          await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
        } catch (e) {
          console.error("Failed to save tasks", e);
        }
      };
      saveTasks();
    }, 500);
    return () => clearTimeout(timeout);
  }, [tasks]);

  const addTask = () => {
    if (task.trim() && !tasks.some((t) => t.text === task)) {
      setTasks([{ id: uuid.v4() as string, text: task }, ...tasks]);
      setTask("");
    }
  };

  const handleLongPress = (taskId: string) => {
    const newSelectedTasks = new Set(selectedTasks);
    newSelectedTasks.has(taskId)
      ? newSelectedTasks.delete(taskId)
      : newSelectedTasks.add(taskId);
    setSelectedTasks(newSelectedTasks);
  };

  const handleTap = (taskId: string) => {
    if (selectedTasks.size > 0) {
      handleLongPress(taskId);
    } else {
      const task = tasks.find((t) => t.id === taskId);
      if (task) openModal(task);
    }
  };

  const deleteSelectedTasks = () => {
    setTasks(tasks.filter((task) => !selectedTasks.has(task.id)));
    setSelectedTasks(new Set());
  };

  const cancelSelection = () => setSelectedTasks(new Set());

  const openModal = (task: Task) => {
    setTaskToEdit(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTaskToEdit(null);
  };

  const saveTask = (newTaskText: string, newDeadline?: number) => {
    if (taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id
          ? { ...task, text: newTaskText, deadline: newDeadline }
          : task
      );
      setTasks(updatedTasks);
    }
    closeModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Pressable>
        <Text style={styles.maintitle}>FLASH2DO</Text>
      </Pressable>

      {selectedTasks.size > 0 && (
        <View style={styles.buttonContainer}>
          <Button title="Cancel Selection" onPress={cancelSelection} />
          <Button
            title="Delete Selected"
            onPress={deleteSelectedTasks}
            color="red"
          />
        </View>
      )}

      <TaskList
        tasks={tasks}
        selectedTasks={selectedTasks}
        handleTap={handleTap}
        handleLongPress={handleLongPress}
      />

      <TaskInput task={task} setTask={setTask} addTask={addTask} />

      <TaskEditModal
        visible={isModalVisible}
        taskText={taskToEdit?.text || ""}
        deadline={taskToEdit?.deadline}
        onClose={closeModal}
        onSave={saveTask}
      />
    </SafeAreaView>
  );
}
