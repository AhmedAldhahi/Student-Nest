import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, FlatList, Alert } from "react-native";
import { Text, Card, Button, Chip, ActivityIndicator, Divider, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../../../navigation/types";
import { useAuth } from "../../../../context/AuthContext";
import { verifyLandlord } from "../../api/adminService";

type Props = NativeStackScreenProps<RootStackParamList, "LandlordDetailScreen">;

const features = [
  { key: "AdminApartmentsScreen", label: "Apartments", icon: "home" },
  { key: "AdminLeaseScreen", label: "Leases", icon: "document-text" },
  { key: "AdminRequestsScreen", label: "Requests", icon: "mail" },
  { key: "VerificationScreen", label: "Verification", icon: "shield-checkmark" },
];

export default function LandlordDetailScreen({ route, navigation }: Props) {
  const { landlord } = route.params;
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  // Local state to reflect changes immediately without refetching everything
  const [isVerified, setIsVerified] = useState(landlord.verifiedLandlord);

  const handleVerification = async (verify: boolean) => {
    if (!token) return;
    setLoading(true);
    try {
      await verifyLandlord(token, landlord.user.userId, verify);
      setIsVerified(verify);
      Alert.alert("Success", `Landlord has been ${verify ? "verified" : "rejected"}.`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update landlord status.");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: typeof features[0] }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate(item.key as any, { landlordId: landlord.user.userId })}
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
          <View style={styles.avatarContainer}>
            {landlord.user.photo ? (
              <Avatar.Image size={100} source={{ uri: landlord.user.photo }} />
            ) : (
              <Avatar.Icon size={100} icon="account" />
            )}
          </View>
          <Text style={styles.header}>{landlord.user.name}</Text>
          <Text style={styles.subHeader}>Landlord ID: {landlord.user.userId.slice(0, 8)}...</Text>

          <Divider style={styles.divider} />

          <Text style={styles.detailTitle}>Contact Info</Text>
          <Text style={styles.detail}>Email: {landlord.user.email}</Text>
          <Text style={styles.detail}>Phone: {landlord.user.phoneNumber}</Text>
          <Text style={styles.detail}>Address: {landlord.user.address}</Text>

          <Divider style={styles.divider} />

          <Text style={styles.detailTitle}>Account Details</Text>
          <Text style={styles.detail}>CliQ: {landlord.cliQAccount}</Text>
          <Text style={styles.detail}>Gov ID: {landlord.landlordGovId}</Text>
          <Text style={styles.detail}>Joined: {new Date(landlord.user.createdAt).toLocaleDateString()}</Text>

          <View style={styles.chipRow}>
            <Chip icon={landlord.user.emailVerfied ? "check" : "alert"} style={styles.chip}>
              {landlord.user.emailVerfied ? "Email Verified" : "Email Unverified"}
            </Chip>
            <Chip
              icon={isVerified ? "shield-check" : "shield-alert"}
              style={[styles.chip, isVerified ? styles.verified : styles.unverified]}
            >
              {isVerified ? "Verified Landlord" : "Unverified Landlord"}
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Verification actions */}
      <View style={styles.verificationBlock}>
        {loading ? (
          <ActivityIndicator animating={true} color="#1E3A8A" />
        ) : (
          <>
            {!isVerified && (
              <Button
                mode="contained"
                icon="check"
                style={styles.verifyBtn}
                labelStyle={styles.btnLabel}
                onPress={() => handleVerification(true)}
              >
                Verify Landlord
              </Button>
            )}

            {isVerified && (
              <Button
                mode="contained"
                icon="close"
                style={styles.rejectBtn}
                labelStyle={styles.btnLabel}
                onPress={() => handleVerification(false)}
              >
                Reject Landlord (Unverify)
              </Button>
            )}
          </>
        )}

        <Button
          mode="outlined"
          icon="file-document"
          style={styles.detailsBtn}
          labelStyle={styles.btnLabel}
          onPress={() => {
            if (landlord.document) {
              // In a real app, maybe open a modal or browser.
              // For now just alert or navigate to a webview if needed.
              Alert.alert("Document URL", landlord.document);
            } else {
              Alert.alert("No Document", "This landlord has not uploaded a verification document.");
            }
          }}
        >
          View Verification Document
        </Button>
      </View>

      {/* Dashboard grid */}
      <Text style={styles.sectionHeader}>Admin Actions</Text>
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
    overflow: 'hidden',
    paddingVertical: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  header: { fontSize: 24, fontWeight: "700", marginTop: 12, color: "#1E3A8A" },
  subHeader: { fontSize: 14, color: "#777", marginBottom: 12 },
  detailTitle: { fontSize: 16, fontWeight: "600", marginTop: 8, marginBottom: 4, color: "#333" },
  detail: { fontSize: 14, color: "#555", marginBottom: 2 },
  divider: { marginVertical: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8 },
  chip: {},
  active: { backgroundColor: "#2ecc71" },
  verified: { backgroundColor: "#d4edda" }, // Light green for verified
  unverified: { backgroundColor: "#f8d7da" }, // Light red for unverified

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
