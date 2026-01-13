import React from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LandlordDashboardScreen"
>;

export default function LandlordDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user, isLandlord, logout } = useAuth();

  if (!isLandlord || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Unauthorized</Text>
      </SafeAreaView>
    );
  }

  const features = [
    { key: "ProfileScreen", label: "Profile", icon: "person-circle" },
    { key: "MyApartmentsScreen", label: "My Apartments", icon: "business" },
    { key: "MyApartmentsScreen_Booked", label: "Booked Apartments", icon: "home", params: { filter: "booked" } },
    { key: "NotificationScreen", label: "Notifications", icon: "notifications" },
    { key: "SettingsScreen", label: "Settings", icon: "settings" },
    { key: "Logout", label: "Logout", icon: "log-out", isLogout: true },
  ];

  const handlePress = (item: any) => {
    if (item.isLogout) {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logout }
      ]);
      return;
    }

    // Handle special keys like "MyApartmentsScreen_Booked" mapping to "MyApartmentsScreen"
    const routeName = item.key.includes("_") ? item.key.split("_")[0] : item.key;

    if (item.params) {
      navigation.navigate(routeName as any, item.params);
    } else {
      navigation.navigate(routeName as any);
    }
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
        <Text style={styles.header}>Welcome, {user.name.split(" ")[0]}</Text>
        <Text style={styles.subHeader}>Manage your properties</Text>

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
