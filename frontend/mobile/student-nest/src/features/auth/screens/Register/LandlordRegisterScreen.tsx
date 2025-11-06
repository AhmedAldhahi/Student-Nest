import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import { useRegistration } from "../../../../context/RegistrationContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { landlordRegisterSchema } from "../../../../validation/landlordRegisterSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ValidatedInput from "../../components/ValidatedInput";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "LandlordRegisterScreen"
>;

export default function LandlordRegisterScreen({ navigation }: Props) {
  const { setLandlordData } = useRegistration();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(landlordRegisterSchema),
    defaultValues: {
      cliqAccount: "",
      landlordGovId: "",
    },
  });

  function onSubmit(data: any) {
    console.log("Landlord Data:", data); // ✅ Debug
    setLandlordData(data);
    navigation.navigate("OTPScreen");
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20} // adds padding above keyboard
        keyboardOpeningTime={250} // smooth animation
        keyboardShouldPersistTaps="handled"
      >
        <Header></Header>
        <Greeting
          title="Landlord Register"
          description="Complete register for Landlord"
        />
        <View style={style.InnerCon}>
          <ValidatedInput
            control={control}
            name="cliqAccount"
            label="CliQ Account"
            textContentType="none"
            autoComplete="off"
          />
          <ValidatedInput
            control={control}
            name="landlordGovId"
            label="Landlord Government ID"
            keyboardType="phone-pad"
            textContentType="none"
            autoComplete="off"
          />
        </View>

        <Button
          style={style.btn}
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </KeyboardAwareScrollView>
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
    backgroundColor:"#3F51B5"
  },
  margin: {
    marginTop: 10,
  },
  InnerCon: {
    padding: 16,
  },
});
