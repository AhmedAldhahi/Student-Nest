import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { Text, Card, Button, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "LandlordDetailScreen">;

const features = [
  { key: "AdminApartmentsScreen", label: "Apartments", icon: "home" },
  { key: "AdminLeaseScreen", label: "Leases", icon: "document-text" },
  { key: "AdminRequestsScreen", label: "Requests", icon: "mail" },
  { key: "VerificationScreen", label: "Verification", icon: "shield-checkmark" },
];

export default function LandlordDetailScreen({ route, navigation }: Props) {
  const { landlordId } = route.params;

  const renderItem = ({ item }: { item: typeof features[0] }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate(item.key as any, { landlordId })}
    >
      <View style={styles.cardContent}>
        <Ionicons name={item.icon as any} size={32} color="#1E3A8A" />
        <Text style={styles.label}>{item.label}</Text>
      </View>
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Profile section */}
      <Card style={styles.profileCard}>
        <Card.Content>
          <Text style={styles.header}>Landlord #{landlordId}</Text>
          <Text style={styles.subHeader}>Name: Ahmed Khalid</Text>
          <Text style={styles.detail}>Email: ahmed@example.com</Text>
          <Chip style={styles.chip} icon="check">Email Verified</Chip>
          <Text style={styles.detail}>Phone: 0791234567</Text>
          <Text style={styles.detail}>Date of Birth: 1985-06-15</Text>
          <Text style={styles.detail}>Address: Amman, Jordan</Text>
          <Text style={styles.detail}>Role: Landlord</Text>
          <Text style={styles.detail}>Account: LAND12345</Text>
          <Text style={styles.detail}>Gov ID: ****6789</Text>
          <Chip style={[styles.chip, styles.active]} icon="check">Active</Chip>
          <Chip style={[styles.chip, styles.verified]} icon="shield-checkmark">Verified</Chip>
          <Text style={styles.detail}>Created At: 2025-01-10</Text>
          <Text style={styles.detail}>Updated At: 2025-11-18</Text>
        </Card.Content>
      </Card>

      {/* Verification actions */}
      <View style={styles.verificationBlock}>
        <Button
          mode="contained"
          icon="check"
          style={styles.verifyBtn}
          labelStyle={styles.btnLabel}
          onPress={() => alert("Verify landlord")}
        >
          Verify Landlord
        </Button>

        <Button
          mode="contained"
          icon="close"
          style={styles.rejectBtn}
          labelStyle={styles.btnLabel}
          onPress={() => alert("Reject landlord")}
        >
          Reject Landlord
        </Button>

        <Button
          mode="outlined"
          icon="information-circle"
          style={styles.detailsBtn}
          labelStyle={styles.btnLabel}
          onPress={() => alert("View full landlord details")}
        >
          View Details
        </Button>
      </View>

      {/* Dashboard grid */}
      <Text style={styles.sectionHeader}>Dashboard</Text>
      <FlatList
        data={features}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false} // important: disable inner scroll to avoid nested list error
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 16, backgroundColor: "#f9f9f9" },

  // Profile card
  profileCard: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
    paddingVertical: 12,
  },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 6, color: "#1E3A8A" },
  subHeader: { fontSize: 18, fontWeight: "600", marginBottom: 6, color: "#333" },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  chip: { marginVertical: 4, alignSelf: "flex-start" },
  active: { backgroundColor: "#2ecc71" },
  verified: { backgroundColor: "#3498db" },

  // Verification block
  verificationBlock: { marginBottom: 20, gap: 12 },
  verifyBtn: {
    borderRadius: 10,
    backgroundColor: "#2ecc71",
    width: "100%",
  },
  rejectBtn: {
    borderRadius: 10,
    backgroundColor: "#e74c3c",
    width: "100%",
  },
  detailsBtn: {
    borderRadius: 10,
    borderColor: "#1E3A8A",
    width: "100%",
  },
  btnLabel: { fontSize: 16, fontWeight: "600" },

  // Dashboard grid
  sectionHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 12,
    color: "#333",
  },
  row: { justifyContent: "space-between", marginBottom: 12 },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
  },
  cardContent: { alignItems: "center", padding: 20 },
  label: { marginTop: 8, fontWeight: "600", color: "#1E3A8A" },
});
