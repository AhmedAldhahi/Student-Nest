import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
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
};

export default function ValidatedInput({
  control,
  name,
  label,
  secure = false,
  textContentType,
  autoComplete,
  keyboardType = "default",
}: ValidatedInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextInput
            style={{ marginHorizontal: 5, marginBottom: 10 }}
            label={label}
            mode="outlined"
            value={value}
            onChangeText={onChange}
            error={!!error}
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
          {error && <Text style={style.validated}>{error.message}</Text>}
        </>
      )}
    />
  );
}

const style = StyleSheet.create({
    validated:{
        marginLeft: 10,
        color: "red"
    }
});

