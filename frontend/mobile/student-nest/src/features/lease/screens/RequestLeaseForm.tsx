// src/features/lease/RequestLeaseForm.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidatedInput from "../../auth/components/ValidatedInput";
import { Switch } from "react-native-paper";

import { Apartment } from "../../apartments/types";
import { RequestLeasePayload } from "../types";
import { requestLeaseSchema } from "../../../validation/requestLeaseSchema";
import { DateInput } from "../components/DateInput";
import { useAuth } from "../../../context/AuthContext"; // ✅ get student info
import { stringifyPayload } from "../../../utils/stringifyPayload";

interface Props {
  apartment: Apartment;
  onSubmit: (payload: RequestLeasePayload) => Promise<void> | void;
}

interface RequestLeaseFormValues {
  studentName: string;
  landlordName: string;
  message: string;
  startDate: string;
  rentTerm: number;
  rentAmount: number;
  
}

export const RequestLeaseForm: React.FC<Props> = ({ apartment, onSubmit }) => {
  const { user } = useAuth(); // student info from context

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestLeaseFormValues>({
    resolver: yupResolver(requestLeaseSchema),
    defaultValues: {
      studentName: user?.name ?? "",
      landlordName: "", // will be filled via join/API
      message: "",
      startDate: "",
      rentTerm: Number(""),
      rentAmount: Number(apartment.price),
    },
  });

  const submit: SubmitHandler<RequestLeaseFormValues> = async (data) => {
  const payload: RequestLeasePayload = {
    apartmentId: apartment.apartmentId,
    studentName: data.studentName,
    landlordName: data.landlordName,
    message: data.message,
    startDate: data.startDate,
    rentTerm: data.rentTerm,
    rentAmount: data.rentAmount,
  };

  // ✅ stringify before sending
  const stringifiedPayload = stringifyPayload(payload);

  // Example API call
  await fetch("https://your-api.com/leases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stringifiedPayload),
  });
  
  onSubmit(payload);
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Request Lease</Text>
        <Text style={styles.sub}>
          {apartment.title} • {apartment.address}
        </Text>
        <Text style={styles.sub}>{apartment.price} / month</Text>
      </View>

      {/* Read-only Student Name */}
      <View style={styles.readOnlyRow}>
        <Text style={styles.label}>Student</Text>
        <Text style={styles.value}>{user?.name}</Text>
      </View>

      {/* Read-only Landlord Name */}
      <View style={styles.readOnlyRow}>
        <Text style={styles.label}>Landlord</Text>
        <Text style={styles.value}>LANDLORD NAME -tobe added later-</Text>
      </View>

      {/* Message */}
      <ValidatedInput control={control} name="message" label="Message to landlord" />

      {/* Rent Term */}
      <ValidatedInput control={control} name="rentTerm" label="Rent term (e.g. 6 months)" />

      {/* Rent Amount */}
      <ValidatedInput
        control={control}
        name="rentAmount"
        label="Rent amount"
        keyboardType="phone-pad"
      />

      {/* Start Date */}
      <Controller
        control={control}
        name="startDate"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View style={{ marginBottom: 16 }}>
            <DateInput value={value} onChange={onChange} label="Start date" />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />



      {/* Submit */}
      <Pressable style={styles.submit} onPress={handleSubmit(submit)}>
        <Text style={styles.submitText}>Send Request</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f9f9f9" },
  header: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#222", marginBottom: 4 },
  sub: { fontSize: 14, color: "#666", marginTop: 2 },
  readOnlyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginBottom: 12,
  },
  label: { fontSize: 14, color: "#555", fontWeight: "600" },
  value: { fontSize: 14, color: "#222" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  switchLabel: { fontSize: 14, color: "#333", flexShrink: 1, marginRight: 8 },
  error: { fontSize: 12, color: "#d9534f", marginTop: 4, marginLeft: 4 },
  submit: {
    marginTop: 20,
    backgroundColor: "#3F51B5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitText: { color: "#fff", fontWeight: "600", fontSize: 16, letterSpacing: 0.5 },
});
