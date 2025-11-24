// src/navigation/RootNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "./types";

// 🔐 Auth screens
import SignInScreen from "../features/auth/screens/SignInScreen";
import GenricRegisterScreen from "../features/auth/screens/Register/GenericRegisterScreen";
import StudentRegisterScreen from "../features/auth/screens/Register/StudentRegisterScreen";
import LandlordRegisterScreen from "../features/auth/screens/Register/LandlordRegisterScreen";
import OTPScreen from "../features/auth/screens/Register/OTPScreen";
import TestRoleSwitcher from "../features/auth/screens/TestRoleSwitcher";

// 🏠 Main tabs
import BottomTabs from "./BottomTabs";

// 🏢 Universal dashboard screens
import SettingsScreen from "../features/dashboard/screens/universal/SettingsScreen";
import ProfileScreen from "../features/dashboard/screens/universal/ProfileScreen";


// 👨‍🎓 Student / 👨‍💼 Landlord / 👩‍💼 Admin role-specific
import LandlordRequestsScreen from "../features/dashboard/screens/landlord/LandlordRequestsScreen";
import AdminRequestsScreen from "../features/dashboard/screens/admin/AdminRequestsScreen";
import AdminApartmentsScreen from "../features/dashboard/screens/admin/AdminApartmentsScreen";
import AdminLeaseScreen from "../features/dashboard/screens/admin/AdminLeaseScreen";
import AuditLogScreen from "../features/dashboard/screens/admin/AuditLogScreen";
import StudentsScreen from "../features/dashboard/screens/admin/StudentsScreen";
import LandlordsScreen from "../features/dashboard/screens/admin/LandlordsScreen";
import LandlordDetailScreen from "../features/dashboard/screens/admin/LandlordDetailScreen";

// 🏘 Apartment & Lease features
import ApartmentDetailsScreen from "../features/apartments/screens/ApartmentDetailsScreen";
import { RequestLeaseScreen } from "../features/lease/screens/RequestLeaseScreen";
import AddApartmentForm from "../features/apartments/screens/AddApartmentForm";
import EditApartmentScreen from "../features/apartments/screens/EditApartmentScreen";
import StudentLeaseScreen from "../features/dashboard/screens/student/StudentLeaseScreen";
import StudentRequestsScreen from "../features/dashboard/screens/student/StudentRequestsScreen";
import LandlordLeaseScreen from "../features/dashboard/screens/landlord/LandlordLeaseScreen";
import VerificationScreen from "../features/dashboard/screens/universal/VerificationScreen";
import NotificationScreen from "../features/dashboard/screens/universal/NotificationScreen";



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        // 🔐 Auth flow
        <>
          <Stack.Screen name="TestRoleSwitcher" component={TestRoleSwitcher} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="GenericRegisterScreen" component={GenricRegisterScreen} />
          <Stack.Screen name="StudentRegisterScreen" component={StudentRegisterScreen} />
          <Stack.Screen name="LandlordRegisterScreen" component={LandlordRegisterScreen} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />
        </>
      ) : (
        // 🏠 Main app flow
        <>
          {/* Tabs */}
          <Stack.Screen name="Main" component={BottomTabs} />

          {/* Universal */}
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: true, title: "Settings" }}/>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: true, title: "Profile" }}/>
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown: true, title: "Documents" }}/>
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: true, title: "Notification center" }}/>

          {/* Admin */}
          <Stack.Screen name="AuditLogScreen" component={AuditLogScreen} options={{ headerShown: true, title: "Audit Log" }}/>
          <Stack.Screen name="StudentsScreen" component={StudentsScreen} options={{ headerShown: true, title: "All Students" }}/>
          <Stack.Screen name="LandlordsScreen" component={LandlordsScreen} options={{ headerShown: true, title: "All Landlords" }}/>
          <Stack.Screen name="LandlordDetailScreen" component={LandlordDetailScreen} options={{ headerShown: true, title: "Landlord Details" }}/>
          <Stack.Screen name="AdminRequestsScreen" component={AdminRequestsScreen} options={{ headerShown: true, title: "Requests" }}/>
          <Stack.Screen name="AdminApartmentsScreen" component={AdminApartmentsScreen} options={{ headerShown: true, title: "Apartments" }}/>
          <Stack.Screen name="AdminLeaseScreen" component={AdminLeaseScreen} options={{ headerShown: true, title: "Leases" }}/>


          <Stack.Screen name="StudentLeaseScreen" component={StudentLeaseScreen} options={{ headerShown: true, title: "Leases" }}/>
          <Stack.Screen name="StudentRequestsScreen" component={StudentRequestsScreen} options={{ headerShown: true, title: "Lease Requests" }}/>

           
          {/* Landlord */}
          <Stack.Screen name="LandlordRequestsScreen" component={LandlordRequestsScreen} options={{ headerShown: true, title: "Requests" }}/>
          <Stack.Screen name="LandlordLeaseScreen" component={LandlordLeaseScreen} options={{ headerShown: true, title: "Lease Requests" }}/>
          

          {/* Apartments & Leases */}
          <Stack.Screen name="ApartmentDetailsScreen" component={ApartmentDetailsScreen} options={{ headerShown: true, title: "Apartment Details" }} />
          <Stack.Screen name="RequestLeaseForm" component={RequestLeaseScreen} options={{ headerShown: true, title: "Lease Request" }} />
          <Stack.Screen
            name="AddApartmentForm"
            component={AddApartmentForm}
            options={{
              headerShown: true,
              title: "Add Apartment",
              headerStyle: { backgroundColor: "#1E3A8A" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "700" },
            }}
          />
          <Stack.Screen name="EditApartmentScreen" component={EditApartmentScreen} options={{ headerShown: true, title: "Edit Apartment" }} />
        </>
      )}
    </Stack.Navigator>
  );
}
