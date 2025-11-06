import { View, StyleSheet } from "react-native";
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
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: any) {
    console.log("Sign In Data:", data);
    // TODO: handle authentication
    navigation.navigate("OTPScreen"); // or home/dashboard after login
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
  linkBtn: {
    marginTop: 10,
    alignSelf: "center",
  },
  InnerCon: {
    padding: 16,
  },
});
