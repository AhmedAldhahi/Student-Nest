import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"]; // keep it simple
  isActive?: boolean;
  onPress?: () => void;
};

export default function GridItem({ label, icon, isActive, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.item, isActive && styles.active]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={32} color="#333" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "40%",
    height: 120,
    backgroundColor: "#eee",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  active: {
    backgroundColor: "#c5bcbcff",
    borderColor: "#3F51B5",
    borderWidth: 2,
  },
  label: {
    marginTop: 8,
    fontWeight: "bold",
  },
});
