import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { Apartment } from "../types";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { resolveImageSource } from "../../../utils/resolveImageSource";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";

// 👇 typed navigation
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyApartmentsScreen"
>;

// Mock landlord apartments — replace with API later
export const myApartments: Apartment[] = [
  {
    apartmentId: "APT-001",
    propertyStatus: "available",
    title: "Modern Loft in Downtown",
    description: "Spacious loft with open floor plan and city views.",
    price: "750",
    address: "Amman, Jordan",
    rooms: 3,
    beds: 2,
    images: [require("../assets/apartment-picture.jpg")],
    verified: false, // 👈 add verified flag
  },
  {
    apartmentId: "APT-002",
    propertyStatus: "rented",
    title: "Cozy Studio near University",
    description: "Perfect for students, close to campus and cafes.",
    price: "400",
    address: "Amman, Jordan",
    rooms: 1,
    beds: 1,
    images: [require("../assets/apartment-picture-a.jpg")],
    verified: true, // 👈 verified
  },
];

export default function MyApartmentsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  //use focus effect to fetch upon navigation

  const renderApartment = ({ item }: { item: Apartment }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("EditApartmentScreen", { apartment: item })
      }
    >
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
        <Text
          style={[
            styles.verification,
            item.verified
              ? styles.verified
              : item.apartmentDocumentId
              ? styles.pending
              : styles.notVerified,
          ]}
        >
          {item.verified
            ? "Verified"
            : item.apartmentDocumentId
            ? "Pending Verification"
            : "Not Verified"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>{user?.name}'s Apartments</Text>
        <FlatList
          data={myApartments}
          keyExtractor={(item) => item.apartmentId}
          renderItem={renderApartment}
          contentContainerStyle={styles.list}
        />
        {/* 👇 Floating Add Apartment Button */}
        <FAB
          icon="plus"
          color="#fff"
          style={[styles.fab, { bottom: insets.bottom + 30 }]}
          onPress={() => navigation.navigate("AddApartmentForm")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2a9d8f",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e76f51",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#444",
  },
  verification: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    overflow: "hidden",
    textAlign: "center",
    color: "#fff", // 👈 text always white
  },
  verified: {
    backgroundColor: "#2ecc71", // green
  },
  pending: {
    backgroundColor: "#f39c12", // orange/yellow
  },
  notVerified: {
    backgroundColor: "#e74c3c", // red
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#1E3A8A",
  },
});
