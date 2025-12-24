import { StyleSheet, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { ImageCarousel } from "../components/ImageCarousel";
import { useAuth } from "../../../context/AuthContext"; // ✅ import your AuthContext

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ApartmentDetailsScreen"
>;

export default function ApartmentDetailsScreen({ navigation, route }: Props) {
  const { apartment } = route.params;
  const { user, isStudent, isLandlord, isAdmin } = useAuth();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <ImageCarousel images={apartment.images} />

      <Text style={styles.title}>{apartment.title}</Text>
      <Text style={styles.price}>{apartment.price}</Text>
      <Text style={styles.address}>{apartment.address}</Text>
      <Text style={styles.status}>Status: {apartment.propertyStatus}</Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{apartment.description}</Text>

      <Text style={styles.sectionTitle}>Details</Text>
      <Text style={styles.meta}>
        {apartment.rooms} rooms • {apartment.beds} beds
      </Text>

      <Text style={styles.sectionTitle}>Landlord</Text>
      <Text style={styles.meta}>apartment landlordName
        {/* {apartment.landlordName} */}
        </Text>

      {/* Role-based rendering */}
      {isStudent && (
        <Button
          mode="contained"
          style={styles.bookButton}
          onPress={() =>
            navigation.navigate("RequestLeaseForm", { apartment })
          }
        >
          Request Lease
        </Button>
      )}

      {(isLandlord || isAdmin) && (
        <Text style={styles.notice}>
          Only students can request leases. You can view apartment details.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: 350, height: 200, borderRadius: 8, marginRight: 8 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 16 },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3F51B5",
    marginVertical: 8,
  },
  address: { color: "#555", marginBottom: 4 },
  status: { color: "#999", marginBottom: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  description: { fontSize: 14, color: "#444", lineHeight: 20 },
  meta: { fontSize: 14, color: "#333", marginBottom: 16 },
  bookButton: { backgroundColor: "#3F51B5", marginTop: 20 },
  notice: {
    marginTop: 16,
    fontSize: 14,
    color: "#d9534f",
    fontStyle: "italic",
  },
});
