import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { Apartment } from "../types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import ValidatedInput from "../../auth/components/ValidatedInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";

type Props = {
  route: RouteProp<RootStackParamList, "EditApartmentScreen">;
};

export default function EditApartmentScreen({ route }: Props) {
  const { apartment } = route.params;
  const { control, handleSubmit } = useForm<Apartment>({
    defaultValues: apartment,
  });

  const [document, setDocument] = useState<any>(null);

  // Save apartment edits
  const onSave = async (data: Apartment) => {
    await fetch(`https://your-api.com/apartments/${apartment.apartmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Apartment details updated!");
  };

  // Pick ownership document
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (!result.canceled) {
      const file = result.assets[0];
      setDocument(file);
    }
  };

  // Request verification
  const requestVerification = async () => {
  if (!document) {
    alert("Please upload a document first.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("document", {
      uri: document.uri,
      name: document.name,
      type: document.mimeType || "application/pdf",
    } as any);

    await fetch(`https://your-api.com/apartments/${apartment.apartmentId}/document`, {
      method: "POST",
      body: formData,
    });

    // 👇 Optimistic update
    apartment.apartmentDocumentId = 123; // backend will return actual ID
    apartment.verified = false;

    alert("Verification request submitted! Status is now pending.");
  } catch (err) {
    alert("Failed to submit verification. Please try again.");
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAwareScrollView>
        <Text style={styles.header}>Edit Apartment</Text>

        {/* Editable fields */}
        <ValidatedInput control={control} name="title" label="Title" />
        <ValidatedInput
          control={control}
          name="description"
          label="Description"
          multiline
          numberOfLines={3}
        />
        <ValidatedInput control={control} name="price" label="Price" />
        <ValidatedInput control={control} name="address" label="Address" />
        <ValidatedInput control={control} name="rooms" label="Rooms" />
        <ValidatedInput control={control} name="beds" label="Beds" />

        {/* Save button */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSave)}
          style={styles.saveButton}
        >
          Save Changes
        </Button>

        {/* Verification section only if not verified */}
        {!apartment.verified && (
          <View style={styles.verifySection}>
            <Text style={styles.verifyLabel}>
              Upload ownership document to request verification:
            </Text>

            <Button
              mode="outlined"
              onPress={pickDocument}
              style={styles.uploadButton}
            >
              {document ? "Document Selected" : "Upload Document"}
            </Button>

            <Button
              mode="contained"
              onPress={requestVerification}
              style={styles.verifyButton}
            >
              Request Verification
            </Button>
          </View>
        )}
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  saveButton: { marginTop: 20, backgroundColor: "#1E3A8A" },
  verifySection: {
    marginTop: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff8e1", // light yellow background
  },
  verifyLabel: { fontSize: 14, marginBottom: 10, color: "#333" },
  uploadButton: { marginBottom: 10 },
  verifyButton: { backgroundColor: "#1E3A8A" },
});
