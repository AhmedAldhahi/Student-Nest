import { View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { resetPassword } from "../../api/authService";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import ValidatedInput from "../../components/ValidatedInput";

type Props = NativeStackScreenProps<RootStackParamList, "ResetPasswordScreen">;

const schema = yup.object().shape({
    password: yup.string().required("Password is required").min(6, "Password too short"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

export default function ResetPasswordScreen({ navigation, route }: Props) {
    const { email } = route.params;
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    async function onSubmit(data: { password: string }) {
        try {
            await resetPassword({ email, password: data.password });
            Alert.alert("Success", "Password reset successfully!", [
                { text: "Login", onPress: () => navigation.popToTop() } // Go back to Sign In
            ]);
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to reset password");
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <Greeting
                title="Reset Password"
                description="Enter your new password."
            />
            <View style={styles.content}>
                <ValidatedInput
                    control={control}
                    name="password"
                    label="New Password"
                    secure
                />
                <ValidatedInput
                    control={control}
                    name="confirmPassword"
                    label="Confirm Password"
                    secure
                />
                <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.btn}>
                    Reset Password
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: { padding: 16 },
    btn: { marginTop: 20, backgroundColor: "#3F51B5" },
});
