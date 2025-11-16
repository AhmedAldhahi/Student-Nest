import React, { useState } from "react";
import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller, Control } from "react-hook-form";

type ValidatedInputProps = {
  control: Control<any>;
  name: string;
  label: string;
  secure?: boolean; // for password fields
  textContentType?: string;
  autoComplete?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  multiline?: boolean
  numberOfLines?: number
  style?: StyleProp<TextStyle>; // 👈 new optional style
};

export default function ValidatedInput({
  control,
  name,
  label,
  secure = false,
  textContentType,
  autoComplete,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  style
  
}: ValidatedInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextInput
            style={[{ marginHorizontal: 5, marginBottom: 10 }, style]}
            label={label}
            mode="outlined"
            value={value?.toString() ?? ""}
            onChangeText={onChange}
            error={!!error}
            multiline={multiline}
            numberOfLines={numberOfLines}
            secureTextEntry={secure && !showPassword}
            textContentType={textContentType as any}
            autoComplete={autoComplete as any}
            keyboardType={keyboardType}
            right={
              secure ? (
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : undefined
            }
          />
          {error && <Text style={styles.validated}>{error.message}</Text>}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create<{ validated: TextStyle }>({
    validated:{
        marginLeft: 10,
        color: "red"
    }
});

