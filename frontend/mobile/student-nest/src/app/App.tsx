import { StyleSheet, Text, View } from "react-native";
import GenricRegisterScreen from "../features/auth/screens/Register/GenericRegisterScreen";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StudentRegisterScreen from "../features/auth/screens/Register/StudentRegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { RootStackParamList } from "../navigation/types";
import LandlordRegisterScreen from "../features/auth/screens/Register/LandlordRegisterScreen";
import { RegistrationProvider } from "../context/RegistrationContext";
import OTPScreen from "../features/auth/screens/Register/OTPScreen";
import SignInScreen from "../features/auth/screens/SignInScreen";
import Dashboard from "../features/dashboard/DashboardScreen";
import DashboardScreen from "../features/dashboard/DashboardScreen";
import ApartmentsScreen from "../features/apartments/screens/ApartmentsScreen";
import ApartmentDetailsScreen from "../features/apartments/screens/ApartmentDetailsScreen";
import { RequestLeaseForm } from "../features/lease/screens/RequestLeaseForm";
import { RequestLeaseScreen } from "../features/lease/screens/RequestLeaseScreen";
import { AuthProvider } from "../context/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <SafeAreaProvider>
          <PaperProvider>
            <AuthProvider>
            <RegistrationProvider>
              <Stack.Navigator>
                {/* <Stack.Screen
                  name="SignInScreen"
                  component={SignInScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="GenericRegisterScreen"
                  component={GenricRegisterScreen}
                  options={{
                    headerShown: false,
                    presentation: "card",
                  }}
                />
                <Stack.Screen
                  name="StudentRegisterScreen"
                  component={StudentRegisterScreen}
                />
                <Stack.Screen
                  name="LandlordRegisterScreen"
                  component={LandlordRegisterScreen}
                />
                <Stack.Screen name="OTPScreen" component={OTPScreen} /> */}
                <Stack.Screen name="DashboardScreen" component={DashboardScreen} options={{ headerShown: false }} />
                {/* <Stack.Screen name="ApartmentScreen" component={ApartmentsScreen} options={{headerShown: false}}/>
                <Stack.Screen name="ApartmentDetailsScreen" component={ApartmentDetailsScreen}/>
                <Stack.Screen name="RequestLeaseForm" component={RequestLeaseScreen} /> */}
              </Stack.Navigator>
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
