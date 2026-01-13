import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useWindowDimensions, FlatList, Linking, Platform, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Chip, Card, Button, Divider } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AdminApartment } from "./types";

export default function AdminApartmentDetailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const apartment = (route.params as any)?.apartment as AdminApartment;

    if (!apartment) {
        return (
            <View style={styles.centerContainer}>
                <Text>Error: No apartment data provided.</Text>
                <Button onPress={() => navigation.goBack()}>Go Back</Button>
            </View>
        );
    }

    // --- Image Handling ---
    const renderImageItem = ({ item }: { item: any }) => {
        let uri = "";
        if (typeof item === 'string') uri = item;
        else if (item.photoUrl) uri = item.photoUrl;

        return (
            <Image source={{ uri }} style={[styles.carouselImage, { width }]} resizeMode="cover" />
        );
    };

    const hasPhotos = apartment.apartmentPhoto && apartment.apartmentPhoto.length > 0;

    // --- Map Handling ---
    // Ensure latitude and longitude are numbers
    const lat = parseFloat(apartment.googleMapLocation?.latitude || "0");
    const lng = parseFloat(apartment.googleMapLocation?.longitude || "0");
    const hasValidLocation = lat !== 0 && lng !== 0;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* --- Image Carousel --- */}
            {hasPhotos ? (
                <View style={styles.carouselContainer}>
                    <FlatList
                        data={apartment.apartmentPhoto}
                        renderItem={renderImageItem}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            ) : (
                <View style={[styles.carouselImage, { width, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }]}>
                    <Image source={require("../../../../assets/images/Student-nest-logo.png")} style={{ width: 150, height: 150, opacity: 0.5 }} resizeMode="contain" />
                </View>
            )}

            {/* --- Details Section --- */}
            <View style={styles.detailsContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>{apartment.title}</Text>
                    <Chip
                        icon={apartment.Verified ? "check" : "alert"}
                        style={apartment.Verified ? styles.verifiedChip : styles.unverifiedChip}
                        textStyle={{ color: '#fff' }}
                    >
                        {apartment.Verified ? "Verified" : "Unverified"}
                    </Chip>
                </View>

                <Text style={styles.price}>${apartment.price}/month</Text>
                <Text style={styles.address}>{apartment.address}</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Rooms</Text>
                        <Text style={styles.statValue}>{apartment.numberOfRoom}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Beds</Text>
                        <Text style={styles.statValue}>{apartment.numberOfBed}</Text>
                    </View>
                    {apartment.isFully && (
                        <Chip style={styles.tagChip} textStyle={styles.tagText}>Furnished</Chip>
                    )}
                    {apartment.isJoin && (
                        <Chip style={styles.tagChip} textStyle={styles.tagText}>Join Available</Chip>
                    )}
                </View>

                <Divider style={styles.divider} />

                <Text style={styles.sectionHeader}>Description</Text>
                <Text style={styles.description}>{apartment.description}</Text>

                <Divider style={styles.divider} />

                <Text style={styles.sectionHeader}>Landlord</Text>
                <Text style={styles.landlordName}>{apartment.landlordName}</Text>

                <Divider style={styles.divider} />

                {/* --- Map Section --- */}
                {hasValidLocation ? (
                    <View style={styles.mapSection}>
                        <Text style={styles.sectionHeader}>Location</Text>
                        <View style={styles.mapContainer}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                initialRegion={{
                                    latitude: lat,
                                    longitude: lng,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: lat, longitude: lng }}
                                    title={apartment.title}
                                    description={apartment.address}
                                />
                            </MapView>
                        </View>
                        <Button
                            mode="outlined"
                            icon="map-marker-radius"
                            style={styles.mapButton}
                            onPress={() => {
                                const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                                const latLng = `${lat},${lng}`;
                                const label = apartment.title;
                                const url = Platform.select({
                                    ios: `${scheme}${label}@${latLng}`,
                                    android: `${scheme}${latLng}(${label})`
                                });

                                if (url) {
                                    Linking.openURL(url).catch(err => {
                                        console.error('An error occurred', err);
                                        Alert.alert("Error", "Could not open map.");
                                    });
                                }
                            }}
                        >
                            Open in Maps
                        </Button>
                    </View>
                ) : (
                    <Text style={styles.noLocationText}>Location data not available.</Text>
                )}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    carouselContainer: { height: 250 },
    carouselImage: { height: 250 },
    detailsContainer: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, backgroundColor: "#fff" },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
    title: { fontSize: 24, fontWeight: "bold", flex: 1, marginRight: 10, color: "#1E3A8A" }, // primary color
    price: { fontSize: 22, fontWeight: "700", color: "#27ae60", marginBottom: 4 },
    address: { fontSize: 16, color: "#555", marginBottom: 16 },
    verifiedChip: { backgroundColor: "#2ecc71" },
    unverifiedChip: { backgroundColor: "#f39c12" },
    statsRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: 'wrap' },
    statItem: { alignItems: "center", backgroundColor: "#f0f4f8", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    statLabel: { fontSize: 12, color: "#7f8c8d" },
    statValue: { fontSize: 16, fontWeight: "bold", color: "#333" },
    tagChip: { backgroundColor: "#3498db" },
    tagText: { color: "#fff", fontSize: 12 },
    divider: { marginVertical: 16 },
    sectionHeader: { fontSize: 18, fontWeight: "700", marginBottom: 8, color: "#333" },
    description: { fontSize: 16, lineHeight: 24, color: "#444" },
    landlordName: { fontSize: 16, fontWeight: "500", color: "#1E3A8A" },
    mapSection: { marginTop: 8 },
    mapContainer: { height: 200, borderRadius: 12, overflow: "hidden", marginTop: 8, elevation: 2 },
    map: { width: "100%", height: "100%" },
    mapButton: { marginTop: 12, borderColor: "#1E3A8A" },
    noLocationText: { fontStyle: "italic", color: "#7f8c8d" },
});
