import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  role: "student" | "landlord";
  setRole: (role: "student" | "landlord") => void;
};

export default function RoleToggle({ role, setRole }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,

          role === "student" && styles.activeButton,
          styles.btn1,
        ]}
        onPress={() => setRole("student")}
      >
        <MaterialCommunityIcons
          name="school"
          size={24}
          color={role === "student" ? "white" : "black"}
        />
        <Text style={[styles.text, role === "student" && styles.activeText]}>
          Student
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          role === "landlord" && styles.activeButton,
          styles.btn2,
        ]}
        onPress={() => setRole("landlord")}
      >
        <MaterialCommunityIcons
          name="key"
          size={24}
          color={role === "landlord" ? "white" : "black"}
        />
        <Text style={[styles.text, role === "landlord" && styles.activeText]}>
          Landlord
        </Text>
      </TouchableOpacity>
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
