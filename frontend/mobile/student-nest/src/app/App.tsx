import { StyleSheet, Text, View } from "react-native";
import GenricRegisterScreen from "../features/auth/screens/Register/GenericRegisterScreen";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StudentRegisterScreen from "../features/auth/screens/Register/StudentRegisterScreen";

export default function App() {
  return (
    <SafeAreaProvider>
    <PaperProvider>
      {/* <GenricRegisterScreen></GenricRegisterScreen> */}
      <StudentRegisterScreen></StudentRegisterScreen>
    </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
