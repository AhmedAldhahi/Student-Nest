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
import ForgotPasswordScreen from "../features/auth/screens/PasswordRecovery/ForgotPasswordScreen";
import VerifyRecoveryOtpScreen from "../features/auth/screens/PasswordRecovery/VerifyRecoveryOtpScreen";
import ResetPasswordScreen from "../features/auth/screens/PasswordRecovery/ResetPasswordScreen";

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
import StudentDetailScreen from "../features/dashboard/screens/admin/StudentDetailScreen";
import AdminApartmentDetailScreen from "../features/dashboard/screens/admin/AdminApartmentDetailScreen";

// 🏘 Apartment & Lease features
import ApartmentDetailsScreen from "../features/apartments/screens/ApartmentDetailsScreen";
import { RequestLeaseScreen } from "../features/lease/screens/RequestLeaseScreen";
import AddApartmentForm from "../features/apartments/screens/AddApartmentForm";
import EditApartmentScreen from "../features/apartments/screens/EditApartmentScreen";
import StudentLeaseScreen from "../features/dashboard/screens/student/StudentLeaseScreen";
import StudentRequestsScreen from "../features/dashboard/screens/student/StudentRequestsScreen";
import LandlordLeaseScreen from "../features/dashboard/screens/landlord/LandlordLeaseScreen";
import ApartmentLeasesScreen from "../features/apartments/screens/ApartmentLeasesScreen";
import ApartmentRequestsScreen from "../features/apartments/screens/ApartmentRequestsScreen";
import LeasePaymentsScreen from "../features/apartments/screens/LeasePaymentsScreen";
import MyApartmentsScreen from "../features/apartments/screens/MyApartmentsScreen";
import VerificationScreen from "../features/dashboard/screens/universal/VerificationScreen";
import NotificationScreen from "../features/dashboard/screens/universal/NotificationScreen";
import { TopToast } from "../components/TopToast";
import { useEffect, useState } from "react";



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user } = useAuth();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (user) {
      setToastMessage(`Welcome, ${user.name}!`);
      setToastVisible(true);
    }
  }, [user]);

  return (
    <>
      <TopToast
        visible={toastVisible}
        message={toastMessage}
        onHide={() => setToastVisible(false)}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // 🔐 Auth flow
          <>
            {/* <Stack.Screen name="TestRoleSwitcher" component={TestRoleSwitcher} /> */}
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="GenericRegisterScreen" component={GenricRegisterScreen} />
            <Stack.Screen name="StudentRegisterScreen" component={StudentRegisterScreen} />
            <Stack.Screen name="LandlordRegisterScreen" component={LandlordRegisterScreen} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="VerifyRecoveryOtpScreen" component={VerifyRecoveryOtpScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          </>
        ) : (
          // 🏠 Main app flow
          <>
            {/* Tabs */}
            <Stack.Screen name="Main" component={BottomTabs} />

            {/* Universal */}
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: true, title: "Settings" }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: true, title: "Profile" }} />
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown: true, title: "Documents" }} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: true, title: "Notification center" }} />

            {/* Admin */}
            <Stack.Screen name="AuditLogScreen" component={AuditLogScreen} options={{ headerShown: true, title: "Audit Log" }} />
            <Stack.Screen name="StudentsScreen" component={StudentsScreen} options={{ headerShown: true, title: "All Students" }} />
            <Stack.Screen name="StudentDetailScreen" component={StudentDetailScreen} options={{ headerShown: true, title: "Student Details" }} />
            <Stack.Screen name="LandlordsScreen" component={LandlordsScreen} options={{ headerShown: true, title: "All Landlords" }} />
            <Stack.Screen name="LandlordDetailScreen" component={LandlordDetailScreen} options={{ headerShown: true, title: "Landlord Details" }} />
            <Stack.Screen name="AdminRequestsScreen" component={AdminRequestsScreen} options={{ headerShown: true, title: "Requests" }} />
            <Stack.Screen name="AdminApartmentsScreen" component={AdminApartmentsScreen} options={{ headerShown: true, title: "Apartments" }} />
            <Stack.Screen name="AdminLeaseScreen" component={AdminLeaseScreen} options={{ headerShown: true, title: "Leases" }} />
            <Stack.Screen
              name="AdminApartmentDetail"
              component={AdminApartmentDetailScreen}
              options={{
                headerShown: true,
                title: "Apartment Details"
              }}
            />


            <Stack.Screen name="StudentLeaseScreen" component={StudentLeaseScreen} options={{ headerShown: true, title: "Leases" }} />
            <Stack.Screen name="StudentRequestsScreen" component={StudentRequestsScreen} options={{ headerShown: true, title: "Lease Requests" }} />


            {/* Landlord */}
            <Stack.Screen name="LandlordRequestsScreen" component={LandlordRequestsScreen} options={{ headerShown: true, title: "Requests" }} />
            <Stack.Screen name="LandlordLeaseScreen" component={LandlordLeaseScreen} options={{ headerShown: true, title: "Lease Requests" }} />


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
            <Stack.Screen name="MyApartmentsScreen" component={MyApartmentsScreen} options={{ headerShown: true, title: "My Apartments" }} />

            <Stack.Screen name="EditApartmentScreen" component={EditApartmentScreen} options={{ headerShown: true, title: "Edit Apartment" }} />
            <Stack.Screen name="ApartmentLeasesScreen" component={ApartmentLeasesScreen} options={{ headerShown: true, title: "Apartment Leases" }} />
            <Stack.Screen name="ApartmentRequestsScreen" component={ApartmentRequestsScreen} options={{ headerShown: true, title: "Lease Requests" }} />
            <Stack.Screen name="LeasePaymentsScreen" component={LeasePaymentsScreen} options={{ headerShown: true, title: "Lease Payments" }} />
          </>
        )}

      </Stack.Navigator>
    </>
  );
}
