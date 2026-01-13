// src/features/apartments/screens/AddApartmentForm.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { Button, Switch, TextInput, ActivityIndicator, IconButton } from "react-native-paper";
import { addApartmentSchema } from "../../../validation/addApartmentSchema";
import ValidatedInput from "../../auth/components/ValidatedInput";
import { AddApartmentFormValues } from "../types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addApartment } from "../../dashboard/api/landlordService";
import { Ionicons } from "@expo/vector-icons";
import ImageUpload from "../../../components/ImageUpload";

export default function AddApartmentForm() {
  const { user, token } = useAuth();
  const navigation = useNavigation();
  const [images, setImages] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddApartmentFormValues>({
    resolver: yupResolver(addApartmentSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      address: "",
      rooms: 1,
      beds: 1,
      joinedRoom: false,
      isVisible: true,
      googleMapLocationLat: 31.9539, // Default Amman
      googleMapLocationLong: 35.9106,
    },
  });

  const isVisible = watch("isVisible");
  const joinedRoom = watch("joinedRoom");

  // Image picker with resizing
  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
    setValue("images", newImages); // Update form state for validation
  };

  const submit: SubmitHandler<AddApartmentFormValues> = async (data) => {
    if (!token) {
      Alert.alert("Error", "You must be logged in to add an apartment.");
      return;
    }

    if (images.length === 0) {
      Alert.alert("Required", "Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: data.title,
        description: data.description,
        price: data.price,
        address: data.address,
        rooms: data.rooms,
        beds: data.beds,
        isVisible: data.isVisible,
        isJoin: data.joinedRoom,
        googleMapLocationLat: data.googleMapLocationLat,
        googleMapLocationLong: data.googleMapLocationLong,
      };

      await addApartment(token, payload, images);
      setSuccessModalVisible(true);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to add apartment. Please try again.");
      setErrorModalVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Ionicons name="home-outline" size={32} color="#1E3A8A" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.header}>Add New Apartment</Text>
              <Text style={styles.subHeader}>Fill in the details for your new listing</Text>
            </View>
          </View>

          {/* Upload box */}
          <ImageUpload
            images={images}
            onImagesChange={handleImagesChange}
          />

          {/* Validated Inputs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Info</Text>
            <ValidatedInput control={control} name="title" label="Apartment Title" placeholder="e.g. Sunny Studio in Amman" />
            <ValidatedInput
              control={control}
              name="description"
              label="Description"
              multiline
              numberOfLines={3}
              placeholder="Describe your property..."
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <ValidatedInput
                  control={control}
                  name="price"
                  label="Price (JOD)"
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <ValidatedInput control={control} name="address" label="City / Address" />
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <ValidatedInput
                  control={control}
                  name="rooms"
                  label="Rooms"
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <ValidatedInput
                  control={control}
                  name="beds"
                  label="Beds"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location (Coordinates)</Text>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <ValidatedInput
                  control={control}
                  name="googleMapLocationLat"
                  label="Latitude"
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <ValidatedInput
                  control={control}
                  name="googleMapLocationLong"
                  label="Longitude"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Toggles */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>

            <View style={styles.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="eye-outline" size={24} color="#555" style={{ marginRight: 10 }} />
                <Text style={styles.toggleLabel}>Visible to Students</Text>
              </View>
              <Controller
                control={control}
                name="isVisible"
                render={({ field: { value, onChange } }) => (
                  <Switch value={value} onValueChange={onChange} color="#1E3A8A" />
                )}
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="people-outline" size={24} color="#555" style={{ marginRight: 10 }} />
                <Text style={styles.toggleLabel}>Allow Roommates (Join)</Text>
              </View>
              <Controller
                control={control}
                name="joinedRoom"
                render={({ field: { value, onChange } }) => (
                  <Switch value={value} onValueChange={onChange} color="#1E3A8A" />
                )}
              />
            </View>
          </View>

          {/* Submit button */}
          <Button
            mode="contained"
            onPress={handleSubmit(submit, (errors) => console.log("VALIDATION ERRORS:", errors))}
            style={styles.submitButton}
            contentStyle={{ paddingVertical: 6 }}
            labelStyle={{ fontSize: 16, fontWeight: '700' }}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Apartment"}
          </Button>

          <View style={{ height: 40 }} />
        </KeyboardAwareScrollView>
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={80} color="#2ecc71" />
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Your apartment has been added successfully.</Text>
            <Button mode="contained" onPress={handleSuccessClose} style={styles.modalBtn} buttonColor="#2ecc71">
              Continue
            </Button>
          </View>
        </View>
      </Modal>

      {/* Error Modal */}
      <Modal visible={errorModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle" size={80} color="#e74c3c" />
            <Text style={[styles.modalTitle, { color: '#e74c3c' }]}>Error</Text>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Button mode="contained" onPress={() => setErrorModalVisible(false)} style={styles.modalBtn} buttonColor="#e74c3c">
              Try Again
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  subHeader: { fontSize: 14, color: "#666" },

  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 12,
    letterSpacing: 0.5
  },
  row: { flexDirection: 'row' },

  uploadBox: {
    marginVertical: 10,
    marginBottom: 20,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: "#1E3A8A",
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    backgroundColor: "#eef2ff",
  },
  uploadText: { color: "#1E3A8A", fontWeight: "600", marginTop: 8 },
  previewContainer: { marginTop: 12, paddingLeft: 4 },
  previewWrapper: { position: 'relative', marginRight: 10 },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff'
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  toggleLabel: { fontSize: 16, color: "#333", fontWeight: '500' },

  submitButton: { marginTop: 10, backgroundColor: "#1E3A8A", borderRadius: 12 },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    elevation: 5
  },
  modalTitle: { fontSize: 24, fontWeight: '800', marginVertical: 10, color: '#333' },
  modalText: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 24 },
  modalBtn: { width: '100%', borderRadius: 12 }
});

