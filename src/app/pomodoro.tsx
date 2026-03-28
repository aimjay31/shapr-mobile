import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSession } from "@/context/SessionContext";
import { router } from "expo-router";

export default function Pomodoro() {
  const { activeSession, addSession, setActiveSession } = useSession();

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

    addSession({
      ...activeSession,
      date: new Date().toLocaleDateString(),
      result: "Productive",
    });

    setActiveSession(null);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro</Text>

      <Text style={styles.timer}>{format(time)}</Text>

      <TouchableOpacity style={styles.button} onPress={() => setRunning(!running)}>
        <Text style={styles.buttonText}>{running ? "Pause" : "Start"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reset} onPress={() => setTime(workSeconds)}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.finish} onPress={handleFinish}>
        <Text style={styles.buttonText}>Finish Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0f0f1a" },
  title: { color: "#fff", fontSize: 22, marginBottom: 20 },
  timer: { fontSize: 48, color: "#fff", marginBottom: 20 },

  button: {
    backgroundColor: "#7C5BD6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: 150,
    alignItems: "center",
  },

  reset: {
    marginBottom: 10,
  },

  finish: {
    backgroundColor: "#2FA84F",
    padding: 12,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
  },

  buttonText: { color: "#fff", fontWeight: "700" },
  resetText: { color: "#aaa" },
});