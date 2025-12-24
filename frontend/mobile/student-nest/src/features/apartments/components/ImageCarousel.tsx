import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Image } from "react-native";
import { resolveImageSource } from "../../../utils/resolveImageSource";

export function ImageCarousel({ images }: { images: (string | number)[] }) {
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

const styles = StyleSheet.create({
  image: { width: 350, height: 200, borderRadius: 8, marginRight: 8 },
});
