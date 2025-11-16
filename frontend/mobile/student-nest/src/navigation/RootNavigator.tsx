// src/navigation/RootNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "./types";
import SignInScreen from "../features/auth/screens/SignInScreen";
import GenricRegisterScreen from "../features/auth/screens/Register/GenericRegisterScreen";
import StudentRegisterScreen from "../features/auth/screens/Register/StudentRegisterScreen";
import LandlordRegisterScreen from "../features/auth/screens/Register/LandlordRegisterScreen";
import OTPScreen from "../features/auth/screens/Register/OTPScreen";
import BottomTabs from "./BottomTabs";
import TestRoleSwitcher from "../features/auth/screens/TestRoleSwitcher";

// 👇 import your feature screens
import DashboardScreen from "../features/dashboard/DashboardScreen";
import ApartmentDetailsScreen from "../features/apartments/screens/ApartmentDetailsScreen";
import { RequestLeaseForm } from "../features/lease/screens/RequestLeaseForm";
import { RequestLeaseScreen } from "../features/lease/screens/RequestLeaseScreen";
import AddApartmentForm from "../features/apartments/screens/AddApartmentForm";
import EditApartmentScreen from "../features/apartments/screens/EditApartmentScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="TestRoleSwitcher" component={TestRoleSwitcher} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="GenericRegisterScreen" component={GenricRegisterScreen} />
          <Stack.Screen name="StudentRegisterScreen" component={StudentRegisterScreen} />
          <Stack.Screen name="LandlordRegisterScreen" component={LandlordRegisterScreen} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
        </>
      ) : (
        <>
          {/* 👇 Main tabs */}
          <Stack.Screen name="Main" component={BottomTabs} />

          {/* 👇 Feature screens accessible after login */}
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="ApartmentDetailsScreen" component={ApartmentDetailsScreen} options={{ headerShown: true, title: "Apartment Details" }} />
          <Stack.Screen name="RequestLeaseForm" component={RequestLeaseScreen} options={{ headerShown: true, title: "Lease Request" }}  />
          <Stack.Screen name="AddApartmentForm" component={AddApartmentForm} options={{
              headerShown: true,
              title: "Add Apartment",
              headerStyle: {
                backgroundColor: "#1E3A8A", // blue background
              },
              headerTintColor: "#fff",       // white text/icons
              headerTitleStyle: {
                fontWeight: "700",           // bold title
              },
            }} />
          <Stack.Screen name="EditApartmentScreen" component={EditApartmentScreen} options={{ headerShown: true, title: "Edit Apartment"}} />
        </>
      )}
    </Stack.Navigator>
  );
}
