// src/features/lease/RequestLeaseScreen.tsx
import React from "react";
import { RequestLeaseForm } from "./RequestLeaseForm";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { RequestLeasePayload } from "../types";


type ScreenProps = NativeStackScreenProps<RootStackParamList, "RequestLeaseForm">;

export const RequestLeaseScreen: React.FC<ScreenProps> = ({ route, navigation }) => {
  const { apartment } = route.params; // ✅ apartment is of type Apartment

  const handleSubmit = async (payload: RequestLeasePayload) => {
    console.log("Submitting lease request", payload);
    navigation.goBack();
  };

  return <RequestLeaseForm apartment={apartment} onSubmit={handleSubmit} />;
};
