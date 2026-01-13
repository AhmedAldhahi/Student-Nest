import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { Card, Chip, Button, Searchbar } from "react-native-paper";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../../../context/AuthContext";
import { getAllApartments, verifyApartment, searchApartments, deleteApartment } from "../../api/adminService";
import { AdminApartment } from "./types";


export default function AdminApartmentsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { token } = useAuth();
  const landlordId = (route.params as any)?.landlordId;

  const [apartments, setApartments] = useState<AdminApartment[]>([]);
  const [allApartments, setAllApartments] = useState<AdminApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "UNVERIFIED">("ALL");
  const [verifying, setVerifying] = useState<string | number | null>(null); // track which apartment is being verified
  const [deleting, setDeleting] = useState<string | number | null>(null); // track which apartment is being deleted
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!searchQuery.trim()) {
        setApartments(allApartments);
      } else {
        performSearch(searchQuery);
      }
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, allApartments]);

  const performSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      if (!token) throw new Error("No token");

      const data = await searchApartments(token, query);
      setApartments(data);
    } catch (err: any) {
      console.error("Error searching apartments:", err);
      setError(err.message || "Failed to search apartments");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchApartments();
    }, [token])
  );

  const handleDelete = async (apartmentId: number | string) => {
    if (!token) {
      Alert.alert("Error", "No authentication token found");
      return;
    }

    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this apartment? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setDeleting(apartmentId);
              await deleteApartment(token, apartmentId);

              // Remove from local state
              const removeFromList = (list: AdminApartment[]) => list.filter(a => a.apartmentId !== apartmentId);
              setApartments(prev => removeFromList(prev));
              setAllApartments(prev => removeFromList(prev));

              Alert.alert("Success", "Apartment deleted successfully");
            } catch (err: any) {
              console.error("Error deleting apartment:", err);
              Alert.alert("Error", err.message || "Failed to delete apartment");
            } finally {
              setDeleting(null);
            }
          }
        }
      ]
    );
  };

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!token) {
        throw new Error("No authentication token found");
      }
      const data = await getAllApartments(token);
      setApartments(data);
      setAllApartments(data);
    } catch (err: any) {
      console.error("Error fetching apartments:", err);
      setError(err.message || "Failed to fetch apartments");
    } finally {
      setLoading(false);
    }
  };

  // Filter apartments based on landlordId (if provided) and verification status
  const filteredApartments = apartments
    .filter((a) => {
      if (landlordId && a.landlordName !== landlordId) return false;
      return true;
    })
    .filter((a) => {
      if (filter === "VERIFIED") return a.Verified;
      if (filter === "UNVERIFIED") return !a.Verified;
      return true;
    });

  const getImageSource = (apartment: AdminApartment) => {
    // Check if apartmentPhoto exists and has items
    if (
      apartment.apartmentPhoto &&
      Array.isArray(apartment.apartmentPhoto) &&
      apartment.apartmentPhoto.length > 0
    ) {
      const firstPhoto = apartment.apartmentPhoto[0];

      // Handle if it's an object with photoUrl (new structure)
      if (typeof firstPhoto === 'object' && firstPhoto !== null && 'photoUrl' in firstPhoto) {
        const url = (firstPhoto as any).photoUrl;
        if (typeof url === 'string' && url.trim() !== '') {
          return { uri: url };
        }
      }

      // Handle legacy case if it happens to be a string
      if (typeof firstPhoto === 'string' && firstPhoto.trim() !== '' && firstPhoto !== 'null') {
        return { uri: firstPhoto };
      }
    }

    // Fallback to app logo
    return require("../../../../assets/images/Student-nest-logo.png");
  };

  const getPropertyStatusLabel = (status: boolean) => {
    return status ? "AVAILABLE" : "UNAVAILABLE";
  };

  const handleVerify = async (apartmentId: number | string, shouldVerify: boolean) => {
    if (!token) {
      Alert.alert("Error", "No authentication token found");
      return;
    }

    const action = shouldVerify ? "verify" : "unverify";
    Alert.alert(
      `Confirm ${shouldVerify ? "Verification" : "Unverification"}`,
      `Are you sure you want to ${action} this apartment?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: shouldVerify ? "Verify" : "Unverify",
          style: shouldVerify ? "default" : "destructive",
          onPress: async () => {
            try {
              setVerifying(apartmentId);
              await verifyApartment(token, apartmentId, shouldVerify);
              // Update local state and cached state
              const updateList = (list: AdminApartment[]) =>
                list.map((apt) =>
                  apt.apartmentId === apartmentId
                    ? { ...apt, Verified: shouldVerify }
                    : apt
                );

              setApartments((prev) => updateList(prev));
              setAllApartments((prev) => updateList(prev));
              Alert.alert("Success", `Apartment ${action}ed successfully`);
            } catch (err: any) {
              console.error(`Error ${action}ing apartment:`, err);
              Alert.alert("Error", err.message || `Failed to ${action} apartment`);
            } finally {
              setVerifying(null);
            }
          },
        },
      ]
    );
  };

  const renderApartment = ({ item }: { item: AdminApartment }) => (
    <Card style={styles.card}>
      <TouchableOpacity>
        <Image source={getImageSource(item)} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.landlord}>Landlord: {item.landlordName}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.price}>${item.price}/month</Text>
          <Text style={styles.status}>
            Status: {getPropertyStatusLabel(item.propertyStatus)}
          </Text>
          <Text style={styles.details}>
            {item.numberOfRoom} rooms • {item.numberOfBed} beds
          </Text>
          <View style={styles.tagsRow}>
            {item.isFully && (
              <Chip style={styles.tagChip} textStyle={styles.tagText}>Fully Furnished</Chip>
            )}
            {item.isJoin && (
              <Chip style={styles.tagChip} textStyle={styles.tagText}>Join Available</Chip>
            )}
          </View>

          {/* Verification badge */}
          <Chip
            style={[
              styles.verifyChip,
              item.Verified ? styles.verified : styles.unverified,
            ]}
            icon={item.Verified ? "check" : "alert"}
          >
            {item.Verified ? "Verified" : "Not Verified"}
          </Chip>
        </View>
      </TouchableOpacity>

      <Card.Actions style={styles.actions}>
        <Button
          mode="outlined"
          style={styles.btn}
          onPress={() => navigation.navigate("AdminApartmentDetail", { apartment: item })}
        >
          View
        </Button>
        <Button
          mode="outlined"
          buttonColor="#e74c3c"
          textColor="white"
          style={styles.btn}
          onPress={() => handleDelete(item.apartmentId)}
        >
          Delete
        </Button>
        {item.Verified ? (
          <Button
            mode="contained"
            style={[styles.btn, { backgroundColor: "#f39c12" }]}
            onPress={() => handleVerify(item.apartmentId as any, false)}
            loading={verifying === item.apartmentId}
            disabled={verifying === item.apartmentId}
          >
            Unverify
          </Button>
        ) : (
          <Button
            mode="contained"
            style={[styles.btn, { backgroundColor: "#27ae60" }]}
            onPress={() => handleVerify(item.apartmentId as any, true)}
            loading={verifying === item.apartmentId}
            disabled={verifying === item.apartmentId}
          >
            Verify
          </Button>
        )}
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={styles.loadingText}>Loading apartments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={fetchApartments} style={styles.retryBtn}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {landlordId ? `Apartments for ${landlordId}` : "All Apartments"}
      </Text>

      <Searchbar
        placeholder="Search apartments..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {["ALL", "VERIFIED", "UNVERIFIED"].map((type) => (
          <Chip
            key={type}
            selected={filter === type}
            onPress={() => setFilter(type as any)}
            style={[
              styles.filterChip,
              type === "VERIFIED"
                ? styles.verified
                : type === "UNVERIFIED"
                  ? styles.unverified
                  : styles.all,
            ]}
          >
            {type}
          </Chip>
        ))}
      </View>

      {filteredApartments.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No apartments found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredApartments}
          keyExtractor={(item) => item.apartmentId.toString()}
          renderItem={renderApartment}
          contentContainerStyle={styles.list}
          refreshing={loading}
          onRefresh={fetchApartments}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: "#333" },
  list: { paddingBottom: 80 },
  searchBar: { marginBottom: 16, backgroundColor: "#fff", elevation: 2 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    paddingBottom: 8,
  },
  image: { width: "100%", height: 180 },
  info: { padding: 12 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 4, color: "#1E3A8A" },
  landlord: { fontSize: 14, fontWeight: "500", color: "#7f8c8d", marginBottom: 4 },
  address: { fontSize: 14, color: "#555", marginBottom: 6 },
  price: { fontSize: 16, fontWeight: "700", color: "#27ae60", marginBottom: 4 },
  status: { fontSize: 14, fontWeight: "500", color: "#e67e22", marginBottom: 4 },
  details: { fontSize: 14, color: "#444" },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8, gap: 8 },
  tagChip: { backgroundColor: "#3498db", marginRight: 4 },
  tagText: { color: "#fff", fontSize: 12 },
  verifyChip: { marginTop: 8, alignSelf: "flex-start" },
  verified: { backgroundColor: "#2ecc71" },
  unverified: { backgroundColor: "#f39c12" },
  all: { backgroundColor: "#95a5a6" },
  actions: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8 },
  btn: { marginHorizontal: 4, borderRadius: 8 },
  filterRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  filterChip: { marginHorizontal: 4 },
  loadingText: { marginTop: 12, fontSize: 16, color: "#666" },
  errorText: { fontSize: 16, color: "#c0392b", textAlign: "center", marginBottom: 16 },
  retryBtn: { backgroundColor: "#1E3A8A" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#666" },
});
