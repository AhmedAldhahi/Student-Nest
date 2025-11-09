import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import { Text } from "react-native-paper";
import Header from "../auth/components/Header";

type props = NativeStackScreenProps<RootStackParamList, "DashboardScreen">

export default function DashboardScreen(){
    return(
        <View>
            <Header/>
        </View>
    )
}

const styles = StyleSheet.create({

})