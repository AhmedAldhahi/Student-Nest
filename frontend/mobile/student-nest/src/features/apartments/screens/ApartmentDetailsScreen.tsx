import { View, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { Apartment } from "../types";
import { useRef, useState, useEffect } from "react";
import { resolveImageSource } from "../../../utils/resolveImageSource";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ApartmentDetailsScreen"
>;

function ImageCarousel({ images }: { images: (string | number)[] }) {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      setIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);

    return () => clearInterval(interval);
  }, [index, images.length]);

  return (
    <FlatList
      ref={flatListRef}
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(img, idx) =>
        typeof img === "string" ? img : `asset-${idx}`
      }
      renderItem={({ item }) => (
        <Image source={resolveImageSource(item)} style={styles.image} />
      )}
    />
  );
}

export default function ApartmentDetailsScreen({ route }: Props) {
  const { apartment } = route.params;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <ImageCarousel images={apartment.images} />

      <Text style={styles.title}>{apartment.title}</Text>
      <Text style={styles.price}>{apartment.price}</Text>
      <Text style={styles.address}>{apartment.address}</Text>
      <Text style={styles.status}>Status: {apartment.propertyStatus}</Text>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{apartment.description}</Text>

      <Text style={styles.sectionTitle}>Details</Text>
      <Text style={styles.meta}>
        {apartment.rooms} rooms • {apartment.beds} beds
      </Text>

      <Button mode="contained" style={styles.bookButton}>
        Book Now
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: 350, height: 200, borderRadius: 8, marginRight: 8 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 16 },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3F51B5",
    marginVertical: 8,
  },
  address: { color: "#555", marginBottom: 4 },
  status: { color: "#999", marginBottom: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  description: { fontSize: 14, color: "#444", lineHeight: 20 },
  meta: { fontSize: 14, color: "#333", marginBottom: 16 },
  bookButton: { backgroundColor: "#3F51B5", marginTop: 20 },
});
