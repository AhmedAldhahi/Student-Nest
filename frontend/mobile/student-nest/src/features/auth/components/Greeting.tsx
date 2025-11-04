import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { fontSizes } from "../../../theme/fontSizes";

type GreetingProps = {
  title: string;
  description: string;
};

export default function Greeting({ title, description }: GreetingProps) {
  const rem = (value: number) => value * 16;
  return (
    <View style={style.Container}>
      <Text style={style.title}>{title}</Text>
      <Text style={style.description}>{description}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  Container: {
    // borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    // textAlign:"center",
    // alignItems:"center",
    padding: 20,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight:"bold",
    textAlign: "center",
    marginBottom:10,

  },
  description: {
    fontSize: fontSizes.base,
    textAlign: "center",
    fontWeight:"300"
  },
});
