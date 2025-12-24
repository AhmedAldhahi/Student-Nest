// src/features/apartments/screens/AddApartmentForm.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../../context/AuthContext";
import { Button, Switch } from "react-native-paper";
import { addApartmentSchema } from "../../../validation/addApartmentSchema";
import ValidatedInput from "../../auth/components/ValidatedInput";
import { AddApartmentFormValues, AddApartmentPayload } from "../types";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddApartmentForm() {
  const { user } = useAuth();
  const [images, setImages] = React.useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddApartmentFormValues>({
    resolver: yupResolver(addApartmentSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0, // 👈 number
      address: "",
      rooms: 0, // 👈 number
      beds: 0, // 👈 number
      joinedRoom: false,
    },
  });

  // 👇 Image picker
  const pickImages = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Expo SDK 48+
      selectionLimit: 6,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setImages(uris);
    }
  };

  const submit: SubmitHandler<AddApartmentFormValues> = async (data) => {
    const payload: AddApartmentPayload = {
      landlordName: user?.name ?? "Unknown",
      title: data.title,
      description: data.description,
      price: String(data.price), // 👈 convert to string
      address: data.address,
      rooms: String(data.rooms), // 👈 convert to string
      beds: String(data.beds), // 👈 convert to string
      joinedRoom: data.joinedRoom, // stays boolean
      images, // 👈 array of URIs
    };

    await fetch("https://your-api.com/apartments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Apartment submitted:", payload);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAwareScrollView>
        {/* 👇 Landlord name from AuthContext */}
        <Text style={styles.header}>Add Apartment Listing</Text>
        <Text style={styles.subHeader}>Landlord: {user?.name}</Text>

        {/* Upload box */}
        <View style={styles.uploadBox}>
          <TouchableOpacity onPress={pickImages}>
            <Text style={styles.uploadText}>
              {images.length > 0
                ? `Selected ${images.length} / 6 pictures`
                : "Upload up to 6 pictures"}
            </Text>
          </TouchableOpacity>

          {/* Preview thumbnails */}
          <ScrollView horizontal style={{ marginTop: 10 }}>
            {images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.previewImage} />
            ))}
          </ScrollView>
        </View>

        {/* 👇 Validated Inputs */}
        <ValidatedInput control={control} name="title" label="Title" />
        <ValidatedInput
          control={control}
          name="description"
          label="Description"
        />
        <ValidatedInput
          control={control}
          name="price"
          label="Price"
          keyboardType="phone-pad"
        />
        <ValidatedInput control={control} name="address" label="Address" />
        <ValidatedInput
          control={control}
          name="rooms"
          label="Number of Rooms"
          keyboardType="phone-pad"
        />
        <ValidatedInput
          control={control}
          name="beds"
          label="Number of Beds"
          keyboardType="phone-pad"
        />

        {/* ✅ Boolean field with Switch */}
        <View style={styles.booleanRow}>
          <Text style={styles.booleanLabel}>Joined Room?</Text>
          <Controller
            control={control}
            name="joinedRoom"
            render={({ field: { value, onChange } }) => (
              <Switch value={value} onValueChange={onChange} color="#1E3A8A" />
            )}
          />
        </View>

        {/* 👇 Submit button */}
        <Button
          mode="contained"
          onPress={handleSubmit(submit)}
          style={styles.submitButton}
        >
          Save Apartment
        </Button>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f9fafb" },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1E3A8A",
  },
  subHeader: { fontSize: 16, marginBottom: 16, color: "#333" },
  uploadBox: {
    borderWidth: 2,
    borderColor: "#1E3A8A",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  uploadText: { color: "#1E3A8A", fontWeight: "600" },
  previewImage: {
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  booleanRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  booleanLabel: { fontSize: 16, marginRight: 10, color: "#333" },
  submitButton: { marginTop: 20, backgroundColor: "#1E3A8A" },
});
