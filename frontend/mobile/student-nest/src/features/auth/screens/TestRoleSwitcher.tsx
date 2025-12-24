import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useAuth } from "../../../context/AuthContext";

export default function TestRoleSwitcher() {
  const { loginAs } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Login as Student" onPress={() => loginAs("student")} />
      <Button title="Login as Landlord" onPress={() => loginAs("landlord")} />
      <Button title="Login as Admin" onPress={() => loginAs("admin")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
