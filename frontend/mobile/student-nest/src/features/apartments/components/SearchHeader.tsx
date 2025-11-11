import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar, IconButton, Text, Switch } from "react-native-paper";
import Slider from "@react-native-community/slider"; // Expo supports this
import OptionToggle from "../../../components/OptionToggle"; // reusable toggle
import CustomDropdown from "../../../components/CustomDropdown";

export default function SearchHeader() {
  const [search, setSearch] = useState("");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [location, setLocation] = useState(10);
  const [university, setUniversity] = useState("");
  const [price, setPrice] = useState(500);
  const [isJoined, setIsJoined] = useState(false);

  const universityList = [
    { label: "University of Jordan", value: "uj" },
    { label: "German Jordanian University", value: "gju" },
    { label: "Al-Balqa Applied University", value: "bau" },
  ];

  return (
    <View>
      {/* Search Row */}
      <View style={styles.row}>
        <Searchbar
          placeholder="Search apartments..."
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />
        <IconButton
          icon="filter"
          onPress={() => console.log("Filter applied")}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {/* Age */}
        <View style={styles.filterBlock}>
          <Text>Age: {age}</Text>
          <Slider
            minimumValue={18}
            maximumValue={100}
            step={1}
            value={age}
            onValueChange={setAge}
          />
        </View>

        {/* Gender */}
        <View style={styles.filterBlock}>
          <Text>Gender</Text>
          <OptionToggle
            selected={gender}
            setSelected={setGender}
            options={[
              { label: "Male", value: "male", icon: "account" },
              { label: "Female", value: "female", icon: "account-outline" },
            ]}
          />
        </View>

        {/* Location */}
        <View style={styles.filterBlock}>
          <Text>Location (km): {location}</Text>
          <Slider
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={location}
            onValueChange={setLocation}
          />
        </View>

        {/* University Dropdown */}
        <View style={styles.filterBlock}>
          <CustomDropdown
            label="University"
            options={universityList}
            value={university}
            onSelect={setUniversity}
          />
        </View>

        {/* Price */}
        <View style={styles.filterBlock}>
          <Text>Price: {price}</Text>
          <Slider
            minimumValue={0}
            maximumValue={2000}
            step={50}
            value={price}
            onValueChange={setPrice}
          />
        </View>

        {/* Joined */}
        <View style={styles.filterBlockRow}>
          <Text>Joined</Text>
          <Switch value={isJoined} onValueChange={setIsJoined} />
        </View>
      </View>
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
  picker: { height: 50, marginVertical: 8 },
  uni: { marginBottom: 100 },
});
