import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Text, Card, Chip, Searchbar } from "react-native-paper";
import { useAuth } from "../../../../context/AuthContext";
import { getAuditLogs, searchAuditLogs } from "../../api/adminService";
import { AuditLog } from "./types";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Helper to format timestamp nicely
const formatTimestamp = (isoString: string) => {
  const date = new Date(isoString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (minutes < 5) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get a simple device name from user agent
const getDeviceName = (deviceInfo: string) => {
  if (!deviceInfo) return "Unknown";
  if (deviceInfo.includes("Expo")) return "Mobile App";
  if (deviceInfo.includes("Postman")) return "Postman";
  if (deviceInfo.includes("Firefox")) return "Firefox";
  if (deviceInfo.includes("Edg")) return "Edge";
  if (deviceInfo.includes("Chrome")) return "Chrome";
  if (deviceInfo.includes("Safari")) return "Safari";
  return "Browser";
};

// Get role color
const getRoleColor = (role: string) => {
  switch (role?.toLowerCase()) {
    case "admin": return "#e74c3c";
    case "landlord":
    case "landloard": return "#3498db";
    case "student": return "#2ecc71";
    default: return "#95a5a6";
  }
};

// Get action style
const getActionStyle = (actionType: string) => {
  switch (actionType?.toUpperCase()) {
    case "POST": return { icon: "add-circle" as const, color: "#27ae60", bg: "#d5f5e3", label: "CREATE" };
    case "PUT":
    case "PATCH": return { icon: "create" as const, color: "#f39c12", bg: "#fef3cd", label: "UPDATE" };
    case "DELETE": return { icon: "trash" as const, color: "#e74c3c", bg: "#fadbd8", label: "DELETE" };
    case "GET": return { icon: "eye" as const, color: "#3498db", bg: "#d6eaf8", label: "VIEW" };
    default: return { icon: "information-circle" as const, color: "#7f8c8d", bg: "#ecf0f1", label: actionType };
  }
};

export default function AuditLogScreen() {
  const { token } = useAuth();
  const [allLogs, setAllLogs] = useState<AuditLog[]>([]); // All logs from initial fetch
  const [logs, setLogs] = useState<AuditLog[]>([]); // Currently displayed logs
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false); // For debounced search indicator
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<"ALL" | "POST" | "PATCH" | "DELETE">("ALL");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  // Debounced server-side search
  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // If search query is empty, reset to all logs
    if (!searchQuery.trim()) {
      setLogs(allLogs);
      setSearching(false);
      return;
    }

    // Set searching state
    setSearching(true);

    // Debounce: wait 500ms before making API call
    searchTimeoutRef.current = setTimeout(async () => {
      if (!token || !searchQuery.trim()) {
        setSearching(false);
        return;
      }

      try {
        const results = await searchAuditLogs(token, searchQuery.trim());
        // Sort by timestamp (newest first)
        const sorted = results.sort((a: AuditLog, b: AuditLog) =>
          new Date(b.actionTimestamp).getTime() - new Date(a.actionTimestamp).getTime()
        );
        setLogs(sorted);
      } catch (err: any) {
        console.error("Search error:", err);
        // Fall back to client-side filtering if server search fails
        const clientFiltered = allLogs.filter((l) =>
          l.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.targetUserName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.record?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.targetUserRole?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setLogs(clientFiltered);
      } finally {
        setSearching(false);
      }
    }, 500);

    // Cleanup timeout on unmount
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, token, allLogs]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!token) {
        throw new Error("No authentication token found");
      }
      const data = await getAuditLogs(token);
      // Sort by timestamp (newest first)
      const sorted = data.sort((a: AuditLog, b: AuditLog) =>
        new Date(b.actionTimestamp).getTime() - new Date(a.actionTimestamp).getTime()
      );
      setAllLogs(sorted);
      setLogs(sorted);
    } catch (err: any) {
      console.error("Error fetching audit logs:", err);
      setError(err.message || "Failed to fetch audit logs");
    } finally {
      setLoading(false);
    }
  };

  // Apply action filter on top of search results
  const filteredLogs = logs.filter((l) => {
    const matchesAction = actionFilter === "ALL" || l.actionType?.toUpperCase() === actionFilter;
    return matchesAction;
  });

  const toggleExpand = (logId: string) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  const renderLog = ({ item }: { item: AuditLog }) => {
    const actionStyle = getActionStyle(item.actionType);
    const isExpanded = expandedLog === item.logId;

    return (

      <TouchableOpacity onPress={() => toggleExpand(item.logId)} activeOpacity={0.9}>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            {/* Left accent bar */}
            <View style={[styles.accentBar, { backgroundColor: actionStyle.color }]} />

            <View style={styles.cardBody}>
              {/* Header */}
              <View style={styles.headerRow}>
                <View style={[styles.actionBadge, { backgroundColor: actionStyle.bg }]}>
                  <Ionicons name={actionStyle.icon} size={14} color={actionStyle.color} />
                  <Text style={[styles.actionLabel, { color: actionStyle.color }]}>
                    {actionStyle.label}
                  </Text>
                </View>
                <Text style={styles.timestamp}>{formatTimestamp(item.actionTimestamp)}</Text>
              </View>

              {/* Description */}
              <Text style={styles.description} numberOfLines={isExpanded ? undefined : 2}>
                {item.description}
              </Text>

              {/* User info */}
              <View style={styles.userRow}>
                <View style={styles.userInfo}>
                  <Ionicons name="person" size={14} color="#666" />
                  <Text style={styles.userName}>{item.targetUserName}</Text>
                  <View style={[styles.roleBadge, { backgroundColor: getRoleColor(item.targetUserRole) }]}>
                    <Text style={styles.roleText}>{item.targetUserRole}</Text>
                  </View>
                </View>
                <Text style={styles.recordText}>{item.record}</Text>
              </View>

              {/* Expanded section */}
              {isExpanded && (
                <View style={styles.expandedContent}>
                  <View style={styles.separator} />

                  <View style={styles.detailItem}>
                    <Ionicons name="phone-portrait-outline" size={14} color="#999" />
                    <Text style={styles.detailLabel}>Device:</Text>
                    <Text style={styles.detailValue}>{getDeviceName(item.deviceInfo)}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons name="globe-outline" size={14} color="#999" />
                    <Text style={styles.detailLabel}>IP:</Text>
                    <Text style={styles.detailValue}>{item.ipAddress}</Text>
                  </View>

                  <View style={styles.detailItem}>
                    <Ionicons name="location-outline" size={14} color="#999" />
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>{item.location}</Text>
                  </View>

                  {/* Fields affected */}
                  {item.fieldName && Object.keys(item.fieldName).length > 0 && (
                    <View style={styles.fieldsSection}>
                      <Text style={styles.fieldsTitle}>Fields affected:</Text>
                      <View style={styles.fieldsWrap}>
                        {Object.keys(item.fieldName).map((field) => (
                          <View key={field} style={styles.fieldTag}>
                            <Text style={styles.fieldTagText}>{field}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Performer info */}
                  {item.performedByUserName && (
                    <View style={styles.detailItem}>
                      <Ionicons name="person-circle-outline" size={14} color="#999" />
                      <Text style={styles.detailLabel}>By:</Text>
                      <Text style={styles.detailValue}>
                        {item.performedByUserName} ({item.performedByUserRole})
                      </Text>
                    </View>
                  )}

                  <Text style={styles.logIdText}>ID: {item.logId}</Text>
                </View>
              )}

              {/* Expand indicator */}
              <View style={styles.expandRow}>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#ccc"
                />
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={styles.loadingText}>Loading audit logs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#e74c3c" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchLogs} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Audit Log</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{logs.length} entries</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search by user, action, record..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#1E3A8A"
        />
        {searching && (
          <View style={styles.searchingIndicator}>
            <ActivityIndicator size="small" color="#1E3A8A" />
          </View>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {[
          { key: "ALL", label: "All", icon: "grid" as const },
          { key: "POST", label: "Create", icon: "add" as const },
          { key: "PATCH", label: "Update", icon: "create" as const },
          { key: "DELETE", label: "Delete", icon: "trash" as const },
        ].map((f) => {
          const isActive = actionFilter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setActionFilter(f.key as any)}
              style={[styles.filterButton, isActive && styles.filterButtonActive]}
            >
              <Ionicons
                name={f.icon}
                size={14}
                color={isActive ? "#fff" : "#666"}
              />
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Results info */}
      {(searchQuery || actionFilter !== "ALL") && (
        <Text style={styles.resultsInfo}>
          Showing {filteredLogs.length} of {logs.length} entries
        </Text>
      )}

      {/* List */}
      {filteredLogs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>No logs found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredLogs}
          keyExtractor={(item) => item.logId}
          renderItem={renderLog}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={fetchLogs}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E3A8A",
  },
  countBadge: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  countText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  // Search
  searchContainer: {
    position: "relative",
    marginBottom: 12,
  },
  searchBar: {
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#fff",
  },
  searchInput: {
    fontSize: 14,
  },
  searchingIndicator: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },

  // Filters
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    minHeight: 44,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 1,
    flex: 1,
    marginHorizontal: 4,
    height: 40,
  },
  filterButtonActive: {
    backgroundColor: "#1E3A8A",
  },
  filterText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  filterTextActive: {
    color: "#fff",
  },

  resultsInfo: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginBottom: 8,
  },

  // Card
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
  },
  accentBar: {
    width: 4,
  },
  cardBody: {
    flex: 1,
    padding: 14,
  },

  // Header row
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  actionBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 4,
    textTransform: "uppercase",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },

  // Description
  description: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    lineHeight: 20,
    marginBottom: 10,
  },

  // User row
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  userName: {
    fontSize: 13,
    color: "#555",
    marginLeft: 6,
    marginRight: 8,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  roleText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  recordText: {
    fontSize: 12,
    color: "#aaa",
    fontStyle: "italic",
  },

  // Expanded
  expandedContent: {
    marginTop: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: "#888",
    marginLeft: 8,
    marginRight: 4,
  },
  detailValue: {
    fontSize: 12,
    color: "#555",
    flex: 1,
  },

  // Fields
  fieldsSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  fieldsTitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  fieldsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fieldTag: {
    backgroundColor: "#e8e8e8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  fieldTagText: {
    fontSize: 11,
    color: "#555",
  },

  logIdText: {
    fontSize: 10,
    color: "#ccc",
    marginTop: 8,
  },

  expandRow: {
    alignItems: "center",
    marginTop: 6,
  },

  // States
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    fontSize: 14,
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 12,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
    marginTop: 12,
  },

  listContent: {
    paddingBottom: 100,
  },
});
