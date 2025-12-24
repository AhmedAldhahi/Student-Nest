import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, Linking, TextInput } from "react-native";
import { Text, Card, Button, Chip } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "VerificationScreen">;

type Document = {
  documentId: number;
  documentType: string;
  documentUrl: string;
  apartmentId: number;
  status: "pending" | "approved" | "rejected";
};

// Mock data — replace with API
const mockDocuments: Document[] = [
  {
    documentId: 1,
    documentType: "Ownership Certificate",
    documentUrl: "https://example.com/docs/ownership.pdf",
    apartmentId: 301,
    status: "pending",
  },
  {
    documentId: 2,
    documentType: "Utility Bill",
    documentUrl: "https://example.com/docs/utility.pdf",
    apartmentId: 302,
    status: "approved",
  },
  {
    documentId: 3,
    documentType: "Tax Record",
    documentUrl: "https://example.com/docs/tax.pdf",
    apartmentId: 303,
    status: "rejected",
  },
];

export default function VerificationScreen({ route }: Props) {
  const { landlordId } = route.params;
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [search, setSearch] = useState("");

  const filteredDocs = mockDocuments.filter((doc) => {
    const matchesFilter = filter === "all" ? true : doc.status === filter;
    const matchesSearch =
      search === "" ||
      doc.documentType.toLowerCase().includes(search.toLowerCase()) ||
      doc.apartmentId.toString().includes(search);
    return matchesFilter && matchesSearch;
  });

  const renderDocument = ({ item }: { item: Document }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{item.documentType}</Text>
          <Chip
            style={[
              styles.statusChip,
              item.status === "approved"
                ? styles.approved
                : item.status === "rejected"
                ? styles.rejected
                : styles.pending,
            ]}
          >
            {item.status.toUpperCase()}
          </Chip>
        </View>
        <Text style={styles.detail}>Document ID: {item.documentId}</Text>
        <Text style={styles.detail}>Apartment ID: {item.apartmentId}</Text>
        <Button
          mode="outlined"
          icon="document"
          onPress={() => Linking.openURL(item.documentUrl)}
        >
          View Document
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Documents for Landlord #{landlordId}</Text>

        {/* Search bar */}
        <TextInput
          placeholder="Search by type or apartment ID..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />

        {/* Filter bar */}
        <View style={styles.filterRow}>
          {["all", "pending", "approved", "rejected"].map((s) => (
            <Chip
              key={s}
              selected={filter === s}
              onPress={() => setFilter(s as any)}
              style={[
                styles.filterChip,
                s === "approved"
                  ? styles.approved
                  : s === "rejected"
                  ? styles.rejected
                  : styles.pending,
              ]}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Chip>
          ))}
        </View>

        <FlatList
          data={filteredDocs}
          keyExtractor={(doc) => doc.documentId.toString()}
          renderItem={renderDocument}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 16, color: "#1E3A8A" },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  filterRow: { flexDirection: "row", marginBottom: 12 },
  filterChip: { marginRight: 8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    padding: 12,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  title: { fontSize: 18, fontWeight: "600", color: "#333" },
  detail: { fontSize: 14, color: "#555", marginBottom: 6 },
  statusChip: { alignSelf: "flex-start" },
  pending: { backgroundColor: "#f39c12" },
  approved: { backgroundColor: "#2ecc71" },
  rejected: { backgroundColor: "#e74c3c" },
});
