import { Card, Text } from "react-native-paper";
import { View, Image, StyleSheet } from "react-native";
import { Apartment } from "../types";

export default function ApartmentCard({ item }: { item: Apartment }) {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginVertical: 8, padding: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { flex: 1, marginHorizontal: 10 },
  name: { fontWeight: "bold" },
  address: { color: "#555" },
  price: { fontWeight: "bold", color: "#3F51B5" },
});
