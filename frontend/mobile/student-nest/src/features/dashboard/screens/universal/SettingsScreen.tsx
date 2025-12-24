import React, { useState } from "react";
import { View, StyleSheet, Linking } from "react-native";
import {
  Text,
  Switch,
  Divider,
  List,
  Button,
  Avatar,
  Card,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();

  // Mock state (replace with real user/context)
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const handleOpenPrivacy = () =>
    Linking.openURL("https://your-app.com/privacy");
  const handleOpenTerms = () => Linking.openURL("https://your-app.com/terms");

  const handleLogout = () => {
    // Implement sign-out
    // e.g., auth.signOut(); navigation.reset(...)
    alert("Logged out");
  };

  const handleDeleteAccount = () => {
    // Confirm & call API to delete account
    alert("Account deletion requested");
  };

  return (
    <View style={styles.container}>
      {/* Profile card */}
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Image
            size={56}
            source={{ uri: "https://i.pravatar.cc/150?img=32" }}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Ahmed</Text>
            <Text style={styles.role}>Landlord</Text>
            <Text style={styles.email}>ahmed@example.com</Text>
          </View>
          <Button
            mode="outlined"
            style={styles.editBtn}
            onPress={() => navigation.navigate("ProfileScreen" as never)}
          >
            Edit
          </Button>
        </Card.Content>
      </Card>

      {/* Appearance */}
      <Text style={styles.sectionTitle}>Appearance</Text>
      <List.Item
        title="Dark mode"
        description="Reduce glare and rest your eyes"
        left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
        right={() => (
          <Switch value={darkMode} onValueChange={setDarkMode} />
        )}
        style={styles.item}
      />

      <Divider style={styles.divider} />

      {/* Notifications */}
      <Text style={styles.sectionTitle}>Notifications</Text>
      <List.Item
        title="Enable notifications"
        description="Push alerts for requests, approvals, and payments"
        left={(props) => <List.Icon {...props} icon="bell" />}
        right={() => (
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        )}
        style={styles.item}
      />
      <List.Item
        title="Email updates"
        description="Receive summaries and important notices by email"
        left={(props) => <List.Icon {...props} icon="email" />}
        right={() => (
          <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
        )}
        style={styles.item}
      />
      <List.Item
        title="SMS alerts"
        description="Time-sensitive alerts via SMS"
        left={(props) => <List.Icon {...props} icon="message-text" />}
        right={() => <Switch value={smsAlerts} onValueChange={setSmsAlerts} />}
        style={styles.item}
      />

      <Divider style={styles.divider} />

      {/* Privacy & security */}
      <Text style={styles.sectionTitle}>Privacy & security</Text>
      <List.Item
        title="Privacy policy"
        description="How we handle your data"
        left={(props) => <List.Icon {...props} icon="shield-check" />}
        onPress={handleOpenPrivacy}
        style={styles.item}
      />
      <List.Item
        title="Terms of service"
        description="Rules that keep the platform fair"
        left={(props) => <List.Icon {...props} icon="file-document" />}
        onPress={handleOpenTerms}
        style={styles.item}
      />
      <List.Item
        title="Change password"
        description="Update your credentials"
        left={(props) => <List.Icon {...props} icon="lock-reset" />}
        onPress={() => navigation.navigate("ChangePasswordScreen" as never)}
        style={styles.item}
      />

      <Divider style={styles.divider} />

      {/* Account actions */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.actionsRow}>
        <Button
          mode="contained"
          style={styles.primaryBtn}
          onPress={handleLogout}
        >
          Log out
        </Button>
        <Button
          mode="outlined"
          textColor="#e74c3c"
          style={styles.dangerBtn}
          onPress={handleDeleteAccount}
        >
          Delete account
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f7f7fb" },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: "700", color: "#222" },
  role: { fontSize: 14, color: "#666", marginTop: 2 },
  email: { fontSize: 13, color: "#888", marginTop: 2 },
  editBtn: { borderColor: "#1E3A8A" },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
    marginTop: 8,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
  },
  divider: { marginVertical: 12 },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 8,
  },
  primaryBtn: { flex: 1, backgroundColor: "#1E3A8A" },
  dangerBtn: { flex: 1, borderColor: "#e74c3c" },
});
