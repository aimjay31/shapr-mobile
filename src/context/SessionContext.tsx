import React, { createContext, useContext, useState } from "react";

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
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  const addSession = (session: Session) => {
    setSessions((prev) => [...prev, session]);
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