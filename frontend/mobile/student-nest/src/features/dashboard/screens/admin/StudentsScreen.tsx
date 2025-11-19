import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Card, Avatar, Searchbar, Chip, Button } from "react-native-paper";

const mockUsers = [
  {
    userId: 1,
    name: "John Doe",
    email: "john@example.com",
    emailVerified: true,
    role: "student",
    phoneNumber: "0791234567",
    photo: null,
    isActive: "activate",
    createdAt: "2025-01-10",
  },
  {
    userId: 2,
    name: "Sarah Ali",
    email: "sarah@example.com",
    emailVerified: false,
    role: "landlord",
    phoneNumber: "0789876543",
    photo: null,
    isActive: "ban",
    createdAt: "2025-02-20",
  },
  {
    userId: 3,
    name: "Michael Smith",
    email: "michael@example.com",
    emailVerified: true,
    role: "student",
    phoneNumber: "0775554443",
    photo: null,
    isActive: "deactivate",
    createdAt: "2025-03-05",
  },
];

export default function StudentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUser = ({ item }: { item: typeof mockUsers[0] }) => (
    <Card style={styles.card}>
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
        <Text style={styles.detail}>Role: {item.role}</Text>
        <Text style={styles.detail}>Phone: {item.phoneNumber}</Text>
        <Text style={styles.detail}>Joined: {item.createdAt}</Text>
        <Chip
          icon={item.emailVerified ? "check" : "alert"}
          style={[
            styles.emailChip,
            item.emailVerified ? styles.verified : styles.unverified,
          ]}
        >
          {item.emailVerified ? "Email Verified" : "Email Not Verified"}
        </Chip>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" style={styles.btn}>
          View Profile
        </Button>
        <Button
          mode="contained"
          style={styles.btn}
          buttonColor={item.isActive === "ban" ? "#2ecc71" : "#e74c3c"}
        >
          {item.isActive === "ban" ? "Activate" : "Ban"}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      <Searchbar
        placeholder="Search by name, email, or role"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.search}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.userId.toString()}
        renderItem={renderUser}
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
  emailChip: { marginTop: 8, alignSelf: "flex-start" },
  verified: { backgroundColor: "#2ecc71" },
  unverified: { backgroundColor: "#f39c12" },
  btn: { marginHorizontal: 4 },
});
