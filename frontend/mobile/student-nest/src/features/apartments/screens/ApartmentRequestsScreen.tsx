import React, { useCallback, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { getApartmentLeaseRequests, searchApartmentLeaseRequests, updateLeaseRequestStatus } from "../../dashboard/api/landlordService";
import { ActivityIndicator, Card, Divider, Button, TextInput, IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    route: any; // Using any for simplicity as param list needs update, will fix types next
};

export default function ApartmentRequestsScreen({ route }: Props) {
    const { apartmentId } = route.params;
    const { token } = useAuth();

    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null); // Stores ID of request being acted on
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<any[] | null>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchRequests = async () => {
        if (!token) return;
        try {
            // Only set loading on initial fetch
            if (requests.length === 0 && !searchResults) setLoading(true);
            const data = await getApartmentLeaseRequests(token, apartmentId);
            setRequests(Array.isArray(data) ? data : []);

            // If we have an active search, re-run it locally or refetch search results could be tricky,
            // simplest is to clear search or let user re-search. For now we just update main list.
            if (searchResults && searchQuery) {
                // Ideally we'd re-search, but for simplicity let's just re-fetch main list.
                // Or we can manually update search results from standard set if we did client-side search.
                // Since it's server side search, let's just trigger a re-search if query exists
                performSearch(searchQuery);
            }

        } catch (error) {
            console.error("Fetch requests error:", error);
        } finally {
            setLoading(false);
        }
    };

    const performSearch = async (query: string) => {
        if (!token || query.trim() === "") {
            setSearchResults(null);
            return;
        }

        setIsSearching(true);
        try {
            const data = await searchApartmentLeaseRequests(token, apartmentId, query.trim());
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

    const handleSearchChange = (text: string) => {
        setSearchQuery(text);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        if (text.trim() === "") {
            setSearchResults(null);
            return;
        }

        // Debounce search
        searchTimeout.current = setTimeout(() => {
            performSearch(text);
        }, 500);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults(null);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };

    const handleStatusUpdate = async (requestLeaseId: string, status: "Accept" | "Reject") => {
        if (!token) return;

        // Optimistic UI or wait for result? Let's wait for result with spinner.
        setActionLoading(requestLeaseId);

        try {
            await updateLeaseRequestStatus(token, requestLeaseId, status);
            Alert.alert("Success", `Request ${status}ed successfully.`);
            // Refresh list
            fetchRequests();
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to update status");
        } finally {
            setActionLoading(null);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRequests();
            return () => {
                if (searchTimeout.current) clearTimeout(searchTimeout.current);
            };
        }, [apartmentId])
    );

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'accept': return { bg: "#d4edda", color: "#155724", icon: "checkmark-circle" };
            case 'reject': return { bg: "#f8d7da", color: "#721c24", icon: "close-circle" };
            case 'pending': return { bg: "#fff3cd", color: "#856404", icon: "time" };
            default: return { bg: "#e2e3e5", color: "#383d41", icon: "help-circle" };
        }
    };

    // Determine what to display
    const displayRequests = searchResults !== null ? searchResults : requests;

    const renderRequestItem = ({ item }: { item: any }) => {
        const statusInfo = getStatusColor(item.requestStatus);
        const createdDate = item.createAt ? new Date(item.createAt).toLocaleDateString() : "N/A";
        const isActioning = actionLoading === item.requestLeaseId;

        return (
            <Card style={styles.card}>
                <Card.Content>
                    {/* Header Row */}
                    <View style={styles.headerRow}>
                        <View style={styles.headerLeft}>
                            <View style={styles.idBadge}>
                                <Text style={styles.idText}>#{item.requestLeaseId}</Text>
                            </View>
                            <Text style={styles.apartmentTitle} numberOfLines={1}>
                                {item.apartmentTitle || "Apartment"}
                            </Text>
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                            <Ionicons name={statusInfo.icon as any} size={14} color={statusInfo.color} />
                            <Text style={[styles.statusText, { color: statusInfo.color }]}>
                                {item.requestStatus}
                            </Text>
                        </View>
                    </View>

                    {/* Price and Term Row */}
                    <View style={styles.priceRow}>
                        <View style={styles.priceTag}>
                            <Ionicons name="pricetag" size={16} color="#1E3A8A" />
                            <Text style={styles.priceText}>${item.apartmentPrice}</Text>
                        </View>
                        <View style={styles.termTag}>
                            <Ionicons name="calendar" size={16} color="#666" />
                            <Text style={styles.termText}>{item.rentTerm}</Text>
                        </View>
                        <View style={styles.dateTag}>
                            <Ionicons name="play" size={14} color="#666" />
                            <Text style={styles.dateText}>{item.startDate}</Text>
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
                                <Text style={styles.majorText}>{item.Major}</Text>
                            </View>
                        </View>
                        <View style={styles.arrowContainer}>
                            <Ionicons name="arrow-forward" size={20} color="#ccc" />
                        </View>
                        <View style={styles.personInfo}>
                            <Ionicons name="business" size={18} color="#9b59b6" />
                            <View style={styles.personDetails}>
                                <Text style={styles.personLabel}>Landlord</Text>
                                <Text style={styles.personName}>{item.landlordName}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Message Bubble */}
                    {item.requestMessage && (
                        <View style={styles.messageContainer}>
                            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#888" style={{ marginTop: 2 }} />
                            <Text style={styles.messageText}>"{item.requestMessage}"</Text>
                        </View>
                    )}

                    {/* Footer / Actions */}
                    <View style={styles.footerRow}>
                        <Ionicons name="time-outline" size={14} color="#999" />
                        <Text style={styles.createdText}>Created: {createdDate}</Text>
                    </View>
                </Card.Content>

                {item.requestStatus.toLowerCase() === 'pending' && (
                    <Card.Actions style={styles.actions}>
                        {isActioning ? (
                            <ActivityIndicator size="small" color="#1E3A8A" />
                        ) : (
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <Button
                                    mode="outlined"
                                    textColor="#e74c3c"
                                    style={{ borderColor: '#e74c3c' }}
                                    onPress={() => handleStatusUpdate(item.requestLeaseId, "Reject")}
                                >
                                    Reject
                                </Button>
                                <Button
                                    mode="contained"
                                    buttonColor="#2ecc71"
                                    onPress={() => handleStatusUpdate(item.requestLeaseId, "Accept")}
                                >
                                    Accept
                                </Button>
                            </View>
                        )}
                    </Card.Actions>
                )}
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
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChangeText={handleSearchChange}
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
            )}

            {displayRequests.length === 0 ? (
                <View style={[styles.center, { opacity: 0.7 }]}>
                    <Ionicons name="mail-unread-outline" size={64} color="#ccc" />
                    <Text style={{ color: '#666', fontSize: 16, marginTop: 10 }}>
                        {searchResults !== null ? "No matches found." : "No requests yet."}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={displayRequests}
                    keyExtractor={(item) => item.requestLeaseId || Math.random().toString()}
                    renderItem={renderRequestItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa', padding: 15 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        minHeight: 300, // Ensure enough base height
        justifyContent: 'center', // Center content vertically if sparse
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12, // Increased margin
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
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14, // Increased margin
        flexWrap: "wrap",
        gap: 12,
    },
    priceTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e8f4fd",
        paddingHorizontal: 10, // Increased padding
        paddingVertical: 6, // Increased padding
        borderRadius: 8,
        gap: 4,
    },
    priceText: { fontSize: 14, fontWeight: "700", color: "#1E3A8A" },
    termTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 10, // Increased padding
        paddingVertical: 6, // Increased padding
        borderRadius: 8,
        gap: 4,
    },
    termText: { fontSize: 12, color: "#555" },
    dateTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 10, // Increased padding
        paddingVertical: 6, // Increased padding
        borderRadius: 8,
        gap: 4,
    },
    dateText: { fontSize: 12, color: "#555" },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 14, // Increased margin
    },
    peopleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14, // Increased margin
    },
    personInfo: {
        flexDirection: "row",
        alignItems: "flex-start",
        flex: 1,
        gap: 10,
    },
    personDetails: { gap: 2 },
    personLabel: { fontSize: 10, color: "#888", textTransform: "uppercase" },
    personName: { fontSize: 13, fontWeight: "600", color: "#333" },
    majorText: { fontSize: 11, color: "#3498db", fontStyle: "italic" },
    arrowContainer: { paddingHorizontal: 5 },
    messageContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#f9f9f9",
        padding: 12, // Increased padding
        borderRadius: 10,
        marginBottom: 12, // Increased margin
        gap: 8,
    },
    messageText: {
        flex: 1,
        fontSize: 13, // Slightly larger
        fontStyle: "italic",
        color: "#555",
        lineHeight: 20,
    },
    footerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 6,
        marginBottom: 4 // Add some bottom margin to content area
    },
    createdText: { fontSize: 11, color: "#999" },
    actions: {
        justifyContent: 'flex-end',
        paddingTop: 10, // Add top padding to separate from content
        paddingBottom: 15, // Add bottom padding for "breathing room"
        paddingRight: 15,
        backgroundColor: 'rgba(230,230,230, 0.15)', // Very subtle background for action area
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    }
});
