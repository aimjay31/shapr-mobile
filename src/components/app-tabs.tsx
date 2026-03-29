import { usePathname } from "expo-router";
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
  const pathname = usePathname();

  const getIconTint = (name: string) => {
    const isSelected = pathname === `/${name}`;
    return isSelected ? "#34005a" : undefined;
  };

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
          // @ts-ignore
          color={getIconTint("dashboard")}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="createsession">
        <NativeTabs.Trigger.Label>New Session</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/explore.png")}
          renderingMode="template"
          // @ts-ignore
          color={getIconTint("createsession")}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history">
        <NativeTabs.Trigger.Label>History</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/history.png")}
          renderingMode="template"
          // @ts-ignore
          color={getIconTint("history")}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="pomodoro">
        <NativeTabs.Trigger.Label>Pomodoro</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/hourglass.png")}
          renderingMode="template"
          // @ts-ignore
          color={getIconTint("pomodoro")}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/user.png")}
          renderingMode="template"
          // @ts-ignore
          color={getIconTint("profile")}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
