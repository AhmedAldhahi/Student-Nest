import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, ScrollView, Image, Dimensions } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { ActivityIndicator, Card, Divider, Portal, Modal, Button, Text as PaperText } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getLeasePayments, getPaymentReceipt } from "../../dashboard/api/landlordService";

type Props = {
    route: any; // Fix type in next step or use any for now
    navigation: any;
};

export default function LeasePaymentsScreen({ route, navigation }: Props) {
    const { leaseId } = route.params;
    const { token } = useAuth();

    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [receiptVisible, setReceiptVisible] = useState(false);
    const [receiptContent, setReceiptContent] = useState<any>(null);
    const [receiptLoading, setReceiptLoading] = useState(false);
    const [imgRatio, setImgRatio] = useState<number>(1);

    useEffect(() => {
        fetchPayments();
    }, [leaseId]);

    const fetchPayments = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const data = await getLeasePayments(token, leaseId);
            setPayments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch payments error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetReceipt = async (paymentId: string) => {
        if (!token) return;
        setReceiptLoading(true);
        setReceiptContent(null);
        try {
            const data = await getPaymentReceipt(token, leaseId, paymentId);
            // Handle array response based on user input: [{ ReceiptUrl: "..." }]
            if (Array.isArray(data) && data.length > 0 && data[0].ReceiptUrl) {
                setReceiptContent(data[0]);
                // Preload image size if possible or just let Image layout handle it
                Image.getSize(data[0].ReceiptUrl, (width, height) => {
                    setImgRatio(width / height);
                }, (err) => { console.log('failed to get image size', err) });
            } else if (data && data.ReceiptUrl) {
                // Fallback if it returns object directly
                setReceiptContent(data);
            } else {
                setReceiptContent({ raw: JSON.stringify(data, null, 2) });
            }
            setReceiptVisible(true);
        } catch (error) {
            console.error("Get receipt error:", error);
            Alert.alert("Error", "Failed to load receipt.");
        } finally {
            setReceiptLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'paid': return { bg: "#d4edda", color: "#155724", icon: "checkmark-circle" };
            case 'pending': return { bg: "#fff3cd", color: "#856404", icon: "time" };
            case 'overdue': return { bg: "#f8d7da", color: "#721c24", icon: "alert-circle" };
            default: return { bg: "#e2e3e5", color: "#383d41", icon: "help-circle" };
        }
    };

    const renderPaymentItem = ({ item }: { item: any }) => {
        const statusInfo = getStatusColor(item.paymentStatus);
        const date = item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "N/A";

        return (
            <Card style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.leftColumn}>
                        <View style={styles.amountRow}>
                            <Text style={styles.currency}>$</Text>
                            <Text style={styles.amount}>{item.amount}</Text>
                        </View>
                        <View style={styles.dateRow}>
                            <Ionicons name="calendar-outline" size={14} color="#666" />
                            <Text style={styles.dateText}>Due: {date}</Text>
                        </View>
                    </View>

                    <View style={styles.rightColumn}>
                        <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
                            <Ionicons name={statusInfo.icon as any} size={14} color={statusInfo.color} />
                            <Text style={[styles.statusText, { color: statusInfo.color }]}>
                                {item.paymentStatus}
                            </Text>
                        </View>
                        {item.verifiedByLandlord === "Accept" && (
                            <View style={styles.verifiedContainer}>
                                <Ionicons name="checkmark-done" size={12} color="#27ae60" />
                                <Text style={styles.verifiedText}>Verified</Text>
                            </View>
                        )}
                    </View>
                </View>
                <Divider />
                <Card.Actions style={{ justifyContent: 'flex-end', paddingHorizontal: 4 }}>
                    <Button
                        mode="text"
                        onPress={() => handleGetReceipt(item.paymentId)}
                        textColor="#1E3A8A"
                        icon="receipt"
                        compact
                    >
                        Get Receipt
                    </Button>
                </Card.Actions>
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
            {payments.length === 0 ? (
                <View style={[styles.center, { opacity: 0.7 }]}>
                    <Ionicons name="wallet-outline" size={64} color="#ccc" />
                    <Text style={{ color: '#666', fontSize: 16, marginTop: 10 }}>No payments found.</Text>
                </View>
            ) : (
                <FlatList
                    data={payments}
                    keyExtractor={(item) => item.paymentId}
                    renderItem={renderPaymentItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

            <Portal>
                <Modal visible={receiptVisible} onDismiss={() => setReceiptVisible(false)} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Payment Receipt</Text>
                        <Ionicons name="close" size={24} color="#333" onPress={() => setReceiptVisible(false)} />
                    </View>
                    <Divider style={{ marginVertical: 10 }} />
                    <ScrollView style={{ maxHeight: 500 }} contentContainerStyle={{ alignItems: 'center' }}>
                        {receiptContent ? (
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                {receiptContent.ReceiptUrl ? (
                                    <Image
                                        source={{ uri: receiptContent.ReceiptUrl }}
                                        style={{
                                            width: '100%',
                                            height: undefined,
                                            aspectRatio: imgRatio || 1, // Use dynamic ratio or default square
                                            borderRadius: 8,
                                            backgroundColor: '#f0f0f0'
                                        }}
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <View style={{ width: '100%' }}>
                                        <Text style={styles.receiptText}>{receiptContent.raw || JSON.stringify(receiptContent, null, 2)}</Text>
                                    </View>
                                )}
                            </View>
                        ) : (
                            <ActivityIndicator color="#1E3A8A" style={{ margin: 20 }} />
                        )}
                    </ScrollView>
                    <Button mode="contained" onPress={() => setReceiptVisible(false)} style={{ marginTop: 20, backgroundColor: '#1E3A8A' }}>
                        Close
                    </Button>
                </Modal>
            </Portal>

            {receiptLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fa', padding: 15 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    cardContent: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftColumn: {
        flexDirection: 'column',
        gap: 4,
    },
    rightColumn: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 6,
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    currency: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E3A8A',
        marginTop: 2,
        marginRight: 2
    },
    amount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    dateText: {
        fontSize: 13,
        color: '#666'
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    statusText: { fontSize: 11, fontWeight: "600" },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },
    verifiedText: {
        fontSize: 10,
        color: '#27ae60',
        fontWeight: '500'
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 12,
        elevation: 5
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E3A8A'
    },
    receiptText: {
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#333'
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    }
});
