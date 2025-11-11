import { Card, Text } from "react-native-paper";
import { View, Image, StyleSheet } from "react-native";
import { Apartment } from "../types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { resolveImageSource } from "../../../utils/resolveImageSource";

type ApartmentDetailsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "ApartmentDetailsScreen"
>;

export default function ApartmentCard({ item }: { item: Apartment }) {
  const navigation = useNavigation<ApartmentDetailsNavProp>();
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("ApartmentDetailsScreen", { apartment: item })
      }
    >
      <View style={styles.row}>
        <Image
          source={resolveImageSource(item.images[0])}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.name}>{item.title}</Text>
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
