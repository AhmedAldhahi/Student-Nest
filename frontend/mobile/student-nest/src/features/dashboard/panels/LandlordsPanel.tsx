import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button, Card } from "react-native-paper";

type Landlord = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

const landlords: Landlord[] = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "555-1234" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "555-5678" },
  { id: "3", name: "Ahmed Khalid", email: "ahmed@example.com", phone: "555-9012" },
];

export default function LandlordsPanel() {
  const renderItem = ({ item }: { item: Landlord }) => (
    <Card style={styles.card}>
      <Card.Title title={item.name} subtitle={item.email} />
      <Card.Content>
        <Text>📞 {item.phone}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log("View landlord", item.id)}>View</Button>
        <Button onPress={() => console.log("Edit landlord", item.id)}>Edit</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Landlords</Text>
      <FlatList
        data={landlords}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { marginVertical: 8 ,marginHorizontal:2 },
});
