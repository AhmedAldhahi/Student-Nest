// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { Text, Button } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";

// export default function StudentDashboardScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Student Dashboard</Text>

//       <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("ProfileScreen")}>
//         Profile
//       </Button>
//       <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("RequestsScreen")}>
//         My Requests
//       </Button>
//       <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("PaymentsScreen")}>
//         Payments
//       </Button>
//       <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("NotificationsScreen")}>
//         Notifications
//       </Button>
//       <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate("ReceiptsScreen")}>
//         My Receipts
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
//   header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
//   btn: { marginVertical: 6, backgroundColor: "#1E3A8A" },
// });
