import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Alert, RefreshControl } from "react-native";
import { Card, Chip, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { Lease } from "./types";
import { useAuth } from "../../../../context/AuthContext";
import { getAllLeases, searchLeases } from "../../api/adminService";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "AdminLeaseScreen">;

export default function AdminLeaseScreen({ route }: Props) {
  const { token } = useAuth();
  const [leases, setLeases] = useState<Lease[]>([]);
  const [searchResults, setSearchResults] = useState<Lease[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchLeases = async () => {
    if (!token) return;
    setLoading(true);
    setSearchResults(null);
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

  const performSearch = async (query: string) => {
    if (!token || query.trim() === "") {
      setSearchResults(null);
      return;
    }
    setIsSearching(true);
    try {
      const data = await searchLeases(token, query.trim());
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error: any) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (text.trim() === "") {
      setSearchResults(null);
      return;
    }

    // Debounce search - wait 500ms after user stops typing
    searchTimeout.current = setTimeout(() => {
      performSearch(text);
    }, 500);
  };

  const clearSearch = () => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    setSearch("");
    setSearchResults(null);
  };

  useEffect(() => {
    fetchLeases();
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    clearSearch();
    fetchLeases();
  }, []);

  // Determine which leases to display
  const displayLeases = searchResults !== null ? searchResults : leases;

  // Filter logic (applied to both all leases and search results)
  const filteredLeases = displayLeases.filter((l) => {
    return filter === "all"
      ? true
      : filter === "active"
        ? l.LeaseActivationStatus === true
        : l.LeaseActivationStatus === false;
  });

  // Get status info
  const getStatusInfo = (lease: Lease) => {
    if (lease.LeaseActivationStatus) {
      return { text: "ACTIVE", bg: "#d4edda", color: "#155724", icon: "checkmark-circle" as const };
    } else if (lease.isLandlordSigned && lease.isStudentSigned) {
      return { text: "READY", bg: "#cce5ff", color: "#004085", icon: "checkmark-done" as const };
    }
    return { text: "PENDING", bg: "#fff3cd", color: "#856404", icon: "time" as const };
  };

  const renderLease = ({ item }: { item: Lease }) => {
    const statusInfo = getStatusInfo(item);

    return (
      <Card style={styles.card}>
        <Card.Content>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.idBadge}>
                <Text style={styles.idText}>#{item.leaseId}</Text>
              </View>
              <Text style={styles.apartmentTitle} numberOfLines={1}>
                {item.apartmentTitle}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
              <Ionicons name={statusInfo.icon} size={14} color={statusInfo.color} />
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>
          </View>

          {/* Price and Term Row */}
          <View style={styles.infoRow}>
            <View style={styles.priceTag}>
              <Ionicons name="pricetag" size={16} color="#1E3A8A" />
              <Text style={styles.priceText}>${item.monthlyRent}/mo</Text>
            </View>
            <View style={styles.termTag}>
              <Ionicons name="calendar" size={16} color="#666" />
              <Text style={styles.termText}>{item.leaseTerm}</Text>
            </View>
            <View style={styles.utilityTag}>
              <Ionicons name="flash" size={14} color="#666" />
              <Text style={styles.utilityText}>{item.includeUtilities || "None"}</Text>
            </View>
          </View>

          {/* Dates Row */}
          <View style={styles.datesRow}>
            <View style={styles.dateItem}>
              <Ionicons name="play" size={14} color="#27ae60" />
              <Text style={styles.dateLabel}>Start:</Text>
              <Text style={styles.dateValue}>{item.leaseStartDate}</Text>
            </View>
            <View style={styles.dateItem}>
              <Ionicons name="stop" size={14} color="#e74c3c" />
              <Text style={styles.dateLabel}>End:</Text>
              <Text style={styles.dateValue}>{item.leaseEndDate}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* People Info */}
          <View style={styles.peopleRow}>
            <View style={styles.personInfo}>
              <Ionicons name="school" size={18} color="#3498db" />
              <View style={styles.personDetails}>
                <Text style={styles.personLabel}>Student</Text>
                <Text style={styles.personName}>{item.studentName}</Text>
                <View style={styles.signatureRow}>
                  <Ionicons
                    name={item.isStudentSigned ? "checkmark-circle" : "close-circle"}
                    size={14}
                    color={item.isStudentSigned ? "#27ae60" : "#e74c3c"}
                  />
                  <Text style={[styles.signatureText, { color: item.isStudentSigned ? "#27ae60" : "#e74c3c" }]}>
                    {item.isStudentSigned ? "Signed" : "Not Signed"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="swap-horizontal" size={20} color="#ccc" />
            </View>
            <View style={styles.personInfo}>
              <Ionicons name="business" size={18} color="#9b59b6" />
              <View style={styles.personDetails}>
                <Text style={styles.personLabel}>Landlord</Text>
                <Text style={styles.personName}>{item.landlordName}</Text>
                <View style={styles.signatureRow}>
                  <Ionicons
                    name={item.isLandlordSigned ? "checkmark-circle" : "close-circle"}
                    size={14}
                    color={item.isLandlordSigned ? "#27ae60" : "#e74c3c"}
                  />
                  <Text style={[styles.signatureText, { color: item.isLandlordSigned ? "#27ae60" : "#e74c3c" }]}>
                    {item.isLandlordSigned ? "Signed" : "Not Signed"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* House Rules */}
          {item.houseRule && (
            <View style={styles.rulesContainer}>
              <Ionicons name="document-text" size={16} color="#888" />
              <Text style={styles.rulesText}>{item.houseRule}</Text>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footerRow}>
            <Ionicons name="time-outline" size={14} color="#999" />
            <Text style={styles.createdText}>
              Created: {new Date(item.createAt).toLocaleDateString()}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Leases</Text>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search by Student, Landlord, or Apartment..."
            value={search}
            onChangeText={handleSearchChange}
            returnKeyType="search"
            style={styles.searchBar}
            placeholderTextColor="#999"
          />
          {isSearching && (
            <ActivityIndicator size="small" color="#1E3A8A" style={{ marginRight: 8 }} />
          )}
          {search.length > 0 && (
            <Button
              mode="text"
              compact
              onPress={clearSearch}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#888" />
            </Button>
          )}
        </View>

        {/* Search result indicator */}
        {searchResults !== null && (
          <View style={styles.searchResultIndicator}>
            <View style={styles.searchResultLeft}>
              <Ionicons name="search" size={18} color="#1E3A8A" />
              <Text style={styles.searchResultText}>
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{search}"
              </Text>
            </View>
            <Button
              mode="text"
              compact
              onPress={clearSearch}
              labelStyle={styles.clearButtonLabel}
            >
              Clear
            </Button>
          </View>
        )}

        {/* Filter bar */}
        <View style={styles.filterRow}>
          {["all", "active", "pending"].map((s) => {
            const isSelected = filter === s;
            const chipStyle =
              s === "active"
                ? styles.activeChip
                : s === "pending"
                  ? styles.pendingChip
                  : styles.allChip;

            return (
              <Chip
                key={s}
                selected={isSelected}
                onPress={() => setFilter(s as any)}
                style={[styles.filterChip, chipStyle, isSelected && styles.selectedChip]}
                textStyle={[styles.chipText, isSelected && styles.selectedChipText]}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Chip>
            );
          })}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statItem, { backgroundColor: "#d4edda" }]}>
            <Text style={styles.statNumber}>
              {leases.filter((l) => l.LeaseActivationStatus === true).length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: "#cce5ff" }]}>
            <Text style={styles.statNumber}>
              {leases.filter((l) => !l.LeaseActivationStatus && l.isLandlordSigned && l.isStudentSigned).length}
            </Text>
            <Text style={styles.statLabel}>Ready</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: "#fff3cd" }]}>
            <Text style={styles.statNumber}>
              {leases.filter((l) => !l.LeaseActivationStatus && (!l.isLandlordSigned || !l.isStudentSigned)).length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {(loading && !refreshing) ? (
          <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={filteredLeases}
            keyExtractor={(l) => l.leaseId.toString()}
            renderItem={renderLease}
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="document-text-outline" size={60} color="#ccc" />
                <Text style={styles.emptyText}>No leases found</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f5f7fa" },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1E3A8A",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: { marginRight: 8 },
  searchBar: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
  },
  clearButton: { marginLeft: 4 },
  searchResultIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e8f4fd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 12,
    borderColor: "#1E3A8A",
    borderWidth: 1,
  },
  searchResultLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchResultText: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "600",
  },
  clearButtonLabel: {
    color: "#1E3A8A",
    fontSize: 13,
    fontWeight: "600",
  },
  filterRow: { flexDirection: "row", marginBottom: 12, flexWrap: "wrap" },
  filterChip: { marginRight: 8, marginBottom: 4 },
  allChip: { backgroundColor: "#e8e8e8" },
  pendingChip: { backgroundColor: "#fff3cd" },
  activeChip: { backgroundColor: "#d4edda" },
  selectedChip: { borderWidth: 2, borderColor: "#1E3A8A" },
  chipText: { fontSize: 13, color: "#333" },
  selectedChipText: { fontWeight: "700" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  statNumber: { fontSize: 22, fontWeight: "700", color: "#333" },
  statLabel: { fontSize: 12, color: "#666", marginTop: 2 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  idBadge: {
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  idText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  apartmentTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  statusText: { fontSize: 12, fontWeight: "600" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
    gap: 10,
  },
  priceTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f4fd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  priceText: { fontSize: 15, fontWeight: "700", color: "#1E3A8A" },
  termTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  termText: { fontSize: 13, color: "#555" },
  utilityTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  utilityText: { fontSize: 13, color: "#555" },
  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 16,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateLabel: { fontSize: 12, color: "#888" },
  dateValue: { fontSize: 13, fontWeight: "500", color: "#333" },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  peopleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  personInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: 8,
  },
  personDetails: { gap: 2 },
  personLabel: { fontSize: 11, color: "#888", textTransform: "uppercase" },
  personName: { fontSize: 14, fontWeight: "600", color: "#333" },
  signatureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  signatureText: { fontSize: 11, fontWeight: "500" },
  arrowContainer: { paddingHorizontal: 10, paddingTop: 10 },
  rulesContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    gap: 8,
  },
  rulesText: {
    flex: 1,
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  createdText: { fontSize: 12, color: "#999" },
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
