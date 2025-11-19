// import React, { useState } from "react";
// import { View, StyleSheet, FlatList } from "react-native";
// import { Text, Card, Avatar, Searchbar, Chip, Button } from "react-native-paper";

// const mockLandlords = [
//   {
//     landlordId: 1,
//     name: "Ahmed Khalid",
//     email: "ahmed@example.com",
//     emailVerified: true,
//     phoneNumber: "0791234567",
//     photo: null,
//     isActive: "activate",
//     createdAt: "2025-01-10",
//     clicQAccount: "LAND12345",
//     verified: true,
//     landlordGovID: "JRD123456789",
//   },
//   {
//     landlordId: 2,
//     name: "Sarah Ali",
//     email: "sarah@example.com",
//     emailVerified: false,
//     phoneNumber: "0789876543",
//     photo: null,
//     isActive: "ban",
//     createdAt: "2025-02-20",
//     clicQAccount: "LAND67890",
//     verified: false,
//     landlordGovID: "JRD987654321",
//   },
// ];

// export default function LandlordsScreen() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [landlords, setLandlords] = useState(mockLandlords);

//   const filteredLandlords = landlords.filter(
//     (l) =>
//       l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       l.clicQAccount.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderLandlord = ({ item }: { item: typeof mockLandlords[0] }) => (
//     <Card style={styles.card}>
//       <Card.Title
//         title={item.name}
//         subtitle={item.email}
//         left={(props) =>
//           item.photo ? (
//             <Avatar.Image {...props} source={{ uri: item.photo }} />
//           ) : (
//             <Avatar.Icon {...props} icon="account" />
//           )
//         }
//         right={() => (
//           <Chip
//             style={[
//               styles.statusChip,
//               item.isActive === "activate"
//                 ? styles.active
//                 : item.isActive === "ban"
//                 ? styles.banned
//                 : styles.deactivated,
//             ]}
//           >
//             {item.isActive}
//           </Chip>
//         )}
//       />
//       <Card.Content>
//         <Text style={styles.detail}>Phone: {item.phoneNumber}</Text>
//         <Text style={styles.detail}>Joined: {item.createdAt}</Text>
//         <Text style={styles.detail}>clicQ Account: {item.clicQAccount}</Text>
//         <Text style={styles.detail}>
//           Gov ID: ****{item.landlordGovID.slice(-4)}
//         </Text>
//         <Chip
//           icon={item.verified ? "check" : "alert"}
//           style={[
//             styles.verifyChip,
//             item.verified ? styles.verified : styles.unverified,
//           ]}
//         >
//           {item.verified ? "Verified Landlord" : "Not Verified"}
//         </Chip>
//       </Card.Content>
//       <Card.Actions>
//         <Button mode="outlined" style={styles.btn}>
//           View Profile
//         </Button>
//         <Button
//           mode="contained"
//           style={styles.btn}
//           buttonColor={item.verified ? "#e67e22" : "#2ecc71"}
//         >
//           {item.verified ? "Unverify" : "Verify"}
//         </Button>
//       </Card.Actions>
//     </Card>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>All Landlords</Text>
//       <Searchbar
//         placeholder="Search by name, email, or account"
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         style={styles.search}
//       />
//       <FlatList
//         data={filteredLandlords}
//         keyExtractor={(item) => item.landlordId.toString()}
//         renderItem={renderLandlord}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
//   header: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: "#333" },
//   search: { marginBottom: 16, borderRadius: 12 },
//   card: { marginBottom: 16, borderRadius: 12, elevation: 3 },
//   detail: { fontSize: 14, color: "#555", marginBottom: 4 },
//   statusChip: { marginRight: 8 },
//   active: { backgroundColor: "#2ecc71" },
//   banned: { backgroundColor: "#e74c3c" },
//   deactivated: { backgroundColor: "#95a5a6" },
//   verifyChip: { marginTop: 8, alignSelf: "flex-start" },
//   verified: { backgroundColor: "#2ecc71" },
//   unverified: { backgroundColor: "#f39c12" },
//   btn: { marginHorizontal: 4 },
// });


import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Avatar, Searchbar, Chip, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "LandlordsScreen">;

const mockLandlords = [
  {
    landlordId: 1,
    name: "Ahmed Khalid",
    email: "ahmed@example.com",
    phoneNumber: "0791234567",
    photo: null,
    isActive: "activate",
    verified: true,
    clicQAccount: "LAND12345",
  },
  {
    landlordId: 2,
    name: "Sarah Ali",
    email: "sarah@example.com",
    phoneNumber: "0789876543",
    photo: null,
    isActive: "ban",
    verified: false,
    clicQAccount: "LAND67890",
  },
];

export default function LandlordsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [landlords, setLandlords] = useState(mockLandlords);

  const filteredLandlords = landlords.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.clicQAccount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLandlord = ({ item }: { item: typeof mockLandlords[0] }) => (
    <Card style={styles.card} onPress={() => navigation.navigate("LandlordDetailScreen", { landlordId: item.landlordId })}>
      <Card.Title
        title={item.name}
        subtitle={item.email}
        left={(props) =>
          item.photo ? (
            <Avatar.Image {...props} source={{ uri: item.photo }} />
          ) : (
            <Avatar.Icon {...props} icon="account" />
          )
        }
        right={() => (
          <Chip
            style={[
              styles.statusChip,
              item.isActive === "activate"
                ? styles.active
                : item.isActive === "ban"
                ? styles.banned
                : styles.deactivated,
            ]}
          >
            {item.isActive}
          </Chip>
        )}
      />
      <Card.Content>
        <Text style={styles.detail}>Phone: {item.phoneNumber}</Text>
        <Text style={styles.detail}>clicQ Account: {item.clicQAccount}</Text>
        <Chip
          icon={item.verified ? "check" : "alert"}
          style={[
            styles.verifyChip,
            item.verified ? styles.verified : styles.unverified,
          ]}
        >
          {item.verified ? "Verified" : "Not Verified"}
        </Chip>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" style={styles.btn}>
          View Details
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          buttonColor={item.verified ? "#e67e22" : "#2ecc71"}
        >
          {item.verified ? "Unverify" : "Verify"}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Landlords</Text>
      <Searchbar
        placeholder="Search by name, email, or account"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.search}
      />
      <FlatList
        data={filteredLandlords}
        keyExtractor={(item) => item.landlordId.toString()}
        renderItem={renderLandlord}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: "#333" },
  search: { marginBottom: 16, borderRadius: 12 },
  card: { marginBottom: 16, borderRadius: 12, elevation: 3 },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  statusChip: { marginRight: 8 },
  active: { backgroundColor: "#2ecc71" },
  banned: { backgroundColor: "#e74c3c" },
  deactivated: { backgroundColor: "#95a5a6" },
  verifyChip: { marginTop: 8, alignSelf: "flex-start" },
  verified: { backgroundColor: "#2ecc71" },
  unverified: { backgroundColor: "#f39c12" },
  btn: { marginHorizontal: 4 },
});
