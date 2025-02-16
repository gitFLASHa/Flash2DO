import { FlatList, Text } from "react-native";
import TaskItem from "./TaskItem";
import { lightStyles, darkStyles } from "../styles/styles";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";

type Task = {
  id: string;
  text: string;
  deadline?: number;
};

interface TaskListProps {
  tasks: Task[];
  selectedTasks: Set<string>;
  handleTap: (id: string) => void;
  handleLongPress: (id: string) => void;
}

const TaskList = ({
  tasks,
  selectedTasks,
  handleTap,
  handleLongPress,
}: TaskListProps) => {
  const theme = useColorScheme();
  const styles = theme === "dark" ? darkStyles : lightStyles;

  const calculateTimeLeft = (deadline: number) => {
    const now = Date.now();
    const diff = deadline - now;

    if (diff <= 0) {
      return "Expired";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateCountdowns = () => {
      const updatedCountdowns: { [key: string]: string } = {};
      tasks.forEach((task) => {
        if (task.deadline) {
          updatedCountdowns[task.id] = calculateTimeLeft(task.deadline);
        }
      });
      setCountdowns(updatedCountdowns);
    };

    updateCountdowns(); // Initial update
    const interval = setInterval(updateCountdowns, 1000); // Update every second

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          countdown={countdowns[item.id]} // Pass countdown to TaskItem
          isSelected={selectedTasks.has(item.id)}
          onTap={() => handleTap(item.id)}
          onLongPress={() => handleLongPress(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.emptyText}>Hooray! No Tasks Pending</Text>
      }
    />
  );
};

export default TaskList;
