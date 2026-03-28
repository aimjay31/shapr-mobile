import { useSession } from "@/context/SessionContext";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// DARK MODE — import the hook to get current theme colors
import { useThemeMode } from "@/context/ThemeContext";

export default function Pomodoro() {
  const { activeSession, addSession, setActiveSession } = useSession();

  // DARK MODE — get the theme colors from global context
  const { theme } = useThemeMode();

  const workSeconds = (parseInt(activeSession?.duration || "25")) * 60;
  const [time, setTime] = useState(workSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setTime((prev) => (prev <= 1 ? workSeconds : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleFinish = () => {
    if (!activeSession) return;
    addSession({ ...activeSession, date: new Date().toLocaleDateString(), result: "Productive" });
    setActiveSession(null);
    router.push("/");
  };

  return (
    // DARK MODE — theme.bg changes between dark (#0f0f1a) and light (#f3e8ff)
    <View style={[styles.container, { backgroundColor: theme.bg }]}>

      {/* DARK MODE — theme.textColor changes text color */}
      <Text style={[styles.title, { color: theme.textColor }]}>Pomodoro</Text>
      <Text style={[styles.timer, { color: theme.textColor }]}>{format(time)}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setRunning(!running)}>
        <Text style={styles.buttonText}>{running ? "Pause" : "Start"}</Text>
      </TouchableOpacity>

      {/* DARK MODE — theme.subColor changes the reset text color */}
      <TouchableOpacity style={styles.reset} onPress={() => setTime(workSeconds)}>
        <Text style={[styles.resetText, { color: theme.subColor }]}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.finish} onPress={handleFinish}>
        <Text style={styles.buttonText}>Finish Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20 },
  timer: { fontSize: 48, marginBottom: 20 },
  button: { backgroundColor: "#7C5BD6", padding: 12, borderRadius: 10, marginBottom: 10, width: 150, alignItems: "center" },
  reset: { marginBottom: 10 },
  finish: { backgroundColor: "#2FA84F", padding: 12, borderRadius: 10, width: 150, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
  resetText: {},
});