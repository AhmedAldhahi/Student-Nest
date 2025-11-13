import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RegistrationProvider } from "../context/RegistrationContext";
import { AuthProvider } from "../context/AuthContext";
import RootNavigator from "../navigation/RootNavigator";

export default function App() {
 

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <SafeAreaProvider>
          <PaperProvider>
            <AuthProvider>
              <RegistrationProvider>
                <RootNavigator />
              </RegistrationProvider>
            </AuthProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
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
