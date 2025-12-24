// OptionToggle.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

type Option<T extends string> = {
  label: string;
  value: T;
  icon?: MaterialIconName;
};

type Props<T extends string> = {
  selected: T;
  setSelected: (val: T) => void;
  options: Option<T>[];
};

export default function OptionToggle<T extends string>({
  selected,
  setSelected,
  options,
}: Props<T>) {
  return (
    <View style={styles.container}>
      {options.map((opt, idx) => (
        <TouchableOpacity
          key={opt.value}
          style={[
            styles.button,
            selected === opt.value && styles.activeButton,
            idx === 0 && styles.btn1,
            idx === options.length - 1 && styles.btn2,
          ]}
          onPress={() => setSelected(opt.value)}
        >
          {opt.icon && (
            <MaterialCommunityIcons
              name={opt.icon}
              size={24}
              color={selected === opt.value ? "white" : "black"}
            />
          )}
          <Text style={[styles.text, selected === opt.value && styles.activeText]}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f0f0f0",
  },
  btn1: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  btn2: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  activeButton: {
    backgroundColor: "#2196F3",
  },
  text: {
    marginLeft: 8,
    color: "black",
  },
  activeText: {
    color: "white",
  },
});
