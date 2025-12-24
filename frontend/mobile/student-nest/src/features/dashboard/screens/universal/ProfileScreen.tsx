import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Text,
  Card,
  Button,
  Divider,
  useTheme,
  List,
} from "react-native-paper";

export default function ProfileScreen() {
  const theme = useTheme();

  // Mock user data (replace with real context/API)
  const user = {
    name: "Ahmed Khalid",
    role: "Landlord",
    email: "ahmed@example.com",
    phoneNumber: "0791234567",
    address: "Amman, Jordan",
    dateOfBirth: "1990-05-15",
    photo: null,
    isActive: "activate",
    emailVerified: true,
    createdAt: "2025-01-10",
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Profile Card */}
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {user.photo ? (
            <Avatar.Image size={80} source={{ uri: user.photo }} />
          ) : (
            <Avatar.Icon size={80} icon="account" />
          )}
          <View style={styles.info}>
            <Text style={[styles.name, { color: theme.colors.onSurface }]}>
              {user.name}
            </Text>
            <Text style={styles.role}>{user.role}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Details Section */}
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <List.Item
        title="Phone Number"
        description={user.phoneNumber}
        left={(props) => <List.Icon {...props} icon="phone" />}
      />
      <Divider />
      <List.Item
        title="Address"
        description={user.address}
        left={(props) => <List.Icon {...props} icon="map-marker" />}
      />
      <Divider />
      <List.Item
        title="Date of Birth"
        description={user.dateOfBirth}
        left={(props) => <List.Icon {...props} icon="calendar" />}
      />
      <Divider />
      <List.Item
        title="Account Status"
        description={user.isActive}
        left={(props) => <List.Icon {...props} icon="shield-check" />}
      />
      <Divider />
      <List.Item
        title="Email Verified"
        description={user.emailVerified ? "Yes" : "No"}
        left={(props) => <List.Icon {...props} icon="email-check" />}
      />
      <Divider />
      <List.Item
        title="Joined"
        description={user.createdAt}
        left={(props) => <List.Icon {...props} icon="clock" />}
      />

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          mode="contained"
          style={styles.primaryBtn}
          onPress={() => alert("Edit profile")}
        >
          Edit Profile
        </Button>
        <Button
          mode="outlined"
          style={styles.secondaryBtn}
          onPress={() => alert("Change password")}
        >
          Change Password
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  info: { flex: 1 },
  name: { fontSize: 20, fontWeight: "700" },
  role: { fontSize: 14, color: "#666", marginTop: 2 },
  email: { fontSize: 13, color: "#888", marginTop: 2 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    justifyContent: "space-between",
  },
  primaryBtn: { flex: 1 },
  secondaryBtn: { flex: 1 },
});
