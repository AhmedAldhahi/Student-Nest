import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Alert, RefreshControl } from "react-native";
import { Card, Chip, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../../navigation/types";
import { LeaseRequest } from "./types";
import { useAuth } from "../../../../context/AuthContext";
import { getAllLeaseRequests, getLeaseRequestById } from "../../api/adminService";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "AdminRequestsScreen">;

export default function AdminRequestsScreen({ route }: Props) {
  const { token } = useAuth();
  const [requests, setRequests] = useState<LeaseRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "Pending" | "Accept" | "Reject">("all");
  const [search, setSearch] = useState("");
  const [searchedRequest, setSearchedRequest] = useState<LeaseRequest | null>(null);
  const [isSearchingById, setIsSearchingById] = useState(false);

  const fetchRequests = async () => {
    if (!token) return;
    setLoading(true);
    setSearchedRequest(null);
    try {
      const data = await getAllLeaseRequests(token);
      if (Array.isArray(data)) {
        setRequests(data);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch lease requests");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const searchRequestById = async (id: string) => {
    if (!token) return;
    setIsSearchingById(true);
    try {
      const data = await getLeaseRequestById(token, id);
      if (data && data.requestLeaseId) {
        setSearchedRequest(data);
      } else {
        setSearchedRequest(null);
        Alert.alert("Not Found", `No lease request found with ID: ${id}`);
      }
    } catch (error: any) {
      setSearchedRequest(null);
      Alert.alert("Error", error.message || `Failed to find lease request with ID: ${id}`);
    } finally {
      setIsSearchingById(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (text.trim() === "") {
      setSearchedRequest(null);
    }
  };

  const handleSearchSubmit = () => {
    const trimmedSearch = search.trim();
    if (/^\d+$/.test(trimmedSearch)) {
      searchRequestById(trimmedSearch);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchedRequest(null);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearch("");
    setSearchedRequest(null);
    fetchRequests();
  }, []);

  // Determine which requests to display
  const displayRequests = searchedRequest ? [searchedRequest] : requests;

  // Filter + search logic
  const filteredRequests = displayRequests.filter((r) => {
    const matchesFilter =
      filter === "all" ? true : r.requestStatus === filter;

    // Skip local text filter if showing searched result
    if (searchedRequest) return matchesFilter;

    const matchesSearch =
      search === "" ||
      /^\d+$/.test(search.trim()) ||
      r.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      r.landlordName?.toLowerCase().includes(search.toLowerCase()) ||
      r.apartmentTitle?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Parse rent term "01,12,01" to readable format
  const parseRentTerm = (rentTerm: string) => {
    const parts = rentTerm.split(",");
    if (parts.length === 3) {
      const months = parseInt(parts[1], 10);
      if (months === 12) return "1 Year";
      if (months === 6) return "6 Months";
      if (months === 4) return "Semester";
      return `${months} Months`;
    }
    return rentTerm;
  };

  // Get status color and icon
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Accept":
        return { bg: "#d4edda", color: "#155724", icon: "checkmark-circle" as const };
      case "Reject":
        return { bg: "#f8d7da", color: "#721c24", icon: "close-circle" as const };
      default:
        return { bg: "#fff3cd", color: "#856404", icon: "time" as const };
    }
  };

  const renderRequest = ({ item }: { item: LeaseRequest }) => {
    const statusStyle = getStatusStyle(item.requestStatus);

    return (
      <Card style={styles.card}>
        <Card.Content>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.idBadge}>
                <Text style={styles.idText}>#{item.requestLeaseId}</Text>
              </View>
              <Text style={styles.apartmentTitle} numberOfLines={1}>
                {item.apartmentTitle}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
              <Ionicons name={statusStyle.icon} size={14} color={statusStyle.color} />
              <Text style={[styles.statusText, { color: statusStyle.color }]}>
                {item.requestStatus}
              </Text>
            </View>
          </View>

          {/* Price and Term Row */}
          <View style={styles.priceRow}>
            <View style={styles.priceTag}>
              <Ionicons name="pricetag" size={16} color="#1E3A8A" />
              <Text style={styles.priceText}>${item.apartmentPrice}/mo</Text>
            </View>
            <View style={styles.termTag}>
              <Ionicons name="calendar" size={16} color="#666" />
              <Text style={styles.termText}>{parseRentTerm(item.rentTerm)}</Text>
            </View>
            <View style={styles.dateTag}>
              <Ionicons name="play" size={14} color="#666" />
              <Text style={styles.dateText}>{item.startDate}</Text>
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
                <Text style={styles.majorText}>{item.Major}</Text>
              </View>
            </View>
            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-forward" size={20} color="#ccc" />
            </View>
            <View style={styles.personInfo}>
              <Ionicons name="business" size={18} color="#9b59b6" />
              <View style={styles.personDetails}>
                <Text style={styles.personLabel}>Landlord</Text>
                <Text style={styles.personName}>{item.landlordName}</Text>
              </View>
            </View>
          </View>

          {/* Message */}
          {item.requestMessage && (
            <View style={styles.messageContainer}>
              <Ionicons name="chatbubble-ellipses" size={16} color="#888" />
              <Text style={styles.messageText}>"{item.requestMessage}"</Text>
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
        <Text style={styles.header}>Lease Requests</Text>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Search by ID, Student, Landlord, or Apartment..."
            value={search}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            style={styles.searchBar}
            placeholderTextColor="#999"
          />
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
        {searchedRequest && (
          <View style={styles.searchResultIndicator}>
            <View style={styles.searchResultLeft}>
              <Ionicons name="checkmark-circle" size={18} color="#1E3A8A" />
              <Text style={styles.searchResultText}>
                Showing request #{searchedRequest.requestLeaseId}
              </Text>
            </View>
            <Button
              mode="text"
              compact
              onPress={clearSearch}
              labelStyle={styles.clearButtonLabel}
            >
              Show All
            </Button>
          </View>
        )}

        {/* Filter bar */}
        <View style={styles.filterRow}>
          {["all", "Pending", "Accept", "Reject"].map((s) => {
            const isSelected = filter === s;
            const chipStyle =
              s === "Accept"
                ? styles.acceptChip
                : s === "Reject"
                  ? styles.rejectChip
                  : s === "Pending"
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
                {s === "all" ? "All" : s}
              </Chip>
            );
          })}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statItem, { backgroundColor: "#fff3cd" }]}>
            <Text style={styles.statNumber}>
              {requests.filter((r) => r.requestStatus === "Pending").length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: "#d4edda" }]}>
            <Text style={styles.statNumber}>
              {requests.filter((r) => r.requestStatus === "Accept").length}
            </Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: "#f8d7da" }]}>
            <Text style={styles.statNumber}>
              {requests.filter((r) => r.requestStatus === "Reject").length}
            </Text>
            <Text style={styles.statLabel}>Rejected</Text>
          </View>
        </View>

        {(loading && !refreshing) || isSearchingById ? (
          <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={filteredRequests}
            keyExtractor={(r) => r.requestLeaseId.toString()}
            renderItem={renderRequest}
            contentContainerStyle={{ paddingBottom: 80 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="document-text-outline" size={60} color="#ccc" />
                <Text style={styles.emptyText}>No lease requests found</Text>
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
  filterRow: { flexDirection: "row", marginBottom: 12, flexWrap: "wrap" },
  filterChip: { marginRight: 8, marginBottom: 4 },
  allChip: { backgroundColor: "#e8e8e8" },
  pendingChip: { backgroundColor: "#fff3cd" },
  acceptChip: { backgroundColor: "#d4edda" },
  rejectChip: { backgroundColor: "#f8d7da" },
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
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
    gap: 12,
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
  dateTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  dateText: { fontSize: 13, color: "#555" },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  peopleRow: {
    flexDirection: "row",
    alignItems: "center",
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
  majorText: { fontSize: 12, color: "#3498db", fontStyle: "italic" },
  arrowContainer: { paddingHorizontal: 10 },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    gap: 8,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    lineHeight: 20,
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
});
