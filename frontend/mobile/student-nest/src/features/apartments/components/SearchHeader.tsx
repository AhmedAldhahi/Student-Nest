import React, { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import {
  Searchbar,
  IconButton,
  Text,
  Switch,
  Button,
} from "react-native-paper";
import Slider from "@react-native-community/slider";
import OptionToggle from "../../../components/OptionToggle";
import CustomDropdown from "../../../components/CustomDropdown";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import { Dimensions } from "react-native";
import RangeSlider from "./RangeSlider";

import useDebounce from "../../../hooks/debounce";
import { Apartment } from "../types";

const screenWidth = Dimensions.get("window").width;

type Filters = {
  search: string;
  gender: "male" | "female";
  university: string;
  isJoined: boolean;

  ageMin: number;
  ageMax: number;

  locationMin: number;
  locationMax: number;

  priceMin: number;
  priceMax: number;
};

export default function SearchHeader({
  onResults,
}: {
  onResults: (data: Apartment[]) => void;
}) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    gender: "male",
    university: "",
    isJoined: false,

    ageMin: 18,
    ageMax: 35,

    locationMin: 1,
    locationMax: 20,

    priceMin: 0,
    priceMax: 1000,
  });

  const [show, setShow] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 500); // 500ms delay

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      applyFilters();
    }
  }, [debouncedSearch]);

  const universityList = [
    { label: "University of Jordan", value: "uj" },
    { label: "German Jordanian University", value: "gju" },
    { label: "Al-Balqa Applied University", value: "bau" },
  ];

  // Generic updater for any filter
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Convert all values to strings before sending
  const stringifyFilters = (
    filters: Filters
  ): Record<keyof Filters, string> => {
    return Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, String(value)])
    ) as Record<keyof Filters, string>;
  };

  const applyFilters = async () => {
    Keyboard.dismiss(); // hide keyboard
    const stringFilters = stringifyFilters(filters);

    try {
      const response = await fetch("https://your-api.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stringFilters),
      });
      const data = await response.json();

      // ✅ Pass results back up
      onResults(data.apartments);

      setShow(false);
    } catch (error) {
      console.error("Error sending filters:", error);
    }
  };

  return (
    <View>
      {/* Search Row */}
      <View style={styles.row}>
        <Searchbar
          placeholder="Search apartments..."
          style={styles.search}
          value={filters.search}
          onChangeText={(text) => updateFilter("search", text)}
          onSubmitEditing={applyFilters} // 🔥 triggers search when pressing enter
          onIconPress={applyFilters} // 🔥 triggers search when tapping the magnifying glass
        />
        {/* Filter toggle button */}
        <IconButton icon="filter" onPress={() => setShow(!show)} />
      </View>

      {/* Filters */}
      {show && (
        <View style={styles.filterContainer}>
          {/* Age */}
          <RangeSlider
            label="Age"
            min={18}
            max={100}
            step={1}
            values={[filters.ageMin, filters.ageMax]}
            unit="years"
            onChange={(min, max) => {
              updateFilter("ageMin", min);
              updateFilter("ageMax", max);
            }}
          />

          {/* Location */}
          <RangeSlider
            label="Location (km)"
            min={1}
            max={100}
            step={1}
            values={[filters.locationMin, filters.locationMax]}
            unit="km"
            onChange={(min, max) => {
              updateFilter("locationMin", min);
              updateFilter("locationMax", max);
            }}
          />
          {/* Price */}
          <RangeSlider
            label="Price"
            min={0}
            max={2000}
            step={50}
            values={[filters.priceMin, filters.priceMax]}
            unit="JD"
            onChange={(min, max) => {
              updateFilter("priceMin", min);
              updateFilter("priceMax", max);
            }}
          />

          {/* University Dropdown */}
          <View style={styles.filterBlock}>
            <CustomDropdown
              label="University: "
              options={universityList}
              value={filters.university}
              onSelect={(val) => updateFilter("university", val)}
            />
          </View>

          {/* Joined */}
          <View style={styles.filterBlockRow}>
            <Text>Joined?:</Text>
            <Switch
              value={filters.isJoined}
              onValueChange={(val) => updateFilter("isJoined", val)}
            />
          </View>

          {/* Gender */}
          <View style={styles.filterBlockRow}>
            <Text>Gender:</Text>
            <OptionToggle
              selected={filters.gender}
              setSelected={(val) => updateFilter("gender", val)}
              options={[
                { label: "Male", value: "male", icon: "account" },
                { label: "Female", value: "female", icon: "account-outline" },
              ]}
            />
          </View>

          {/* Search Button at the end */}
          <Button
            style={{ backgroundColor: "#3F51B5" }}
            mode="contained"
            onPress={applyFilters}
          >
            Search
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  search: { flex: 1 },
  filterContainer: { padding: 10, backgroundColor: "#f9f9f9", borderRadius: 8 },
  filterBlock: { marginBottom: 16 },
  filterBlockRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
