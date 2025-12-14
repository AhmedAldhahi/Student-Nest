import { View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { verifyPasswordRecoveryOtp } from "../../api/authService";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import OTPInput from "../../components/OTPInput";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "VerifyRecoveryOtpScreen">;

export default function VerifyRecoveryOtpScreen({ navigation, route }: Props) {
    const { email } = route.params;
    const [otp, setOtp] = useState("");

    async function handleVerify() {
        if (otp.length !== 6) {
            Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
            return;
        }
        try {
            await verifyPasswordRecoveryOtp({ email, otpCode: otp });
            navigation.navigate("ResetPasswordScreen", { email });
        } catch (error: any) {
            Alert.alert("Error", error.message || "Invalid Code");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <Greeting
                title="Verify Code"
                description={`Enter the code sent to ${email}`}
            />
            <View style={styles.content}>
                <OTPInput length={6} onChange={setOtp} />
                <Button mode="contained" onPress={handleVerify} style={styles.btn}>
                    Verify
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: { padding: 16, alignItems: 'center' },
    btn: { marginTop: 20, width: "100%", backgroundColor: "#3F51B5" },
});
