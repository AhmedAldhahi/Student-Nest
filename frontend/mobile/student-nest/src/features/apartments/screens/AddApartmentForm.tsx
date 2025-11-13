// src/features/apartments/screens/AddApartmentForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function AddApartmentForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState("");
  const [beds, setBeds] = useState("");

  const handleSubmit = () => {
    // TODO: integrate with backend later
    console.log("New apartment:", { title, price, rooms, beds });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Apartment</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Rooms"
        value={rooms}
        onChangeText={setRooms}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Beds"
        value={beds}
        onChangeText={setBeds}
        keyboardType="numeric"
      />
      <Button title="Save Apartment" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});
