import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Avatar, Searchbar, Chip, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "LandlordsScreen">;

const mockLandlords = [
  {
    landlordId: 1,
    name: "Ahmed Khalid",
    email: "ahmed@example.com",
    phoneNumber: "0791234567",
    photo: null,
    isActive: "activate",
    verified: true,
    clicQAccount: "LAND12345",
  },
  {
    landlordId: 2,
    name: "Sarah Ali",
    email: "sarah@example.com",
    phoneNumber: "0789876543",
    photo: null,
    isActive: "ban",
    verified: false,
    clicQAccount: "LAND67890",
  },
];

export default function LandlordsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [landlords, setLandlords] = useState(mockLandlords);
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "UNVERIFIED">("ALL");

  const filteredLandlords = landlords.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.clicQAccount.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "ALL" ||
      (filter === "VERIFIED" && l.verified) ||
      (filter === "UNVERIFIED" && !l.verified);

    return matchesSearch && matchesFilter;
  });

  const renderLandlord = ({ item }: { item: typeof mockLandlords[0] }) => (
  <Card
    style={styles.card}
    onPress={() =>
      navigation.navigate("LandlordDetailScreen", { landlordId: item.landlordId })
    }
  >
    <View style={styles.cardHeader}>
      {item.photo ? (
        <Avatar.Image size={48} source={{ uri: item.photo }} />
      ) : (
        <Avatar.Icon size={48} icon="account" />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.detail}>Account: {item.clicQAccount}</Text>
        <Text style={styles.detail}>Phone: {item.phoneNumber}</Text>
      </View>
      <Chip
        style={[
          styles.verifyChip,
          item.verified ? styles.verified : styles.unverified,
        ]}
      >
        {item.verified ? "Verified" : "Not Verified"}
      </Chip>
    </View>

    <View style={styles.cardFooter}>
      <Button
        mode="outlined"
        style={styles.btn}
        onPress={() =>
          navigation.navigate("LandlordDetailScreen", { landlordId: item.landlordId })
        }
      >
        View Dashboard
      </Button>
    </View>
  </Card>
);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Landlords</Text>
      <Searchbar
        placeholder="Search by name, email, or account"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.search}
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

      <FlatList
        data={filteredLandlords}
        keyExtractor={(item) => item.landlordId.toString()}
        renderItem={renderLandlord}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: "#333" },
  search: { marginBottom: 16, borderRadius: 12 },
  filterRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  filterChip: { marginHorizontal: 4 },
  card: { marginBottom: 16, borderRadius: 12, elevation: 3, padding: 12 },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: "700", color: "#1E3A8A" },
  email: { fontSize: 14, color: "#555" },
  detail: { fontSize: 13, color: "#777" },
  statusChip: { marginLeft: 8 },
  active: { backgroundColor: "#2ecc71" },
  banned: { backgroundColor: "#e74c3c" },
  deactivated: { backgroundColor: "#95a5a6" },
  cardFooter: { marginTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  verifyChip: { marginRight: 8 },
  verified: { backgroundColor: "#2ecc71" },
  unverified: { backgroundColor: "#f39c12" },
  all: { backgroundColor: "#95a5a6" },
  actions: { flexDirection: "row" },
  btn: { marginHorizontal: 4 },
});
