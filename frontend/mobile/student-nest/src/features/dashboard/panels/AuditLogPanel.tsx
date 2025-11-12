import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card } from "react-native-paper";

type AuditLog = {
  id: string;
  actor: string;   // who performed the action
  action: string;  // what they did
  target?: string; // optional: what entity was affected
  timestamp: string;
};

const logs: AuditLog[] = [
  { id: "1", actor: "Admin", action: "Created landlord", target: "John Doe", timestamp: "2025-11-01 10:15" },
  { id: "2", actor: "Admin", action: "Deleted student", target: "Sara Ibrahim", timestamp: "2025-11-02 14:30" },
  { id: "3", actor: "Landlord John Doe", action: "Added lease", target: "Apt 101", timestamp: "2025-11-03 09:45" },
  { id: "4", actor: "Student Ali Hassan", action: "Submitted payment", target: "Apt 102", timestamp: "2025-11-04 16:20" },
];

export default function AuditLogPanel() {
  const renderItem = ({ item }: { item: AuditLog }) => (
    <Card style={styles.card}>
      <Card.Title title={item.action} subtitle={item.timestamp} />
      <Card.Content>
        <Text>👤 Actor: {item.actor}</Text>
        {item.target && <Text>🎯 Target: {item.target}</Text>}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audit Log</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { marginVertical: 8, marginHorizontal:2 },
});
