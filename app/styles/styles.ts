import { StyleSheet } from "react-native";

// Common styles for both themes
const commonStyles = StyleSheet.create({
  // -- Layout & Container
  container: {
    flex: 1,
    padding: 20,
  },

  // -- Input Row for TaskInput
  inputRow: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  // Updated urgentTask: use a darker yellow for better contrast
  urgentTask: {
    backgroundColor: "#FBC02D", // Darker yellow
  },
  inputFlex: {
    flex: 1,
    marginRight: 10,
    height: 45,
  },

  // -- Single unified "input" style
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  // -- Button styles (for custom add button)
  addButtonContainer: {
    height: 45,
    minWidth: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF", // default for light theme
  },
  disabledButton: {
    backgroundColor: "#999",
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // -- If you need a row of buttons somewhere else
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  // -- Misc. TaskItem styles
  selectedTaskItem: {
    backgroundColor: "#f74343", // Highlight selected tasks
  },
  taskItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  taskText: {
    padding: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },

  // -- Main title and countdown
  maintitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "yellow",
    padding: 10,
    paddingBottom: 16,
  },
  countdownText: {
    textAlign: "right",
    fontSize: 14,
    marginTop: 5,
  },
  countdownUrgent: {
    color: "red",
  },
});


// Light theme overrides
const lightStyles = StyleSheet.create({
  ...commonStyles,
  countdownNormal: {
    color: "#000", // Black for light theme
  },
  maintitle: {
    ...commonStyles.maintitle,
    color: "#006400",
  },
  input: {
    ...commonStyles.input,
    borderColor: "#ccc",
    backgroundColor: "#f7f7f7",
    color: "#333",
  },
  taskText: {
    ...commonStyles.taskText,
    color: "#333",
  },
  emptyText: {
    ...commonStyles.emptyText,
    color: "#777",
  },
  addButtonContainer: {
    ...commonStyles.addButtonContainer,
    backgroundColor: "#007BFF",
  },

});

// Dark theme overrides
const darkStyles = StyleSheet.create({
  ...commonStyles,
  countdownNormal: {
    color: "#fff", // White for dark theme
  },
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: "#121212",
  },
  input: {
    ...commonStyles.input,
    borderColor: "#333",
    backgroundColor: "#333",
    color: "#fff",
  },
  taskText: {
    ...commonStyles.taskText,
    color: "#fff",
    borderColor: "#444",
  },
  emptyText: {
    ...commonStyles.emptyText,
    color: "#bbb",
  },
  addButtonContainer: {
    ...commonStyles.addButtonContainer,
    backgroundColor: "#6200EE",
  },
});

export { lightStyles, darkStyles };

// Default export to satisfy route requirements
export default { lightStyles, darkStyles };