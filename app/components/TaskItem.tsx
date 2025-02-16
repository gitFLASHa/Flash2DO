import { Text, TouchableOpacity } from "react-native";
import { lightStyles, darkStyles } from "../styles/styles";
import { useColorScheme } from "react-native";

type Task = {
  id: string;
  text: string;
  deadline?: number;
};

interface TaskItemProps {
  task: Task;
  countdown?: string; // Added countdown property
  isSelected: boolean;
  onTap: () => void;
  onLongPress: () => void;
}

const TaskItem = ({
  task,
  countdown,
  isSelected,
  onTap,
  onLongPress,
}: TaskItemProps) => {
  const theme = useColorScheme();
  const styles = theme === "dark" ? darkStyles : lightStyles;

  // Calculate if the task is urgent (deadline within the next 1 hour)
  const now = Date.now();
  const isUrgent =
    task.deadline !== undefined &&
    task.deadline - now > 0 &&
    task.deadline - now < 3600000;

  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        isSelected && styles.selectedTaskItem,
        isUrgent && styles.urgentTask, // Apply urgent style if deadline < 1 hour
      ]}
      onLongPress={onLongPress}
      onPress={onTap}
    >
      <Text style={styles.taskText}>{task.text} </Text>
      {countdown && (
        <Text
          style={[
            styles.countdownText,
            isUrgent ? styles.countdownUrgent : styles.countdownNormal,
          ]}
        >
          Deadline: {countdown}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TaskItem;
