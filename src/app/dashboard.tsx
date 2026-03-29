import { useSession } from "@/context/SessionContext";
import { useThemeMode } from "@/context/ThemeContext";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Dashboard() {
  const { sessions } = useSession();
  const { theme } = useThemeMode();

  const [showTips, setShowTips] = useState(true);
  const [timeFilter, setTimeFilter] = useState("All time");

  const filteredSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.date);
    const today = new Date();
    if (!s.date) return false;
    if (timeFilter === "Today") return sessionDate.toDateString() === today.toDateString();
    if (timeFilter === "This week") {
      const diff = Math.ceil(Math.abs(+today - +sessionDate) / (1000 * 60 * 60 * 24));
      return diff <= 7;
    }
    if (timeFilter === "This month") {
      return sessionDate.getMonth() === today.getMonth() &&
        sessionDate.getFullYear() === today.getFullYear();
    }
    return true;
  });

  const total = filteredSessions.length;
  const productiveCount = filteredSessions.filter((s) => s.result === "Productive").length;
  const confidence = total ? Math.round((productiveCount / total) * 100) : 0;
  const totalMins = filteredSessions.reduce((sum, s) => sum + (parseInt(s.duration || "0") || 0), 0);
  const avg = total ? Math.round(totalMins / total) : 0;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textColor }]}>Dashboard</Text>
        <TouchableOpacity onPress={() => setShowTips(!showTips)}>
          <Text style={styles.button}>{showTips ? "Hide Tips" : "Show Tips"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardRow}>
        <Card title="Total Sessions" value={total} theme={theme} />
        <Card title="Productive" value={productiveCount} theme={theme} />
        <Card title="Avg Minutes" value={avg} theme={theme} />
        <Card title="Confidence" value={`${confidence}%`} theme={theme} />
      </View>

      <View style={[styles.panel, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.panelTitle, { color: theme.textColor }]}>Productivity Overview</Text>
        {filteredSessions.map((s, i) => (
          <View key={i} style={styles.barRow}>
            <Text style={[styles.barLabel, { color: theme.subColor }]}>S{i + 1}</Text>
            <View style={[styles.bar, {
              width: s.result === "Productive" ? 200 : 80,
              backgroundColor: s.result === "Productive" ? "#4CAF50" : "#FF9800",
            }]} />
          </View>
        ))}
      </View>

      <View style={[styles.panel, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.panelTitle, { color: theme.textColor }]}>Recent Sessions</Text>
        {filteredSessions.slice(0, 5).map((s, i) => (
          <View key={i} style={styles.row}>
            <Text style={[styles.cell, { color: theme.subColor }]}>{s.date}</Text>
            <Text style={[styles.cell, { color: theme.subColor }]}>{s.subject}</Text>
            <Text style={[styles.cell, { color: theme.subColor }]}>{s.duration}m</Text>
            <Text style={[styles.badge, { color: theme.textColor, backgroundColor: theme.inputBg }]}>{s.result}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.panel, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.panelTitle, { color: theme.textColor }]}>Prediction</Text>
        <Text style={{ color: theme.subColor }}>Outcome: {confidence >= 50 ? "Productive" : "Unproductive"}</Text>
        <Text style={{ color: theme.subColor }}>Confidence: {confidence}%</Text>
      </View>

      {showTips && (
        <View style={[styles.panel, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.panelTitle, { color: theme.textColor }]}>Tips</Text>
          <Text style={{ color: theme.subColor }}>• Take breaks every 45 minutes</Text>
          <Text style={{ color: theme.subColor }}>• Study in quiet environments</Text>
        </View>
      )}
    </ScrollView>
  );
}

function Card({ title, value, theme }: any) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg }]}>
      <Text style={[styles.cardTitle, { color: theme.subColor }]}>{title}</Text>
      <Text style={[styles.cardValue, { color: theme.textColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "700" },
  button: { color: "#a78bfa", fontWeight: "600" },
  cardRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: { width: "48%", padding: 12, borderRadius: 10, marginBottom: 10 },
  cardTitle: { fontSize: 12 },
  cardValue: { fontSize: 18, fontWeight: "700" },
  panel: { marginTop: 15, padding: 12, borderRadius: 10 },
  panelTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
  barRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  barLabel: { width: 30 },
  bar: { height: 10, borderRadius: 5 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  cell: { fontSize: 12 },
  badge: { paddingHorizontal: 8, borderRadius: 10, fontSize: 12 },
});