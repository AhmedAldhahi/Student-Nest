import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Card, Chip, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { resolveImageSource } from "../../../../utils/resolveImageSource";
import { Apartment } from "../../../apartments/types";

const allApartments: Apartment[] = [
  {
    apartmentId: "APT-001",
    landlordId: 1,
    propertyStatus: "available",
    title: "Modern Loft in Downtown",
    description: "Spacious loft with open floor plan and city views.",
    price: "750",
    address: "Amman, Jordan",
    rooms: 3,
    beds: 2,
    images: [require("../../../apartments/assets/apartment-picture2.jpg")],
    verified: false,
  },
  {
    apartmentId: "APT-002",
    landlordId: 2,
    propertyStatus: "rented",
    title: "Cozy Studio near University",
    description: "Perfect for students, close to campus and cafes.",
    price: "400",
    address: "Amman, Jordan",
    rooms: 1,
    beds: 1,
    images: [require("../../../apartments/assets/apartment-picture.jpg")],
    verified: true,
  },
];

export default function AdminApartmentsScreen() {
  const route = useRoute();
  const landlordId = (route.params as any)?.landlordId;

  const apartmentsBase = landlordId
    ? allApartments.filter((a) => a.landlordId === landlordId)
    : allApartments;

  // 👇 Filter state
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "UNVERIFIED">("ALL");

  const apartments = apartmentsBase.filter((a) => {
    if (filter === "VERIFIED") return a.verified;
    if (filter === "UNVERIFIED") return !a.verified;
    return true;
  });

  const renderApartment = ({ item }: { item: Apartment }) => (
    <Card style={styles.card}>
      <TouchableOpacity>
        <Image source={resolveImageSource(item.images[0])} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.price}>${item.price}/month</Text>
          <Text style={styles.status}>
            Status: {item.propertyStatus.toUpperCase()}
          </Text>
          <Text style={styles.details}>
            {item.rooms} rooms • {item.beds} beds
          </Text>

          {/* 👇 Verification badge */}
          <Chip
            style={[
              styles.verifyChip,
              item.verified ? styles.verified : styles.unverified,
            ]}
            icon={item.verified ? "check" : "alert"}
          >
            {item.verified ? "Verified" : "Not Verified"}
          </Chip>
        </View>
      </TouchableOpacity>

      <Card.Actions style={styles.actions}>
        <Button mode="outlined" style={styles.btn}>
          View Details
        </Button>
        <Button
          mode="contained"
          style={[styles.btn, { backgroundColor: "#27ae60" }]}
        >
          Verify
        </Button>
        <Button
          mode="contained"
          style={[styles.btn, { backgroundColor: "#c0392b" }]}
        >
          Reject
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {landlordId ? `Apartments for Landlord #${landlordId}` : "All Apartments"}
      </Text>

      {/* 👇 Filter chips styled like landlord screen */}
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

      <FlatList
        data={apartments}
        keyExtractor={(item) => item.apartmentId}
        renderItem={renderApartment}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
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
  address: { fontSize: 14, color: "#555", marginBottom: 6 },
  price: { fontSize: 16, fontWeight: "700", color: "#27ae60", marginBottom: 4 },
  status: { fontSize: 14, fontWeight: "500", color: "#e67e22", marginBottom: 4 },
  details: { fontSize: 14, color: "#444" },
  verifyChip: { marginTop: 8, alignSelf: "flex-start" },
  verified: { backgroundColor: "#2ecc71" },
  unverified: { backgroundColor: "#f39c12" },
  all: { backgroundColor: "#95a5a6" },
  actions: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 8 },
  btn: { marginHorizontal: 4, borderRadius: 8 },
  filterRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  filterChip: { marginHorizontal: 4 },
});
