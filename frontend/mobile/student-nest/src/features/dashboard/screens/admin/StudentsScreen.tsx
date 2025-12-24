import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import { Text, Card, Avatar, Searchbar, Chip, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { useAuth } from "../../../../context/AuthContext";
import { searchStudentByEmail, getAllStudents } from "../../api/adminService";
import { Student } from "./types";

export default function StudentsScreen() {
  const { token } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Debounce search or just fetch all initially
    if (searchQuery.length === 0) {
      fetchStudents();
    }
  }, [searchQuery]); // Reload all if search cleared

  const fetchStudents = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getAllStudents(token);
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!token) return;
    if (!searchQuery) {
      fetchStudents();
      return;
    }

    // If it looks like an email, use the search endpoint
    if (searchQuery.includes("@")) {
      setLoading(true);
      try {
        const data = await searchStudentByEmail(token, searchQuery);
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          // Sometimes search might return a single object or empty array depending on API
          // User example showed array: [ { ... } ]
          setStudents(Array.isArray(data) ? data : [data]);
        }
      } catch (error) {
        console.error("Search error:", error);
        // Fallback to local filtering if API fails or if purely local search desired
        // But user explicitly asked to use the endpoint.
        // We'll keep current list and let the local filter below handle it if API fails? 
        // No, better to show error or empty.
        setStudents([]);
      } finally {
        setLoading(false);
      }
    } else {
      // Local filter will happen on render based on `students` state, 
      // but if we are in "all students" mode, we filter locally.
    }
  };

  const filteredStudents = students.filter((s) => {
    // If we already searched by API (email), the list is already filtered.
    // If we fetched all, we filter locally by name/email/uni.
    if (searchQuery.includes("@") && students.length < 5) return true; // weak check if it's the search result

    const u = s.user;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.universityName && s.universityName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  const renderStudent = ({ item }: { item: Student }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.user.name}
        subtitle={item.user.email}
        left={(props) =>
          item.user.photo ? (
            <Avatar.Image {...props} source={{ uri: item.user.photo }} />
          ) : (
            <Avatar.Icon {...props} icon="account" />
          )
        }
        right={() => (
          <Chip style={styles.statusChip}>{item.user.role}</Chip>
        )}
      />
      <Card.Content>
        <Text style={styles.detail}>University: {item.universityName}</Text>
        <Text style={styles.detail}>Major: {item.Major}</Text>
        <Text style={styles.detail}>Phone: {item.user.phoneNumber}</Text>
        <Text style={styles.detail}>Joined: {new Date(item.user.createdAt).toLocaleDateString()}</Text>
        <Chip
          icon={item.user.emailVerfied ? "check" : "alert"}
          style={[
            styles.emailChip,
            item.user.emailVerfied ? styles.verified : styles.unverified,
          ]}
        >
          {item.user.emailVerfied ? "Email Verified" : "Email Not Verified"}
        </Chip>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="outlined"
          style={styles.btn}
          onPress={() => navigation.navigate("StudentDetailScreen", { student: item })}
        >
          View Profile
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Students</Text>
      <Searchbar
        placeholder="Search by name, email, or university"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        onIconPress={handleSearch}
        style={styles.search}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1E3A8A" />
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.user.userId}
          renderItem={renderStudent}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No students found.</Text>}
        />
      )}
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
