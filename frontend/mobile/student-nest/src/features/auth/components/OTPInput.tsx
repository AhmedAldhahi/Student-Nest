import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

type OTPInputProps = {
  length?: number; // optional, defaults to 4
  onChange?: (code: string) => void; // callback when OTP changes
};

export default function OTPInput({ length = 4, onChange }: OTPInputProps) {
  const [value, setValue] = useState("");

  const handleChange = (text: string) => {
    // Only allow numbers and max length
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, length);
    setValue(cleaned);
    onChange?.(cleaned);
  };

  return (
    <View style={styles.container}>
      {/* Hidden input */}
      <TextInput
        style={styles.hiddenInput}
        keyboardType="number-pad"
        value={value}
        onChangeText={handleChange}
        autoFocus
      />
      {/* Render boxes */}
      {Array.from({ length }).map((_, i) => (
        <View key={i} style={styles.box}>
          <Text style={styles.text}>{value[i] || ""}</Text>
        </View>
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
  hiddenInput: {
    position: "absolute",
    opacity: 0,
  },
  box: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
