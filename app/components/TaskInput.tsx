import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { lightStyles, darkStyles } from "../styles/styles";
import { useColorScheme } from "react-native";

interface TaskInputProps {
  task: string;
  setTask: (text: string) => void;
  addTask: () => void;
}

const TaskInput = ({ task, setTask, addTask }: TaskInputProps) => {
  const theme = useColorScheme();
  const styles = theme === "dark" ? darkStyles : lightStyles;
  const disabled = task.trim() === "";

  return (
    <View style={styles.inputRow}>
      <TextInput
        placeholder="Add a task"
        value={task}
        onChangeText={setTask}
        style={[styles.input, styles.inputFlex]}
        placeholderTextColor={theme === "dark" ? "#888" : "#999"}
      />
      <TouchableOpacity
        style={[styles.addButtonContainer, disabled && styles.disabledButton]}
        onPress={addTask}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskInput;
