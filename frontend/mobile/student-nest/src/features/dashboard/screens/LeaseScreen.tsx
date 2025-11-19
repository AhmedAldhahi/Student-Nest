import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Avatar, Chip, Button, Searchbar } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useAuth } from "../../../context/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "LeaseScreen">;

export default function LeaseScreen({ route }: Props) {
  const { user, isAdmin, isLandlord, isStudent } = useAuth();
  const { landlordId, studentId } = route.params || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [leases, setLeases] = useState<any[]>([]);

  useEffect(() => {
    // Example: fetch leases depending on role/params
    let query = "";
    if (isAdmin && !landlordId && !studentId) {
      query = "/api/leases"; // all leases
    } else if (isLandlord || landlordId) {
      // query = `/api/leases?landlordId=${landlordId || user.userId}`;
    } else if (isStudent || studentId) {
      // query = `/api/leases?studentId=${studentId || user.userId}`;
    }

    // fetch(query).then(res => res.json()).then(data => setLeases(data));
    // For now, mock data:
    setLeases([
      {
        leaseID: 1,
        studentName: "John Doe",
        studentEmail: "john@example.com",
        apartmentTitle: "Modern Loft",
        leaseStartDate: "2025-01-01",
        leaseEndDate: "2025-12-31",
        monthlyRent: 500,
        status: true,
      },
      {
        leaseID: 2,
        studentName: "Sarah Ali",
        studentEmail: "sarah@example.com",
        apartmentTitle: "Cozy Studio",
        leaseStartDate: "2025-03-01",
        leaseEndDate: "2025-09-01",
        monthlyRent: 300,
        status: false,
      },
    ]);
  }, [landlordId, studentId, isAdmin, isLandlord, isStudent, user]);

  const filteredLeases = leases.filter(
    (l) =>
      l.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.apartmentTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLease = ({ item }: { item: typeof leases[0] }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.studentName}
        subtitle={item.studentEmail}
        left={(props) => <Avatar.Icon {...props} icon="account" />}
        right={() => (
          <Chip
            style={[styles.statusChip, item.status ? styles.active : styles.pending]}
          >
            {item.status ? "Active" : "Pending"}
          </Chip>
        )}
      />
      <Card.Content>
        <Text style={styles.detail}>Apartment: {item.apartmentTitle}</Text>
        <Text style={styles.detail}>
          Lease: {item.leaseStartDate} → {item.leaseEndDate}
        </Text>
        <Text style={styles.detail}>Monthly Rent: ${item.monthlyRent}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" style={styles.btn}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {isAdmin && !landlordId && !studentId
          ? "All Leases"
          : landlordId
          ? `Leases for Landlord #${landlordId}`
          : studentId
          ? "My Leases"
          : "Leases"}
      </Text>
      <Searchbar
        placeholder="Search leases..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.search}
      />
      <FlatList
        data={filteredLeases}
        keyExtractor={(item) => item.leaseID.toString()}
        renderItem={renderLease}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: "#333" },
  search: { marginBottom: 16, borderRadius: 12 },
  card: { marginBottom: 16, borderRadius: 12, elevation: 3 },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  statusChip: { marginRight: 8 },
  active: { backgroundColor: "#2ecc71" },
  pending: { backgroundColor: "#f39c12" },
  btn: { marginHorizontal: 4 },
});
