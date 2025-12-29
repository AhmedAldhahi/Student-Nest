import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { Card, Chip, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../../../context/AuthContext";
import { getAllApartments, verifyApartment } from "../../api/adminService";
import { AdminApartment } from "./types";

// Placeholder images for apartments without photos
const PLACEHOLDER_IMAGES = [
  require("../../../../assets/images/apartment-picture-a.jpg"),
  require("../../../../assets/images/apartment-picture-b.jpg"),
  require("../../../../assets/images/apartment-picture-c.jpg"),
];

export default function AdminApartmentsScreen() {
  const route = useRoute();
  const { token } = useAuth();
  const landlordId = (route.params as any)?.landlordId;

  const [apartments, setApartments] = useState<AdminApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "UNVERIFIED">("ALL");
  const [verifying, setVerifying] = useState<number | null>(null); // track which apartment is being verified

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!token) {
        throw new Error("No authentication token found");
      }
      const data = await getAllApartments(token);
      setApartments(data);
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
    if (apartment.apartmentPhoto && apartment.apartmentPhoto.length > 0) {
      return { uri: apartment.apartmentPhoto[0] };
    }
    // Cycle through placeholder images based on apartment ID
    const index = apartment.apartmentId % PLACEHOLDER_IMAGES.length;
    return PLACEHOLDER_IMAGES[index];
  };

  const getPropertyStatusLabel = (status: boolean) => {
    return status ? "AVAILABLE" : "UNAVAILABLE";
  };

  const handleVerify = async (apartmentId: number, shouldVerify: boolean) => {
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
              // Update local state
              setApartments((prev) =>
                prev.map((apt) =>
                  apt.apartmentId === apartmentId
                    ? { ...apt, Verified: shouldVerify }
                    : apt
                )
              );
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
        <Button mode="outlined" style={styles.btn}>
          View Details
        </Button>
        {item.Verified ? (
          <Button
            mode="contained"
            style={[styles.btn, { backgroundColor: "#c0392b" }]}
            onPress={() => handleVerify(item.apartmentId, false)}
            loading={verifying === item.apartmentId}
            disabled={verifying === item.apartmentId}
          >
            Unverify
          </Button>
        ) : (
          <Button
            mode="contained"
            style={[styles.btn, { backgroundColor: "#27ae60" }]}
            onPress={() => handleVerify(item.apartmentId, true)}
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
