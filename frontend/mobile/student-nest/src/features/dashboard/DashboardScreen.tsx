import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../auth/components/Header";
import GridItem from "./components/GridItem";
import SettingsPanel from "./panels/SettingsPanel";
import LeasePanel from "./panels/LeasePanel";
import RequestsPanel from "./panels/RequestsPanel";
import PaymentsPanel from "./panels/PaymentsPanel";
import NotificationPanel from "./panels/NotificationPanel";
import { roleFeatures } from "./dashboardFeatures";
import LandlordsPanel from "./panels/LandlordsPanel";
import StudentsPanel from "./panels/StudentsPanel";
import ReceiptsPanel from "./panels/ReceiptsPanel";
import { useAuth } from "../../context/AuthContext";
import AuditLogPanel from "./panels/AuditLogPanel";
import ApartmentListingsPanel from "./panels/ApartmentListingsPanel";
import ProfilePanel from "./panels/ProfilePanel";

export default function DashboardScreen() {
  const { user } = useAuth();

  const userRole = "admin"; //dynamic later
  const features = roleFeatures[userRole];
  const currentUserNameOrId = user?.id ?? "";

  const [active, setActive] = useState(features[0].key);

  const renderPanel = () => {
    switch (active) {
      case "settings":
        return <SettingsPanel />;
      case "leases":
        return <LeasePanel />;
      case "requests":
        return <RequestsPanel />;
      case "payments":
        return <PaymentsPanel />;
      case "notifications":
        return <NotificationPanel />;
      case "landlords":
        return <LandlordsPanel />;
      case "students":
        return <StudentsPanel />;
      case "receipts":
        return <ReceiptsPanel role={userRole} userId={currentUserNameOrId} />;
      case "auditlog":
        return <AuditLogPanel />;
      case "apartments":
        return <ApartmentListingsPanel />;
      case "profile":
        return user ? (
          <ProfilePanel role={userRole} userId={user.id} />
        ) : (
          <Text>No profile data available</Text>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView>
        <Header />
        <View style={{ flex: 1, padding: 20 }}>
          <View style={styles.grid}>
            {features.map((item) => (
              <GridItem
                key={item.key}
                label={item.label}
                icon={item.icon}
                isActive={active === item.key}
                onPress={() => setActive(item.key)}
              />
            ))}
          </View>
          <View style={styles.panel}>{renderPanel()}</View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  panel: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
  },
});
