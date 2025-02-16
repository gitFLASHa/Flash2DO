import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { Stack } from "expo-router";

export default function Layout() {
  const theme = useColorScheme();
  const containerStyle =
    theme === "dark" ? styles.darkContainer : styles.lightContainer;

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar
        hidden={false}
        translucent={false}
        backgroundColor={theme === "dark" ? "#121212" : "#fff"}
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Home" }}
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
});
