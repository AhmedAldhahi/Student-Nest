import React from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../../context/AuthContext";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminDashboardScreen"
>;

export default function AdminDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { logout, user } = useAuth(); // 👈 Get logout

  const features = [
    { key: "ProfileScreen", label: "Profile", icon: "person-circle" },
    { key: "SettingsScreen", label: "Settings", icon: "settings" },
    { key: "AdminLeaseScreen", label: "Leases", icon: "document-text" },
    { key: "AdminRequestsScreen", label: "Requests", icon: "mail" },
    { key: "PaymentsScreen", label: "Payments", icon: "card" },
    { key: "NotificationScreen", label: "Notifications", icon: "notifications" },
    { key: "LandlordsScreen", label: "Landlords", icon: "business" },
    { key: "StudentsScreen", label: "Students", icon: "school" },
    { key: "ReceiptsScreen", label: "Receipts", icon: "receipt" },
    { key: "AuditLogScreen", label: "Audit Log", icon: "list" },
    { key: "AdminApartmentsScreen", label: "Apartments", icon: "home" },
    { key: "Logout", label: "Logout", icon: "log-out", isLogout: true }, // 👈 Added
  ];

  const handlePress = (item: any) => {
    if (item.isLogout) {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logout }
      ]);
      return;
    }
    navigation.navigate(item.key as any);
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card
      style={[styles.card, item.isLogout && styles.logoutCard]}
      onPress={() => handlePress(item)}
    >
      <View style={styles.cardContent}>
        <Ionicons
          name={item.icon}
          size={32}
          color={item.isLogout ? "#e74c3c" : "#1E3A8A"}
        />
        <Text style={[styles.label, item.isLogout && styles.logoutLabel]}>{item.label}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>Admin Dashboard</Text>
        <Text style={styles.subHeader}>Welcome back, {user?.name}</Text>
        <FlatList
          data={features}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  header: { fontSize: 26, fontWeight: "700", color: "#1E3A8A" },
  subHeader: { fontSize: 14, color: "#666", marginBottom: 20 },
  row: { justifyContent: "space-between", marginBottom: 12 },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoutCard: {
    backgroundColor: "#fdedec",
    borderWidth: 1,
    borderColor: "#fadbd8"
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    minHeight: 110,
  },
  label: { marginTop: 12, fontWeight: "600", color: "#333", fontSize: 14 },
  logoutLabel: { color: "#e74c3c" },
});
