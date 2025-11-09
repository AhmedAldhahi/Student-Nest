import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Header from "../auth/components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GridItem from "./GridItem";

const features = [
  { key: "settings", label: "Settings", icon: "cog" },
  { key: "leases", label: "Leases", icon: "file-document" },
  { key: "requests", label: "Lease Requests", icon: "email" },
  { key: "payments", label: "Payment Scheduling", icon: "calendar-clock" },
];

export default function DashboardScreen() {
 

  

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {features.map((item) => (
  <GridItem
    key={item.key}
    label={item.label}
    icon={item.icon}
    isActive={activeFeature === item.key}
    onPress={() => setActiveFeature(item.key)}
  />
))}

        </View>
        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 8,
    flex: 1,
  },
  innerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  gridItem: {
    width: "40%",
    height: 120,
    backgroundColor: "#e0e0e0",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeItem: {
    backgroundColor: "#c5bcbcff",
    borderColor: "#3F51B5",
    borderWidth: 2,
  },
  iconsTexts: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
