import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Button, Avatar } from "react-native-paper";
import { RootStackParamList } from "../../../navigation/types";

// Mock lease requests
const mockRequests = [
  {
    id: "REQ-001",
    studentName: "John Doe",
    apartmentTitle: "Modern Loft in Downtown",
    date: "2025-11-15",
    status: "pending",
  },
  {
    id: "REQ-002",
    studentName: "Sarah Ali",
    apartmentTitle: "Cozy Studio near University",
    date: "2025-11-16",
    status: "pending",
  },
  {
    id: "REQ-003",
    studentName: "Michael Smith",
    apartmentTitle: "Spacious 2BR Apartment",
    date: "2025-11-17",
    status: "pending",
  },
];

type ScreenProps = NativeStackScreenProps<RootStackParamList, "RequestsScreen">;

export default function RequestsScreen() {
  const [requests, setRequests] = useState(mockRequests);

  const handleDecision = (id: string, decision: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: decision } : req
      )
    );
  };

  const renderRequest = ({ item }: { item: typeof mockRequests[0] }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.studentName}
        subtitle={`Requested: ${item.apartmentTitle}`}
        left={(props) => <Avatar.Icon {...props} icon="account" />}
      />
      <Card.Content>
        <Text style={styles.date}>Date: {item.date}</Text>
        <Text style={styles.status}>
          Status:{" "}
          {item.status === "pending"
            ? "Pending"
            : item.status === "approved"
            ? "Approved ✅"
            : "Rejected ❌"}
        </Text>
      </Card.Content>
      {item.status === "pending" && (
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => handleDecision(item.id, "approved")}
            style={styles.approveBtn}
          >
            Approve
          </Button>
          <Button
            mode="outlined"
            onPress={() => handleDecision(item.id, "rejected")}
            style={styles.rejectBtn}
          >
            Reject
          </Button>
        </Card.Actions>
      )}
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lease Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16, color: "#333" },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
  },
  date: { fontSize: 14, color: "#666", marginBottom: 4 },
  status: { fontSize: 14, fontWeight: "600", marginTop: 4 },
  actions: { justifyContent: "flex-end", paddingRight: 8 },
  approveBtn: { backgroundColor: "#2ecc71", marginRight: 8 },
  rejectBtn: { borderColor: "#e74c3c" },
});
