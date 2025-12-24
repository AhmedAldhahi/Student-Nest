// components/RangeSlider.tsx
import React from "react";
import { View, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

type Props = {
  label: string;
  min: number;
  max: number;
  step: number;
  values: [number, number];
  unit: string;
  onChange: (min: number, max: number) => void;
};

export default function RangeSlider({ label, min, max, step, values, unit, onChange }: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text>
        {label}: {values[0]} – {values[1]} {unit}
      </Text>
      <MultiSlider
        values={values}
        min={min}
        max={max}
        step={step}
        sliderLength={screenWidth - 50}
        selectedStyle={{ backgroundColor: "#3F51B5", height: 8 }}
        unselectedStyle={{ backgroundColor: "#ddd", height: 8 }}
        markerStyle={{
          height: 32,
          width: 32,
          borderRadius: 16,
          backgroundColor: "#3F51B5",
          borderWidth: 3,
          borderColor: "#fff",
        }}
        pressedMarkerStyle={{ backgroundColor: "#283593" }}
        onValuesChange={([low, high]) => onChange(low, high)}
      />
    </View>
  );
}
