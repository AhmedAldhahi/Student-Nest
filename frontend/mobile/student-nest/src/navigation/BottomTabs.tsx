import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import ApartmentsScreen from "../features/apartments/screens/ApartmentsScreen";
import DashboardScreen from "../features/dashboard/DashboardScreen";
import LeasePanel from "../features/dashboard/panels/LeasePanel";
import MyApartmentsScreen from "../features/apartments/screens/MyApartmentsScreen";
import AuditLogPanel from "../features/dashboard/panels/AuditLogPanel";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { isStudent, isLandlord, isAdmin } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1E3A8A", // deep blue background
          borderTopWidth: 0,
          elevation: 5,
          position: "absolute",
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "#1E3A8A" }} />
        ), // 👈 fills safe area with blue
        tabBarActiveTintColor: "#fff", // white active text/icons
        tabBarInactiveTintColor: "#cbd5e1", // light gray for inactive

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "help-circle";

          if (route.name === "Apartments") iconName = "home";
          else if (route.name === "My Leases") iconName = "document-text";
          else if (route.name === "My Apartments") iconName = "business";
          else if (route.name === "AuditLog") iconName = "list";
          else if (route.name === "Dashboard") iconName = "grid";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Apartments" component={ApartmentsScreen} />

      {isStudent && <Tab.Screen name="My Leases" component={LeasePanel} />}

      {isLandlord && (
        <Tab.Screen name="My Apartments" component={MyApartmentsScreen} />
      )}

      {isAdmin && <Tab.Screen name="AuditLog" component={AuditLogPanel} />}

      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
}
