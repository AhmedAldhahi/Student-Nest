import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import { useRegistration } from "../../../../context/RegistrationContext";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "LandlordRegisterScreen"
>;

export default function LandlordRegisterScreen({ navigation }: Props) {
  const { setLandlordData } = useRegistration();
  const [cliqAccount, setCliqAccount] = useState("");
  const [landlordGovId, setLandlordGovId] = useState("");

  function pressHandler() {
    setLandlordData({
      cliqAccount,
      landlordGovId,
    });
    navigation.navigate("OTPScreen");
  }

  return (
    <SafeAreaView>
      <View>
        <Header></Header>
        <Greeting
          title="Landlord Register"
          description="Complete register for Landlord"
        />
        <View style={style.InnerCon}>
          <TextInput
            style={[style.input, style.margin]}
            mode="outlined"
            placeholder="Cliq Account"
            value={cliqAccount}
            onChangeText={setCliqAccount}
          />
          <TextInput style={style.input} mode="outlined" placeholder="Email" />
          <TextInput
            style={style.input}
            mode="outlined"
            placeholder="Lanlord Goverment ID"
            value={landlordGovId}
            onChangeText={setLandlordGovId}
          />
        </View>

        <Button style={style.btn} mode="outlined" onPress={pressHandler}>
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
  margin: {
    marginTop: 10,
  },
  InnerCon: {
    padding: 16,
  },
});
