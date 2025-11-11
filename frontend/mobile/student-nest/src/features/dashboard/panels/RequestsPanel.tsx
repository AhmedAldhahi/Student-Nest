import { View, StyleSheet } from "react-native";
import { Text, List, Button } from "react-native-paper";

export default function RequestsPanel() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lease Requests</Text>
      <List.Item title="Request from John Doe" description="Apartment #5" />
      <Button mode="contained" style={styles.btn}>Approve</Button>
      <Button mode="outlined" style={styles.btn}>Reject</Button>
      <List.Item title="Request from John Doe" description="Apartment #5" />
      <Button mode="contained" style={styles.btn}>Approve</Button>
      <Button mode="outlined" style={styles.btn}>Reject</Button>
      <List.Item title="Request from John Doe" description="Apartment #5" />
      <Button mode="contained" style={styles.btn}>Approve</Button>
      <Button mode="outlined" style={styles.btn}>Reject</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  btn: { marginVertical: 5 },
});
