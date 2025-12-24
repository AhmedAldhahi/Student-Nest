import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";

type Notification = {
  id: number;
  title: string;
  message: string;
  type: "lease" | "request" | "system";
  date: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  { id: 1, title: "Lease Signed", message: "Lease #12 signed by both parties.", type: "lease", date: "2025-11-18", read: false },
  { id: 2, title: "New Request", message: "Student #101 submitted a lease request.", type: "request", date: "2025-11-17", read: true },
  { id: 3, title: "System Update", message: "Verification successful.", type: "system", date: "2025-11-16", read: true },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const removeNotification = (rowKey: string) => {
    setNotifications((prev) => prev.filter((n) => n.id.toString() !== rowKey));
  };

  const renderItem = (data: { item: Notification }) => (
    <Card style={[styles.card, !data.item.read && styles.unreadCard]}>
      <Card.Content>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Ionicons
              name={
                data.item.type === "lease"
                  ? "document-text"
                  : data.item.type === "request"
                  ? "mail"
                  : "information-circle"
              }
              size={24}
              color={
                data.item.type === "lease"
                  ? "#2ecc71"
                  : data.item.type === "request"
                  ? "#3498db"
                  : "#f39c12"
              }
            />
            <Text style={styles.title}>{data.item.title}</Text>
          </View>
          <Chip style={styles.dateChip}>{data.item.date}</Chip>
        </View>
        <Text style={styles.message}>{data.item.message}</Text>
      </Card.Content>
    </Card>
  );

  const renderHiddenItem = (data: { item: Notification }) => (
    <View style={styles.hiddenBox}>
      <Ionicons
        name="trash"
        size={28}
        color="#fff"
        onPress={() => removeNotification(data.item.id.toString())}
      />
      <Text style={styles.deleteText}>Remove</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Notification Center</Text>
        <SwipeListView
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-80} // how far to swipe before showing delete
          disableRightSwipe
          contentContainerStyle={{ paddingBottom: 80 }}
          onRowOpen={(rowKey) => removeNotification(rowKey)} // auto-remove when fully swiped
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 16, color: "#1E3A8A" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    paddingVertical: 6,
  },
  unreadCard: { borderLeftWidth: 5, borderLeftColor: "#3498db" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 16, fontWeight: "600", color: "#333", marginLeft: 8 },
  message: { fontSize: 14, color: "#555" },
  dateChip: { backgroundColor: "#eee" },
  hiddenBox: {
    backgroundColor: "#e74c3c",
    flex: 1,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  deleteText: { color: "#fff", fontWeight: "600", marginTop: 4 },
});
