import { StyleSheet } from "react-native";

export const historyStyles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
  },
  emptyContainerCentered: {
    flex: 1,
  },
  
  // Header
  title: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  
  // Stats Row
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  
  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    textAlign: "center",
  },
  
  // Session Cards
  sessionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 13,
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  resultText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
  productiveBadge: {
    backgroundColor: "#2FA84F",
  },
  notProductiveBadge: {
    backgroundColor: "#F07A1A",
  },
  cardBody: {
    marginBottom: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  taskText: {
    fontSize: 14,
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 8,
    borderTopWidth: 0.5,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 12,
  },
});