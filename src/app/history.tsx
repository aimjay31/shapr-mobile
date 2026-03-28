import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function History() {
  const sessions = [
    { date: "2026-03-25", subject: "Math", duration: "60", result: "Productive" },
    { date: "2026-03-26", subject: "Science", duration: "45", result: "Not Productive" },
    { date: "2026-03-27", subject: "English", duration: "30", result: "Productive" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>History</Text>

      {sessions.map((s, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.text}>{s.date}</Text>
          <Text style={styles.text}>{s.subject}</Text>
          <Text style={styles.text}>{s.duration} mins</Text>
          <Text
            style={[
              styles.badge,
              { backgroundColor: s.result === "Productive" ? "#2FA84F" : "#F07A1A" },
            ]}
          >
            {s.result}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f1a", padding: 15 },
  title: { fontSize: 22, color: "#fff", marginBottom: 15 },

  card: {
    backgroundColor: "#1c1c2e",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  text: { color: "#ddd", marginBottom: 4 },

  badge: {
    color: "#fff",
    padding: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 5,
    fontWeight: "700",
  },
});