import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import RoleToggle from "../../components/RoleToggle";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import React, { useState } from "react";
import { useRegistration } from "../../../../context/RegistrationContext";
import { Controller, useForm } from "react-hook-form";
import { genericRegisterSchema } from "../../../../validation/genericRegisterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import ValidatedInput from "../../components/ValidatedInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "GenericRegisterScreen"
>;

export default function GenericRegisterScreen({ navigation }: Props) {
  const { setGenericData } = useRegistration();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "landlord">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(genericRegisterSchema),
  });

  function onSubmit(data: any) {
    setGenericData({
      ...data,
      role,
    });
    navigation.navigate(
      role === "student" ? "StudentRegisterScreen" : "LandlordRegisterScreen"
    );
  }

  // function pressHandler() {
  //   setGenericData({
  //     fullName,
  //     email,
  //     showDatePicker,
  //     phoneNumber,
  //     password,
  //     role,
  //   });
  //   if (password != confirmPassword) {
  //     alert("password do not match!");
  //   } else {
  //     navigation.navigate(
  //       role === "student" ? "StudentRegisterScreen" : "LandlordRegisterScreen"
  //     );
  //   }
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20} // adds padding above keyboard
        keyboardOpeningTime={250} // smooth animation
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <Greeting
          title="Create Account"
          description="Join our Community to find your perfect accommodation"
        />
        <RoleToggle role={role} setRole={setRole} />

        {/* Inputs */}
        <ValidatedInput
          control={control}
          name="fullName"
          label="Full Name"
          textContentType="name"
          autoComplete="name"
        />

        <ValidatedInput
          control={control}
          name="email"
          label="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
        />

        {/* Birth Date Picker */}
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ marginHorizontal: 5, marginBottom: 10 }}
              >
                <TextInput
                  label="Birth Date"
                  mode="outlined"
                  value={value ? new Date(value).toLocaleDateString() : ""}
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      onChange(selectedDate.toISOString());
                    }
                  }}
                />
              )}
            </>
          )}
        />
        {errors.birthDate && <Text style={style.inputError}>{errors.birthDate.message}</Text>}

        <ValidatedInput
          control={control}
          name="phoneNumber"
          label="Phone Number"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoComplete="tel"
        />

        <ValidatedInput
          control={control}
          name="password"
          label="Password"
          secure
          textContentType="newPassword"
          autoComplete="new-password"
        />

        <ValidatedInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          secure
          textContentType="newPassword"
          autoComplete="new-password"
        />

        <Button
          style={style.btn}
          mode="outlined"
          onPress={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  btn: {
    width: "50%",
    alignSelf: "center",
  },
  date:{
    marginLeft: 10
  },
  inputError:{
    color: "red",
    marginLeft: 10
  }
});
