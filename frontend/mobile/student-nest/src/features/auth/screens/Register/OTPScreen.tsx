import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useRegistration } from "../../../../context/RegistrationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import OTPInput from "../../components/OTPInput";

export default function OTPScreen() {
  const { genericData, studentData, landlordData } = useRegistration();

  console.log("Full registration data:", {
    ...genericData,
    ...(genericData?.role === "student" ? studentData : landlordData),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <Greeting
        title="OTP verification"
        description="Please enter the OTP (One-Time Password) sent to your registered email to complete your verification"
      />
      {/* <TextInput style={styles.textInput} mode="outlined" /> */}
      <OTPInput length={4} onChange={(code) => console.log("OTP:", code)} />
      <View style={styles.container}>
        <Text>Remaining time:</Text>
        <Text>Resend OTP</Text>
      </View>
      <Button style={styles.btn} mode="contained">
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
