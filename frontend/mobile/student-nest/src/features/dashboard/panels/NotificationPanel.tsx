import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Notification = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const notifications: Notification[] = [
  {
    id: "1",
    title: "Lease Request Approved",
    description: "Your request for Apartment #12 has been approved.",
    icon: "check-circle",
  },
  {
    id: "2",
    title: "Payment Reminder",
    description: "Your rent payment is due tomorrow.",
    icon: "calendar-alert",
  },
  {
    id: "3",
    title: "New Message",
    description: "You have a new message from your landlord.",
    icon: "email",
  },
];

export default function NotificationPanel() {
  const renderItem = ({ item }: { item: Notification }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.title}
        subtitle={item.description}
        left={(props) => (
          <MaterialCommunityIcons
            name={item.icon as any}
            size={28}
            color="#3F51B5"
          />
        )}
        right={(props) => (
          <IconButton icon="close" onPress={() => console.log("Dismiss", item.id)} />
        )}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <Button mode="contained" style={styles.clearBtn} onPress={() => console.log("Clear All")}>
        Clear All
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { marginVertical: 8 },
  clearBtn: { marginTop: 16 },
});
