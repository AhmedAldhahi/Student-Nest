// features/dashboard/components/GridItem.tsx

import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  label: string;
  icon: string;
  isActive?: boolean;
  onPress?: () => void;
};

export default function GridItem({ label, icon, isActive, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.gridItem, isActive && styles.activeItem]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={32} color="#333" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
});
