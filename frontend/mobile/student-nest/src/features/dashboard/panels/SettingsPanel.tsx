import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

export default function SettingsPanel() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button mode="contained" style={styles.btn}>Change Theme</Button>
      <Button mode="contained" style={styles.btn}>Notification Preferences</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  btn: { marginVertical: 5 },
});
