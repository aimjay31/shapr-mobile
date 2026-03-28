import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { useColorScheme } from "react-native";


import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/context/ThemeContext";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const { nightMode, setNightMode, theme } = useThemeMode();
  const { bg, cardBg, textColor, subColor, borderColor, inputBg } = theme;
  const iconTintColor = scheme === "light" ? "#4B0082" : undefined;

  return (
    <NativeTabs
      backgroundColor={bg}
      indicatorColor={borderColor}
      labelStyle={{ selected: { color: textColor } }}
    >
      <NativeTabs.Trigger name="dashboard">
        <NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/home.png")}
          renderingMode="template"

        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="createsession">
        <NativeTabs.Trigger.Label>Create Session</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/explore.png")}
          renderingMode="template"
     
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history">
        <NativeTabs.Trigger.Label>History</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/history.png")}
          renderingMode="template"

        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="pomodoro">
        <NativeTabs.Trigger.Label>Pomodoro Timer</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/clock.png")}
          renderingMode="template"

        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/clock.png")}
          renderingMode="template"
     
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
