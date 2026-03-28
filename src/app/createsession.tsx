import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useSession } from "@/context/SessionContext";
import { router } from "expo-router";

export default function SessionForm() {
  const { setActiveSession } = useSession();

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
    <View style={styles.container}>
      <Text style={styles.title}>Create Session</Text>

      <TextInput style={styles.input} placeholder="Subject" placeholderTextColor="#aaa" onChangeText={setSubject} />
      <TextInput style={styles.input} placeholder="Task Name" placeholderTextColor="#aaa" onChangeText={setTaskName} />
      <TextInput style={styles.input} placeholder="Duration (mins)" placeholderTextColor="#aaa" onChangeText={setDuration} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Cycles" placeholderTextColor="#aaa" onChangeText={setCycles} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f0f1a" },
  title: { fontSize: 22, color: "#fff", marginBottom: 20, fontWeight: "700" },
  input: {
    backgroundColor: "#1c1c2e",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    color: "#fff",
  },
  button: {
    backgroundColor: "#7C5BD6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});