import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card } from "react-native-paper";

type Receipt = {
  id: string;
  payer: string;      // student name
  payee: string;      // landlord name
  apartment?: string; // optional for landlord context
  amount: number;
  date: string;
};

type Props = {
  role: "student" | "landlord" | "admin";
  userId: string; // current logged-in user id
};

// Mock data
const receipts: Receipt[] = [
  { id: "1", payer: "Ali Hassan", payee: "John Doe", apartment: "Apt 101", amount: 250, date: "2025-11-01" },
  { id: "2", payer: "Sara Ibrahim", payee: "John Doe", apartment: "Apt 102", amount: 300, date: "2025-11-05" },
  { id: "3", payer: "Omar Khalid", payee: "Jane Smith", apartment: "Apt 201", amount: 275, date: "2025-11-10" },
];

export default function ReceiptsPanel({ role, userId }: Props) {
  // Filter receipts based on role
  let filtered: Receipt[] = [];
  if (role === "student") {
    filtered = receipts.filter((r) => r.payer === userId);
  } else if (role === "landlord") {
    filtered = receipts.filter((r) => r.payee === userId);
  } else {
    filtered = receipts; // admin sees all
  }

  const renderItem = ({ item }: { item: Receipt }) => (
    <Card style={styles.card}>
      <Card.Title title={`Receipt #${item.id}`} subtitle={item.date} />
      <Card.Content>
        {role === "student" && (
          <>
            <Text>💰 Paid: ${item.amount}</Text>
            <Text>To: {item.payee}</Text>
            <Text>Apartment: {item.apartment}</Text>
          </>
        )}
        {role === "landlord" && (
          <>
            <Text>💰 Received: ${item.amount}</Text>
            <Text>From: {item.payer}</Text>
            <Text>Apartment: {item.apartment}</Text>
          </>
        )}
        {role === "admin" && (
          <>
            <Text>💰 Amount: ${item.amount}</Text>
            <Text>Payer: {item.payer}</Text>
            <Text>Payee: {item.payee}</Text>
            <Text>Apartment: {item.apartment}</Text>
          </>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipts</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { marginVertical: 8, marginHorizontal:2},
});
