import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button, Switch } from "react-native-paper";
import { Apartment } from "../types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import ValidatedInput from "../../auth/components/ValidatedInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  route: RouteProp<RootStackParamList, "EditApartmentScreen">;
};

export default function EditApartmentScreen({ route }: Props) {
  const { apartment } = route.params;

  const { control, handleSubmit } = useForm<Apartment>({
    defaultValues: apartment,
  });

  const onSave = async (data: Apartment) => {
    await fetch(`https://your-api.com/apartments/${apartment.apartmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("Apartment updated:", data);
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
          multiline={true}
          numberOfLines={2}
          
        />
        <ValidatedInput control={control} name="price" label="Price" />
        <ValidatedInput control={control} name="address" label="Address" />
        <ValidatedInput control={control} name="rooms" label="Rooms" />
        <ValidatedInput control={control} name="beds" label="Beds" />

        {/* Optional: status dropdown if allowed */}
        {/* <Controller ... /> */}

        <Button
          mode="contained"
          onPress={handleSubmit(onSave)}
          style={styles.saveButton}
        >
          Save Changes
        </Button>
        </KeyboardAwareScrollView>
      </ScrollView>
      
    
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  saveButton: { marginTop: 20, backgroundColor: "#1E3A8A" },
});
