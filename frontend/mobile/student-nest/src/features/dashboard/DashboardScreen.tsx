import { useState } from "react";
import { View, StyleSheet } from "react-native";
import GridItem from "./components/GridItem";
import SettingsPanel from "./panels/SettingsPanel";
import LeasePanel from "./panels/LeasePanel";
import RequestsPanel from "./panels/RequestsPanel";
import PaymentsPanel from "./panels/PaymentsPanel";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
];

export default function DashboardScreen() {
  const [active, setActive] = useState("settings");

  const renderPanel = () => {
    if (active === "settings") return <SettingsPanel />;
    if (active === "leases") return <LeasePanel />;
    if (active === "requests") return <RequestsPanel />;
    if (active === "payments") return <PaymentsPanel />;
    return null;
  };

  return (
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
