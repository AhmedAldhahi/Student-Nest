import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Image, Alert } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { getLandlordApartments } from "../../dashboard/api/landlordService";
import { useFocusEffect, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Apartment } from "../types";
import { ActivityIndicator, FAB, Button, Divider } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyApartmentsScreen"
>;

type ScreenRouteProp = RouteProp<RootStackParamList, "MyApartmentsScreen">;

export default function MyApartmentsScreen() {
  const { token, user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ScreenRouteProp>();
  const filter = route.params?.filter || "all";

  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Set title dynamically based on filter
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: filter === "booked" ? "Booked Apartments" : "My Apartments",
    });
  }, [navigation, filter]);

  const fetchApartments = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getLandlordApartments(token, filter);

      setApartments(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error(error);
      // Alert.alert("Error", error.message || "Failed to fetch apartments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchApartments();
    }, [filter])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchApartments();
  };

  const renderApartmentItem = ({ item }: { item: Apartment }) => {
    const imageSource = item.apartmentPhoto && item.apartmentPhoto.length > 0
      ? { uri: item.apartmentPhoto[0].photoUrl }
      : require("../../../assets/images/apartment-picture-a.jpg"); // Placeholder

    return (
      <TouchableOpacity
        activeOpacity={0.9} // Prevent opacity change on press since we have button inside
        onPress={() => navigation.navigate("EditApartmentScreen", { apartment: item })}
        style={styles.card}
      >
        <Image source={imageSource} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.cardHeader} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.cardAddress} numberOfLines={1}>{item.address}</Text>
          <Text style={styles.cardPrice}>${item.price} <Text style={styles.perMonth}>/ month</Text></Text>

          <View style={styles.cardFooter}>
            <View style={styles.amenityRow}>
              <Ionicons name="bed-outline" size={16} color="#666" />
              <Text style={styles.amenityText}>{item.numberOfBed} Beds</Text>
              <Ionicons name="resize-outline" size={16} color="#666" style={{ marginLeft: 10 }} />
              <Text style={styles.amenityText}>{item.numberOfRoom} Rooms</Text>
            </View>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Verification Status */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                name={item.isVerified ? "shield-checkmark" : "alert-circle-outline"}
                size={16}
                color={item.isVerified ? "#2ecc71" : (item.apartmentDocuments ? "#f39c12" : "#e74c3c")}
              />
              <Text style={{
                fontSize: 12,
                marginLeft: 4,
                color: item.isVerified ? "#2ecc71" : (item.apartmentDocuments ? "#f39c12" : "#e74c3c"),
                fontWeight: "600"
              }}>
                {item.isVerified ? "Verified" : (item.apartmentDocuments ? "Pending" : "Not Verified")}
              </Text>
            </View>

            {/* View Leases Button */}
            {/* View Leases Button */}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button
                mode="outlined"
                compact
                onPress={() => {
                  console.log("Navigating to Requests for Apartment ID:", item.apartmentId);
                  navigation.navigate("ApartmentRequestsScreen" as any, { apartmentId: item.apartmentId });
                }}
                labelStyle={{ fontSize: 11 }}
                style={{ borderColor: '#1E3A8A' }}
                textColor="#1E3A8A"
              >
                Requests
              </Button>
              <Button
                mode="contained"
                compact
                onPress={() => {
                  console.log("Navigating to Leases for Apartment ID:", item.apartmentId);
                  navigation.navigate("ApartmentLeasesScreen", { apartmentId: item.apartmentId });
                }}
                labelStyle={{ fontSize: 11 }}
                buttonColor="#1E3A8A"
              >
                Leases
              </Button>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading && !refreshing && apartments.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E3A8A" />
        </View>
      ) : (
        <FlatList
          data={apartments}
          keyExtractor={(item) => item.apartmentId || Math.random().toString()}
          renderItem={renderApartmentItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={{ color: '#666', marginTop: 20 }}>You have no apartments listed.</Text>
            </View>
          }
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("AddApartmentForm")}
        label="Add Apartment"
        color="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  list: { padding: 15, paddingBottom: 100 }, // Increased padding for FAB
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 150 },
  info: { padding: 15 },
  cardHeader: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 4 },
  cardAddress: { fontSize: 13, color: '#666', marginBottom: 8 },
  cardPrice: { fontSize: 16, fontWeight: '700', color: '#1E3A8A' },
  perMonth: { fontSize: 12, fontWeight: '400', color: '#666' },
  cardFooter: { flexDirection: 'row', marginTop: 8 },
  amenityRow: { flexDirection: 'row', alignItems: 'center' },
  amenityText: { fontSize: 12, color: '#666', marginLeft: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#1E3A8A',
    zIndex: 100,
    elevation: 6
  },
});
