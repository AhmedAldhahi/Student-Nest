import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { Text, Card, Avatar, Searchbar, Chip, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { getAllLandlords } from "../../api/adminService";
import { useAuth } from "../../../../context/AuthContext";
import { Landlord } from "./types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "LandlordsScreen">;

export default function LandlordsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "UNVERIFIED">("ALL");

  useEffect(() => {
    fetchLandlords();
  }, []);

  const fetchLandlords = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getAllLandlords(token);
      // The API returns an array directly as per user example
      if (Array.isArray(data)) {
        setLandlords(data);
      } else {
        // Fallback if it's wrapped in { data: [...] } or similar, generally safer to check
        console.warn("Expected array but got:", data);
        setLandlords([]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch landlords");
    } finally {
      setLoading(false);
    }
  };

  const filteredLandlords = landlords.filter((l) => {
    const matchesSearch =
      l.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.cliQAccount && l.cliQAccount.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter =
      filter === "ALL" ||
      (filter === "VERIFIED" && l.verifiedLandlord) ||
      (filter === "UNVERIFIED" && !l.verifiedLandlord);

    return matchesSearch && matchesFilter;
  });

  const renderLandlord = ({ item }: { item: Landlord }) => (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("LandlordDetailScreen", { landlord: item })
      }
    >
      <View style={styles.cardHeader}>
        {item.user.photo ? (
          <Avatar.Image size={48} source={{ uri: item.user.photo }} />
        ) : (
          <Avatar.Icon size={48} icon="account" />
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{item.user.name}</Text>
          <Text style={styles.email}>{item.user.email}</Text>
          <Text style={styles.detail}>Account: {item.cliQAccount}</Text>
          <Text style={styles.detail}>Phone: {item.user.phoneNumber}</Text>
        </View>
        <Chip
          style={[
            styles.verifyChip,
            item.verifiedLandlord ? styles.verified : styles.unverified,
          ]}
        >
          {item.verifiedLandlord ? "Verified" : "Not Verified"}
        </Chip>
      </View>

      <View style={styles.cardFooter}>
        <Button
          mode="outlined"
          style={styles.btn}
          onPress={() =>
            navigation.navigate("LandlordDetailScreen", { landlord: item })
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

      {loading ? (
        <ActivityIndicator size="large" color="#1E3A8A" />
      ) : (
        <FlatList
          data={filteredLandlords}
          keyExtractor={(item) => item.user.userId}
          renderItem={renderLandlord}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No landlords found.</Text>}
        />
      )}
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
