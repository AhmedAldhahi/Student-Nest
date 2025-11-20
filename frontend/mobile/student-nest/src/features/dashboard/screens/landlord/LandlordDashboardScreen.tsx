import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../../context/AuthContext"; // 👈 import your hook

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LandlordDashboardScreen"
>;

export default function LandlordDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user, isLandlord } = useAuth();

  if (!isLandlord || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Unauthorized</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Welcome {user.name}</Text>

        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          Profile
        </Button>

        <Button
          mode="contained"
          style={styles.btn}
          onPress={() =>
            navigation.navigate("LandlordLeaseScreen", {
              landlordId: parseInt(user.id),
            })
          }
        >
          Leases
        </Button>

        {/* 👇 Pass landlordId from auth context */}
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() =>
            navigation.navigate("LandlordRequestsScreen", {
              landlordId: parseInt(user.id),
            })
          }
        >
          Lease Requests
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() =>
            navigation.navigate("VerificationScreen", {
              landlordId: parseInt(user.id),
            })
          }
        >
          Verification
        </Button>

        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          Settings
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  btn: { marginVertical: 6, backgroundColor: "#1E3A8A" },
});
