import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { RootStackParamList } from "../../../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "LandlordDetailScreen">;


export default function LandlordDetailScreen({ route, navigation }: Props) {
  const { landlordId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Landlord #{landlordId} Details</Text>

      {/* Profile info would be fetched here */}
      <Text style={styles.subHeader}>Profile Info</Text>
      <Text>Name: Ahmed Khalid</Text>
      <Text>Email: ahmed@example.com</Text>
      <Text>Status: Verified</Text>

      {/* Action buttons */}
      <View style={styles.actions}>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("ApartmentsScreen", { landlordId })}
        >
          Apartments
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("LeaseScreen", { landlordId })}
        >
          Leases
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("RequestsScreen", { landlordId })}
        >
          Requests
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => alert("Verify landlord flow")}
        >
          Verification
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  subHeader: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
  actions: { marginTop: 20, gap: 10 },
  btn: { marginVertical: 6, backgroundColor: "#1E3A8A" },
});
