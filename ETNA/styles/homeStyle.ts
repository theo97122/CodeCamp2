import { StyleSheet } from "react-native";

const cameraStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 25,
  },
  button: {
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39ace7",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0784b5",
    marginBottom: 10,
  },
  buttonHistory: {
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a94356",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#c36a7b",
    marginBottom: 10,
  },
  buttonImage: {
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#346645",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8cdea7",
    marginBottom: 10,
  },
  buttonPromo: {
    width: 350,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#414c50",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2d383c",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "RobotoSlab-Regular",
  },
});

export default cameraStyle;
