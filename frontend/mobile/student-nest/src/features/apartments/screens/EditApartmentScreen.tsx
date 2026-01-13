import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert, Modal } from "react-native";
import { useForm } from "react-hook-form";
import { Button, ActivityIndicator } from "react-native-paper";
import { Apartment } from "../types";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import ValidatedInput from "../../auth/components/ValidatedInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "../../../context/AuthContext";
import { uploadApartmentDocument, updateApartment, updateApartmentDocument } from "../../dashboard/api/landlordService";
import { Ionicons } from "@expo/vector-icons";
import ImageUpload from "../../../components/ImageUpload";

type Props = {
  route: RouteProp<RootStackParamList, "EditApartmentScreen">;
};

export default function EditApartmentScreen({ route }: Props) {
  const { apartment } = route.params;
  const { token, user } = useAuth();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm<Apartment>({
    defaultValues: apartment,
  });

  const [documentImages, setDocumentImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Save apartment edits
  const onSave = async (data: Apartment) => {
    if (!token) return;
    try {
      setIsSaving(true);
      // Ensure numbers are strings if API expects strings, or numbers if numbers
      // The form (ValidatedInput) might return strings. The Apartment type has strings for numberOfRoom/Bed/Price
      // Just passing data should work if the form state matches type.

      await updateApartment(token, apartment.apartmentId, data);
      Alert.alert("Success", "Apartment details updated!", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update apartment");
    } finally {
      setIsSaving(false);
    }
  };

  // Request verification
  const requestVerification = async () => {
    if (documentImages.length === 0) {
      Alert.alert("Required", "Please upload a document (photo) first.");
      return;
    }
    if (!user || !token) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    try {
      setIsUploading(true);

      const photoUri = documentImages[0];
      const filename = photoUri.split('/').pop() || `document_${Date.now()}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      const fileObj = {
        uri: photoUri,
        name: filename,
        mimeType: type // service expects mimeType or type, let's pass both to be safe or rely on service update
      };

      if (apartment.apartmentDocuments) {
        // UPDATE existing document
        await updateApartmentDocument(
          token,
          apartment.apartmentId,
          apartment.apartmentDocuments.apartmentDocumentId,
          fileObj
        );
        Alert.alert("Success", "Verification document updated!");
        // Optionally go back
        navigation.goBack();
      } else {
        // UPLOAD new document
        await uploadApartmentDocument(token, apartment.apartmentId, fileObj);
        Alert.alert(
          "Success",
          "Verification document uploaded successfully!",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      }

    } catch (err: any) {
      console.error("Upload error:", err);
      Alert.alert("Error", err.message || "Failed to submit verification. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.header}>Edit Apartment</Text>
        <Text style={styles.subHeader}>ID: {apartment.apartmentId}</Text>

        {/* Editable fields */}
        <ValidatedInput control={control} name="title" label="Title" />
        <ValidatedInput
          control={control}
          name="description"
          label="Description"
          multiline
          numberOfLines={3}
        />
        <ValidatedInput control={control} name="price" label="Price" keyboardType="numeric" />
        <ValidatedInput control={control} name="address" label="Address" />
        <ValidatedInput control={control} name="numberOfRoom" label="Rooms" keyboardType="numeric" />
        <ValidatedInput control={control} name="numberOfBed" label="Beds" keyboardType="numeric" />

        {/* Save button */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSave)}
          style={styles.saveButton}
          loading={isSaving}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>

        {/* Verification section */}
        <View style={styles.verifySection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#1E3A8A" style={{ marginRight: 8 }} />
            <Text style={styles.sectionTitle}>Verification Status</Text>
          </View>

          {apartment.isVerified ? (
            <View style={styles.statusBadgeVerified}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Verified</Text>
            </View>
          ) : (
            <>
              <Text style={styles.verifyLabel}>
                Status: <Text style={{ fontWeight: 'bold', color: apartment.apartmentDocuments ? '#f39c12' : '#e74c3c' }}>
                  {apartment.apartmentDocuments ? "Pending Review" : "Not Verified"}
                </Text>
              </Text>

              <Text style={styles.verifyInstructions}>
                {apartment.apartmentDocuments
                  ? "You can upload a new photo to update your verification request."
                  : "Upload proof of ownership (Title deed, etc) to get verified."}
              </Text>

              <ImageUpload
                images={documentImages}
                onImagesChange={setDocumentImages}
                maxImages={1}
                title="Document Photo"
                description="Tap to upload (1 photo)"
              />

              <Button
                mode="contained"
                onPress={requestVerification}
                style={styles.verifyButton}
                loading={isUploading}
                disabled={isUploading || documentImages.length === 0}
              >
                {isUploading ? "Uploading..." : (apartment.apartmentDocuments ? "Update Document" : "Upload & Request Verification")}
              </Button>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1 },
  header: { fontSize: 24, fontWeight: "700", marginBottom: 4, color: '#1E3A8A' },
  subHeader: { fontSize: 12, color: '#666', marginBottom: 20 },
  saveButton: { marginTop: 20, backgroundColor: "#1E3A8A", marginBottom: 30 },

  verifySection: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  verifyLabel: { fontSize: 16, marginBottom: 5, color: "#333" },
  verifyInstructions: { fontSize: 14, color: '#666', marginBottom: 15 },
  uploadButton: { marginBottom: 15, borderColor: '#1E3A8A' },
  verifyButton: { backgroundColor: "#2ecc71" },

  statusBadgeVerified: {
    backgroundColor: '#2ecc71',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start'
  }
});
