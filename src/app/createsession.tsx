import { useSession } from "@/context/SessionContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// DARK MODE — import the hook to get current theme colors
import { useThemeMode } from "@/context/ThemeContext";

export default function SessionForm() {
  const { setActiveSession } = useSession();

  // DARK MODE — get the theme colors from global context
  const { theme } = useThemeMode();

  const [subject, setSubject] = useState("");
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState("25");
  const [cycles, setCycles] = useState("4");

  const handleStart = () => {
    if (!subject || !taskName) return;
    setActiveSession({ subject, taskName, duration, cycles });
    router.push("/pomodoro");
  };

  return (
    // DARK MODE — theme.bg changes between dark (#0f0f1a) and light (#f3e8ff)
    <View style={[styles.container, { backgroundColor: theme.bg }]}>

      {/* DARK MODE — theme.textColor changes text color */}
      <Text style={[styles.title, { color: theme.textColor }]}>Create Session</Text>

      {/* DARK MODE — theme.cardBg, theme.borderColor, theme.textColor style the inputs */}
      <TextInput
        style={[styles.input, { backgroundColor: theme.cardBg, borderColor: theme.borderColor, color: theme.textColor }]}
        placeholder="Subject"
        placeholderTextColor={theme.subColor}
        onChangeText={setSubject}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.cardBg, borderColor: theme.borderColor, color: theme.textColor }]}
        placeholder="Task Name"
        placeholderTextColor={theme.subColor}
        onChangeText={setTaskName}
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.cardBg, borderColor: theme.borderColor, color: theme.textColor }]}
        placeholder="Duration (mins)"
        placeholderTextColor={theme.subColor}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.cardBg, borderColor: theme.borderColor, color: theme.textColor }]}
        placeholder="Cycles"
        placeholderTextColor={theme.subColor}
        onChangeText={setCycles}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20, fontWeight: "700" },
  input: {
    borderWidth: 1.5,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: { backgroundColor: "#7C5BD6", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
});