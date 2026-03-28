import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

/* ✅ 1. ACTIVE SESSION (FORM → TIMER) */
type ActiveSession = {
  subject: string;
  taskName: string;
  duration: string;
  cycles: string;
};

/* ✅ 2. FINAL SESSION (SAVED DATA) */
type Session = {
  subject: string;
  taskName: string;
  duration: string;
  cycles: string;
  date: string;
  result: string;
};

type SessionContextType = {
  activeSession: ActiveSession | null;
  sessions: Session[];
  setActiveSession: (s: ActiveSession | null) => void;
  addSession: (s: Session) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: any) {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(
    null,
  );
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const stored = await AsyncStorage.getItem("sessions");
        if (stored) setSessions(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load sessions:", error);
      }
    };
    loadSessions();
  }, []);

  const addSession = (session: Session) => {
    setSessions((prev) => {
      const newSessions = [...prev, session];
      AsyncStorage.setItem("sessions", JSON.stringify(newSessions)).catch(
        (error) => console.error("Failed to save sessions:", error),
      );
      return newSessions;
    });
  };

  return (
    <SessionContext.Provider
      value={{ activeSession, sessions, setActiveSession, addSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside provider");
  return ctx;
}
