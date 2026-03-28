import { useSession } from "@/context/SessionContext";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// DARK MODE — import the hook to get current theme colors
import { useThemeMode } from "@/context/ThemeContext";

export default function History() {
  const { sessions } = useSession();

  // DARK MODE — get the theme colors from global context
  const { theme } = useThemeMode();

  return (
    // DARK MODE — theme.bg changes between dark (#0f0f1a) and light (#f3e8ff)
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>

      {/* DARK MODE — theme.textColor changes text color */}
      <Text style={[styles.title, { color: theme.textColor }]}>History</Text>

      {sessions.length === 0 && (
        <Text style={{ color: theme.subColor }}>No sessions yet</Text>
      )}

      {sessions.map((s, i) => (
        // DARK MODE — theme.cardBg changes card background
        <View key={i} style={[styles.card, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.text, { color: theme.subColor }]}>{s.date}</Text>
          <Text style={[styles.text, { color: theme.subColor }]}>{s.subject}</Text>
          <Text style={[styles.text, { color: theme.subColor }]}>{s.duration} mins</Text>
          <Text style={[styles.badge, s.result === "Productive" ? styles.green : styles.orange]}>
            {s.result}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, marginBottom: 15 },
  card: { padding: 12, borderRadius: 10, marginBottom: 10 },
  text: { marginBottom: 4 },
  badge: { padding: 6, borderRadius: 8, color: "#fff", alignSelf: "flex-start", marginTop: 5 },
  green: { backgroundColor: "#2FA84F" },
  orange: { backgroundColor: "#F07A1A" },
});