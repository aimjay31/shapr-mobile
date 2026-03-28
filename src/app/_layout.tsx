import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { SessionProvider } from '@/context/SessionContext';
import { ThemeProvider as AppThemeProvider } from '@/context/ThemeContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <AppThemeProvider>
      <SessionProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AnimatedSplashOverlay />
          <AppTabs />
        </ThemeProvider>
      </SessionProvider>
    </AppThemeProvider>
  );
}