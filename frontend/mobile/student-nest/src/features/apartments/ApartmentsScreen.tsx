import { View, StyleSheet, FlatList, ScrollView, Image } from "react-native";
import { Text, Card, Button, Searchbar, IconButton } from "react-native-paper";
import SearchHeader from "./components/SearchHeader";
import ApartmentCard from "./components/ApartmentCard";
import ShowcaseCard from "./components/ShowcaseCard";
import { apartments, showcase } from "./data/mockApartments";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useRef, useState } from "react";


function ShowcaseCarousel() {
  const flatListRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % showcase.length;
      setIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 5000); // every 3 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <FlatList
      ref={flatListRef}
      data={showcase}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ShowcaseCard item={item} />}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    />
  );
}

export default function ApartmentsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={apartments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ApartmentCard item={item} />}
        ListHeaderComponent={
          <>
            <SearchHeader />
            <Text style={styles.sectionTitle}>Featured Apartments</Text>
            <ShowcaseCarousel/>
            <Text style={styles.sectionTitle}>All Apartments</Text>
          </>
        }
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  showcaseCard: { width: 200, marginRight: 12 },
  showcaseImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  apartmentCard: { marginVertical: 8, padding: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  apartmentImage: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginHorizontal: 10 },
  name: { fontWeight: "bold" },
  address: { color: "#555" },
  price: { fontWeight: "bold", color: "#3F51B5" },
});
