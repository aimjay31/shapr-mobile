import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PomodoroTimer() {
  const WORK = 25 * 60;
  const BREAK = 5 * 60;

  const [mode, setMode] = useState<"work" | "break">("work");
  const [time, setTime] = useState(WORK);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          if (mode === "work") {
            setMode("break");
            return BREAK;
          } else {
            setMode("work");
            return WORK;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, mode]);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Timer</Text>

      <Text style={styles.time}>{format(time)}</Text>
      <Text style={styles.mode}>{mode.toUpperCase()}</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => setRunning(!running)}>
          <Text style={styles.btnText}>{running ? "Pause" : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setRunning(false);
            setTime(mode === "work" ? WORK : BREAK);
          }}
        >
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f0f1a" },
  title: { color: "#fff", fontSize: 22, marginBottom: 20 },
  time: { fontSize: 50, color: "#fff", fontWeight: "700" },
  mode: { color: "#aaa", marginTop: 10, marginBottom: 20 },
  row: { flexDirection: "row", gap: 10 },
  btn: {
    backgroundColor: "#7C5BD6",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  btnText: { color: "#fff", fontWeight: "700" },
});