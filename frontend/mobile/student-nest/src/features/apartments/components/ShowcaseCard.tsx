import { Card, Text } from "react-native-paper";
import { Image, StyleSheet } from "react-native";
import { Apartment } from "../types";

export default function ShowcaseCard({ item }: { item: Apartment }) {
  return (
    <Card style={styles.card}>
      <Image
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={styles.image}
      />
      <Card.Content style={styles.innerContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  innerContainer:{
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop:10,
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
  name: { fontWeight: "bold",  },
  price: { fontWeight: "bold", color: "#3F51B5" },
});
