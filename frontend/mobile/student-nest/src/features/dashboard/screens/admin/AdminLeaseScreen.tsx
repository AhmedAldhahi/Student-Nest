import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Alert, RefreshControl } from "react-native";
import { Card, Chip, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { Lease } from "./types";
import { useAuth } from "../../../../context/AuthContext";
import { getAllLeases } from "../../api/adminService";

type Props = NativeStackScreenProps<RootStackParamList, "AdminLeaseScreen">;

export default function AdminLeaseScreen({ route }: Props) {
  const { token } = useAuth();
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");
  const [search, setSearch] = useState("");

  const fetchLeases = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getAllLeases(token);
      if (Array.isArray(data)) {
        setLeases(data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch leases");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeases();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLeases();
  }, []);

  // Filter + search logic
  const filteredLeases = leases.filter((l) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? l.LeaseActivationStatus === true
          : l.LeaseActivationStatus === false;

    const matchesSearch =
      search === "" ||
      (l.studentName && l.studentName.toLowerCase().includes(search.toLowerCase())) ||
      (l.landlordName && l.landlordName.toLowerCase().includes(search.toLowerCase())) ||
      (l.apartmentTitle && l.apartmentTitle.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const renderLease = ({ item }: { item: Lease }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{item.apartmentTitle}</Text>
          <Chip
            style={[
              styles.statusChip,
              item.LeaseActivationStatus
                ? styles.active
                : (item.isLandlordSigned && item.isStudentSigned)
                  ? styles.ready
                  : styles.pending,
            ]}
          >
            {item.LeaseActivationStatus
              ? "ACTIVE"
              : (item.isLandlordSigned && item.isStudentSigned)
                ? "READY"
                : "PENDING"}
          </Chip>
        </View>
        <Text style={styles.detail}>Lease ID: {item.leaseId}</Text>
        <Text style={styles.detail}>Student: {item.studentName}</Text>
        <Text style={styles.detail}>Landlord: {item.landlordName}</Text>
        <Text style={styles.detail}>Term: {item.leaseTerm} ({item.leaseStartDate} - {item.leaseEndDate})</Text>
        <Text style={styles.detail}>Rent: ${item.monthlyRent}</Text>
        <Text style={styles.detail}>Utilities: {item.includeUtilities || "None"}</Text>
        <Text style={styles.detail}>Rules: {item.houseRule}</Text>
        <Text style={styles.detail}>Status: Landlord {item.isLandlordSigned ? "✅" : "❌"} | Student {item.isStudentSigned ? "✅" : "❌"}</Text>
        <Text style={styles.detail}>Created At: {new Date(item.createAt).toLocaleDateString()}</Text>
      </Card.Content>
      {/* 
      <Card.Actions>
        <Button mode="outlined" onPress={() => alert(`Audit lease #${item.leaseId}`)}>
          Audit
        </Button>
      </Card.Actions>
       */}
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>All Leases</Text>

        {/* Search bar */}
        <TextInput
          placeholder="Search by Student, Landlord, or Apartment..."
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

        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#1E3A8A" />
        ) : (
          <FlatList
            data={filteredLeases}
            keyExtractor={(l) => l.leaseId.toString()}
            renderItem={renderLease}
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No leases found.</Text>}
          />
        )}
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
  title: { fontSize: 18, fontWeight: "600", color: "#333", flex: 1, marginRight: 8 },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  statusChip: { alignSelf: "flex-start", height: 32 },
  pending: { backgroundColor: "#f39c12" },
  ready: { backgroundColor: "#3498db" },
  active: { backgroundColor: "#2ecc71" },
});
