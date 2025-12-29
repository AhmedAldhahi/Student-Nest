import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, RefreshControl, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Chip, Avatar, ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { useAuth } from "../../../../context/AuthContext";
import { getAllNotifications, updateNotificationStatus } from "../../api/adminService";

// API Response Type
type NotificationUser = {
  userId: string;
  name: string;
  email: string;
  role: string;
  photo: string | null;
};

type NotificationItem = {
  notifyId: number;
  createAt: string;
  message: string;
  title: string;
  isRead: boolean;
  receiver: NotificationUser;
  sender?: NotificationUser;
};

export default function NotificationScreen() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchNotifications = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getAllNotifications(token);
      if (Array.isArray(data)) {
        // Sort by date, newest first
        const sorted = data.sort((a: NotificationItem, b: NotificationItem) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
        setNotifications(sorted);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications();
  }, [token]);

  const removeNotification = (rowKey: string) => {
    setNotifications((prev) => prev.filter((n) => n.notifyId.toString() !== rowKey));
  };

  const markAsRead = async (notifyId: number) => {
    if (!token) return;

    // Find the notification
    const notification = notifications.find((n) => n.notifyId === notifyId);
    if (!notification || notification.isRead) return; // Already read, skip API call

    // Optimistic update - update local state immediately
    setNotifications((prev) =>
      prev.map((n) => (n.notifyId === notifyId ? { ...n, isRead: true } : n))
    );

    // Call API in background
    try {
      await updateNotificationStatus(token, notifyId, true);
    } catch (error) {
      console.error("Failed to update notification status:", error);
      // Revert on error
      setNotifications((prev) =>
        prev.map((n) => (n.notifyId === notifyId ? { ...n, isRead: false } : n))
      );
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  // Get icon based on title keywords
  const getNotificationIcon = (title: string): { name: keyof typeof Ionicons.glyphMap; color: string } => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("security") || titleLower.includes("alert")) {
      return { name: "shield-checkmark", color: "#e74c3c" };
    }
    if (titleLower.includes("subscription") || titleLower.includes("payment")) {
      return { name: "card", color: "#9b59b6" };
    }
    if (titleLower.includes("verification") || titleLower.includes("pending")) {
      return { name: "checkmark-circle", color: "#f39c12" };
    }
    if (titleLower.includes("meeting") || titleLower.includes("welcome")) {
      return { name: "people", color: "#3498db" };
    }
    if (titleLower.includes("server") || titleLower.includes("system") || titleLower.includes("database")) {
      return { name: "server", color: "#1abc9c" };
    }
    if (titleLower.includes("error") || titleLower.includes("failed") || titleLower.includes("warning")) {
      return { name: "warning", color: "#e74c3c" };
    }
    if (titleLower.includes("policy") || titleLower.includes("update")) {
      return { name: "document-text", color: "#3498db" };
    }
    if (titleLower.includes("user") || titleLower.includes("role")) {
      return { name: "person", color: "#2ecc71" };
    }
    return { name: "notifications", color: "#1E3A8A" };
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const renderItem = (data: { item: NotificationItem }) => {
    const { item } = data;
    const icon = getNotificationIcon(item.title);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => markAsRead(item.notifyId)}
      >
        <Card style={[styles.card, !item.isRead && styles.unreadCard]}>
          <Card.Content style={styles.cardContent}>
            {/* Left Icon */}
            <View style={[styles.iconContainer, { backgroundColor: `${icon.color}20` }]}>
              <Ionicons name={icon.name} size={24} color={icon.color} />
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
              {/* Header Row */}
              <View style={styles.headerRow}>
                <Text style={[styles.title, !item.isRead && styles.unreadTitle]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.time}>{formatDate(item.createAt)}</Text>
              </View>

              {/* Message */}
              <Text style={styles.message} numberOfLines={2}>
                {item.message}
              </Text>

              {/* Sender Info */}
              {item.sender && (
                <View style={styles.senderRow}>
                  {item.sender.photo ? (
                    <Image source={{ uri: item.sender.photo }} style={styles.senderAvatar} />
                  ) : (
                    <Avatar.Icon size={20} icon="account" style={styles.senderAvatarIcon} />
                  )}
                  <Text style={styles.senderText}>from {item.sender.name}</Text>
                </View>
              )}
            </View>

            {/* Unread Indicator */}
            {!item.isRead && <View style={styles.unreadDot} />}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (data: { item: NotificationItem }) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={styles.hiddenButton}
        onPress={() => removeNotification(data.item.notifyId.toString())}
      >
        <Ionicons name="trash" size={24} color="#fff" />
        <Text style={styles.hiddenText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // Stats
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readCount = notifications.filter((n) => n.isRead).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Notifications</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statItem, { backgroundColor: "#e8f4fd" }]}>
            <Ionicons name="notifications" size={18} color="#1E3A8A" />
            <Text style={styles.statNumber}>{notifications.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: "#fff3cd" }]}>
            <Ionicons name="mail-unread" size={18} color="#856404" />
            <Text style={styles.statNumber}>{unreadCount}</Text>
            <Text style={styles.statLabel}>Unread</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: "#d4edda" }]}>
            <Ionicons name="mail-open" size={18} color="#155724" />
            <Text style={styles.statNumber}>{readCount}</Text>
            <Text style={styles.statLabel}>Read</Text>
          </View>
        </View>

        {/* Filter Chips */}
        <View style={styles.filterRow}>
          {(["all", "unread", "read"] as const).map((f) => (
            <Chip
              key={f}
              selected={filter === f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, filter === f && styles.selectedChip]}
              textStyle={[styles.chipText, filter === f && styles.selectedChipText]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Chip>
          ))}
        </View>

        {/* List */}
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1E3A8A" />
            <Text style={styles.loadingText}>Loading notifications...</Text>
          </View>
        ) : (
          <SwipeListView
            data={filteredNotifications}
            keyExtractor={(item) => item.notifyId.toString()}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-80}
            disableRightSwipe
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#1E3A8A"]} />
            }
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
                <Text style={styles.emptyText}>
                  {filter === "unread"
                    ? "No unread notifications"
                    : filter === "read"
                      ? "No read notifications"
                      : "No notifications yet"}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  badge: {
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    gap: 6,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: "#e8e8e8",
  },
  selectedChip: {
    backgroundColor: "#1E3A8A",
  },
  chipText: {
    color: "#333",
  },
  selectedChipText: {
    color: "#fff",
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#1E3A8A",
    backgroundColor: "#fafbff",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: "700",
    color: "#1E3A8A",
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  message: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  senderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  senderAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  senderAvatarIcon: {
    backgroundColor: "#ddd",
  },
  senderText: {
    fontSize: 11,
    color: "#888",
    fontStyle: "italic",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1E3A8A",
    marginLeft: 8,
    marginTop: 4,
  },
  hiddenContainer: {
    flex: 1,
    backgroundColor: "#e74c3c",
    borderRadius: 14,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  hiddenButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: "100%",
  },
  hiddenText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#888",
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 12,
  },
});
