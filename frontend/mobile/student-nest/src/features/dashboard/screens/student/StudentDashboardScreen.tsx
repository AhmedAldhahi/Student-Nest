import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../../context/AuthContext"; // 👈 import auth hook

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StudentDashboardScreen"
>;

export default function StudentDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user, isStudent } = useAuth();

  if (!isStudent || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Unauthorized</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Welcome {user.name}</Text>

        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          Profile
        </Button>

        {/* 👇 Refactored: navigate to StudentRequestsScreen with studentId */}
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() =>
            navigation.navigate("StudentRequestsScreen", { studentId: parseInt(user.id) })
          }
        >
          My Requests
        </Button>

        {/* <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("PaymentsScreen")}
        >
          Payments
        </Button> */}

        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          Notifications
        </Button>

        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("StudentLeaseScreen", { studentId: parseInt(user.id) })}
        >
          My Receipts
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          Settings
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  btn: { marginVertical: 6, backgroundColor: "#1E3A8A" },
});
