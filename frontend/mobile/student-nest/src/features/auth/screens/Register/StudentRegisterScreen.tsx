import { View, StyleSheet, Text, Alert, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { registerStudent } from "../../api/authService";
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
  const { setStudentData, genericData } = useRegistration();
  const [image, setImage] = useState<any | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Restrict to 1 for Student ID
      quality: 0.2, // Reduce quality to avoid 413 Request Entity Too Large
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      // Map to structure expected by authService (which expects 'name', 'uri', 'mimeType')
      const fileToSet = {
        uri: asset.uri,
        name: asset.fileName || "student_id.jpg",
        mimeType: asset.mimeType || "image/jpeg",
        type: asset.mimeType || "image/jpeg",
      };
      setImage(fileToSet);
    }
  };

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

  async function onSubmit(data: any) {
    console.log("Student Data:", data);

    if (!image) {
      Alert.alert("Verification Required", "Please upload a verification photo (Student ID) to proceed.");
      return;
    }

    try {
      // Combine generic data (email, password, etc) with student data
      const fullData = { ...genericData, ...data };

      // Call API
      await registerStudent(fullData, image);

      // Update context and navigate
      setStudentData({ ...data, verificationFile: image }); // Store file in context just in case
      navigation.navigate("OTPScreen");
    } catch (error: any) {
      Alert.alert("Registration Error", error.message || "Something went wrong during registration.");
    }
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

          <View style={style.fileContainer}>
            <TouchableOpacity onPress={pickImage} style={style.fileButton}>
              <Text style={style.fileButtonText}>
                {image ? "Change Student ID Photo" : "Upload Student ID Photo"}
              </Text>
            </TouchableOpacity>

            {image && (
              <View style={style.previewContainer}>
                <Image source={{ uri: image.uri }} style={style.previewImage} />
                <Text style={style.fileName}>{image.name}</Text>
              </View>
            )}
          </View>
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
    backgroundColor: "#3F51B5"
  },
  margin: {
    marginTop: 10,
  },
  InnerCon: {
    padding: 16,
  },
  fileContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  fileButton: {
    borderColor: "#3F51B5",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  fileButtonText: {
    color: "#3F51B5",
    fontWeight: "bold",
  },
  previewContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  fileName: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
});
