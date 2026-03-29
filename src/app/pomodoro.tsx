import { useSession } from "@/context/SessionContext";
import { useThemeMode } from "@/context/ThemeContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

// --- Configuration & Constants ---
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TIMER_SIZE = SCREEN_WIDTH * 0.6; // Reduced size for better fit
const STROKE_WIDTH = 10;
const RADIUS = TIMER_SIZE / 2 - STROKE_WIDTH;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Default durations (in seconds)
const DURATIONS = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

// Mode Selector Options
const MODES = ["Focus", "Short Break", "Long Break"];

// --- Main Component ---
export default function Pomodoro() {
  const { activeSession, addSession, setActiveSession } = useSession();
  const { theme } = useThemeMode();
  const scheme = useColorScheme();

  const workSeconds = parseInt(activeSession?.duration || "25") * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(workSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [activeMode, setActiveMode] = useState("Focus");
  const [cycleCount, setCycleCount] = useState(1);

  // Time format function (mm:ss)
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      // Auto-switch modes when finished
      setIsRunning(false);
      if (activeMode === "Focus") {
        if (cycleCount < 4) {
          setMode("Short Break");
          setCycleCount((prev) => prev + 1);
        } else {
          setMode("Long Break");
          setCycleCount(1); // Reset cycles
        }
      } else {
        setMode("Focus");
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, secondsRemaining, activeMode, cycleCount]);

  // Handler: Change active mode
  const setMode = (mode: string) => {
    setActiveMode(mode);
    setIsRunning(false); // Stop running on mode change
    setSecondsRemaining(
      DURATIONS[mode.toLowerCase().replace(" ", "") as keyof typeof DURATIONS],
    );
  };

  // Handler: Toggle Running state
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // Handler: Reset the current session
  const resetSession = useCallback(() => {
    setIsRunning(false);
    setSecondsRemaining(
      DURATIONS[
        activeMode.toLowerCase().replace(" ", "") as keyof typeof DURATIONS
      ],
    );
  }, [activeMode]);

  // Handler: Finish session
  const handleFinish = () => {
    if (!activeSession) return;
    addSession({
      ...activeSession,
      date: new Date().toISOString(),
      result: "Productive",
    });
    setActiveSession(null);
    router.push("/dashboard");
  };

  // Memoize values for the circular progress component
  const totalSessionSeconds = useMemo(() => {
    return DURATIONS[
      activeMode.toLowerCase().replace(" ", "") as keyof typeof DURATIONS
    ];
  }, [activeMode]);

  const percentage = useMemo(() => {
    return secondsRemaining / totalSessionSeconds;
  }, [secondsRemaining, totalSessionSeconds]);

  if (!activeSession) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
        <Text style={[styles.noSessionText, { color: theme.textColor }]}>
          No active session. Create one first.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />

      {/* 1. Header Area: Current Session */}
      <View style={[styles.header, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>
          Current Session
        </Text>

        {/* Free Timer Mode Box */}
        <View
          style={[
            styles.timerModeBox,
            { backgroundColor: theme.inputBg, borderColor: theme.borderColor },
          ]}
        >
          <Text style={[styles.timerModeTitle, { color: theme.textColor }]}>
            Free Timer Mode
          </Text>
          <Text style={[styles.timerModeSubtitle, { color: theme.subColor }]}>
            Not tracking analytics
          </Text>
        </View>

        {/* Cycle & Goal Grid */}
        <View style={styles.infoGrid}>
          <View
            style={[
              styles.infoCard,
              styles.infoCardLeft,
              { backgroundColor: theme.inputBg },
            ]}
          >
            <Text style={[styles.cardLabel, { color: theme.subColor }]}>
              CYCLE
            </Text>
            <Text style={[styles.cardValueActive, { color: theme.textColor }]}>
              {cycleCount} / 4
            </Text>
          </View>
          <View
            style={[
              styles.infoCard,
              styles.infoCardRight,
              { backgroundColor: theme.inputBg },
            ]}
          >
            <Text style={[styles.cardLabel, { color: theme.subColor }]}>
              GOAL
            </Text>
            <Text style={[styles.cardValue, { color: theme.textColor }]}>
              {activeSession.duration}m
            </Text>
          </View>
        </View>

        {/* Finish Session Button */}
        <TouchableOpacity
          style={[
            styles.finishSessionButton,
            { backgroundColor: theme.textColor },
          ]}
          onPress={handleFinish}
        >
          <Text style={[styles.finishSessionText, { color: theme.bg }]}>
            Finish Session
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>

        {/* Circular Timer Display */}
        <View style={styles.timerWrapper}>
          <CircularProgressDisplay
            size={TIMER_SIZE}
            percentage={percentage}
            displayTime={formatTime(secondsRemaining)}
            label={
              activeMode === "Focus"
                ? "TIME TO FOCUS"
                : `${activeMode.toUpperCase()}`
            }
            theme={theme}
          />
        </View>

        {/* 3. Footer Area: Controls */}
        <View style={styles.controlsFooter}>
          {/* Reset Button (Small White) */}
          <TouchableOpacity
            style={[styles.resetControlBtn, { backgroundColor: theme.cardBg }]}
            onPress={resetSession}
          >
            <MaterialCommunityIcons
              name="reload"
              size={24}
              color={theme.textColor}
            />
          </TouchableOpacity>

          {/* Play/Pause Button (Large Purple) */}
          <TouchableOpacity
            style={[
              styles.playControlBtn,
              { backgroundColor: theme.textColor },
            ]}
            onPress={toggleTimer}
          >
            <Ionicons
              name={isRunning ? "pause" : "play"}
              size={32}
              color={theme.cardBg}
              style={isRunning ? styles.pauseIcon : styles.playIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Custom Components ---

interface CircularDisplayProps {
  size: number;
  percentage: number;
  displayTime: string;
  label: string;
  theme: any;
}

const CircularProgressDisplay: React.FC<CircularDisplayProps> = ({
  size,
  percentage,
  displayTime,
  label,
  theme,
}) => {
  const { radius, circumference, center } = useMemo(() => {
    const r = size / 2 - STROKE_WIDTH;
    const c = 2 * Math.PI * r;
    const ctr = size / 2;
    return { radius: r, circumference: c, center: ctr };
  }, [size]);

  // Calculate the stroke dashoffset based on remaining time
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Gray background circle track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={theme.borderColor} // Theme-based
          strokeWidth={STROKE_WIDTH / 2}
          fill="none"
        />

        {/* Progress arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={theme.textColor} // Theme-based
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" // Smooth edges
          fill="none"
          // Crucial: Rotate -90deg to start progress from the 12 o'clock position
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>

      {/* Digital time display and label centered inside the circle */}
      <View style={styles.timeDisplayWrapper}>
        <Text style={[styles.bigTimeText, { color: theme.textColor }]}>
          {displayTime}
        </Text>
        <Text style={[styles.timerSublabel, { color: theme.textColor }]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

// --- Stylesheet ---

const styles = StyleSheet.create({
  // Global Container
  container: {
    flex: 1,
  },

  // 1. Header (Current Session)
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    elevation: 4, // Shadow for android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 15,
  },
  timerModeBox: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
  },
  timerModeTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  timerModeSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  infoGrid: {
    flexDirection: "row",
    marginBottom: 15,
  },
  infoCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
  },
  infoCardLeft: {
    marginRight: 10,
  },
  infoCardRight: {
    marginLeft: 10,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },
  cardValueActive: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },
  finishSessionButton: {
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    elevation: 3,
  },
  finishSessionText: {
    fontSize: 16,
    fontWeight: "800",
  },

  // 2. Main Content (Timer)
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  modeTabsContainer: {
    borderRadius: 25,
    padding: 5,
    width: "100%",
    marginBottom: 30,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  modeTabActive: {
    elevation: 3, // Minimal shadow for active tab
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modeTabText: {
    color: "#A0A0A0",
    fontWeight: "700",
  },
  modeTabTextActive: {
    fontWeight: "700",
  },
  timerWrapper: {
    position: "relative",
    marginTop: 40,
    marginBottom: 50,
  },
  timeDisplayWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  bigTimeText: {
    fontSize: 78, // Matching the very large font from the image
    fontWeight: "800",
    fontVariant: ["tabular-nums"], // Keep numbers standard width
  },
  timerSublabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginTop: -5,
  },

  // 3. Footer (Controls)
  controlsFooter: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    paddingBottom: 20,
  },
  resetControlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginRight: 20, // Space between buttons
  },
  playControlBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  playIcon: {
    paddingLeft: 5, // Optically center play icon
  },
  pauseIcon: {
    // Standard pause icon is usually centered fine
  },
  noSessionText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});
