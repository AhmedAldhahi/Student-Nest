import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

export default function PaymentsPanel() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Scheduling</Text>
      <Button mode="contained" style={styles.btn}>Schedule Payment</Button>
      <Button mode="outlined" style={styles.btn}>View History</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  btn: { marginVertical: 5 },
});
