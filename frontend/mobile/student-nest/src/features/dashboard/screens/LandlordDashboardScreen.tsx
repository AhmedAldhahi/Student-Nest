import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LandlordDashboardScreen"
>;

export default function LandlordDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Landlord Dashboard</Text>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("ProfileScreen")}>
        Profile
      </Button>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("MyApartmentsScreen")}>
        My Apartments
      </Button>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("LeaseScreen")}>
        Leases
      </Button>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("RequestsScreen")}>
        Lease Requests
      </Button>
      {/* <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("PaymentsScreen")}>
        Payments
      </Button>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("ReceiptsScreen")}>
        Receipts
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  btn: { marginVertical: 6, backgroundColor: "#1E3A8A" },
});
