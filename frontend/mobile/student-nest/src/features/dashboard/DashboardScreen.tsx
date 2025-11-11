import { useState } from "react";
import { View, StyleSheet } from "react-native";
import GridItem from "./components/GridItem";
import SettingsPanel from "./panels/SettingsPanel";
import LeasePanel from "./panels/LeasePanel";
import RequestsPanel from "./panels/RequestsPanel";
import PaymentsPanel from "./panels/PaymentsPanel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NotificationPanel from "./panels/NotificationPanel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../auth/components/Header";

type Props = {
  key: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

const features: Props[] = [
  { key: "settings", label: "Settings", icon: "cog" },
  { key: "leases", label: "Leases", icon: "file-document" },
  { key: "requests", label: "Requests", icon: "email" },
  { key: "payments", label: "Payments", icon: "calendar-clock" },
  { key: "notifications", label: "Notifications", icon: "bell" }, 
];

export default function DashboardScreen() {
  const [active, setActive] = useState("settings");

  const renderPanel = () => {
    if (active === "settings") return <SettingsPanel />;
    if (active === "leases") return <LeasePanel />;
    if (active === "requests") return <RequestsPanel />;
    if (active === "payments") return <PaymentsPanel />;
    if (active === "notifications") return <NotificationPanel/>
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <KeyboardAwareScrollView>
      <Header/>
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
