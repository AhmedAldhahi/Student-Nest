import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import { useRegistration } from "../../../../context/RegistrationContext";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList,"StudentRegisterScreen">;


export default function StudentRegisterScreen({navigation}: Props) {
  
  const {setStudentData} = useRegistration();

  const [major, setMajor] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [universityName, SetUniversityName] = useState("");
  const [studentCardId, setStudentCardId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [studentGovId, setStudentGovId] = useState("");

  function pressHandler(){
    setStudentData({
      major,
      graduationYear,
      universityName,
      studentCardId,
      walletAddress,
      studentGovId
    });
    navigation.navigate("OTPScreen");

  }

  return (
    <SafeAreaView>
      <View>
        <Header></Header>
        <Greeting
        title="Student Register"
        description="Complete register for student"
        />
        <View style={style.InnerCon}>
        <TextInput
          style={[style.input, style.margin]}
          mode="outlined"
          placeholder="Major"
          value={major}
          onChangeText={setMajor}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="graduation Year"
          value={graduationYear}
          onChangeText={setGraduationYear}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="University Name"
          value={universityName}
          onChangeText={SetUniversityName}
        />
        
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Student Card ID"
          value={studentCardId}
          onChangeText={setStudentCardId}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Wallet Address"
          value={walletAddress}
          onChangeText={setWalletAddress}
        />
        <TextInput
          style={style.input}
          mode="outlined"
          placeholder="Student Goverment ID"
          value={studentCardId}
          onChangeText={setStudentGovId}
        />
        </View>

        <Button
          style={style.btn}
          mode="outlined"
          onPress={pressHandler}
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
