import { StyleSheet } from "react-native";

const loginStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    backgroundVideo: {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    input: {
      height: 50,
      width: 300,
      borderWidth: 2,
      padding: 5,
      marginBottom: 20,
      borderRadius: 10,
      borderColor: "lightgrey",
      flexDirection: "row",
    },
    inputText: {
      fontSize: 12,
      width: 240,
      fontFamily: "RobotoSlab-Regular",
      marginTop: "auto",
      marginBottom: "auto",
      caretColor: "black",
    },
    button: {
      borderWidth: 2,
      width: 200,
      height: 40,
      padding: 5,
      borderRadius: 5,
      marginBottom: 10,
      borderColor: "#bb86fc",
      backgroundColor: "#cea5fb",
    },
    mainText: {
      fontSize: 28,
      textAlign: "left",
      marginBottom: 15,
      fontFamily: "RobotoSlab-Regular",
    },
    buttonText: {
      fontSize: 20,
      textAlign: "center",
      fontFamily: "RobotoSlab-SemiBold",
    },
    logo: {
      width: 100,
      height: 100,
    },
    lock: {
      marginTop: "auto",
      marginBottom: "auto",
      marginLeft: 10, 
      marginRight: 15, 
      opacity: 0.5
    },
    user: {
      marginTop: "auto",
      marginBottom: "auto",
      marginLeft: 10, 
      marginRight: 15, 
      opacity: 0.5
    }
  });

  export default loginStyle;