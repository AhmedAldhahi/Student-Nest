import { View, StyleSheet, FlatList, Alert } from "react-native";
import { Text, Button, Card } from "react-native-paper";

type Apartment = {
  id: string;
  name: string;
  location: string;
  rent: number;
  docs?: string;
};

const apartments: Apartment[] = [
  { id: "1", name: "Apt 101", location: "Downtown Amman", rent: 250, docs: "LeaseDoc101.pdf" },
  { id: "2", name: "Apt 202", location: "West Amman", rent: 300, docs: "LeaseDoc202.pdf" },
  { id: "3", name: "Apt 303", location: "East Amman", rent: 275, docs: "LeaseDoc303.pdf" },
];

export default function ApartmentListingsPanel() {
  const handleDelete = (id: string) => {
    Alert.alert("Delete Apartment", `Are you sure you want to delete apartment #${id}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => console.log("Deleted apartment", id) },
    ]);
  };

  const handleEdit = (id: string) => {
    console.log("Edit apartment", id);
  };

  const handleViewDocs = (docs?: string) => {
    if (docs) {
      console.log("Open docs:", docs);
    } else {
      Alert.alert("No documentation available");
    }
  };

  const renderItem = ({ item }: { item: Apartment }) => (
    <Card style={styles.card} elevation={4}>
      <Card.Title title={item.name} subtitle={item.location} />
      <Card.Content>
        <Text style={styles.text}>💰 Rent: ${item.rent}</Text>
        {item.docs && <Text style={styles.text}>📄 Docs: {item.docs}</Text>}
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="outlined" onPress={() => handleEdit(item.id)}>Edit</Button>
        <Button mode="outlined" onPress={() => handleDelete(item.id)}>Delete</Button>
        <Button mode="outlined" onPress={() => handleViewDocs(item.docs)}>Docs</Button>
        <Button mode="outlined" onPress={() => console.log("View details", item.id)}>Details</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apartment Listings</Text>
      <FlatList
        data={apartments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  card: {
    marginVertical: 10,
    borderRadius: 12,
    paddingBottom: 8,
    backgroundColor: "#fff",
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // elevation for Android
    elevation: 4,
    margin:2
  },
  text: { marginBottom: 4 },
  actions: {
    flexWrap: "wrap", // allow buttons to wrap if too many
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});
