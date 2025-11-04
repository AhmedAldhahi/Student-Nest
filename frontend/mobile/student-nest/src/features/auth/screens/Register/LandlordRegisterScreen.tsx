import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import RoleToggle from "../../components/RoleToggle";

export default function LandlordRegisterScreen() {
  return (
    <SafeAreaView>
      <View>
        <Header></Header>
        <Greeting
        title="Landlord Register"
        description="complete register for Landlord"
        />
        <View style={style.InnerCon}>
        <TextInput
          style={[style.input, style.margin]}
          mode="outlined"
          placeholder="Cliq Account"
        />
        <TextInput style={style.input} mode="outlined" placeholder="Email" />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Lanlord Goverment ID"
        />
        
        </View>

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
  margin:{
    marginTop:10
  },
  InnerCon:{
    padding:16
  }
});
