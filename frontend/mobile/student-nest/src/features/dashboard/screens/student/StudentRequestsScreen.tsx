import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button, Card, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LeaseRequest } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "StudentRequestsScreen">;

// Mock data — replace with API
const mockRequests: LeaseRequest[] = [
  {
    request_id: 1,
    student_id: 101, // 👈 added student_id
    apartment_id: 201,
    request_message: "Looking to rent for 12 months.",
    rent_term: "12 months",
    status: "pending",
    started_date: "2025-12-01",
    created_at: "2025-11-10",
  },
  {
    request_id: 2,
    student_id: 101,
    apartment_id: 202,
    request_message: "Need short term stay.",
    rent_term: "6 months",
    status: "accept",
    started_date: "2025-12-15",
    created_at: "2025-11-12",
  },
  {
    request_id: 3,
    student_id: 101,
    apartment_id: 203,
    request_message: "Can pay upfront.",
    rent_term: "12 months",
    status: "reject",
    started_date: "2026-01-01",
    created_at: "2025-11-14",
  },
];

export default function StudentRequestsScreen({ route }: Props) {
  const studentId = route.params.studentId;
  const [filter, setFilter] = useState<"all" | "pending" | "accept" | "reject">("all");

  // Filter by studentId and status
  const requests = mockRequests.filter(
    (r) =>
      r.student_id === studentId &&
      (filter === "all" ? true : r.status === filter)
  );

  const renderRequest = ({ item }: { item: LeaseRequest }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Request #{item.request_id}</Text>
          <Chip
            style={[
              styles.statusChip,
              item.status === "pending"
                ? styles.pending
                : item.status === "accept"
                ? styles.accept
                : styles.reject,
            ]}
          >
            {item.status.toUpperCase()}
          </Chip>
        </View>
        <Text style={styles.detail}>Apartment ID: {item.apartment_id}</Text>
        {item.request_message && (
          <Text style={styles.message}>“{item.request_message}”</Text>
        )}
        <Text style={styles.detail}>Rent Term: {item.rent_term}</Text>
        <Text style={styles.detail}>Start Date: {item.started_date}</Text>
        <Text style={styles.detail}>Created At: {item.created_at}</Text>
      </Card.Content>
      <Card.Actions>
        {item.status === "pending" && (
          <Button
            mode="outlined"
            onPress={() => alert(`Cancelled request #${item.request_id}`)}
          >
            Cancel
          </Button>
        )}
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>My Lease Requests</Text>

        {/* 👇 Filter bar */}
        <View style={styles.filterRow}>
          <Chip
            selected={filter === "all"}
            onPress={() => setFilter("all")}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip
            selected={filter === "pending"}
            onPress={() => setFilter("pending")}
            style={[styles.filterChip, styles.pending]}
          >
            Pending
          </Chip>
          <Chip
            selected={filter === "accept"}
            onPress={() => setFilter("accept")}
            style={[styles.filterChip, styles.accept]}
          >
            Accepted
          </Chip>
          <Chip
            selected={filter === "reject"}
            onPress={() => setFilter("reject")}
            style={[styles.filterChip, styles.reject]}
          >
            Rejected
          </Chip>
        </View>

        <FlatList
          data={requests}
          keyExtractor={(r) => r.request_id.toString()}
          renderItem={renderRequest}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16, color: "#1E3A8A" },
  list: { paddingBottom: 80 },
  card: { backgroundColor: "#fff", borderRadius: 12, marginBottom: 16, elevation: 3 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  title: { fontSize: 18, fontWeight: "600", color: "#333" },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  message: { fontSize: 14, fontStyle: "italic", color: "#444", marginBottom: 6 },
  statusChip: { alignSelf: "flex-start" },
  pending: { backgroundColor: "#f39c12" },
  accept: { backgroundColor: "#2ecc71" },
  reject: { backgroundColor: "#e74c3c" },
  filterRow: { flexDirection: "row", marginBottom: 12, gap: 8 },
  filterChip: { marginRight: 8 },
});
