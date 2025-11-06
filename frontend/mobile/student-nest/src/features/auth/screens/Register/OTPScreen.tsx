import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useRegistration } from "../../../../context/RegistrationContext";

export default function OTPScreen() {
   const {genericData, studentData, landlordData } = useRegistration();

  console.log("Full registration data:", {
    ...genericData,
    ...(genericData?.role === "student" ? studentData : landlordData),
  });

  return (
    <View>
      <Text>OTP Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
