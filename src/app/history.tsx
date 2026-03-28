import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSession } from "@/context/SessionContext";

export default function History() {
  const { sessions } = useSession();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>History</Text>

      {sessions.length === 0 && (
        <Text style={{ color: "#aaa" }}>No sessions yet</Text>
      )}

      {sessions.map((s, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.text}>{s.date}</Text>
          <Text style={styles.text}>{s.subject}</Text>
          <Text style={styles.text}>{s.duration} mins</Text>

          <Text style={[styles.badge, s.result === "Productive" ? styles.green : styles.orange]}>
            {s.result}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0f0f1a" },
  title: { color: "#fff", fontSize: 22, marginBottom: 15 },

  card: {
    backgroundColor: "#1c1c2e",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  text: { color: "#ddd", marginBottom: 4 },

  badge: {
    padding: 6,
    borderRadius: 8,
    color: "#fff",
    alignSelf: "flex-start",
    marginTop: 5,
  },

  green: { backgroundColor: "#2FA84F" },
  orange: { backgroundColor: "#F07A1A" },
});