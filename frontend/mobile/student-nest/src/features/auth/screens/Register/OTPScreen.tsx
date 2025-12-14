import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useRegistration } from "../../../../context/RegistrationContext";
import { verifyOtp, resendOtp } from "../../api/authService";
import { useNavigation } from "@react-navigation/native";
import { Alert, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import OTPInput from "../../components/OTPInput";

export default function OTPScreen() {
  const { genericData } = useRegistration();
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    if (!genericData?.email) {
      Alert.alert("Error", "No email found for verification.");
      return;
    }
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      await verifyOtp({ email: genericData.email, otpCode: otp });
      Alert.alert("Success", "Account verified successfully!", [
        { text: "OK", onPress: () => navigation.navigate("SignInScreen") }
      ]);
    } catch (error: any) {
      Alert.alert("Verification Failed", error.message || "Invalid OTP code.");
    }
  };

  const handleResend = async () => {
    if (!genericData?.email) return;

    try {
      await resendOtp(genericData.email);
      Alert.alert("Sent", `OTP resent to ${genericData.email}`);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to resend OTP.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <Greeting
        title="OTP verification"
        description="Please enter the OTP (One-Time Password) sent to your registered email to complete your verification"
      />
      {/* <TextInput style={styles.textInput} mode="outlined" /> */}
      <OTPInput length={6} onChange={(code) => setOtp(code)} />
      <View style={styles.container}>
        <Text>Remaining time:</Text>
        <Pressable onPress={handleResend}>
          <Text style={{ color: "#3F51B5", fontWeight: "bold" }}>Resend OTP</Text>
        </Pressable>
      </View>
      <Button style={styles.btn} mode="contained" onPress={handleVerify}>
        Verify
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
  },
  btn: {
    marginTop: 20,
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#3F51B5",
  },
});
