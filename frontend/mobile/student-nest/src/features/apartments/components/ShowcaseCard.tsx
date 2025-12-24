import { Card, Text } from "react-native-paper";
import { Image, StyleSheet } from "react-native";
import { Apartment } from "../types";
import { resolveImageSource } from "../../../utils/resolveImageSource";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";

type ApartmentDetailsNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "ApartmentDetailsScreen"
>;

export default function ShowcaseCard({ item }: { item: Apartment }) {
  const navigation = useNavigation<ApartmentDetailsNavProp>();
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate("ApartmentDetailsScreen", { apartment: item })
      }
    >
      <Image source={resolveImageSource(item.images[0])} style={styles.image} />
      <Card.Content style={styles.innerContainer}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    columnGap: 5,
  },
  card: {
    width: 200,
    marginRight: 12,
    marginBottom: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: { fontWeight: "bold" },
  price: { fontWeight: "bold", color: "#3F51B5" },
});
