import { View, StyleSheet, FlatList, ScrollView, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import SearchHeader from "../components/SearchHeader";
import ApartmentCard from "../components/ApartmentCard";
import ShowcaseCard from "../components/ShowcaseCard";
import { apartments, showcase } from "../data/mockApartments";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { fontSizes } from "../../../theme/fontSizes";
import { Apartment } from "../types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 220; // match ShowcaseCard width + margin

function ShowcaseCarousel() {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % showcase.length;
      setIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * CARD_WIDTH, animated: true });
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH}
      decelerationRate="fast"
      contentContainerStyle={{ paddingRight: 12 }}
    >
      {showcase.map((item) => (
        <View key={item.apartmentId} style={{ width: CARD_WIDTH }}>
          <ShowcaseCard item={item} />
        </View>
      ))}
    </ScrollView>
  );
}

export default function ApartmentsScreen() {
  const [results, setResults] = useState<Apartment[]>([]);

  const handleSearchResults = (apartments: Apartment[]) => {
    setResults(apartments);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <SearchHeader onResults={handleSearchResults} />
        <Text style={styles.sectionTitle}>Featured Apartments</Text>
        <ShowcaseCarousel />
        <Text style={styles.sectionTitle}>All Apartments</Text>
      </View>

      <FlatList
        data={results.length ? results : apartments}
        keyExtractor={(item) => item.apartmentId}
        renderItem={({ item }) => <ApartmentCard item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: "bold",
    marginVertical: 10,
  },
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
