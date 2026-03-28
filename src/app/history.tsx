import { useSession } from "@/context/SessionContext";
import { useThemeMode } from "@/context/ThemeContext";
import { historyStyles } from "@/styles/history.styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function History() {
  const { sessions } = useSession();
  const { theme } = useThemeMode();

  // Calculate stats
  const totalSessions = sessions.length;
  const totalHours = sessions.reduce((total, s) => total + parseInt(s.duration), 0) / 60;
  const productiveSessions = sessions.filter(s => s.result === "Productive").length;
  const productivityRate = totalSessions > 0 ? Math.round((productiveSessions / totalSessions) * 100) : 0;
  const totalCycles = sessions.reduce((total, s) => total + parseInt(s.cycles), 0);

  return (
    <ScrollView 
      style={[historyStyles.container, { backgroundColor: theme.bg }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={sessions.length === 0 ? historyStyles.emptyContainerCentered : null}
    >
      <Text style={[historyStyles.title, { color: theme.textColor }]}>History</Text>

      {sessions.length > 0 && (
        <View style={historyStyles.statsRow}>
          <View style={[historyStyles.statItem, { backgroundColor: theme.cardBg }]}>
            <Ionicons name="calendar-outline" size={22} color={theme.textColor} />
            <Text style={[historyStyles.statValue, { color: theme.textColor }]}>{totalSessions}</Text>
            <Text style={[historyStyles.statLabel, { color: theme.subColor }]}>Sessions</Text>
          </View>
          
          <View style={[historyStyles.statItem, { backgroundColor: theme.cardBg }]}>
            <Ionicons name="time-outline" size={22} color={theme.textColor} />
            <Text style={[historyStyles.statValue, { color: theme.textColor }]}>{totalHours.toFixed(1)}</Text>
            <Text style={[historyStyles.statLabel, { color: theme.subColor }]}>Hours</Text>
          </View>
          
          <View style={[historyStyles.statItem, { backgroundColor: theme.cardBg }]}>
            <Ionicons name="repeat-outline" size={22} color={theme.textColor} />
            <Text style={[historyStyles.statValue, { color: theme.textColor }]}>{totalCycles}</Text>
            <Text style={[historyStyles.statLabel, { color: theme.subColor }]}>Cycles</Text>
          </View>
          
          <View style={[historyStyles.statItem, { backgroundColor: theme.cardBg }]}>
            <Ionicons name="trending-up-outline" size={22} color={theme.textColor} />
            <Text style={[historyStyles.statValue, { color: theme.textColor }]}>{productivityRate}%</Text>
            <Text style={[historyStyles.statLabel, { color: theme.subColor }]}>Rate</Text>
          </View>
        </View>
      )}

      {sessions.length === 0 && (
        <View style={historyStyles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color={theme.subColor} />
          <Text style={[historyStyles.emptyText, { color: theme.textColor }]}>
            No history records found
          </Text>
          <Text style={[historyStyles.emptySubText, { color: theme.subColor }]}>
            Start your first study session to see it here
          </Text>
        </View>
      )}

      {sessions.map((s, i) => (
        <TouchableOpacity 
          key={i} 
          style={[historyStyles.sessionCard, { backgroundColor: theme.cardBg }]}
          activeOpacity={0.7}
        >
          <View style={historyStyles.cardHeader}>
            <View style={historyStyles.dateBadge}>
              <Ionicons name="calendar" size={14} color={theme.subColor} />
              <Text style={[historyStyles.dateText, { color: theme.subColor }]}>{s.date}</Text>
            </View>
            <View style={[
              historyStyles.resultBadge,
              s.result === "Productive" ? historyStyles.productiveBadge : historyStyles.notProductiveBadge
            ]}>
              <Text style={historyStyles.resultText}>{s.result || "Done"}</Text>
            </View>
          </View>

          <View style={historyStyles.cardBody}>
            <View style={historyStyles.infoRow}>
              <Ionicons name="book-outline" size={18} color={theme.textColor} />
              <Text style={[historyStyles.subjectText, { color: theme.textColor }]}>{s.subject}</Text>
            </View>
            <View style={historyStyles.infoRow}>
              <Ionicons name="clipboard-outline" size={18} color={theme.textColor} />
              <Text style={[historyStyles.taskText, { color: theme.subColor }]} numberOfLines={1}>
                {s.taskName}
              </Text>
            </View>
          </View>

          <View style={[historyStyles.cardFooter, { borderTopColor: theme.borderColor || "rgba(128,128,128,0.3)" }]}>
            <View style={historyStyles.footerItem}>
              <Ionicons name="timer-outline" size={14} color={theme.subColor} />
              <Text style={[historyStyles.footerText, { color: theme.subColor }]}>{s.duration} mins</Text>
            </View>
            <View style={historyStyles.footerItem}>
              <Ionicons name="repeat-outline" size={14} color={theme.subColor} />
              <Text style={[historyStyles.footerText, { color: theme.subColor }]}>{s.cycles} cycles</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}