import { View, StyleSheet, Alert } from "react-native";
import { login } from "../api/authService";
import { useAuth } from "../../../context/AuthContext"; // Use AuthContext to set user

import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import ValidatedInput from "../components/ValidatedInput";
import { RootStackParamList } from "../../../navigation/types";
import Header from "../components/Header";
import Greeting from "../components/Greeting";

type Props = NativeStackScreenProps<RootStackParamList, "SignInScreen">;

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup.string().trim().required("Password is required"),
});

export default function SignInScreen({ navigation }: Props) {
  const { login: setAuthUser } = useAuth(); // Rename to setAuthUser to avoid conflict with API login function

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      // 1. Call API to get token
      const response = await login(data);

      // User info confirms: "after loging in you get a token"
      // Assuming response is: { token: "..." } or similar.
      const token = response.token || response.accessToken || response.jwt;

      if (!token) {
        throw new Error("No token received");
      }

      // 2. Pass token to context (which fetches user profile)
      await setAuthUser(token);

      Alert.alert("Success", "Logged in successfully!");
      // Previous navigation logic caused an error because RootNavigator handles the switch automatically
      // when 'user' state changes. So we just let the context update triggering the re-render.
      // navigation.replace("Main");

    } catch (error: any) {
      Alert.alert("Login Error", error.message || "Invalid credentials");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardOpeningTime={250}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <Greeting
          title="Sign In"
          description="Welcome back! Please sign in to continue."
        />
        <View style={styles.InnerCon}>
          <ValidatedInput
            control={control}
            name="email"
            label="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
          />
          <ValidatedInput
            control={control}
            name="password"
            label="Password"
            secure
            textContentType="password"
            autoComplete="password"
          />
        </View>

        <Button
          style={styles.btn}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Sign In
        </Button>

        <Button
          style={styles.forgotBtn}
          mode="text"
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          Forgot Password?
        </Button>

        {/* Link to Registration */}
        <Button
          style={styles.linkBtn}
          mode="text"
          onPress={() => navigation.navigate("GenericRegisterScreen")}
        >
          Don’t have an account? Register
        </Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#3F51B5",
    marginTop: 20,
  },
  forgotBtn: {
    marginTop: 0,
    alignSelf: "center",
  },
  linkBtn: {
    marginTop: 10,
    alignSelf: "center",
  },
  InnerCon: {
    padding: 16,
  },
});
