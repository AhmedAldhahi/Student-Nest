import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/AuthContext";
import ApartmentsScreen from "../features/apartments/screens/ApartmentsScreen";
import MyApartmentsScreen from "../features/apartments/screens/MyApartmentsScreen";
import { Ionicons } from "@expo/vector-icons";
import AdminDashboardScreen from "../features/dashboard/screens/AdminDashboardScreen";
import LandlordDashboardScreen from "../features/dashboard/screens/LandlordDashboardScreen";
import StudentDashboardScreen from "../features/dashboard/screens/StudentDashboardScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { user, isStudent, isLandlord, isAdmin } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1E3A8A",
          borderTopWidth: 0,
          elevation: 5,
          position: "absolute",
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#cbd5e1",
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

      {/* {isStudent && <Tab.Screen name="My Leases" component={LeasePanel} />} */}
      {isLandlord && <Tab.Screen name="My Apartments" component={MyApartmentsScreen} />}
      {/* {isAdmin && <Tab.Screen name="AuditLog" component={AuditLogPanel} />} */}

      {/* 👇 Dashboard changes depending on role */}
      {isAdmin && <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />}
      {isLandlord && <Tab.Screen name="Dashboard" component={LandlordDashboardScreen} />}
      {isStudent && <Tab.Screen name="Dashboard" component={StudentDashboardScreen} />}
    </Tab.Navigator>
  );
}
