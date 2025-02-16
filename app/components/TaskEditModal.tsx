import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  Platform,
  SafeAreaView,
  useColorScheme,
} from "react-native";
// Import your global theme styles
import { lightStyles, darkStyles } from "../styles/styles";

type TaskEditModalProps = {
  deadline?: number;
  visible: boolean;
  taskText: string;
  onClose: () => void;
  onSave: (newTaskText: string, deadline?: number) => void;
};

const TaskEditModal = ({
  deadline,
  visible,
  taskText,
  onClose,
  onSave,
}: TaskEditModalProps) => {
  const theme = useColorScheme();
  const themeStyles = theme === "dark" ? darkStyles : lightStyles;

  const [newText, setNewText] = useState(taskText);
  const [useCustomDeadline, setUseCustomDeadline] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  useEffect(() => {
    setNewText(taskText);
    if (deadline) {
      const date = new Date(deadline);
      setYear(date.getFullYear().toString());
      setMonth((date.getMonth() + 1).toString());
      setDay(date.getDate().toString());
      setHour(date.getHours().toString());
      setMinute(date.getMinutes().toString());
      setUseCustomDeadline(true);
    } else {
      setYear("");
      setMonth("");
      setDay("");
      setHour("");
      setMinute("");
      setUseCustomDeadline(false);
    }
  }, [taskText, deadline]);

  const validateInputs = (): boolean => {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const h = parseInt(hour, 10);
    const min = parseInt(minute, 10);

    if (isNaN(y) || y < 1900 || y > 2100) {
      Alert.alert("Invalid Year", "Please enter a year between 1900 and 2100.");
      return false;
    }
    if (isNaN(m) || m < 1 || m > 12) {
      Alert.alert("Invalid Month", "Month must be between 1 and 12.");
      return false;
    }
    if (isNaN(d) || d < 1 || d > 31) {
      Alert.alert("Invalid Day", "Day must be between 1 and 31.");
      return false;
    }
    if (isNaN(h) || h < 0 || h > 23) {
      Alert.alert("Invalid Hour", "Hour must be between 0 and 23.");
      return false;
    }
    if (isNaN(min) || min < 0 || min > 59) {
      Alert.alert("Invalid Minute", "Minute must be between 0 and 59.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    let computedDeadline: number | undefined = undefined;
    if (useCustomDeadline) {
      if (!validateInputs()) return;
      const y = parseInt(year, 10);
      const m = parseInt(month, 10) - 1;
      const d = parseInt(day, 10);
      const h = parseInt(hour, 10);
      const min = parseInt(minute, 10);
      computedDeadline = new Date(y, m, d, h, min).getTime();
    }
    onSave(newText, computedDeadline);
    onClose();
  };

  const dynamicCustomPickerContainer = {
    ...modalStyles.customPickerContainer,
    backgroundColor: theme === "dark" ? "#333" : "#F4F4F4",
  };

  const dynamicPickerTitle = {
    ...modalStyles.pickerTitle,
    color: theme === "dark" ? "#fff" : "#333",
  };

  const dynamicDateInput = {
    ...modalStyles.dateInput,
    borderColor: theme === "dark" ? "#555" : "#ccc",
    color: theme === "dark" ? "#fff" : "#000",
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false} // Full-screen modal
      onRequestClose={onClose}
    >
      <SafeAreaView style={[themeStyles.container, modalStyles.fullScreen]}>
        {/* Header with Close button */}
        <View style={modalStyles.header}>
          <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
            <Text style={modalStyles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={modalStyles.content}>
          <Text style={modalStyles.title}>Edit Task</Text>
          <TextInput
            multiline={true}
            style={[modalStyles.largeInput, themeStyles.input]}
            value={newText}
            onChangeText={setNewText}
            placeholder="Task description"
            autoFocus
          />
          <View style={modalStyles.switchContainer}>
            <Text style={modalStyles.switchLabel}>Set Deadline</Text>
            <Switch
              value={useCustomDeadline}
              onValueChange={(value) => {
                setUseCustomDeadline(value);
                if (!value) {
                  setYear("");
                  setMonth("");
                  setDay("");
                  setHour("");
                  setMinute("");
                }
              }}
            />
          </View>
          {useCustomDeadline && (
            <View style={modalStyles.customPickerContainer}>
              <Text style={modalStyles.pickerTitle}>Enter Deadline:</Text>
              <View style={modalStyles.row}>
                <TextInput
                  style={modalStyles.dateInput}
                  value={year}
                  onChangeText={setYear}
                  placeholder="Year"
                  keyboardType="numeric"
                />
                <TextInput
                  style={modalStyles.dateInput}
                  value={month}
                  onChangeText={setMonth}
                  placeholder="Month"
                  keyboardType="numeric"
                />
                <TextInput
                  style={modalStyles.dateInput}
                  value={day}
                  onChangeText={setDay}
                  placeholder="Day"
                  keyboardType="numeric"
                />
              </View>
              <View style={modalStyles.row}>
                <TextInput
                  style={modalStyles.dateInput}
                  value={hour}
                  onChangeText={setHour}
                  placeholder="Hour"
                  keyboardType="numeric"
                />
                <TextInput
                  style={modalStyles.dateInput}
                  value={minute}
                  onChangeText={setMinute}
                  placeholder="Minute"
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}
          <View style={modalStyles.buttons}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  closeButton: {
    alignSelf: "flex-start",
  },
  closeText: {
    fontSize: 16,
    color: "#007AFF",
  },
  content: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  largeInput: {
    height: 100, // Increase height to 100 (or whatever size you need)
    textAlignVertical: "top", // For Android to start at the top
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  customPickerContainer: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 5,
    marginHorizontal: 3,
    backgroundColor: "#FFF",
    textAlign: "center",
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default TaskEditModal;
