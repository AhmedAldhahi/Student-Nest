import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Chip, Searchbar } from "react-native-paper";

const mockLogs = [
  {
    logId: 1,
    actionType: "UPDATE",
    description: "Changed rent amount",
    record: "Lease",
    oldValue: "500",
    newValue: "550",
    createdBy: "Admin Ahmed",
    timestamp: "2025-11-18 14:30",
    ipAddress: "192.168.1.10",
    deviceInfo: "Chrome on Windows",
    location: "Amman, Jordan",
    accountName: "LAND12345",
  },
  {
    logId: 2,
    actionType: "DELETE",
    description: "Removed apartment listing",
    record: "Apartment",
    oldValue: "Cozy Studio",
    newValue: "N/A",
    createdBy: "Admin Sarah",
    timestamp: "2025-11-17 09:15",
    ipAddress: "192.168.1.22",
    deviceInfo: "Safari on Mac",
    location: "Amman, Jordan",
    accountName: "LAND67890",
  },
  {
    logId: 3,
    actionType: "CREATE",
    description: "Added new landlord",
    record: "Landlord",
    oldValue: "N/A",
    newValue: "Ahmed Khalid",
    createdBy: "Admin Sarah",
    timestamp: "2025-11-16 10:00",
    ipAddress: "192.168.1.33",
    deviceInfo: "Edge on Windows",
    location: "Amman, Jordan",
    accountName: "LAND99999",
  },
];

export default function AuditLogScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<"ALL" | "CREATE" | "UPDATE" | "DELETE">("ALL");

  const filteredLogs = mockLogs.filter((l) => {
    const matchesSearch =
      l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.record.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.accountName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = actionFilter === "ALL" || l.actionType === actionFilter;

    return matchesSearch && matchesAction;
  });

  const renderLog = ({ item }: { item: typeof mockLogs[0] }) => (
    <Card style={styles.card}>
      <Card.Title
        title={`${item.actionType} - ${item.record}`}
        subtitle={item.description}
        right={() => (
          <Chip
            style={[
              styles.actionChip,
              item.actionType === "DELETE"
                ? styles.delete
                : item.actionType === "UPDATE"
                ? styles.update
                : styles.create,
            ]}
          >
            {item.actionType}
          </Chip>
        )}
      />
      <Card.Content>
        <Text style={styles.detail}>
          Account: {item.accountName} | By: {item.createdBy}
        </Text>
        {item.oldValue && (
          <Text style={styles.detail}>
            Change: {item.oldValue} → {item.newValue}
          </Text>
        )}
        <Text style={styles.detail}>At: {item.timestamp}</Text>
        <Text style={styles.detail}>IP: {item.ipAddress}</Text>
        <Text style={styles.detail}>Device: {item.deviceInfo}</Text>
        <Text style={styles.detail}>Location: {item.location}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Audit Log</Text>
      <Searchbar
        placeholder="Search logs..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.search}
      />

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {["ALL", "CREATE", "UPDATE", "DELETE"].map((type) => (
          <Chip
            key={type}
            selected={actionFilter === type}
            onPress={() => setActionFilter(type as any)}
            style={[
              styles.filterChip,
              type === "CREATE"
                ? styles.create
                : type === "UPDATE"
                ? styles.update
                : type === "DELETE"
                ? styles.delete
                : styles.all,
            ]}
          >
            {type}
          </Chip>
        ))}
      </View>

      <FlatList
        data={filteredLogs}
        keyExtractor={(item) => item.logId.toString()}
        renderItem={renderLog}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 12, color: "#333" },
  search: { marginBottom: 16, borderRadius: 12 },
  filterRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  filterChip: { marginHorizontal: 4 },
  card: { marginBottom: 16, borderRadius: 12, elevation: 3 },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  actionChip: { marginRight: 8 },
  delete: { backgroundColor: "#e74c3c" },
  update: { backgroundColor: "#f39c12" },
  create: { backgroundColor: "#2ecc71" },
  all: { backgroundColor: "#95a5a6" },
});
