import { View, StyleSheet } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeasePanel() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Leases</Text>
        <Card style={styles.card}>
          <Card.Title title="Apartment #12" subtitle="Expires: Dec 2025" />
          <Card.Actions>
            <Button>Renew</Button>
            <Button>Cancel</Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { marginVertical: 10 },
});
