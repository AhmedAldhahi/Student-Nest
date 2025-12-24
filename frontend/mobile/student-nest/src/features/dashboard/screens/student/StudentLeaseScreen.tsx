import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { Card, Chip, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "StudentLeaseScreen">;

type Lease = {
  leaseID: number;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  includeUtilitys?: string;
  houseRules: string;
  leaseTerm: number;
  isLandlordSigned: boolean;
  isStudentSigned: boolean;
  status: boolean;
  createAt: string;
  studentId: number;
  landlordId: number;
  apartmentId: number;
};

// Mock data — replace with API
const mockLeases: Lease[] = [
  {
    leaseID: 1,
    leaseStartDate: "2025-12-01",
    leaseEndDate: "2026-12-01",
    monthlyRent: 500,
    includeUtilitys: "Water, Electricity",
    houseRules: "No smoking indoors",
    leaseTerm: 12,
    isLandlordSigned: true,
    isStudentSigned: false,
    status: false,
    createAt: "2025-11-15",
    studentId: 101,
    landlordId: 201,
    apartmentId: 301,
  },
  {
    leaseID: 2,
    leaseStartDate: "2025-12-15",
    leaseEndDate: "2026-06-15",
    monthlyRent: 300,
    includeUtilitys: "Internet",
    houseRules: "No pets allowed",
    leaseTerm: 6,
    isLandlordSigned: true,
    isStudentSigned: true,
    status: true,
    createAt: "2025-11-16",
    studentId: 101,
    landlordId: 202,
    apartmentId: 302,
  },
];

export default function StudentLeaseScreen({ route }: Props) {
  const studentId = route.params.studentId;
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");
  const [search, setSearch] = useState("");

  // Filter + search logic
  const leases = mockLeases.filter((l) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? l.status === true
        : l.status === false;

    const matchesStudent = l.studentId === studentId;

    const matchesSearch =
      search === "" ||
      l.apartmentId.toString().includes(search) ||
      l.landlordId.toString().includes(search);

    return matchesFilter && matchesStudent && matchesSearch;
  });

  const renderLease = ({ item }: { item: Lease }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Lease #{item.leaseID}</Text>
          <Chip
            style={[
              styles.statusChip,
              item.status
                ? styles.active
                : item.isLandlordSigned && item.isStudentSigned
                ? styles.ready
                : styles.pending,
            ]}
          >
            {item.status
              ? "ACTIVE"
              : item.isLandlordSigned && item.isStudentSigned
              ? "READY"
              : "PENDING"}
          </Chip>
        </View>
        <Text style={styles.detail}>Apartment ID: {item.apartmentId}</Text>
        <Text style={styles.detail}>Landlord ID: {item.landlordId}</Text>
        <Text style={styles.detail}>Start: {item.leaseStartDate}</Text>
        <Text style={styles.detail}>End: {item.leaseEndDate}</Text>
        <Text style={styles.detail}>Rent: ${item.monthlyRent}</Text>
        <Text style={styles.detail}>Utilities: {item.includeUtilitys || "None"}</Text>
        <Text style={styles.detail}>Rules: {item.houseRules}</Text>
        <Text style={styles.detail}>Created At: {item.createAt}</Text>
      </Card.Content>

      {/* 👇 Role-specific actions for student */}
      <Card.Actions>
        {!item.isStudentSigned && (
          <Button
            mode="contained"
            onPress={() => alert(`Student signed lease #${item.leaseID}`)}
          >
            Sign Lease
          </Button>
        )}
        {item.status && (
          <Button
            mode="outlined"
            onPress={() => alert(`View active lease #${item.leaseID}`)}
          >
            View Lease
          </Button>
        )}
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>My Leases</Text>

        {/* Search bar */}
        <TextInput
          placeholder="Search by Apartment or Landlord ID..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />

        {/* Filter bar */}
        <View style={styles.filterRow}>
          {["all", "active", "pending"].map((s) => (
            <Chip
              key={s}
              selected={filter === s}
              onPress={() => setFilter(s as any)}
              style={[
                styles.filterChip,
                s === "active"
                  ? styles.active
                  : s === "pending"
                  ? styles.pending
                  : styles.ready,
              ]}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Chip>
          ))}
        </View>

        <FlatList
          data={leases}
          keyExtractor={(l) => l.leaseID.toString()}
          renderItem={renderLease}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 16, color: "#1E3A8A" },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  filterRow: { flexDirection: "row", marginBottom: 12 },
  filterChip: { marginRight: 8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    padding: 8,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  title: { fontSize: 18, fontWeight: "600", color: "#333" },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  statusChip: { alignSelf: "flex-start" },
  pending: { backgroundColor: "#f39c12" },
  ready: { backgroundColor: "#3498db" },
  active: { backgroundColor: "#2ecc71" },
});
