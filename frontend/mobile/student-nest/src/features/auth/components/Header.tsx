import { StyleSheet, View, Image } from "react-native"
import { Text } from "react-native-paper"

export default function Header(){
return(
    <View style={style.Container}>
        <Text style={style.Title}>Student Nest</Text>
        <Image style={style.image} source={require('../../../assets/images/Student-nest-logo.png')}/>
        
    </View>
)
}


const style = StyleSheet.create({
    image:{
        width: 75,
        height: 75
    },
    Container:{
        borderWidth: 1,
        padding:10,
        backgroundColor: "#3F51B5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        

    },
    Title:{
        textAlign: "center",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "white",
        borderColor: "#3F51B5"
    }
})