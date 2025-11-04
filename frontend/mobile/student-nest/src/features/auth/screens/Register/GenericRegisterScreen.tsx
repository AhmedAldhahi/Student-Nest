import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import RoleToggle from "../../components/RoleToggle";

export default function GenericRegisterScreen() {
  return (
    <SafeAreaView>
      <View>
        <Header></Header>
        <Greeting
          title="Create Account"
          description="Join our Community to find your prefect accomodation"
        />
        <RoleToggle />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Full Name"
        />
        <TextInput style={style.input} mode="outlined" placeholder="Email" />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Birth Date"
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Phone Number"
        />
        <TextInput style={style.input} mode="outlined" placeholder="Password" />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Confirm Password"
        />

        <Button
          style={style.btn}
          mode="outlined"
          onPress={() => console.log("Clicked")}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  input: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  btn: {
    width: "50%",
    alignSelf: "center",
  },
});
