import { View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { resendPasswordRecoveryOtp } from "../../api/authService";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import ValidatedInput from "../../components/ValidatedInput";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPasswordScreen">;

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPasswordScreen({ navigation }: Props) {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { email: "" },
    });

    async function onSubmit(data: { email: string }) {
        try {
            // Using "resendPasswordRecoveryOtp" as the initiator as per user flow implication
            await resendPasswordRecoveryOtp(data.email);
            navigation.navigate("VerifyRecoveryOtpScreen", { email: data.email });
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to send OTP");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <Greeting
                title="Forgot Password"
                description="Enter your email to receive a recovery code."
            />
            <View style={styles.content}>
                <ValidatedInput
                    control={control}
                    name="email"
                    label="Email"
                    keyboardType="email-address"
                />
                <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.btn}>
                    Send Code
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: { padding: 16 },
    btn: { marginTop: 20, backgroundColor: "#3F51B5" },
});
