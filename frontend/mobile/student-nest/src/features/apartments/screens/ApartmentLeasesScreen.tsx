import React, { useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { RouteProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { getApartmentLeases, searchApartmentLeases } from "../../dashboard/api/landlordService";
import { ActivityIndicator, Card, Divider, TextInput, IconButton, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useDebounce } from "../../../hooks/useDebounce";

type Props = {
    route: RouteProp<RootStackParamList, "ApartmentLeasesScreen">;
};

export default function ApartmentLeasesScreen({ route }: Props) {
    const { apartmentId } = route.params;
    const { token } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [leases, setLeases] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<any[] | null>(null);

    const fetchLeases = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const data = await getApartmentLeases(token, apartmentId);
            setLeases(Array.isArray(data) ? data : []);
        } catch (error: any) {
            console.error("Fetch leases error:", error);
        } finally {
            setLoading(false);
        }
    };

    const performSearch = async (query: string) => {
        if (!token) {
            setSearchResults(null);
            return;
        }

        setIsSearching(true);
        try {
            const data = await searchApartmentLeases(token, apartmentId, query);
            if (Array.isArray(data)) {
                setSearchResults(data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Effect for Debounced Search
    useEffect(() => {
        if (debouncedSearchQuery.trim() === "") {
            setSearchResults(null);
            return;
        }
        performSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults(null);
    };

    useFocusEffect(
        useCallback(() => {
            fetchLeases();
        }, [apartmentId])
    );

    // Determine what to display
    const displayLeases = searchResults !== null ? searchResults : leases;

    const getStatusInfo = (lease: any) => {
        if (lease.LeaseActivationStatus === true) {
            return { text: "ACTIVE", bg: "#d4edda", color: "#155724", icon: "checkmark-circle" as const };
        } else if (lease.isLandlordSigned && lease.isStudentSigned) {
            return { text: "READY", bg: "#cce5ff", color: "#004085", icon: "checkmark-done" as const };
        } else if (lease.LeaseActivationStatus === false && (lease.leaseEndDate && new Date(lease.leaseEndDate) < new Date())) {
            return { text: "EXPIRED", bg: "#f8d7da", color: "#721c24", icon: "alert-circle" as const };
        }
        return { text: "PENDING", bg: "#fff3cd", color: "#856404", icon: "time" as const };
    };

    const renderLeaseItem = ({ item }: { item: any }) => {
        const statusInfo = getStatusInfo(item);
        const startDate = item.leaseStartDate ? new Date(item.leaseStartDate).toLocaleDateString() : "N/A";
        const endDate = item.leaseEndDate ? new Date(item.leaseEndDate).toLocaleDateString() : "N/A";

        return (
            <Card style={styles.card}>
                <Card.Content>
                    {/* Header Row */}
                    <View style={styles.headerRow}>
                        <View style={styles.headerLeft}>
                            <View style={styles.idBadge}>
                                <Text style={styles.idText}>#{item.leaseId.split('-')[1] || item.leaseId}</Text>
                            </View>
                            <Text style={styles.apartmentTitle} numberOfLines={1}>
                                {item.studentName || "Unknown Tenant"}
                            </Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                            <Ionicons name={statusInfo.icon} size={14} color={statusInfo.color} />
                            <Text style={[styles.statusText, { color: statusInfo.color }]}>
                                {statusInfo.text}
                            </Text>
                        </View>
                    </View>

                    {/* Price and Term Row */}
                    <View style={styles.infoRow}>
                        <View style={styles.priceTag}>
                            <Ionicons name="pricetag" size={16} color="#1E3A8A" />
                            <Text style={styles.priceText}>${item.monthlyRent}/mo</Text>
                        </View>
                        <View style={styles.termTag}>
                            <Ionicons name="calendar" size={16} color="#666" />
                            <Text style={styles.termText}>{item.leaseTerm}</Text>
                        </View>
                        <View style={styles.utilityTag}>
                            <Ionicons name="flash" size={14} color="#666" />
                            <Text style={styles.utilityText}>{item.includeUtilities || "None"}</Text>
                        </View>
                    </View>

                    {/* Dates Row */}
                    <View style={styles.datesRow}>
                        <View style={styles.dateItem}>
                            <Ionicons name="play" size={14} color="#27ae60" />
                            <Text style={styles.dateLabel}>Start:</Text>
                            <Text style={styles.dateValue}>{startDate}</Text>
                        </View>
                        <View style={styles.dateItem}>
                            <Ionicons name="stop" size={14} color="#e74c3c" />
                            <Text style={styles.dateLabel}>End:</Text>
                            <Text style={styles.dateValue}>{endDate}</Text>
                        </View>
                    </View>

                    <Divider style={styles.divider} />

                    {/* People Info */}
                    <View style={styles.peopleRow}>
                        <View style={styles.personInfo}>
                            <Ionicons name="school" size={18} color="#3498db" />
                            <View style={styles.personDetails}>
                                <Text style={styles.personLabel}>Student</Text>
                                <Text style={styles.personName}>{item.studentName}</Text>
                                <View style={styles.signatureRow}>
                                    <Ionicons
                                        name={item.isStudentSigned ? "checkmark-circle" : "close-circle"}
                                        size={14}
                                        color={item.isStudentSigned ? "#27ae60" : "#e74c3c"}
                                    />
                                    <Text style={[styles.signatureText, { color: item.isStudentSigned ? "#27ae60" : "#e74c3c" }]}>
                                        {item.isStudentSigned ? "Signed" : "Not Signed"}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.arrowContainer}>
                            <Ionicons name="swap-horizontal" size={20} color="#ccc" />
                        </View>

                        <View style={styles.personInfo}>
                            <Ionicons name="business" size={18} color="#9b59b6" />
                            <View style={styles.personDetails}>
                                <Text style={styles.personLabel}>Landlord</Text>
                                <Text style={styles.personName}>{item.landlordName}</Text>
                                <View style={styles.signatureRow}>
                                    <Ionicons
                                        name={item.isLandlordSigned ? "checkmark-circle" : "close-circle"}
                                        size={14}
                                        color={item.isLandlordSigned ? "#27ae60" : "#e74c3c"}
                                    />
                                    <Text style={[styles.signatureText, { color: item.isLandlordSigned ? "#27ae60" : "#e74c3c" }]}>
                                        {item.isLandlordSigned ? "Signed" : "Not Signed"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* House Rules */}
                    {item.houseRule && (
                        <View style={styles.rulesContainer}>
                            <Ionicons name="document-text" size={16} color="#888" />
                            <Text style={styles.rulesText}>{item.houseRule}</Text>
                        </View>
                    )}

                    {/* Footer */}
                    <View style={styles.footerRow}>
                        <View style={styles.innerContainer}>
                            <Ionicons name="time-outline" size={14} color="#999" />
                            <Text style={styles.createdText}>
                                Created: {item.createAt ? new Date(item.createAt).toLocaleDateString() : "N/A"}
                            </Text>
                        </View>
                        {/* Actions */}
                        <Card.Actions style={styles.cardActions}>
                            <Button
                                mode="outlined"
                                icon="wallet-outline"
                                textColor="#1E3A8A"
                                style={{ borderColor: '#1E3A8A' }}
                                onPress={() => navigation.navigate("LeasePaymentsScreen", { leaseId: item.leaseId, apartmentId })}
                            >
                                Payments
                            </Button>
                        </Card.Actions>

                    </View>
                </Card.Content>


            </Card>
        );
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#1E3A8A" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
                <TextInput
                    mode="outlined"
                    placeholder="Search leases..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchInput}
                    outlineStyle={{ borderWidth: 0 }}
                    contentStyle={{ paddingVertical: 0 }}
                    placeholderTextColor="#999"
                    dense
                />
                {isSearching && <ActivityIndicator size="small" color="#1E3A8A" style={{ marginRight: 8 }} />}
                {searchQuery.length > 0 && (
                    <IconButton
                        icon="close-circle"
                        size={20}
                        iconColor="#888"
                        onPress={clearSearch}
                        style={{ margin: 0 }}
                    />
                )}
            </View>

            {/* Search Result Feedback */}
            {searchResults !== null && (
                <View style={styles.searchFeedback}>
                    <Text style={{ fontSize: 13, color: '#1E3A8A', fontWeight: '600' }}>
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                    </Text>
                    <Button mode="text" onPress={clearSearch} labelStyle={{ fontSize: 12 }} compact>Clear</Button>
                </View>
            )
            }

            {
                displayLeases.length === 0 ? (
                    <View style={[styles.center, { opacity: 0.7 }]}>
                        <Ionicons name="document-text-outline" size={64} color="#ccc" />
                        <Text style={{ color: '#666', fontSize: 16, marginTop: 10 }}>
                            {searchResults !== null ? "No matches found." : "No leases yet."}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={displayLeases}
                        keyExtractor={(item) => item.leaseId || Math.random().toString()}
                        renderItem={renderLeaseItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa', padding: 15 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 14,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
        elevation: 1,
        height: 50
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 15,
        height: 40,
    },
    searchFeedback: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 4
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    headerLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
    idBadge: {
        backgroundColor: "#1E3A8A",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        marginRight: 8,
    },
    idText: { color: "#fff", fontWeight: "700", fontSize: 11 },
    apartmentTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        flex: 1,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 4,
    },
    statusText: { fontSize: 11, fontWeight: "600" },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        flexWrap: "wrap",
        gap: 8,
    },
    priceTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8f4fd",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    priceText: { fontSize: 14, fontWeight: "700", color: "#1E3A8A" },
    termTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    termText: { fontSize: 12, color: "#555" },
    utilityTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    utilityText: { fontSize: 12, color: "#555" },
    datesRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 16,
    },
    dateItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    dateLabel: { fontSize: 12, color: "#888" },
    dateValue: { fontSize: 13, fontWeight: "500", color: "#333" },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 12,
    },
    peopleRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    personInfo: {
        flexDirection: "row",
        alignItems: "flex-start",
        flex: 1,
        gap: 8,
    },
    personDetails: { gap: 1 },
    personLabel: { fontSize: 10, color: "#888", textTransform: "uppercase" },
    personName: { fontSize: 13, fontWeight: "600", color: "#333" },
    signatureRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
    },
    signatureText: { fontSize: 10, fontWeight: "500" },
    arrowContainer: { paddingHorizontal: 5, paddingTop: 10 },
    rulesContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        gap: 8,
    },
    rulesText: {
        flex: 1,
        fontSize: 12,
        color: "#555",
        lineHeight: 18,
    },
    footerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        marginBottom: 8 // Add margin to separate from actions
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    createdText: { fontSize: 11, color: "#999" },
    cardActions: {
        justifyContent: 'flex-end',
        paddingHorizontal: 0,
        paddingBottom: 0,
    }
});
