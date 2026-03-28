import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function Dashboard() {
  const [showTips, setShowTips] = useState(true);
  const [timeFilter, setTimeFilter] = useState("All time");

  /* ---------------- STATIC MOCK DATA ---------------- */
  const sessions = [
    {
      date: "2026-03-25",
      startTime: "10:00 AM",
      subject: "Math",
      taskName: "Algebra",
      duration: "60",
      mood: "Focused",
      sleep: "7",
      result: "Productive",
      period: "Morning Hours",
    },
    {
      date: "2026-03-26",
      startTime: "02:00 PM",
      subject: "Science",
      taskName: "Biology",
      duration: "45",
      mood: "Tired",
      sleep: "6",
      result: "Not Productive",
      period: "Afternoon",
    },
    {
      date: "2026-03-27",
      startTime: "09:00 AM",
      subject: "English",
      taskName: "Essay",
      duration: "30",
      mood: "Focused",
      sleep: "8",
      result: "Productive",
      period: "Morning Hours",
    },
  ];

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.date);
    const today = new Date();

    if (timeFilter === "Today") {
      return sessionDate.toDateString() === today.toDateString();
    }

    if (timeFilter === "This week") {
      const diff = Math.ceil(
        Math.abs(+today - +sessionDate) / (1000 * 60 * 60 * 24)
      );
      return diff <= 7;
    }

    if (timeFilter === "This month") {
      return (
        sessionDate.getMonth() === today.getMonth() &&
        sessionDate.getFullYear() === today.getFullYear()
      );
    }

    return true;
  });

  /* ---------------- CALCULATIONS ---------------- */
  const total = filteredSessions.length;

  const productiveCount = filteredSessions.filter(
    (s) => s.result === "Productive"
  ).length;

  const confidence = total ? Math.round((productiveCount / total) * 100) : 0;

  let totalMins = 0;
  filteredSessions.forEach((s) => (totalMins += parseInt(s.duration)));

  const avg = total ? Math.round(totalMins / total) : 0;

  /* ---------------- UI ---------------- */
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>

        <TouchableOpacity onPress={() => setShowTips(!showTips)}>
          <Text style={styles.button}>
            {showTips ? "Hide Tips" : "Show Tips"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CARDS */}
      <View style={styles.cardRow}>
        <Card title="Total Sessions" value={total} />
        <Card title="Productive" value={productiveCount} />
        <Card title="Avg Minutes" value={avg} />
        <Card title="Confidence" value={`${confidence}%`} />
      </View>

      {/* SIMPLE "CHART PLACEHOLDERS" */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Productivity Overview</Text>

        {filteredSessions.map((s, i) => (
          <View key={i} style={styles.barRow}>
            <Text style={styles.barLabel}>S{i + 1}</Text>
            <View
              style={[
                styles.bar,
                {
                  width: s.result === "Productive" ? 200 : 80,
                  backgroundColor:
                    s.result === "Productive" ? "#4CAF50" : "#FF9800",
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* TABLE */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Recent Sessions</Text>

        {filteredSessions.slice(0, 5).map((s, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.cell}>{s.date}</Text>
            <Text style={styles.cell}>{s.subject}</Text>
            <Text style={styles.cell}>{s.duration}m</Text>
            <Text style={styles.badge}>{s.result}</Text>
          </View>
        ))}
      </View>

      {/* RIGHT PANEL */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Prediction</Text>
        <Text>
          Outcome: {confidence >= 50 ? "Productive" : "Unproductive"}
        </Text>
        <Text>Confidence: {confidence}%</Text>
      </View>

      {/* TIPS */}
      {showTips && (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Tips</Text>
          <Text>• Take breaks every 45 minutes</Text>
          <Text>• Study in quiet environments</Text>
        </View>
      )}
    </ScrollView>
  );
}

/* ---------------- CARD COMPONENT ---------------- */
function Card({ title, value }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0f0f1a" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: { fontSize: 24, color: "#fff", fontWeight: "700" },
  button: { color: "#a78bfa", fontWeight: "600" },

  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#1c1c2e",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardTitle: { color: "#aaa", fontSize: 12 },
  cardValue: { color: "#fff", fontSize: 18, fontWeight: "700" },

  panel: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#1c1c2e",
    borderRadius: 10,
  },

  panelTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  barRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  barLabel: { color: "#aaa", width: 30 },

  bar: {
    height: 10,
    borderRadius: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  cell: { color: "#ddd", fontSize: 12 },
  badge: {
    color: "#fff",
    backgroundColor: "#333",
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 12,
  },
});