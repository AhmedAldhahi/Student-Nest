import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdminDashboardScreen"
>;

const features = [
  { key: "ProfileScreen", label: "Profile", icon: "person-circle" },
  { key: "SettingsScreen", label: "Settings", icon: "settings" },
  { key: "AdminLeaseScreen", label: "Leases", icon: "document-text" },
  { key: "AdminRequestsScreen", label: "Requests", icon: "mail" },
  { key: "PaymentsScreen", label: "Payments", icon: "card" },
  { key: "NotificationsScreen", label: "Notifications", icon: "notifications" },
  { key: "LandlordsScreen", label: "Landlords", icon: "business" },
  { key: "StudentsScreen", label: "Students", icon: "school" },
  { key: "ReceiptsScreen", label: "Receipts", icon: "receipt" },
  { key: "AuditLogScreen", label: "Audit Log", icon: "list" },
  { key: "AdminApartmentsScreen", label: "Apartments", icon: "home" },
];

export default function AdminDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({ item }: { item: (typeof features)[0] }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate(item.key as any)}
    >
      <View style={styles.cardContent}>
        <Ionicons name={item.icon as any} size={32} color="#1E3A8A" />
        <Text style={styles.label}>{item.label}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Admin Dashboard</Text>
        <FlatList
          data={features}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 16, color: "#333" },
  row: { justifyContent: "space-between", marginBottom: 12 },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
  },
  cardContent: {
    alignItems: "center",
    padding: 20,
  },
  label: { marginTop: 8, fontWeight: "600", color: "#1E3A8A" },
});
