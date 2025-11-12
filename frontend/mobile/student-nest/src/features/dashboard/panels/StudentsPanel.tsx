import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button, Card } from "react-native-paper";

type Student = {
  id: string;
  name: string;
  email: string;
  major: string;
};

const students: Student[] = [
  { id: "1", name: "Ali Hassan", email: "ali@example.com", major: "Computer Science" },
  { id: "2", name: "Sara Ibrahim", email: "sara@example.com", major: "Business Administration" },
  { id: "3", name: "Omar Khalid", email: "omar@example.com", major: "Architecture" },
];

export default function StudentsPanel() {
  const renderItem = ({ item }: { item: Student }) => (
    <Card style={styles.card}>
      <Card.Title title={item.name} subtitle={item.email} />
      <Card.Content>
        <Text>🎓 {item.major}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log("View student", item.id)}>View</Button>
        <Button onPress={() => console.log("Edit student", item.id)}>Edit</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>
      <FlatList
        data={students}
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
