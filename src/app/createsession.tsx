import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SessionForm() {
  const [subject, setSubject] = useState("");
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState("25");
  const [cycles, setCycles] = useState("4");

  const handleSave = () => {
    const session = {
      subject,
      taskName,
      duration,
      cycles,
    };

    console.log("SESSION CREATED:", session);
    alert("Session Saved (Static Mode)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Study Session</Text>

      <TextInput placeholder="Subject" placeholderTextColor="#aaa" style={styles.input} onChangeText={setSubject} />
      <TextInput placeholder="Task Name" placeholderTextColor="#aaa" style={styles.input} onChangeText={setTaskName} />
      <TextInput placeholder="Duration (mins)" placeholderTextColor="#aaa" style={styles.input} onChangeText={setDuration} keyboardType="numeric" />
      <TextInput placeholder="Cycles" placeholderTextColor="#aaa" style={styles.input} onChangeText={setCycles} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Save Session</Text>
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
    marginBottom: 10,
    color: "#fff",
  },
  button: {
    backgroundColor: "#7C5BD6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});