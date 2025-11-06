import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import Greeting from "../../components/Greeting";
import { useRegistration } from "../../../../context/RegistrationContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { useForm } from "react-hook-form";
import { studentRegisterSchema } from "../../../../validation/studentRegisterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidatedInput from "../../components/ValidatedInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "StudentRegisterScreen"
>;

export default function StudentRegisterScreen({ navigation }: Props) {
  const { setStudentData } = useRegistration();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(studentRegisterSchema),
    defaultValues: {
      major: "",
      graduationYear: "",
      universityName: "",
      studentCardId: "",
      walletAddress: "",
      studentGovId: "",
    },
  });

  function onSubmit(data: any) {
    console.log("Student Data:", data); // ✅ Debug
    setStudentData(data);
    navigation.navigate("OTPScreen");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20} // adds padding above keyboard
        keyboardOpeningTime={250} // smooth animation
        keyboardShouldPersistTaps="handled"
      >
        <Header></Header>
        <Greeting
          title="Student Register"
          description="Complete register for student"
        />
        <View style={style.InnerCon}>
          <ValidatedInput
            control={control}
            name="major"
            label="Major"
            textContentType="none"
            autoComplete="off"
          />
          <ValidatedInput
            control={control}
            name="graduationYear"
            label="Graduation Year"
            keyboardType="phone-pad"
            textContentType="none"
            autoComplete="off"
          />
          <ValidatedInput
            control={control}
            name="universityName"
            label="University Name"
            textContentType="organizationName"
            autoComplete="organization"
          />
          <ValidatedInput
            control={control}
            name="studentCardId"
            label="Student Card ID"
            keyboardType="phone-pad"
            textContentType="none"
            autoComplete="off"
          />
          <ValidatedInput
            control={control}
            name="walletAddress"
            label="Wallet Address"
            textContentType="none"
            autoComplete="off"
          />
          <ValidatedInput
            control={control}
            name="studentGovId"
            label="Student Government ID"
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
