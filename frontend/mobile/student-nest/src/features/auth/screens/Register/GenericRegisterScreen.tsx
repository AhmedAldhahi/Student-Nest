import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import RoleToggle from "../../components/RoleToggle";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { useState } from "react";
import { useRegistration } from "../../../../context/RegistrationContext";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "GenericRegisterScreen"
>;

export default function GenericRegisterScreen({ navigation }: Props) {
  const { setGenericData } = useRegistration();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "landlord">("student");

  function pressHandler() {
    setGenericData({
      fullName,
      email,
      birthDate,
      phoneNumber,
      password,
      role,
    });
    if (password != confirmPassword) {
      alert("password do not match!");
    } else {
      navigation.navigate(
        role === "student" ? "StudentRegisterScreen" : "LandlordRegisterScreen"
      );
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Header></Header>
        <Greeting
          title="Create Account"
          description="Join our Community to find your prefect accomodation"
        />
        <RoleToggle role={role} setRole={setRole} />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Birth Date"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button style={style.btn} mode="outlined" onPress={pressHandler}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  input: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  btn: {
    width: "50%",
    alignSelf: "center",
  },
});
