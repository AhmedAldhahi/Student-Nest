import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Button, Card, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../../navigation/types";
import { LeaseRequest } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "AdminRequestsScreen">;

const mockRequests: LeaseRequest[] = [
  { request_id: 1, student_id: 101, apartment_id: 201, request_message: "Looking to rent for 12 months.", rent_term: "12 months", status: "pending", started_date: "2025-12-01", created_at: "2025-11-10" },
  { request_id: 2, student_id: 102, apartment_id: 202, request_message: "Need short term stay.", rent_term: "6 months", status: "accept", started_date: "2025-12-15", created_at: "2025-11-12" },
  { request_id: 3, student_id: 103, apartment_id: 203, request_message: "Can pay upfront.", rent_term: "12 months", status: "reject", started_date: "2026-01-01", created_at: "2025-11-14" },
];

export default function AdminRequestsScreen({ route }: Props) {
  const landlordId = route.params?.landlordId;
  const [filter, setFilter] = useState<"all" | "pending" | "accept" | "reject">("all");

  const requests = mockRequests.filter(r => filter==="all"?true:r.status===filter);

  const renderRequest = ({ item }: { item: LeaseRequest }) => (
    <Card>
      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Text>Request #{item.request_id}</Text>
          <Chip>{item.status.toUpperCase()}</Chip>
        </View>
        <Text>Student ID: {item.student_id}</Text>
        <Text>Apartment ID: {item.apartment_id}</Text>
        {item.request_message && <Text>“{item.request_message}”</Text>}
        <Text>Rent Term: {item.rent_term}</Text>
        <Text>Start Date: {item.started_date}</Text>
        <Text>Created At: {item.created_at}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" onPress={() => alert(`Audit request #${item.request_id}`)}>Audit</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 15 }}>
        <Text>{landlordId ? `Requests for Landlord #${landlordId}` : "All Lease Requests"}</Text>
        <View style={{ flexDirection: "row", marginBottom: 12 }}>
          {["all","pending","accept","reject"].map(s => (
            <Chip key={s} selected={filter===s} onPress={() => setFilter(s as any)}>
              {s==="all"?"All":s.charAt(0).toUpperCase()+s.slice(1)}
            </Chip>
          ))}
        </View>
        <FlatList data={requests} keyExtractor={r => r.request_id.toString()} renderItem={renderRequest}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f9f9f9" },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1E3A8A",
  },
  list: { paddingBottom: 80 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#333" },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  message: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#444",
    marginBottom: 6,
  },
  statusChip: { alignSelf: "flex-start" },
  pending: { backgroundColor: "#f39c12" },
  accept: { backgroundColor: "#2ecc71" },
  reject: { backgroundColor: "#e74c3c" },
});


